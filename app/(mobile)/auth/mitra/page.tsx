'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function PengajuanMitraTambak() {
  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between pb-8 select-none"
      data-node-id="9:2718"
      data-name="Pengajuan mitra tambak"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[56px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="9:2725"
          data-name="Navigation"
        >
          <Link
            href="/auth/register/role"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="9:2921"
            data-name="arrow-left"
          >
            <ArrowLeft className="size-[18px]" />
          </Link>

          <div
            className="flex items-center justify-center flex-1 max-w-[276px] mx-auto"
            data-node-id="9:2727"
            data-name="Progress"
          >
            <div className="relative w-[276px] h-[13px]">
              <Image
                src="/images/progress-step-2.svg"
                alt="Langkah 2"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          <div className="size-[24px]" />
        </div>

        {/* Content Section */}
        <div
          className="flex flex-col gap-[28px] items-start pt-[20px] px-[20px] w-full"
          data-node-id="9:2731"
          data-name="Partnership status"
        >
          {/* Introduction */}
          <div
            className="flex flex-col gap-[10px] items-center text-center w-full"
            data-node-id="9:2732"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[23px] text-[#163252] leading-[1.18] font-sans"
              data-node-id="9:2733"
            >
              Apakah kamu sudah
              <br />
              terdaftar sebagai
              <br />
              Mitra Fiscycle?
            </h1>
            <p
              className="font-normal text-[13px] text-[#748397] leading-[1.4] font-sans"
              data-node-id="9:2734"
            >
              Cek status kemitraanmu terlebih dahulu untuk melanjutkan.
            </p>
          </div>

          {/* Status Options */}
          <div
            className="flex flex-col gap-[16px] items-start w-full"
            data-node-id="9:2735"
            data-name="Status options"
          >
            {/* Option 1: Sudah terdaftar */}
            <Link
              href="/auth/mitra/token"
              className="w-full bg-[#f1fcf9] border-[1.5px] border-[#80cfc1] flex flex-col gap-[12px] items-start p-[17px] rounded-[12px] hover:border-[#00566b] active:scale-[0.99] transition-all shadow-xs group"
              data-node-id="9:2736"
              data-name="Partnership option"
            >
              <div
                className="flex gap-[12px] items-center w-full"
                data-node-id="9:2737"
                data-name="Option header"
              >
                <div
                  className="bg-[#d7f5ec] flex items-center justify-center rounded-[22px] shrink-0 size-[37px] group-hover:scale-105 transition-transform"
                  data-node-id="9:2738"
                  data-name="Status icon"
                >
                  <div className="relative size-[27px]" data-node-id="9:2924">
                    <Image
                      src="/images/icon-circle-check.svg"
                      alt=""
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  className="flex-1 font-bold text-[#163252] text-[16px] leading-[1.3] font-sans"
                  data-node-id="9:2740"
                >
                  <p className="mb-0">Saya sudah terdaftar</p>
                  <p>sebagai Mitra Fiscycle</p>
                </div>

                <div
                  className="relative size-[16px] shrink-0 text-[#748397] group-hover:translate-x-0.5 transition-transform"
                  data-node-id="9:2927"
                  data-name="chevron-right"
                >
                  <Image
                    src="/images/icon-chevron-right.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <p
                className="font-normal text-[#748397] text-[13px] leading-[1.5] font-sans text-left"
                data-node-id="9:2742"
              >
                Saya sudah bekerja sama dengan Fiscycle dan ingin mengaktifkan
                akun.
              </p>
            </Link>

            {/* Option 2: Belum terdaftar */}
            <Link
              href="/auth/mitra/apply"
              className="w-full bg-white border border-[#e1e7ec] flex flex-col gap-[12px] items-start p-[17px] rounded-[12px] hover:border-[#139EC4]/60 active:scale-[0.99] transition-all shadow-xs group"
              data-node-id="9:2743"
              data-name="Partnership option"
            >
              <div
                className="flex gap-[12px] items-center w-full"
                data-node-id="9:2744"
                data-name="Option header"
              >
                <div
                  className="bg-[#ebf0f5] flex items-center justify-center rounded-[22px] shrink-0 size-[37px] group-hover:scale-105 transition-transform"
                  data-node-id="9:2745"
                  data-name="Status icon"
                >
                  <div className="relative size-[27px]" data-node-id="9:2930">
                    <Image
                      src="/images/icon-circle-help.svg"
                      alt=""
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  className="flex-1 font-bold text-[#163252] text-[16px] leading-[1.3] font-sans"
                  data-node-id="9:2747"
                >
                  <p className="mb-0">Saya belum terdaftar</p>
                  <p>sebagai Mitra Fiscycle</p>
                </div>

                <div
                  className="relative size-[16px] shrink-0 text-[#748397] group-hover:translate-x-0.5 transition-transform"
                  data-node-id="9:2933"
                  data-name="chevron-right"
                >
                  <Image
                    src="/images/icon-chevron-right.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <p
                className="font-normal text-[#748397] text-[13px] leading-[1.5] font-sans text-left"
                data-node-id="9:2749"
              >
                Saya tertarik menjadi mitra dan ingin mengajukan diri untuk
                bekerja sama.
              </p>
            </Link>
          </div>

          {/* Helpful Information Box */}
          <div
            className="bg-[#e4f4fe] flex gap-[13px] items-start p-[16px] rounded-[12px] w-full"
            data-node-id="9:2750"
            data-name="Helpful information"
          >
            <div
              className="relative size-[25px] shrink-0"
              data-node-id="9:2936"
              data-name="info"
            >
              <Image
                src="/images/icon-info-blue.svg"
                alt="Info"
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            <div
              className="flex flex-1 flex-col gap-[6px] items-start font-sans"
              data-node-id="9:2752"
              data-name="Information copy"
            >
              <p
                className="font-bold text-[#163252] text-[13px] leading-tight"
                data-node-id="9:2753"
              >
                Belum yakin?
              </p>
              <p
                className="font-normal text-[#748397] text-[12.5px] leading-[1.45]"
                data-node-id="9:2754"
              >
                Tim Fiscycle akan membantu proses pengajuan dan menghubungi kamu
                untuk langkah selanjutnya.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer link to check status */}
      <div className="pt-4 text-center">
        <Link
          href="/auth/mitra/apply/status"
          className="text-[12px] font-semibold text-[#00566b] hover:underline"
        >
          Sudah mengajukan kemitraan? Cek status pengajuan
        </Link>
      </div>
    </div>
  );
}
