'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChevronLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Waves,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

const CHECKLIST_ITEMS = [
  'Data usaha / tambak lengkap',
  'Data kolam terdaftar (3 kolam)',
  'Perangkat IoT terpasang & terhubung',
  'Kalibrasi sensor selesai',
  'Akun siap diaktifkan',
];

function AktivasiAkunFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const completeMitraOnboarding = useAuthStore(
    (state) => state.completeMitraOnboarding
  );

  const [isActivated, setIsActivated] = useState(
    () => searchParams.get('ready') === 'true'
  );
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    completeMitraOnboarding();
    setIsActivated(true);
    toast.success('Selamat! Akun Mitra berhasil diaktifkan.');
  };

  const handleGoToDashboard = () => {
    router.push('/mitra/dashboard');
  };

  // Screen 18: Siap Digunakan (Final Success with Mini Dashboard)
  if (isActivated) {
    return (
      <div
        className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
        data-node-id="32:5215"
        data-name="Siap Digunakan"
      >
        <div>
          {/* Navigation Bar */}
          <div
            className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
            data-node-id="32:5222"
            data-name="Navigation"
          >
            <button
              type="button"
              onClick={() => setIsActivated(false)}
              className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
              data-node-id="32:5516"
              data-name="chevron-left"
            >
              <ChevronLeft className="size-[20px]" />
            </button>

            <div
              className="flex items-center justify-center"
              data-node-id="79:28"
              data-name="Brand"
            >
              <div className="relative w-[87px] h-[36px]">
                <Image
                  src="/images/logo-header.png"
                  alt="Fiscycle"
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            <div className="relative size-[17px] opacity-75">
              <Image
                src="/images/icon-hourglass.svg"
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="flex flex-col gap-[20px] items-center pt-[20px] px-[20px] w-full font-sans"
            data-node-id="32:5226"
            data-name="Account ready"
          >
            {/* Activation Success Big Badge */}
            <div
              className="bg-[#07b18c] flex items-center justify-center rounded-full size-[84px] shadow-sm my-1"
              data-node-id="79:40"
              data-name="Completed"
            >
              <div className="relative size-[46px]" data-node-id="79:41">
                <Image
                  src="/images/icon-check-white.svg"
                  alt=""
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            {/* Header Text */}
            <div className="flex flex-col gap-[4px] items-center text-center w-full">
              <h1 className="font-bold text-[#173653] text-[24px] leading-tight">
                Akun Anda Siap!
              </h1>
              <p className="font-normal text-[#6f8191] text-[13.5px] leading-normal max-w-[290px]">
                Selamat, akun kemitraan Anda telah aktif. Anda sekarang dapat
                memantau telemetri tambak secara realtime.
              </p>
            </div>

            {/* Mini Dashboard Telemetry Preview */}
            <div className="bg-white border border-[#d9e4ea] rounded-[12px] p-[16px] flex flex-col gap-[14px] w-full shadow-2xs mt-1">
              <div className="flex items-center justify-between border-b border-[#f0f4f7] pb-2">
                <div className="flex items-center gap-2">
                  <Waves className="size-[18px] text-[#008d91]" />
                  <span className="font-bold text-[#173653] text-[13.5px]">
                    Tambak Makmur Jaya - Kolam 1
                  </span>
                </div>
                <span className="bg-[#edfcf8] text-[#008d91] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#a5e5d8]">
                  Online
                </span>
              </div>

              {/* 3 Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-[#f8fbfd] rounded-[8px] p-2 border border-[#e5eff5]">
                  <span className="text-[10.5px] text-[#6f8191]">DO Air</span>
                  <div className="text-[15px] font-black text-[#173653]">
                    6.8 <span className="text-[10px] font-normal">mg/L</span>
                  </div>
                  <span className="text-[9.5px] text-[#07b18c] font-semibold">
                    Optimal
                  </span>
                </div>

                <div className="bg-[#f8fbfd] rounded-[8px] p-2 border border-[#e5eff5]">
                  <span className="text-[10.5px] text-[#6f8191]">Suhu</span>
                  <div className="text-[15px] font-black text-[#173653]">
                    28.5 <span className="text-[10px] font-normal">°C</span>
                  </div>
                  <span className="text-[9.5px] text-[#07b18c] font-semibold">
                    Normal
                  </span>
                </div>

                <div className="bg-[#f8fbfd] rounded-[8px] p-2 border border-[#e5eff5]">
                  <span className="text-[10.5px] text-[#6f8191]">pH Air</span>
                  <div className="text-[15px] font-black text-[#173653]">
                    7.8
                  </div>
                  <span className="text-[9.5px] text-[#07b18c] font-semibold">
                    Ideal
                  </span>
                </div>
              </div>
            </div>

            {/* Ready features list */}
            <div className="flex flex-col gap-[8px] w-full text-[12px] text-[#6f8191] bg-[#eff7fa] rounded-[9px] p-[14px]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-[15px] text-[#07b18c] shrink-0" />
                <span>Monitoring sensor realtime per 15 menit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-[15px] text-[#07b18c] shrink-0" />
                <span>Rekomendasi pakan BSF dan prediksi panen cerdas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-[15px] text-[#07b18c] shrink-0" />
                <span>Akses jaringan pasar dan off-taker industri</span>
              </div>
            </div>

            {/* Launch Dashboard Button */}
            <button
              type="button"
              onClick={handleGoToDashboard}
              className="bg-[#008d91] flex gap-[10px] h-[48px] items-center justify-center rounded-[7px] w-full text-white font-semibold text-[14.5px] hover:bg-[#007b7f] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-2"
            >
              <span>Masuk ke Dashboard Utama</span>
              <ArrowRight className="size-[17px]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 17: Aktivasi Akun (Checklist & Password Confirmation)
  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
      data-node-id="32:5153"
      data-name="Aktivasi Akun"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="32:5160"
          data-name="Navigation"
        >
          <Link
            href="/mitra/onboarding/status"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="32:5477"
            data-name="chevron-left"
          >
            <ChevronLeft className="size-[20px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="79:26"
            data-name="Brand"
          >
            <div className="relative w-[87px] h-[36px]">
              <Image
                src="/images/logo-header.png"
                alt="Fiscycle"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          <div className="relative size-[17px] opacity-75" data-node-id="32:5480">
            <Image
              src="/images/icon-hourglass.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        {/* Content Section */}
        <div
          className="flex flex-col gap-[20px] items-start pt-[14px] px-[20px] w-full font-sans"
          data-node-id="32:5164"
          data-name="Activate account"
        >
          {/* Header Title */}
          <div
            className="flex flex-col gap-[4px] items-start w-full"
            data-node-id="32:5165"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[#173653] text-[21px] leading-tight"
              data-node-id="32:5166"
            >
              Aktivasi Akun
            </h1>
            <p
              className="font-normal text-[#6f8191] text-[13px] leading-normal"
              data-node-id="32:5167"
            >
              Semua tahapan telah selesai. Sekarang aktifkan akun Anda untuk
              mulai menggunakan Fiscycle.
            </p>
          </div>

          {/* Completed Requirements Checklist Box */}
          <div
            className="bg-[#e7f7f2] flex flex-col gap-[14px] items-start p-[18px] rounded-[10px] w-full"
            data-node-id="32:5168"
            data-name="Completed requirements"
          >
            <p className="font-bold text-[#173653] text-[13.5px]">
              Kesiapan Aktivasi:
            </p>

            {CHECKLIST_ITEMS.map((item, idx) => (
              <div key={idx} className="flex gap-[10px] items-center w-full">
                <div className="bg-[#07b18c] flex items-center justify-center rounded-full size-[20px] shrink-0">
                  <Check className="size-[13px] text-white stroke-[3]" />
                </div>
                <p className="font-medium text-[#173653] text-[12.5px] leading-tight flex-1">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleActivate}
            className="flex flex-col gap-[16px] items-start w-full"
          >
            {/* Field: Konfirmasi Kata Sandi Akun */}
            <div className="flex flex-col gap-[5px] items-start w-full">
              <label
                htmlFor="accPassword"
                className="font-semibold text-[#173653] text-[12px]"
              >
                Kata sandi akun Anda
              </label>
              <div className="bg-white border border-[#d9e4ea] flex items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all">
                <input
                  id="accPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#6f8191] hover:text-[#173653] p-1"
                >
                  {showPassword ? (
                    <EyeOff className="size-[16px]" />
                  ) : (
                    <Eye className="size-[16px]" />
                  )}
                </button>
              </div>
              <span className="text-[11px] text-[#6f8191]">
                Digunakan untuk masuk ke portal mitra Fiscycle selanjutnya.
              </span>
            </div>

            {/* Activate Button */}
            <button
              type="submit"
              className="bg-[#008d91] flex gap-[10px] h-[46px] items-center justify-center rounded-[7px] w-full text-white font-semibold text-[14px] hover:bg-[#007b7f] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-3"
            >
              <span>Aktifkan Akun Sekarang</span>
              <ArrowRight className="size-[17px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AktivasiAkunFlowPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AktivasiAkunFlowContent />
    </Suspense>
  );
}
