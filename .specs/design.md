# Fiscycle — Technical & UI/UX Design Specification (Phase 1 — Audited & Locked)

> **Status:** APPROVED — Strict Architecture & UX Audit Complete
> **Companion Documents:** [requirements.md](./requirements.md) · [tasks.md](./tasks.md)

---

## 1. Design System & Exact Token Specification

### 1.1 Color Palette (Exact Hex Codes)

#### Core Brand & Shell Tokens
| Token Name | CSS Variable | Hex Code | Tailwind Class | Exact Usage |
|---|---|---|---|---|
| **Deep Navy** | `--color-brand-navy` | `#1A365D` | `bg-brand-navy` / `text-brand-navy` | Primary brand headers, hero banners, wallet cards, active shell accents |
| **Vibrant Teal** | `--color-brand-teal` | `#00B4D8` | `bg-brand-teal` / `text-brand-teal` | Circular Points highlights, active floating nav indicator, interactive badges, primary CTA accents |
| **Figma Ink** | `--color-ink` | `#173251` | `text-ink` | Default high-contrast body headings, metric values, table cell primary text |
| **Ink Secondary** | `--color-ink-secondary` | `#283D55` | `text-ink-secondary` | Subheadings, card descriptions, secondary labels |
| **Muted Slate** | `--color-muted` | `#8192A5` | `text-muted` | Timestamps, inactive navigation icons, input placeholders, helper captions |
| **Action Blue** | `--color-primary` | `#00629B` | `bg-primary` / `text-primary` | Workspace action buttons (*Lihat Arahan*, *Tambah Lead*), active links |
| **Primary Soft** | `--color-primary-soft` | `#E2F3FC` | `bg-primary-soft` | Active sidebar row background, informational banner surface |
| **Auth Emerald** | `--color-auth-teal` | `#0F766E` | `bg-auth-teal` | Auth screen CTAs (*Masuk*, *Daftar*) & role card selected accents |
| **Role Selected Bg** | `--color-selected` | `#EDFCF8` | `bg-selected` | Selected role card background on `/auth/register/role` (border `#A5E5D8`) |

#### Semantic Status Tokens
| Status Category | Foreground Hex | Background Hex | Border Hex | Canonical Labels |
|---|---|---|---|---|
| **Success (`Baik`)** | `#14B97C` | `#E5F8EF` | `#A7F3D0` | `Baik`, `Normal`, `Diterima`, `Aktif`, `Siap Panen`, `Selesai` |
| **Warning (`Perhatian`)** | `#F69B23` | `#FFF3DF` | `#FDE68A` | `Perhatian`, `Mendekati Panen`, `Menunggu Panen`, `Call Terjadwal` |
| **Danger (`Kritis`)** | `#F34860` | `#FDEBEA` | `#FECDD3` | `Kritis`, `Menunggu Verifikasi`, `Perlu Kalibrasi`, `Ditolak` |
| **Info (`Informasi`)** | `#00629B` | `#E2F3FC` | `#BAE6FD` | `Dialokasikan`, `Menunggu Alokasi`, `Dijadwalkan`, `Assessment` |
| **Violet (`Amonia/Kontrak`)** | `#9857E8` | `#F3EAFF` | `#DDD6FE` | `Nitrit & Amonia`, `Penawaran`, `Kontrak` |

#### Surfaces, Glassmorphism & Borders
| Token Name | Value / Classes | Exact Usage |
|---|---|---|
| `canvas` | `#F3F9FC` | Outer viewport background behind the mobile `max-w-md` container and Admin main canvas |
| `surface` | `#FFFFFF` | Solid card background |
| `glass-surface` | `bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm` | Sticky mobile top bars, floating bottom navbar, hero overlay cards, wallet summary overlays |
| `border-subtle` | `#E7EFF4` | Default 1px card border and table row divider |
| `border-input` | `#E1E7EC` | Form input border |

### 1.2 Geometry, Squircles & Floating Shell Rules

1. **Squircle Radii (`rounded-3xl` Standard):**
   - Primary bento cards, KPI summary tiles, alert banners, wallet cards, and bottom sheets MUST use **`rounded-3xl` (`24px`)**.
   - Nested inner cards and list items use **`rounded-2xl` (`16px`)** or **`rounded-xl` (`12px`)**.
   - Status badges and segmented filter chips use **`rounded-full`** or **`rounded-lg` (`8px`)**.
2. **Floating Bottom Navigation Bar:**
   - Rendered across all 3 mobile workspaces (`Mitra`, `B2B`, `B2C`).
   - Exact class specification:
     `fixed bottom-4 inset-x-4 max-w-[calc(28rem-2rem)] mx-auto h-16 px-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#E7EFF4] shadow-[0_8px_30px_rgb(26,54,93,0.12)] flex items-center justify-around z-50`
   - Active tab item renders icon + label in `#00B4D8` / `#1A365D` bold with a soft pill indicator (`bg-[#E2F3FC]`); inactive tab items render in `#8192A5`.
3. **Mitra Dashboard 2×2 KPI Bento Grid:**
   - Rendered at the top of `/mitra/dashboard` using `grid grid-cols-2 gap-3`.
   - Contains exactly 4 `rounded-3xl` KPI cards:
     1. **Total Kolam Aktif** (`#1A365D` navy icon well)
     2. **Kondisi Baik** (`#14B97C` emerald icon well)
     3. **Perlu Perhatian** (`#F69B23` amber icon well)
     4. **Kondisi Kritis** (`#F34860` crimson icon well)
4. **Anti-Slop Visual Guardrails:**
   - **NEVER** render circular biofilter gauges, radial progress rings, or speedometer dials. All progress metrics (feed target, BSF allocation, order fulfillment) MUST use horizontal linear progress bars (`h-2 rounded-full bg-[#F3F4F6]` with colored fill) and explicit numeric text.
   - **NEVER** render fake CCTV feeds or camera player UI.

### 1.3 CSS Variables & Tailwind v4 Theme (`app/globals.css`)

```css
@import "tailwindcss";

:root {
  --radius: 1.5rem; /* 24px rounded-3xl default squircle */
  --background: #ffffff;
  --foreground: #173251;
  --brand-navy: #1a365d;
  --brand-teal: #00b4d8;
  --primary: #00629b;
  --primary-foreground: #ffffff;
  --muted: #f3f9fc;
  --muted-foreground: #8192a5;
  --border: #e7eff4;
  --input: #e1e7ec;
  --ring: #00b4d8;
}

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui;
  --color-brand-navy: #1a365d;
  --color-brand-teal: #00b4d8;
  --color-ink: #173251;
  --color-ink-secondary: #283d55;
  --color-muted: #8192a5;
  --color-canvas: #f3f9fc;
  --color-primary: #00629b;
  --color-primary-soft: #e2f3fc;
  --color-auth-teal: #0f766e;
  --color-selected: #edfcf8;
  --color-selected-border: #a5e5d8;
  --color-success: #14b97c;
  --color-success-soft: #e5f8ef;
  --color-warning: #f69b23;
  --color-warning-soft: #fff3df;
  --color-danger: #f34860;
  --color-danger-soft: #fdebea;
  --color-violet: #9857e8;
  --color-violet-soft: #f3eaff;
  --color-border-subtle: #e7eff4;
  --color-border-input: #e1e7ec;
}
```

---

## 2. Route Architecture & Role-Scoped Directory Tree

```text
app/
├── layout.tsx                                    # Root HTML, Inter font, Zustand Hydration Provider, Sonner Toaster
├── globals.css                                   # Tailwind v4 + Exact Design Tokens (§1.3)
├── manifest.ts                                   # PWA Manifest
│
├── (mobile)/                                     # Mobile Container: mx-auto w-full max-w-md min-h-dvh bg-white shadow-sm
│   ├── layout.tsx
│   ├── page.tsx                                  # "/" Landing Page (Halaman Awal - Figma 9:2522)
│   │
│   ├── auth/
│   │   ├── login/page.tsx                        # "/auth/login" — Direct login -> routes to user.role home (NO role selector)
│   │   ├── register/
│   │   │   ├── page.tsx                          # "/auth/register" — Step 1: Account Details + Terms Checkbox
│   │   │   └── role/page.tsx                     # "/auth/register/role" — Step 2: Role Selector (ONLY during Registration)
│   │   └── mitra/
│   │       ├── page.tsx                          # "/auth/mitra" — Mitra Gate (Have Token vs Apply)
│   │       ├── apply/page.tsx                    # "/auth/mitra/apply" — Calon Mitra Form
│   │       ├── apply/success/page.tsx            # "/auth/mitra/apply/success"
│   │       ├── apply/status/page.tsx             # "/auth/mitra/apply/status"
│   │       ├── token/page.tsx                    # "/auth/mitra/token" — Input FSC-FARM-XXXX
│   │       └── verify/page.tsx                   # "/auth/mitra/verify" — 6-Digit OTP (123456)
│   │
│   ├── mitra/
│   │   ├── onboarding/
│   │   │   ├── page.tsx                          # "/mitra/onboarding" — Welcome Approved Partner
│   │   │   ├── business/page.tsx                 # "/mitra/onboarding/business"
│   │   │   ├── ponds/page.tsx                    # "/mitra/onboarding/ponds"
│   │   │   ├── installation/page.tsx             # "/mitra/onboarding/installation"
│   │   │   ├── status/page.tsx                   # "/mitra/onboarding/status"
│   │   │   └── activate/page.tsx                 # "/mitra/onboarding/activate"
│   │   └── (workspace)/                          # Guarded: role === 'mitra' + Floating Bottom Navbar
│   │       ├── layout.tsx
│   │       ├── dashboard/page.tsx                # "/mitra/dashboard" — Beranda (2x2 KPI Grid, Critical Alert, Tasks)
│   │       ├── ponds/page.tsx                    # "/mitra/ponds" — Daftar Kolam & Siklus
│   │       ├── ponds/[pondId]/page.tsx           # "/mitra/ponds/[pondId]" — Detail Kolam, Telemetry & AI Insight
│   │       ├── bsf/page.tsx                      # "/mitra/bsf" — BSF & Sirkular (Batches, IN-XXXX Inputs, Feed Allocation)
│   │       ├── market/page.tsx                   # "/mitra/market" — Pasar & Panen (Demand, Offers, Active Orders)
│   │       ├── devices/page.tsx                  # "/mitra/devices" — Perangkat IoT
│   │       └── reports/page.tsx                  # "/mitra/reports" — Laporan & Insight
│   │
│   ├── b2b/                                      # Guarded: role === 'b2b' + Floating Bottom Navbar
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx                    # "/b2b/dashboard" — Wallet Card, Upcoming Deliveries & Pickups
│   │   ├── procurement/page.tsx                  # "/b2b/procurement" — Bulk Fish Order Form (>= 50 kg)
│   │   ├── procurement/checkout/page.tsx         # "/b2b/procurement/checkout" — Price Breakdown & Tukar Poin Switch
│   │   ├── waste/page.tsx                        # "/b2b/waste" — Schedule Organic Waste Pickup & History
│   │   ├── waste/[contributionId]/page.tsx       # "/b2b/waste/[contributionId]" — 5-Step Circular Traceability Timeline
│   │   └── orders/page.tsx                       # "/b2b/orders" — Active & Past B2B Fish Orders
│   │
│   └── b2c/                                      # Guarded: role === 'b2c' + Floating Bottom Navbar
│       ├── layout.tsx
│       ├── marketplace/page.tsx                  # "/b2c/marketplace" — Retail Fish Catalog
│       ├── checkout/page.tsx                     # "/b2c/checkout" — Cart, Antar+Jemput Sampah Toggle & Tukar Poin
│       ├── wallet/page.tsx                       # "/b2c/wallet" — Circular Points Balance, QR Code & History
│       └── orders/page.tsx                       # "/b2c/orders" — Household Orders & Waste Pickups
│
├── (desktop)/
│   └── admin/                                    # Guarded: role === 'admin' + 216px Sidebar + Desktop Header
│       ├── layout.tsx
│       ├── page.tsx                              # Redirects to "/admin/leads"
│       ├── leads/page.tsx                        # "/admin/leads" — 11-Stage CRM Pipeline & Token Generator
│       ├── orchestrator/page.tsx                 # "/admin/orchestrator" — AI Supply-Demand Matching
│       └── waste/page.tsx                        # "/admin/waste" — Organic Waste Weight Verification & Point Minting
│
└── api/ai/                                       # Deterministic Mock AI REST Endpoints
    ├── ponds/[pondId]/insight/route.ts
    ├── ponds/[pondId]/biomass/route.ts
    └── allocation/suggest/route.ts
```

### Floating Bottom Navigation Configurations
- **Mitra (`MitraMobileShell`):**
  1. `Beranda` (`/mitra/dashboard`, icon: `LayoutGrid`)
  2. `Kolam & Ikan` (`/mitra/ponds`, icon: `Fish`)
  3. `BSF & Sirkular` (`/mitra/bsf`, icon: `Recycle`)
  4. `Pasar & Panen` (`/mitra/market`, icon: `Store`)
- **B2B (`B2BMobileShell`):**
  1. `Beranda` (`/b2b/dashboard`, icon: `LayoutGrid`)
  2. `Pesan Ikan` (`/b2b/procurement`, icon: `Fish`)
  3. `Setor Sampah` (`/b2b/waste`, icon: `Recycle`)
  4. `Pesanan` (`/b2b/orders`, icon: `ClipboardList`)
- **B2C (`B2CMobileShell`):**
  1. `Pasar Segar` (`/b2c/marketplace`, icon: `Store`)
  2. `Checkout` (`/b2c/checkout`, icon: `ShoppingBag`)
  3. `Dompet Poin` (`/b2c/wallet`, icon: `Wallet`)
  4. `Pesanan` (`/b2c/orders`, icon: `ClipboardList`)

---

## 3. Strict TypeScript Data Models (`lib/types.ts`)

Every domain model is strictly typed below with zero `any` or ambiguous fields:

```ts
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

export interface WaterTelemetry {
  recordedAt: string;                // ISO timestamp '2026-11-04T08:30:00+07:00'
  ph: number;                        // Safe: 6.5 - 8.5 (e.g. 7.1)
  temperatureC: number;              // Safe: 26.0 - 30.0 (e.g. 29.4)
  dissolvedOxygenMgL: number;        // Safe: >= 5.0 | Perhatian: 4.0 - 4.9 | Kritis: < 4.0 (e.g. 3.2)
  turbidityNtu: number;              // Safe: <= 30 (e.g. 24)
  ammoniaMgL: number;                // Safe: <= 0.05 (e.g. 0.02)
  trend: {
    ph: 'up' | 'down' | 'stable';
    temperatureC: 'up' | 'down' | 'stable';
    dissolvedOxygenMgL: 'up' | 'down' | 'stable';
    turbidityNtu: 'up' | 'down' | 'stable';
  };
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

export interface AiInsight {
  id: string;                        // 'INS-0012'
  pondId: string;                    // 'POND-02'
  severity: 'Kritis' | 'Perhatian' | 'Informasi';
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

export interface WasteContribution {
  id: string;                        // 'IN-0045'
  contributorUserId: string;         // 'USR-B2B-01'
  contributorName: string;           // 'ABC Restaurant'
  contributorRole: 'b2b' | 'b2c';
  category: WasteCategory;
  categoryLabel: string;             // 'Sisa Dapur & Restoran'
  estimatedKg: number;               // 42
  actualKg?: number;                 // 42 (populated on Admin verification)
  qualityGrade?: 'A' | 'B' | 'C';
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

export interface PointTransaction {
  id: string;                        // 'PTX-0105'
  walletId: string;                  // 'WAL-0007'
  type: 'EARN_WASTE' | 'REDEEM_ORDER';
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
  fulfilmentType: 'Antar Kurir Fiscycle' | 'Antar + Jemput Sampah' | 'Ambil di Depot';
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
```

---

## 4. Explicit Zustand State Management Architecture (`store/`)

All application state is partitioned into **5 explicitly typed Zustand stores** persisted under `localStorage` so that switching roles during the Golden Thread demo preserves every mutation deterministically.

### 4.1 `useAuthStore` (`store/useAuthStore.ts`)
Enforces **`1 User = 1 Role`**. Login sets `currentUser` and never shows a role selector; Registration stores `registerDraft` and commits the selected role at `/auth/register/role`.

```ts
export interface AuthStoreState {
  currentUser: User | null;
  users: User[];                                // Seeded accounts + newly registered accounts
  registerDraft: RegisterDraft | null;
  // Actions
  loginWithEmail: (email: string) => { ok: boolean; redirectTo?: string; error?: string };
  quickLoginAsRole: (role: Role) => string;     // Returns target workspace route immediately
  setRegisterDraft: (draft: RegisterDraft) => void;
  completeRegistrationWithRole: (role: Role) => { user: User; redirectTo: string };
  verifyMitraToken: (token: string, phoneOrEmail: string) => boolean;
  verifyMitraOtp: (otpCode: string) => boolean;
  completeMitraOnboarding: () => void;
  logout: () => void;
}
```

**Role Home Route Resolver (`getHomeRouteForUser(user: User)`):**
- `role === 'mitra'`: if `!user.partnerTokenVerified` → `/auth/mitra`; else if `!user.onboardingCompleted` → `/mitra/onboarding`; else → `/mitra/dashboard`
- `role === 'b2b'` → `/b2b/dashboard`
- `role === 'b2c'` → `/b2c/marketplace`
- `role === 'admin'` → `/admin/leads`

### 4.2 `useWastePointStore` (`store/useWastePointStore.ts`)
Manages B2B & B2C Circular Point wallets, organic waste pickup contributions (`IN-XXXX`), and Admin waste verification.

```ts
export interface WastePointStoreState {
  wallets: Record<string, CircularWallet>;      // Keyed by walletId ('WAL-0007', 'WAL-0012')
  contributions: WasteContribution[];           // Seeded IN-0042..IN-0044 + live IN-0045
  // Constants
  readonly pointsPerKg: 10;                     // 1 kg organic waste = 10 Poin
  readonly pointValueIdr: 100;                  // 1 Poin = Rp 100 (10 Poin = Rp 1.000)
  // Actions
  getWalletByUserId: (userId: string) => CircularWallet | undefined;
  submitWaste: (payload: {
    contributorUserId: string;
    contributorName: string;
    contributorRole: 'b2b' | 'b2c';
    category: WasteCategory;
    categoryLabel: string;
    estimatedKg: number;
    pickupDate: string;
    pickupSlot: string;
    pickupAddress: string;
  }) => WasteContribution;                      // Generates sequential ID 'IN-0045'
  verifyWaste: (
    contributionId: string,
    actualKg: number,
    qualityGrade: 'A' | 'B' | 'C',
    targetBsfBatchId: string
  ) => void;                                    // Credits actualKg * 10 pts to wallet & updates BSF batch
  rejectWaste: (contributionId: string, reason: string) => void;
  deductPointsForOrder: (walletId: string, pointsToRedeem: number, orderId: string) => void;
  resetWastePointStore: () => void;
}
```

### 4.3 `useB2BCartStore` (`store/useB2BCartStore.ts`)
Manages B2B bulk fish procurement drafts, point redemption calculations, B2C retail cart items, and submitted `FishOrder` records (`ORD-XXXX`).

```ts
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

export interface B2BCartStoreState {
  b2bDraft: B2BProcurementDraft;
  b2bRedeemPoints: boolean;
  b2cCart: B2CRetailCartItem[];
  b2cFulfilment: 'Antar + Jemput Sampah' | 'Ambil di Depot';
  b2cEstimatedWasteKg: number;
  b2cRedeemPoints: boolean;
  orders: FishOrder[];                          // Seeded ORD-0242..0244 + live ORD-0241
  retailCatalog: RetailFishProduct[];
  // Computed & Actions
  updateB2BDraft: (patch: Partial<B2BProcurementDraft>) => void;
  setB2BRedeemPoints: (enabled: boolean) => void;
  computeB2BCheckoutTotals: (walletBalancePoints: number) => {
    subtotalIdr: number;
    shippingIdr: number;
    redeemablePoints: number;
    discountIdr: number;
    totalIdr: number;
  };
  submitB2BOrder: (buyer: User, walletBalancePoints: number) => FishOrder; // Generates 'ORD-0241'
  addToB2CCart: (product: RetailFishProduct, qtyKg: number) => void;
  removeFromB2CCart: (productId: string) => void;
  setB2CFulfilment: (mode: 'Antar + Jemput Sampah' | 'Ambil di Depot') => void;
  setB2CRedeemPoints: (enabled: boolean) => void;
  submitB2COrder: (buyer: User, walletBalancePoints: number) => FishOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus, allocationId?: string) => void;
  resetB2BCartStore: () => void;
}
```

### 4.4 `useMitraStore` (`store/useMitraStore.ts`)
Manages farm profile, the 6 ponds with live telemetry & 7-day history, daily tasks, IoT devices, BSF batches, and supply allocation offers.

```ts
export interface MitraStoreState {
  farm: Farm;
  ponds: Pond[];                                // POND-01 to POND-06
  tasks: FarmTask[];
  devices: IoTDevice[];
  bsfBatches: BsfBatch[];                       // BSF-01 to BSF-04
  allocationOffers: SupplyAllocationOffer[];    // ALC-0031 etc.
  // Actions
  getPondSummaryCounts: () => {
    total: number;
    baik: number;
    perhatian: number;
    kritis: number;
  };
  resolvePondAlert: (pondId: string) => void;   // Sets POND-02 status -> 'Baik', DO -> 5.6 mg/L, marks insight resolved
  toggleTaskCompleted: (taskId: string) => void;
  addPondDuringOnboarding: (pond: Omit<Pond, 'id' | 'farmId' | 'telemetry' | 'telemetryHistory' | 'harvest' | 'feed'>) => void;
  linkVerifiedWasteToBsf: (batchId: string, contributionId: string, addedKg: number) => void;
  allocateBsfToPond: (batchId: string, pondId: string, maggotKg: number) => void;
  receiveAllocationOffer: (offer: SupplyAllocationOffer) => void;
  respondToAllocation: (offerId: string, accept: boolean) => void;
  resetMitraStore: () => void;
}
```

### 4.5 `useAdminStore` (`store/useAdminStore.ts`)
Manages the 11-stage CRM lead pipeline, sequential partner token issuance (`FSC-FARM-XXXX`), and AI supply-demand orchestration actions.

```ts
export interface AdminStoreState {
  leads: Lead[];                                // 8 detailed rows + stage counts
  selectedLeadId: string;
  selectedOrderIdForAllocation: string | null;
  nextTokenSequence: number;                    // Starts at 29 -> 'FSC-FARM-0029'
  // Actions
  selectLead: (leadId: string) => void;
  createLeadFromApplication: (payload: Omit<Lead, 'id' | 'stage' | 'picName' | 'nextFollowUpDate' | 'notes'>) => Lead;
  advanceLeadStage: (leadId: string, nextStage: LeadStage) => string | undefined; // Issues FSC-FARM-XXXX at 'kontrak'/'onboarding'
  approveSupplyAllocation: (
    orderId: string,
    allocations: { pondId: string; farmId: string; allocatedKg: number }[]
  ) => SupplyAllocationOffer[];
  resetAdminStore: () => void;
}
```

---

## 5. Deterministic Seed Data Specification (`mocks/seed.ts`)

1. **Seeded Users (`users`):**
   - `USR-MITRA-01`: **Budi Santoso** (`budi@tambakmakmur.id`, `role: 'mitra'`, `organizationName: 'Tambak Makmur'`, `farmId: 'FARM-0028'`, `partnerTokenVerified: true`, `onboardingCompleted: true`)
   - `USR-B2B-01`: **Hendro Wijaya — ABC Restaurant** (`procurement@abcrestaurant.id`, `role: 'b2b'`, `organizationName: 'ABC Restaurant'`, `walletId: 'WAL-0007'`)
   - `USR-B2C-01`: **Ibu Sari Wulandari** (`sari.wulandari@gmail.com`, `role: 'b2c'`, `organizationName: 'Rumah Tangga Surabaya'`, `walletId: 'WAL-0012'`)
   - `USR-ADMIN-01`: **Andi Pratama** (`admin@fiscycle.id`, `role: 'admin'`, `organizationName: 'Fiscycle Operations'`)
2. **Seeded Ponds (`ponds` in `FARM-0028` — Tambak Makmur):**
   - `POND-01` (**Kolam 1**): `Nila`, `status: 'Baik'`, `pH: 7.4`, `temperatureC: 28.1`, `dissolvedOxygenMgL: 6.2`, `turbidityNtu: 18`, `estimatedBiomassKg: 480`
   - `POND-02` (**Kolam 2**): `Nila`, `status: 'Kritis'`, `pH: 7.1`, `temperatureC: 29.4`, `dissolvedOxygenMgL: 3.2`, `turbidityNtu: 28`, `estimatedBiomassKg: 410`, active `AiInsight` (`INS-0012`: *"Kolam 2 — Oksigen Air Rendah 3,2 mg/L ↓"*)
   - `POND-03` (**Kolam 3**): `Bandeng`, `status: 'Perhatian'`, `pH: 7.8`, `temperatureC: 28.9`, `dissolvedOxygenMgL: 4.1`, `turbidityNtu: 26`, `estimatedBiomassKg: 390`
   - `POND-04` (**Kolam 4**): `Nila`, `status: 'Baik'`, `cycleStage: 'Siap Panen'`, `pH: 7.3`, `temperatureC: 28.0`, `dissolvedOxygenMgL: 6.4`, `turbidityNtu: 15`, `estimatedBiomassKg: 520`, `avgWeightG: 340`, `readinessStatus: 'Siap Panen'`, `windowStart: '2026-11-15'`, `windowEnd: '2026-11-18'`
   - `POND-05` (**Kolam 5**): `Bandeng`, `status: 'Baik'`, `pH: 7.5`, `temperatureC: 28.3`, `dissolvedOxygenMgL: 5.9`, `turbidityNtu: 19`, `estimatedBiomassKg: 400`
   - `POND-06` (**Kolam 6**): `Lele`, `status: 'Baik'`, `pH: 7.2`, `temperatureC: 28.5`, `dissolvedOxygenMgL: 5.7`, `turbidityNtu: 21`, `estimatedBiomassKg: 350`
3. **Seeded Wallets (`wallets`):**
   - `WAL-0007` (**ABC Restaurant**): `balancePoints: 2580` (`Rp 258.000`) → after Golden Thread Step 2 (`+420 Poin` from `42 kg` waste `IN-0045`) becomes **`3000 Poin` (`Rp 300.000`)**.
   - `WAL-0012` (**Ibu Sari**): `balancePoints: 450` (`Rp 45.000`).
