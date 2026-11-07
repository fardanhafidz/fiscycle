// ============================================================================
// 3. BSF CIRCULAR & ORGANIC WASTE MODELS
// ============================================================================
export type BsfBatchStatus = 'Normal' | 'Perhatian' | 'Siap Panen';

export interface BsfBatch {
  id: string;                        // 'BSF-04'
  farmId: string;                    // 'FARM-0028'
  name: string;                      // 'Batch BSF-04'
  dayOfCycle: number;                // 8 (out of 14-day cycle)
  status: BsfBatchStatus;            // 'Normal'
  organicInputTotalKg: number;       // 142
  estimatedMaggotYieldKg: number;    // 35
  harvestedMaggotKg: number;         // 85
  allocatedToFeedKg: number;         // 60
  mediaTempC: number;                // 32.5
  mediaHumidityPct: number;          // 64
  estimatedHarvestDate: string;      // '2026-11-09'
  sourceContributionIds: string[];   // ['IN-0042', 'IN-0045']
}

export type WasteCategory =
  | 'sisa_dapur'
  | 'sayur_buah'
  | 'sisa_ikan'
  | 'campuran_organik';

export type WasteStatus =
  | 'Dijadwalkan'
  | 'Dijemput Kurir'
  | 'Menunggu Verifikasi'
  | 'Diterima'
  | 'Ditolak';

export type QualityGrade = 'A' | 'B' | 'C';

export interface WasteContribution {
  id: string;                        // 'IN-0045'
  contributorUserId: string;         // 'USR-B2B-01'
  contributorName: string;           // 'ABC Restaurant'
  contributorRole: 'b2b' | 'b2c';
  category: WasteCategory;
  categoryLabel: string;             // 'Sisa Dapur & Restoran'
  estimatedKg: number;               // 42
  actualKg?: number;                 // 42 (populated on Admin verification)
  qualityGrade?: QualityGrade;
  pickupDate: string;                // '2026-11-05'
  pickupSlot: string;                // '08:00 - 10:00 WIB'
  pickupAddress: string;             // 'Jl. Raya Darmo No. 88, Surabaya'
  status: WasteStatus;
  pointsAwarded: number;             // 420 (actualKg * 10)
  bsfBatchId?: string;               // 'BSF-04'
  fedToPondId?: string;              // 'POND-04'
  rejectionReason?: string;
  createdAt: string;
  verifiedAt?: string;
}

export type PointTransactionType = 'EARN_WASTE' | 'REDEEM_ORDER';

export interface PointTransaction {
  id: string;                        // 'PTX-0105'
  walletId: string;                  // 'WAL-0007'
  type: PointTransactionType;
  pointsDelta: number;               // +420 or -3000
  rupiahEquivalent: number;          // 42000 or 300000
  referenceId: string;               // 'IN-0045' or 'ORD-0241'
  description: string;               // 'Setoran Sampah Organik 42 kg (IN-0045)'
  createdAt: string;
}

export interface CircularWallet {
  id: string;                        // 'WAL-0007'
  userId: string;                    // 'USR-B2B-01'
  ownerName: string;                 // 'ABC Restaurant'
  balancePoints: number;             // 2580 -> +420 = 3000 -> -3000 = 0
  lifetimeEarnedPoints: number;      // 5580
  lifetimeRedeemedPoints: number;    // 3000
  totalWasteContributedKg: number;   // 558
  qrCodePayload: string;             // 'FISCYCLE:WAL-0007'
  transactions: PointTransaction[];
}

export interface BsfFeedAllocation {
  id: string;                        // 'BFA-0001'
  batchId: string;                   // 'BSF-04'
  pondId: string;                    // 'POND-04'
  pondName: string;                  // 'Kolam 4'
  maggotKg: number;                  // 15
  allocatedAt: string;               // ISO timestamp
}
