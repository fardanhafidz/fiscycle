'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ArrowRight, Check, Phone } from 'lucide-react';

const INSTALLATION_STAGES = [
  {
    title: 'Jadwal dikonfirmasi',
    desc: 'Waktu kedatangan teknisi telah disetujui.',
    status: 'completed',
  },
  {
    title: 'Teknisi menuju lokasi',
    desc: 'Tim sedang dalam perjalanan membawa perangkat.',
    status: 'active',
  },
  {
    title: 'Pemasangan sensor & gateway',
    desc: 'Pemasangan sensor DO, pH, suhu, dan gateway LoRaWAN.',
    status: 'upcoming',
  },
  {
    title: 'Kalibrasi & uji koneksi IoT',
    desc: 'Pengujian transmisi data sensor ke server Fiscycle.',
    status: 'upcoming',
  },
  {
    title: 'Serah terima & verifikasi',
    desc: 'Demonstrasi pembacaan parameter air kepada mitra.',
    status: 'upcoming',
  },
];

export default function StatusInstalasiPage() {
  const router = useRouter();

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
      data-node-id="32:5080"
      data-name="Status Instalasi"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="32:5087"
          data-name="Navigation"
        >
          <Link
            href="/mitra/onboarding/installation"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="32:5441"
            data-name="chevron-left"
          >
            <ChevronLeft className="size-[20px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="79:24"
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

          <div className="relative size-[17px] opacity-75" data-node-id="32:5444">
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
          className="flex flex-col gap-[18px] items-start pt-[14px] px-[20px] w-full font-sans"
          data-node-id="32:5091"
          data-name="Installation status"
        >
          {/* Header Title */}
          <div
            className="flex flex-col gap-[4px] items-start w-full"
            data-node-id="32:5092"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[#173653] text-[21px] leading-tight"
              data-node-id="32:5093"
            >
              Proses Instalasi
              <br />
              oleh Tim Fiscycle
            </h1>
            <p
              className="font-normal text-[#6f8191] text-[13px] leading-normal"
              data-node-id="32:5094"
            >
              Berikut adalah progres instalasi perangkat di lokasi Anda.
            </p>
          </div>

          {/* Technician Contact Card */}
          <div className="bg-white border border-[#d9e4ea] rounded-[10px] p-[14px] flex items-center justify-between w-full shadow-2xs">
            <div className="flex items-center gap-[12px]">
              <div className="relative size-[46px] rounded-full overflow-hidden border border-[#d9e4ea] shrink-0">
                <Image
                  src="/images/technician-1.png"
                  alt="Pak Joko"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#173653] text-[13.5px]">
                  Pak Joko &amp; Tim
                </span>
                <span className="text-[11.5px] text-[#008d91] font-semibold">
                  Teknisi Lapangan IoT
                </span>
                <span className="text-[11px] text-[#6f8191]">
                  Menuju lokasi tambak
                </span>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#edfcf8] text-[#008d91] border border-[#a5e5d8] rounded-full p-2.5 hover:bg-[#a5e5d8]/40 transition-colors"
            >
              <Phone className="size-[16px]" />
            </a>
          </div>

          {/* Timeline Section */}
          <div className="relative flex flex-col items-start w-full pt-2">
            {/* Background vertical track */}
            <div className="absolute bg-[#dce1e3] h-[calc(100%-30px)] left-[18px] top-[14px] w-[3px]" />
            {/* Active completed track */}
            <div className="absolute bg-[#07b18c] h-[70px] left-[18px] top-[14px] w-[3px]" />

            {INSTALLATION_STAGES.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isActive = stage.status === 'active';

              return (
                <div
                  key={idx}
                  className={`flex gap-[16px] items-start pl-[5px] relative w-full ${
                    idx < INSTALLATION_STAGES.length - 1 ? 'pb-[20px]' : ''
                  } z-10`}
                >
                  {isCompleted ? (
                    <div className="bg-[#07b18c] flex items-center justify-center rounded-full shrink-0 size-[28px] shadow-2xs">
                      <Check className="size-[16px] text-white stroke-[3]" />
                    </div>
                  ) : isActive ? (
                    <div className="bg-[#a2ddff] flex items-center justify-center rounded-full shrink-0 size-[28px]">
                      <div className="bg-[#269dee] rounded-full size-[12px] animate-pulse" />
                    </div>
                  ) : (
                    <div className="bg-white border-[3px] border-[#dce1e3] rounded-full shrink-0 size-[24px] ml-[2px]" />
                  )}

                  <div className="flex flex-1 flex-col gap-[2px] items-start pt-0.5">
                    <p
                      className={`font-bold text-[13.5px] leading-tight ${
                        isActive
                          ? 'text-[#008d91]'
                          : isCompleted
                          ? 'text-[#173653]'
                          : 'text-[#9aa7b3]'
                      }`}
                    >
                      {stage.title}
                    </p>
                    <p
                      className={`text-[12px] leading-normal ${
                        isActive ? 'text-[#6f8191]' : 'text-[#a2aeb8]'
                      }`}
                    >
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => router.push('/mitra/onboarding/activate')}
            className="bg-[#008d91] flex gap-[10px] h-[46px] items-center justify-center rounded-[7px] w-full text-white font-semibold text-[14px] hover:bg-[#007b7f] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-4"
          >
            <span>Lanjut ke Aktivasi Akun</span>
            <ArrowRight className="size-[17px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
