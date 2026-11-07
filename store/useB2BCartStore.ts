import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  B2BProcurementDraft,
  B2CRetailCartItem,
  FishOrder,
  OrderStatus,
  RetailFishProduct,
  User,
  B2CFulfilment,
} from '@/lib/types';
import {
  B2B_SHIPPING_IDR,
  B2C_SHIPPING_IDR,
  B2B_PRICE_PER_KG,
  SIZE_GRADE_OPTIONS,
} from '@/lib/constants';
import { computeCheckoutTotals } from '@/lib/pricing';
import { nextAvailableId } from '@/lib/ids';
import { SEED_ORDERS, SEED_RETAIL_CATALOG, SEED_ADDRESSES } from '@/mocks/seed';
import { persistStorage, storageKey } from './storage';

export interface B2BCartStoreState {
  b2bDraft: B2BProcurementDraft;
  b2bRedeemPoints: boolean;
  b2cCart: B2CRetailCartItem[];
  b2cFulfilment: B2CFulfilment;
  b2cEstimatedWasteKg: number;
  b2cRedeemPoints: boolean;
  orders: FishOrder[];
  retailCatalog: RetailFishProduct[];

  // Actions
  updateB2BDraft: (patch: Partial<B2BProcurementDraft>) => void;
  setB2BRedeemPoints: (redeem: boolean) => void;
  computeB2BCheckoutTotals: (balancePoints: number) => {
    subtotalIdr: number;
    shippingIdr: number;
    redeemablePoints: number;
    discountIdr: number;
    totalIdr: number;
  };
  submitB2BOrder: (buyer: User, balancePoints: number) => FishOrder;

  addToB2CCart: (product: RetailFishProduct, quantityKg: number) => void;
  removeFromB2CCart: (productId: string) => void;
  updateB2CCartQty: (productId: string, quantityKg: number) => void;
  setB2CFulfilment: (fulfilment: B2CFulfilment) => void;
  setB2CEstimatedWasteKg: (kg: number) => void;
  setB2CRedeemPoints: (redeem: boolean) => void;
  computeB2CCheckoutTotals: (balancePoints: number) => {
    subtotalIdr: number;
    shippingIdr: number;
    redeemablePoints: number;
    discountIdr: number;
    totalIdr: number;
  };
  submitB2COrder: (buyer: User, balancePoints: number) => FishOrder;

  updateOrderStatus: (orderId: string, status: OrderStatus, allocationId?: string) => void;
  resetB2BCartStore: () => void;
}

const INITIAL_B2B_DRAFT: B2BProcurementDraft = {
  species: 'Nila',
  sizeGradeLabel: '300-400g/ekor',
  quantityKg: 500,
  unitMode: 'kg',
  pricePerKgIdr: 32000,
  frequency: 'Sekali',
  deliveryDate: '2026-11-16',
  deliveryAddress: 'Jl. Raya Darmo No. 88, Surabaya',
};

export const useB2BCartStore = create<B2BCartStoreState>()(
  persist(
    (set, get) => ({
      b2bDraft: { ...INITIAL_B2B_DRAFT },
      b2bRedeemPoints: false,
      b2cCart: [],
      b2cFulfilment: 'Antar + Jemput Sampah',
      b2cEstimatedWasteKg: 3,
      b2cRedeemPoints: false,
      orders: structuredClone(SEED_ORDERS),
      retailCatalog: structuredClone(SEED_RETAIL_CATALOG),

      updateB2BDraft: (patch) =>
        set((state) => {
          const nextDraft = { ...state.b2bDraft, ...patch };
          if (patch.species && patch.species !== state.b2bDraft.species) {
            nextDraft.pricePerKgIdr = B2B_PRICE_PER_KG[patch.species];
            if (!patch.sizeGradeLabel) {
              nextDraft.sizeGradeLabel = SIZE_GRADE_OPTIONS[patch.species][0] ?? '';
            }
          }
          return { b2bDraft: nextDraft };
        }),

      setB2BRedeemPoints: (redeem) => set({ b2bRedeemPoints: redeem }),

      computeB2BCheckoutTotals: (balancePoints) => {
        const { b2bDraft, b2bRedeemPoints } = get();
        const subtotal = b2bDraft.quantityKg * b2bDraft.pricePerKgIdr;
        return computeCheckoutTotals({
          subtotalIdr: subtotal,
          shippingIdr: B2B_SHIPPING_IDR,
          balancePoints,
          redeem: b2bRedeemPoints,
        });
      },

      submitB2BOrder: (buyer, balancePoints) => {
        const { b2bDraft, orders, computeB2BCheckoutTotals } = get();
        const totals = computeB2BCheckoutTotals(balancePoints);
        const orderId = nextAvailableId(
          'ORD',
          orders.map((o) => o.id),
          241
        );

        const newOrder: FishOrder = {
          id: orderId,
          buyerUserId: buyer.id,
          buyerName: buyer.organizationName || buyer.name,
          buyerChannel: 'b2b',
          species: b2bDraft.species,
          sizeGradeLabel: b2bDraft.sizeGradeLabel,
          quantityKg: b2bDraft.quantityKg,
          pricePerKgIdr: b2bDraft.pricePerKgIdr,
          frequency: b2bDraft.frequency,
          fulfilmentType: 'Antar Kurir Fiscycle',
          deliveryDate: b2bDraft.deliveryDate,
          deliveryAddress: b2bDraft.deliveryAddress,
          subtotalIdr: totals.subtotalIdr,
          shippingIdr: totals.shippingIdr,
          pointsRedeemed: totals.redeemablePoints,
          discountIdr: totals.discountIdr,
          totalIdr: totals.totalIdr,
          status: 'Menunggu Alokasi',
          allocationIds: [],
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          b2bRedeemPoints: false,
        }));

        return newOrder;
      },

      addToB2CCart: (product, quantityKg) =>
        set((state) => {
          const existingIndex = state.b2cCart.findIndex(
            (item) => item.product.id === product.id
          );
          if (existingIndex >= 0) {
            const nextCart = [...state.b2cCart];
            nextCart[existingIndex] = {
              ...nextCart[existingIndex],
              quantityKg: nextCart[existingIndex].quantityKg + quantityKg,
            };
            return { b2cCart: nextCart };
          }
          return { b2cCart: [...state.b2cCart, { product, quantityKg }] };
        }),

      removeFromB2CCart: (productId) =>
        set((state) => ({
          b2cCart: state.b2cCart.filter((item) => item.product.id !== productId),
        })),

      updateB2CCartQty: (productId, quantityKg) =>
        set((state) => {
          if (quantityKg <= 0) {
            return {
              b2cCart: state.b2cCart.filter((item) => item.product.id !== productId),
            };
          }
          return {
            b2cCart: state.b2cCart.map((item) =>
              item.product.id === productId ? { ...item, quantityKg } : item
            ),
          };
        }),

      setB2CFulfilment: (fulfilment) => set({ b2cFulfilment: fulfilment }),

      setB2CEstimatedWasteKg: (kg) => set({ b2cEstimatedWasteKg: kg }),

      setB2CRedeemPoints: (redeem) => set({ b2cRedeemPoints: redeem }),

      computeB2CCheckoutTotals: (balancePoints) => {
        const { b2cCart, b2cFulfilment, b2cRedeemPoints } = get();
        const subtotal = b2cCart.reduce(
          (sum, item) => sum + item.quantityKg * item.product.pricePerKgIdr,
          0
        );
        const shipping = B2C_SHIPPING_IDR[b2cFulfilment];

        return computeCheckoutTotals({
          subtotalIdr: subtotal,
          shippingIdr: shipping,
          balancePoints,
          redeem: b2cRedeemPoints,
        });
      },

      submitB2COrder: (buyer, balancePoints) => {
        const { b2cCart, b2cFulfilment, orders, computeB2CCheckoutTotals } = get();
        if (b2cCart.length === 0) {
          throw new Error('Keranjang kosong');
        }

        const totals = computeB2CCheckoutTotals(balancePoints);
        const totalQty = b2cCart.reduce((sum, item) => sum + item.quantityKg, 0);
        const firstItem = b2cCart[0];

        const summaryLabel = b2cCart
          .map((i) => `${i.product.species} ${i.quantityKg} kg`)
          .join(' + ');

        const orderId = nextAvailableId(
          'ORD',
          orders.map((o) => o.id),
          241
        );

        const buyerAddress =
          (SEED_ADDRESSES as Record<string, string>)[buyer.id] ??
          'Jl. Manyar Kertoarjo No. 21, Surabaya';

        const newOrder: FishOrder = {
          id: orderId,
          buyerUserId: buyer.id,
          buyerName: buyer.name,
          buyerChannel: 'b2c',
          species: firstItem.product.species,
          sizeGradeLabel: summaryLabel,
          quantityKg: totalQty,
          pricePerKgIdr: Math.round(totals.subtotalIdr / totalQty),
          frequency: 'Sekali',
          fulfilmentType: b2cFulfilment,
          deliveryDate: '2026-11-05',
          deliveryAddress:
            b2cFulfilment === 'Ambil di Depot'
              ? 'Depot Fiscycle Surabaya'
              : buyerAddress,
          subtotalIdr: totals.subtotalIdr,
          shippingIdr: totals.shippingIdr,
          pointsRedeemed: totals.redeemablePoints,
          discountIdr: totals.discountIdr,
          totalIdr: totals.totalIdr,
          status: 'Dialokasikan',
          allocationIds: [],
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          b2cCart: [],
          b2cRedeemPoints: false,
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status, allocationId) =>
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order;
            const allocationIds =
              allocationId && !order.allocationIds.includes(allocationId)
                ? [...order.allocationIds, allocationId]
                : order.allocationIds;
            return { ...order, status, allocationIds };
          }),
        })),

      resetB2BCartStore: () =>
        set({
          b2bDraft: { ...INITIAL_B2B_DRAFT },
          b2bRedeemPoints: false,
          b2cCart: [],
          b2cFulfilment: 'Antar + Jemput Sampah',
          b2cEstimatedWasteKg: 3,
          b2cRedeemPoints: false,
          orders: structuredClone(SEED_ORDERS),
          retailCatalog: structuredClone(SEED_RETAIL_CATALOG),
        }),
    }),
    {
      name: storageKey('cart'),
      storage: persistStorage,
    }
  )
);
