import type { FishSpecies } from './auth-mitra';

// ============================================================================
// 4. PROCUREMENT, MARKET & SUPPLY ALLOCATION MODELS
// ============================================================================
export type OrderStatus =
  | 'Menunggu Alokasi'
  | 'Dialokasikan'
  | 'Menunggu Panen'
  | 'Dalam Pengiriman'
  | 'Selesai';

export type OrderFrequency = 'Sekali' | 'Mingguan' | 'Dua Mingguan' | 'Bulanan';

export type FulfilmentType =
  | 'Antar Kurir Fiscycle'
  | 'Antar + Jemput Sampah'
  | 'Ambil di Depot';

export type B2CFulfilment = 'Antar + Jemput Sampah' | 'Ambil di Depot';

export interface FishOrder {
  id: string;                        // 'ORD-0241'
  buyerUserId: string;               // 'USR-B2B-01'
  buyerName: string;                 // 'ABC Restaurant'
  buyerChannel: 'b2b' | 'b2c';
  species: FishSpecies;              // 'Nila'
  sizeGradeLabel: string;            // '300-400g/ekor'
  quantityKg: number;                // 500
  pricePerKgIdr: number;             // 32000
  frequency: OrderFrequency;         // 'Sekali'
  fulfilmentType: FulfilmentType;
  deliveryDate: string;              // '2026-11-16'
  deliveryAddress: string;           // 'Jl. Raya Darmo No. 88, Surabaya'
  subtotalIdr: number;               // 16000000
  shippingIdr: number;               // 250000
  pointsRedeemed: number;            // 3000
  discountIdr: number;               // 300000
  totalIdr: number;                  // 15950000
  status: OrderStatus;
  allocationIds: string[];           // ['ALC-0031']
  createdAt: string;
}

export interface SupplyAllocationOffer {
  id: string;                        // 'ALC-0031'
  orderId: string;                   // 'ORD-0241'
  buyerName: string;                 // 'ABC Restaurant'
  buyerCity: string;                 // 'Surabaya'
  species: FishSpecies;              // 'Nila'
  sizeGradeLabel: string;            // '300-400g/ekor'
  allocatedKg: number;               // 500
  pricePerKgIdr: number;             // 32000
  estimatedPayoutIdr: number;        // 16000000
  farmId: string;                    // 'FARM-0028'
  pondId: string;                    // 'POND-04'
  pondName: string;                  // 'Kolam 4'
  targetHarvestDate: string;         // '2026-11-15'
  aiMatchScorePct: number;           // 96
  status: 'Ditawarkan' | 'Diterima' | 'Ditolak';
  createdAt: string;
}

export interface RetailFishProduct {
  id: string;                        // 'PRD-01'
  name: string;                      // 'Ikan Nila Segar Sirkular (Isi 3-4 Ekor)'
  species: FishSpecies;              // 'Nila'
  farmName: string;                  // 'Tambak Makmur · Lamongan'
  distanceKm: number;                // 14.2
  pricePerKgIdr: number;             // 34000
  sizeGradeLabel: string;            // '300-400g/ekor'
  stockAvailableKg: number;          // 120
  harvestedLabel: string;            // 'Panen Pagi Ini · Bebas Bau Tanah'
  imageUrl: string;
}

// ============================================================================
// 5. ADMIN CRM PIPELINE MODELS
// ============================================================================
export type LeadStage =
  | 'lead_baru'
  | 'belum_dihubungi'
  | 'call_terjadwal'
  | 'sudah_dihubungi'
  | 'qualified'
  | 'assessment'
  | 'penawaran'
  | 'kontrak'
  | 'onboarding'
  | 'instalasi'
  | 'mitra_aktif';

export interface Lead {
  id: string;                        // 'LEAD-0124'
  ownerName: string;                 // 'Budi Santoso'
  farmName: string;                  // 'Tambak Maju Jaya'
  city: string;                      // 'Lamongan'
  province: string;                  // 'Jawa Timur'
  phone: string;                     // '0812-3456-7890'
  email: string;                     // 'budi.maju@gmail.com'
  areaM2: number;                    // 1800
  pondCount: number;                 // 4
  primarySpecies: FishSpecies;       // 'Nila'
  stage: LeadStage;                  // 'kontrak'
  picName: string;                   // 'Andi Pratama'
  nextFollowUpDate: string;          // '2026-11-06 10:00 WIB'
  issuedPartnerToken?: string;       // 'FSC-FARM-0029'
  notes: string[];
}

// ============================================================================
// 6. DRAFTS & ALLOCATION ENGINE INTERFACES
// ============================================================================
export interface B2BProcurementDraft {
  species: FishSpecies;
  sizeGradeLabel: string;
  quantityKg: number;
  unitMode: 'kg' | 'ton';
  pricePerKgIdr: number;
  frequency: OrderFrequency;
  deliveryDate: string;
  deliveryAddress: string;
}

export interface B2CRetailCartItem {
  product: RetailFishProduct;
  quantityKg: number;
}

export interface AllocationInput {
  pondId: string;
  farmId: string;
  allocatedKg: number;
}

export interface AllocationSuggestion {
  pondId: string;
  pondName: string;
  farmId: string;
  farmName: string;
  species: FishSpecies;
  estimatedBiomassKg: number;
  avgWeightG: number;
  readinessStatus: 'Belum Siap' | 'Mendekati Panen' | 'Siap Panen';
  windowStart: string;
  windowEnd: string;
  suggestedKg: number;
  matchScorePct: number;
  reason: string;
}
