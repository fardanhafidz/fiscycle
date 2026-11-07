# Fiscycle — Design Token Specification (`design_tokens.md`)

> **Document Status:** CANONICAL & LOCKED (Figma Source: `vf4fdtTzNjzygSqgWpDQAP`)  
> **Target Platform:** Mobile-First Next.js PWA & Tailwind CSS v4  
> **Source Workspace:** `https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?m=dev`  
> **Companion Document:** [.specs/slicing_tracker.md](./slicing_tracker.md)

---

## 1. Color Palette (Exact Hex Codes)

There are **zero gray areas** in the color specification. Every color token is mapped directly from inspected Figma Dev Mode elements.

### 1.1 Brand & Action Colors
| Token Name | Exact HEX | Tailwind v4 Alias | Figma Node Context & Exact Usage |
|---|---|---|---|
| **Action Teal / Dark Cyan** | `#008D91` | `--color-action-teal` / `bg-[#008d91]` | Primary interactive CTA in Onboarding ("Masuk ke Dashboard", step links, preview headlines). |
| **Deep Teal / Ocean** | `#00566B` | `--color-primary-teal` / `bg-[#00566b]` | Auth Primary Action buttons ("Masuk", "Kirim Kode Verifikasi", "Verifikasi" at `9:2595`, `18:83`, `18:120`). |
| **Auth Emerald** | `#0F766E` | `--color-auth-emerald` / `bg-[#0f766e]` | Splash Welcome screen CTAs ("Masuk", "Daftar" at `9:2542`) and tagline highlight. |
| **Vibrant Brand Teal** | `#00B4D8` | `--color-brand-teal` / `bg-[#00b4d8]` | Circular economy accents, active bottom tab pill, point badges. |
| **Deep Brand Navy** | `#1A365D` | `--color-brand-navy` / `bg-[#1a365d]` | High-contrast brand headers, hero summary containers, circular wallet tiles. |
| **Action Sky Blue** | `#2698D7` / `#269DEE` / `#2687AF` | `--color-action-blue` / `text-[#2687af]` | Links ("Lupa kata sandi?", "Daftar sekarang"), info badge icons, active timer. |

### 1.2 Surface & Canvas Backgrounds
| Token Name | Exact HEX | Tailwind v4 Alias | Figma Node Context & Exact Usage |
|---|---|---|---|
| **Outer Viewport Canvas** | `#F3F9FC` | `bg-[#f3f9fc]` | Desktop backdrop outside the mobile container (`max-w-md`). |
| **Pure White Surface** | `#FFFFFF` | `bg-white` | Default surface for mobile screens, cards, modals, and input fields. |
| **Onboarding Gradient** | `linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 68%, #EDF7FB 100%)` | `bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb]` | Background for Onboarding screens (`32:4801`, `32:4847`, `32:5215`). |
| **Selected Role Card Surface** | `#EDFCF8` | `bg-[#edfcf8]` | Selected option card background on `/auth/register/role` (`9:2700`). |
| **Selected Role Card Border** | `#A5E5D8` | `border-[#a5e5d8]` | Selected option card border on `/auth/register/role`. |
| **Info Box Surface (Soft Blue)** | `#E4F4FE` / `#E5F5FD` | `bg-[#e4f4fe]` | Information banner ("Token Mitra diberikan oleh tim...", `18:85`, `13:1613`). |
| **Soft Preview Surface** | `#E5F3FA` | `bg-[#e5f3fa]` | "Preview Dashboard Mitra" wrapper box on `32:5234`. |
| **Input Fill Soft (Form Calon Mitra)** | `#FAFBFC` | `bg-[#fafbfc]` | Input background in Form Pengajuan Calon Mitra (`13:1477`). |
| **Role Icon Soft Blue (B2B)** | `#E6F5FE` | `bg-[#e6f5fe]` | Usaha / Industri icon circle on `9:2683`. |
| **Role Icon Soft Coral (B2C)** | `#FFF0F0` | `bg-[#fff0f0]` | Rumah Tangga icon circle on `9:2692`. |
| **Role Icon Soft Teal (Splash)** | `#CCFBF1` | `bg-[#ccfbf1]` | Benefit icon circle on `9:2550`, `9:2554`, `9:2558`. |

### 1.3 Text & Typography Colors
| Token Name | Exact HEX | Tailwind v4 Alias | Figma Node Context & Exact Usage |
|---|---|---|---|
| **Text Ink Deep** | `#173653` / `#163252` | `text-[#173653]` / `text-[#163252]` | High-contrast main headings (H1, H2, screen titles, large numbers). |
| **Text Body Dark** | `#283D55` / `#35465D` / `#3C536C` | `text-[#283d55]` | Field labels, primary list text, input value, status bar time. |
| **Text Secondary / Muted** | `#6F8191` / `#748397` / `#7D8B9E` | `text-[#6f8191]` / `text-[#748397]` | Subtitles, helper text, inactive options, step descriptions. |
| **Text Muted Slate / Placeholder** | `#8492A2` / `#96A0AF` | `text-[#8492a2]` / `text-[#96a0af]` | Input placeholder ("Masukkan kata sandi", "Contoh: Tambak Jaya"). |
| **Text Inactive / Disabled** | `#B9BEC3` | `text-[#b9bec3]` | Inactive timeline stages on `13:1596`. |

### 1.4 Status & Feedback Colors
| Token Name | Exact HEX | Soft Bg HEX | Border HEX | Context & Exact Usage |
|---|---|---|---|---|
| **Success / Valid / Approved** | `#07B18C` / `#08B784` / `#20B885` / `#14B97C` | `#E1F7F3` / `#E5F8EF` | `#7DD5B6` / `#A7F3D0` | "Token Mitra valid", timeline completed check, KPI Baik. |
| **Warning / Attention** | `#F69B23` | `#FFF3DF` | `#FDE68A` | Pond attention alerts, pending surveys, near harvest. |
| **Danger / Critical** | `#F34860` | `#FDEBEA` | `#FECDD3` | DO kritis (< 4.0 mg/L), validation errors, missing fields. |
| **Info / Scheduled** | `#2698D7` / `#00629B` | `#E4F4FE` / `#E2F3FC` | `#BAE6FD` | Timeline pending, informational banners, device sync. |
| **Timeline Inactive Track** | `#DCE1E3` | - | - | Vertical timeline line (`13:1580`). |
| **Timeline Completed Track** | `#7DD5B6` | - | - | Vertical timeline completed segment (`13:1581`). |

### 1.5 Form & Card Borders
| Token Name | Exact HEX | Usage |
|---|---|---|
| **Screen Frame Border** | `#E7EFF2` / `#E7EFF4` | Outer border of mobile screen squircle container (`9:2522`). |
| **Form Input Border (Standard)** | `#E1E7EC` / `#E3E8EC` | Input fields on Login, Register, Token screen (`9:2586`, `18:73`). |
| **Form Input Border (Onboarding)** | `#D9E4EA` | Input fields on Data Usaha & Kolam screens (`32:4874`). |
| **Form Input Border (Application)** | `#E8EDF1` | Input fields on Form Pengajuan Mitra (`13:1477`). |
| **Checkbox Border** | `#AFBBC8` | Checkbox border 1.3px on Login screen (`9:2592`). |
| **Divider Line** | `#E1E7EC` | "atau masuk dengan" divider line (`9:2599`). |

---

## 2. Typography Specification

### 2.1 Font Families
* **Primary Font:** `Inter` (sans-serif)
* **Status Bar / Secondary Numbers:** `Inter` / `Arimo` (standardized to `Inter` across web).
* **Font Fallback Stack:** `var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### 2.2 Font Weights
* `400` → `font-normal` (`Inter:Regular`)
* `500` → `font-medium` (`Inter:Medium`)
* `600` → `font-semibold` (`Inter:Semi_Bold`)
* `700` → `font-bold` (`Inter:Bold`)

### 2.3 Exact Typographic Scale & Usage Table
| Scale Name | Font Size | Line Height | Weight | Tailwind Class | Exact Figma Usage Examples |
|---|---|---|---|---|---|
| **Hero Display** | `30px` | `1.2` (`36px`) | 400 / 700 | `text-[30px] leading-[1.2]` | Splash Headline (`9:2522`: *"Dari limbah menjadi sumber daya"*). |
| **Screen H1** | `24px` / `23px` / `22px` | `1.18` - `1.35` | 700 | `text-[23px] font-bold leading-[1.2]` | Main Titles (`9:2576`: *"Masuk ke Fiscycle"*, `9:2679`, `18:69`, `32:4815`). |
| **Section H2** | `21px` / `20px` / `19px` | `1.35` | 700 | `text-[20px] font-bold leading-[1.35]` | Sub-headlines (`32:4816`: *"Kemitraan Anda telah disetujui"*, `13:1576`). |
| **Big Number / OTP** | `20px` / `23px` | `normal` | 700 | `text-[20px] font-bold` | 6-Digit OTP Box (`18:106`) & Metric Value (`32:5241`). |
| **CTA / Button Label** | `16px` / `17px` | `normal` | 600 / 700 | `text-[16px] font-bold` | Primary Button text (`9:2546`: *"Daftar"*, `9:2596`: *"Masuk"*, `18:84`). |
| **Card Title / Role Title** | `15px` / `15.5px` | `normal` | 700 | `text-[15px] font-bold` | Role Selection title (`9:2695`, `9:2704`) & Token field label (`18:72`). |
| **Body Primary** | `14px` / `13.5px` | `1.35` - `1.4` | 400 / 500 | `text-[13px] leading-[1.4]` | Body paragraphs, introduction text, input text (`9:2577`, `18:70`, `32:4817`). |
| **Field Label** | `14px` / `12.5px` / `12px` | `normal` | 600 / 700 | `text-[13px] font-semibold` | Form field labels (`9:2580`: *"Email atau Nomor HP"*, `13:1476`, `32:4864`). |
| **Input Placeholder** | `13px` / `11.5px` | `normal` | 400 | `text-[12px] font-normal` | Form input placeholder (`9:2588`, `13:1478`, `13:1485`). |
| **Caption / Helper** | `12px` / `11.5px` / `10.5px` | `1.3` - `1.4` | 400 | `text-[11px] leading-[1.35]` | Helper notes below inputs, role sub-descriptions, timestamps (`9:2547`, `9:2697`). |
| **Status Bar Time** | `11px` / `12px` | `normal` | 700 | `text-[11px] font-bold` | Status bar clock display (`9:2564`, `18:61`). |

---

## 3. Component Geometry & Radius Mapping

| Component Type | Figma Radius Value | Tailwind Class | Exact Figma Reference |
|---|---|---|---|
| **Mobile Screen Container** | `26px` (or `24px`) | `rounded-[26px]` / `rounded-3xl` | Outer frame on all 18 mobile screens (`9:2522`, `9:2562`, `32:4801`). |
| **Primary / Secondary Action Button** | `7px` / `8px` | `rounded-[7px]` / `rounded-[8px]` / `rounded-lg` | Buttons: `h-[48px]` - `h-[60px]`, `px-4`, `font-bold` (`9:2595`, `18:83`, `32:5231`). |
| **Text Form Input Field** | `7px` / `8px` / `4px` | `rounded-[7px]` / `rounded-[8px]` | `h-[42px]` - `h-[48px]`, `px-3`, border 1px solid (`9:2586`, `18:73`, `32:4874`). |
| **OTP Single Digit Box** | `5px` | `rounded-[5px]` | 6 boxes: `w-12 h-16` to `h-[80px]`, border 1.2px solid (`18:105`). |
| **Checkbox** | `3px` | `rounded-[3px]` | `size-[18px]`, border 1.3px solid `#afbbc8` (`9:2592`). |
| **Role Selection Card** | `12px` | `rounded-[12px]` / `rounded-xl` | `min-h-[137px]`, `p-3.5`, border 1px solid (`9:2682`, `9:2700`). |
| **Metric / Bento Box** | `10px` | `rounded-[10px]` | Preview metric cards (`32:5239`, `32:5244`). |
| **Banner / Info Box** | `9px` | `rounded-[9px]` | Blue token informational card (`18:85`, `13:1613`). |
| **Step Number & Icon Bubbles** | `100px` / `32px` | `rounded-full` | Circular badges (`32:4820`: `size-[25px]`, `9:2683`: `size-[55px]`). |
| **Timeline Stage Marker** | `16777200px` (Circle) | `rounded-full` | Active & upcoming timeline stage rings (`13:1583`: `size-[32px]`). |

---

## 4. Shadow & Elevation Rules

| Elevation Level | CSS Shadow Value | Tailwind Class | Exact Figma Usage |
|---|---|---|---|
| **Screen Shadow (Desktop Backdrop)** | `0 25px 50px -12px rgba(0,0,0,0.25)` | `shadow-2xl` | Surrounding the `max-w-md` mobile container against the `#F3F9FC` canvas. |
| **Card Shadow Subtle** | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | `shadow-xs` / `shadow-sm` | Metric cards and form containers. |
| **Floating Action & Nav Shadow** | `0 8px 30px rgba(26, 54, 93, 0.12)` | `shadow-[0_8px_30px_rgb(26,54,93,0.12)]` | Floating bottom navigation bar & floating action bars. |
| **Text Shadow Overlay** | `0px 2px 8px rgba(0, 0, 0, 0.2)` | `text-shadow-[0px_2px_8px_rgba(0,0,0,0.2)]` | Hero headline text over photography on Splash screen (`9:2522`). |

---

## 5. Layout & Container Rules

### 5.1 Mobile Shell Definition
All 18 Auth & Onboarding screens MUST be rendered within the canonical mobile viewport shell:
```tsx
<div className="min-h-screen w-full bg-[#f3f9fc] flex items-center justify-center p-0 md:p-6 antialiased">
  <main className="w-full max-w-[360px] sm:max-w-md min-h-screen sm:min-h-[800px] sm:max-h-[896px] bg-white relative rounded-none sm:rounded-[26px] border-0 sm:border sm:border-[#e7eff2] shadow-none sm:shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col">
    {/* Page Content */}
  </main>
</div>
```

### 5.2 Safe Area & Navigation Heights
* **Status Bar Height:** `36px` - `42px` (Fixed / flow top bar, simulated or native).
* **Navigation Header Height:** `48px` - `66px` (`px-5`, with `arrow-left` / `chevron-left` and centered brand logo).
* **Screen Horizontal Padding:** `20px` - `24px` (`px-5` / `px-6`).
* **Vertical Gap Between Form Fields:** `16px` - `24px` (`space-y-4` / `space-y-6`).
* **Bottom Action Safe Margin:** `pb-8` to ensure buttons are never cut off by viewport edges.

