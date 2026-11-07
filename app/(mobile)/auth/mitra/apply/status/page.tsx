'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

function StatusTimelineContent() {
  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between pb-8 select-none"
      data-node-id="13:1567"
      data-name="Status Pengajuan"
    >
      <div>
        {/* Navigation */}
        <div
          className="flex gap-[16px] h-[52px] items-center px-[20px] border-b border-[#f3f6f8]"
          data-node-id="13:1574"
          data-name="Navigation"
        >
          <Link
            href="/auth/mitra"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="13:1740"
            data-name="chevron-left"
          >
            <ChevronLeft className="size-[20px]" />
          </Link>
          <h1
            className="font-bold text-[#163252] text-[19px] font-sans"
            data-node-id="13:1576"
          >
            Status Pengajuan
          </h1>
        </div>

        {/* Content Area */}
        <div
          className="flex flex-col gap-[18px] items-start pt-[14px] px-[20px] w-full"
          data-node-id="13:1577"
          data-name="Application progress"
        >
          <p
            className="font-normal text-[#8492a2] text-[13.5px] leading-[1.4] font-sans"
            data-node-id="13:1578"
          >
            Pantau proses pengajuan kemitraanmu di sini.
          </p>

          {/* Timeline Section */}
          <div
            className="relative flex flex-col items-start w-full pt-1"
            data-node-id="13:1579"
            data-name="Timeline"
          >
            {/* Background vertical track */}
            <div
              className="absolute bg-[#dce1e3] h-[calc(100%-40px)] left-[20px] top-[18px] w-[3px]"
              data-node-id="13:1580"
              data-name="Timeline track"
            />
            {/* Completed active track */}
            <div
              className="absolute bg-[#7dd5b6] h-[75px] left-[20px] top-[18px] w-[3px]"
              data-node-id="13:1581"
              data-name="Completed track"
            />

            {/* Stage 1: Pengajuan diterima (Completed) */}
            <div
              className="flex gap-[16px] items-start pl-[5px] relative w-full pb-[18px] z-10"
              data-node-id="13:1582"
              data-name="Completed stage"
            >
              <div
                className="bg-[#20b885] flex items-center justify-center rounded-full shrink-0 size-[32px] shadow-2xs"
                data-node-id="13:1583"
                data-name="Completed marker"
              >
                <div className="relative size-[18px]" data-node-id="13:1743">
                  <Image
                    src="/images/icon-check-white.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start pt-[3px] font-sans"
                data-node-id="13:1585"
                data-name="Stage details"
              >
                <p
                  className="font-bold text-[#163252] text-[15px] leading-tight"
                  data-node-id="13:1586"
                >
                  Pengajuan diterima
                </p>
                <p
                  className="font-normal text-[#8492a2] text-[11.5px]"
                  data-node-id="13:1587"
                >
                  12 Juli 2025, 10:30
                </p>
              </div>
            </div>

            {/* Stage 2: Sedang ditinjau (Current Active) */}
            <div
              className="bg-[#e5f5fd] flex gap-[16px] items-start pl-[7px] pr-[14px] py-[14px] rounded-[9px] w-full z-10 mb-[14px]"
              data-node-id="13:1588"
              data-name="Current stage"
            >
              <div
                className="bg-[#a2ddff] flex items-center justify-center rounded-full shrink-0 size-[28px]"
                data-node-id="13:1589"
                data-name="Current marker"
              >
                <div
                  className="bg-[#269dee] rounded-full size-[13px] animate-pulse"
                  data-node-id="13:1590"
                  data-name="Active dot"
                />
              </div>

              <div
                className="flex flex-1 flex-col gap-[6px] items-start font-sans"
                data-node-id="13:1591"
                data-name="Stage details"
              >
                <p
                  className="font-bold text-[#27789d] text-[15px] leading-tight"
                  data-node-id="13:1592"
                >
                  Sedang ditinjau
                </p>
                <p
                  className="font-normal text-[#8492a2] text-[12.5px] leading-[1.4]"
                  data-node-id="13:1593"
                >
                  Tim kami sedang meninjau data Anda. Kami akan menghubungi lewat
                  WhatsApp untuk tindak lanjut.
                </p>
              </div>
            </div>

            {/* Stage 3: Dihubungi oleh tim */}
            <div
              className="flex gap-[22px] h-[48px] items-center pl-[10px] w-full z-10"
              data-node-id="13:1594"
              data-name="Upcoming stage"
            >
              <div
                className="bg-white border-[3px] border-[#dce1e3] rounded-full shrink-0 size-[22px]"
                data-node-id="13:1595"
              />
              <p
                className="font-normal text-[#b9bec3] text-[14px] font-sans"
                data-node-id="13:1596"
              >
                Dihubungi oleh tim
              </p>
            </div>

            {/* Stage 4: Diskusi & verifikasi */}
            <div
              className="flex gap-[22px] h-[48px] items-center pl-[10px] w-full z-10"
              data-node-id="13:1597"
              data-name="Upcoming stage"
            >
              <div
                className="bg-white border-[3px] border-[#dce1e3] rounded-full shrink-0 size-[22px]"
                data-node-id="13:1598"
              />
              <p
                className="font-normal text-[#b9bec3] text-[14px] font-sans"
                data-node-id="13:1599"
              >
                Diskusi &amp; verifikasi
              </p>
            </div>

            {/* Stage 5: Site assessment */}
            <div
              className="flex gap-[22px] h-[48px] items-center pl-[10px] w-full z-10"
              data-node-id="13:1600"
              data-name="Upcoming stage"
            >
              <div
                className="bg-white border-[3px] border-[#dce1e3] rounded-full shrink-0 size-[22px]"
                data-node-id="13:1601"
              />
              <p
                className="font-normal text-[#b9bec3] text-[14px] font-sans"
                data-node-id="13:1602"
              >
                Site assessment (jika perlu)
              </p>
            </div>

            {/* Stage 6: Penawaran kerja sama */}
            <div
              className="flex gap-[22px] h-[48px] items-center pl-[10px] w-full z-10"
              data-node-id="13:1603"
              data-name="Upcoming stage"
            >
              <div
                className="bg-white border-[3px] border-[#dce1e3] rounded-full shrink-0 size-[22px]"
                data-node-id="13:1604"
              />
              <p
                className="font-normal text-[#b9bec3] text-[14px] font-sans"
                data-node-id="13:1605"
              >
                Penawaran kerja sama
              </p>
            </div>

            {/* Stage 7: Kontrak ditandatangani */}
            <div
              className="flex gap-[22px] h-[48px] items-center pl-[10px] w-full z-10"
              data-node-id="13:1606"
              data-name="Upcoming stage"
            >
              <div
                className="bg-white border-[3px] border-[#dce1e3] rounded-full shrink-0 size-[22px]"
                data-node-id="13:1607"
              />
              <p
                className="font-normal text-[#b9bec3] text-[14px] font-sans"
                data-node-id="13:1608"
              >
                Kontrak ditandatangani
              </p>
            </div>

            {/* Stage 8: Mitra terdaftar */}
            <div
              className="flex gap-[22px] h-[48px] items-center pl-[10px] w-full z-10"
              data-node-id="13:1609"
              data-name="Upcoming stage"
            >
              <div
                className="bg-white border-[3px] border-[#dce1e3] rounded-full shrink-0 size-[22px]"
                data-node-id="13:1610"
              />
              <p
                className="font-normal text-[#b9bec3] text-[14px] font-sans"
                data-node-id="13:1611"
              >
                Mitra terdaftar
              </p>
            </div>
          </div>

          {/* Bottom Information Notice */}
          <div
            className="bg-[#e5f5fd] flex gap-[12px] items-start p-[14px] rounded-[9px] w-full mt-4"
            data-node-id="13:1613"
            data-name="Information"
          >
            <div
              className="bg-[#269dee] flex items-center justify-center rounded-full shrink-0 size-[26px]"
              data-node-id="13:1614"
            >
              <span className="font-bold text-white text-[15px] font-sans">
                i
              </span>
            </div>
            <p
              className="flex-1 font-normal text-[#8492a2] text-[12.5px] leading-[1.4] font-sans"
              data-node-id="13:1616"
            >
              Status pengajuan diperbarui di aplikasi. Kami juga akan
              menghubungimu via WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StatusPengajuanPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-[#8492a2]">
          Memuat status pengajuan...
        </div>
      }
    >
      <StatusTimelineContent />
    </Suspense>
  );
}
