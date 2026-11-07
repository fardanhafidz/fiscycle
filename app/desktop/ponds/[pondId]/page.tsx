'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const imgSearch = '/images/admin-search.svg';
const imgBell = '/images/desktop-bell.svg';
const imgChevronDown = '/images/desktop-chevron-down.svg';
const imgFileTextWhite = '/images/desktop-file-text-white.svg';
const imgTriangleAlert = '/images/desktop-triangle-alert.svg';
const imgLightbulb = '/images/desktop-lightbulb1.svg';
const imgActualTrend = '/images/desktop-actual-trend.svg';
const imgFishPondThumb = '/images/desktop-pond-thumb-detail.png';

export default function DesktopPondDetailPage() {
  const [activeTab, setActiveTab] = useState('Ringkasan');
  const [isHandled, setIsHandled] = useState(false);
  const [aerationActive, setAerationActive] = useState(false);

  const tabs = [
    'Ringkasan',
    'Kualitas Air',
    'Ikan',
    'Pakan',
    'Pertumbuhan',
    'Panen',
    'Insight',
    'Aktivitas',
  ];

  return (
    <div className="p-6 flex flex-col gap-4 text-[#173251] max-w-[1224px]">
      {/* Top Bar: Search and Account Controls */}
      <div className="flex h-9 items-center justify-between w-full">
        <div className="flex items-center gap-2 h-8 px-3 rounded-md border border-[#e7eff4] bg-white w-[440px]">
          <Image src={imgSearch} alt="Cari" width={14} height={14} className="opacity-60" />
          <input
            type="text"
            placeholder="Cari kolam, tambak, atau aktivitas..."
            className="w-full text-[11px] bg-transparent outline-none placeholder:text-[#8192a5]"
          />
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            type="button"
            className="relative p-1 hover:bg-[#e2f3fc] rounded-full transition-colors"
            title="Notifikasi"
          >
            <Image src={imgBell} alt="Notifikasi" width={22} height={22} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f34860]" />
          </button>

          <div className="w-px h-6 bg-[#e7eff4]" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00629b] flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px] text-[#173251]">Budi Santoso</span>
              <span className="text-[9px] text-[#8192a5]">Mitra Tambak Makmur</span>
            </div>
            <Image src={imgChevronDown} alt="Menu" width={13} height={13} className="opacity-60 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-[10px] text-[#8192a5] flex items-center gap-1.5">
        <Link href="/desktop/farms" className="hover:text-[#00629b] transition-colors">
          Tambak &amp; Kolam
        </Link>
        <span>›</span>
        <span className="hover:text-[#00629b] cursor-pointer">Tambak Makmur</span>
        <span>›</span>
        <span className="font-semibold text-[#173251]">Kolam 2</span>
      </nav>

      {/* Page Heading & Actions */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[25px] font-bold text-[#173251] leading-tight">Kolam 2</h1>
          <p className="text-[12px] text-[#8192a5]">
            Tambak Makmur · Nila · Hari ke-42 · Data diperbarui 2 menit lalu
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
              isHandled
                ? 'bg-[#e5f8ef] text-[#14b97c]'
                : 'bg-[#fdebea] text-[#f34860]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isHandled ? 'bg-[#14b97c]' : 'bg-[#f34860]'
              }`}
            />
            <span>{isHandled ? 'Ditangani' : 'Kritis'}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsHandled(!isHandled)}
            className="h-[34px] px-3.5 rounded-md border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[11px] hover:bg-[#e2f3fc] transition-colors"
          >
            {isHandled ? 'Buka Kembali Kasus' : 'Tandai Sudah Ditangani'}
          </button>

          <Link
            href="/desktop/reports"
            className="flex items-center gap-1.5 h-[34px] px-3.5 rounded-md bg-[#00629b] border border-[#00629b] text-white font-bold text-[11px] hover:bg-[#004e7c] transition-colors shadow-sm"
          >
            <Image src={imgFileTextWhite} alt="Laporan" width={14} height={14} />
            <span>Laporan Kolam</span>
          </Link>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex gap-7 border-b border-[#e7eff4] h-[38px] w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`h-full px-1 text-[12px] transition-colors relative ${
                isActive
                  ? 'font-bold text-[#00629b] border-b-2 border-[#00629b]'
                  : 'font-normal text-[#8192a5] hover:text-[#173251]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Row 1: Pond Production Conditions */}
      <div className="grid grid-cols-12 gap-3 w-full">
        {/* Card 1: Kondisi Air (col-span-3) */}
        <div className="col-span-3 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-bold text-[15px] text-[#173251]">Kondisi Air</span>
              <span className="text-[#4d94c2] text-[10px] cursor-pointer hover:underline">↗</span>
            </div>
            <p className="text-[9px] text-[#8192a5] mb-2.5">Terakhir: 2 menit lalu</p>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">pH</span>
                <span className="font-semibold text-[#14b97c]">7,2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Suhu</span>
                <span className="font-semibold text-[#f34860]">31,5°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Oksigen Air (DO)</span>
                <span className="font-semibold text-[#f34860]">2,8 mg/L</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Kekeruhan</span>
                <span className="font-semibold text-[#f69b23]">25 NTU</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Nitrit &amp; Amonia</span>
                <span className="font-semibold text-[#14b97c]">0,3 mg/L</span>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-[#f34860] mt-2 font-medium">
            DO di bawah batas aman: 5 mg/L
          </p>
        </div>

        {/* Card 2: Kondisi Ikan (col-span-2) */}
        <div className="col-span-2 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <span className="font-bold text-[15px] text-[#173251] block mb-2">Kondisi Ikan</span>
            <div className="mb-2">
              <p className="text-[10px] text-[#8192a5]">Berat rata-rata (estimasi)</p>
              <p className="text-[23px] font-bold text-[#173251] leading-tight">120 gram</p>
            </div>
            <div className="mb-2">
              <p className="text-[10px] text-[#8192a5]">Biomassa estimasi</p>
              <p className="text-[23px] font-bold text-[#173251] leading-tight">480 kg</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-[#8192a5] mb-1">Status pertumbuhan</p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#fff3df] text-[#f69b23] text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f69b23]" />
              <span>Sedikit di bawah target</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pakan Hari Ini (col-span-2) */}
        <div className="col-span-2 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <span className="font-bold text-[15px] text-[#173251] block mb-2">Pakan Hari Ini</span>
            <div className="space-y-1 text-[11px] mb-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Target</span>
                <span className="font-semibold text-[#173251]">40 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Realisasi</span>
                <span className="font-semibold text-[#f34860]">20 kg (50%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Sisa</span>
                <span className="font-semibold text-[#14b97c]">20 kg</span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full bg-[#e7eff4] rounded-full h-1.5 overflow-hidden mb-2">
              <div className="bg-[#14b97c] h-full w-1/2 rounded-full" />
            </div>

            <p className="text-[10px] text-[#8192a5] leading-tight mb-2">
              Kurangi pakan sementara hingga DO kembali normal.
            </p>
          </div>
          <Link href="/desktop/feed" className="text-[10px] font-semibold text-[#00629b] hover:underline">
            Lihat jadwal pakan →
          </Link>
        </div>

        {/* Card 4: Estimasi Panen (col-span-2) */}
        <div className="col-span-2 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <span className="font-bold text-[15px] text-[#173251] block mb-2">Estimasi Panen</span>
            <div className="mb-2">
              <p className="text-[10px] text-[#8192a5]">Estimasi waktu</p>
              <p className="text-[18px] font-bold text-[#173251] leading-tight">12–18 hari lagi</p>
            </div>
            <div className="mb-2">
              <p className="text-[10px] text-[#8192a5]">Estimasi biomassa</p>
              <p className="text-[21px] font-bold text-[#173251] leading-tight">1,2 ton</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-[#8192a5]">Ukuran target</p>
            <p className="text-[14px] font-bold text-[#173251]">250–300 gram</p>
          </div>
        </div>

        {/* Card 5: Masalah Aktif & Saran Fiscycle (col-span-3) */}
        <div className="col-span-3 flex flex-col gap-2.5">
          {/* Masalah Aktif */}
          <div className="bg-[#fdebea] rounded-[10px] p-3 flex flex-col gap-1.5 border border-[#fed7d7]">
            <div className="flex items-center gap-1.5">
              <Image src={imgTriangleAlert} alt="Peringatan" width={16} height={16} />
              <span className="font-bold text-[12px] text-[#f34860]">Masalah Aktif</span>
            </div>
            <div className="text-[10px] text-[#f34860] space-y-0.5">
              <p>• DO rendah (2,8 mg/L)</p>
              <p>• Suhu tinggi (31,5°C)</p>
            </div>
          </div>

          {/* Saran Fiscycle */}
          <div className="bg-[#fff3df] rounded-[10px] p-3 flex-1 flex flex-col justify-between border border-[#feebc8]">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Image src={imgLightbulb} alt="Saran" width={16} height={16} />
                <span className="font-bold text-[12px] text-[#173251]">Saran Fiscycle</span>
              </div>
              <p className="text-[11px] text-[#173251] leading-snug">
                Tambahkan aerasi dan kurangi pakan sementara hingga DO kembali normal.
              </p>
            </div>
            <p className="text-[9px] text-[#8192a5] mt-2">
              Pantau kembali dalam 30 menit.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Riwayat Kualitas Air & Informasi Kolam */}
      <div className="grid grid-cols-12 gap-3.5 w-full">
        {/* Riwayat Kualitas Air (col-span-8 / 764px) */}
        <div className="col-span-8 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[15px] text-[#173251]">Riwayat Kualitas Air</span>
            <span className="text-[10px] text-[#4d94c2] cursor-pointer hover:underline">
              24 jam terakhir ⌄
            </span>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[#8192a5]">Oksigen terlarut (mg/L)</span>
              <span className="text-[#00629b] font-medium text-[9px]">
                — DO Kolam 2 &nbsp;&nbsp; - - Batas aman: 5 mg/L
              </span>
            </div>

            {/* Chart Area */}
            <div className="flex gap-2 items-start w-full mt-1">
              {/* Vertical Scale */}
              <div className="flex flex-col justify-between h-[88px] text-[9px] text-[#8192a5] w-6 shrink-0 text-right pr-1">
                <span>8</span>
                <span>6</span>
                <span>4</span>
                <span>2</span>
              </div>

              {/* Plot canvas */}
              <div className="flex-1 h-[88px] relative border-b border-[#e7eff4]">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-x-0 top-0 border-t border-[#e7eff4]" />
                <div className="absolute inset-x-0 top-[28px] border-t border-[#e7eff4]" />
                <div className="absolute inset-x-0 top-[56px] border-t border-[#e7eff4]" />
                <div className="absolute inset-x-0 bottom-0 border-t border-[#e7eff4]" />

                {/* Safe Threshold Dashed Line (5 mg/L -> middle height) */}
                <div className="absolute inset-x-0 top-[44px] border-t border-dashed border-[#14b97c] z-10 opacity-80" />

                {/* Actual SVG Trend curve */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <Image
                    src={imgActualTrend}
                    alt="Trend Oksigen Terlarut Kolam 2"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Horizontal Scale */}
            <div className="flex justify-between pl-8 text-[9px] text-[#8192a5] pt-1">
              <span>00.00</span>
              <span>04.00</span>
              <span>08.00</span>
              <span>12.00</span>
              <span>16.00</span>
              <span>20.00</span>
              <span className="font-semibold text-[#f34860]">Sekarang</span>
            </div>
          </div>

          <p className="text-[9px] text-[#f34860] font-medium mt-1">
            ↓ DO menurun. Pembacaan terakhir: 2,8 mg/L.
          </p>
        </div>

        {/* Informasi Kolam (col-span-4) */}
        <div className="col-span-4 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[15px] text-[#173251]">Informasi Kolam</span>
            <span className="text-[10px] text-[#4d94c2] cursor-pointer hover:underline">
              Edit →
            </span>
          </div>

          <div className="flex gap-3 items-start">
            <div className="relative w-[92px] h-[128px] rounded-[6px] overflow-hidden shrink-0">
              <Image
                src={imgFishPondThumb}
                alt="Kolam 2"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Jenis ikan</span>
                <span className="font-semibold text-[#173251]">Nila</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Umur budidaya</span>
                <span className="font-semibold text-[#173251]">42 hari</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Luas kolam</span>
                <span className="font-semibold text-[#173251]">500 m²</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Estimasi populasi</span>
                <span className="font-semibold text-[#173251]">4.000 ekor</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8192a5]">Fase</span>
                <span className="font-semibold text-[#173251]">Pertumbuhan</span>
              </div>

              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#e5f8ef] text-[#14b97c] text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14b97c]" />
                  Sensor online
                </span>
              </div>
            </div>
          </div>

          <p className="text-[8px] text-[#8192a5] mt-1">
            FSC-SENSOR-002 · Data diterima 2 menit lalu
          </p>
        </div>
      </div>

      {/* Row 3: Pond Operations */}
      <div className="grid grid-cols-12 gap-3.5 w-full">
        {/* Jadwal & Realisasi Pakan (col-span-5) */}
        <div className="col-span-5 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[15px] text-[#173251]">Jadwal &amp; Realisasi Pakan</span>
            <Link href="/desktop/feed" className="text-[10px] text-[#4d94c2] hover:underline">
              Lihat Detail →
            </Link>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">08.00 · Pakan pagi</span>
              <span className="font-semibold text-[#173251]">20 kg · Selesai</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">16.00 · Pakan sore</span>
              <span className="font-semibold text-[#f69b23]">20 kg · Ditunda</span>
            </div>
          </div>

          <p className="text-[10px] text-[#8192a5] mt-1.5">
            Pakan sore menunggu kondisi oksigen membaik.
          </p>
        </div>

        {/* Tindak Lanjut (col-span-3) */}
        <div className="col-span-3 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <span className="font-bold text-[15px] text-[#173251] block mb-1.5">Tindak Lanjut</span>
            <p className="text-[11px] text-[#173251] leading-tight">
              Aktifkan aerasi tambahan, pantau suhu dan cek pembacaan sensor kembali.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAerationActive(!aerationActive)}
            className={`w-full h-[34px] rounded-md font-bold text-[11px] transition-colors mt-2 ${
              aerationActive
                ? 'bg-[#14b97c] text-white hover:bg-[#0f9765]'
                : 'bg-[#00629b] text-white hover:bg-[#004e7c]'
            }`}
          >
            {aerationActive ? '✓ Aerasi Aktif (Matikan)' : 'Aktifkan Aerasi & Analisis'}
          </button>
        </div>

        {/* Aktivitas Terbaru (col-span-4) */}
        <div className="col-span-4 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[15px] text-[#173251]">Aktivitas Terbaru</span>
            <span className="text-[10px] text-[#4d94c2] cursor-pointer hover:underline">
              Lihat Semua →
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Peringatan DO rendah</span>
              <span className="font-semibold text-[#f34860]">2 menit lalu</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Data sensor diperbarui</span>
              <span className="font-semibold text-[#173251]">2 menit lalu</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Pemberian pakan pagi</span>
              <span className="font-semibold text-[#173251]">08.00 · Selesai</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
