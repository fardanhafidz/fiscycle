'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ArrowRight } from 'lucide-react';

const ONBOARDING_STEPS = [
  'Data Usaha / Tambak',
  'Data Kolam',
  'Jadwal Instalasi',
  'Instalasi & Pengujian',
  'Aktivasi Akun',
  'Dashboard Siap Digunakan',
];

export default function SelamatDatangMitraDisetujui() {
  const router = useRouter();

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
      data-node-id="32:4801"
      data-name="Selamat Datang, Mitra Disetujui"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="32:4808"
          data-name="Navigation"
        >
          <Link
            href="/auth/mitra/verify"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="32:5279"
            data-name="chevron-left"
          >
            <ChevronLeft className="size-[20px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="79:5"
            data-name="Brand"
          >
            <div className="relative w-[87px] h-[36px]" data-node-id="79:6">
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

          <div className="relative size-[17px] opacity-75" data-node-id="32:5282">
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
          className="flex flex-col gap-[16px] items-center pt-[15px] px-[24px] w-full"
          data-node-id="32:4812"
          data-name="Welcome"
        >
          {/* Welcome Illustration */}
          <div className="relative size-[120px] flex items-center justify-center my-1" data-node-id="79:71">
            <div className="relative size-[100px] opacity-90">
              <Image
                src="/images/icon-carbon-report.svg"
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-[#07b18c] flex items-center justify-center rounded-full size-[46px] shadow-sm"
              data-node-id="79:55"
              data-name="Completed"
            >
              <div className="relative size-[26px]" data-node-id="79:56">
                <Image
                  src="/images/icon-check-white.svg"
                  alt=""
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div
            className="flex flex-col gap-[4px] items-center text-center w-full font-sans"
            data-node-id="32:4814"
            data-name="Welcome message"
          >
            <h1
              className="font-bold text-[#173653] text-[24px] leading-tight"
              data-node-id="32:4815"
            >
              Selamat Datang!
            </h1>
            <div
              className="font-bold text-[#008d91] text-[20px] leading-snug"
              data-node-id="32:4816"
            >
              <p className="mb-0">Kemitraan Anda</p>
              <p>telah disetujui.</p>
            </div>
            <p
              className="font-normal text-[#6f8191] text-[13.5px] leading-[1.35] mt-1 max-w-[300px]"
              data-node-id="32:4817"
            >
              Saatnya melanjutkan proses onboarding agar akun Anda segera siap
              digunakan.
            </p>
          </div>

          {/* Onboarding Steps List */}
          <div
            className="flex flex-col w-full py-[4px] font-sans"
            data-node-id="32:4818"
            data-name="Onboarding steps"
          >
            {ONBOARDING_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="flex gap-[14px] h-[38px] items-center w-full"
                data-node-id={`32:48${19 + idx * 4}`}
                data-name="Onboarding step"
              >
                <div
                  className="bg-[#00a68f] flex items-center justify-center rounded-full shrink-0 size-[25px]"
                  data-node-id={`32:48${20 + idx * 4}`}
                >
                  <span className="font-bold text-white text-[12.5px] leading-none">
                    {idx + 1}
                  </span>
                </div>
                <p
                  className="font-normal text-[#173653] text-[13px] leading-tight flex-1"
                  data-node-id={`32:48${22 + idx * 4}`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => router.push('/mitra/onboarding/business')}
            className="bg-[#008d91] flex gap-[10px] h-[46px] items-center justify-center rounded-[7px] w-full text-white font-semibold text-[14.5px] hover:bg-[#007b7f] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-[6px]"
            data-node-id="32:4843"
            data-name="Action"
          >
            <span data-node-id="32:4844">Mulai Onboarding</span>
            <ArrowRight className="size-[17px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
