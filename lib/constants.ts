import type { FishSpecies, LeadStage, WasteCategory, Role } from '@/lib/types';

// ============================================================================
// FISCYCLE BUSINESS & DOMAIN CONSTANTS
// ============================================================================

export const POINTS_PER_KG = 10;
export const POINT_VALUE_IDR = 100;
export const MAX_REDEEM_RATIO = 0.2; // Max 20% discount from subtotal
export const MIN_B2B_ORDER_KG = 50;
export const B2B_SHIPPING_IDR = 250000;

export const B2C_SHIPPING_IDR: Record<'Antar + Jemput Sampah' | 'Ambil di Depot', number> = {
  'Antar + Jemput Sampah': 10000,
  'Ambil di Depot': 0,
};

export const ALLOCATION_TOLERANCE = 0.05; // 5% supply-demand variance tolerance
export const DEMO_TODAY = '2026-11-04';
export const DEMO_OTP_CODE = '123456';
export const PARTNER_TOKEN_REGEX = /^FSC-FARM-\d{4}$/;

export const B2B_PRICE_PER_KG: Record<FishSpecies, number> = {
  Nila: 32000,
  Bandeng: 35000,
  Lele: 22000,
  'Udang Vaname': 85000,
};

export const SIZE_GRADE_OPTIONS: Record<FishSpecies, string[]> = {
  Nila: ['200-300g/ekor', '250-350g/ekor', '300-400g/ekor'],
  Bandeng: ['300-400g/ekor', '400-600g/ekor'],
  Lele: ['100-125g/ekor', '125-170g/ekor'],
  'Udang Vaname': ['50 ekor/kg', '70 ekor/kg'],
};

export const WASTE_CATEGORY_LABELS: Record<WasteCategory, string> = {
  sisa_dapur: 'Sisa Dapur & Restoran',
  sayur_buah: 'Sisa Sayur & Buah',
  sisa_ikan: 'Sisa Olahan Ikan',
  campuran_organik: 'Campuran Organik',
};

export const LEAD_STAGE_ORDER: LeadStage[] = [
  'lead_baru',
  'belum_dihubungi',
  'call_terjadwal',
  'sudah_dihubungi',
  'qualified',
  'assessment',
  'penawaran',
  'kontrak',
  'onboarding',
  'instalasi',
  'mitra_aktif',
];

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  lead_baru: 'Lead Baru',
  belum_dihubungi: 'Belum Dihubungi',
  call_terjadwal: 'Call Terjadwal',
  sudah_dihubungi: 'Sudah Dihubungi',
  qualified: 'Qualified',
  assessment: 'Assessment',
  penawaran: 'Penawaran',
  kontrak: 'Kontrak',
  onboarding: 'Onboarding',
  instalasi: 'Instalasi',
  mitra_aktif: 'Mitra Aktif',
};

export const ROLE_LABELS: Record<Role, string> = {
  mitra: 'Mitra Tambak',
  b2b: 'Usaha / Industri',
  b2c: 'Rumah Tangga',
  admin: 'Admin Fiscycle',
};

export const ORDER_STATUS_FLOW = [
  'Menunggu Alokasi',
  'Dialokasikan',
  'Menunggu Panen',
  'Dalam Pengiriman',
  'Selesai',
] as const;
