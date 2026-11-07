// ============================================================================
// 1. AUTH & USER MODELS (1 User = 1 Immutable Role)
// ============================================================================
export type Role = 'mitra' | 'b2b' | 'b2c' | 'admin';

export interface User {
  id: string;                        // e.g. 'USR-MITRA-01'
  name: string;                      // e.g. 'Budi Santoso'
  email: string;                     // e.g. 'budi@tambakmakmur.id'
  phone: string;                     // e.g. '081234567890'
  role: Role;                        // Bound at registration (1 User = 1 Role)
  organizationName: string;          // e.g. 'Tambak Makmur' | 'ABC Restaurant'
  avatarInitials: string;            // e.g. 'BS'
  walletId?: string;                 // 'WAL-0007' (B2B & B2C users)
  farmId?: string;                   // 'FARM-0028' (Mitra users)
  partnerTokenVerified?: boolean;    // true once FSC-FARM-XXXX + OTP verified
  onboardingCompleted?: boolean;     // true once Mitra onboarding steps finished
}

export interface RegisterDraft {
  name: string;
  organizationName: string;
  email: string;
  phone: string;
  password: string;
  acceptedTerms: boolean;
}

// ============================================================================
// 2. MITRA TAMBAK, POND & IOT TELEMETRY MODELS
// ============================================================================
export type FishSpecies = 'Nila' | 'Bandeng' | 'Lele' | 'Udang Vaname';
export type PondStatus = 'Baik' | 'Perhatian' | 'Kritis';
export type CycleStage =
  | 'Persiapan'
  | 'Tebar Benih'
  | 'Pertumbuhan'
  | 'Menjelang Panen'
  | 'Siap Panen';

export type TrendDirection = 'up' | 'down' | 'stable';

export type TelemetryMetricKey =
  | 'ph'
  | 'temperatureC'
  | 'dissolvedOxygenMgL'
  | 'turbidityNtu';

export interface TelemetryTrend {
  ph: TrendDirection;
  temperatureC: TrendDirection;
  dissolvedOxygenMgL: TrendDirection;
  turbidityNtu: TrendDirection;
}

export interface WaterTelemetry {
  recordedAt: string;                // ISO timestamp '2026-11-04T08:30:00+07:00'
  ph: number;                        // Safe: 6.5 - 8.5 (e.g. 7.1)
  temperatureC: number;              // Safe: 26.0 - 30.0 (e.g. 29.4)
  dissolvedOxygenMgL: number;        // Safe: >= 5.0 | Perhatian: 4.0 - 4.9 | Kritis: < 4.0 (e.g. 3.2)
  turbidityNtu: number;              // Safe: <= 30 (e.g. 24)
  ammoniaMgL: number;                // Safe: <= 0.05 (e.g. 0.02)
  trend: TelemetryTrend;
}

export interface TelemetryHistoryPoint {
  dayLabel: string;                  // 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'
  ph: number;
  temperatureC: number;
  dissolvedOxygenMgL: number;
  turbidityNtu: number;
}

export interface HarvestEstimate {
  estimatedBiomassKg: number;        // e.g. 520
  avgWeightG: number;                // e.g. 340
  targetSizeRangeG: string;          // e.g. '300-400g'
  survivalRatePct: number;           // e.g. 91.5
  windowStart: string;               // '2026-11-15'
  windowEnd: string;                 // '2026-11-18'
  readinessStatus: 'Belum Siap' | 'Mendekati Panen' | 'Siap Panen';
  aiConfidencePct: number;           // e.g. 94
}

export interface FeedProgress {
  dailyTargetKg: number;             // e.g. 18.0
  realizedTodayKg: number;           // e.g. 12.5
  bsfMaggotSharePct: number;         // e.g. 35 (% of ration from BSF maggots)
  nextFeedTime: string;              // '16:30 WIB'
}

export type AiInsightSeverity = 'Kritis' | 'Perhatian' | 'Informasi';

export interface AiInsight {
  id: string;                        // 'INS-0012'
  pondId: string;                    // 'POND-02'
  severity: AiInsightSeverity;
  parameterLabel: string;            // 'Oksigen Terlarut (DO) Rendah'
  currentValueText: string;          // '3,2 mg/L ↓'
  safeThresholdText: string;         // 'Minimal 5,0 mg/L'
  title: string;                     // 'Kolam 2 — Oksigen Air Rendah (Kritis)'
  summary: string;                   // 'Kadar DO turun di bawah ambang aman akibat kepadatan biomassa dan suhu siang.'
  recommendedActions: string[];      // ['Nyalakan 2 kincir aerator cadangan sekarang', 'Tunda pemberian pakan sore 2 jam']
  resolved: boolean;
}

export interface Pond {
  id: string;                        // 'POND-01' .. 'POND-06'
  farmId: string;                    // 'FARM-0028'
  name: string;                      // 'Kolam 2'
  species: FishSpecies;              // 'Nila'
  status: PondStatus;                // 'Kritis' | 'Perhatian' | 'Baik'
  areaM2: number;                    // 400
  depthM: number;                    // 1.5
  stockedDate: string;               // '2026-08-15'
  initialPopulation: number;         // 6000
  cycleDay: number;                  // 81
  cycleStage: CycleStage;            // 'Menjelang Panen'
  imageUrl: string;                  // '/images/pond-2.jpg'
  telemetry: WaterTelemetry;         // Current live sensor reading
  telemetryHistory: TelemetryHistoryPoint[]; // 7-day trend
  harvest: HarvestEstimate;
  feed: FeedProgress;
  activeInsight?: AiInsight;
}

export interface Farm {
  id: string;                        // 'FARM-0028'
  partnerToken: string;              // 'FSC-FARM-0028'
  name: string;                      // 'Tambak Makmur'
  ownerUserId: string;               // 'USR-MITRA-01'
  city: string;                      // 'Lamongan'
  province: string;                  // 'Jawa Timur'
  totalAreaM2: number;               // 2400
  sensorLastSyncedText: string;      // 'Terhubung · 2 menit lalu'
}

export interface FarmTask {
  id: string;                        // 'TSK-01'
  pondId: string;                    // 'POND-02'
  title: string;                     // 'Nyalakan aerator tambahan Kolam 2'
  scheduledTime: string;             // '08:00 WIB'
  category: 'Pakan' | 'Kualitas Air' | 'BSF' | 'Panen';
  completed: boolean;
}

export interface IoTDevice {
  id: string;                        // 'DEV-DO-05'
  pondId: string;                    // 'POND-02'
  pondName: string;                  // 'Kolam 2'
  name: string;                      // 'Sensor Oksigen DO-05'
  type: 'Sensor DO' | 'Sensor pH' | 'Sensor Suhu' | 'Gateway LoRa';
  status: 'Online' | 'Perlu Kalibrasi' | 'Offline';
  batteryPct: number;                // 88
  lastPingText: string;              // '1 menit lalu'
}
