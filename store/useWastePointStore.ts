import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CircularWallet,
  WasteContribution,
  WasteCategory,
  QualityGrade,
  PointTransaction,
} from '@/lib/types';
import { POINTS_PER_KG, POINT_VALUE_IDR } from '@/lib/constants';
import { nextAvailableId } from '@/lib/ids';
import { SEED_WALLETS, SEED_CONTRIBUTIONS } from '@/mocks/seed';
import { persistStorage, storageKey } from './storage';
import { useMitraStore } from './useMitraStore';

export interface SubmitWastePayload {
  contributorUserId: string;
  contributorName: string;
  contributorRole: 'b2b' | 'b2c';
  category: WasteCategory;
  categoryLabel: string;
  estimatedKg: number;
  pickupDate: string;
  pickupSlot: string;
  pickupAddress: string;
}

export interface WastePointStoreState {
  wallets: Record<string, CircularWallet>;
  contributions: WasteContribution[];
  readonly pointsPerKg: 10;
  readonly pointValueIdr: 100;

  // Actions
  getWalletByUserId: (userId: string) => CircularWallet | undefined;
  submitWaste: (payload: SubmitWastePayload) => WasteContribution;
  verifyWaste: (
    contributionId: string,
    actualKg: number,
    qualityGrade: QualityGrade,
    targetBsfBatchId: string
  ) => void;
  rejectWaste: (contributionId: string, reason: string) => void;
  deductPointsForOrder: (
    walletId: string,
    pointsToRedeem: number,
    orderId: string
  ) => void;
  resetWastePointStore: () => void;
}

export const useWastePointStore = create<WastePointStoreState>()(
  persist(
    (set, get) => ({
      wallets: structuredClone(SEED_WALLETS),
      contributions: structuredClone(SEED_CONTRIBUTIONS),
      pointsPerKg: POINTS_PER_KG as 10,
      pointValueIdr: POINT_VALUE_IDR as 100,

      getWalletByUserId: (userId: string) => {
        const { wallets } = get();
        return Object.values(wallets).find((w) => w.userId === userId);
      },

      submitWaste: (payload: SubmitWastePayload) => {
        const { contributions } = get();
        const newId = nextAvailableId(
          'IN',
          contributions.map((c) => c.id),
          45
        );

        const newContribution: WasteContribution = {
          ...payload,
          id: newId,
          status: 'Menunggu Verifikasi',
          pointsAwarded: 0,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          contributions: [newContribution, ...state.contributions],
        }));

        return newContribution;
      },

      verifyWaste: (
        contributionId: string,
        actualKg: number,
        qualityGrade: QualityGrade,
        targetBsfBatchId: string
      ) => {
        const { contributions, wallets } = get();
        const targetContribution = contributions.find((c) => c.id === contributionId);
        if (!targetContribution) return;

        const points = Math.round(actualKg * POINTS_PER_KG);
        const verifiedAt = new Date().toISOString();

        // 1. Update contribution
        const nextContributions = contributions.map((c) => {
          if (c.id !== contributionId) return c;
          return {
            ...c,
            status: 'Diterima' as const,
            actualKg,
            qualityGrade,
            pointsAwarded: points,
            bsfBatchId: targetBsfBatchId,
            verifiedAt,
          };
        });

        // 2. Credit points to contributor wallet if wallet exists
        const nextWallets = { ...wallets };
        const targetWallet = Object.values(nextWallets).find(
          (w) => w.userId === targetContribution.contributorUserId
        );

        if (targetWallet) {
          const allTxIds = Object.values(nextWallets).flatMap((w) =>
            w.transactions.map((t) => t.id)
          );
          const newTxId = nextAvailableId('PTX', allTxIds, 105);

          const newTransaction: PointTransaction = {
            id: newTxId,
            walletId: targetWallet.id,
            type: 'EARN_WASTE',
            pointsDelta: points,
            rupiahEquivalent: points * POINT_VALUE_IDR,
            referenceId: contributionId,
            description: `Setoran Sampah Organik ${actualKg} kg (${contributionId})`,
            createdAt: verifiedAt,
          };

          nextWallets[targetWallet.id] = {
            ...targetWallet,
            balancePoints: targetWallet.balancePoints + points,
            lifetimeEarnedPoints: targetWallet.lifetimeEarnedPoints + points,
            totalWasteContributedKg: targetWallet.totalWasteContributedKg + actualKg,
            transactions: [newTransaction, ...targetWallet.transactions],
          };
        }

        set({
          contributions: nextContributions,
          wallets: nextWallets,
        });

        // 3. Link verified waste to Mitra's BSF batch
        useMitraStore
          .getState()
          .linkVerifiedWasteToBsf(targetBsfBatchId, contributionId, actualKg);
      },

      rejectWaste: (contributionId: string, reason: string) => {
        set((state) => ({
          contributions: state.contributions.map((c) => {
            if (c.id !== contributionId) return c;
            return {
              ...c,
              status: 'Ditolak' as const,
              rejectionReason: reason,
              pointsAwarded: 0,
              verifiedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      deductPointsForOrder: (
        walletId: string,
        pointsToRedeem: number,
        orderId: string
      ) => {
        const { wallets } = get();
        const wallet = wallets[walletId];
        if (!wallet) {
          throw new Error('Dompet tidak ditemukan');
        }

        if (pointsToRedeem <= 0 || pointsToRedeem > wallet.balancePoints) {
          throw new Error('Saldo poin tidak mencukupi');
        }

        const allTxIds = Object.values(wallets).flatMap((w) =>
          w.transactions.map((t) => t.id)
        );
        const newTxId = nextAvailableId('PTX', allTxIds, 106);

        const newTransaction: PointTransaction = {
          id: newTxId,
          walletId,
          type: 'REDEEM_ORDER',
          pointsDelta: -pointsToRedeem,
          rupiahEquivalent: pointsToRedeem * POINT_VALUE_IDR,
          referenceId: orderId,
          description: `Tukar Poin untuk Pesanan ${orderId}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          wallets: {
            ...state.wallets,
            [walletId]: {
              ...wallet,
              balancePoints: wallet.balancePoints - pointsToRedeem,
              lifetimeRedeemedPoints:
                wallet.lifetimeRedeemedPoints + pointsToRedeem,
              transactions: [newTransaction, ...wallet.transactions],
            },
          },
        }));
      },

      resetWastePointStore: () =>
        set({
          wallets: structuredClone(SEED_WALLETS),
          contributions: structuredClone(SEED_CONTRIBUTIONS),
        }),
    }),
    {
      name: storageKey('waste'),
      storage: persistStorage,
    }
  )
);
