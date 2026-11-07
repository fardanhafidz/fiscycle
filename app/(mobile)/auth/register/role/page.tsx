'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import type { Role } from '@/lib/types';

export default function PilihJenisPengguna() {
  const router = useRouter();
  const { registerDraft, setRegisterDraft, completeRegistrationWithRole } =
    useAuthStore();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const handleSelectRole = (role: Role | 'mitra_flow') => {
    // If no draft exists (direct navigation / testing), provide a sensible fallback draft
    if (!registerDraft) {
      setRegisterDraft({
        name: 'Pengguna Fiscycle',
        organizationName: 'Fiscycle Partner',
        email: 'user@fiscycle.id',
        phone: '081234567890',
        password: 'password123',
        acceptedTerms: true,
      });
    }

    if (role === 'mitra_flow') {
      router.push('/auth/mitra');
      return;
    }

    setLoadingRole(role);
    try {
      const { user, redirectTo } = completeRegistrationWithRole(role);
      toast.success(`Selamat datang, ${user.name}! Akun berhasil dibuat.`);
      router.push(redirectTo);
    } catch {
      toast.error('Gagal menyelesaikan pendaftaran');
      setLoadingRole(null);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between pb-8 select-none"
      data-node-id="9:2664"
      data-name="Pilih jenis pengguna"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[56px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="9:2671"
          data-name="Navigation"
        >
          <Link
            href="/auth/register"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="9:2885"
            data-name="arrow-left"
          >
            <ArrowLeft className="size-[18px]" />
          </Link>

          <div
            className="flex items-center justify-center flex-1 max-w-[276px] mx-auto"
            data-node-id="9:2673"
            data-name="Progress"
          >
            <div className="relative w-[276px] h-[13px]">
              <Image
                src="/images/progress-step-1.svg"
                alt="Langkah 1"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          <div className="size-[24px]" />
        </div>

        {/* Content Area */}
        <div
          className="flex flex-col gap-[20px] items-start pt-[16px] px-[18px] w-full"
          data-node-id="9:2677"
          data-name="Role selection"
        >
          {/* Introduction */}
          <div
            className="flex flex-col gap-[10px] items-center text-center w-full"
            data-node-id="9:2678"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[23px] text-[#163252] leading-[1.18] font-sans"
              data-node-id="9:2679"
            >
              Kamu menggunakan
              <br />
              Fiscycle sebagai apa?
            </h1>
            <p
              className="font-normal text-[13px] text-[#748397] leading-[1.4] font-sans"
              data-node-id="9:2680"
            >
              Pilih yang paling sesuai dengan kebutuhanmu. Kamu bisa menambahkan
              akses lain nanti jika diperlukan.
            </p>
          </div>

          {/* Available Roles */}
          <div
            className="flex flex-col gap-[13px] items-start w-full"
            data-node-id="9:2681"
            data-name="Available roles"
          >
            {/* Card 1: Usaha / Industri */}
            <button
              type="button"
              onClick={() => handleSelectRole('b2b')}
              disabled={loadingRole !== null}
              className="w-full bg-white border border-[#e1e7ec] flex gap-[12px] items-start min-h-[137px] pb-[13px] pt-[25px] px-[13px] rounded-[12px] hover:border-[#139EC4]/60 active:scale-[0.99] transition-all cursor-pointer text-left shadow-xs group"
              data-node-id="9:2682"
              data-name="Role option"
            >
              <div
                className="bg-[#e6f5fe] flex items-center justify-center rounded-[32px] shrink-0 size-[55px] group-hover:scale-105 transition-transform"
                data-node-id="9:2683"
                data-name="Role icon"
              >
                <div className="relative size-[34px]" data-node-id="9:2888">
                  <Image
                    src="/images/icon-building.svg"
                    alt="Usaha / Industri"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[5px] items-start"
                data-node-id="9:2685"
                data-name="Role information"
              >
                <p
                  className="font-bold text-[#163252] text-[15.5px] font-sans leading-tight"
                  data-node-id="9:2686"
                >
                  Usaha / Industri
                </p>
                <p
                  className="font-normal text-[#283d55] text-[12px] font-sans leading-[1.3]"
                  data-node-id="9:2687"
                >
                  Saya membutuhkan pasokan ikan untuk usaha.
                </p>
                <p
                  className="font-normal text-[#748397] text-[10.5px] font-sans leading-[1.3]"
                  data-node-id="9:2688"
                >
                  Restoran, hotel, katering, distributor, retailer, atau bisnis
                  makanan.
                </p>
              </div>

              <div
                className="flex flex-col h-[80px] items-start justify-center shrink-0 pr-1 text-[#748397]"
                data-node-id="9:2689"
                data-name="Continue affordance"
              >
                <div className="relative size-[15px]" data-node-id="9:2891">
                  <Image
                    src="/images/icon-chevron-right.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            </button>

            {/* Card 2: Rumah Tangga */}
            <button
              type="button"
              onClick={() => handleSelectRole('b2c')}
              disabled={loadingRole !== null}
              className="w-full bg-white border border-[#e1e7ec] flex gap-[12px] items-start min-h-[137px] pb-[13px] pt-[24px] px-[13px] rounded-[12px] hover:border-[#139EC4]/60 active:scale-[0.99] transition-all cursor-pointer text-left shadow-xs group"
              data-node-id="9:2691"
              data-name="Role option"
            >
              <div
                className="bg-[#fff0f0] flex items-center justify-center rounded-[32px] shrink-0 size-[55px] group-hover:scale-105 transition-transform"
                data-node-id="9:2692"
                data-name="Role icon"
              >
                <div className="relative size-[34px]" data-node-id="9:2894">
                  <Image
                    src="/images/icon-house.svg"
                    alt="Rumah Tangga"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[5px] items-start"
                data-node-id="9:2694"
                data-name="Role information"
              >
                <p
                  className="font-bold text-[#163252] text-[15.5px] font-sans leading-tight"
                  data-node-id="9:2695"
                >
                  Rumah Tangga
                </p>
                <p
                  className="font-normal text-[#283d55] text-[12px] font-sans leading-[1.3]"
                  data-node-id="9:2696"
                >
                  Saya ingin membeli ikan untuk kebutuhan pribadi.
                </p>
                <p
                  className="font-normal text-[#748397] text-[10.5px] font-sans leading-[1.3]"
                  data-node-id="9:2697"
                >
                  Konsumen yang ingin mencari dan membeli ikan sesuai kebutuhan.
                </p>
              </div>

              <div
                className="flex flex-col h-[80px] items-start justify-center shrink-0 pr-1 text-[#748397]"
                data-node-id="9:2698"
                data-name="Continue affordance"
              >
                <div className="relative size-[15px]" data-node-id="9:2897">
                  <Image
                    src="/images/icon-chevron-right.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            </button>

            {/* Card 3: Mitra Tambak (Highlighted in Figma) */}
            <button
              type="button"
              onClick={() => handleSelectRole('mitra_flow')}
              disabled={loadingRole !== null}
              className="w-full bg-[#edfcf8] border border-[#a5e5d8] flex gap-[12px] items-start min-h-[137px] pb-[33px] pt-[27px] px-[13px] rounded-[12px] hover:border-[#80cfc1] active:scale-[0.99] transition-all cursor-pointer text-left shadow-xs group"
              data-node-id="9:2700"
              data-name="Role option"
            >
              <div
                className="bg-white flex items-center justify-center rounded-[32px] shrink-0 size-[55px] shadow-2xs group-hover:scale-105 transition-transform"
                data-node-id="9:2701"
                data-name="Role icon"
              >
                <div className="relative size-[34px]" data-node-id="9:2900">
                  <Image
                    src="/images/icon-fish.svg"
                    alt="Mitra Tambak"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[5px] items-start"
                data-node-id="9:2703"
                data-name="Role information"
              >
                <p
                  className="font-bold text-[#163252] text-[15.5px] font-sans leading-tight"
                  data-node-id="9:2704"
                >
                  Mitra Tambak
                </p>
                <p
                  className="font-normal text-[#283d55] text-[12px] font-sans leading-[1.3]"
                  data-node-id="9:2705"
                >
                  Saya memiliki atau mengelola tambak.
                </p>
                <p
                  className="font-normal text-[#748397] text-[10.5px] font-sans leading-[1.3]"
                  data-node-id="9:2706"
                >
                  Untuk tambak yang sudah bekerja sama / tertarik bekerja sama
                  dengan Fiscycle.
                </p>
              </div>

              <div
                className="flex flex-col h-[80px] items-start justify-center shrink-0 pr-1 text-[#748397]"
                data-node-id="9:2707"
                data-name="Continue affordance"
              >
                <div className="relative size-[15px]" data-node-id="9:2903">
                  <Image
                    src="/images/icon-chevron-right.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            </button>

            {/* Card 4: Admin Fiscycle */}
            <button
              type="button"
              onClick={() => handleSelectRole('admin')}
              disabled={loadingRole !== null}
              className="w-full bg-white border border-[#e1e7ec] flex gap-[12px] items-start min-h-[92px] pb-[16px] pt-[20px] px-[13px] rounded-[12px] hover:border-[#139EC4]/60 active:scale-[0.99] transition-all cursor-pointer text-left shadow-xs group"
              data-node-id="9:2709"
              data-name="Role option"
            >
              <div
                className="bg-[#e9f2ff] flex items-center justify-center rounded-[32px] shrink-0 size-[55px] group-hover:scale-105 transition-transform"
                data-node-id="9:2710"
                data-name="Role icon"
              >
                <div className="relative size-[34px]" data-node-id="9:2906">
                  <Image
                    src="/images/icon-settings.svg"
                    alt="Admin Fiscycle"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[5px] items-start justify-center self-center"
                data-node-id="9:2712"
                data-name="Role information"
              >
                <p
                  className="font-bold text-[#163252] text-[15.5px] font-sans leading-tight"
                  data-node-id="9:2713"
                >
                  Admin Fiscycle
                </p>
                <p
                  className="font-normal text-[#283d55] text-[12px] font-sans leading-[1.3]"
                  data-node-id="9:2714"
                >
                  Khusus tim internal Fiscycle.
                </p>
              </div>

              <div
                className="flex flex-col h-[55px] items-start justify-center shrink-0 pr-1 text-[#748397]"
                data-node-id="9:2715"
                data-name="Continue affordance"
              >
                <div className="relative size-[15px]" data-node-id="9:2909">
                  <Image
                    src="/images/icon-chevron-right.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
