'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const imgSearch = '/images/admin-search.svg';
const imgBell = '/images/desktop-bell.svg';
const imgChevronDown = '/images/desktop-chevron-down.svg';
const imgBanner = '/images/desktop-bsf-banner.png';
const imgLayers = '/images/desktop-recycle.svg';
const imgWeight = '/images/desktop-weight.svg';
const imgSprout = '/images/mitra-leaf.svg';
const imgTriangleAlert = '/images/desktop-triangle-alert.svg';
const imgCalendarDays = '/images/desktop-clock.svg';
const imgInfo = '/images/admin-check.svg';
const imgBsfLarvae = '/images/desktop-bsf-larvae.png';
const imgOrganicMaterial = '/images/desktop-bsf-organic.png';
const imgOrganicMaterial1 = '/images/desktop-bsf-organic1.png';
const imgBsfLarvae1 = '/images/desktop-bsf-larvae1.png';
const imgOrganicMaterial2 = '/images/desktop-bsf-organic2.png';
const imgBsfLarvae2 = '/images/desktop-bsf-larvae2.png';
const imgBsfLarvae3 = '/images/desktop-bsf-larvae3.png';
const imgMoveDownLeft = '/images/desktop-move-down-left.svg';
const imgMoveDownRight = '/images/desktop-move-down-right.svg';
const imgMoveLeft = '/images/desktop-move-left.svg';
const imgTrash2 = '/images/desktop-trash2.svg';
const imgChevronRight = '/images/admin-chevron-right.svg';
const imgCircleCheck = '/images/desktop-circle-check.svg';
const imgDistributionTrack = '/images/desktop-bsf-distribution-track.svg';
const imgDistributionSegment = '/images/desktop-bsf-distribution-segment.svg';
const imgCloud = '/images/desktop-cloud.svg';

export default function DesktopBsfPage() {
  const [activeTab, setActiveTab] = useState('Ringkasan');
  const [batchFilter, setBatchFilter] = useState<'Semua' | 'Normal' | 'Perhatian' | 'Mendekati'>('Semua');

  const tabs = [
    'Ringkasan',
    'Input Organik',
    'Batch BSF',
    'Panen BSF',
    'Pemanfaatan',
    'Riwayat & Traceability',
  ];

  return (
    <div className="p-6 flex flex-col gap-3 text-[#173251] max-w-[1224px]">
      {/* Top Bar: Search and Account Controls */}
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2 h-7 px-3 rounded-md border border-[#e7eff4] bg-white w-[440px]">
          <Image src={imgSearch} alt="Cari" width={13} height={13} className="opacity-60" />
          <input
            type="text"
            placeholder="Cari batch, input organik, atau informasi BSF..."
            className="w-full text-[10px] bg-transparent outline-none placeholder:text-[#8192a5]"
          />
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            type="button"
            className="relative p-1 hover:bg-[#e2f3fc] rounded-full transition-colors"
            title="Notifikasi"
          >
            <Image src={imgBell} alt="Notifikasi" width={21} height={21} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#f34860]" />
          </button>

          <div className="w-px h-6 bg-[#e7eff4]" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#00629b] flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px] text-[#173251]">Budi Santoso</span>
              <span className="text-[8px] text-[#8192a5]">Mitra Tambak Makmur</span>
            </div>
            <Image src={imgChevronDown} alt="Menu" width={13} height={13} className="opacity-60 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Header Banner (80px height) */}
      <div className="relative bg-[#e2f3fc] rounded-[10px] h-[80px] p-3 flex items-center justify-between overflow-hidden shadow-sm">
        <div className="flex flex-col gap-1 z-10 max-w-[650px]">
          <h1 className="text-[25px] font-extrabold text-[#173251] leading-none">
            BSF &amp; Sirkular
          </h1>
          <p className="text-[10px] text-[#173251]">
            Ubah sampah organik menjadi pakan, untuk tambak yang lebih berkelanjutan.
          </p>
        </div>

        {/* Banner Graphic & Process Pills */}
        <div className="relative w-[526px] h-[80px] flex items-center justify-end">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e2f3fc] via-transparent to-transparent z-10" />
          <Image
            src={imgBanner}
            alt="Sirkular BSF"
            fill
            className="object-cover object-right"
          />

          <div className="absolute bottom-2.5 right-4 z-20 flex gap-2">
            <span className="bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[8px] font-semibold text-[#173251] shadow-xs">
              Sampah Organik
            </span>
            <span className="bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[8px] font-semibold text-[#173251] shadow-xs">
              Budidaya BSF
            </span>
            <span className="bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[8px] font-semibold text-[#173251] shadow-xs">
              Pakan untuk Ikan
            </span>
          </div>
        </div>
      </div>

      {/* 6 Summary Metric Cards (68px height) */}
      <div className="grid grid-cols-6 gap-2.5 w-full">
        <div className="bg-white rounded-[10px] p-2.5 flex items-center gap-2 border border-[#e7eff4] shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[#e5f8ef] flex items-center justify-center shrink-0">
            <Image src={imgLayers} alt="Batch" width={18} height={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[20px] font-bold text-[#173251]">3</span>
            <span className="text-[10px] font-semibold text-[#173251]">Batch Aktif</span>
            <span className="text-[8px] text-[#8192a5]">1 mendekati panen</span>
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-2.5 flex items-center gap-2 border border-[#e7eff4] shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[#e2f3fc] flex items-center justify-center shrink-0">
            <Image src={imgWeight} alt="Organik" width={18} height={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[20px] font-bold text-[#173251]">320 kg</span>
            <span className="text-[10px] font-semibold text-[#173251]">Bahan Diproses</span>
            <span className="text-[8px] text-[#8192a5]">Minggu ini</span>
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-2.5 flex items-center gap-2 border border-[#e7eff4] shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[#e5f8ef] flex items-center justify-center shrink-0">
            <Image src={imgSprout} alt="Normal" width={18} height={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[20px] font-bold text-[#173251]">2</span>
            <span className="text-[10px] font-semibold text-[#173251]">Batch Normal</span>
            <span className="text-[8px] text-[#14b97c]">Optimal</span>
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-2.5 flex items-center gap-2 border border-[#e7eff4] shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[#fff3df] flex items-center justify-center shrink-0">
            <Image src={imgTriangleAlert} alt="Perhatian" width={18} height={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[20px] font-bold text-[#173251]">1</span>
            <span className="text-[10px] font-semibold text-[#173251]">Perlu Perhatian</span>
            <span className="text-[8px] text-[#f69b23]">BSF-04 Suhu</span>
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-2.5 flex items-center gap-2 border border-[#e7eff4] shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[#f1ebff] flex items-center justify-center shrink-0">
            <Image src={imgLayers} alt="Estimasi" width={18} height={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[20px] font-bold text-[#173251]">120 kg</span>
            <span className="text-[10px] font-semibold text-[#173251]">Estimasi Panen</span>
            <span className="text-[8px] text-[#8192a5]">Dalam 2 minggu</span>
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-2.5 flex items-center gap-2 border border-[#e7eff4] shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[#e2f3fc] flex items-center justify-center shrink-0">
            <Image src={imgCalendarDays} alt="Panen" width={18} height={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[20px] font-bold text-[#173251]">1</span>
            <span className="text-[10px] font-semibold text-[#173251]">Panen &lt; 5 Hari</span>
            <span className="text-[8px] text-[#1688f8]">Siap alokasi</span>
          </div>
        </div>
      </div>

      {/* Row 2: Circular Monitoring (height 180px) */}
      <div className="grid grid-cols-12 gap-2.5 w-full">
        {/* Card 1: Perlu Ditangani Sekarang (300px / col-span-3) */}
        <div className="col-span-3 bg-[#fdebea] rounded-[10px] p-2.5 flex flex-col justify-between border border-[#fed7d7]">
          <span className="font-bold text-[14px] text-[#173251]">
            Perlu Ditangani Sekarang
          </span>

          <div className="space-y-1 text-[9px]">
            <div className="bg-white/70 backdrop-blur-xs rounded p-1.5 flex items-center gap-1.5">
              <Image src={imgTriangleAlert} alt="Alert" width={15} height={15} />
              <div className="flex-1 flex flex-col leading-tight">
                <span className="font-bold text-[#173251]">BSF-04</span>
                <span className="text-[8px] text-[#173251]">Suhu media tinggi (34°C)</span>
              </div>
              <span className="text-[7px] text-[#8192a5]">3 jam lalu</span>
            </div>

            <div className="bg-white/70 backdrop-blur-xs rounded p-1.5 flex items-center gap-1.5">
              <Image src={imgTriangleAlert} alt="Alert" width={15} height={15} />
              <div className="flex-1 flex flex-col leading-tight">
                <span className="font-bold text-[#173251]">BSF-02</span>
                <span className="text-[8px] text-[#173251]">Kelembapan rendah (48%)</span>
              </div>
              <span className="text-[7px] text-[#8192a5]">6 jam lalu</span>
            </div>

            <div className="bg-white/70 backdrop-blur-xs rounded p-1.5 flex items-center gap-1.5">
              <Image src={imgInfo} alt="Info" width={15} height={15} />
              <div className="flex-1 flex flex-col leading-tight">
                <span className="font-bold text-[#173251]">Input IN-0045</span>
                <span className="text-[8px] text-[#173251]">Menunggu verifikasi kualitas</span>
              </div>
              <span className="text-[7px] text-[#8192a5]">8 jam lalu</span>
            </div>
          </div>
        </div>

        {/* Card 2: Batch BSF Aktif (422px / col-span-4) */}
        <div className="col-span-4 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[14px] text-[#173251]">Batch BSF Aktif</span>
            <span className="text-[9px] text-[#00629b] cursor-pointer hover:underline">
              Lihat Semua
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Batch BSF-01 */}
            <div className="flex flex-col gap-1 border border-[#e7eff4] rounded p-1.5 text-[8px]">
              <div className="flex gap-1.5 items-center">
                <div className="relative w-8 h-8 rounded overflow-hidden">
                  <Image src={imgBsfLarvae} alt="BSF-01" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[9px] text-[#173251]">BSF-01</span>
                  <span className="text-[#14b97c] font-semibold">Normal</span>
                </div>
              </div>
              <span className="text-[#8192a5]">Hari ke-6 · 50 kg</span>
              <div className="flex items-center justify-between pt-0.5">
                <span className="font-bold text-[#173251]">9 hari lagi</span>
                <button type="button" className="text-[8px] text-[#00629b] font-bold">Detail</button>
              </div>
            </div>

            {/* Batch BSF-02 */}
            <div className="flex flex-col gap-1 border border-[#ffd8a8] rounded p-1.5 text-[8px] bg-[#fffbf6]">
              <div className="flex gap-1.5 items-center">
                <div className="relative w-8 h-8 rounded overflow-hidden">
                  <Image src={imgBsfLarvae} alt="BSF-02" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[9px] text-[#173251]">BSF-02</span>
                  <span className="text-[#f69b23] font-semibold">Perhatian</span>
                </div>
              </div>
              <span className="text-[#8192a5]">Hari ke-10 · 45 kg</span>
              <div className="flex items-center justify-between pt-0.5">
                <span className="font-bold text-[#173251]">5 hari lagi</span>
                <button type="button" className="text-[8px] text-[#00629b] font-bold">Detail</button>
              </div>
            </div>

            {/* Batch BSF-03 */}
            <div className="flex flex-col gap-1 border border-[#e7eff4] rounded p-1.5 text-[8px]">
              <div className="flex gap-1.5 items-center">
                <div className="relative w-8 h-8 rounded overflow-hidden">
                  <Image src={imgOrganicMaterial} alt="BSF-03" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[9px] text-[#173251]">BSF-03</span>
                  <span className="text-[#14b97c] font-semibold">Normal</span>
                </div>
              </div>
              <span className="text-[#8192a5]">Hari ke-4 · 38 kg</span>
              <div className="flex items-center justify-between pt-0.5">
                <span className="font-bold text-[#173251]">12 hari lagi</span>
                <button type="button" className="text-[8px] text-[#00629b] font-bold">Detail</button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Alur Sirkular Minggu Ini (222px / col-span-2) */}
        <div className="col-span-2 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <span className="font-bold text-[13px] text-[#173251]">
            Alur Sirkular
          </span>

          <div className="flex flex-col items-center gap-1 text-[8px]">
            <div className="flex items-center gap-1.5 bg-[#f8fbfe] px-2 py-1 rounded border border-[#e7eff4]">
              <div className="relative w-6 h-6 rounded overflow-hidden">
                <Image src={imgOrganicMaterial1} alt="Organik" fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[10px] text-[#173251]">320 kg</span>
                <span className="text-[#8192a5]">Sampah Masuk</span>
              </div>
            </div>

            <div className="flex justify-between w-full px-2">
              <Image src={imgMoveDownLeft} alt="Arrow" width={16} height={16} />
              <Image src={imgMoveDownRight} alt="Arrow" width={16} height={16} />
            </div>

            <div className="flex justify-between w-full text-[8px]">
              <div className="flex flex-col items-center">
                <Image src={imgTrash2} alt="Diproses" width={16} height={16} />
                <span className="font-bold text-[#173251]">270 kg</span>
                <span className="text-[#8192a5]">Diproses</span>
              </div>
              <Image src={imgMoveLeft} alt="Arrow" width={24} height={14} className="self-center" />
              <div className="flex flex-col items-center">
                <div className="relative w-6 h-5 rounded overflow-hidden">
                  <Image src={imgBsfLarvae1} alt="Hasil" fill className="object-cover" />
                </div>
                <span className="font-bold text-[#173251]">85 kg</span>
                <span className="text-[#8192a5]">Hasil BSF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Pemanfaatan Hasil (col-span-3) */}
        <div className="col-span-3 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <span className="font-bold text-[14px] text-[#173251]">
            Pemanfaatan Hasil
          </span>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[16px] font-bold text-[#173251]">85 kg</span>
            <span className="text-[8px] text-[#8192a5]">Total hasil panen BSF</span>
          </div>

          <div className="space-y-1.5 text-[8px]">
            <div>
              <div className="flex justify-between text-[#173251] font-semibold mb-0.5">
                <span>Dialokasikan ke pakan ikan</span>
                <span>60 kg (71%)</span>
              </div>
              <div className="w-full bg-[#e7eff4] rounded-full h-2 overflow-hidden">
                <div className="bg-[#1688f8] h-full w-[71%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#173251] font-semibold mb-0.5">
                <span>Tersedia untuk batch berikutnya</span>
                <span>25 kg (29%)</span>
              </div>
              <div className="w-full bg-[#e7eff4] rounded-full h-2 overflow-hidden">
                <div className="bg-[#14b97c] h-full w-[29%] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (34px height) */}
      <div className="flex gap-4 border-b border-[#e7eff4] h-[34px] w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`h-full px-1.5 text-[10px] transition-colors relative ${
                isActive
                  ? 'font-bold text-[#1688f8] border-b-2 border-[#1688f8]'
                  : 'font-medium text-[#8192a5] hover:text-[#173251]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Row 3: Input Organik, Kondisi Batch BSF & Insight AI (height 254px) */}
      <div className="grid grid-cols-12 gap-2.5 w-full">
        {/* Input Organik Terverifikasi (323px / col-span-3) */}
        <div className="col-span-3 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[13px] text-[#173251]">Input Organik</span>
            <span className="text-[9px] text-[#00629b] cursor-pointer hover:underline">
              Lihat Semua
            </span>
          </div>

          <div className="divide-y divide-[#e7eff4] text-[9px]">
            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative w-7 h-7 rounded overflow-hidden shrink-0">
                  <Image src={imgOrganicMaterial2} alt="IN-0045" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#173251]">IN-0045</span>
                    <span className="px-1 rounded bg-[#fdebea] text-[#f34860] text-[7px] font-semibold">Verifikasi</span>
                  </div>
                  <span className="text-[#173251]">ABC Restaurant</span>
                  <span className="text-[7px] text-[#8192a5]">42 kg • 28 Okt 2026</span>
                </div>
              </div>
              <Image src={imgChevronRight} alt="Buka" width={10} height={10} className="opacity-40" />
            </div>

            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative w-7 h-7 rounded overflow-hidden shrink-0">
                  <Image src={imgOrganicMaterial2} alt="IN-0044" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#173251]">IN-0044</span>
                    <span className="px-1 rounded bg-[#e5f8ef] text-[#14b97c] text-[7px] font-semibold">Diterima</span>
                  </div>
                  <span className="text-[#173251]">Hotel Surabaya</span>
                  <span className="text-[7px] text-[#8192a5]">38 kg • 27 Okt 2026</span>
                </div>
              </div>
              <Image src={imgChevronRight} alt="Buka" width={10} height={10} className="opacity-40" />
            </div>

            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative w-7 h-7 rounded overflow-hidden shrink-0">
                  <Image src={imgOrganicMaterial2} alt="IN-0043" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#173251]">IN-0043</span>
                    <span className="px-1 rounded bg-[#e5f8ef] text-[#14b97c] text-[7px] font-semibold">Diterima</span>
                  </div>
                  <span className="text-[#173251]">Pasar Induk</span>
                  <span className="text-[7px] text-[#8192a5]">50 kg • 27 Okt 2026</span>
                </div>
              </div>
              <Image src={imgChevronRight} alt="Buka" width={10} height={10} className="opacity-40" />
            </div>

            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative w-7 h-7 rounded overflow-hidden shrink-0">
                  <Image src={imgOrganicMaterial2} alt="IN-0042" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#173251]">IN-0042</span>
                    <span className="px-1 rounded bg-[#e5f8ef] text-[#14b97c] text-[7px] font-semibold">Diterima</span>
                  </div>
                  <span className="text-[#173251]">Katering Sejati</span>
                  <span className="text-[7px] text-[#8192a5]">35 kg • 26 Okt 2026</span>
                </div>
              </div>
              <Image src={imgChevronRight} alt="Buka" width={10} height={10} className="opacity-40" />
            </div>
          </div>
        </div>

        {/* Kondisi Batch BSF (443px / col-span-5) */}
        <div className="col-span-5 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[14px] text-[#173251]">Kondisi Batch BSF</span>
              <button type="button" className="text-[9px] text-[#00629b] font-semibold hover:underline">
                + Buat Batch Baru
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex gap-1.5 mb-2">
              <button
                type="button"
                onClick={() => setBatchFilter('Semua')}
                className={`px-2 py-0.5 rounded text-[8px] font-semibold transition-colors ${
                  batchFilter === 'Semua' ? 'bg-[#1688f8] text-white' : 'bg-[#f3f9fc] text-[#8192a5]'
                }`}
              >
                Semua (3)
              </button>
              <button
                type="button"
                onClick={() => setBatchFilter('Normal')}
                className={`px-2 py-0.5 rounded text-[8px] font-semibold transition-colors ${
                  batchFilter === 'Normal' ? 'bg-[#1688f8] text-white' : 'bg-[#f3f9fc] text-[#8192a5]'
                }`}
              >
                Normal (2)
              </button>
              <button
                type="button"
                onClick={() => setBatchFilter('Perhatian')}
                className={`px-2 py-0.5 rounded text-[8px] font-semibold transition-colors ${
                  batchFilter === 'Perhatian' ? 'bg-[#1688f8] text-white' : 'bg-[#f3f9fc] text-[#8192a5]'
                }`}
              >
                Perlu Perhatian (1)
              </button>
            </div>

            {/* Table */}
            <div className="w-full text-[8px] border border-[#e7eff4] rounded overflow-hidden">
              <div className="bg-[#f8fbfe] flex items-center px-2 py-1 font-semibold text-[#8192a5]">
                <div className="w-14">Batch</div>
                <div className="w-14">Umur</div>
                <div className="w-14">Bahan</div>
                <div className="w-20">Kondisi</div>
                <div className="w-16">Panen</div>
                <div className="flex-1 text-right">Aksi</div>
              </div>

              <div className="divide-y divide-[#e7eff4]">
                <div className="flex items-center px-2 py-1.5">
                  <div className="w-14 font-bold text-[#173251] flex items-center gap-1">
                    <div className="relative w-4 h-4 rounded overflow-hidden">
                      <Image src={imgBsfLarvae2} alt="BSF-04" fill className="object-cover" />
                    </div>
                    <span>BSF-04</span>
                  </div>
                  <div className="w-14 text-[#173251]">Hari ke-8</div>
                  <div className="w-14 text-[#173251]">42 kg</div>
                  <div className="w-20">
                    <span className="px-1.5 py-0.5 rounded bg-[#fff3df] text-[#f69b23] font-semibold">Perhatian</span>
                  </div>
                  <div className="w-16 text-[#173251]">5 hari lagi</div>
                  <div className="flex-1 text-right">
                    <button type="button" className="text-[#00629b] font-bold">Lihat</button>
                  </div>
                </div>

                <div className="flex items-center px-2 py-1.5">
                  <div className="w-14 font-bold text-[#173251] flex items-center gap-1">
                    <div className="relative w-4 h-4 rounded overflow-hidden">
                      <Image src={imgBsfLarvae2} alt="BSF-01" fill className="object-cover" />
                    </div>
                    <span>BSF-01</span>
                  </div>
                  <div className="w-14 text-[#173251]">Hari ke-6</div>
                  <div className="w-14 text-[#173251]">50 kg</div>
                  <div className="w-20">
                    <span className="px-1.5 py-0.5 rounded bg-[#e5f8ef] text-[#14b97c] font-semibold">Normal</span>
                  </div>
                  <div className="w-16 text-[#173251]">9 hari lagi</div>
                  <div className="flex-1 text-right">
                    <button type="button" className="text-[#00629b] font-bold">Lihat</button>
                  </div>
                </div>

                <div className="flex items-center px-2 py-1.5">
                  <div className="w-14 font-bold text-[#173251] flex items-center gap-1">
                    <div className="relative w-4 h-4 rounded overflow-hidden">
                      <Image src={imgBsfLarvae2} alt="BSF-02" fill className="object-cover" />
                    </div>
                    <span>BSF-02</span>
                  </div>
                  <div className="w-14 text-[#173251]">Hari ke-10</div>
                  <div className="w-14 text-[#173251]">45 kg</div>
                  <div className="w-20">
                    <span className="px-1.5 py-0.5 rounded bg-[#fff3df] text-[#f69b23] font-semibold">Perhatian</span>
                  </div>
                  <div className="w-16 text-[#173251]">5 hari lagi</div>
                  <div className="flex-1 text-right">
                    <button type="button" className="text-[#00629b] font-bold">Lihat</button>
                  </div>
                </div>

                <div className="flex items-center px-2 py-1.5">
                  <div className="w-14 font-bold text-[#173251] flex items-center gap-1">
                    <div className="relative w-4 h-4 rounded overflow-hidden">
                      <Image src={imgBsfLarvae2} alt="BSF-03" fill className="object-cover" />
                    </div>
                    <span>BSF-03</span>
                  </div>
                  <div className="w-14 text-[#173251]">Hari ke-4</div>
                  <div className="w-14 text-[#173251]">38 kg</div>
                  <div className="w-20">
                    <span className="px-1.5 py-0.5 rounded bg-[#e5f8ef] text-[#14b97c] font-semibold">Normal</span>
                  </div>
                  <div className="w-16 text-[#173251]">12 hari lagi</div>
                  <div className="flex-1 text-right">
                    <button type="button" className="text-[#00629b] font-bold">Lihat</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight & Rekomendasi AI (col-span-4) */}
        <div className="col-span-4 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[14px] text-[#173251]">Insight &amp; Rekomendasi AI</span>
            <span className="text-[9px] text-[#00629b] cursor-pointer hover:underline">
              Lihat Semua
            </span>
          </div>

          <div className="space-y-1.5 text-[9px]">
            <div className="p-1.5 rounded bg-[#fff5f5] border border-[#fed7d7] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Image src={imgTriangleAlert} alt="Alert" width={16} height={16} />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#173251]">Suhu media BSF-04 meningkat</span>
                  <span className="text-[8px] text-[#8192a5]">Suhu 34°C, di atas standar (28–32°C).</span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#fdebea] text-[#f34860] text-[8px] font-semibold">
                Prioritas
              </span>
            </div>

            <div className="p-1.5 rounded bg-[#fffbf2] border border-[#feebc8] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Image src={imgTriangleAlert} alt="Alert" width={16} height={16} />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#173251]">Kelembapan rendah BSF-02</span>
                  <span className="text-[8px] text-[#8192a5]">Kelembapan 48%, semprot kabut air.</span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#fff3df] text-[#f69b23] text-[8px] font-semibold">
                Perhatian
              </span>
            </div>

            <div className="p-1.5 rounded bg-[#f4f9fd] border border-[#d2e9f7] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Image src={imgInfo} alt="Info" width={16} height={16} />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#173251]">Prediksi panen BSF-04</span>
                  <span className="text-[8px] text-[#8192a5]">Panen dapat dilakukan dalam 5 hari.</span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#e2f3fc] text-[#1688f8] text-[8px] font-semibold">
                Info
              </span>
            </div>

            <div className="p-1.5 rounded bg-[#f6fdf9] border border-[#d2f4e3] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Image src={imgCircleCheck} alt="Check" width={16} height={16} />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#173251]">Kualitas bahan IN-0044 sesuai</span>
                  <span className="text-[8px] text-[#8192a5]">Aman digunakan untuk budidaya.</span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#e5f8ef] text-[#14b97c] text-[8px] font-semibold">
                Sesuai
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Panen BSF, Pemanfaatan Hasil Donut & Dampak Sirkular (height 150px) */}
      <div className="grid grid-cols-12 gap-2.5 w-full">
        {/* Panen BSF (col-span-4 / 409px) */}
        <div className="col-span-4 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[14px] text-[#173251]">Panen BSF</span>
            <span className="text-[9px] text-[#00629b] cursor-pointer hover:underline">
              Lihat Semua
            </span>
          </div>

          <div className="divide-y divide-[#e7eff4] text-[8px]">
            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative w-5 h-5 rounded overflow-hidden">
                  <Image src={imgBsfLarvae3} alt="Panen" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#173251]">2 Nov 2026 · 48 kg</span>
                  <span className="text-[#14b97c] font-semibold">Siap Panen</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Mencatat panen BSF batch 2 Nov...')}
                className="px-2 py-0.5 rounded bg-[#00629b] text-white font-bold"
              >
                Catat Panen
              </button>
            </div>

            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative w-5 h-5 rounded overflow-hidden">
                  <Image src={imgBsfLarvae3} alt="Panen" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#173251]">5 Nov 2026 · 45 kg</span>
                  <span className="text-[#f69b23] font-semibold">Mendekati Panen</span>
                </div>
              </div>
              <button type="button" className="px-2 py-0.5 rounded border border-[#a9c9db] text-[#00629b] font-bold">
                Lihat
              </button>
            </div>

            <div className="py-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative w-5 h-5 rounded overflow-hidden">
                  <Image src={imgBsfLarvae3} alt="Panen" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#173251]">10 Nov 2026 · 32 kg</span>
                  <span className="text-[#1688f8] font-semibold">Belum Panen</span>
                </div>
              </div>
              <button type="button" className="px-2 py-0.5 rounded border border-[#a9c9db] text-[#00629b] font-bold">
                Lihat
              </button>
            </div>
          </div>
        </div>

        {/* Pemanfaatan Hasil BSF untuk Pakan Ikan (col-span-5 / 409px) */}
        <div className="col-span-5 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[14px] text-[#173251]">
              Pemanfaatan Hasil BSF untuk Pakan Ikan
            </span>
            <span className="text-[9px] text-[#00629b] cursor-pointer hover:underline">
              Kelola Alokasi
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Donut Chart */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <Image src={imgDistributionTrack} alt="Track" fill className="object-contain" />
              <Image src={imgDistributionSegment} alt="Segment" fill className="object-contain" />
              <div className="flex flex-col items-center leading-tight z-10">
                <span className="text-[13px] font-bold text-[#173251]">85 kg</span>
                <span className="text-[6px] text-[#8192a5]">Total Hasil</span>
              </div>
            </div>

            {/* Legend & Breakdown */}
            <div className="flex-1 grid grid-cols-2 gap-2 text-[8px]">
              <div className="space-y-1">
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#1688f8]">● 60 kg</span>
                  <span className="text-[#8192a5]">Dialokasikan (71%)</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#14b97c]">● 25 kg</span>
                  <span className="text-[#8192a5]">Tersedia (29%)</span>
                </div>
              </div>

              <div className="space-y-0.5 border-l border-[#e7eff4] pl-2 text-[#173251]">
                <span className="text-[#8192a5] block mb-0.5">Alokasi ke Kolam:</span>
                <div className="flex justify-between">
                  <span>● Kolam 1</span>
                  <span className="font-semibold">20 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>● Kolam 2</span>
                  <span className="font-semibold">15 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>● Kolam 4</span>
                  <span className="font-semibold">15 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>● Kolam 5</span>
                  <span className="font-semibold">10 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dampak Sirkular (col-span-3) */}
        <div className="col-span-3 bg-white rounded-[10px] p-2.5 flex flex-col justify-between border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[14px] text-[#173251]">Dampak Sirkular</span>
            <span className="text-[8px] text-[#00629b]">Oktober 2026 ⌄</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-[8px]">
            <div className="flex flex-col items-center">
              <Image src={imgLayers} alt="Daur Ulang" width={18} height={18} className="mb-0.5" />
              <span className="font-bold text-[13px] text-[#173251]">320 kg</span>
              <span className="text-[#8192a5] leading-tight">Sampah Diolah</span>
              <span className="text-[#14b97c] font-semibold mt-0.5">↑ 12%</span>
            </div>

            <div className="flex flex-col items-center">
              <Image src={imgCloud} alt="Emisi" width={18} height={18} className="mb-0.5" />
              <span className="font-bold text-[13px] text-[#173251]">480 kg</span>
              <span className="text-[#8192a5] leading-tight">Emisi Dihindari</span>
              <span className="text-[#14b97c] font-semibold mt-0.5">↑ 18%</span>
            </div>

            <div className="flex flex-col items-center">
              <Image src={imgLayers} alt="Standar" width={18} height={18} className="mb-0.5" />
              <span className="font-bold text-[13px] text-[#173251]">100%</span>
              <span className="text-[#8192a5] leading-tight">Organik Lolos</span>
              <span className="text-[#14b97c] font-semibold mt-0.5">Standar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
