'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Bell,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Share2,
  Fish,
  Sprout,
  Bug,
  ShoppingCart,
  Users,
  Server,
  AlertTriangle,
} from 'lucide-react';

const imgFarmLandscape = '/images/desktop-farm-landscape.png';
const imgTrendLine = '/images/desktop-reports-trend-line.svg';

export default function FiscycleLaporanDesktopPage() {
  const [activeTab, setActiveTab] = useState<string>('Ringkasan');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'custom'>('monthly');
  const selectedMonth = 'Oktober 2026';
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    'Ringkasan',
    'Produksi Ikan',
    'BSF & Sirkular',
    'Bisnis & Penjualan',
    'Operasional',
    'Ekspor Laporan',
  ];

  return (
    <div
      className="bg-[#f3f9fc] content-stretch flex flex-col gap-[12px] min-h-screen overflow-x-hidden p-[20px] relative w-full select-none"
      data-node-id="55:57667"
      data-name="Fiscycle · Laporan"
    >
      {/* 1. Header: Search and Account Controls */}
      <div className="flex h-[30px] items-center justify-between relative shrink-0 w-full">
        {/* Search */}
        <div className="border border-[#e7eff4] bg-white flex gap-[7px] h-[28px] items-center px-[10px] rounded-[6px] shrink-0 w-[440px]">
          <Search className="size-[13px] text-[#8192a5]" />
          <input
            type="text"
            placeholder="Cari laporan, periode, atau indikator performa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-[9px] text-[#173251] placeholder-[#8192a5] bg-transparent outline-none"
          />
        </div>

        {/* Account controls */}
        <div className="flex gap-[14px] items-center relative shrink-0">
          <div className="relative shrink-0 cursor-pointer">
            <Bell className="size-[20px] text-[#173251]" />
            <div className="absolute bg-[#f34860] right-0 top-0 rounded-full size-[6px]" />
          </div>
          <div className="bg-[#e7eff4] h-[24px] w-px shrink-0" />
          <div className="bg-[#00629b] flex items-center justify-center rounded-full shrink-0 size-[30px]">
            <span className="font-bold text-[11px] text-white">B</span>
          </div>
          <div className="flex flex-col items-start leading-[1.35] whitespace-nowrap">
            <span className="font-bold text-[#173251] text-[11px]">Budi Santoso</span>
            <span className="font-normal text-[#8192a5] text-[8px]">Mitra Tambak Makmur</span>
          </div>
          <ChevronDown className="size-[13px] text-[#8192a5] cursor-pointer" />
        </div>
      </div>

      {/* 2. Page Introduction Banner */}
      <div className="bg-[#e2f3fc] flex gap-[12px] h-[80px] items-center overflow-hidden p-[12px] relative rounded-[10px] shrink-0 w-full">
        <div className="absolute h-[80px] right-0 top-0 w-[526px] pointer-events-none overflow-hidden">
          <Image
            src={imgFarmLandscape}
            alt="Banner image"
            width={526}
            height={80}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div className="absolute bg-gradient-to-r from-[#e2f3fc] via-[#e2f3fc]/90 to-transparent h-[80px] left-[580px] top-0 w-[300px] pointer-events-none" />
        <div className="flex flex-col gap-[4px] items-start relative z-10 text-[#173251] max-w-[700px]">
          <h1 className="font-extrabold text-[24px] leading-tight">Laporan</h1>
          <p className="font-normal text-[10px] text-[#425974] leading-relaxed">
            Pantau perkembangan tambak Anda dengan laporan yang lengkap, jelas, dan mudah dipahami.
          </p>
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.93)] border border-[#cbe4f4] flex flex-col items-start right-[20px] p-[8px] rounded-[6px] top-[10px] w-[205px] z-20 shadow-sm">
          <p className="font-normal text-[#173251] text-[8px] leading-snug">
            Laporan ini merangkum performa produksi, operasional, dan bisnis tambak Anda dalam satu tampilan.
          </p>
        </div>
      </div>

      {/* 3. Section Navigation Tabs & Report Controls */}
      <div className="flex flex-col gap-[6px] items-start relative shrink-0 w-full">
        {/* Navigation Tabs */}
        <div className="border-b border-[#e7eff4] flex gap-[12px] h-[34px] items-center w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-full px-[7px] text-[9px] transition border-b-2 cursor-pointer ${
                activeTab === tab
                  ? 'border-[#1688f8] text-[#1688f8] font-bold'
                  : 'border-transparent text-[#8192a5] font-medium hover:text-[#173251]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Report Controls: Period Selection & Export Buttons */}
        <div className="flex gap-[8px] h-[28px] items-center justify-between w-full">
          <div className="flex gap-[8px] items-center">
            {/* Period Selector */}
            <div className="border border-[#e7eff4] bg-white flex gap-[12px] h-[28px] items-center px-[9px] rounded-[5px] text-[#8192a5] text-[9px] cursor-pointer">
              <span>{selectedMonth}</span>
              <ChevronDown className="size-[11px]" />
            </div>

            {/* Timeframe Buttons */}
            <button
              onClick={() => setTimeframe('weekly')}
              className={`h-[24px] px-[10px] rounded-[6px] text-[9px] font-bold transition cursor-pointer border ${
                timeframe === 'weekly'
                  ? 'bg-[#00629b] border-[#00629b] text-white'
                  : 'bg-white border-[#a9c9db] text-[#00629b] hover:bg-[#e2f3fc]'
              }`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`h-[24px] px-[10px] rounded-[6px] text-[9px] font-bold transition cursor-pointer border ${
                timeframe === 'monthly'
                  ? 'bg-[#00629b] border-[#00629b] text-white'
                  : 'bg-white border-[#a9c9db] text-[#00629b] hover:bg-[#e2f3fc]'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setTimeframe('custom')}
              className={`h-[24px] px-[10px] rounded-[6px] text-[9px] font-bold transition cursor-pointer border ${
                timeframe === 'custom'
                  ? 'bg-[#00629b] border-[#00629b] text-white'
                  : 'bg-white border-[#a9c9db] text-[#00629b] hover:bg-[#e2f3fc]'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Export Controls */}
          <div className="flex gap-[8px] items-center">
            <button
              onClick={() => alert('Mengunduh Laporan PDF...')}
              className="bg-white border border-[#a9c9db] flex gap-[6px] h-[24px] items-center px-[10px] rounded-[6px] text-[#f34860] font-bold text-[9px] hover:bg-[#fdebea] transition cursor-pointer"
            >
              <FileText className="size-[12px] text-[#f34860]" />
              <span>Unduh PDF</span>
            </button>
            <button
              onClick={() => alert('Mengunduh Laporan Excel...')}
              className="bg-white border border-[#a9c9db] flex gap-[6px] h-[24px] items-center px-[10px] rounded-[6px] text-[#14b97c] font-bold text-[9px] hover:bg-[#e5f8ef] transition cursor-pointer"
            >
              <FileSpreadsheet className="size-[12px] text-[#14b97c]" />
              <span>Unduh Excel</span>
            </button>
            <button
              onClick={() => alert('Membagikan tautan ringkasan laporan...')}
              className="bg-white border border-[#a9c9db] flex gap-[6px] h-[24px] items-center px-[10px] rounded-[6px] text-[#00629b] font-bold text-[9px] hover:bg-[#e2f3fc] transition cursor-pointer"
            >
              <Share2 className="size-[12px] text-[#00629b]" />
              <span>Bagikan</span>
            </button>
          </div>
        </div>

        {/* 4. Ringkasan Performa (8 Metric Cards) */}
        <div className="flex flex-col gap-[7px] items-start w-full mt-1">
          <span className="font-bold text-[#173251] text-[13px]">
            Ringkasan Performa {selectedMonth}
          </span>
          <div className="flex gap-[7px] items-start w-full">
            {/* Metric 1 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <Fish className="size-[22px] text-[#00629b] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">2,8 ton</span>
                <span className="text-[#173251] text-[8px]">Total Panen Ikan</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#14b97c] text-[9px]">↑ 12%</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <Sprout className="size-[22px] text-[#14b97c] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">4,2 ton</span>
                <span className="text-[#173251] text-[8px]">Pakan Digunakan</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#14b97c] text-[9px]">↑ 8%</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <Bug className="size-[22px] text-[#f69b23] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">180 kg</span>
                <span className="text-[#173251] text-[8px]">Hasil BSF</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#14b97c] text-[9px]">↑ 25%</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <ShoppingCart className="size-[22px] text-[#1688f8] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">Rp 48,5 jt</span>
                <span className="text-[#173251] text-[8px]">Total Penjualan</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#14b97c] text-[9px]">↑ 18%</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <FileText className="size-[22px] text-[#00629b] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">18</span>
                <span className="text-[#173251] text-[8px]">Order Selesai</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#14b97c] text-[9px]">↑ 20%</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Metric 6 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <Users className="size-[22px] text-[#9955e8] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">7</span>
                <span className="text-[#173251] text-[8px]">Customer Aktif</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#14b97c] text-[9px]">↑ 2</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Metric 7 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <Server className="size-[22px] text-[#14b97c] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">98%</span>
                <span className="text-[#173251] text-[8px]">Uptime Perangkat</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#14b97c] text-[9px]">↑ 2%</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Metric 8 */}
            <div className="bg-white flex flex-1 gap-[7px] h-[65px] items-start p-[8px] rounded-[8px] border border-[#e7eff4] shadow-xs">
              <AlertTriangle className="size-[22px] text-[#f34860] shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-bold text-[#173251] text-[14px]">5</span>
                <span className="text-[#173251] text-[8px]">Masalah Operasional</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#f34860] text-[9px]">↓ 38%</span>
                  <span className="text-[#8192a5] text-[7px]">dari bulan lalu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Production and Sales Charts */}
        <div className="flex gap-[10px] h-[216px] items-start relative shrink-0 w-full mt-2">
          {/* Chart 1: Produksi Ikan */}
          <div className="bg-white flex flex-1 flex-col gap-[4px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-[#173251] text-[14px]">Produksi Ikan</h3>
              <button className="text-[#00629b] text-[9px] hover:underline cursor-pointer">
                Lihat Detail
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[#173251] text-[18px]">2,8 ton</span>
                <span className="text-[#8192a5] text-[8px]">Total panen ikan</span>
              </div>
              <span className="text-[#14b97c] text-[9px] font-medium">↑ 12% dari bulan lalu</span>
            </div>
            <span className="text-[#8192a5] text-[8px]">Volume Panen (kg)</span>

            {/* Stacked Bar Chart */}
            <div className="flex gap-[8px] h-[107px] items-start w-full">
              <div className="flex flex-col justify-between h-[91px] text-[#8192a5] text-[7px] w-[24px]">
                <span>2.000</span>
                <span>1.500</span>
                <span>1.000</span>
                <span>500</span>
                <span>0</span>
              </div>
              <div className="flex flex-1 h-[107px] items-end justify-between border-b border-[#e7eff4] pb-[16px] px-2 relative">
                {[
                  { month: 'Mei', nila: 20, bandeng: 15, other: 13 },
                  { month: 'Jun', nila: 27, bandeng: 20, other: 19 },
                  { month: 'Jul', nila: 24, bandeng: 18, other: 16 },
                  { month: 'Agu', nila: 31, bandeng: 23, other: 22 },
                  { month: 'Sep', nila: 26, bandeng: 20, other: 19 },
                  { month: 'Okt', nila: 35, bandeng: 27, other: 25 },
                ].map((col) => (
                  <div key={col.month} className="flex flex-col items-center gap-[4px]">
                    <div className="w-[30px] flex flex-col items-center">
                      <div
                        style={{ height: `${col.other}px` }}
                        className="w-[30px] bg-[#a5defa] rounded-t-[2px]"
                      />
                      <div
                        style={{ height: `${col.bandeng}px` }}
                        className="w-[30px] bg-[#54bff0]"
                      />
                      <div
                        style={{ height: `${col.nila}px` }}
                        className="w-[30px] bg-[#2875d8]"
                      />
                    </div>
                    <span className="text-[#8192a5] text-[7px]">{col.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#8192a5] text-[7px] text-center w-full">
              ● Nila &nbsp; ● Bandeng &nbsp; ● Lainnya
            </p>
          </div>

          {/* Chart 2: Produksi BSF */}
          <div className="bg-white flex flex-1 flex-col gap-[4px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-[#173251] text-[14px]">Produksi BSF</h3>
              <button className="text-[#00629b] text-[9px] hover:underline cursor-pointer">
                Lihat Detail
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[#173251] text-[18px]">180 kg</span>
                <span className="text-[#8192a5] text-[8px]">Total hasil BSF</span>
              </div>
              <span className="text-[#14b97c] text-[9px] font-medium">↑ 25% dari bulan lalu</span>
            </div>
            <span className="text-[#8192a5] text-[8px]">Hasil BSF (kg)</span>

            {/* BSF Bar Chart */}
            <div className="flex gap-[8px] h-[107px] items-start w-full">
              <div className="flex flex-col justify-between h-[91px] text-[#8192a5] text-[7px] w-[24px]">
                <span>200</span>
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>
              <div className="flex flex-1 h-[107px] items-end justify-between border-b border-[#e7eff4] pb-[16px] px-2 relative">
                {[
                  { month: 'Mei', feed: 34, other: 14 },
                  { month: 'Jun', feed: 47, other: 19 },
                  { month: 'Jul', feed: 41, other: 17 },
                  { month: 'Agu', feed: 54, other: 22 },
                  { month: 'Sep', feed: 46, other: 19 },
                  { month: 'Okt', feed: 62, other: 25 },
                ].map((col) => (
                  <div key={col.month} className="flex flex-col items-center gap-[4px]">
                    <div className="w-[30px] flex flex-col items-center">
                      <div
                        style={{ height: `${col.other}px` }}
                        className="w-[30px] bg-[#ffe09a] rounded-t-[2px]"
                      />
                      <div
                        style={{ height: `${col.feed}px` }}
                        className="w-[30px] bg-[#ffa437]"
                      />
                    </div>
                    <span className="text-[#8192a5] text-[7px]">{col.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#8192a5] text-[7px] text-center w-full">
              ● Untuk Pakan &nbsp; ● Lainnya
            </p>
          </div>

          {/* Chart 3: Penjualan */}
          <div className="bg-white flex flex-1 flex-col gap-[4px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-[#173251] text-[14px]">Penjualan</h3>
              <button className="text-[#00629b] text-[9px] hover:underline cursor-pointer">
                Lihat Detail
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[#173251] text-[18px]">Rp 48,5 juta</span>
                <span className="text-[#8192a5] text-[8px]">Total penjualan</span>
              </div>
              <span className="text-[#14b97c] text-[9px] font-medium">↑ 18% dari bulan lalu</span>
            </div>
            <span className="text-[#8192a5] text-[8px]">Nilai Penjualan (juta Rp)</span>

            {/* Sales Line & Volume Chart */}
            <div className="h-[107px] relative w-full overflow-hidden">
              <div className="flex flex-col justify-between h-[80px] text-[#8192a5] text-[7px] w-[20px] absolute left-0 top-0">
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>
              <div className="absolute left-[25px] right-0 top-[4px] bottom-[20px] border-b border-[#e7eff4]">
                {/* Gridlines */}
                {[0, 18, 36, 54, 72].map((y) => (
                  <div key={y} style={{ top: `${y}px` }} className="absolute left-0 right-0 h-px bg-[#e7eff4]" />
                ))}

                {/* Bars */}
                <div className="flex justify-between items-end h-full px-4">
                  {[31, 35, 37, 48, 51, 62].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-[16px] bg-[rgba(22,136,248,0.2)] rounded-t-[2px]"
                    />
                  ))}
                </div>

                {/* Trend line image from Figma */}
                <div className="absolute inset-0 pointer-events-none">
                  <Image
                    src={imgTrendLine}
                    alt="Trend line"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
              <div className="absolute left-[25px] right-0 bottom-0 flex justify-between text-[#8192a5] text-[7px] px-3">
                {['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
            <p className="text-[#8192a5] text-[7px] text-center w-full">
              ● Nilai Penjualan &nbsp; ● Volume Terjual (ton)
            </p>
          </div>
        </div>

        {/* 6. Performance Tables Row */}
        <div className="flex gap-[10px] h-[186px] items-start relative shrink-0 w-full mt-2">
          {/* Table 1: Performa Kolam */}
          <div className="bg-white flex flex-col gap-[2px] h-full p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[424px] shrink-0">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-[#173251] text-[14px]">Performa Kolam</h3>
              <button className="text-[#00629b] text-[9px] hover:underline cursor-pointer">
                Lihat Semua
              </button>
            </div>
            <div className="flex h-[25px] items-center text-[#8192a5] font-semibold text-[8px] px-[4px] bg-[#f8fbfd] rounded-[4px]">
              <span className="w-[48px]">Kolam</span>
              <span className="w-[55px]">Ikan</span>
              <span className="w-[57px]">Panen (kg)</span>
              <span className="w-[77px]">Pertumbuhan</span>
              <span className="w-[31px]">FCR*</span>
              <span className="w-[118px]">Status</span>
            </div>
            <div className="flex flex-col overflow-y-auto">
              {[
                { pond: 'Kolam 1', fish: 'Nila', harvest: '620', growth: '↑ 15%', fcr: '1,3', status: 'Sehat', isGood: true },
                { pond: 'Kolam 2', fish: 'Nila', harvest: '480', growth: '↑ 8%', fcr: '1,6', status: 'Perlu Perhatian', isGood: false },
                { pond: 'Kolam 3', fish: 'Bandeng', harvest: '550', growth: '↑ 12%', fcr: '1,4', status: 'Sehat', isGood: true },
                { pond: 'Kolam 4', fish: 'Nila', harvest: '850', growth: '↑ 18%', fcr: '1,2', status: 'Sehat', isGood: true },
                { pond: 'Kolam 5', fish: 'Bandeng', harvest: '300', growth: '↑ 5%', fcr: '1,8', status: 'Perlu Perhatian', isGood: false },
              ].map((row) => (
                <div key={row.pond} className="border-t border-[#e7eff4] flex h-[24px] items-center px-[4px] text-[8px] hover:bg-[#f8fbfd]">
                  <span className="w-[48px] text-[#173251]">{row.pond}</span>
                  <span className="w-[55px] text-[#173251]">{row.fish}</span>
                  <span className="w-[57px] text-[#173251]">{row.harvest}</span>
                  <span className="w-[77px] text-[#14b97c] font-semibold">{row.growth}</span>
                  <span className="w-[31px] text-[#173251]">{row.fcr}</span>
                  <div className="w-[118px]">
                    <span className={`px-[6px] py-[2px] rounded-[4px] text-[8px] font-semibold ${
                      row.isGood ? 'bg-[#e5f8ef] text-[#14b97c]' : 'bg-[#fff3df] text-[#f69b23]'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[#8192a5] text-[7px] mt-auto">
              *FCR: Feed Conversion Ratio (jika data tersedia)
            </p>
          </div>

          {/* Table 2: Performa BSF */}
          <div className="bg-white flex flex-col gap-[2px] h-full p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[330px] shrink-0">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-[#173251] text-[14px]">Performa BSF</h3>
              <button className="text-[#00629b] text-[9px] hover:underline cursor-pointer">
                Lihat Semua
              </button>
            </div>
            <div className="flex h-[25px] items-center text-[#8192a5] font-semibold text-[8px] px-[4px] bg-[#f8fbfd] rounded-[4px]">
              <span className="w-[44px]">Batch</span>
              <span className="w-[64px]">Bahan Masuk</span>
              <span className="w-[53px]">Hasil BSF</span>
              <span className="w-[35px]">Yield</span>
              <span className="w-[114px]">Status</span>
            </div>
            <div className="flex flex-col overflow-y-auto">
              {[
                { batch: 'BSF-01', input: '250 kg', yieldKg: '45 kg', yieldPct: '18%', status: 'Selesai', isDone: true },
                { batch: 'BSF-02', input: '300 kg', yieldKg: '52 kg', yieldPct: '17%', status: 'Selesai', isDone: true },
                { batch: 'BSF-03', input: '280 kg', yieldKg: '48 kg', yieldPct: '17%', status: 'Selesai', isDone: true },
                { batch: 'BSF-04', input: '320 kg', yieldKg: '35 kg', yieldPct: '11%', status: 'Perlu Perhatian', isDone: false },
              ].map((row) => (
                <div key={row.batch} className="border-t border-[#e7eff4] flex h-[28px] items-center px-[4px] text-[8px] hover:bg-[#f8fbfd]">
                  <span className="w-[44px] text-[#173251]">{row.batch}</span>
                  <span className="w-[64px] text-[#173251]">{row.input}</span>
                  <span className="w-[53px] text-[#173251]">{row.yieldKg}</span>
                  <span className="w-[35px] text-[#173251]">{row.yieldPct}</span>
                  <div className="w-[114px]">
                    <span className={`px-[6px] py-[2px] rounded-[4px] text-[8px] font-semibold ${
                      row.isDone ? 'bg-[#e5f8ef] text-[#14b97c]' : 'bg-[#fff3df] text-[#f69b23]'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table 3: Top 5 Pelanggan */}
          <div className="bg-white flex flex-1 flex-col gap-[2px] h-full p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-[#173251] text-[14px]">Top 5 Pelanggan</h3>
              <button className="text-[#00629b] text-[9px] hover:underline cursor-pointer">
                Lihat Semua
              </button>
            </div>
            <div className="flex h-[25px] items-center text-[#8192a5] font-semibold text-[8px] px-[4px] bg-[#f8fbfd] rounded-[4px]">
              <span className="w-[125px]">Pelanggan</span>
              <span className="w-[67px]">Volume (kg)</span>
              <span className="w-[103px]">Nilai (Rp)</span>
              <span className="w-[50px]">Order</span>
            </div>
            <div className="flex flex-col overflow-y-auto">
              {[
                { name: 'ABC Restaurant', vol: '1.200', value: '20.400.000', orders: 12 },
                { name: 'Hotel Sejahtera', vol: '800', value: '12.800.000', orders: 8 },
                { name: 'PT FreshMart', vol: '500', value: '8.500.000', orders: 6 },
                { name: 'Warung Laut', vol: '200', value: '3.600.000', orders: 4 },
                { name: 'Katering Sejati', vol: '150', value: '2.700.000', orders: 3 },
              ].map((cust) => (
                <div key={cust.name} className="border-t border-[#e7eff4] flex h-[24px] items-center px-[4px] text-[8px] hover:bg-[#f8fbfd]">
                  <span className="w-[125px] text-[#173251] font-medium truncate">{cust.name}</span>
                  <span className="w-[67px] text-[#173251]">{cust.vol}</span>
                  <span className="w-[103px] text-[#173251]">{cust.value}</span>
                  <span className="w-[50px] text-[#173251]">{cust.orders}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Insight Periode Ini (5 Cards) */}
        <div className="bg-white flex flex-col gap-[9px] h-[130px] p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs w-full mt-2">
          <h3 className="font-bold text-[#173251] text-[14px]">💡 Insight Periode Ini</h3>
          <div className="flex gap-[8px] items-start w-full">
            {/* Insight 1 */}
            <div className="border border-[#e7eff4] flex flex-1 flex-col gap-[4px] p-[8px] rounded-[6px] hover:border-[#14b97c] transition">
              <span className="font-bold text-[#14b97c] text-[10px]">Produksi meningkat 8%</span>
              <p className="text-[#8192a5] text-[8px] leading-tight">
                Total panen ikan meningkat dibanding bulan lalu. Pertumbuhan terbesar berasal dari Kolam 1 dan Kolam 4.
              </p>
            </div>

            {/* Insight 2 */}
            <div className="border border-[#e7eff4] flex flex-1 flex-col gap-[4px] p-[8px] rounded-[6px] hover:border-[#f34860] transition">
              <span className="font-bold text-[#f34860] text-[10px]">Penggunaan pakan meningkat</span>
              <p className="text-[#8192a5] text-[8px] leading-tight">
                Penggunaan pakan meningkat lebih cepat daripada pertumbuhan biomassa. Perlu evaluasi pola pemberian pakan pada Kolam 3.
              </p>
            </div>

            {/* Insight 3 */}
            <div className="border border-[#e7eff4] flex flex-1 flex-col gap-[4px] p-[8px] rounded-[6px] hover:border-[#1688f8] transition">
              <span className="font-bold text-[#1688f8] text-[10px]">Hasil BSF 180 kg</span>
              <p className="text-[#8192a5] text-[8px] leading-tight">
                Sebanyak 72% hasil BSF telah dialokasikan untuk kebutuhan pakan, mengurangi pemakaian bahan pakan ikan.
              </p>
            </div>

            {/* Insight 4 */}
            <div className="border border-[#e7eff4] flex flex-1 flex-col gap-[4px] p-[8px] rounded-[6px] hover:border-[#14b97c] transition">
              <span className="font-bold text-[#14b97c] text-[10px]">Penjualan meningkat 12%</span>
              <p className="text-[#8192a5] text-[8px] leading-tight">
                Permintaan nila meningkat dan ABC Restaurant menjadi pelanggan dengan volume pembelian terbesar.
              </p>
            </div>

            {/* Insight 5 */}
            <div className="border border-[#e7eff4] flex flex-1 flex-col gap-[4px] p-[8px] rounded-[6px] hover:border-[#f69b23] transition">
              <span className="font-bold text-[#f69b23] text-[10px]">Dua pesanan berdekatan</span>
              <p className="text-[#8192a5] text-[8px] leading-tight">
                Terdapat dua pesanan dengan jadwal pengiriman yang berdekatan. Pastikan kesiapan panen dan logistik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
