import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Lead,
  LeadStage,
  FishSpecies,
  AllocationInput,
  SupplyAllocationOffer,
} from '@/lib/types';
import { nextAvailableId, formatPartnerToken } from '@/lib/ids';
import { scorePondForOrder } from '@/lib/matching';
import { SEED_LEADS } from '@/mocks/seed';
import { persistStorage, storageKey } from './storage';
import { useMitraStore } from './useMitraStore';
import { useB2BCartStore } from './useB2BCartStore';

export interface CreateLeadPayload {
  ownerName: string;
  farmName: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  areaM2: number;
  pondCount: number;
  primarySpecies: FishSpecies;
}

export interface AdminStoreState {
  leads: Lead[];
  selectedLeadId: string | null;
  selectedOrderIdForAllocation: string | null;
  nextTokenSequence: number;

  // Actions
  selectLead: (leadId: string | null) => void;
  selectOrderForAllocation: (orderId: string | null) => void;
  createLeadFromApplication: (payload: CreateLeadPayload) => Lead;
  advanceLeadStage: (leadId: string, nextStage: LeadStage) => string | undefined;
  approveSupplyAllocation: (
    orderId: string,
    allocations: AllocationInput[]
  ) => SupplyAllocationOffer[];
  resetAdminStore: () => void;
}

export const useAdminStore = create<AdminStoreState>()(
  persist(
    (set, get) => ({
      leads: structuredClone(SEED_LEADS),
      selectedLeadId: 'LEAD-0117',
      selectedOrderIdForAllocation: null,
      nextTokenSequence: 29,

      selectLead: (leadId) => set({ selectedLeadId: leadId }),

      selectOrderForAllocation: (orderId) =>
        set({ selectedOrderIdForAllocation: orderId }),

      createLeadFromApplication: (payload) => {
        const { leads } = get();
        const newId = nextAvailableId(
          'LEAD',
          leads.map((l) => l.id),
          125
        );

        const newLead: Lead = {
          ...payload,
          id: newId,
          stage: 'lead_baru',
          picName: 'Belum Ditentukan',
          nextFollowUpDate: '2026-11-05 10:00 WIB',
          notes: ['Pengajuan via aplikasi Fiscycle'],
        };

        set({
          leads: [newLead, ...leads],
          selectedLeadId: newId,
        });

        return newLead;
      },

      advanceLeadStage: (leadId, nextStage) => {
        const { leads, nextTokenSequence } = get();
        const lead = leads.find((l) => l.id === leadId);
        if (!lead) return undefined;

        let issuedToken: string | undefined = undefined;
        let newNextSequence = nextTokenSequence;

        const needsToken =
          (nextStage === 'kontrak' || nextStage === 'onboarding') &&
          !lead.issuedPartnerToken;

        if (needsToken) {
          issuedToken = formatPartnerToken(nextTokenSequence);
          newNextSequence += 1;
        }

        set({
          leads: leads.map((l) => {
            if (l.id !== leadId) return l;

            const nextNotes = [...l.notes];
            if (issuedToken) {
              nextNotes.push(`Token mitra ${issuedToken} diterbitkan`);
            }

            return {
              ...l,
              stage: nextStage,
              issuedPartnerToken: issuedToken ?? l.issuedPartnerToken,
              notes: nextNotes,
            };
          }),
          nextTokenSequence: newNextSequence,
        });

        return issuedToken;
      },

      approveSupplyAllocation: (orderId, allocations) => {
        const cartOrders = useB2BCartStore.getState().orders;
        const targetOrder = cartOrders.find((o) => o.id === orderId);
        if (!targetOrder) return [];

        const mitraStore = useMitraStore.getState();
        const { ponds, allocationOffers } = mitraStore;

        const addressParts = targetOrder.deliveryAddress.split(',');
        const buyerCity =
          addressParts.length > 0
            ? addressParts[addressParts.length - 1].trim()
            : 'Surabaya';

        const existingOfferIds = allocationOffers.map((o) => o.id);
        const createdOffers: SupplyAllocationOffer[] = [];

        for (const allocation of allocations) {
          const offerId = nextAvailableId('ALC', existingOfferIds, 31);
          existingOfferIds.push(offerId);

          const pond = ponds.find((p) => p.id === allocation.pondId);
          const aiScore = pond
            ? scorePondForOrder(pond, targetOrder).scorePct
            : 80;

          const newOffer: SupplyAllocationOffer = {
            id: offerId,
            orderId,
            buyerName: targetOrder.buyerName,
            buyerCity,
            species: targetOrder.species,
            sizeGradeLabel: targetOrder.sizeGradeLabel,
            allocatedKg: allocation.allocatedKg,
            pricePerKgIdr: targetOrder.pricePerKgIdr,
            estimatedPayoutIdr: allocation.allocatedKg * targetOrder.pricePerKgIdr,
            farmId: allocation.farmId,
            pondId: allocation.pondId,
            pondName: pond ? pond.name : 'Kolam',
            targetHarvestDate: pond ? pond.harvest.windowStart : '2026-11-15',
            aiMatchScorePct: aiScore,
            status: 'Ditawarkan',
            createdAt: new Date().toISOString(),
          };

          createdOffers.push(newOffer);

          // Dispatch to Mitra store
          useMitraStore.getState().receiveAllocationOffer(newOffer);

          // Update cart store order status
          useB2BCartStore
            .getState()
            .updateOrderStatus(orderId, 'Dialokasikan', newOffer.id);
        }

        return createdOffers;
      },

      resetAdminStore: () =>
        set({
          leads: structuredClone(SEED_LEADS),
          selectedLeadId: 'LEAD-0117',
          selectedOrderIdForAllocation: null,
          nextTokenSequence: 29,
        }),
    }),
    {
      name: storageKey('admin'),
      storage: persistStorage,
    }
  )
);
