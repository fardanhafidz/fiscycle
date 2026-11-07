'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMitraStore } from '@/store/useMitraStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import {
  Search,
  Leaf,
  CheckCircle2,
  BarChart3,
  AlertTriangle,
  Scale,
  Calendar,
} from 'lucide-react';

export default function MitraBsfPage() {
  const { bsfBatches, bsfFeedAllocations } = useMitraStore();
  const { contributions } = useWastePointStore();

  const [activeTab, setActiveTab] = useState<'sampah' | 'bsf' | 'pakan'>('sampah');
  const [searchQuery, setSearchQuery] = useState('');

  const totalBiowasteKg = contributions.reduce(
    (acc, c) => acc + (c.actualKg || c.estimatedKg || 0),
    0
  );

  const totalHarvestedMaggotKg = bsfBatches.reduce(
    (acc, b) => acc + (b.harvestedMaggotKg || b.estimatedMaggotYieldKg || 0),
    0
  );

  const totalAllocatedKg = bsfFeedAllocations.reduce(
    (acc, a) => acc + (a.maggotKg || 0),
    0
  );

  const availableMaggotKg = Math.max(0, totalHarvestedMaggotKg - totalAllocatedKg);

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Sirkular › <span className="text-[#173251] font-medium">BSF &amp; Sirkular</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          BSF &amp; Sirkular
        </h1>
        <p className="text-[11px] text-[#8192a5] mt-0.5 leading-relaxed">
          Ubah sampah organik menjadi pakan, untuk tambak yang lebih berkelanjutan.
        </p>
      </div>

      {/* Search Input */}
      <div className="px-4 mt-2">
        <div className="bg-white border border-[#e7eff4] rounded-[7px] px-3 py-2 flex items-center gap-2 shadow-xs">
          <Search className="size-4 text-[#8192a5] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari batch, input organik, atau informasi BSF..."
            className="w-full text-[11px] text-[#173251] placeholder:text-[#8192a5] focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Hero Visual Pill */}
      <div className="px-4 mt-3">
        <div className="h-[90px] rounded-[8px] bg-gradient-to-r from-[#00566b] via-[#008d91] to-[#14b97c] p-3.5 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">
              Siklus Biokonversi Maggot
            </span>
            <Leaf className="size-5 text-white/80" />
          </div>
          <div>
            <p className="text-[15px] font-bold leading-tight">
              Biowaste {totalBiowasteKg} kg → Pakan Berprotein Tinggi
            </p>
            <p className="text-[10px] opacity-80 mt-0.5">
              Efisiensi biaya pakan tambak hemat hingga 35%.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {(
          [
            { id: 'sampah', label: 'Sampah Organik' },
            { id: 'bsf', label: 'Budidaya BSF' },
            { id: 'pakan', label: 'Pakan untuk Ikan' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-[5px] text-[10px] font-bold whitespace-nowrap transition border ${
              activeTab === tab.id
                ? 'bg-[#e2f3fc] border-[#a9c9db] text-[#00629b]'
                : 'bg-white border-[#e7eff4] text-[#8192a5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Metrics (6 Bento Cards) */}
      <div className="px-4 mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Batch Aktif */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
              <CheckCircle2 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {bsfBatches.length}
              </p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">Batch Aktif</p>
              <p className="text-[9px] text-[#8192a5]">1 mendekati panen</p>
            </div>
          </div>

          {/* Bahan Organik */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
              <BarChart3 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {totalBiowasteKg} kg
              </p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Bahan Organik Diproses
              </p>
              <p className="text-[9px] text-[#8192a5]">Minggu ini</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Batch Normal */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
              <CheckCircle2 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">2</p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">Batch Normal</p>
              <p className="text-[9px] text-[#14b97c] font-medium">Kondisi optimal</p>
            </div>
          </div>

          {/* Perlu Perhatian */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#fff3df] flex items-center justify-center text-[#f69b23]">
              <AlertTriangle className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">1</p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Perlu Perhatian
              </p>
              <p className="text-[9px] text-[#f69b23]">BSF-04 (Suhu 34°C)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Estimasi Panen BSF */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#f4ebff] flex items-center justify-center text-[#9857e8]">
              <Scale className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {totalHarvestedMaggotKg} kg
              </p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Estimasi Panen BSF
              </p>
              <p className="text-[9px] text-[#8192a5]">Dalam 2 minggu</p>
            </div>
          </div>

          {/* Panen Terdekat */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
              <Calendar className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">1</p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Panen dalam 5 hari
              </p>
              <p className="text-[9px] text-[#00629b]">Batch BSF-02</p>
            </div>
          </div>
        </div>
      </div>

      {/* Perlu Ditangani Sekarang */}
      <div className="px-4 mt-4">
        <div className="bg-[#fdebea] border border-[#fecdd3] rounded-[10px] p-3 shadow-xs space-y-2">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Perlu Ditangani Sekarang
          </h2>

          <div className="space-y-2">
            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">BSF-04</p>
                <span className="text-[10px] text-[#8192a5]">3 jam lalu</span>
              </div>
              <p className="text-[11px] text-[#f34860] font-medium mt-1">
                Suhu media lebih tinggi dari normal (34°C)
              </p>
            </div>

            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">BSF-02</p>
                <span className="text-[10px] text-[#8192a5]">6 jam lalu</span>
              </div>
              <p className="text-[11px] text-[#f69b23] font-medium mt-1">
                Kelembapan rendah (48%)
              </p>
            </div>

            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">Input IN-0045</p>
                <span className="text-[10px] text-[#8192a5]">8 jam lalu</span>
              </div>
              <p className="text-[11px] text-[#00629b] font-medium mt-1">
                Menunggu verifikasi kualitas bahan (ABC Restaurant)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Batch BSF Aktif */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Batch BSF Aktif
            </h2>
            <Link
              href="/mitra/bsf/allocate"
              className="text-[10px] font-bold text-[#00629b] hover:underline"
            >
              + Alokasikan ke Kolam →
            </Link>
          </div>

          <div className="space-y-2">
            {bsfBatches.map((batch) => (
              <div
                key={batch.id}
                className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-[6px] bg-[#e2f3fc] flex items-center justify-center font-bold text-[11px] text-[#00629b]">
                      {batch.id}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#173251]">
                        {batch.name}
                      </p>
                      <p className="text-[10px] text-[#8192a5]">
                        Hari {batch.dayOfCycle}/14 · Suhu: {batch.mediaTempC}°C · Kelembaban: {batch.mediaHumidityPct}%
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${
                      batch.status === 'Siap Panen'
                        ? 'bg-[#e5f8ef] text-[#14b97c]'
                        : batch.status === 'Perhatian'
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-[#e2f3fc] text-[#00629b]'
                    }`}
                  >
                    {batch.status}
                  </span>
                </div>

                <div className="text-[11px] space-y-1 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8192a5]">Input Sampah Organik</span>
                    <span className="font-semibold text-[#173251]">
                      {batch.organicInputTotalKg} kg
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8192a5]">Estimasi Hasil Maggot</span>
                    <span className="font-semibold text-[#173251]">
                      {batch.estimatedMaggotYieldKg} kg (Panen: {batch.harvestedMaggotKg} kg)
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href={`/mitra/bsf/allocate?batchId=${batch.id}`}
                    className="w-full bg-[#f3f9fc] hover:bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] font-bold text-[11px] py-1.5 rounded-[5px] flex items-center justify-center transition"
                  >
                    Alokasikan Pakan ke Kolam
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alur Sirkular Minggu Ini */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Alur Sirkular Minggu Ini
          </h2>

          <div className="bg-slate-50 border border-slate-200/80 rounded-[8px] p-3 text-center space-y-2">
            <div>
              <p className="text-[18px] font-bold text-[#173251]">
                {totalBiowasteKg} kg
              </p>
              <p className="text-[10px] text-[#8192a5]">Sampah Organik Terkumpul</p>
            </div>

            <p className="text-[#14b97c] font-bold text-[16px] leading-none">↓</p>

            <div className="flex items-center justify-around text-[11px] pt-1 border-t border-slate-200">
              <div>
                <span className="text-[#8192a5]">Sudah Diproses</span>
                <p className="font-bold text-[#173251]">270 kg</p>
              </div>
              <div>
                <span className="text-[#8192a5]">Hasil Maggot BSF</span>
                <p className="font-bold text-[#14b97c]">{totalHarvestedMaggotKg} kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pemanfaatan Hasil BSF untuk Pakan Ikan */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Pemanfaatan Hasil BSF
            </h2>
            <Link
              href="/mitra/bsf/allocate"
              className="text-[10px] font-bold text-[#00629b] hover:underline"
            >
              Kelola Alokasi →
            </Link>
          </div>

          <p className="text-[24px] font-bold text-[#173251] leading-none">
            {totalHarvestedMaggotKg} kg
          </p>
          <p className="text-[10px] text-[#8192a5]">Total hasil BSF (panen)</p>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Dialokasikan ke pakan ikan</span>
              <span className="font-semibold text-[#00629b]">
                {totalAllocatedKg} kg ·{' '}
                {Math.round((totalAllocatedKg / (totalHarvestedMaggotKg || 1)) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Tersedia</span>
              <span className="font-semibold text-[#14b97c]">
                {availableMaggotKg} kg ·{' '}
                {Math.round((availableMaggotKg / (totalHarvestedMaggotKg || 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* Horizontal Linear Progress Bar */}
          <div className="w-full bg-[#e7eff4] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#14b97c] h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (totalAllocatedKg / (totalHarvestedMaggotKg || 1)) * 100
                )}%`,
              }}
            />
          </div>

          {/* Alokasi ke Kolam Summary */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
            <p className="font-bold text-[#173251]">Alokasi ke Kolam</p>
            {bsfFeedAllocations.slice(0, 4).map((alloc) => (
              <div key={alloc.id} className="flex items-center justify-between text-[#8192a5]">
                <span>{alloc.pondName}</span>
                <span className="font-semibold text-[#173251]">
                  {alloc.maggotKg} kg
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/mitra/bsf/allocate"
              className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center transition active:scale-[0.99] shadow-xs"
            >
              Alokasikan Pakan ke Kolam
            </Link>
          </div>
        </div>
      </div>

      {/* Input Organik Terverifikasi */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Input Organik Terverifikasi
            </h2>
            <span className="text-[10px] text-[#00629b] font-medium">
              Lihat Semua
            </span>
          </div>

          <div className="space-y-2">
            {contributions.slice(0, 4).map((contrib) => (
              <div
                key={contrib.id}
                className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5 flex items-center justify-between"
              >
                <div>
                  <p className="text-[12px] font-bold text-[#173251]">
                    {contrib.id} · {contrib.contributorName}
                  </p>
                  <p className="text-[10px] text-[#8192a5] mt-0.5">
                    {contrib.actualKg || contrib.estimatedKg} kg · {contrib.category}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${
                    contrib.status === 'Diterima'
                      ? 'bg-[#e5f8ef] text-[#14b97c]'
                      : 'bg-[#fdebea] text-[#f34860]'
                  }`}
                >
                  {contrib.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dampak Sirkular */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Dampak Sirkular
          </h2>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
                <p className="text-[21px] font-bold text-[#173251] leading-none">
                  {totalBiowasteKg} kg
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Sampah dimanfaatkan
                </p>
                <p className="text-[9px] text-[#14b97c] font-semibold">↑ 12% vs bln lalu</p>
              </div>

              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
                <p className="text-[21px] font-bold text-[#173251] leading-none">
                  {Math.round(totalBiowasteKg * 1.5)} kg
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Emisi Terhindari
                </p>
                <p className="text-[9px] text-[#14b97c] font-semibold">↑ 18% reduksi CO2e</p>
              </div>
            </div>

            <div className="bg-[#e5f8ef] border border-[#a7f3d0] rounded-[8px] p-3 flex items-center justify-between">
              <div>
                <p className="text-[21px] font-bold text-[#14b97c] leading-none">
                  100%
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Bahan Organik Terverifikasi
                </p>
              </div>
              <span className="text-[10px] text-[#14b97c] font-semibold bg-white px-2 py-1 rounded-[4px] shadow-2xs">
                Sesuai Standar Mutu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
