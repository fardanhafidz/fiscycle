import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Farm,
  Pond,
  FarmTask,
  IoTDevice,
  BsfBatch,
  BsfFeedAllocation,
  SupplyAllocationOffer,
  TelemetryHistoryPoint,
} from '@/lib/types';
import { derivePondStatus } from '@/lib/telemetry';
import { nextAvailableId } from '@/lib/ids';
import {
  SEED_FARM,
  SEED_PONDS,
  SEED_TASKS,
  SEED_DEVICES,
  SEED_BSF_BATCHES,
  SEED_BSF_FEED_ALLOCATIONS,
  SEED_ALLOCATION_OFFERS,
} from '@/mocks/seed';
import { persistStorage, storageKey } from './storage';
import { useB2BCartStore } from './useB2BCartStore';

export interface MitraStoreState {
  farm: Farm;
  ponds: Pond[];
  tasks: FarmTask[];
  devices: IoTDevice[];
  bsfBatches: BsfBatch[];
  bsfFeedAllocations: BsfFeedAllocation[];
  allocationOffers: SupplyAllocationOffer[];

  // Actions
  getPondSummaryCounts: () => {
    total: number;
    baik: number;
    perhatian: number;
    kritis: number;
  };
  resolvePondAlert: (pondId: string) => void;
  toggleTaskCompleted: (taskId: string) => void;
  addPondDuringOnboarding: (
    pond: Omit<Pond, 'id' | 'telemetry' | 'telemetryHistory' | 'harvest' | 'feed'>
  ) => void;
  linkVerifiedWasteToBsf: (
    batchId: string,
    contributionId: string,
    addedKg: number
  ) => void;
  allocateBsfToPond: (batchId: string, pondId: string, maggotKg: number) => void;
  receiveAllocationOffer: (offer: SupplyAllocationOffer) => void;
  respondToAllocation: (offerId: string, accept: boolean) => void;
  resetMitraStore: () => void;
}

export const useMitraStore = create<MitraStoreState>()(
  persist(
    (set, get) => ({
      farm: structuredClone(SEED_FARM),
      ponds: structuredClone(SEED_PONDS),
      tasks: structuredClone(SEED_TASKS),
      devices: structuredClone(SEED_DEVICES),
      bsfBatches: structuredClone(SEED_BSF_BATCHES),
      bsfFeedAllocations: structuredClone(SEED_BSF_FEED_ALLOCATIONS),
      allocationOffers: structuredClone(SEED_ALLOCATION_OFFERS),

      getPondSummaryCounts: () => {
        const { ponds } = get();
        let baik = 0;
        let perhatian = 0;
        let kritis = 0;

        for (const pond of ponds) {
          if (pond.status === 'Baik') baik += 1;
          else if (pond.status === 'Perhatian') perhatian += 1;
          else if (pond.status === 'Kritis') kritis += 1;
        }

        return {
          total: ponds.length,
          baik,
          perhatian,
          kritis,
        };
      },

      resolvePondAlert: (pondId: string) =>
        set((state) => {
          const nextPonds = state.ponds.map((p) => {
            if (p.id !== pondId) return p;

            const nextTelemetry = {
              ...p.telemetry,
              dissolvedOxygenMgL: 5.6,
              trend: {
                ...p.telemetry.trend,
                dissolvedOxygenMgL: 'up' as const,
              },
            };

            const nextHistory: TelemetryHistoryPoint[] = p.telemetryHistory.map(
              (h, idx) => {
                if (idx === p.telemetryHistory.length - 1) {
                  return { ...h, dissolvedOxygenMgL: 5.6 };
                }
                return h;
              }
            );

            const nextInsight = p.activeInsight
              ? { ...p.activeInsight, resolved: true }
              : undefined;

            const nextStatus = derivePondStatus(nextTelemetry);

            return {
              ...p,
              telemetry: nextTelemetry,
              telemetryHistory: nextHistory,
              activeInsight: nextInsight,
              status: nextStatus,
            };
          });

          const nextTasks = state.tasks.map((t) => {
            if (t.pondId === pondId && t.category === 'Kualitas Air') {
              return { ...t, completed: true };
            }
            return t;
          });

          return {
            ponds: nextPonds,
            tasks: nextTasks,
          };
        }),

      toggleTaskCompleted: (taskId: string) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        })),

      addPondDuringOnboarding: (pondData) =>
        set((state) => {
          const newId = nextAvailableId(
            'POND',
            state.ponds.map((p) => p.id),
            7,
            2
          );

          const defaultDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
          const defaultHistory: TelemetryHistoryPoint[] = defaultDays.map((dayLabel) => ({
            dayLabel,
            ph: 7.2,
            temperatureC: 28.0,
            dissolvedOxygenMgL: 6.0,
            turbidityNtu: 15,
          }));

          const newPond: Pond = {
            ...pondData,
            id: newId,
            telemetry: {
              recordedAt: new Date().toISOString(),
              ph: 7.2,
              temperatureC: 28.0,
              dissolvedOxygenMgL: 6.0,
              turbidityNtu: 15,
              ammoniaMgL: 0.02,
              trend: {
                ph: 'stable',
                temperatureC: 'stable',
                dissolvedOxygenMgL: 'stable',
                turbidityNtu: 'stable',
              },
            },
            telemetryHistory: defaultHistory,
            harvest: {
              estimatedBiomassKg: 0,
              avgWeightG: 0,
              targetSizeRangeG: '300-400g',
              survivalRatePct: 0,
              windowStart: '2027-02-01',
              windowEnd: '2027-02-05',
              readinessStatus: 'Belum Siap',
              aiConfidencePct: 0,
            },
            feed: {
              dailyTargetKg: 0,
              realizedTodayKg: 0,
              bsfMaggotSharePct: 0,
              nextFeedTime: '16:30 WIB',
            },
          };

          return {
            ponds: [...state.ponds, newPond],
          };
        }),

      linkVerifiedWasteToBsf: (batchId: string, contributionId: string, addedKg: number) =>
        set((state) => ({
          bsfBatches: state.bsfBatches.map((b) => {
            if (b.id !== batchId) return b;
            const sourceIds = b.sourceContributionIds.includes(contributionId)
              ? b.sourceContributionIds
              : [...b.sourceContributionIds, contributionId];
            return {
              ...b,
              organicInputTotalKg: b.organicInputTotalKg + addedKg,
              sourceContributionIds: sourceIds,
            };
          }),
        })),

      allocateBsfToPond: (batchId: string, pondId: string, maggotKg: number) => {
        const { bsfBatches, ponds, bsfFeedAllocations } = get();
        const batch = bsfBatches.find((b) => b.id === batchId);
        const pond = ponds.find((p) => p.id === pondId);

        if (!batch || !pond) {
          throw new Error('Batch atau Kolam tidak ditemukan');
        }

        const availableStock = batch.harvestedMaggotKg - batch.allocatedToFeedKg;
        if (maggotKg <= 0 || maggotKg > availableStock) {
          throw new Error('Stok maggot tidak mencukupi');
        }

        const allocationId = nextAvailableId(
          'BFA',
          bsfFeedAllocations.map((a) => a.id),
          2,
          4
        );

        const newAllocation: BsfFeedAllocation = {
          id: allocationId,
          batchId,
          pondId,
          pondName: pond.name,
          maggotKg,
          allocatedAt: new Date().toISOString(),
        };

        set({
          bsfBatches: bsfBatches.map((b) =>
            b.id === batchId
              ? { ...b, allocatedToFeedKg: b.allocatedToFeedKg + maggotKg }
              : b
          ),
          ponds: ponds.map((p) =>
            p.id === pondId
              ? {
                  ...p,
                  feed: {
                    ...p.feed,
                    bsfMaggotSharePct: Math.min(100, p.feed.bsfMaggotSharePct + 10),
                  },
                }
              : p
          ),
          bsfFeedAllocations: [...bsfFeedAllocations, newAllocation],
        });
      },

      receiveAllocationOffer: (offer: SupplyAllocationOffer) =>
        set((state) => {
          if (state.allocationOffers.some((o) => o.id === offer.id)) {
            return state;
          }
          return {
            allocationOffers: [offer, ...state.allocationOffers],
          };
        }),

      respondToAllocation: (offerId: string, accept: boolean) => {
        const { allocationOffers } = get();
        const offer = allocationOffers.find((o) => o.id === offerId);
        if (!offer) return;

        set({
          allocationOffers: allocationOffers.map((o) =>
            o.id === offerId ? { ...o, status: accept ? 'Diterima' : 'Ditolak' } : o
          ),
        });

        useB2BCartStore
          .getState()
          .updateOrderStatus(
            offer.orderId,
            accept ? 'Menunggu Panen' : 'Menunggu Alokasi'
          );
      },

      resetMitraStore: () =>
        set({
          farm: structuredClone(SEED_FARM),
          ponds: structuredClone(SEED_PONDS),
          tasks: structuredClone(SEED_TASKS),
          devices: structuredClone(SEED_DEVICES),
          bsfBatches: structuredClone(SEED_BSF_BATCHES),
          bsfFeedAllocations: structuredClone(SEED_BSF_FEED_ALLOCATIONS),
          allocationOffers: structuredClone(SEED_ALLOCATION_OFFERS),
        }),
    }),
    {
      name: storageKey('mitra'),
      storage: persistStorage,
    }
  )
);
