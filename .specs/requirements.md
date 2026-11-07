# Fiscycle — Requirements Specification (Phase 1 — Audited & Locked)

> **Status:** APPROVED — Strict Architecture & UX Audit Complete
> **Source of Truth:** Figma (`vf4fdtTzNjzygSqgWpDQAP`) + Fiscycle Master Architecture Specification
> **Companion Documents:** [design.md](./design.md) · [tasks.md](./tasks.md)

---

## 1. Project Overview & Core Value Proposition

**Fiscycle — Intelligent Circular Aquaculture Ecosystem.**
Fiscycle is a mobile-first Next.js Progressive Web Application (PWA) with a dedicated desktop Admin Control Tower that connects four distinct actors in a closed-loop circular aquaculture economy:

1. **Material Circular Loop (Waste-to-Feed-to-Fish):**
   B2B (Restaurants/Hotels/Food Industry) and B2C (Households) submit segregated organic waste → Admin verifies actual weight & quality → Contributors earn **Circular Points** (`1 kg = 10 Poin = Rp 1.000`) in `useWastePointStore` → Mitra Tambak converts verified organic waste (`IN-XXXX`) into Black Soldier Fly (BSF) maggot protein (`BSF-XX`) to reduce fish feed costs → B2B and B2C redeem Circular Points for direct discounts when procuring fresh farm-raised fish.
2. **Data & Production-to-Market Loop (IoT-to-AI-to-Buyer):**
   IoT water sensors stream pond telemetry (`pH`, `DO`, `temperatureC`, `turbidityNtu`) → AI evaluates safe thresholds, triggers actionable pond treatments, and predicts harvest biomass → Admin Supply-Demand Orchestrator matches B2B bulk procurement orders to ready Mitra ponds.

**Official Tagline:**
*"Dari limbah menjadi sumber daya — Platform terintegrasi untuk ekosistem perikanan yang lebih berkelanjutan."*

---

## 2. Anti-AI-Slop & Strict UI/UX Mandates

### 2.1 Strictly Prohibited Hallucinations ("Zero AI Slop" Rule)
The implementation MUST NOT contain any of the following unrequested or hallucinated elements:
- **NO** fake CCTV / live video camera feeds or video player placeholders.
- **NO** circular biofilter gauges, radial progress meters, or speedometer dials.
- **NO** random UUIDs (`crypto.randomUUID()`) or hash strings in the UI (all IDs must be sequential human-readable strings: `IN-0045`, `BSF-04`, `ORD-0241`, `FSC-FARM-0028`, `POND-02`).
- **NO** device chrome (do NOT render iOS/Android status bars, `9:41` clock headers, signal/battery icons, or bottom home-indicator pills).
- **NO** Lorem Ipsum or English placeholder text in user-facing UI (100% Bahasa Indonesia copy).

### 2.2 Mandatory Visual & Design Token Rules
All interfaces MUST enforce the exact Fiscycle Design Token Specification defined in `design.md`:
- **Primary Brand Colors:** Deep Navy `#1A365D` (primary headings, high-contrast brand surfaces, active shell accents) and Vibrant Teal `#00B4D8` (circular economy highlights, interactive accents, point badges, active indicators), paired with Figma workspace tokens (`#173251` ink, `#00629B` action blue, `#0F766E` auth teal).
- **Semantic Status Colors:**
  - `Baik` / `Normal` / `Diterima`: Foreground `#14B97C`, Background `#E5F8EF`
  - `Perhatian` / `Mendekati Panen`: Foreground `#F69B23`, Background `#FFF3DF`
  - `Kritis` / `Menunggu Verifikasi`: Foreground `#F34860`, Background `#FDEBEA`
- **Card & Surface Geometry:** Hero summary cards, bento containers, and modal sheets use `rounded-3xl` (`24px`) squircles; nested inner record items use `rounded-2xl` (`16px`) / `rounded-xl` (`12px`).
- **Glassmorphism & Elevation:** Sticky headers, floating action bars, and overlay cards MUST use `bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm`.
- **Floating Bottom Navigation Bar:** Mobile workspaces (`Mitra`, `B2B`, `B2C`) MUST render a **floating bottom navbar** (`fixed bottom-4 inset-x-4 max-w-[calc(28rem-2rem)] mx-auto rounded-3xl bg-white/80 backdrop-blur-xl border border-[#E7EFF4] shadow-lg h-16 px-4 z-50`).
- **Mitra Dashboard 2×2 KPI Grid:** The Mitra Dashboard (`Beranda`) MUST render the Pond Status Summary as a **2×2 Bento KPI Grid** (`Total Kolam`, `Kondisi Baik`, `Perlu Perhatian`, `Kondisi Kritis`).

---

## 3. Strict Auth Flow (`1 User = 1 Role`) & Role-to-Route Mapping

### 3.1 Authentication & Registration Invariants
1. **Strict `1 User = 1 Role` Binding:** Every user account in `useAuthStore` is permanently bound to **exactly one** `Role` (`'mitra' | 'b2b' | 'b2c' | 'admin'`).
2. **Role Selector ONLY During Registration:**
   - The Role Selector screen (`/auth/register/role` — Figma `9:2664` *Pilih jenis pengguna*) **MUST ONLY** be reachable as Step 2 of the **Registration** flow (`/auth/register` → `/auth/register/role`).
   - Once selected during registration, the role is persisted onto the newly created `User` record.
3. **Direct Workspace Routing on Login (NO Role Selector After Login):**
   - When an existing user logs in at `/auth/login`, the system reads `user.role` from `useAuthStore` and redirects **immediately** to that role's default home route:
     - `mitra` → `/mitra/dashboard`
     - `b2b` → `/b2b/dashboard`
     - `b2c` → `/b2c/marketplace`
     - `admin` → `/admin/leads`
   - `/auth/login` **MUST NEVER** redirect to `/auth/register/role`.

### 3.2 Complete Role-to-Route Access Matrix

Every route in the application is explicitly scoped below. Attempting to access a route outside the authenticated user's `role` triggers `RoleGuard` to redirect the user to their own role's default route (or `/auth/login` if unauthenticated).

| Route Path | Allowed Role | Screen Name / Purpose | Layout Shell |
|---|---|---|---|
| `/` | `Public` | Landing Page (`Halaman Awal`) — Hero, Tagline, Masuk & Daftar CTAs | `PublicMobileShell` |
| `/auth/login` | `Public` | Login (`Masuk ke Fiscycle`) — Direct login to bound role workspace | `AuthMobileShell` |
| `/auth/register` | `Public` | Registration Step 1 (`Buat Akun Fiscycle`) — Name, Org, Email, Password, Terms | `AuthMobileShell` |
| `/auth/register/role` | `Public` (Reg Flow Only) | Registration Step 2 (`Pilih Jenis Pengguna`) — Binds 1 Role to New User | `AuthMobileShell` |
| `/auth/mitra` | `mitra` (Unverified) | Mitra Onboarding Gate — Choose "Sudah Punya Token" vs "Ajukan Kemitraan" | `AuthMobileShell` |
| `/auth/mitra/apply` | `mitra` (Unverified) | Form Pengajuan Calon Mitra Tambak | `AuthMobileShell` |
| `/auth/mitra/apply/success` | `mitra` (Unverified) | Pengajuan Berhasil Dikirim | `AuthMobileShell` |
| `/auth/mitra/apply/status` | `mitra` (Unverified) | Status Pengajuan Kemitraan Timeline | `AuthMobileShell` |
| `/auth/mitra/token` | `mitra` (Unverified) | Input Partner Token (`^FSC-FARM-\d{4}$`) | `AuthMobileShell` |
| `/auth/mitra/verify` | `mitra` (Unverified) | 6-Digit OTP Verification (`123456`) | `AuthMobileShell` |
| `/mitra/onboarding` | `mitra` | Post-Token Onboarding Welcome (`Selamat Datang Mitra Disetujui`) | `OnboardingShell` |
| `/mitra/onboarding/business` | `mitra` | Step 1: Data Usaha / Tambak | `OnboardingShell` |
| `/mitra/onboarding/ponds` | `mitra` | Step 2: Data Kolam Initial Setup | `OnboardingShell` |
| `/mitra/onboarding/installation` | `mitra` | Step 3: Jadwal Instalasi Perangkat IoT | `OnboardingShell` |
| `/mitra/onboarding/status` | `mitra` | Step 4: Status Instalasi & Teknisi | `OnboardingShell` |
| `/mitra/onboarding/activate` | `mitra` | Step 5: Aktivasi Akun & Siap Digunakan | `OnboardingShell` |
| `/mitra/dashboard` | `mitra` | **Mitra Beranda** — 2×2 KPI Grid, Alert Kolam Kritis, Kondisi Kolam, Tugas | `MitraMobileShell` |
| `/mitra/ponds` | `mitra` | **Daftar Kolam & Ikan** — Filterable Pond Record Cards & Siklus | `MitraMobileShell` |
| `/mitra/ponds/[pondId]` | `mitra` | **Detail Kolam** — Telemetry Grid, AI Saran Penanganan, Pakan & Biomassa | `MitraMobileShell` |
| `/mitra/bsf` | `mitra` | **BSF & Sirkular** — Active BSF Batches, Verified Waste Inputs (`IN-XXXX`), Feed Allocation | `MitraMobileShell` |
| `/mitra/market` | `mitra` | **Pasar & Panen** — Buyer Demand, AI Harvest Readiness, Supply Allocation Offers, Active Orders | `MitraMobileShell` |
| `/mitra/devices` | `mitra` | **Perangkat IoT** — Sensor Status, Battery & Calibration Alerts (via Drawer) | `MitraMobileShell` |
| `/mitra/reports` | `mitra` | **Laporan & Insight** — Production, BSF & Sales Analytics (via Drawer) | `MitraMobileShell` |
| `/b2b/dashboard` | `b2b` | **B2B Beranda** — Circular Points Wallet Card, Active Deliveries & Waste Pickups | `B2BMobileShell` |
| `/b2b/procurement` | `b2b` | **B2B Pesan Ikan (Bulk Procurement)** — Species, Size, Volume (`>= 50 kg`), Frequency | `B2BMobileShell` |
| `/b2b/procurement/checkout` | `b2b` | **B2B Checkout** — Price Breakdown & "Tukar Circular Points" Discount Toggle | `B2BMobileShell` |
| `/b2b/waste` | `b2b` | **B2B Setor Sampah** — Organic Waste Pickup Scheduler & Contribution List | `B2BMobileShell` |
| `/b2b/waste/[contributionId]` | `b2b` | **B2B Waste Traceability** — Step-by-step Circular Loop Timeline (`IN-XXXX` → `BSF-XX` → `POND-XX`) | `B2BMobileShell` |
| `/b2b/orders` | `b2b` | **B2B Daftar Pesanan** — Bulk Order Tracking & Fulfillment Progress | `B2BMobileShell` |
| `/b2c/marketplace` | `b2c` | **B2C Pasar Segar** — Retail Fresh Fish Catalog from Nearby Mitra Farms | `B2CMobileShell` |
| `/b2c/checkout` | `b2c` | **B2C Keranjang & Checkout** — Fulfilment ("Antar + Jemput Sampah" / "Ambil di Depot") & Point Redemption | `B2CMobileShell` |
| `/b2c/wallet` | `b2c` | **B2C Dompet Sirkular** — Point Balance, Member QR Code (`FISCYCLE:WAL-XXXX`), History | `B2CMobileShell` |
| `/b2c/orders` | `b2c` | **B2C Pesanan Saya** — Retail Order & Household Waste Pickup Status | `B2CMobileShell` |
| `/admin/leads` | `admin` | **Admin CRM Pipeline** — 11-Stage Mitra Lead Table, Detail Panel & Sequential Token Generator | `AdminDesktopShell` |
| `/admin/orchestrator` | `admin` | **Admin Supply-Demand Orchestrator** — Match B2B Orders to Mitra Ponds via AI Readiness | `AdminDesktopShell` |
| `/admin/waste` | `admin` | **Admin Circular Waste Verification** — Weigh Waste, Assign Grade & BSF Batch, Issue Points | `AdminDesktopShell` |

---

## 4. The Golden Thread (End-to-End Closed-Loop Workflow)

The **Golden Thread** is the mandatory, deterministic 6-stage interactive flow connecting all workspaces through Zustand persisted state (`fiscycle-storage-v1`). Every step below MUST work seamlessly without page-reload state loss:

### Step 1 — B2B Submits Organic Waste (`B2B` → `useWastePointStore`)
1. User logs in at `/auth/login` as **ABC Restaurant** (`role: 'b2b'`, starting balance: `2.580 Poin` = `Rp 258.000`).
2. User is routed directly to `/b2b/dashboard` and navigates to `/b2b/waste` (*Setor Sampah*).
3. User submits an organic waste pickup form:
   - Category: `'sisa_dapur'` (*Sisa Dapur & Restoran*)
   - Estimated Weight: `42 kg`
   - Pickup Date & Slot: `2026-11-05`, `'08:00 - 10:00'`
4. `useWastePointStore.submitWaste()` creates contribution `IN-0045` with `status: 'Menunggu Verifikasi'` and estimated reward `+420 Poin`.

### Step 2 — Admin Verifies Waste & Issues Circular Points (`Admin` → `useWastePointStore`)
1. Presenter switches/logs in as **Admin Fiscycle** (`role: 'admin'`) and opens `/admin/waste` (*Verifikasi Sampah Sirkular*).
2. Admin selects pending contribution `IN-0045` (ABC Restaurant, est. `42 kg`).
3. Admin inputs verified weight `42 kg`, selects quality grade `'A'`, assigns target maggot batch `'BSF-04'` (Tambak Makmur), and clicks **Setujui & Terbitkan Poin**.
4. `useWastePointStore.verifyWaste('IN-0045', 42, 'A', 'BSF-04')` executes atomically:
   - Updates `IN-0045` to `status: 'Diterima'`, `actualKg: 42`, `pointsAwarded: 420`, `bsfBatchId: 'BSF-04'`.
   - Credits `+420 Poin` (`42 kg × 10 Poin/kg`) to ABC Restaurant's wallet (`WAL-0007`), updating `balance` from `2.580` to **`3.000 Poin`** (`Rp 300.000` value) and appending transaction `PTX-0105`.
   - Increments `BSF-04.inputKg` in `useMitraStore` by `42 kg` and appends `'IN-0045'` to `BSF-04.sourceContributionIds`.

### Step 3 — Mitra Processes BSF Feed & Resolves Critical Pond Alert (`Mitra` → `useMitraStore`)
1. Presenter logs in as **Budi — Tambak Makmur** (`role: 'mitra'`) and lands directly on `/mitra/dashboard`.
2. On `/mitra/dashboard`, the **2×2 KPI Grid** shows `Total Kolam: 6`, `Baik: 4`, `Perhatian: 1`, `Kritis: 1`.
3. The **Perlu Ditangani Sekarang** alert card highlights **Kolam 2 — DO 3,2 mg/L (Kritis)**. Budi clicks **Tandai Ditangani** (`useMitraStore.resolvePondAlert('POND-02')`), updating Kolam 2 status to `'Baik'` (DO restored to `5,6 mg/L`) and recomputing the 2×2 KPI Grid (`Baik: 5`, `Kritis: 0`).
4. Budi navigates via the floating bottom navbar to `/mitra/bsf` (*BSF & Sirkular*):
   - Sees verified contribution `IN-0045` (`42 kg` from ABC Restaurant, badge `Diterima`) linked to batch `BSF-04`.
   - Clicks **Alokasikan Panen BSF ke Pakan Kolam** (`useMitraStore.allocateBsfToPond('BSF-04', 'POND-04', 25)`), recording maggot feed allocation to **Kolam 4 (Ikan Nila Siap Panen)**.

### Step 4 — B2B Buys Fish Using Circular Points (`B2B` → `useB2BCartStore` & `useWastePointStore`)
1. Presenter logs in as **ABC Restaurant** (`role: 'b2b'`) and opens `/b2b/dashboard` — wallet card now displays **`3.000 Poin (Setara Rp 300.000)`**.
2. User navigates to `/b2b/procurement` (*Pesan Ikan*):
   - Selects Commodity: `'Nila'` (*Ikan Nila Segar*)
   - Size Grade: `'300-400g/ekor'`
   - Quantity: `500 kg` (`Rp 32.000 / kg`)
   - Frequency: `'Sekali'`
   - Proceeds to `/b2b/procurement/checkout`.
3. On Checkout:
   - Subtotal displays `Rp 16.000.000`, Shipping displays `Rp 250.000`.
   - User toggles ON **"Tukar 3.000 Circular Points (-Rp 300.000)"** via `useB2BCartStore.setRedeemPoints(true)`.
   - Discount `-Rp 300.000` is applied; Final Total updates to **`Rp 15.950.000`**.
4. User clicks **Konfirmasi Pesanan**:
   - `useB2BCartStore.submitOrder()` creates order `ORD-0241` with `status: 'Menunggu Alokasi'`, `pointsRedeemed: 3000`, `discountIdr: 300000`.
   - `useWastePointStore.deductPoints('WAL-0007', 3000, 'ORD-0241')` reduces ABC Restaurant's wallet balance from `3.000` to **`0 Poin`**.

### Step 5 — Admin Orchestrates Supply-Demand Allocation (`Admin` → `useAdminStore` & `useMitraStore`)
1. Presenter logs in as **Admin Fiscycle** and opens `/admin/orchestrator` (*Orkestrasi Supply-Demand*).
2. Selects order `ORD-0241` (`500 kg` Nila for ABC Restaurant).
3. AI Candidate Pond Matcher highlights **Kolam 4 — Tambak Makmur** (`Est. Biomassa 520 kg`, `Ukuran 340g`, `Siap Panen 15–18 Nov 2026`, `Skor Kecocokan 96%`).
4. Admin allocates `500 kg` to `POND-04` and clicks **Setujui Alokasi Supply** (`useAdminStore.approveSupplyAllocation('ORD-0241', [{ pondId: 'POND-04', farmId: 'FARM-0028', allocatedKg: 500 }])`).
5. `ORD-0241` status updates to `'Dialokasikan'` and creates offer `ALC-0031` (`status: 'Ditawarkan'`) for Budi.

### Step 6 — Mitra Accepts Allocation Offer (`Mitra` → `useMitraStore`)
1. Presenter logs in as **Budi — Tambak Makmur** and opens `/mitra/market` (*Pasar & Panen*).
2. Under **Tawaran Alokasi Panen Baru**, Budi sees `ALC-0031` (`ORD-0241` — ABC Restaurant, `500 kg` Nila from Kolam 4) and clicks **Terima Pesanan**.
3. `useMitraStore.respondToAllocation('ALC-0031', true)` updates `ALC-0031` to `'Diterima'` and transitions `ORD-0241` to `'Menunggu Panen'`, completing the circular loop.

---

## 5. Functional Requirements (EARS Syntax)

### 5.1 Module AUTH — Authentication, Registration & Onboarding
- **AUTH-01:** WHEN an unauthenticated user visits `/`, THE SYSTEM SHALL render the hero banner, tagline, primary **Masuk** CTA, secondary **Daftar** CTA, and 3 value-proposition cards.
- **AUTH-02:** WHEN the user submits valid credentials on `/auth/login` or clicks a Demo Quick-Login chip (`Mitra`, `B2B`, `B2C`, `Admin`), THE SYSTEM SHALL authenticate the user in `useAuthStore` and redirect **directly** to the bound role's workspace home (`/mitra/dashboard`, `/b2b/dashboard`, `/b2c/marketplace`, or `/admin/leads`) without showing any role selector.
- **AUTH-03:** WHEN a new user completes account details on `/auth/register` (with the terms checkbox checked), THE SYSTEM SHALL advance to `/auth/register/role` (*Pilih Jenis Pengguna*).
- **AUTH-04:** WHEN the user selects one of the 4 role cards on `/auth/register/role` and confirms, THE SYSTEM SHALL permanently bind that `role` to the user in `useAuthStore` (`1 User = 1 Role`) and route to the respective onboarding/home route.
- **AUTH-05:** WHEN a new `mitra` user reaches `/auth/mitra`, THE SYSTEM SHALL offer two paths: **Masukkan Token Mitra** (`/auth/mitra/token`) or **Ajukan Kemitraan Baru** (`/auth/mitra/apply`).
- **AUTH-06:** WHEN a user submits `/auth/mitra/apply`, THE SYSTEM SHALL append a new `Lead` with `stage: 'lead_baru'` to `useAdminStore` and route to `/auth/mitra/apply/success`.
- **AUTH-07:** WHEN a user enters a partner token matching `^FSC-FARM-\d{4}$` on `/auth/mitra/token` and verifies OTP `123456` on `/auth/mitra/verify`, THE SYSTEM SHALL unlock `/mitra/onboarding`.

### 5.2 Module MIT — Mitra Tambak Workspace
- **MIT-01:** WHEN a Mitra user opens `/mitra/dashboard`, THE SYSTEM SHALL render the greeting header, active farm badge, and a **2×2 KPI Grid** (`Total Kolam`, `Kondisi Baik`, `Perlu Perhatian`, `Kondisi Kritis`) dynamically computed from `useMitraStore.ponds`.
- **MIT-02:** WHILE any pond has `status === 'Kritis'`, THE SYSTEM SHALL display the **Perlu Ditangani Sekarang** alert card on `/mitra/dashboard` with **Lihat Arahan** (links to `/mitra/ponds/[pondId]`) and **Tandai Ditangani** (resolves the critical telemetry alert).
- **MIT-03:** WHEN the user views `/mitra/dashboard`, THE SYSTEM SHALL render the horizontal pond status strip (*Kondisi Semua Kolam*), interactive daily checklist (*Tugas Hari Ini*), and AI water quality summary.
- **MIT-04:** WHEN the user opens `/mitra/ponds`, THE SYSTEM SHALL list all farm ponds filterable by status (`Semua`, `Baik`, `Perhatian`, `Kritis`) and searchable by pond name.
- **MIT-05:** WHEN the user opens `/mitra/ponds/[pondId]`, THE SYSTEM SHALL render the 4-metric Water Telemetry Grid (`pH`, `Suhu`, `DO`, `Kekeruhan`), the AI **Saran Penanganan** insight card, 7-day Recharts water quality trend line, feed realization bar, and AI biomass/harvest estimation card.
- **MIT-06:** WHEN the user opens `/mitra/bsf`, THE SYSTEM SHALL display active BSF maggot batches (`BSF-01`..`BSF-04`), the 3-step linear Circular Flow summary (`Sampah Organik Masuk → Biomassa Maggot BSF → Pakan Ikan`), the list of verified organic waste inputs (`IN-XXXX`), and an action to allocate harvested BSF maggots to pond feed rations.
- **MIT-07:** WHEN the user opens `/mitra/market`, THE SYSTEM SHALL display active buyer demand cards, AI pond harvest readiness groupings (`Siap Panen`, `Mendekati Panen`), incoming Admin supply allocation offers with **Terima** / **Tolak** buttons, and active order fulfillment timelines.

### 5.3 Module B2B — Usaha / Industri Workspace
- **B2B-01:** WHEN a B2B user opens `/b2b/dashboard`, THE SYSTEM SHALL display the company header, the **Circular Points Wallet Card** (current points, Rupiah equivalent, lifetime waste contributed in kg), upcoming fish delivery cards, and scheduled waste pickup cards.
- **B2B-02:** WHEN a B2B user fills out `/b2b/procurement`, THE SYSTEM SHALL validate that order quantity is `>= 50 kg`, allow unit toggling (`kg` / `ton`), and save the draft to `useB2BCartStore`.
- **B2B-03:** WHEN a B2B user is on `/b2b/procurement/checkout`, THE SYSTEM SHALL provide a **Tukar Circular Points** switch that calculates a live discount `min(wallet.balance * 100, subtotal * 0.20)` and deducts redeemed points upon order confirmation.
- **B2B-04:** WHEN a B2B user submits the organic waste form on `/b2b/waste`, THE SYSTEM SHALL create a new `WasteContribution` (`IN-XXXX`) with `status: 'Menunggu Verifikasi'` in `useWastePointStore`.
- **B2B-05:** WHEN a B2B user opens `/b2b/waste/[contributionId]`, THE SYSTEM SHALL render a 5-step Circular Traceability Timeline (`Dijadwalkan → Dijemput → Diverifikasi Admin → Diproses di Batch BSF → Menjadi Pakan Kolam`).

### 5.4 Module B2C — Rumah Tangga Workspace
- **B2C-01:** WHEN a B2C user opens `/b2c/marketplace`, THE SYSTEM SHALL display retail fresh fish products (`1 kg`–`10 kg` packs) with farm origin, harvest freshness badge, and price per kg.
- **B2C-02:** WHEN a B2C user checks out on `/b2c/checkout`, THE SYSTEM SHALL allow selecting **"Antar Pesanan + Jemput Sampah Dapur"** (which automatically logs a linked household `WasteContribution`) and redeeming Circular Points.
- **B2C-03:** WHEN a B2C user opens `/b2c/wallet`, THE SYSTEM SHALL display their point balance, a scannable member QR code (`FISCYCLE:WAL-XXXX`), and point transaction history.

### 5.5 Module ADM — Admin Internal Fiscycle (Desktop)
- **ADM-01:** WHEN an Admin opens `/admin/leads`, THE SYSTEM SHALL render the 11-stage CRM Pipeline Stepper, stage count KPI cards, filterable lead table, right-hand **Detail Calon Mitra** drawer/panel, and sequential partner token generator (`FSC-FARM-XXXX`) when advancing a lead to `kontrak` or `onboarding`.
- **ADM-02:** WHEN an Admin opens `/admin/orchestrator`, THE SYSTEM SHALL list all orders with `status === 'Menunggu Alokasi'` alongside AI-ranked candidate Mitra ponds, validating that total allocated weight matches requested weight (`±5%`) before enabling approval.
- **ADM-03:** WHEN an Admin opens `/admin/waste`, THE SYSTEM SHALL list all `Menunggu Verifikasi` waste contributions and allow inputting actual weight (kg), quality grade (`A`/`B`/`C`), and target `BsfBatch` ID to approve and automatically mint `actualKg * 10` Circular Points.
