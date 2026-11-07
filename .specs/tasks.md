# Fiscycle — Atomic Implementation Tasks (Phase 2 — Modular Execution Plan v2)

> **Status:** READY FOR EXECUTION — decomposed for a lightweight code executor (Gemini Flash).
> **Locked sources:** [requirements.md](./requirements.md) · [design.md](./design.md). If this file and the locked specs ever disagree, the locked specs win — stop and escalate to the reviewer.
> **Size:** 6 Milestones · 31 Sub-Phases · 133 atomic sub-tasks · 31 audit checkpoints.

---

## 0. Global Execution Rules (apply to EVERY sub-task)

| # | Rule |
|---|---|
| **G1** | **Max 2 files per sub-task.** Write each file completely. No `// TODO`, no `...`, no "rest unchanged", no placeholder functions, no `any`, no `@ts-ignore`. |
| **G2** | Import alias is `@/*` (project root). All pages/components that read Zustand stores or use hooks start with `'use client';`. |
| **G3** | **Hydration:** all 5 stores use `persist` + `localStorage`. Any component reading persisted state must render only after `useHydrated()` returns `true` (see Task 1.5.1). `RoleGuard` already does this for workspace pages. |
| **G4** | **IDs:** generate only with `nextAvailableId()` from `@/lib/ids`. Never use `crypto.randomUUID()`, `Math.random()`, `Date.now()` or `nanoid` to create IDs. Timestamps (`createdAt`, `verifiedAt`) may use `new Date().toISOString()`. |
| **G5** | **Acyclic store graph** (cross-store calls only via `useXStore.getState()` *inside actions*): `useB2BCartStore` (leaf) ← `useMitraStore` ← `useWastePointStore`; `useAdminStore` → `useMitraStore` + `useB2BCartStore`; `useAuthStore` → `useAdminStore`. Never import in the reverse direction. |
| **G6** | **Copy:** 100% Bahasa Indonesia in UI. Numbers, Rupiah, points, weights and dates are rendered **only** through `@/lib/format` helpers (`3,2 mg/L`, `Rp 15.950.000`, `3.000 Poin`, `15–18 Nov 2026`). |
| **G7** | **Tokens (design.md §1):** Deep Navy `#1A365D` → `bg-brand-navy`/`text-brand-navy`; Vibrant Teal `#00B4D8` → `bg-brand-teal`/`text-brand-teal`; ink `#173251` → `text-ink`; action blue `#00629B` → `bg-primary`; auth teal `#0F766E` → `bg-auth-teal`. Primary cards `rounded-3xl`; nested items `rounded-2xl`/`rounded-xl`; badges `rounded-full`. Glass = `bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm`. |
| **G8** | **Zero AI slop (requirements.md §2.1):** no CCTV/video placeholders, no circular/radial gauges or donut "progress" rings (progress = horizontal `LinearProgressBar` + numeric text), no random IDs, no device chrome (`9:41`, signal, battery, home indicator), no Lorem Ipsum or English UI copy, no stock photos that are not exported from Figma. |
| **G9** | **Next.js 15+:** Route Handler `params` is a `Promise` (`const { pondId } = await params;`). Client pages read dynamic segments with `useParams()` and query strings with `useSearchParams()` wrapped in `<Suspense>`. |
| **G10** | **Baseline verification** for every sub-task: `pnpm typecheck` (zero errors) + `pnpm lint` (zero errors). Additional render/state checks are listed per task. |
| **G11** | **Persist keys:** `fiscycle-storage-v1-auth`, `fiscycle-storage-v1-waste`, `fiscycle-storage-v1-cart`, `fiscycle-storage-v1-mitra`, `fiscycle-storage-v1-admin` (all share the `fiscycle-storage-v1` prefix from requirements.md §4). |

### Deterministic ID sequences (first ID generated live)

| Prefix | Pad | `startAt` | Seeded IDs | First live ID |
|---|---|---|---|---|
| `IN` | 4 | 45 | `IN-0040`, `IN-0042`, `IN-0043`, `IN-0044` | **`IN-0045`** |
| `PTX` | 4 | 105 | `PTX-0101`..`PTX-0104` | **`PTX-0105`** |
| `ORD` | 4 | 241 | `ORD-0238`, `ORD-0239`, `ORD-0242`, `ORD-0243`, `ORD-0244` | **`ORD-0241`** (next: `ORD-0245`) |
| `ALC` | 4 | 31 | `ALC-0030` | **`ALC-0031`** |
| `LEAD` | 4 | 125 | `LEAD-0117`..`LEAD-0124` | **`LEAD-0125`** |
| `FSC-FARM` | 4 | 29 (`nextTokenSequence`) | `FSC-FARM-0027` (lead), `FSC-FARM-0028` (Budi) | **`FSC-FARM-0029`** |
| `USR-NEW` | 2 | 1 | — | **`USR-NEW-01`** |

---

## Milestone 1 — Project Foundation, Types, Seed Data & Zustand Stores

### Sub-Phase 1.1 — Scaffold, Tooling, Tokens & Assets

- [x] **Task 1.1.1: Scaffold Next.js App Router project & scripts**
  - **Mode & Ref:** `[Flash-Low]` | design.md §2 (route tree root) · requirements.md §1
  - **Target File(s):** `package.json`, `tsconfig.json`
  - **Dependencies & Store Bindings:** none (first task).
  - **Detailed Implementation Specs:**
    - Run `pnpm create next-app@latest . --ts --eslint --app --tailwind --no-src-dir --import-alias "@/*" --use-pnpm` in the repo root (keep existing `.specs/`).
    - Add scripts to `package.json`: `"typecheck": "tsc --noEmit"`, keep `dev`, `build`, `start`, `lint`.
    - In `tsconfig.json` ensure `"strict": true`, `"noUncheckedIndexedAccess": false`, `"paths": { "@/*": ["./*"] }`.
    - Delete the generated demo content of `app/page.tsx` (it will be moved to `app/(mobile)/page.tsx` in Task 2.6.1) — delete the file `app/page.tsx` entirely.
  - **UI & Anti-Slop Guardrails:** do not keep the Next.js starter SVGs (`public/next.svg`, `public/vercel.svg`) — delete them.
  - **Verify (DoD):** `pnpm typecheck` passes; `pnpm dev` boots without errors (404 on `/` is expected until Task 2.6.1).

- [x] **Task 1.1.2: Install runtime dependencies & initialise shadcn/ui**
  - **Mode & Ref:** `[Flash-Low]` | design.md §2 · requirements.md §2.2
  - **Target File(s):** `components.json`, `lib/utils.ts`
  - **Dependencies & Store Bindings:** Task 1.1.1.
  - **Detailed Implementation Specs:**
    - `pnpm add zustand lucide-react recharts qrcode.react clsx tailwind-merge sonner`.
    - `pnpm dlx shadcn@latest init` (style: new-york, base color: slate, CSS variables: yes).
    - `pnpm dlx shadcn@latest add button input label switch checkbox sheet select radio-group skeleton separator`.
    - `lib/utils.ts` exports exactly: `export function cn(...inputs: ClassValue[]): string { return twMerge(clsx(inputs)); }`.
  - **UI & Anti-Slop Guardrails:** do not add any shadcn chart/progress-circle component; do not add `nanoid` or `uuid`.
  - **Verify (DoD):** `pnpm typecheck`; `components/ui/button.tsx`, `switch.tsx`, `sheet.tsx` exist.

- [x] **Task 1.1.3: Implement exact design tokens in `app/globals.css`**
  - **Mode & Ref:** `[Flash-Low]` | design.md §1.1, §1.2, §1.3
  - **Target File(s):** `app/globals.css`
  - **Dependencies & Store Bindings:** Task 1.1.2 (shadcn may have written variables — replace them).
  - **Detailed Implementation Specs:**
    - Paste the `:root` + `@theme inline` block from design.md §1.3 verbatim.
    - Append inside `@theme inline`: `--color-background: var(--background); --color-foreground: var(--foreground); --color-primary-foreground: var(--primary-foreground); --color-muted-foreground: var(--muted-foreground); --color-border: var(--border); --color-input: var(--input); --color-ring: var(--ring);` and status border tokens `--color-success-border: #a7f3d0; --color-warning-border: #fde68a; --color-danger-border: #fecdd3; --color-info-border: #bae6fd; --color-violet-border: #ddd6fe; --color-info: #00629b; --color-info-soft: #e2f3fc;`.
    - Add `@layer base { body { @apply bg-canvas text-ink antialiased; } }`.
    - Add utility `@utility glass-surface { background-color: rgb(255 255 255 / 0.7); backdrop-filter: blur(24px); border: 1px solid rgb(255 255 255 / 0.4); box-shadow: 0 1px 2px rgb(0 0 0 / 0.05); }`.
  - **UI & Anti-Slop Guardrails:** `--radius: 1.5rem` (24px = `rounded-3xl`); keep `#1A365D` and `#00B4D8` exactly; no gradient or mesh utilities.
  - **Verify (DoD):** `pnpm build` compiles CSS; classes `bg-brand-navy`, `text-brand-teal`, `bg-success-soft`, `glass-surface` resolve (check in a temporary element, then remove it).

- [x] **Task 1.1.4: Root layout with Inter font & Sonner toaster**
  - **Mode & Ref:** `[Flash-Low]` | design.md §2 (`app/layout.tsx`)
  - **Target File(s):** `app/layout.tsx`
  - **Dependencies & Store Bindings:** `Toaster` from `sonner`; `Inter` from `next/font/google`.
  - **Detailed Implementation Specs:**
    - `const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--font-inter' });`
    - `export const metadata: Metadata = { title: 'Fiscycle — Ekosistem Perikanan Sirkular', description: 'Dari limbah menjadi sumber daya — Platform terintegrasi untuk ekosistem perikanan yang lebih berkelanjutan.' };`
    - `export const viewport: Viewport = { themeColor: '#1A365D', width: 'device-width', initialScale: 1 };`
    - `<html lang="id" className={inter.variable}><body className="font-sans">{children}<Toaster position="top-center" richColors /></body></html>`.
  - **UI & Anti-Slop Guardrails:** `lang="id"` mandatory; no theme toggle; no extra global wrappers (mobile/desktop containers live in route-group layouts).
  - **Verify (DoD):** `pnpm typecheck`; rendered `<html lang="id">` contains the Inter CSS variable class.

- [x] **Task 1.1.5: Export Figma raster assets into `public/images/`**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §2.1 (no non-Figma stock photos) · Figma `9:2522`, `35:5236`, `55:58235`, `69:2719`
  - **Target File(s):** `public/images/` (binary assets), `public/images/README.md`
  - **Dependencies & Store Bindings:** Figma Dev Mode MCP `get_design_context` (asset URLs are served from `http://localhost:3845/assets/...`).
  - **Detailed Implementation Specs:**
    - Download and save with these exact names: `logo-fiscycle.png` (node `79:28` "fardanpeler 1"), `logo-white.png` (node `25:24` "whitee 1"), `hero-pond.jpg` (node `25:23` mask group in `9:2522`), `pond-1.jpg`, `pond-2.jpg`, `pond-3.jpg` (the three `imgFishPond*` assets in `35:5303`), `bsf-batch-1.jpg`, `bsf-batch-2.jpg`, `bsf-batch-3.jpg` (batch thumbnails in `55:58235`), `prospect-farm.jpg` (`imgProspectFishFarm` in `69:2719`).
    - Duplicate `pond-1.jpg` → `pond-4.jpg`, `pond-2.jpg` → `pond-5.jpg`, `pond-3.jpg` → `pond-6.jpg`; duplicate `bsf-batch-1.jpg` → `bsf-batch-4.jpg`.
    - `public/images/README.md` lists every file with its source Figma node ID.
  - **UI & Anti-Slop Guardrails:** never download or invent images from the internet; every image must trace to a Figma node.
  - **Verify (DoD):** all 15 files exist with size > 0 bytes; `README.md` lists 15 entries.

> 🛑 **[AUDIT CHECKPOINT 1.1]** — Jalankan pnpm typecheck & git diff. Serahkan ke Argon/Opus untuk review kesesuaian dengan design.md sebelum lanjut ke Sub-Phase berikutnya.

### Sub-Phase 1.2 — Domain Types (split by domain + barrel)

- [x] **Task 1.2.1: Auth, Mitra Pond & IoT types**
  - **Mode & Ref:** `[Flash-Low]` | design.md §3 sections "1. AUTH & USER" and "2. MITRA TAMBAK, POND & IOT"
  - **Target File(s):** `lib/types/auth-mitra.ts`
  - **Dependencies & Store Bindings:** none.
  - **Detailed Implementation Specs:**
    - Copy **verbatim** from design.md §3: `Role`, `User`, `RegisterDraft`, `FishSpecies`, `PondStatus`, `CycleStage`, `WaterTelemetry`, `TelemetryHistoryPoint`, `HarvestEstimate`, `FeedProgress`, `AiInsight`, `Pond`, `Farm`, `FarmTask`, `IoTDevice`.
    - Add helper type: `export type TrendDirection = 'up' | 'down' | 'stable';` and use it inside `WaterTelemetry.trend` (same union, just named).
    - Add `export type TelemetryMetricKey = 'ph' | 'temperatureC' | 'dissolvedOxygenMgL' | 'turbidityNtu';`.
  - **UI & Anti-Slop Guardrails:** keep the Indonesian literal unions exactly (`'Baik' | 'Perhatian' | 'Kritis'`, `'Tebar Benih'`, `'Menjelang Panen'`).
  - **Verify (DoD):** `pnpm typecheck`; file exports 18 named types.

- [x] **Task 1.2.2: BSF, Waste & Circular Wallet types**
  - **Mode & Ref:** `[Flash-Low]` | design.md §3 section "3. BSF CIRCULAR & ORGANIC WASTE"
  - **Target File(s):** `lib/types/circular.ts`
  - **Dependencies & Store Bindings:** imports nothing.
  - **Detailed Implementation Specs:**
    - Copy verbatim: `BsfBatchStatus`, `BsfBatch`, `WasteCategory`, `WasteStatus`, `WasteContribution`, `PointTransaction`, `CircularWallet`.
    - **Additive extension (approved by architect, non-breaking):** `export interface BsfFeedAllocation { id: string; batchId: string; pondId: string; pondName: string; maggotKg: number; allocatedAt: string; }` — used for traceability step 5 ("Menjadi Pakan Kolam"). `id` format `BFA-0001`.
    - Add `export type QualityGrade = 'A' | 'B' | 'C';` and use it for `WasteContribution.qualityGrade`.
  - **UI & Anti-Slop Guardrails:** `WasteStatus` literals must stay `'Dijadwalkan' | 'Dijemput Kurir' | 'Menunggu Verifikasi' | 'Diterima' | 'Ditolak'`.
  - **Verify (DoD):** `pnpm typecheck`; file exports 10 named types.

- [x] **Task 1.2.3: Procurement, Market, Retail & Admin CRM types**
  - **Mode & Ref:** `[Flash-Low]` | design.md §3 sections "4. PROCUREMENT…" and "5. ADMIN CRM", §4.3 draft interfaces
  - **Target File(s):** `lib/types/commerce-admin.ts`
  - **Dependencies & Store Bindings:** `import type { FishSpecies } from './auth-mitra';`
  - **Detailed Implementation Specs:**
    - Copy verbatim: `OrderStatus`, `OrderFrequency`, `FishOrder`, `SupplyAllocationOffer`, `RetailFishProduct`, `LeadStage`, `Lead`.
    - Also move here (from design.md §4.3): `B2BProcurementDraft`, `B2CRetailCartItem`.
    - Add `export type FulfilmentType = FishOrder['fulfilmentType'];` and `export type B2CFulfilment = 'Antar + Jemput Sampah' | 'Ambil di Depot';`.
    - Add `export interface AllocationInput { pondId: string; farmId: string; allocatedKg: number; }` and `export interface AllocationSuggestion { pondId: string; pondName: string; farmId: string; farmName: string; species: FishSpecies; estimatedBiomassKg: number; avgWeightG: number; readinessStatus: 'Belum Siap' | 'Mendekati Panen' | 'Siap Panen'; windowStart: string; windowEnd: string; suggestedKg: number; matchScorePct: number; reason: string; }`.
  - **UI & Anti-Slop Guardrails:** `OrderStatus` must remain exactly the 5 literals of design.md (`'Menunggu Alokasi' | 'Dialokasikan' | 'Menunggu Panen' | 'Dalam Pengiriman' | 'Selesai'`).
  - **Verify (DoD):** `pnpm typecheck`; file exports 13 named types.

- [x] **Task 1.2.4: Type barrel `lib/types.ts`**
  - **Mode & Ref:** `[Flash-Low]` | design.md §3 (`lib/types.ts`)
  - **Target File(s):** `lib/types.ts`
  - **Dependencies & Store Bindings:** Tasks 1.2.1–1.2.3.
  - **Detailed Implementation Specs:**
    - Exactly three lines: `export type * from './types/auth-mitra';`, `export type * from './types/circular';`, `export type * from './types/commerce-admin';`.
    - From now on every module imports types only via `import type { … } from '@/lib/types';`.
  - **UI & Anti-Slop Guardrails:** no runtime code in type files.
  - **Verify (DoD):** `pnpm typecheck`; a scratch import `import type { Pond, CircularWallet, Lead } from '@/lib/types'` compiles (remove after check).

> 🛑 **[AUDIT CHECKPOINT 1.2]** — Jalankan pnpm typecheck & git diff. Serahkan ke Argon/Opus untuk review kesesuaian dengan design.md sebelum lanjut ke Sub-Phase berikutnya.

### Sub-Phase 1.3 — Constants, Formatters, IDs, Telemetry & Pricing Helpers

- [x] **Task 1.3.1: Business constants & label dictionaries**
  - **Mode & Ref:** `[Flash-Low]` | requirements.md §1, §4 · design.md §4.2, §4.5
  - **Target File(s):** `lib/constants.ts`
  - **Dependencies & Store Bindings:** `import type { FishSpecies, LeadStage, WasteCategory, Role } from '@/lib/types';`
  - **Detailed Implementation Specs:**
    - `POINTS_PER_KG = 10`, `POINT_VALUE_IDR = 100`, `MAX_REDEEM_RATIO = 0.2`, `MIN_B2B_ORDER_KG = 50`, `B2B_SHIPPING_IDR = 250000`, `B2C_SHIPPING_IDR: Record<'Antar + Jemput Sampah' | 'Ambil di Depot', number> = { 'Antar + Jemput Sampah': 10000, 'Ambil di Depot': 0 }`, `ALLOCATION_TOLERANCE = 0.05`, `DEMO_TODAY = '2026-11-04'`, `DEMO_OTP_CODE = '123456'`, `PARTNER_TOKEN_REGEX = /^FSC-FARM-\d{4}$/`.
    - `B2B_PRICE_PER_KG: Record<FishSpecies, number> = { Nila: 32000, Bandeng: 35000, Lele: 22000, 'Udang Vaname': 85000 }`.
    - `SIZE_GRADE_OPTIONS: Record<FishSpecies, string[]> = { Nila: ['200-300g/ekor','250-350g/ekor','300-400g/ekor'], Bandeng: ['300-400g/ekor','400-600g/ekor'], Lele: ['100-125g/ekor','125-170g/ekor'], 'Udang Vaname': ['50 ekor/kg','70 ekor/kg'] }`.
    - `WASTE_CATEGORY_LABELS: Record<WasteCategory, string> = { sisa_dapur: 'Sisa Dapur & Restoran', sayur_buah: 'Sisa Sayur & Buah', sisa_ikan: 'Sisa Olahan Ikan', campuran_organik: 'Campuran Organik' }`.
    - `LEAD_STAGE_ORDER: LeadStage[]` (11 entries in design order) and `LEAD_STAGE_LABELS: Record<LeadStage, string> = { lead_baru: 'Lead Baru', belum_dihubungi: 'Belum Dihubungi', call_terjadwal: 'Call Terjadwal', sudah_dihubungi: 'Sudah Dihubungi', qualified: 'Qualified', assessment: 'Assessment', penawaran: 'Penawaran', kontrak: 'Kontrak', onboarding: 'Onboarding', instalasi: 'Instalasi', mitra_aktif: 'Mitra Aktif' }`.
    - `ROLE_LABELS: Record<Role, string> = { mitra: 'Mitra Tambak', b2b: 'Usaha / Industri', b2c: 'Rumah Tangga', admin: 'Admin Fiscycle' }`.
    - `ORDER_STATUS_FLOW = ['Menunggu Alokasi','Dialokasikan','Menunggu Panen','Dalam Pengiriman','Selesai'] as const`.
  - **UI & Anti-Slop Guardrails:** all labels Bahasa Indonesia; values must equal the numbers above (they drive the Golden Thread math).
  - **Verify (DoD):** `pnpm typecheck`; `B2B_PRICE_PER_KG.Nila * 500 === 16000000`.

- [x] **Task 1.3.2: Indonesian locale formatters**
  - **Mode & Ref:** `[Flash-Low]` | requirements.md §2.1 · design.md §1 (copy rules)
  - **Target File(s):** `lib/format.ts`
  - **Dependencies & Store Bindings:** `POINT_VALUE_IDR` from `@/lib/constants`.
  - **Detailed Implementation Specs:**
    - `formatNumberId(value: number, decimals = 0): string` → uses `value.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })` (`3.2, 1` → `'3,2'`; `16000000` → `'16.000.000'`).
    - `formatRupiah(amount: number): string` → `` `Rp ${formatNumberId(Math.round(amount))}` `` with a normal space (`15950000` → `'Rp 15.950.000'`); negative values → `'-Rp 300.000'`.
    - `formatPoints(points: number): string` → `'3.000 Poin'`.
    - `pointsToRupiah(points: number): number` → `points * POINT_VALUE_IDR`.
    - `formatWeightKg(kg: number, decimals = 0): string` → `'1.000 kg'`; `formatMetric(value: number, unit: string, decimals = 1)` → `'3,2 mg/L'`.
    - `const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];` `formatDateId('2026-11-15')` → `'15 Nov 2026'` (parse the `YYYY-MM-DD` string manually — no `Date` timezone shifts); `formatDateRangeId('2026-11-15','2026-11-18')` → `'15–18 Nov 2026'` (en dash; if months differ → `'29 Nov – 2 Des 2026'`).
    - `formatPercent(value: number, decimals = 0)` → `'96%'`.
  - **UI & Anti-Slop Guardrails:** never use `Intl.NumberFormat` currency style (it injects a non-breaking space and `,00`).
  - **Verify (DoD):** `pnpm typecheck`; manual check in a scratch script: `formatRupiah(15950000) === 'Rp 15.950.000'`, `formatMetric(3.2,'mg/L') === '3,2 mg/L'`, `formatDateRangeId('2026-11-15','2026-11-18') === '15–18 Nov 2026'`.

- [x] **Task 1.3.3: Deterministic sequential ID generator**
  - **Mode & Ref:** `[Flash-Low]` | requirements.md §2.1 (no random UUID) · §0 ID table of this file
  - **Target File(s):** `lib/ids.ts`
  - **Dependencies & Store Bindings:** none.
  - **Detailed Implementation Specs:**
    - `export function nextAvailableId(prefix: string, existingIds: readonly string[], startAt: number, pad = 4): string` → loops `n = startAt, startAt+1, …` and returns the first `` `${prefix}-${String(n).padStart(pad,'0')}` `` not contained in `existingIds`.
    - Examples (document as JSDoc): `nextAvailableId('ORD', ['ORD-0238','ORD-0239','ORD-0242','ORD-0243','ORD-0244'], 241)` → `'ORD-0241'`; called again with `'ORD-0241'` added → `'ORD-0245'`. `nextAvailableId('IN', ['IN-0040','IN-0042','IN-0043','IN-0044'], 45)` → `'IN-0045'`.
    - `export function formatPartnerToken(sequence: number): string` → `` `FSC-FARM-${String(sequence).padStart(4,'0')}` `` (`29` → `'FSC-FARM-0029'`).
  - **UI & Anti-Slop Guardrails:** no randomness, no timestamps in IDs.
  - **Verify (DoD):** `pnpm typecheck`; both JSDoc examples produce the documented output in a scratch run.

- [x] **Task 1.3.4: Telemetry threshold evaluation**
  - **Mode & Ref:** `[Flash-Med]` | design.md §3 (`WaterTelemetry` safe ranges) · requirements.md §5.2 MIT-02, MIT-05
  - **Target File(s):** `lib/telemetry.ts`
  - **Dependencies & Store Bindings:** `import type { PondStatus, WaterTelemetry, TelemetryMetricKey } from '@/lib/types';`
  - **Detailed Implementation Specs:**
    - `export const METRIC_META: Record<TelemetryMetricKey, { label: string; unit: string; decimals: number; safeText: string }>` = `ph: { 'pH Air', '', 1, 'Aman 6,5 – 8,5' }`, `temperatureC: { 'Suhu Air', '°C', 1, 'Aman 26 – 30 °C' }`, `dissolvedOxygenMgL: { 'Oksigen Terlarut (DO)', 'mg/L', 1, 'Minimal 5,0 mg/L' }`, `turbidityNtu: { 'Kekeruhan', 'NTU', 0, 'Maksimal 30 NTU' }`.
    - `export function evaluateMetric(key: TelemetryMetricKey, value: number): PondStatus` with rules: **pH** Baik 6.5–8.5, Perhatian 6.0–6.49 or 8.51–9.0, else Kritis; **Suhu** Baik 26–30, Perhatian 24–25.99 or 30.01–32, else Kritis; **DO** Baik ≥ 5.0, Perhatian 4.0–4.99, Kritis < 4.0; **Kekeruhan** Baik ≤ 30, Perhatian 30.01–50, Kritis > 50.
    - `export function derivePondStatus(t: WaterTelemetry): PondStatus` → worst of the 4 metrics (Kritis > Perhatian > Baik).
    - `export function countSafePonds(ponds: { telemetry: WaterTelemetry }[], key: TelemetryMetricKey): number` → number of ponds where `evaluateMetric === 'Baik'`.
  - **UI & Anti-Slop Guardrails:** pure functions only, no UI.
  - **Verify (DoD):** `pnpm typecheck`; `evaluateMetric('dissolvedOxygenMgL', 3.2) === 'Kritis'`, `evaluateMetric('dissolvedOxygenMgL', 4.1) === 'Perhatian'`, `evaluateMetric('dissolvedOxygenMgL', 5.6) === 'Baik'`.

- [x] **Task 1.3.5: Point redemption & checkout pricing helpers**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §4 Step 4, B2B-03 · design.md §4.3
  - **Target File(s):** `lib/pricing.ts`
  - **Dependencies & Store Bindings:** `POINT_VALUE_IDR`, `MAX_REDEEM_RATIO` from `@/lib/constants`.
  - **Detailed Implementation Specs:**
    - `export function computePointRedemption(input: { balancePoints: number; subtotalIdr: number; enabled: boolean }): { redeemablePoints: number; discountIdr: number }`:
      - if `!enabled || balancePoints <= 0` → `{ 0, 0 }`;
      - `maxDiscount = Math.min(balancePoints * POINT_VALUE_IDR, Math.floor(subtotalIdr * MAX_REDEEM_RATIO))` (formula `min(balance * 100, subtotal * 0.2)`);
      - `redeemablePoints = Math.floor(maxDiscount / POINT_VALUE_IDR)`; `discountIdr = redeemablePoints * POINT_VALUE_IDR`.
    - `export function computeCheckoutTotals(input: { subtotalIdr: number; shippingIdr: number; balancePoints: number; redeem: boolean })` → `{ subtotalIdr, shippingIdr, redeemablePoints, discountIdr, totalIdr: subtotalIdr + shippingIdr - discountIdr }`.
    - JSDoc golden example: `subtotal 16.000.000, shipping 250.000, balance 3.000, redeem true` → `redeemablePoints 3000, discountIdr 300000, totalIdr 15950000`.
  - **UI & Anti-Slop Guardrails:** integer math only; never produce fractional points.
  - **Verify (DoD):** `pnpm typecheck`; the golden example returns exactly `{ 16000000, 250000, 3000, 300000, 15950000 }`.

> 🛑 **[AUDIT CHECKPOINT 1.3]** — Jalankan pnpm typecheck & git diff. Serahkan ke Argon/Opus untuk review kesesuaian dengan design.md sebelum lanjut ke Sub-Phase berikutnya.

### Sub-Phase 1.4 — Deterministic Seed Data (4 modular files)

- [x] **Task 1.4.1: Seed users, wallets & point transactions**
  - **Mode & Ref:** `[Flash-Med]` | design.md §5.1, §5.3 · requirements.md §4 Steps 1–2
  - **Target File(s):** `mocks/seedUsersAndWallets.ts`
  - **Dependencies & Store Bindings:** `import type { User, CircularWallet, PointTransaction } from '@/lib/types';`
  - **Detailed Implementation Specs:**
    - `export const SEED_USERS: User[]` (4 entries):
      - `USR-MITRA-01` Budi Santoso · `budi@tambakmakmur.id` · `081234567890` · `mitra` · org `Tambak Makmur` · initials `BS` · `farmId: 'FARM-0028'` · `partnerTokenVerified: true` · `onboardingCompleted: true`.
      - `USR-B2B-01` Hendro Wijaya · `procurement@abcrestaurant.id` · `081355550007` · `b2b` · org `ABC Restaurant` · initials `AR` · `walletId: 'WAL-0007'`.
      - `USR-B2C-01` Ibu Sari Wulandari · `sari.wulandari@gmail.com` · `081277770012` · `b2c` · org `Rumah Tangga Surabaya` · initials `SW` · `walletId: 'WAL-0012'`.
      - `USR-ADMIN-01` Andi Pratama · `admin@fiscycle.id` · `081199990001` · `admin` · org `Fiscycle Operations` · initials `AP`.
    - `export const SEED_ADDRESSES = { 'USR-B2B-01': 'Jl. Raya Darmo No. 88, Surabaya', 'USR-B2C-01': 'Jl. Manyar Kertoarjo No. 21, Surabaya' } as const;`
    - Transactions (all `EARN_WASTE`): `PTX-0101` WAL-0007 `+1260` Rp 126.000 ref `IN-0038` "Setoran Sampah Organik 126 kg (IN-0038)" `2026-10-14T10:00:00+07:00`; `PTX-0102` WAL-0007 `+900` Rp 90.000 ref `IN-0040` "Setoran Sampah Organik 90 kg (IN-0040)" `2026-10-28T14:00:00+07:00`; `PTX-0103` WAL-0007 `+420` Rp 42.000 ref `IN-0036` "Setoran Sampah Organik 42 kg (IN-0036)" `2026-10-07T09:30:00+07:00`; `PTX-0104` WAL-0012 `+450` Rp 45.000 ref `IN-0041` "Jemput Sampah Dapur 45 kg (IN-0041)" `2026-10-30T17:00:00+07:00`.
    - `export const SEED_WALLETS: Record<string, CircularWallet>`:
      - `WAL-0007` userId `USR-B2B-01` owner `ABC Restaurant` · `balancePoints: 2580` · `lifetimeEarnedPoints: 2580` · `lifetimeRedeemedPoints: 0` · `totalWasteContributedKg: 258` · `qrCodePayload: 'FISCYCLE:WAL-0007'` · transactions `[PTX-0102, PTX-0101, PTX-0103]` (newest first).
      - `WAL-0012` userId `USR-B2C-01` owner `Ibu Sari Wulandari` · `balancePoints: 450` · earned `450` · redeemed `0` · `totalWasteContributedKg: 45` · `qrCodePayload: 'FISCYCLE:WAL-0012'` · transactions `[PTX-0104]`.
  - **UI & Anti-Slop Guardrails:** balances must sum exactly from transactions (1260 + 900 + 420 = 2580). No extra users.
  - **Verify (DoD):** `pnpm typecheck`; `SEED_WALLETS['WAL-0007'].balancePoints === 2580`.

- [x] **Task 1.4.2: Seed Mitra farm, 6 ponds (7-day history), devices, tasks & 4 BSF batches**
  - **Mode & Ref:** `[Flash-High]` | design.md §5.2, §3 (Pond, BsfBatch) · requirements.md §4 Step 3 · Figma `35:5236`, `69:73655`
  - **Target File(s):** `mocks/seedMitraFarm.ts`
  - **Dependencies & Store Bindings:** `import type { Farm, Pond, FarmTask, IoTDevice, BsfBatch, BsfFeedAllocation, SupplyAllocationOffer, TelemetryHistoryPoint } from '@/lib/types';`
  - **Detailed Implementation Specs:**
    - `SEED_FARM`: `FARM-0028` · token `FSC-FARM-0028` · `Tambak Makmur` · owner `USR-MITRA-01` · `Lamongan`, `Jawa Timur` · `totalAreaM2: 2400` · `sensorLastSyncedText: 'Terhubung · 2 menit lalu'`.
    - Helper `const DAYS = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];` and `function history(ph: number[], temp: number[], dO: number[], ntu: number[]): TelemetryHistoryPoint[]`.
    - `SEED_PONDS` (last history value = current telemetry; `recordedAt: '2026-11-04T08:30:00+07:00'`; `imageUrl: '/images/pond-N.jpg'`; `ammoniaMgL` 0.02 for all except POND-02 = 0.04):

      | ID / name | Species | Status | Area/Depth | Stocked / pop / day / stage | pH hist | Suhu hist | DO hist | NTU hist | Harvest (kg, avg g, size, SR, window, readiness, conf) | Feed (target, realized, BSF %, next) |
      |---|---|---|---|---|---|---|---|---|---|---|
      | `POND-01` Kolam 1 | Nila | Baik | 400 / 1.5 | 2026-08-20 / 6000 / 76 / Menjelang Panen | 7.3,7.4,7.4,7.5,7.4,7.3,7.4 | 28.0,28.2,28.1,28.3,28.0,28.2,28.1 | 6.0,6.1,6.3,6.2,6.0,6.1,6.2 | 17,18,18,19,17,18,18 | 480, 310, '300-400g', 92.0, 2026-11-22→25, Mendekati Panen, 91 | 16.0, 10.5, 30, '16:30 WIB' |
      | `POND-02` Kolam 2 | Nila | Kritis | 400 / 1.5 | 2026-08-25 / 6000 / 71 / Pertumbuhan | 7.3,7.3,7.2,7.2,7.1,7.1,7.1 | 28.6,28.8,29.0,29.1,29.2,29.3,29.4 | 5.4,5.1,4.8,4.4,4.0,3.6,3.2 | 22,23,24,25,26,27,28 | 410, 270, '300-400g', 88.5, 2026-11-29→12-02, Belum Siap, 86 | 15.0, 8.0, 30, '16:30 WIB' |
      | `POND-03` Kolam 3 | Bandeng | Perhatian | 450 / 1.4 | 2026-08-10 / 5000 / 86 / Menjelang Panen | 7.6,7.6,7.7,7.7,7.8,7.8,7.8 | 28.5,28.6,28.6,28.7,28.8,28.8,28.9 | 5.0,4.9,4.7,4.5,4.4,4.2,4.1 | 22,23,23,24,25,25,26 | 390, 380, '400-600g', 90.0, 2026-11-20→23, Mendekati Panen, 89 | 14.0, 9.0, 35, '16:30 WIB' |
      | `POND-04` Kolam 4 | Nila | Baik | 400 / 1.5 | 2026-08-01 / 6000 / 95 / Siap Panen | 7.2,7.3,7.3,7.3,7.2,7.3,7.3 | 27.8,27.9,28.0,28.1,28.0,27.9,28.0 | 6.3,6.4,6.5,6.4,6.3,6.4,6.4 | 14,15,15,16,15,15,15 | 520, 340, '300-400g', 91.5, 2026-11-15→18, Siap Panen, 94 | 18.0, 12.5, 35, '16:30 WIB' |
      | `POND-05` Kolam 5 | Bandeng | Baik | 400 / 1.4 | 2026-09-01 / 5000 / 64 / Pertumbuhan | 7.4,7.5,7.5,7.5,7.4,7.5,7.5 | 28.1,28.2,28.3,28.4,28.3,28.2,28.3 | 5.8,5.9,6.0,5.9,5.8,5.9,5.9 | 18,19,19,20,19,19,19 | 400, 300, '400-600g', 93.0, 2026-12-10→14, Belum Siap, 84 | 13.0, 8.5, 30, '17:00 WIB' |
      | `POND-06` Kolam 6 | Lele | Baik | 350 / 1.2 | 2026-09-20 / 9000 / 45 / Pertumbuhan | 7.1,7.2,7.2,7.3,7.2,7.2,7.2 | 28.3,28.4,28.5,28.6,28.5,28.4,28.5 | 5.6,5.7,5.8,5.7,5.6,5.7,5.7 | 20,21,21,22,21,21,21 | 350, 120, '125-170g', 89.0, 2026-11-28→30, Mendekati Panen, 88 | 20.0, 14.0, 40, '17:00 WIB' |

    - Trends: POND-02 `{ ph: 'stable', temperatureC: 'up', dissolvedOxygenMgL: 'down', turbidityNtu: 'up' }`; POND-03 `{ ph: 'up', temperatureC: 'up', dissolvedOxygenMgL: 'down', turbidityNtu: 'up' }`; all others all `'stable'`.
    - `activeInsight` on POND-02: `INS-0012`, severity `Kritis`, parameterLabel `Oksigen Terlarut (DO) Rendah`, currentValueText `3,2 mg/L ↓`, safeThresholdText `Minimal 5,0 mg/L`, title `Kolam 2 — Oksigen Air Rendah (Kritis)`, summary `Kadar DO turun di bawah ambang aman akibat kepadatan biomassa dan suhu siang.`, recommendedActions `['Nyalakan 2 kincir aerator cadangan sekarang', 'Tunda pemberian pakan sore 2 jam', 'Ukur ulang DO 30 menit setelah aerasi']`, `resolved: false`.
    - `activeInsight` on POND-03: `INS-0013`, severity `Perhatian`, parameterLabel `Oksigen Terlarut (DO) Menurun`, currentValueText `4,1 mg/L ↓`, safeThresholdText `Minimal 5,0 mg/L`, title `Kolam 3 — DO Mendekati Batas (Perhatian)`, summary `DO turun bertahap selama 6 hari terakhir seiring kenaikan kekeruhan.`, recommendedActions `['Nyalakan kincir aerator pukul 02.00–05.00', 'Kurangi pakan malam 20%']`, `resolved: false`.
    - `SEED_TASKS` (2 / 5 completed): `TSK-01` POND-02 `Nyalakan aerator tambahan Kolam 2` `08:00 WIB` Kualitas Air `false`; `TSK-02` POND-01 `Pemberian pakan pagi Kolam 1` `06:30 WIB` Pakan `true`; `TSK-03` POND-04 `Pemberian pakan pagi Kolam 4` `07:00 WIB` Pakan `true`; `TSK-04` POND-04 `Sampling bobot ikan Kolam 4 sebelum panen` `10:00 WIB` Panen `false`; `TSK-05` POND-03 `Pakan sore Kolam 3 (campuran maggot BSF)` `16:30 WIB` BSF `false`.
    - `SEED_DEVICES`: `DEV-GW-01` POND-01 Kolam 1 `Gateway LoRa Utama` Gateway LoRa Online 100 `30 detik lalu`; `DEV-DO-05` POND-02 Kolam 2 `Sensor Oksigen DO-05` Sensor DO **Perlu Kalibrasi** 41 `1 menit lalu`; `DEV-PH-02` POND-01 Kolam 1 `Sensor pH PH-02` Sensor pH Online 88 `1 menit lalu`; `DEV-PH-03` POND-03 Kolam 3 `Sensor pH PH-03` Sensor pH Online 76 `2 menit lalu`; `DEV-TMP-04` POND-04 Kolam 4 `Sensor Suhu TMP-04` Sensor Suhu Online 92 `1 menit lalu`; `DEV-DO-06` POND-06 Kolam 6 `Sensor Oksigen DO-06` Sensor DO **Offline** 12 `3 jam lalu`.
    - `SEED_BSF_BATCHES` (`farmId: 'FARM-0028'`, `name: 'Batch BSF-0X'`):
      - `BSF-01` day 13 · Siap Panen · input 150 · est. yield 38 · harvested 0 · allocated 0 · media 30.8 °C / 60% · harvest `2026-11-05` · sources `['IN-0043']`.
      - `BSF-02` day 10 · Perhatian · input 120 · est. yield 30 · harvested 0 · allocated 0 · media 31.2 °C / 48% · harvest `2026-11-08` · sources `[]`.
      - `BSF-03` day 4 · Normal · input 90 · est. yield 24 · harvested 0 · allocated 0 · media 30.1 °C / 66% · harvest `2026-11-14` · sources `['IN-0040']`.
      - `BSF-04` day 8 · Normal · input **100** · est. yield 35 · harvested **85** · allocated **60** · media 32.5 °C / 64% · harvest `2026-11-09` · sources `['IN-0042']` (after Golden Thread: input 142, sources `['IN-0042','IN-0045']`, allocated 85).
    - `SEED_BSF_FEED_ALLOCATIONS: BsfFeedAllocation[] = [{ id: 'BFA-0001', batchId: 'BSF-04', pondId: 'POND-01', pondName: 'Kolam 1', maggotKg: 60, allocatedAt: '2026-11-01T09:00:00+07:00' }]`.
    - `SEED_ALLOCATION_OFFERS: SupplyAllocationOffer[] = [{ id: 'ALC-0030', orderId: 'ORD-0242', buyerName: 'Budi Sejahtera', buyerCity: 'Bandung', species: 'Nila', sizeGradeLabel: '250-350g/ekor', allocatedKg: 300, pricePerKgIdr: 32000, estimatedPayoutIdr: 9600000, farmId: 'FARM-0028', pondId: 'POND-01', pondName: 'Kolam 1', targetHarvestDate: '2026-11-22', aiMatchScorePct: 82, status: 'Diterima', createdAt: '2026-11-01T10:00:00+07:00' }]`.
  - **UI & Anti-Slop Guardrails:** every number above is mandatory; summary counts must evaluate to Total 6 / Baik 4 / Perhatian 1 / Kritis 1; areas sum to 2400.
  - **Verify (DoD):** `pnpm typecheck`; `SEED_PONDS.filter(p => p.status === 'Kritis').length === 1`; every pond's last history DO equals `telemetry.dissolvedOxygenMgL`.

- [x] **Task 1.4.3: Seed waste contributions, retail catalog & orders**
  - **Mode & Ref:** `[Flash-Med]` | design.md §3 (WasteContribution, FishOrder, RetailFishProduct) · requirements.md §4 · Figma `69:73868`, `69:75439`
  - **Target File(s):** `mocks/seedWasteAndOrders.ts`
  - **Dependencies & Store Bindings:** `import type { WasteContribution, FishOrder, RetailFishProduct } from '@/lib/types';`
  - **Detailed Implementation Specs:**
    - `SEED_CONTRIBUTIONS` (newest first):
      - `IN-0044` `USR-B2B-02` `Hotel Surabaya` b2b `campuran_organik` "Campuran Organik" est 38 · `Menunggu Verifikasi` · points 0 · pickup `2026-11-04` `10:00 - 12:00 WIB` · `Jl. Pemuda No. 31, Surabaya` · createdAt `2026-11-03T15:00:00+07:00`.
      - `IN-0043` `USR-B2B-04` `Pasar Induk Osowilangun` b2b `sayur_buah` "Sisa Sayur & Buah" est 50 · actual 50 · grade B · `Diterima` · points 500 · BSF `BSF-01` · pickup `2026-10-29` `06:00 - 08:00 WIB` · `Jl. Osowilangun No. 1, Surabaya` · verifiedAt `2026-10-29T11:00:00+07:00`.
      - `IN-0042` `USR-B2B-03` `Katering Sejati` b2b `sisa_dapur` "Sisa Dapur & Restoran" est 35 · actual 35 · grade A · `Diterima` · points 350 · BSF `BSF-04` · pickup `2026-10-29` `08:00 - 10:00 WIB` · `Jl. Kertajaya No. 12, Surabaya` · verifiedAt `2026-10-29T13:00:00+07:00`.
      - `IN-0040` `USR-B2B-01` `ABC Restaurant` b2b `sisa_dapur` est 90 · actual 90 · grade A · `Diterima` · points 900 · BSF `BSF-03` · pickup `2026-10-28` `08:00 - 10:00 WIB` · `Jl. Raya Darmo No. 88, Surabaya` · verifiedAt `2026-10-28T14:00:00+07:00`.
    - `SEED_RETAIL_CATALOG`:
      - `PRD-01` `Ikan Nila Segar Sirkular (Isi 3-4 Ekor)` Nila · `Tambak Makmur · Lamongan` · 14.2 km · Rp 34.000/kg · `300-400g/ekor` · stock 120 · `Panen Pagi Ini · Bebas Bau Tanah` · `/images/pond-4.jpg`.
      - `PRD-02` `Ikan Bandeng Segar (Isi 2-3 Ekor)` Bandeng · `Tambak Makmur · Lamongan` · 14.2 km · Rp 38.000/kg · `400-600g/ekor` · stock 80 · `Panen Kemarin Sore` · `/images/pond-3.jpg`.
      - `PRD-03` `Ikan Lele Segar (Isi 6-8 Ekor)` Lele · `Tambak Sumber Rejeki · Sidoarjo` · 22.5 km · Rp 24.000/kg · `125-170g/ekor` · stock 150 · `Panen Pagi Ini` · `/images/pond-6.jpg`.
      - `PRD-04` `Udang Vaname Segar Size 50` Udang Vaname · `Tambak Sumber Rejeki · Sidoarjo` · 22.5 km · Rp 92.000/kg · `50 ekor/kg` · stock 40 · `Panen Pagi Ini · Dikemas Es` · `/images/pond-5.jpg`.
    - `SEED_ORDERS`:
      - `ORD-0244` `USR-B2B-07` `Warung Laut` b2b · Nila `200-300g/ekor` 200 kg @32.000 · Sekali · Antar Kurir Fiscycle · `2026-11-15` · `Jl. Kenjeran No. 45, Surabaya` · subtotal 6.400.000 · shipping 250.000 · pts 0 · disc 0 · total 6.650.000 · `Menunggu Alokasi` · `[]` · `2026-11-03T08:00:00+07:00`.
      - `ORD-0243` `USR-B2B-06` `PT FreshMart` b2b · Bandeng `400-600g/ekor` 1000 kg @35.000 · Dua Mingguan · Antar Kurir Fiscycle · `2026-11-06` · `Jl. Gatot Subroto Kav. 12, Jakarta` · 35.000.000 · 250.000 · 0 · 0 · 35.250.000 · `Dalam Pengiriman` · `['ALC-0029']` · `2026-10-25T09:00:00+07:00`.
      - `ORD-0242` `USR-B2B-05` `Budi Sejahtera` b2b · Nila `250-350g/ekor` 300 kg @32.000 · Mingguan · Antar Kurir Fiscycle · `2026-11-12` · `Jl. Asia Afrika No. 120, Bandung` · 9.600.000 · 250.000 · 0 · 0 · 9.850.000 · `Menunggu Panen` · `['ALC-0030']` · `2026-11-01T09:00:00+07:00`.
      - `ORD-0239` `USR-B2C-01` `Ibu Sari Wulandari` b2c · Nila `300-400g/ekor` 3 kg @34.000 · Sekali · Antar + Jemput Sampah · `2026-10-30` · `Jl. Manyar Kertoarjo No. 21, Surabaya` · 102.000 · 10.000 · 0 · 0 · 112.000 · `Selesai` · `[]` · `2026-10-29T19:00:00+07:00`.
      - `ORD-0238` `USR-B2B-01` `ABC Restaurant` b2b · Bandeng `400-600g/ekor` 200 kg @35.000 · Sekali · Antar Kurir Fiscycle · `2026-10-20` · `Jl. Raya Darmo No. 88, Surabaya` · 7.000.000 · 250.000 · 0 · 0 · 7.250.000 · `Selesai` · `['ALC-0027']` · `2026-10-10T09:00:00+07:00`.
  - **UI & Anti-Slop Guardrails:** do **not** seed `IN-0045`, `ORD-0241`, `ALC-0031` — they are created live in the demo.
  - **Verify (DoD):** `pnpm typecheck`; `SEED_CONTRIBUTIONS.filter(c => c.status === 'Menunggu Verifikasi').length === 1`; `SEED_ORDERS.filter(o => o.status === 'Menunggu Alokasi').length === 1`.

- [x] **Task 1.4.4: Seed 8 CRM leads, historical stage counts & barrel `mocks/seed.ts`**
  - **Mode & Ref:** `[Flash-Med]` | design.md §3 (Lead), §4.5 · requirements.md ADM-01 · Figma `69:2719`
  - **Target File(s):** `mocks/seedAdminLeads.ts`, `mocks/seed.ts`
  - **Dependencies & Store Bindings:** `import type { Lead, LeadStage } from '@/lib/types';` Tasks 1.4.1–1.4.3.
  - **Detailed Implementation Specs:**
    - `SEED_LEADS` (province `Jawa Timur` for all; `notes` as listed):
      - `LEAD-0117` Budi Santoso · Tambak Maju Jaya · Lamongan · `0812-3456-7890` · `budi.maju@gmail.com` · 1800 m² · 4 kolam · Nila · `lead_baru` · PIC Andi Pratama · `2026-11-04 10:00 WIB` · notes `['Mengisi form Hubungi Kami']`.
      - `LEAD-0118` Agus Widodo · Mina Makmur · Gresik · `0813-2211-4580` · `agus.minamakmur@gmail.com` · 2500 · 5 · Bandeng · `belum_dihubungi` · Sinta Maharani · `2026-11-06 09:00 WIB` · `['Referensi dari Dinas Perikanan Gresik']`.
      - `LEAD-0119` Ahmad Fauzi · Tambak Berkah · Sidoarjo · `0857-3311-2290` · `fauzi.berkah@gmail.com` · 1200 · 3 · Udang Vaname · `call_terjadwal` · Rudy Hartanto · `2026-11-04 13:00 WIB` · `['Call perkenalan dijadwalkan']`.
      - `LEAD-0120` Dedi Saputra · Mina Sejahtera · Probolinggo · `0821-4455-6677` · `dedi.minasejahtera@gmail.com` · 3000 · 6 · Nila · `qualified` · Andi Pratama · `2026-11-07 10:00 WIB` · `['Lolos kualifikasi lahan & legalitas']`.
      - `LEAD-0121` Rudi Hartono · Tambak Rejeki · Blitar · `0812-7788-9900` · `rudi.rejeki@gmail.com` · 1600 · 4 · Lele · `assessment` · Dian Puspita · `2026-11-08 14:00 WIB` · `['Survei kualitas air dijadwalkan']`.
      - `LEAD-0122` Hendra Wijaya · Mina Lestari · Tulungagung · `0838-1122-3344` · `hendra.lestari@gmail.com` · 2200 · 5 · Nila · `penawaran` · Sinta Maharani · `2026-11-09 11:00 WIB` · `['Proposal kemitraan dikirim']`.
      - `LEAD-0123` Wawan Kurniawan · Tambak Sentosa · Malang · `0819-5566-7788` · `wawan.sentosa@gmail.com` · 2000 · 4 · Bandeng · `kontrak` · Rudy Hartanto · `2026-11-10 10:00 WIB` · no token yet · `['Draf kontrak ditinjau pemilik']`.
      - `LEAD-0124` Slamet Raharjo · Mina Bahari · Pasuruan · `0822-9900-1122` · `slamet.bahari@gmail.com` · 2800 · 6 · Nila · `onboarding` · Dian Puspita · `2026-11-11 09:00 WIB` · `issuedPartnerToken: 'FSC-FARM-0027'` · `['Token mitra diterbitkan', 'Menunggu jadwal instalasi IoT']`.
    - `export const HISTORICAL_LEAD_STAGE_COUNTS: Record<LeadStage, number> = { lead_baru: 3, belum_dihubungi: 17, call_terjadwal: 14, sudah_dihubungi: 3, qualified: 19, assessment: 8, penawaran: 13, kontrak: 9, onboarding: 7, instalasi: 6, mitra_aktif: 17 };` (sum 116; + 8 live leads = **124 Total Lead**, matching Figma).
    - `mocks/seed.ts` re-exports everything: `export * from './seedUsersAndWallets'; export * from './seedMitraFarm'; export * from './seedWasteAndOrders'; export * from './seedAdminLeads';` plus `export const SEED_VERSION = 'fiscycle-seed-v1';`.
  - **UI & Anti-Slop Guardrails:** names/cities must match Figma `69:2719` row order; no generated names.
  - **Verify (DoD):** `pnpm typecheck`; `Object.values(HISTORICAL_LEAD_STAGE_COUNTS).reduce((a,b)=>a+b,0) + SEED_LEADS.length === 124`.

> 🛑 **[AUDIT CHECKPOINT 1.4]** — Jalankan pnpm typecheck & git diff. Serahkan ke Argon/Opus untuk review kesesuaian dengan design.md sebelum lanjut ke Sub-Phase berikutnya.

### Sub-Phase 1.5 — Store Infrastructure, Cart Store & Mitra Store

- [x] **Task 1.5.1: Persist storage helper & `useHydrated` hook**
  - **Mode & Ref:** `[Flash-Low]` | design.md §4 (persisted stores) · G3, G11
  - **Target File(s):** `store/storage.ts`, `hooks/useHydrated.ts`
  - **Dependencies & Store Bindings:** `createJSONStorage` from `zustand/middleware`.
  - **Detailed Implementation Specs:**
    - `store/storage.ts`: `export const STORAGE_PREFIX = 'fiscycle-storage-v1';` `export const storageKey = (name: 'auth' | 'waste' | 'cart' | 'mitra' | 'admin') => \`${STORAGE_PREFIX}-${name}\`;` `export const persistStorage = createJSONStorage(() => localStorage);`
    - `hooks/useHydrated.ts`: `'use client';` returns `boolean` — `useState(false)` + `useEffect(() => setHydrated(true), [])`.
  - **UI & Anti-Slop Guardrails:** no UI.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 1.5.2: `useB2BCartStore` (leaf store — procurement, retail cart & orders)**
  - **Mode & Ref:** `[Flash-High]` | design.md §4.3 · requirements.md §4 Step 4, B2B-02, B2B-03, B2C-02
  - **Target File(s):** `store/useB2BCartStore.ts`
  - **Dependencies & Store Bindings:** types `B2BCartStoreState`-related (`B2BProcurementDraft`, `B2CRetailCartItem`, `FishOrder`, `OrderStatus`, `RetailFishProduct`, `User`, `B2CFulfilment`); `SEED_ORDERS`, `SEED_RETAIL_CATALOG`, `SEED_ADDRESSES`; `computeCheckoutTotals` from `@/lib/pricing`; `nextAvailableId`; constants `B2B_SHIPPING_IDR`, `B2C_SHIPPING_IDR`, `B2B_PRICE_PER_KG`, `DEMO_TODAY`; `persistStorage`, `storageKey('cart')`. **Imports no other store (G5).**
  - **Detailed Implementation Specs:**
    - Implement the `B2BCartStoreState` interface from design.md §4.3 exactly (declare it in this file and export it).
    - Initial `b2bDraft`: `{ species: 'Nila', sizeGradeLabel: '300-400g/ekor', quantityKg: 500, unitMode: 'kg', pricePerKgIdr: 32000, frequency: 'Sekali', deliveryDate: '2026-11-16', deliveryAddress: 'Jl. Raya Darmo No. 88, Surabaya' }`; `b2bRedeemPoints: false`; `b2cCart: []`; `b2cFulfilment: 'Antar + Jemput Sampah'`; `b2cEstimatedWasteKg: 3`; `b2cRedeemPoints: false`; `orders: SEED_ORDERS`; `retailCatalog: SEED_RETAIL_CATALOG`.
    - `updateB2BDraft(patch)`: merge; if `patch.species` changes, set `pricePerKgIdr = B2B_PRICE_PER_KG[species]` and `sizeGradeLabel = SIZE_GRADE_OPTIONS[species][0]` unless the patch also includes `sizeGradeLabel`.
    - `computeB2BCheckoutTotals(balance)`: `computeCheckoutTotals({ subtotalIdr: quantityKg * pricePerKgIdr, shippingIdr: B2B_SHIPPING_IDR, balancePoints: balance, redeem: b2bRedeemPoints })`.
    - `submitB2BOrder(buyer, balance)`: totals as above; `id = nextAvailableId('ORD', orders.map(o => o.id), 241)`; `buyerChannel: 'b2b'`, `fulfilmentType: 'Antar Kurir Fiscycle'`, `status: 'Menunggu Alokasi'`, `allocationIds: []`, `createdAt: new Date().toISOString()`; prepend to `orders`; reset `b2bRedeemPoints` to `false`; return the order. (Golden Thread → `ORD-0241`, pts 3000, disc 300000, total 15950000.)
    - `addToB2CCart(product, qty)`: if exists add qty, else push; `removeFromB2CCart(id)`; `setB2CFulfilment`; `setB2CRedeemPoints`.
    - `submitB2COrder(buyer, balance)`: `subtotal = Σ qty × product.pricePerKgIdr`; `shipping = B2C_SHIPPING_IDR[b2cFulfilment]`; totals via `computeCheckoutTotals` with `redeem: b2cRedeemPoints`; order fields: `species` of first cart item, `sizeGradeLabel` = items joined `"Nila 2 kg + Bandeng 1 kg"`, `quantityKg` = Σ qty, `pricePerKgIdr = Math.round(subtotal / Σqty)`, `frequency: 'Sekali'`, `fulfilmentType` = `b2cFulfilment` (`'Antar + Jemput Sampah'` or `'Ambil di Depot'`), `deliveryDate: '2026-11-05'`, `deliveryAddress: SEED_ADDRESSES[buyer.id] ?? 'Depot Fiscycle Surabaya'`, `status: 'Dialokasikan'`; clear `b2cCart`, reset `b2cRedeemPoints`; return order. Throw `Error('Keranjang kosong')` if cart empty.
    - `updateOrderStatus(orderId, status, allocationId?)`: set status; if `allocationId` and not present, append.
    - `resetB2BCartStore()`: restore all initial values (deep-clone seeds with `structuredClone`).
    - Wrap with `persist(..., { name: storageKey('cart'), storage: persistStorage })`.
  - **UI & Anti-Slop Guardrails:** IDs only via `nextAvailableId`; no store imports.
  - **Verify (DoD):** `pnpm typecheck`; scratch call `computeB2BCheckoutTotals(3000)` with `b2bRedeemPoints=true` returns total `15950000`.

- [x] **Task 1.5.3: `useMitraStore` (farm, ponds, tasks, devices, BSF, allocation offers)**
  - **Mode & Ref:** `[Flash-High]` | design.md §4.4 · requirements.md §4 Steps 3 & 6, MIT-01..07
  - **Target File(s):** `store/useMitraStore.ts`
  - **Dependencies & Store Bindings:** seeds from `@/mocks/seed` (`SEED_FARM`, `SEED_PONDS`, `SEED_TASKS`, `SEED_DEVICES`, `SEED_BSF_BATCHES`, `SEED_BSF_FEED_ALLOCATIONS`, `SEED_ALLOCATION_OFFERS`); `derivePondStatus` from `@/lib/telemetry`; `nextAvailableId`; **`useB2BCartStore.getState().updateOrderStatus`** (only allowed cross-store import, G5).
  - **Detailed Implementation Specs:**
    - Implement `MitraStoreState` from design.md §4.4 exactly **plus** additive field `bsfFeedAllocations: BsfFeedAllocation[]` (seed `SEED_BSF_FEED_ALLOCATIONS`).
    - `getPondSummaryCounts()` → `{ total: ponds.length, baik, perhatian, kritis }` counting `pond.status` (seed → 6/4/1/1).
    - `resolvePondAlert(pondId)`: for the pond set `telemetry.dissolvedOxygenMgL = 5.6`, `telemetry.trend.dissolvedOxygenMgL = 'up'`, last `telemetryHistory` point DO = 5.6, `activeInsight.resolved = true`, then `status = derivePondStatus(telemetry)` (POND-02 → `'Baik'`); also mark every task with `pondId === pondId && category === 'Kualitas Air'` as `completed: true` (TSK-01). Result KPI: 6/5/1/0.
    - `toggleTaskCompleted(taskId)`: flip `completed`.
    - `addPondDuringOnboarding(pond)`: id `nextAvailableId('POND', ids, 7, 2)` → `POND-07`; telemetry defaults `{ ph: 7.2, temperatureC: 28.0, dissolvedOxygenMgL: 6.0, turbidityNtu: 15, ammoniaMgL: 0.02, trend all 'stable', recordedAt: new Date().toISOString() }`; history = 7 copies; harvest `{ 0, 0, '300-400g', 0, '2027-02-01', '2027-02-05', 'Belum Siap', 0 }`; feed `{ 0, 0, 0, '16:30 WIB' }`. (Implemented but NOT called by onboarding UI — see Task 2.9.1.)
    - `linkVerifiedWasteToBsf(batchId, contributionId, addedKg)`: `organicInputTotalKg += addedKg`; append `contributionId` to `sourceContributionIds` if absent (BSF-04: 100 → 142).
    - `allocateBsfToPond(batchId, pondId, maggotKg)`: guard `maggotKg > 0 && maggotKg <= harvestedMaggotKg - allocatedToFeedKg` else throw `Error('Stok maggot tidak mencukupi')`; `allocatedToFeedKg += maggotKg`; pond `feed.bsfMaggotSharePct = Math.min(100, feed.bsfMaggotSharePct + 10)` (POND-04 35 → 45); push `BsfFeedAllocation` with id `nextAvailableId('BFA', ids, 2)` → `BFA-0002`, `pondName` from pond, `allocatedAt: new Date().toISOString()`.
    - `receiveAllocationOffer(offer)`: prepend if id not present.
    - `respondToAllocation(offerId, accept)`: set offer `status` to `'Diterima'`/`'Ditolak'`; then `useB2BCartStore.getState().updateOrderStatus(offer.orderId, accept ? 'Menunggu Panen' : 'Menunggu Alokasi')`.
    - `resetMitraStore()`: restore seeds via `structuredClone`.
    - Persist with `storageKey('mitra')`.
  - **UI & Anti-Slop Guardrails:** no imports of `useWastePointStore`, `useAdminStore`, `useAuthStore`.
  - **Verify (DoD):** `pnpm typecheck`; scratch: after `resolvePondAlert('POND-02')`, `getPondSummaryCounts()` → `{ total: 6, baik: 5, perhatian: 1, kritis: 0 }`.

> 🛑 **[AUDIT CHECKPOINT 1.5]** — Jalankan pnpm typecheck & git diff. Serahkan ke Argon/Opus untuk review kesesuaian dengan design.md sebelum lanjut ke Sub-Phase berikutnya.

### Sub-Phase 1.6 — Waste/Point Store, Admin Store, Auth Store & Global Reset

- [x] **Task 1.6.1: `useWastePointStore` (wallets, contributions, verification, redemption)**
  - **Mode & Ref:** `[Flash-High]` | design.md §4.2 · requirements.md §4 Steps 1, 2, 4 · B2B-04, ADM-03
  - **Target File(s):** `store/useWastePointStore.ts`
  - **Dependencies & Store Bindings:** `SEED_WALLETS`, `SEED_CONTRIBUTIONS`; `nextAvailableId`; `POINTS_PER_KG`, `POINT_VALUE_IDR`; **`useMitraStore.getState().linkVerifiedWasteToBsf`** (G5).
  - **Detailed Implementation Specs:**
    - Implement `WastePointStoreState` from design.md §4.2 (readonly constants as `pointsPerKg: 10 as const`, `pointValueIdr: 100 as const`).
    - `getWalletByUserId(userId)` → `Object.values(wallets).find(w => w.userId === userId)`.
    - `submitWaste(payload)`: `id = nextAvailableId('IN', contributions.map(c => c.id), 45)`; `status: 'Menunggu Verifikasi'`; `pointsAwarded: 0`; `createdAt: new Date().toISOString()`; prepend; return. (Golden Thread → `IN-0045`.)
    - `verifyWaste(id, actualKg, grade, batchId)`: `points = Math.round(actualKg * 10)`; update contribution (`status: 'Diterima'`, `actualKg`, `qualityGrade`, `pointsAwarded: points`, `bsfBatchId`, `verifiedAt`); if contributor has a wallet: `balancePoints += points`, `lifetimeEarnedPoints += points`, `totalWasteContributedKg += actualKg`, prepend transaction `{ id: nextAvailableId('PTX', allTxIds, 105), type: 'EARN_WASTE', pointsDelta: +points, rupiahEquivalent: points * 100, referenceId: id, description: \`Setoran Sampah Organik ${actualKg} kg (${id})\`, createdAt }`; finally call `useMitraStore.getState().linkVerifiedWasteToBsf(batchId, id, actualKg)`. (Golden Thread: WAL-0007 2.580 → **3.000**, `PTX-0105`, BSF-04 100 → 142.)
    - `rejectWaste(id, reason)`: `status: 'Ditolak'`, `rejectionReason`, `pointsAwarded: 0`, `verifiedAt`.
    - `deductPointsForOrder(walletId, points, orderId)`: guard `points > 0 && points <= balance` else throw `Error('Saldo poin tidak mencukupi')`; `balancePoints -= points`; `lifetimeRedeemedPoints += points`; prepend `{ type: 'REDEEM_ORDER', pointsDelta: -points, rupiahEquivalent: points * 100, referenceId: orderId, description: \`Tukar Poin untuk Pesanan ${orderId}\` }` (Golden Thread → `PTX-0106`, balance 0).
    - Compute `allTxIds` as all transaction ids across all wallets.
    - `resetWastePointStore()`: restore seeds via `structuredClone`. Persist with `storageKey('waste')`.
  - **UI & Anti-Slop Guardrails:** never credit points when wallet missing (external contributors like Hotel Surabaya) — still mark `Diterima`.
  - **Verify (DoD):** `pnpm typecheck`; scratch sequence `submitWaste(ABC 42kg)` → `'IN-0045'`; `verifyWaste('IN-0045',42,'A','BSF-04')` → `wallets['WAL-0007'].balancePoints === 3000`.

- [x] **Task 1.6.2: `useAdminStore` (CRM pipeline, token issuance, supply allocation)**
  - **Mode & Ref:** `[Flash-High]` | design.md §4.5 · requirements.md §4 Step 5, ADM-01, ADM-02, AUTH-06
  - **Target File(s):** `store/useAdminStore.ts`
  - **Dependencies & Store Bindings:** `SEED_LEADS`; `nextAvailableId`, `formatPartnerToken`; `LEAD_STAGE_ORDER`; **`useMitraStore.getState()`** (`ponds`, `farm`, `receiveAllocationOffer`) and **`useB2BCartStore.getState()`** (`orders`, `updateOrderStatus`) (G5); `scorePondForOrder` is created later in Task 6.1.1 — for now implement score inline via a local function with the same formula (see below) and replace in Task 6.1.1.
  - **Detailed Implementation Specs:**
    - Implement `AdminStoreState` from design.md §4.5: `leads: SEED_LEADS`, `selectedLeadId: 'LEAD-0117'`, `selectedOrderIdForAllocation: null`, `nextTokenSequence: 29`; add setter `selectOrderForAllocation(orderId: string | null)` (additive).
    - `createLeadFromApplication(payload)`: `id = nextAvailableId('LEAD', ids, 125)`; `stage: 'lead_baru'`; `picName: 'Belum Ditentukan'`; `nextFollowUpDate: '2026-11-05 10:00 WIB'`; `notes: ['Pengajuan via aplikasi Fiscycle']`; prepend; return.
    - `advanceLeadStage(leadId, nextStage)`: set stage; if `nextStage` is `'kontrak'` or `'onboarding'` and lead has no `issuedPartnerToken` → `token = formatPartnerToken(nextTokenSequence)`, set on lead, append note `Token mitra ${token} diterbitkan`, increment `nextTokenSequence`, return `token`; else return `undefined`. (LEAD-0123 kontrak → onboarding issues **`FSC-FARM-0029`**.)
    - `approveSupplyAllocation(orderId, allocations)`: read order from cart store; for each allocation build `SupplyAllocationOffer`: `id = nextAvailableId('ALC', existingOfferIds, 31)` (existing = mitra offers ids + ids created in this call), `buyerName`, `buyerCity` = last comma-separated segment of `order.deliveryAddress` trimmed (`'Surabaya'`), `species`, `sizeGradeLabel`, `allocatedKg`, `pricePerKgIdr`, `estimatedPayoutIdr = allocatedKg * pricePerKgIdr`, `farmId`, `pondId`, `pondName` from mitra pond, `targetHarvestDate = pond.harvest.windowStart`, `aiMatchScorePct` = score formula, `status: 'Ditawarkan'`, `createdAt`. Call `receiveAllocationOffer(offer)` and `updateOrderStatus(orderId, 'Dialokasikan', offer.id)` for each. Return the offers. (Golden Thread → `ALC-0031`, score 96, payout 16.000.000.)
    - Score formula (inline now, shared later): `speciesMatch ? 40 : 0` + size fit (`avgWeightG` within the parsed `min-max` of the order's `sizeGradeLabel` → 30; within ±50 g → 15; else 0) + readiness (`Siap Panen` 26, `Mendekati Panen` 12, `Belum Siap` 0). POND-04 → 96, POND-01 → 82, POND-02 → 55.
    - `resetAdminStore()`. Persist with `storageKey('admin')`.
  - **UI & Anti-Slop Guardrails:** sequential tokens only; never random.
  - **Verify (DoD):** `pnpm typecheck`; scratch `advanceLeadStage('LEAD-0123','onboarding') === 'FSC-FARM-0029'`.

- [x] **Task 1.6.3: Role home-route resolver**
  - **Mode & Ref:** `[Flash-Low]` | design.md §4.1 (Role Home Route Resolver) · requirements.md §3.1
  - **Target File(s):** `lib/routing.ts`
  - **Dependencies & Store Bindings:** `import type { User, Role } from '@/lib/types';`
  - **Detailed Implementation Specs:**
    - `export function getHomeRouteForUser(user: User): string` → mitra: `!partnerTokenVerified` → `/auth/mitra`; `!onboardingCompleted` → `/mitra/onboarding`; else `/mitra/dashboard`; b2b → `/b2b/dashboard`; b2c → `/b2c/marketplace`; admin → `/admin/leads`.
    - `export const ROLE_ROUTE_PREFIX: Record<Role, string> = { mitra: '/mitra', b2b: '/b2b', b2c: '/b2c', admin: '/admin' };`
  - **UI & Anti-Slop Guardrails:** must never return `/auth/register/role` (requirements.md §3.1 rule 3).
  - **Verify (DoD):** `pnpm typecheck`; Budi seed → `/mitra/dashboard`.

- [x] **Task 1.6.4: `useAuthStore` (1 User = 1 Role, login, registration, Mitra token/OTP)**
  - **Mode & Ref:** `[Flash-High]` | design.md §4.1 · requirements.md §3, AUTH-02..07
  - **Target File(s):** `store/useAuthStore.ts`
  - **Dependencies & Store Bindings:** `SEED_USERS`; `getHomeRouteForUser`; `nextAvailableId`; `PARTNER_TOKEN_REGEX`, `DEMO_OTP_CODE`; **`useAdminStore.getState().leads`** (for issued tokens, G5).
  - **Detailed Implementation Specs:**
    - Implement `AuthStoreState` from design.md §4.1: `currentUser: null`, `users: SEED_USERS`, `registerDraft: null`.
    - `loginWithEmail(email)`: case-insensitive match → set `currentUser`, return `{ ok: true, redirectTo: getHomeRouteForUser(user) }`; else `{ ok: false, error: 'Email belum terdaftar. Silakan daftar terlebih dahulu.' }`.
    - `quickLoginAsRole(role)`: first seeded user with that role → set `currentUser` → return home route.
    - `setRegisterDraft(draft)`.
    - `completeRegistrationWithRole(role)`: requires `registerDraft` (throw `Error('Data pendaftaran tidak ditemukan')` otherwise); `id = nextAvailableId('USR-NEW', ids, 1, 2)`; `avatarInitials` = first letters of first two words of `name`, uppercase; mitra → `partnerTokenVerified: false, onboardingCompleted: false`; push to `users`, set `currentUser`, clear `registerDraft`; return `{ user, redirectTo: getHomeRouteForUser(user) }` (mitra → `/auth/mitra`).
    - `verifyMitraToken(token, phoneOrEmail)`: `PARTNER_TOKEN_REGEX.test(token)` AND token ∈ `['FSC-FARM-0028', ...adminLeads.issuedPartnerToken]` AND `phoneOrEmail.trim().length >= 8` → `true`.
    - `verifyMitraOtp(code)`: `code === '123456'` → set `partnerTokenVerified: true` on `currentUser` and the matching `users` entry → `true`; else `false`.
    - `completeMitraOnboarding()`: set `onboardingCompleted: true` (currentUser + users).
    - `logout()`: `currentUser = null`. Add `resetAuthStore()` (restore seeds, `currentUser: null`).
    - Persist with `storageKey('auth')`.
  - **UI & Anti-Slop Guardrails:** a user's `role` is never mutated after creation.
  - **Verify (DoD):** `pnpm typecheck`; `loginWithEmail('procurement@abcrestaurant.id').redirectTo === '/b2b/dashboard'`.

- [x] **Task 1.6.5: Global demo reset utility**
  - **Mode & Ref:** `[Flash-Low]` | requirements.md §4 (deterministic demo) · design.md §4
  - **Target File(s):** `lib/demo/resetAllStores.ts`
  - **Dependencies & Store Bindings:** `useAuthStore.resetAuthStore`, `useWastePointStore.resetWastePointStore`, `useB2BCartStore.resetB2BCartStore`, `useMitraStore.resetMitraStore`, `useAdminStore.resetAdminStore`.
  - **Detailed Implementation Specs:**
    - `export function resetAllStores(options: { keepSession?: boolean } = {}): void` → calls the 4 domain resets, then `resetAuthStore()` unless `keepSession` (when `keepSession`, re-set `currentUser` to the matching seeded user by id after reset).
  - **UI & Anti-Slop Guardrails:** never call `localStorage.clear()` (would wipe unrelated keys).
  - **Verify (DoD):** `pnpm typecheck`; after reset, `useMitraStore.getState().getPondSummaryCounts().kritis === 1`.

> 🛑 **[AUDIT CHECKPOINT 1.6]** — Jalankan pnpm typecheck & git diff. Serahkan ke Argon/Opus untuk review kesesuaian dengan design.md sebelum lanjut ke Sub-Phase berikutnya.

---

## Milestone 2 — Global Auth, Role Routing, Welcome Splash & Mitra Onboarding

### Sub-Phase 2.1 — Mobile Container Layout & Welcome Splash

- [x] **Task 2.1.1: Mobile container layout (`app/(mobile)/layout.tsx`)**
  - **Mode & Ref:** `[Flash-Low]` | design.md §2 (route tree) · requirements.md §2.1
  - **Target File(s):** `app/(mobile)/layout.tsx`
  - **Dependencies & Store Bindings:** none.
  - **Detailed Implementation Specs:**
    - Export default layout wrapping `{children}` inside:
      `<div className="min-h-screen bg-canvas flex justify-center"><div className="w-full max-w-md min-h-screen bg-canvas shadow-2xl relative font-sans text-ink flex flex-col">{children}</div></div>`.
    - Support responsive centering on desktop screens while preserving 100% mobile-viewport simulation (`max-w-md`).
  - **UI & Anti-Slop Guardrails:** no fake mobile status bars (battery, wifi, time); clean background.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.1.2: Welcome / Splash screen (`app/(mobile)/page.tsx`) — Figma `9:2522` ("Halaman awal")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-01 · design.md §2 · **Figma Node `9:2522` ("Halaman awal", 360x800)**
  - **Target File(s):** `app/(mobile)/page.tsx`
  - **Dependencies & Store Bindings:** `Image` from `next/image`, `Link` from `next/link`, `Button` from `@/components/ui/button`.
  - **Exact Figma Dev Mode Specs (`9:2522`):**
    - Container: `w-full max-w-md rounded-[26px] bg-white overflow-hidden` with hero image top section `h-[514px]`.
    - Hero Image: masked overlay with white brand logo `whitee 1` (`w-[95px] h-[72px]`).
    - Headline: `<h1 className="text-[30px] font-semibold text-white leading-[1.2]">Dari limbah menjadi <span className="font-bold">sumber daya</span></h1>` with drop shadow `[0px_2px_8px_rgba(0,0,0,0.2)]`.
    - Subtitle: `Platform terintegrasi untuk ekosistem perikanan yang lebih berkelanjutan` (`text-[16px] text-[#f3f4f6] leading-[1.2]`).
    - Two Main Action Buttons (`Welcome actions`):
      - Primary Button: `bg-[#0f766e] text-white rounded-[7px] h-[64px]` with title "Masuk" (`text-[16px] font-bold`) and subtitle "Saya sudah punya akun Fiscycle" (`text-[12px] font-normal`).
      - Secondary Button: `bg-white border border-[#0f766e] text-[#0f766e] rounded-[7px] h-[64px]` with title "Daftar" (`text-[16px] font-bold`) and subtitle "Saya baru menggunakan Fiscycle" (`text-[12px] font-normal`).
    - 3 Benefit Cards (`Benefits`, `top-[643px]`):
      1. Sprout icon (`bg-[#ccfbf1] text-[#0f766e] size-[53px] rounded-[30px]`): "Kelola Tambak" / "lebih mudah".
      2. Store icon (`bg-[#ccfbf1] text-[#0f766e] size-[53px] rounded-[30px]`): "Akses pasar" / "lebih luas".
      3. Recycle icon (`bg-[#ccfbf1] text-[#0f766e] size-[53px] rounded-[30px]`): "Dukung" / "ekosistem berkelanjutan".
  - **UI & Anti-Slop Guardrails:** 100% exact Indonesian copy and typography hierarchy from Figma `9:2522`.
  - **Verify (DoD):** `pnpm typecheck`; route `/` renders properly.

> 🛑 **[AUDIT CHECKPOINT 2.1]** — Jalankan pnpm typecheck & verifikasi visual `/`.

### Sub-Phase 2.2 — Authentication & Registration Flow

- [x] **Task 2.2.1: Login page (`app/(mobile)/auth/login/page.tsx`) — Figma `9:2562` ("Masuk ke Fiscycle")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 AUTH-02 · design.md §2 · **Figma Node `9:2562` ("Masuk ke Fiscycle", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/login/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`loginWithEmail`, `quickLoginAsRole`); `useRouter` from `next/navigation`; `Input`, `Button`, `Label`.
  - **Exact Figma Dev Mode Specs (`9:2562`):**
    - Navigation: Arrow left button + centered Brand Logo `fardanpeler 1` (`w-[87px] h-[36px]`).
    - Introduction: "Masuk ke Fiscycle" (`text-[23px] font-bold text-[#163252]`), Subtitle: "Lanjutkan untuk mengakses akun Anda." (`text-[13px] text-[#748397]`).
    - Form fields:
      - Field 1: Label "Email atau Nomor HP" (`text-[14px] font-bold text-[#283d55]`), Input `h-[48px] rounded-[7px] border-[#e1e7ec]` with `Mail` icon.
      - Field 2: Label "Kata Sandi" (`text-[14px] font-bold text-[#283d55]`), Input `h-[48px] rounded-[7px] border-[#e1e7ec]` with `LockKeyhole` and `Eye` icon toggle.
      - Options: Checkbox "Ingat saya" (`border-[#afbbc8] text-[12px]`) and Link "Lupa kata sandi?" (`text-[12px] font-bold text-[#2687af]`).
    - Submit Button: `bg-[#00566b] text-white font-bold text-[16px] h-[49px] rounded-[7px]` ("Masuk").
    - Social Sign In: Divider "atau masuk dengan" between lines `#e1e7ec`.
    - Social buttons: "Lanjutkan dengan Google" (`h-[48px] rounded-[7px] border-[#e1e7ec]`) and "Lanjutkan dengan Apple" (`h-[48px] rounded-[7px] border-[#e1e7ec]`).
    - Footer link: "Belum punya akun? Daftar sekarang" (`text-[#2687af] font-bold`).
    - **Hackathon Quick Demo Role Switcher Section**:
      - Header: "⚡ Quick Demo Login (Hackathon Mode)".
      - 4 Role pill buttons with badge and name:
        1. "Mitra Tambak" (Budi Santoso) -> `quickLoginAsRole('mitra')`
        2. "B2B Industri" (Hendro - ABC Resto) -> `quickLoginAsRole('b2b')`
        3. "B2C Rumah Tangga" (Ibu Sari) -> `quickLoginAsRole('b2c')`
        4. "Admin Fiscycle" (Andi Pratama) -> `quickLoginAsRole('admin')`
      - Clicking any role instantly signs in and navigates to the role's landing route.
  - **UI & Anti-Slop Guardrails:** Matches Figma `9:2562` element hierarchy and spacing.
  - **Verify (DoD):** `pnpm typecheck`; clicking quick login navigates to correct workspace.

- [x] **Task 2.2.2: Register Step 1 (`app/(mobile)/auth/register/page.tsx`) — Figma `9:2612` ("Buat akun Fiscycle")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-03 · design.md §2 · **Figma Node `9:2612` ("Buat akun Fiscycle", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/register/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`setRegisterDraft`); `useRouter`.
  - **Exact Figma Dev Mode Specs (`9:2612`):**
    - Navigation: Back button + Fiscycle Brand logo.
    - Header: "Buat akun Fiscycle" (`text-[23px] font-bold text-[#163252]`), Subtitle: "Daftar untuk mulai mengelola tambak atau mengakses pasar." (`text-[13px] text-[#748397]`).
    - Form inputs: Nama Lengkap, Nomor HP / WhatsApp, Alamat Email, Kata Sandi, Konfirmasi Kata Sandi.
    - Terms Checkbox: "Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi Fiscycle".
    - CTA: "Daftar Akun" (`bg-[#00566b] text-white h-[49px] rounded-[7px]`).
    - Social registration: Google & Apple buttons.
  - **UI & Anti-Slop Guardrails:** Preserves `setRegisterDraft` store action.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.2.3: Register Step 2 — Role Selection (`app/(mobile)/auth/register/role/page.tsx`) — Figma `9:2664` ("Pilih jenis pengguna")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 AUTH-04 · design.md §2 · **Figma Node `9:2664` ("Pilih jenis pengguna", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/register/role/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`registerDraft`, `completeRegistrationWithRole`); `useRouter`.
  - **Exact Figma Dev Mode Specs (`9:2664`):**
    - Navigation: Back button + Progress dots (`9:2673`).
    - Introduction (`9:2678`):
      - Title: "Kamu menggunakan Fiscycle sebagai apa?" (`text-[23px] font-bold text-[#163252] leading-[1.18]`).
      - Subtitle: "Pilih yang paling sesuai dengan kebutuhanmu. Kamu bisa menambahkan akses lain nanti jika diperlukan." (`text-[13px] text-[#748397]`).
    - 4 Role Option Cards (`9:2681`):
      1. **Usaha / Industri (`b2b`)** (`9:2682`):
         - Icon: `building-2` in `#e6f5fe` circular squircle (`rounded-[32px] size-[55px]`).
         - Title: "Usaha / Industri" (`text-[15.5px] font-bold text-[#163252]`).
         - Description: "Saya membutuhkan pasokan ikan untuk usaha." (`text-[12px] text-[#283d55]`).
         - Details: "Restoran, hotel, katering, distributor, retailer, atau bisnis makanan." (`text-[10.5px] text-[#748397]`).
         - Affordance: `chevron-right`.
      2. **Rumah Tangga (`b2c`)** (`9:2691`):
         - Icon: `house` in `#fff0f0` circular squircle.
         - Title: "Rumah Tangga" (`text-[15.5px] font-bold text-[#163252]`).
         - Description: "Saya ingin membeli ikan untuk kebutuhan pribadi." (`text-[12px] text-[#283d55]`).
         - Details: "Konsumen yang ingin mencari dan membeli ikan sesuai kebutuhan." (`text-[10.5px] text-[#748397]`).
         - Affordance: `chevron-right`.
      3. **Mitra Tambak (`mitra`)** (`9:2700`):
         - Icon: `fish` in white circular squircle, container card `bg-[#edfcf8] border border-[#a5e5d8]`.
         - Title: "Mitra Tambak" (`text-[15.5px] font-bold text-[#163252]`).
         - Description: "Saya memiliki atau mengelola tambak." (`text-[12px] text-[#283d55]`).
         - Details: "Untuk tambak yang sudah bekerja sama / tertarik bekerja sama dengan Fiscycle." (`text-[10.5px] text-[#748397]`).
         - Affordance: `chevron-right`.
      4. **Admin Fiscycle (`admin`)** (`9:2709`):
         - Icon: `settings` in `#e9f2ff` circular squircle.
         - Title: "Admin Fiscycle" (`text-[15.5px] font-bold text-[#163252]`).
         - Description: "Khusus tim internal Fiscycle." (`text-[12px] text-[#283d55]`).
         - Affordance: `chevron-right`.
    - Action: On card click -> calls `completeRegistrationWithRole(selectedRole)` and navigates to target path (`/auth/mitra`, `/b2b`, `/b2c`, `/admin`).
  - **UI & Anti-Slop Guardrails:** Selected state highlighted with `border-brand-teal bg-selected`; smooth transition.
  - **Verify (DoD):** `pnpm typecheck`; completes registration and redirects accordingly.

> 🛑 **[AUDIT CHECKPOINT 2.2]** — Jalankan pnpm typecheck & uji end-to-end flow registrasi.

### Sub-Phase 2.3 — Mitra Application Flow

- [x] **Task 2.3.1: Mitra Landing / Gateway (`app/(mobile)/auth/mitra/page.tsx`) — Figma `9:2718` ("Pengajuan mitra tambak")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-05 · design.md §2 · **Figma Node `9:2718` ("Pengajuan mitra tambak", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/mitra/page.tsx`
  - **Dependencies & Store Bindings:** `Link`, `Button`, icons (`circle-check`, `circle-help`, `info`, `chevron-right`).
  - **Exact Figma Dev Mode Specs (`9:2718`):**
    - Navigation: Back button + Progress line (`9:2727`).
    - Header (`9:2732`):
      - Title: "Apakah kamu sudah terdaftar sebagai Mitra Fiscycle?" (`text-[23px] font-bold text-[#163252] leading-[1.18]`).
      - Subtitle: "Cek status kemitraanmu terlebih dahulu untuk melanjutkan." (`text-[13px] text-[#748397]`).
    - Two Primary Option Cards (`9:2735`):
      1. **Registered Partner Option** (`9:2736`):
         - Styling: `bg-[#f1fcf9] border-[#80cfc1] border-[1.5px] rounded-[12px] p-[17px]`.
         - Icon: `circle-check` in `#d7f5ec` circular badge (`rounded-[22px] size-[37px]`).
         - Title: "Saya sudah terdaftar sebagai Mitra Fiscycle" (`text-[16px] font-bold text-[#163252]`).
         - Subtitle: "Saya sudah bekerja sama dengan Fiscycle dan ingin mengaktifkan akun." (`text-[13px] text-[#748397]`).
         - Navigation: -> `/auth/mitra/token`.
      2. **Unregistered Applicant Option** (`9:2743`):
         - Styling: `bg-white border-[#e1e7ec] border rounded-[12px] p-[17px]`.
         - Icon: `circle-help` in `#ebf0f5` circular badge.
         - Title: "Saya belum terdaftar sebagai Mitra Fiscycle" (`text-[16px] font-bold text-[#163252]`).
         - Subtitle: "Saya tertarik menjadi mitra dan ingin mengajukan diri untuk bekerja sama." (`text-[13px] text-[#748397]`).
         - Navigation: -> `/auth/mitra/apply`.
    - Helpful Information Callout (`9:2750`):
      - Container: `bg-[#e4f4fe] rounded-[12px] p-[16px] flex gap-[13px]`.
      - Icon: `info` (`text-[#2698d7] size-[25px]`).
      - Copy: "Belum yakin? Tim Fiscycle akan membantu proses pengajuan dan menghubungi kamu untuk langkah selanjutnya." (`text-[#163252] font-bold text-[13px]` + `text-[#748397] text-[12.5px]`).
    - Secondary Link: "Sudah mendaftar? Cek status pengajuan" -> `/auth/mitra/apply/status`.
  - **UI & Anti-Slop Guardrails:** Clean cards with `rounded-[12px]` and authentic Figma hex codes.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.3.2: Mitra Application Form (`app/(mobile)/auth/mitra/apply/page.tsx`) — Figma `13:1453` ("Form Pengajuan Calon Mitra")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 AUTH-05 · design.md §2 · **Figma Node `13:1453` ("Form Pengajuan Calon Mitra", 360x943)**
  - **Target File(s):** `app/(mobile)/auth/mitra/apply/page.tsx`
  - **Dependencies & Store Bindings:** `useAdminStore` (`createLeadFromApplication`); `useRouter`.
  - **Exact Figma Dev Mode Specs (`13:1453`):**
    - Navigation: Back button + Fiscycle Brand Logo.
    - Introduction (`13:1461`):
      - Title: "Pengajuan Calon Mitra" (`text-[24px] font-bold text-[#163252]`).
      - Subtitle: "Lengkapi data berikut agar tim Fiscycle bisa menghubungimu." (`text-[12px] text-[#8492a2]`).
    - 8 Form Fields with Specific Icons (`13:1464`):
      1. Nama Lengkap (`13:1465`): Icon `user-round`, placeholder "Sesuai KTP Anda".
      2. Nomor WhatsApp (`13:1472`): Icon `phone`, placeholder "Contoh: 0812 3456 7890".
      3. Nama Usaha / Tambak (`13:1479`): Icon `warehouse`, placeholder "Contoh: Tambak Jaya".
      4. Lokasi Tambak (`13:1486`): Icon `map-pin`, placeholder "Kabupaten, kecamatan, atau alamat".
      5. Jenis Ikan (`13:1493`): Icon `fish`, dropdown placeholder "Pilih jenis ikan" (`chevron-down`).
      6. Jumlah Kolam (`13:1501`): Icon `clipboard-list`, placeholder "Contoh: 5".
      7. Skala Usaha (`13:1508`): Icon `chart-no-axes-combined`, dropdown placeholder "Pilih skala" (Kecil, Menengah, Besar).
      8. Catatan Tambahan (`13:1516`): Icon `message-square`, textarea placeholder "Tulis informasi tambahan di sini...".
    - CTA Button (`13:1523`):
      - Style: `bg-gradient-to-r from-[#006a8a] to-[#0dae94] text-white h-[47px] rounded-[7px] font-bold text-[15px] flex items-center justify-center gap-[10px]`.
      - Icon: `send`. Label: "Kirim Pengajuan".
    - Privacy Assurance (`13:1526`): Icon `lock-keyhole`, "Data kamu akan disimpan oleh Fiscycle dan digunakan untuk proses pengajuan kemitraan." (`text-[10px] text-[#8492a2]`).
  - **UI & Anti-Slop Guardrails:** Submits deterministic lead to `useAdminStore` and navigates to success screen.
  - **Verify (DoD):** `pnpm typecheck`; creates lead with status `lead_baru`.

- [x] **Task 2.3.3: Mitra Application Success Screen (`app/(mobile)/auth/mitra/apply/success/page.tsx`) — Figma `13:1530` ("Pengajuan Berhasil")**
  - **Mode & Ref:** `[Flash-Low]` | requirements.md §3 AUTH-05 · design.md §2 · **Figma Node `13:1530` ("Pengajuan Berhasil", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/mitra/apply/success/page.tsx`
  - **Dependencies & Store Bindings:** `useSearchParams`, `Link`, `clipboard-clock`, `phone`.
  - **Exact Figma Dev Mode Specs (`13:1530`):**
    - Illustration (`13:1538`): Envelope confetti illustration with success check badge.
    - Headline (`13:1539`): "Pengajuan Berhasil Dikirim!" (`text-[25px] font-bold text-[#163252] leading-[1.15]`).
    - Description (`13:1540`): "Data kamu sudah kami terima. Tim kemitraan akan menghubungimu untuk mengenal kebutuhan dan kondisi tambakmu." (`text-[14px] text-[#8492a2]`).
    - Next Steps Card (`13:1541`):
      - Container: `bg-[#e5f5fd] rounded-[9px] p-[18px]`.
      - Title: "Apa yang terjadi selanjutnya?" (`text-[16px] font-bold text-[#163252]`).
      - 4 Numbered Steps (`bg-[#cfeefc] text-[#288db9]` circular badges):
        1. "Tim kami meninjau data kamu."
        2. "Kami akan menghubungi kamu lewat telepon / WhatsApp."
        3. "Jika perlu, kami melakukan diskusi lanjutan atau site assessment."
        4. "Kamu akan menerima penawaran kerja sama dan kontrak."
    - Actions (`13:1559`):
      - Primary CTA (`13:1560`): `bg-[#006a8a] text-white h-[47px] rounded-[7px] font-bold` with `clipboard-clock` icon: "Tunggu Tim Menghubungi".
      - Secondary CTA (`13:1563`): `bg-white border-[#73cdb5] border-[1.5px] text-[#008c8b] h-[47px] rounded-[7px] font-bold` with `phone` icon: "Hubungi Fiscycle via WhatsApp".
  - **UI & Anti-Slop Guardrails:** Friendly Indonesian copy; card with `rounded-[9px]`.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.3.4: Mitra Application Status Check (`app/(mobile)/auth/mitra/apply/status/page.tsx`) — Figma `13:1567` ("Status Pengajuan")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-05 · design.md §2 · **Figma Node `13:1567` ("Status Pengajuan", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/mitra/apply/status/page.tsx`
  - **Dependencies & Store Bindings:** `useAdminStore` (`leads`); `Input`, `Button`, `Badge`.
  - **Exact Figma Dev Mode Specs (`13:1567`):**
    - Search input: Nomor HP atau ID Pengajuan (e.g. `LEAD-0124` or `0822-9900-1122`).
    - On search: finds matching lead in `useAdminStore.leads`.
    - If found: display status card with:
      - Lead Name & Farm Name
      - Current Stage badge with Indonesian label (`LEAD_STAGE_LABELS[lead.stage]`)
      - PIC Name & Jadwal Follow Up
      - If `lead.issuedPartnerToken`: banner highlighting token with "Aktivasi Sekarang" button -> `/auth/mitra/token?token=${lead.issuedPartnerToken}`
    - If not found: informative alert "Data pengajuan tidak ditemukan. Pastikan nomor HP sesuai pendaftaran."
  - **UI & Anti-Slop Guardrails:** instant client search feedback.
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 2.3]** — Jalankan pnpm typecheck & verifikasi alur pendaftaran mitra.

### Sub-Phase 2.4 — Mitra Token Activation & OTP Verification

- [x] **Task 2.4.1: Mitra Token Input (`app/(mobile)/auth/mitra/token/page.tsx`) — Figma `18:59` ("Masukkan Token Mitra")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-06 · design.md §2 · **Figma Node `18:59` ("Masukkan Token Mitra", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/mitra/token/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`verifyMitraToken`); `useRouter`, `useSearchParams`.
  - **Exact Figma Dev Mode Specs (`18:59`):**
    - Navigation: Back button + Progress indicator (`29:3`).
    - Introduction (`18:68`):
      - Title: "Aktivasi Akun Mitra" (`text-[22px] font-bold text-[#172b59] leading-[1.2]`).
      - Subtitle: "Masukkan token mitra dan nomor HP / email yang terdaftar untuk melanjutkan." (`text-[14px] text-[#7d8b9e]`).
    - Input 1 — Token Mitra (`18:71`):
      - Label: "Token Mitra" (`text-[15px] font-bold text-[#172b59]`).
      - Field: `border border-[#e3e8ec] h-[60px] rounded-[8px] px-[16px] flex gap-[18px] items-center`.
      - Icon: `key-round` (`size-[22px]`).
      - Value / Placeholder: "FSC-FARM-0028" (`text-[17px] font-medium text-[#35465d]`).
      - Helper text: "Contoh: FSC-FARM-0028" (`text-[12px] text-[#7d8b9e]`).
    - Input 2 — Nomor HP / Email Terdaftar (`18:77`):
      - Label: "Nomor HP / Email Terdaftar" (`text-[15px] font-bold text-[#172b59]`).
      - Field: `border border-[#e3e8ec] h-[60px] rounded-[8px] px-[16px] flex gap-[18px] items-center`.
      - Icon: `mail` (`size-[22px]`).
      - Value / Placeholder: "0812 3456 7890" (`text-[17px] font-medium text-[#35465d]`).
      - Helper text: "Gunakan nomor HP atau email yang sudah terdaftar di Fiscycle." (`text-[12px] text-[#7d8b9e]`).
    - Primary CTA (`18:83`):
      - Style: `bg-[#00566b] text-white h-[60px] rounded-[8px] font-semibold text-[17px] flex items-center justify-center`.
      - Label: "Kirim Kode Verifikasi".
    - Token Info Callout (`18:85`):
      - Container: `bg-[#e4f4fe] rounded-[9px] p-[16px] flex gap-[14px] items-center`.
      - Status Symbol: `bg-[#2698d7] rounded-full size-[25px] text-white font-bold text-[19px] flex items-center justify-center` with "i".
      - Text: "Token Mitra diberikan oleh tim Fiscycle setelah mitra resmi terdaftar." (`text-[12px] font-semibold text-[#35465d]`).
  - **UI & Anti-Slop Guardrails:** uppercase automatic formatting on token input.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.4.2: Mitra OTP Verification (`app/(mobile)/auth/mitra/verify/page.tsx`) — Figma `18:90` ("Verifikasi")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-06 · design.md §2 · **Figma Node `18:90` ("Verifikasi", 360x800)**
  - **Target File(s):** `app/(mobile)/auth/mitra/verify/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`verifyMitraOtp`); `useRouter`.
  - **Exact Figma Dev Mode Specs (`18:90`):**
    - Navigation: Back button + Progress indicator (`25:55`).
    - Introduction (`18:99`):
      - Title: "Verifikasi Akun Mitra" (`text-[22px] font-bold text-[#172b59]`).
      - Subtitle: "Masukkan kode verifikasi yang dikirim ke nomor HP / email terdaftar." (`text-[14px] text-[#7d8b9e]`).
    - Symbol (`18:102`): Circular badge `bg-[#e4f4fe] rounded-full size-[80px]` with `mail` icon (`size-[34px] text-[#2698d7]`).
    - Verification Code Inputs (`18:104`):
      - 6 input boxes: `border-[#e3e8ec] border-[1.2px] h-[80px] rounded-[5px] flex items-center justify-center font-bold text-[20px] text-[#172b59]`.
      - Auto-focus, backspace navigation, paste handling.
    - Resend Code (`18:117`):
      - "Tidak menerima kode?" (`text-[14px] text-[#7d8b9e]`).
      - "Kirim ulang (00:28)" (`font-semibold text-[#2698d7]`).
    - Primary CTA (`18:120`):
      - Style: `bg-[#00566b] text-white h-[64px] rounded-[8px] font-semibold text-[17px] flex items-center justify-center`.
      - Label: "Verifikasi".
    - Activation Confirmation Indicator (`18:122`):
      - Container: `bg-[#e1f7f3] rounded-[9px] p-[16px] flex gap-[14px] items-center`.
      - Symbol: `bg-[#08b784] rounded-full size-[34px] flex items-center justify-center` with `check` icon.
      - Copy: "Token Mitra valid → akun berhasil diverifikasi." (`text-[14px] font-semibold text-[#35465d]`).
  - **UI & Anti-Slop Guardrails:** smooth 6-digit inputs with numeric keyboard support.
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 2.4]** — Jalankan pnpm typecheck & verifikasi alur token + OTP.

### Sub-Phase 2.5 — Mitra Multi-Step Onboarding

- [x] **Task 2.5.1: Mitra Onboarding Welcome & Flow Overview (`app/(mobile)/mitra/onboarding/page.tsx`) — Figma `32:4801` ("Selamat Datang, Mitra Disetujui")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-07 · design.md §2 · **Figma Node `32:4801` ("Selamat Datang, Mitra Disetujui", 360x800)**
  - **Target File(s):** `app/(mobile)/mitra/onboarding/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore`, `useMitraStore`; `Link`, `Button`, icons (`carbon:report`, `check`, `arrow-right`, `hourglass`).
  - **Exact Figma Dev Mode Specs (`32:4801`):**
    - Navigation: Back chevron + Fiscycle Brand Logo + `hourglass` status icon.
    - Welcome Illustration (`79:71`): Report illustration with circular success check badge (`bg-[#07b18c] size-[60px]`).
    - Welcome Message (`32:4814`):
      - Title: "Selamat Datang!" (`text-[24px] font-bold text-[#173653]`).
      - Highlight: "Kemitraan Anda telah disetujui." (`text-[20px] font-bold text-[#008d91]`).
      - Subtitle: "Saatnya melanjutkan proses onboarding agar akun Anda segera siap digunakan." (`text-[14px] text-[#6f8191]`).
    - 6 Onboarding Step Checklist (`32:4818`):
      1. "Data Usaha / Tambak" (Numbered circle `1` in `bg-[#00a68f] text-white`).
      2. "Data Kolam" (Numbered circle `2`).
      3. "Jadwal Instalasi" (Numbered circle `3`).
      4. "Instalasi & Pengujian" (Numbered circle `4`).
      5. "Aktivasi Akun" (Numbered circle `5`).
      6. "Dashboard Siap Digunakan" (Numbered circle `6`).
    - Primary CTA (`32:4843`):
      - Style: `bg-[#008d91] text-white h-[46px] rounded-[7px] font-semibold text-[14px] flex items-center justify-center gap-[10px]`.
      - Label: "Mulai Onboarding" with `arrow-right`.
      - Target Route: `/mitra/onboarding/business`.
  - **UI & Anti-Slop Guardrails:** Clean sequential steps; exact Figma color `#008d91`.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.5.2: Mitra Onboarding Step 1 — Data Usaha / Tambak (`app/(mobile)/mitra/onboarding/business/page.tsx`) — Figma `32:4847` ("Data Usaha / Tambak")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-07 · design.md §2 · **Figma Node `32:4847` ("Data Usaha / Tambak", 360x800)**
  - **Target File(s):** `app/(mobile)/mitra/onboarding/business/page.tsx`
  - **Dependencies & Store Bindings:** `Button`, `Input`, `Select`, icons (`map-pin`, `chevron-down`, `arrow-right`, `hourglass`).
  - **Exact Figma Dev Mode Specs (`32:4847`):**
    - Navigation: Back chevron + Fiscycle Logo + `hourglass`.
    - Introduction (`32:4859`):
      - Title: "Data Usaha / Tambak" (`text-[21px] font-bold text-[#173653]`).
      - Subtitle: "Lengkapi informasi usaha tambak Anda." (`text-[13px] text-[#6f8191]`).
    - Form Fields (`32:4862`):
      1. Nama Usaha / Nama Tambak: input `bg-white border border-[#d9e4ea] rounded-[7px] min-h-[42px]` (Value: "Tambak Makmur Jaya").
      2. Lokasi Tambak: icon `map-pin` (Value: "Desa Pesisir, Kec. Sanden, Kab. Bantul, DIY").
      3. Luas Area Tambak (hektar): input with suffix unit "ha" (Value: "5").
      4. Sumber Air: dropdown with `chevron-down` (Options: "Air Laut", "Air Payau", "Air Tawar").
      5. Sistem Budidaya: dropdown with `chevron-down` (Options: "Intensif", "Semi Intensif", "Tradisional").
      6. Catatan Tambahan (opsional): textarea placeholder "Contoh: akses jalan, patokan lokasi, dll.".
    - Action (`32:4891`): Button `bg-[#008d91] text-white h-[46px] rounded-[7px] font-semibold text-[14px]` with "Simpan dan Lanjutkan" + `arrow-right` -> `/mitra/onboarding/ponds`.
  - **UI & Anti-Slop Guardrails:** Clean inputs, no dummy file upload requirement.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.5.3: Mitra Onboarding Step 2 — Data Kolam (`app/(mobile)/mitra/onboarding/ponds/page.tsx`) — Figma `32:4896` ("Data Kolam")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-07 · design.md §2 · **Figma Node `32:4896` ("Data Kolam", 360x800)**
  - **Target File(s):** `app/(mobile)/mitra/onboarding/ponds/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`ponds`); `Button`, `Badge`, icons (`waves`, `ellipsis-vertical`, `plus`, `arrow-right`).
  - **Exact Figma Dev Mode Specs (`32:4896`):**
    - Navigation: Back chevron + Fiscycle Logo + `hourglass`.
    - Introduction (`32:4908`):
      - Title: "Data Kolam" (`text-[21px] font-bold text-[#173653]`).
      - Subtitle: "Tambahkan data kolam pada tambak Anda." (`text-[13px] text-[#6f8191]`).
    - Pond Card List (`32:4911`):
      - Card style: `bg-white border border-[#d9e4ea] rounded-[10px] p-[12px] h-[66px] flex items-center gap-[12px]`.
      - Leading icon: `waves` (`size-[28px]`).
      - Pond Detail: Name (`text-[13px] font-bold text-[#173653]`), Commodity (`text-[11px] text-[#6f8191]`, e.g. "Ikan Vaname", "Ikan Nila").
      - Dimensions: e.g. "0,5 ha" (`text-[12px] text-[#173653]`).
      - Trailing: `ellipsis-vertical`.
      - Displays active ponds (`POND-01` to `POND-06`).
    - Add Pond Action: "+ Tambah Kolam" button with `plus` icon.
    - Save Action: Button `bg-[#008d91] text-white h-[46px] rounded-[7px] font-semibold text-[14px]` with "Simpan dan Lanjutkan" + `arrow-right` -> `/mitra/onboarding/installation`.
  - **UI & Anti-Slop Guardrails:** Show preview cards of ponds with species badges and dimensions.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.5.4: Mitra Onboarding Step 3 — Jadwal & Konfirmasi Instalasi IoT (`app/(mobile)/mitra/onboarding/installation/page.tsx`) — Figma `32:4964` ("Jadwal Instalasi") & `32:5009` ("Instalasi Terjadwal")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-07 · design.md §2 · **Figma Nodes `32:4964` & `32:5009` (360x800)**
  - **Target File(s):** `app/(mobile)/mitra/onboarding/installation/page.tsx`
  - **Dependencies & Store Bindings:** `Button`, `Input`, icons (`calendar-days`, `clock`, `message-circle`, `check`, `arrow-right`).
  - **Exact Figma Dev Mode Specs (`32:4964` & `32:5009`):**
    - Navigation: Back chevron + Fiscycle Logo + `hourglass`.
    - Step Form (`32:4975`):
      - Title: "Jadwal Instalasi" (`text-[21px] font-bold text-[#173653]`).
      - Subtitle: "Pilih jadwal yang sesuai untuk instalasi perangkat di lokasi Anda." (`text-[13px] text-[#6f8191]`).
      - Field 1: Pilih Tanggal with `calendar-days` icon (e.g. "15 Mei 2025" or current demo date).
      - Field 2: Pilih Waktu with `clock` icon & `chevron-down` (Options: "09.00 - 12.00", "13.00 - 16.00").
      - Field 3: Nama PIC di Lokasi ("Budi Santoso").
      - Field 4: Nomor WhatsApp PIC with `message-circle` icon ("0812 3456 7890").
    - Confirmation State (`32:5009`):
      - Calendar celebration icon with green check badge (`bg-[#07b18c] size-[55px]`).
      - Headline: "Instalasi Terjadwal" (`text-[21px] font-bold text-[#173653]`).
      - Subtitle: "Jadwal instalasi Anda telah dikonfirmasi." (`text-[13px] text-[#6f8191]`).
      - Summary Card (`bg-[#eff7fa] rounded-[10px] p-[15px]`): Tanggal, Waktu, PIC, dan Alamat Lokasi.
    - Action: Button "Lihat Status Instalasi" -> `/mitra/onboarding/status`.
  - **UI & Anti-Slop Guardrails:** Indonesian dates and slots.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.5.5: Mitra Onboarding Step 4 — Status Instalasi Lapangan (`app/(mobile)/mitra/onboarding/status/page.tsx`) — Figma `32:5080` ("Status Instalasi")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 AUTH-07 · design.md §2 · **Figma Node `32:5080` ("Status Instalasi", 360x800)**
  - **Target File(s):** `app/(mobile)/mitra/onboarding/status/page.tsx`
  - **Dependencies & Store Bindings:** `Button`, `Badge`, `check`, `arrow-right`.
  - **Exact Figma Dev Mode Specs (`32:5080`):**
    - Navigation: Back chevron + Fiscycle Logo + `hourglass`.
    - Introduction (`32:5092`):
      - Title: "Proses Instalasi oleh Tim Fiscycle" (`text-[21px] font-bold text-[#173653] leading-[1.35]`).
      - Subtitle: "Berikut adalah progres instalasi perangkat di lokasi Anda." (`text-[13px] text-[#6f8191]`).
    - 6-Step Vertical Timeline (`32:5095`):
      1. "Jadwal dikonfirmasi" (12 Mei 2025, 10:30) — Completed (`bg-[#19b77b]` with `check` icon).
      2. "Tim teknis ditugaskan" (13 Mei 2025, 08:15) — Completed.
      3. "Tim teknis datang ke lokasi" (15 Mei 2025, 09:10) — Completed.
      4. "Pemasangan perangkat" (15 Mei 2025, 10:00) — Completed.
      5. "Uji konektivitas dan sensor" (15 Mei 2025, 11:30) — Completed.
      6. "Selesai" (15 Mei 2025, 12:00) — Completed.
    - Action: Button "Lanjut ke Aktivasi Akun" (`bg-[#008d91] text-white h-[46px] rounded-[7px] font-semibold text-[14px]`) -> `/mitra/onboarding/activate`.
  - **UI & Anti-Slop Guardrails:** Clean summary visual with vertical progress line connecting circular markers.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 2.5.6: Mitra Onboarding Step 5 & 6 — Aktivasi Akun & Siap Digunakan (`app/(mobile)/mitra/onboarding/activate/page.tsx`) — Figma `32:5153` ("Aktivasi Akun") & `32:5215` ("Siap Digunakan")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 AUTH-07 · design.md §2 · **Figma Nodes `32:5153` & `32:5215` (360x800)**
  - **Target File(s):** `app/(mobile)/mitra/onboarding/activate/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`completeMitraOnboarding`); `useRouter`, `Button`, icons (`check`, `waves`, `circle-check`, `arrow-right`).
  - **Exact Figma Dev Mode Specs (`32:5153` & `32:5215`):**
    - State 1 — Aktivasi Akun (`32:5153`):
      - Title: "Aktivasi Akun" (`text-[21px] font-bold text-[#173653]`).
      - Subtitle: "Semua tahapan telah selesai. Sekarang aktifkan akun Anda untuk mulai menggunakan Fiscycle." (`text-[13px] text-[#6f8191]`).
      - Completed Requirements Summary Box (`bg-[#e7f7f2] rounded-[10px] p-[20px]`):
        1. "Data usaha / tambak" — Selesai (`check` in `bg-[#19b77b]`).
        2. "Data kolam" — Selesai.
        3. "Instalasi perangkat" — Selesai.
      - Password Creation Fields: "Buat kata sandi", "Konfirmasi kata sandi".
      - CTA: "Aktifkan Akun" (`bg-[#008d91] text-white h-[46px] rounded-[7px] font-semibold text-[14px]`).
    - State 2 — Siap Digunakan (`32:5215`):
      - Celebration Badge: Large circular check (`bg-[#07b18c] size-[87px]`).
      - Headline: "Akun Anda Sudah Aktif!" (`text-[24px] font-bold text-[#173653] leading-[1.35]`).
      - Description: "Sekarang Anda dapat memantau kondisi tambak secara real-time melalui dashboard Fiscycle." (`text-[13px] text-[#6f8191]`).
      - Primary CTA: "Masuk ke Dashboard" (`bg-[#008d91] text-white h-[46px] rounded-[7px] font-semibold text-[14px]` + `arrow-right`) -> calls `completeMitraOnboarding()` and navigates to `/mitra/dashboard`.
      - Dashboard Preview Box (`bg-[#e5f3fa] rounded-[10px] p-[12px]`):
        - Header: "Preview Dashboard Mitra" · "Lihat semua ›" (`text-[10px] font-semibold text-[#008d91]`).
        - Metric 1: Total Kolam = 4 (with `waves` icon).
        - Metric 2: Kondisi Baik = 3 (with `circle-check` icon).
  - **UI & Anti-Slop Guardrails:** Sets `onboardingCompleted: true` on user state; smooth routing.
  - **Verify (DoD):** `pnpm typecheck`; user transitions to active Mitra dashboard.

> 🛑 **[AUDIT CHECKPOINT 2.5]** — Jalankan pnpm typecheck & uji end-to-end seluruh alur Mitra Onboarding.

---

## Milestone 3 — Workspace 1: Mitra Tambak (Mobile-First PWA)

### Sub-Phase 3.1 — Mitra Shell, Bottom Navbar & Reusable Widgets

- [x] **Task 3.1.1: Mitra Shell Layout & Persistent Container (`app/(mobile)/mitra/layout.tsx`)**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-01 · design.md §2 & §5 · **Figma Node `35:5236`**
  - **Target File(s):** `app/(mobile)/mitra/layout.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`currentUser`); `useRouter`.
  - **Detailed Implementation Specs:**
    - Guard: redirect to `/auth/login` if user not authenticated or role !== 'mitra'. If `!partnerTokenVerified` redirect to `/auth/mitra/token`; if `!onboardingCompleted` redirect to `/mitra/onboarding`.
    - Provide persistent mobile frame padding bottom `pb-24` to avoid overlapping floating bottom navbar.
    - Render child routes and `<MitraBottomNavbar />`.
  - **UI & Anti-Slop Guardrails:** smooth route transitions; no jitter on bottom navbar.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.1.2: Mitra Floating Glassmorphism Bottom Navbar (`components/mitra/MitraBottomNavbar.tsx`) — Figma `35:5371` & `69:75774`**
  - **Mode & Ref:** `[Flash-Med]` | design.md §5 · **Figma Nodes `35:5371` & `69:75774` ("Bottom navigation", 360x62)**
  - **Target File(s):** `components/mitra/MitraBottomNavbar.tsx`
  - **Dependencies & Store Bindings:** `usePathname`; `Home`, `List`, `Sparkles`, `ClipboardList`, `Fish`.
  - **Exact Figma Dev Mode Specs (`35:5371` & `69:75774`):**
    - Floating pill docked at bottom of `max-w-md`: `fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[416px] z-50`.
    - Glassmorphism styling: `bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-2xl rounded-3xl px-3 py-2 flex items-center justify-around`.
    - 4 Core Navigation Tabs matching Figma (`35:5372` & `69:75775`):
      1. Beranda (`/mitra/dashboard`) -> `Home` (Label: "Beranda")
      2. Pakan (`/mitra/feed`) -> `List` (Label: "Pakan")
      3. Rekomendasi AI (`/mitra/insights`) -> `Sparkles` / `Settings` (Label: "Rekomendasi")
      4. Riwayat & Laporan (`/mitra/reports`) -> `ClipboardList` (Label: "Riwayat")
    - Active state: pill background `bg-[#1A365D] text-white shadow-sm` with smooth transition; inactive: `text-slate-400 hover:text-slate-600`.
  - **UI & Anti-Slop Guardrails:** exact squircle, active indicator with icon + micro label.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.1.3: Mitra Top Header Bar & Drawer Navigation Menu (`components/mitra/MitraHeader.tsx` & `components/mitra/MitraDrawerMenu.tsx`) — Figma `35:5243`, `35:5251` & `69:75173`**
  - **Mode & Ref:** `[Flash-Low]` | design.md §5 · **Figma Nodes `35:5243` ("Brand bar"), `35:5251` ("Farm greeting"), `69:75173` ("Header actions")**
  - **Target File(s):** `components/mitra/MitraHeader.tsx`, `components/mitra/MitraDrawerMenu.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore`, `useMitraStore`; `Menu`, `Bell`, `ShieldCheck`, `ChevronDown`, `Sheet`.
  - **Exact Figma Dev Mode Specs (`35:5243`, `35:5251` & `69:75173`):**
    - Brand Bar: Fiscycle Logo + Notifications Bell with red unread indicator + Hamburger Menu button (`69:76456` `menu`).
    - **MitraDrawerMenu (Slide-over Sheet)**: Triggered by the hamburger menu icon, giving instant access to all 11 operational screens in the ecosystem:
      1. 🏠 Beranda Dashboard (`/mitra/dashboard`)
      2. 🌊 Daftar Kolam Tambak (`/mitra/ponds`)
      3. 🔄 Siklus Budidaya (`/mitra/cycles`)
      4. 📊 Ringkasan Produksi (`/mitra/production`)
      5. 🌿 Pakan & Pertumbuhan (`/mitra/feed`)
      6. 🪱 BSF & Sirkular (`/mitra/bsf`)
      7. 🛒 Pasar & Penjualan Panen (`/mitra/harvest`)
      8. 📡 Perangkat IoT Tambak (`/mitra/devices`)
      9. 📈 Laporan & Analitik (`/mitra/reports`)
      10. 🧠 Insight & Rekomendasi AI (`/mitra/insights`)
      11. 👤 Profil & Daftar Tambak Saya (`/mitra/profile`)
    - Farm Greeting:
      - Greeting: "Halo, Budi! 👋" (`text-[20px] font-bold text-[#163252]`).
      - Farm Selector: "Tambak Makmur" + `ChevronDown` (`text-[13px] font-medium text-[#748397]`).
      - IoT Sync Status: Pulsing green dot + "Sensor aktif · Update 2 mnt lalu" (`text-[11px] text-[#08b784]`).
  - **UI & Anti-Slop Guardrails:** 100% natural Indonesian; clean typography; sheet drawer smoothly animated.
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 3.1]** — Jalankan pnpm typecheck & verifikasi layout shell mitra.

### Sub-Phase 3.2 — Mitra Beranda Dashboard

- [x] **Task 3.2.1: Mitra Beranda Dashboard Page (`app/(mobile)/mitra/dashboard/page.tsx`) — Figma `35:5236` ("Fiscycle · Phone dashboard")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 MTR-01, MTR-02 · design.md §2 · **Figma Node `35:5236` (360x1928)**
  - **Target File(s):** `app/(mobile)/mitra/dashboard/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`farm`, `ponds`, `tasks`, `toggleTaskCompleted`, `getPondSummaryCounts`); `Link`, `AlertTriangle`, `CheckCircle2`, `Clock`, `ArrowUpRight`, `Activity`.
  - **Exact Figma Dev Mode Specs (`35:5236`):**
    - Top header: `<MitraHeader />`.
    - **Farm Summary Bento (`35:5259`)**:
      - Total Kolam: `6 Kolam` (`bg-white rounded-[12px] p-3 border border-slate-100`)
      - Kondisi Baik: `4 Kolam` (`text-emerald-600 bg-emerald-50/50`)
      - Perlu Perhatian: `1 Kolam` (`text-amber-600 bg-amber-50/50`)
      - Kritis: `1 Kolam` (`text-rose-600 bg-rose-50/50`)
    - **Peringatan Anomali Kritis Banner (`35:5280`)**:
      - Red/Rose gradient alert card with pulsing beacon (`bg-rose-50 border border-rose-200 rounded-[14px] p-4`).
      - "Kolam 2 — Oksigen Terlarut (DO) Rendah (3,2 mg/L ↓)".
      - CTA: "Tindakan Cepat & Diagnostik AI" -> links to `/mitra/ponds/POND-02`.
    - **Kondisi Semua Kolam (Horizontal Scroll Cards)**:
      - Quick cards for Kolam 1 through Kolam 6 with DO, temperature, and status badges.
    - **Kualitas Air Hari Ini (`40:4`)**:
      - Horizontal linear meters for:
        - DO (Oksigen Terlarut): `5,4 mg/L` (Target > 5,0 mg/L)
        - pH Air: `7,4` (Target 7,0 - 8,5)
        - Suhu Air: `28,5 °C` (Target 26 - 30 °C)
        - Amonia: `0,02 mg/L` (Target < 0,1 mg/L)
    - **Rekomendasi AI Terkini (`40:56`)**:
      - AI Insight Card with action checklist: "Tingkatkan aerasi Kolam 2 dan pantau selama 2 jam."
    - **Farm Operations & Daily Tasks (`40:79`)**:
      - Task Progress: "Tugas Hari Ini" (2/5 selesai linear bar).
      - 5 Farm Task Checkboxes calling `toggleTaskCompleted(taskId)`:
        1. TSK-01: Nyalakan aerator tambahan Kolam 2 (Pond 2, 08:00 WIB)
        2. TSK-02: Pemberian pakan pelet BSF pagi (Kolam 1-3, 09:30 WIB)
        3. TSK-03: Cek kalibrasi sensor pH & DO (Kolam 4, 11:00 WIB)
        4. TSK-04: Pengambilan sampel bobot ikan mingguan (Kolam 1, 14:00 WIB)
        5. TSK-05: Pemberian pakan pelet BSF sore (Kolam 4-6, 16:30 WIB)
      - Status Perangkat: 6/6 perangkat aktif terhubung.
  - **UI & Anti-Slop Guardrails:** Golden thread task completion; instantaneous reactive UI; horizontal linear progress bars only (NO radial gauges).
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 3.2]** — Jalankan pnpm typecheck & uji interaksi checklist tugas di dashboard.

### Sub-Phase 3.3 — Mitra Kolam Overview & Filter

- [x] **Task 3.3.1: Mitra Ponds Overview Page (`app/(mobile)/mitra/ponds/page.tsx`) — Figma `69:72574` ("Phone Daftar Kolam · Farm flow")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 MTR-02 · design.md §2 · **Figma Node `69:72574` (360x2504)**
  - **Target File(s):** `app/(mobile)/mitra/ponds/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`ponds`); `Link`, `Badge`, `Fish`, `Thermometer`, `Activity`, `Droplets`, `ArrowRight`.
  - **Exact Figma Dev Mode Specs (`69:72574`):**
    - Breadcrumb: Beranda › Kolam.
    - Page Heading: "Daftar Kolam Tambak" (`text-[22px] font-bold text-[#163252]`).
    - Action Header: "+ Tambah Kolam" button (`bg-[#00566b] text-white rounded-[7px] px-3 py-1.5`).
    - Filter Tabs: "Semua (6)", "Baik (4)", "Perhatian (1)", "Kritis (1)", "Offline (0)".
    - Search Bar: "Cari nama kolam atau komoditas..." (`bg-white border border-[#e1e7ec] rounded-[8px]`).
    - 6 Detailed Pond Record Cards (`69:72626` to `69:72756`):
      - Pond Name & Species (e.g. `Kolam 2 — Ikan Nila Hitam`).
      - Status Badge with pulsing beacon (`Kritis`, `Perhatian`, `Baik`).
      - Biomass & Harvest ETA: `520 kg biomassa · Siap Panen 11 hari lagi`.
      - 3 Horizontal Linear Metric Bars:
        - DO (mg/L) with threshold indicator.
        - Suhu Air (°C).
        - pH Air.
      - "Detail & Diagnostik Sensor" CTA button -> `/mitra/ponds/[id]`.
  - **UI & Anti-Slop Guardrails:** Horizontal linear progress bars only; NO fake circular gauges.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.3.2: Mitra Siklus Budidaya Page (`app/(mobile)/mitra/cycles/page.tsx`) — Figma `69:71792` ("Phone Siklus Budidaya")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-02 · design.md §2 · **Figma Node `69:71792` (360x3035)**
  - **Target File(s):** `app/(mobile)/mitra/cycles/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`farm`, `ponds`); `Link`, `Badge`, `Calendar`, `TrendingUp`, `Clock`.
  - **Exact Figma Dev Mode Specs (`69:71792`):**
    - Breadcrumb: Beranda › Siklus Budidaya.
    - Page Heading: "Siklus Budidaya" (`text-[22px] font-bold text-[#163252]`).
    - Subtitle: "Manajemen siklus tebar benih, fase pertumbuhan, dan jadwal panen tambak."
    - Navigation Tabs: "Siklus Berjalan (6)", "Rencana Tebar (2)", "Riwayat Panen (14)".
    - Summary Metrics:
      - Rata-rata Umur Ikan: `45 Hari (Fase Pembesaran)`
      - Tingkat Kelangsungan Hidup (SR): `91,5%`
      - Estimasi Panen Terdekat: `11 Hari Lagi (Kolam 1 & 4)`
    - Active Pond Cycle Timeline Cards:
      - Kolam 1: Tebar 1 Okt 2026 -> Panen 15 Nov 2026 (Progres 75%)
      - Kolam 2: Tebar 15 Sep 2026 -> Panen 30 Nov 2026 (Progres 50%)
      - Kolam 4: Siap Panen (Target 500 kg Nila Super)
  - **UI & Anti-Slop Guardrails:** Clean sequential progress milestones; 100% Indonesian copy.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.3.3: Mitra Ringkasan Produksi Page (`app/(mobile)/mitra/production/page.tsx`) — Figma `69:72068` ("Phone Ringkasan Produksi")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-02 · design.md §2 · **Figma Node `69:72068` (360x2962)**
  - **Target File(s):** `app/(mobile)/mitra/production/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`farm`, `ponds`); `Link`, `Activity`, `TrendingUp`, `ShieldCheck`.
  - **Exact Figma Dev Mode Specs (`69:72068`):**
    - Breadcrumb: Beranda › Ringkasan Produksi.
    - Page Heading: "Ringkasan Produksi" (`text-[22px] font-bold text-[#163252]`).
    - Subtitle: "Kapasitas, utilisasi biomassa kolam, dan efisiensi tambak terintegrasi."
    - 4 Key Production Bento Cards:
      - Total Biomassa Aktif: `12.400 kg`
      - Tingkat Utilisasi Kolam: `82% dari kapasitas maksimal`
      - Estimasi Tonase Panen Bulan Ini: `3.500 kg`
      - Jam Air Aman (Safe Water Hours): `98,2%`
    - Commodity Distribution:
      - Ikan Nila Hitam: `65% (8.060 kg)`
      - Ikan Bandeng: `25% (3.100 kg)`
      - Ikan Lele: `10% (1.240 kg)`
    - Anomaly & Operations Summary list.
  - **UI & Anti-Slop Guardrails:** Accurate kg and percentage calculations based on seeded farm ponds.
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 3.3]** — Jalankan pnpm typecheck & verifikasi filtering status kolam.

### Sub-Phase 3.4 — Mitra Pond Detail Telemetry & AI Diagnostic

- [x] **Task 3.4.1: Pond Telemetry Deep-Dive & AI Alert Resolution (`app/(mobile)/mitra/ponds/[id]/page.tsx`) — Figma `69:72327` ("Phone Detail Kolam · Farm flow")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 MTR-02, MTR-03 · design.md §2 · **Figma Node `69:72327` (360x2730)**
  - **Target File(s):** `app/(mobile)/mitra/ponds/[id]/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`ponds`, `resolvePondAlert`); `useRouter`, `useParams`.
  - **Exact Figma Dev Mode Specs (`69:72327`):**
    - Breadcrumb: Kolam › Kolam 2.
    - Page Heading & Status Badge: "Kolam 2" + Badge `Kritis` (`bg-rose-100 text-rose-700`).
    - Subtitle: "Komoditas Nila Hitam · 520 kg biomassa · Siklus Hari ke-45".
    - Action Buttons: "Lihat Analisis AI" & "Tandai Ditangani" (`bg-[#00566b] text-white`).
    - Section Navigation Tabs: Ringkasan, Kualitas Air, Pakan, Pertumbuhan, Panen, Rekomendasi, Aktivitas.
    - **4 Live Sensor Telemetry Cards (`69:72382`)**:
      1. DO: `3,2 mg/L ↓` (Kritis, Ambang Batas < 4,0 mg/L)
      2. pH Air: `7,1` (Aman, 6,5 - 8,5)
      3. Suhu Air: `29,4 °C ↑` (Aman, 28 - 32 °C)
      4. Kekeruhan: `24 NTU` (Aman, < 40 NTU)
    - **Notice & AI Alert Resolution Card (`69:72416` & `69:72421`)**:
      - Anomaly Banner: "Peringatan Anomali DO Rendah Terdeteksi".
      - Root-Cause: Penurunan kadar DO akibat kenaikan suhu siang hari dan padat tebar biomassa tinggi.
      - Action Checklist: "1. Nyalakan 2 kincir aerator cadangan", "2. Tunda pemberian pakan sore 2 jam".
      - **Golden Thread Button**: "Terapkan Rekomendasi & Selesaikan Anomali" -> calls `resolvePondAlert(pond.id)`.
      - Instant feedback: Status flips to `Baik`, DO updates to safe range (`5,8 mg/L`), toast notification fires!
    - **Riwayat Kualitas Air 7 Hari (`69:72436`)**: SVG 7-day trend chart showing DO fluctuations.
    - **Perangkat Terhubung & Aktivitas Terbaru (`69:72427` & `69:72544`)**.
  - **UI & Anti-Slop Guardrails:** Deterministic reactive state update; instant DOM transition.
  - **Verify (DoD):** `pnpm typecheck`; clicking resolve alert updates store and UI immediately.

> 🛑 **[AUDIT CHECKPOINT 3.4]** — Jalankan pnpm typecheck & uji golden thread pemulihan anomali POND-02.

### Sub-Phase 3.5 — Mitra BSF & Sirkular

- [x] **Task 3.5.1: Mitra BSF Feed Inventory & Circular Traceability (`app/(mobile)/mitra/bsf/page.tsx`) — Figma `69:73655` ("Phone BSF & Sirkular")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-04, CIRC-03 · design.md §2 · **Figma Node `69:73655` (360x6607)**
  - **Target File(s):** `app/(mobile)/mitra/bsf/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`bsfBatches`, `allocateBsfToPond`); `useWastePointStore` (`contributions`); `Link`.
  - **Exact Figma Dev Mode Specs (`69:73655`):**
    - Page Heading: "BSF & Sirkular" (`text-[22px] font-bold text-[#163252]`).
    - 3 Navigation Tabs (`69:73688`): "Sampah Organik", "Budidaya BSF", "Pakan untuk Ikan".
    - Summary Metrics (`69:73695`):
      - Total Stok Pelet Maggot: `242 kg`
      - Biowaste Terolah: `1.250 kg`
      - Biaya Pakan Dihemat: `Rp 1.450.000 (35% hemat)`
    - Circular Traceability Flow Widget (`69:73823`):
      - Visual flow connecting: Restoran Surya (`IN-0045`, 45 kg) -> Biokonversi BSF Batch 03 -> Pelet Maggot 42% Protein -> Kolam Tambak 1-3.
    - Active BSF Batch Cards (`69:73756`):
      - 4 Batches (`BSF-01` to `BSF-04`) with Protein %, Fat %, and kg available.
    - Action: "Alokasikan Pakan ke Kolam" CTA button -> `/mitra/bsf/allocate`.
  - **UI & Anti-Slop Guardrails:** Explicit linkage between organic waste inputs and maggot feed outputs.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.5.2: Mitra BSF Feed Allocation Action Page (`app/(mobile)/mitra/bsf/allocate/page.tsx`)**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-04 · design.md §2
  - **Target File(s):** `app/(mobile)/mitra/bsf/allocate/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`bsfBatches`, `ponds`, `allocateBsfToPond`); `useRouter`.
  - **Detailed Implementation Specs:**
    - Select Batch: Dropdown of available BSF batches with protein rating.
    - Select Target Pond: Dropdown (`POND-01` to `POND-06`).
    - Input Amount: Weight in kg (slider and number input, max available).
    - Cost savings calculator: "Menghemat Rp 42.000 dibanding pelet konvensional".
    - Submit button: calls `allocateBsfToPond(batchId, pondId, kg)` -> redirects to `/mitra/bsf` with success toast.
  - **UI & Anti-Slop Guardrails:** Prevents over-allocation exceeding batch availability.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.5.3: Mitra Pakan & Pertumbuhan Page (`app/(mobile)/mitra/feed/page.tsx`) — Figma `69:70951` ("Phone Pakan & Pertumbuhan")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 MTR-04 · design.md §2 · **Figma Node `69:70951` (360x3038)**
  - **Target File(s):** `app/(mobile)/mitra/feed/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`ponds`, `bsfBatches`); `Link`, `Badge`, `Scale`, `TrendingUp`, `Clock`.
  - **Exact Figma Dev Mode Specs (`69:70951`):**
    - Bottom Navbar Destination: Linked directly to tab "Pakan" (`35:5376` & `69:75779`).
    - Breadcrumb: Beranda › Pakan & Pertumbuhan.
    - Page Heading: "Pakan & Pertumbuhan" (`text-[22px] font-bold text-[#163252]`).
    - Subtitle: "Efisiensi FCR, log pemberian pakan harian, dan pertumbuhan biomassa ikan."
    - Summary Metrics (`69:70995`):
      - FCR Rata-rata: `1,32 (Target ≤ 1,40 — Efisiensi Sangat Baik)`
      - Total Pakan Terpakai: `3.840 kg`
      - ADG (Laju Tumbuh Harian): `2,8 g/ekor/hari`
    - Jadwal Pemberian Pakan Hari Ini:
      - Sesi Pagi (09:30 WIB): 45 kg Maggot BSF + 25 kg Pelet (Kolam 1-3) — Selesai ✓
      - Sesi Sore (16:30 WIB): 40 kg Maggot BSF + 30 kg Pelet (Kolam 4-6) — Terjadwal
    - Rasio Pakan Sirkular:
      - 40% Maggot BSF Segar & Kering (Subsidi Fiscycle)
      - 60% Pelet Apung Komersial
    - Log Harian & Estimasi Kebutuhan Pakan 7 Hari ke Depan.
  - **UI & Anti-Slop Guardrails:** Accurate FCR formulas; responsive table/cards matching Figma `69:70951`.
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 3.5]** — Jalankan pnpm typecheck & uji alokasi pakan BSF ke kolam.

### Sub-Phase 3.6 — Mitra Pasar & Penjualan / Panen

- [x] **Task 3.6.1: Mitra Harvest Readiness & Off-taker Offers Page (`app/(mobile)/mitra/harvest/page.tsx`) — Figma `69:75166` ("Phone Pasar & Penjualan")**
  - **Mode & Ref:** `[Flash-High]` | requirements.md §3 MTR-05 · design.md §2 · **Figma Node `69:75166` (360x7046)**
  - **Target File(s):** `app/(mobile)/mitra/harvest/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`ponds`, `allocationOffers`); `Link`, `Calendar`, `TrendingUp`, `CheckCircle2`.
  - **Exact Figma Dev Mode Specs (`69:75166`):**
    - Page Heading: "Pasar & Penjualan" (`text-[22px] font-bold text-[#163252]`).
    - 3 Navigation Tabs (`69:75200`): "Kebutuhan Buyer", "Penawaran Saya", "Riwayat Transaksi".
    - Summary Metrics (`69:75213`):
      - Siap Panen: `3.120 kg` ikan siap serap
      - Total Penjualan Bulan Ini: `Rp 48.600.000`
      - Pesanan Aktif: `2 Kontrak`
    - Buyer Demand Cards (`69:75253`):
      - Restoran Seafood Surya (Surabaya): Butuh 400 kg Ikan Nila Super (300-400g) @ Rp 40.000/kg.
      - Hotel Grand Majapahit (Surabaya): Butuh 250 kg Ikan Bandeng Cabut Duri @ Rp 45.000/kg.
    - AI Recommendation Match (`69:75332`):
      - AI Match Score Badge: `96% Kecocokan Stok` (Stok Kolam 1 siap panen dalam 7 hari).
      - "Tinjau Penawaran Panen" link -> `/mitra/harvest/offers/[id]`.
  - **UI & Anti-Slop Guardrails:** Accurate IDR calculations.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.6.2: Mitra Off-taker Offer Detail & Decision (`app/(mobile)/mitra/harvest/offers/[id]/page.tsx`)**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-05 · design.md §2
  - **Target File(s):** `app/(mobile)/mitra/harvest/offers/[id]/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`allocationOffers`, `respondToAllocation`); `useRouter`, `useParams`.
  - **Detailed Implementation Specs:**
    - Full details of off-taker allocation: Buyer name, delivery location, harvest pickup date, pond source, agreed price per kg.
    - AI Matching Breakdown: 40 pts Species Match + 30 pts Size Grade + 26 pts Pond Readiness = 96% Match.
    - Two action buttons:
      - "Tolak Penawaran" -> calls `respondToAllocation(offerId, false)`
      - "Setujui Kontrak Penyerapan Panen" -> calls `respondToAllocation(offerId, true)`
    - Updates offer status, displays success toast, and refreshes view.
  - **UI & Anti-Slop Guardrails:** Instant confirmation without mock server lag.
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 3.6]** — Jalankan pnpm typecheck & uji alur penerimaan penawaran panen ALC-0030.

### Sub-Phase 3.7 — Mitra Hardware Devices, Reports, AI Insights & Profile

- [x] **Task 3.7.1: Mitra IoT Devices Management (`app/(mobile)/mitra/devices/page.tsx`) — Figma `69:74781` ("Phone Perangkat")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-06 · design.md §2 · **Figma Node `69:74781` (360x4500)**
  - **Target File(s):** `app/(mobile)/mitra/devices/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`devices`); `Cpu`, `Battery`, `Radio`, `CheckCircle2`, `AlertCircle`.
  - **Exact Figma Dev Mode Specs (`69:74781`):**
    - Page Heading: "Perangkat IoT" (`text-[22px] font-bold text-[#163252]`).
    - Summary Metrics: 7 Perangkat Terpasang · 6 Normal · 1 Perlu Kalibrasi.
    - Perlu Ditangani Alert: Sensor DO Kolam 4 perlu kalibrasi ulang.
    - 7 Device Cards with Live Ping RSSI, Battery %, and Status Badges.
    - Action: "Kalibrasi Ulang Sensor" trigger with simulated confirmation toast.
  - **UI & Anti-Slop Guardrails:** Realistic hardware status indicators.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.7.2: Mitra Production & Water Quality Reports (`app/(mobile)/mitra/reports/page.tsx`) — Figma `69:74199` ("Phone Laporan")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-06 · design.md §2 · **Figma Node `69:74199` (360x5838)**
  - **Target File(s):** `app/(mobile)/mitra/reports/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`farm`, `ponds`); `FileText`, `Download`, `Calendar`.
  - **Exact Figma Dev Mode Specs (`69:74199`):**
    - Page Heading: "Laporan & Analitik" (`text-[22px] font-bold text-[#163252]`).
    - Metrics Summary: FCR = 1.32 (Sangat Baik), Survival Rate = 91,5%, Jam Air Aman = 98,2%.
    - Produksi Ikan vs Produksi BSF breakdown charts.
    - Top 5 Pelanggan & Rekap Penjualan.
    - CTA: "Ekspor Laporan PDF" with simulated download feedback toast.
  - **UI & Anti-Slop Guardrails:** Clean metrics cards with comparison badges.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.7.3: Mitra AI Insight & Recommendations (`app/(mobile)/mitra/insights/page.tsx`) — Figma `69:73301` ("Phone Insight & Rekomendasi")**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-03 · design.md §2 · **Figma Node `69:73301` (360x4128)**
  - **Target File(s):** `app/(mobile)/mitra/insights/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`ponds`, `resolvePondAlert`); `AlertTriangle`, `CheckCircle2`, `Brain`.
  - **Exact Figma Dev Mode Specs (`69:73301`):**
    - Page Heading: "Insight & Rekomendasi AI" (`text-[22px] font-bold text-[#163252]`).
    - Summary Metrics: 3 Rekomendasi Baru · 1 Kritis · 2 Optimasi Pakan.
    - Anomaly Insight Card: "Kolam 2 – Oksigen air rendah (DO 3,2 mg/L ↓)".
    - Root-Cause Diagnostic & Step-by-Step Action Plan.
    - "Terapkan Rekomendasi" button -> resolves anomaly and updates telemetry.
  - **UI & Anti-Slop Guardrails:** Direct link to pond anomaly resolution.
  - **Verify (DoD):** `pnpm typecheck`.

- [x] **Task 3.7.4: Mitra User Profile & Farm Account Settings (`app/(mobile)/mitra/profile/page.tsx`) — Figma `69:73085` & `69:72811`**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §3 MTR-01, AUTH-02 · design.md §2 · **Figma Nodes `69:73085` & `69:72811`**
  - **Target File(s):** `app/(mobile)/mitra/profile/page.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`currentUser`, `logout`); `useMitraStore` (`farm`); `useRouter`.
  - **Exact Figma Dev Mode Specs (`69:73085` & `69:72811`):**
    - Profile Header: Avatar initials, User Name ("Budi Santoso"), Email, WhatsApp.
    - Farm Info Card: Farm Name ("Tambak Makmur"), Partner Token ("FSC-FARM-0028"), Lokasi Lamongan.
    - Multi-Tambak Selector: List of farms managed by user.
    - System shortcuts:
      - "Perangkat IoT Tambak" -> `/mitra/devices`
      - "Laporan Produksi" -> `/mitra/reports`
      - "Insight & Rekomendasi" -> `/mitra/insights`
      - "Reset Demo Data" -> calls `resetAllStores()` with toast
    - Logout button -> calls `logout()`, redirects to `/auth/login`.
  - **UI & Anti-Slop Guardrails:** Clean Indonesian profile screen.
  - **Verify (DoD):** `pnpm typecheck`.

> 🛑 **[AUDIT CHECKPOINT 3.7]** — Jalankan pnpm typecheck & verifikasi kelengkapan seluruh Workspace Mitra.

---

## ⚠️ STATUS AUDIT & COMPLETION PLAN (Milestone 4 – Milestone 9: Real Atomic Tasks & Pre-Deploy Fixes)

> **HASIL AUDIT ARSITEKTUR TERBARU (2026-11-07):**
> 1. **Milestone 1–3 (60 Task)** serta sebagian besar halaman B2B, B2C, Admin Desktop/Mobile, dan 13 halaman Desktop Workspace telah diimplementasikan.
> 2. Namun ditemukan **7 Gap & Bug Kritis** yang menghalangi kesiapan deploy 100% dan mode review:
>    - **Bug Rute Desktop (`/desktop/*` 404):** Folder `app/(desktop)/*` menggunakan tanda kurung Route Group sehingga URL-nya menjadi `/dashboard`, `/farms`, dst., sedangkan `DesktopSidebar.tsx`, `/showcase`, dan link internal mengarah ke `/desktop/dashboard`, `/desktop/farms` (37 broken links).
>    - **Konflik Rute Duplikat `/admin`:** `app/(admin)/admin/page.tsx` dan `app/(mobile)/admin/page.tsx` (Screen 34 `69:70442`) sama-sama memetakan URL `/admin`.
>    - **Broken Links & Mismatched Node IDs di `/showcase`:** `app/showcase/page.tsx` memiliki 5 rute 404 (`/auth/mitra/upload-ktp`, `/upload-lahan`, `/review`, `/success`) dan Node ID yang belum sinkron dengan 47 screen asli di `.specs/slicing_tracker.md`.
>    - **Screen 20 & 21 Mobile Mitra Belum Ada:** `app/(mobile)/mitra/farms/page.tsx` (`69:73085`) dan `app/(mobile)/mitra/farms/[farmId]/page.tsx` (`69:72811`) belum dibuat.
>    - **Review Mode Guard Lockout:** Pindah antar workspace (`/mitra/*`, `/b2b/*`, `/b2c/*`, `/admin/*`) atau membuka `/mitra/dashboard` setelah menguji onboarding me-redirect paksa user ke `/auth/login` atau `/mitra/onboarding`.
>    - **Shared Primitives & B2C Profile:** `components/shared/*`, `app/(mobile)/b2c/profile/page.tsx`, `lib/matching.ts`, dan `lib/demo/verifyGoldenThread.ts` belum dibuat.
>    - **Layer Integrasi Repo AI Eksternal:** Perlu disiapkan client adapter & endpoint standar (`app/api/ai/*`) agar langsung siap di-plug dengan repo API AI eksternal.

---

## Milestone 4 (Revised) — Shared UI Primitives, Role Guard & Workspace 2 (B2B Industri)

### Sub-Phase 4.1 — Shared Non-Slop UI Primitives & Route Protection

- [x] **Task 4.1.1: Shared `RoleGuard` (Review-Mode Aware) & Hydration Skeleton (`components/shared/RoleGuard.tsx`, `components/shared/WorkspaceSkeleton.tsx`)**
  - **Mode & Ref:** `[Flash-Med]` | Rule G3, G9 · design.md §4.1 · requirements.md §3.1
  - **Target File(s):** `components/shared/RoleGuard.tsx`, `components/shared/WorkspaceSkeleton.tsx`
  - **Dependencies & Store Bindings:** `useHydrated` from `@/hooks/useHydrated`; `useAuthStore` (`currentUser`, `quickLoginAsRole`); `WorkspaceSkeleton`.
  - **Detailed Implementation Specs:**
    - `WorkspaceSkeleton.tsx`: `'use client';` renders a clean mobile/desktop skeleton (`animate-pulse`) using `bg-slate-200/70 rounded-3xl` blocks. Zero text or circular spinners.
    - `RoleGuard.tsx`: `'use client';` props `{ allowedRole: Role; children: React.ReactNode; allowUnonboardedMitra?: boolean }`.
    - Wait for `const hydrated = useHydrated();` — while `!hydrated`, render `<WorkspaceSkeleton />`.
    - **Review-Mode Seamless Auto-Switch:** If `!currentUser` or `currentUser.role !== allowedRole`, automatically call `quickLoginAsRole(allowedRole)` so reviewers jumping from `/showcase` or URL bar never get kicked out to `/auth/login`, while full project state remains valid for that role!
  - **UI & Anti-Slop Guardrails:** never flash unauthorized content; no circular spinner.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

- [x] **Task 4.1.2: Shared `LinearProgressBar` & `StatusBadge` (`components/shared/LinearProgressBar.tsx`, `components/shared/StatusBadge.tsx`)**
  - **Mode & Ref:** `[Flash-Low]` | Rule G7, G8 (zero circular gauges) · design.md §1
  - **Target File(s):** `components/shared/LinearProgressBar.tsx`, `components/shared/StatusBadge.tsx`
  - **Dependencies & Store Bindings:** `cn` from `@/lib/utils`; types `PondStatus`, `WasteStatus`, `OrderStatus`, `BsfBatchStatus` from `@/lib/types`.
  - **Detailed Implementation Specs:**
    - `LinearProgressBar.tsx`: horizontal progress bar clamping `0..100%` with semantic tones (`teal`, `navy`, `emerald`, `amber`, `rose`).
    - `StatusBadge.tsx`: semantic Indonesian status badge for `PondStatus | WasteStatus | OrderStatus | BsfBatchStatus | 'Online' | 'Perlu Kalibrasi' | 'Offline'`.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

- [x] **Task 4.1.3: Shared `TraceabilityTimeline` & `EmptyStateCard` (`components/shared/TraceabilityTimeline.tsx`, `components/shared/EmptyStateCard.tsx`)**
  - **Mode & Ref:** `[Flash-Low]` | design.md §3 · requirements.md §4 Step 3 & Step 6
  - **Target File(s):** `components/shared/TraceabilityTimeline.tsx`, `components/shared/EmptyStateCard.tsx`
  - **Detailed Implementation Specs:**
    - `TraceabilityTimeline.tsx`: 5-step vertical circular-economy chain (`Setoran Limbah Organik` → `Verifikasi Kualitas Admin` → `Biokonversi Maggot BSF` → `Pakan Sirkular Kolam` → `Panen & Distribusi Pasar`).
    - `EmptyStateCard.tsx`: clean squircle card with icon, Indonesian title, subtitle, and optional CTA `<Link>` button.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

---

### Sub-Phase 4.2 — B2B Workspace Shell, Header & Bottom Navigation

- [x] **Task 4.2.1: B2B Header & Floating Bottom Navbar (`components/b2b/B2BHeader.tsx`, `components/b2b/B2BBottomNavbar.tsx`)**
  - **Status:** Selesai & Terverifikasi (`ABC Restaurant`, `WAL-0007`).

- [x] **Task 4.2.2: B2B Layout & Root Redirect (`app/(mobile)/b2b/layout.tsx`, `app/(mobile)/b2b/page.tsx`)**
  - **Status:** Selesai (Perlu update kecil di Task 9.2.1 agar auto-switch role saat diakses dari mode review).

---

### Sub-Phase 4.3 — B2B Beranda, Procurement Checkout (Golden Thread Step 4) & Orders

- [x] **Task 4.3.1: B2B Beranda Sirkular (`app/(mobile)/b2b/dashboard/page.tsx`)**
  - **Status:** Selesai & Terhubung ke `useWastePointStore` (`WAL-0007`) dan `useB2BCartStore`.

- [x] **Task 4.3.2: B2B Bulk Fish Procurement & Point Redemption Checkout (`app/(mobile)/b2b/orders/page.tsx`, `app/(mobile)/b2b/procurement/page.tsx`)**
  - **Status:** Selesai.

---

### Sub-Phase 4.4 — B2B Waste Exchange (Golden Thread Step 1), Wallet & Profile

- [x] **Task 4.4.1: B2B Waste Exchange & Traceability (`app/(mobile)/b2b/waste/page.tsx`)**
  - **Status:** Selesai (`42 kg` default untuk Golden Thread Step 1 → `IN-0045`).

- [x] **Task 4.4.2: B2B Circular Wallet & B2B Profile (`app/(mobile)/b2b/wallet/page.tsx`, `app/(mobile)/b2b/profile/page.tsx`)**
  - **Status:** Selesai.

---

## Milestone 5 (Revised) — Workspace 3: B2C Rumah Tangga (Marketplace, Waste & Wallet)

### Sub-Phase 5.1 — B2C Shell, Bottom Navbar & Marketplace

- [x] **Task 5.1.1: B2C Header, Floating Bottom Navbar & Layout (`components/b2c/B2CHeader.tsx`, `components/b2c/B2CBottomNavbar.tsx`, `app/(mobile)/b2c/layout.tsx`)**
  - **Status:** Selesai.

- [x] **Task 5.1.2: B2C Fresh Fish Marketplace (`app/(mobile)/b2c/page.tsx`, `app/(mobile)/b2c/marketplace/page.tsx`)**
  - **Status:** Selesai.

---

### Sub-Phase 5.2 — B2C Checkout, Household Waste Exchange, Wallet & Profile

- [x] **Task 5.2.1: B2C Cart Checkout with Courier Waste Pickup & Point Redemption (`app/(mobile)/b2c/checkout/page.tsx`)**
  - **Status:** Selesai.

- [x] **Task 5.2.2: B2C Household Waste Exchange & Circular Wallet (`app/(mobile)/b2c/waste/page.tsx`, `app/(mobile)/b2c/points/page.tsx`, `app/(mobile)/b2c/wallet/page.tsx`)**
  - **Status:** Selesai.

- [x] **Task 5.2.3: B2C Household Profile Page (`app/(mobile)/b2c/profile/page.tsx`) & Navbar Link**
  - **Mode & Ref:** `[Flash-Low]` | design.md §2 · Rule G1
  - **Target File(s):** `app/(mobile)/b2c/profile/page.tsx`, `components/b2c/B2CBottomNavbar.tsx`
  - **Dependencies & Store Bindings:** `useAuthStore` (`currentUser`, `logout`); `useB2BCartStore` (`orders`); `resetAllStores` from `@/lib/demo/resetAllStores`; `useRouter`.
  - **Detailed Implementation Specs:**
    - Create `app/(mobile)/b2c/profile/page.tsx` displaying household profile (`Ibu Sari Wulandari`, `sari.wulandari@gmail.com`, `081277770012`, `Jl. Manyar Kertoarjo No. 21, Surabaya`), past household fish orders (`ORD-0239`), `"Reset Data Demo"`, and `"Keluar Akun"`.
    - Add `"Profil"` tab (`/b2c/profile`) to `components/b2c/B2CBottomNavbar.tsx`.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

---

## Milestone 6 (Revised) — Workspace 4: Admin Internal Desktop & Mobile (Exact Spec Alignment)

### Sub-Phase 6.1 — AI Matching Engine & Admin Shell Alignment

- [x] **Task 6.1.1: Shared AI Supply-Demand Matching Helper (`lib/matching.ts`) & Wire into `useAdminStore` and `/admin/supply`**
  - **Mode & Ref:** `[Flash-Med]` | design.md §4.5 · requirements.md §4 Step 5, ADM-02
  - **Target File(s):** `lib/matching.ts`, `store/useAdminStore.ts`
  - **Detailed Implementation Specs:**
    - Create `lib/matching.ts` exporting `scorePondForOrder(pond: Pond, order: FishOrder)` and `rankPondsForOrder(order: FishOrder, ponds: Pond[], farm: Farm): AllocationSuggestion[]`.
    - Ensure `POND-04` (`340g`, `Siap Panen`, `520 kg`) on `ORD-0241` (Nila `300-400g/ekor`, 500 kg) scores **96%**, `POND-01` scores **82%**, `POND-02` scores **55%**.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

- [x] **Task 6.1.2: Admin Desktop Shell & Sidebar (`app/(admin)/admin/layout.tsx`, `components/admin/AdminSidebar.tsx`, `app/(admin)/admin/dashboard/page.tsx`)**
  - **Status:** Selesai (`69:2719` Admin Internal Desktop).

---

### Sub-Phase 6.2 — Admin CRM Pipeline & Farms Monitor

- [x] **Task 6.2.1: CRM 11-Stage Pipeline & Drawer (`app/(admin)/admin/leads/page.tsx`, `components/admin/LeadDetailDrawer.tsx`)**
  - **Status:** Selesai (`LEAD_STAGE_ORDER` 11 tahap + penerbitan token `FSC-FARM-0029`).

- [x] **Task 6.2.2: Admin Farms & IoT Fleet Monitoring Page (`app/(admin)/admin/farms/page.tsx`)**
  - **Status:** Selesai.

---

### Sub-Phase 6.3 — Admin Waste Verification & Supply Orchestrator (Golden Thread Steps 2 & 5)

- [x] **Task 6.3.1: Admin Waste Verification & Supply Orchestrator (`app/(admin)/admin/waste/page.tsx`, `app/(admin)/admin/supply/page.tsx`)**
  - **Status:** Selesai.

---

## Milestone 7 — Simulated REST API Routes (Tim AI & IoT Telemetry Bridge) & Pitch Controller

### Sub-Phase 7.1 — Next.js 16 Route Handlers (`/app/api/*`) & External AI Repo Adapter

- [x] **Task 7.1.0: AI Bridge Route Handler (`app/api/ai/bridge/route.ts`)**
  - **Status:** Selesai (Mendukung `bsf_b1` & `water_analyze` dengan fallback deterministik).

- [x] **Task 7.1.1: AI Insight & Supply Matching API Endpoints (`app/api/ai/recommend/[pondId]/route.ts`, `app/api/ai/match-supply/route.ts`)**
  - **Mode & Ref:** `[Flash-Med]` | Rule G9 (Next.js 16 `params` is a `Promise`) · design.md §2
  - **Target File(s):** `app/api/ai/recommend/[pondId]/route.ts`, `app/api/ai/match-supply/route.ts`
  - **Detailed Implementation Specs:**
    - `app/api/ai/recommend/[pondId]/route.ts`: `GET` handler awaiting `params`, proxying to `process.env.FISCYCLE_AI_URL` if online and falling back to deterministic `derivePondStatus(pond.telemetry)` + `pond.activeInsight`.
    - `app/api/ai/match-supply/route.ts`: `POST` handler running `rankPondsForOrder` (or upstream AI matching endpoint) and returning `{ ok: true, recommendations }`.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

- [x] **Task 7.1.2: IoT Telemetry Endpoint & Typed AI Client SDK (`app/api/iot/telemetry/route.ts`, `lib/ai/client.ts`)**
  - **Mode & Ref:** `[Flash-Med]` | Rule G9 · design.md §2
  - **Target File(s):** `app/api/iot/telemetry/route.ts`, `lib/ai/client.ts`
  - **Detailed Implementation Specs:**
    - `app/api/iot/telemetry/route.ts`: `GET` & `POST` endpoint returning/accepting real-time pond sensor payloads (`pH`, `temperatureC`, `dissolvedOxygenMgL`, `turbidityNtu`) and device fleet status.
    - `lib/ai/client.ts`: Centralized typed client (`fetchWaterAnalysis`, `fetchBsfForecast`, `fetchPondRecommendation`, `fetchSupplyMatching`, `checkAiHealth`) so that when the external AI repo URL/contract is provided, all UI pages connect through a single clean module.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

---

### Sub-Phase 7.2 — Hackathon Live Pitch Floating Controller

- [x] **Task 7.2.1: Floating `DemoPitchToolbar` (`components/shared/DemoPitchToolbar.tsx`, `app/layout.tsx`)**
  - **Status:** Selesai (1-Click Role Switcher, 6-Step Golden Thread jumper, Auto-Run 6 Steps, Reset Demo).

---

## Milestone 8 — Automated Golden Thread Verification & Missing Figma Screens

### Sub-Phase 8.1 — Deterministic Golden Thread State Assertion Script

- [x] **Task 8.1.1: Golden Thread Self-Test Runner (`lib/demo/verifyGoldenThread.ts`) & Button in `DemoPitchToolbar`**
  - **Mode & Ref:** `[Flash-Med]` | requirements.md §4 (6-Step Golden Thread)
  - **Target File(s):** `lib/demo/verifyGoldenThread.ts`, `components/shared/DemoPitchToolbar.tsx`
  - **Detailed Implementation Specs:**
    - Create `lib/demo/verifyGoldenThread.ts` exporting `runGoldenThreadVerification(): { passed: boolean; steps: { step: number; name: string; passed: boolean; detail: string }[] }` that resets stores, executes all 6 Golden Thread mutations against the real Zustand stores, and asserts:
      1. `IN-0045` (`42 kg` from `ABC Restaurant`) created with `'Menunggu Verifikasi'`
      2. Admin verifies `IN-0045` → `WAL-0007` becomes `3.000 Poin` & `BSF-04` becomes `142 kg`
      3. Mitra resolves `POND-02` alert (`DO 5,6 mg/L`, status `'Baik'`) & allocates `20 kg` BSF feed
      4. B2B submits `ORD-0241` (`500 kg` Nila, redeems `3.000 Poin` = `-Rp 300.000`, net `Rp 15.950.000`, `WAL-0007` = `0 Poin`)
      5. Admin allocates `ORD-0241` to `POND-04` (match `96%`) → creates `ALC-0031` (`Rp 16.000.000`)
      6. Mitra accepts `ALC-0031` → status `'Disetujui Mitra'`, `ORD-0241` becomes `'Menunggu Panen'`
    - Wire a `"✅ Self-Test 6 Assertions"` button in `DemoPitchToolbar.tsx`.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

---

## Milestone 9 — Pre-Deploy Route Fixes, Missing Figma Screens (20 & 21) & Review Mode Perfection

### Sub-Phase 9.1 — Fix `/desktop/*` Route Group 404s & `/admin` Route Collision

- [x] **Task 9.1.1: Fix `/desktop` 404 Routing by Moving `app/(desktop)` to `app/desktop` & Adding `/desktop/help` and `/desktop/settings` Redirects**
  - **Mode & Ref:** `[Flash-High]` | Next.js App Router Route Group Fix · `.specs/slicing_tracker.md` Screens 35–45 & 47
  - **Target File(s):** Move `app/(desktop)/*` → `app/desktop/*`; update `app/desktop/ponds/page.tsx` & `components/desktop/DesktopSidebar.tsx`
  - **Detailed Implementation Specs:**
    - Rename directory `app/(desktop)` to `app/desktop` so that Next.js serves all 13 desktop screens at their canonical `/desktop/*` URLs (`/desktop/dashboard`, `/desktop/farms`, `/desktop/ponds/[pondId]`, `/desktop/cycles`, `/desktop/feed`, `/desktop/bsf`, `/desktop/harvest`, `/desktop/devices`, `/desktop/reports`, `/desktop/production`, `/desktop/insights`, `/desktop/browser`), immediately fixing all 37 broken `/desktop/*` links!
    - In `app/desktop/ponds/page.tsx`, fix redirect from `/ponds/kolam-2` to `/desktop/ponds/POND-01`.
    - In `app/desktop/reports/production/page.tsx`, update re-export path to `@/app/desktop/production/page`.
    - In `components/desktop/DesktopSidebar.tsx`, point `Bantuan` to `/showcase` (or `/desktop/insights`) and `Pengaturan` to `/desktop/devices` so zero links in `DesktopSidebar` 404.
  - **Verify (DoD):** `pnpm typecheck`; zero `/desktop/*` broken links in link audit.

- [x] **Task 9.1.2: Fix Duplicate `/admin` Route Collision (`app/(mobile)/admin/page.tsx` → `app/(mobile)/admin/mobile/page.tsx`)**
  - **Mode & Ref:** `[Flash-Low]` | Next.js App Router Route Collision Fix · Figma `69:70442` (Screen 34)
  - **Target File(s):** Move `app/(mobile)/admin/page.tsx` → `app/(mobile)/admin/mobile/page.tsx`; update `components/admin/AdminSidebar.tsx`
  - **Detailed Implementation Specs:**
    - Move `app/(mobile)/admin/page.tsx` (Screen 34 `Fiscycle · Phone Admin Internal`) to `app/(mobile)/admin/mobile/page.tsx` so it is served cleanly at `/admin/mobile` without colliding with `app/(admin)/admin/page.tsx` (`/admin` → redirects to `/admin/dashboard`).
    - Update `components/admin/AdminSidebar.tsx` link `"Tampilan Mobile Admin"` to `href="/admin/mobile"`.
  - **Verify (DoD):** `pnpm typecheck`; `/admin` redirects to `/admin/dashboard` (Desktop) and `/admin/mobile` renders Phone Admin Internal (`69:70442`).

---

### Sub-Phase 9.2 — Slicing Missing Mobile Mitra Screens 20 & 21 (`69:73085` & `69:72811`)

- [x] **Task 9.2.1: Slice Screen 20 `Fiscycle · Phone Daftar Tambak Saya` (`app/(mobile)/mitra/farms/page.tsx`) & Screen 21 `Fiscycle · Phone Detail Tambak` (`app/(mobile)/mitra/farms/[farmId]/page.tsx`)**
  - **Mode & Ref:** `[Flash-High]` | Figma Nodes `69:73085` & `69:72811` · `.specs/slicing_tracker.md` Screens 20 & 21
  - **Target File(s):** `app/(mobile)/mitra/farms/page.tsx`, `app/(mobile)/mitra/farms/[farmId]/page.tsx`
  - **Dependencies & Store Bindings:** `useMitraStore` (`farm`, `ponds`, `devices`, `bsfBatches`, `getPondSummaryCounts`); `MitraHeader`; `formatNumberId`, `formatWeightKg` from `@/lib/format`.
  - **Detailed Implementation Specs:**
    - `app/(mobile)/mitra/farms/page.tsx` (Figma `69:73085` — `Fiscycle · Phone Daftar Tambak Saya`):
      - Displays Mitra's managed farms list (`Tambak Makmur · FARM-0028 · Lamongan`, plus secondary preview card `Tambak Berkah · Gresik`) with status badge (`Aktif · Terhubung IoT`), total ponds (`6 Kolam`), total area (`2.400 m²`), active biomass (`2.570 kg`), partner token (`FSC-FARM-0028`), and CTA `"Lihat Detail Tambak"` → `/mitra/farms/FARM-0028` & `"Lihat Daftar Kolam"` → `/mitra/ponds`.
    - `app/(mobile)/mitra/farms/[farmId]/page.tsx` (Figma `69:72811` — `Fiscycle · Phone Detail Tambak`):
      - Displays comprehensive farm profile for `Tambak Makmur` (`FARM-0028`), GPS location (`Lamongan, Jawa Timur`), pond health summary (`4 Baik`, `1 Perhatian`, `1 Kritis`), list of all 6 ponds linking to `/mitra/ponds/[id]`, connected IoT gateway (`DEV-GW-01`), and BSF unit summary linking to `/mitra/bsf`.
    - Add `"Daftar Tambak Saya"` (`/mitra/farms`) link into `components/mitra/MitraDrawerMenu.tsx`.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`.

---

### Sub-Phase 9.3 — Dual-Mode Review Unlock (Seamless Review + Whole Project) & `/showcase` 100% Parity

- [x] **Task 9.3.1: Upgrade Workspace Layouts & Onboarding Pages for Seamless Review Mode + Query-Param State Switching**
  - **Mode & Ref:** `[Flash-Med]` | Review Mode + Whole Project Requirement
  - **Target File(s):** `app/(mobile)/mitra/layout.tsx`, `app/(mobile)/b2b/layout.tsx`, `app/(mobile)/b2c/layout.tsx`, `app/(admin)/admin/layout.tsx`, `app/(mobile)/mitra/onboarding/installation/page.tsx`, `app/(mobile)/mitra/onboarding/activate/page.tsx`
  - **Detailed Implementation Specs:**
    - In `B2BLayout`, `B2CLayout`, `AdminLayout`, and `MitraLayout`: when a user navigates into that workspace and `!currentUser` or `currentUser.role !== targetRole`, call `quickLoginAsRole(targetRole)` instead of redirecting to `/auth/login`! Also in `MitraLayout`, if a user navigates to `/mitra/dashboard` (or any non-onboarding `/mitra/*` route) while `currentUser.onboardingCompleted` is false, auto-ensure `completeMitraOnboarding()` / `verifyPartnerToken('FSC-FARM-0028')` so reviewers are never trapped in an onboarding redirect loop.
    - In `app/(mobile)/mitra/onboarding/installation/page.tsx`: read `useSearchParams().get('scheduled') === 'true'` to initialize `isScheduled = true` so Screen 15 (`32:5009`) can be opened directly via `/mitra/onboarding/installation?scheduled=true`.
    - In `app/(mobile)/mitra/onboarding/activate/page.tsx`: read `useSearchParams().get('ready') === 'true'` to initialize `isActivated = true` so Screen 18 (`32:5215`) can be opened directly via `/mitra/onboarding/activate?ready=true`.
  - **Verify (DoD):** `pnpm typecheck` + `pnpm lint`; every workspace and onboarding screen can be opened directly in any order without redirect lockouts.

- [x] **Task 9.3.2: Synchronize `app/showcase/page.tsx` with Exact 47 Figma Screens, Real Node IDs & Valid Routes + Add Link in `DemoPitchToolbar`**
  - **Mode & Ref:** `[Flash-Med]` | `.specs/slicing_tracker.md` (47 Exact Screens)
  - **Target File(s):** `app/showcase/page.tsx`, `components/shared/DemoPitchToolbar.tsx`
  - **Detailed Implementation Specs:**
    - Update `SCREENS_DATA` in `app/showcase/page.tsx` so all **47 items** match 100% of the exact Figma titles, exact Figma Node IDs (`9:2522` through `3:1027`), exact dimensions, and **real working routes** (zero 404 routes like `/auth/mitra/upload-ktp`), plus add a quick section for B2B & B2C Circular Economy flows (`/b2b/dashboard`, `/b2b/waste`, `/b2b/orders`, `/b2b/profile`, `/b2c`, `/b2c/waste`, `/b2c/points`, `/b2c/checkout`, `/b2c/profile`).
    - Add a prominent `"🧭 Buka Navigator 47 Screen (/showcase)"` button inside `DemoPitchToolbar.tsx` so judges/reviewers can jump to `/showcase` from anywhere in 1 click.
  - **Verify (DoD):** `pnpm typecheck`; `audit_links.py` reports **0 broken route references** across the entire codebase; `pnpm lint` and `pnpm build` exit 0.

> 🛑 **[FINAL AUDIT CHECKPOINT 9.3]** — Seluruh 47 Screen Figma + seluruh ekstra layar B2B/B2C/Admin bebas 404, dapat dibuka satu per satu di Mode Review maupun dijalankan sebagai Whole Project, serta `pnpm typecheck`, `pnpm lint`, dan `pnpm build` lulus 100%!
