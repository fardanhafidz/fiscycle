'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Waves,
  Maximize2,
  Fish,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Plus,
} from 'lucide-react';
import { MitraHeader } from '@/components/mitra/MitraHeader';
import { useMitraStore } from '@/store/useMitraStore';
import { formatNumberId, formatWeightKg } from '@/lib/format';

export default function MitraFarmsPage() {
  const { farm, ponds, devices, getPondSummaryCounts } = useMitraStore();
  const pondSummary = getPondSummaryCounts();

  const totalBiomassKg = ponds.reduce(
    (acc, p) => acc + p.harvest.estimatedBiomassKg,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <MitraHeader />

      <main className="px-4 py-4 space-y-4">
        {/* Page Title & Breadcrumb */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-extrabold text-[#163252] tracking-tight">
              Daftar Tambak Saya
            </h1>
            <p className="text-[12px] text-[#748397]">
              Kelola tambak terintegrasi sistem sensor IoT Fiscycle
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 bg-[#00629b] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition"
          >
            <Plus className="size-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        {/* Primary Active Farm Card (Figma Node 69:73085) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Card Header with Badges */}
          <div className="p-4 bg-gradient-to-r from-[#00629b] to-[#008d91] text-white">
            <div className="flex items-center justify-between">
              <span className="bg-white/20 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                <ShieldCheck className="size-3 text-[#a1f3de]" />
                {farm.partnerToken}
              </span>
              <span className="bg-[#14b97c] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                Aktif · Terhubung IoT
              </span>
            </div>

            <h2 className="text-[18px] font-extrabold text-white mt-2">
              {farm.name}
            </h2>
            <div className="flex items-center gap-1 text-[11px] text-white/80 mt-0.5">
              <MapPin className="size-3.5 shrink-0" />
              <span>
                {farm.city}, {farm.province}
              </span>
            </div>
          </div>

          {/* Metrics 4-Grid */}
          <div className="p-4 grid grid-cols-2 gap-3 bg-slate-50/50 border-b border-slate-100">
            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10.5px]">
                <Waves className="size-3.5 text-[#00629b]" />
                <span>Jumlah Kolam</span>
              </div>
              <p className="text-[15px] font-extrabold text-[#163252] mt-1">
                {ponds.length} Kolam
              </p>
              <p className="text-[9.5px] text-emerald-600 font-semibold mt-0.5">
                {pondSummary.baik} Baik · {pondSummary.perhatian} Perhatian · {pondSummary.kritis} Kritis
              </p>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10.5px]">
                <Maximize2 className="size-3.5 text-[#00629b]" />
                <span>Luas Tambak</span>
              </div>
              <p className="text-[15px] font-extrabold text-[#163252] mt-1">
                {formatNumberId(farm.totalAreaM2)} m²
              </p>
              <p className="text-[9.5px] text-slate-400 mt-0.5">
                Rata-rata 400 m² / kolam
              </p>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10.5px]">
                <Fish className="size-3.5 text-[#00629b]" />
                <span>Total Biomassa</span>
              </div>
              <p className="text-[15px] font-extrabold text-[#163252] mt-1">
                {formatWeightKg(totalBiomassKg)}
              </p>
              <p className="text-[9.5px] text-slate-400 mt-0.5">
                Komoditas Ikan Nila
              </p>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10.5px]">
                <Cpu className="size-3.5 text-[#00629b]" />
                <span>Perangkat IoT</span>
              </div>
              <p className="text-[15px] font-extrabold text-[#163252] mt-1">
                {devices.length} Unit
              </p>
              <p className="text-[9.5px] text-emerald-600 font-semibold mt-0.5">
                {farm.sensorLastSyncedText}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-3 bg-white flex items-center gap-2">
            <Link
              href={`/mitra/farms/${farm.id}`}
              className="flex-1 bg-[#1A365D] hover:bg-[#132845] text-white text-[12px] font-bold py-2.5 rounded-xl text-center shadow-xs transition"
            >
              Lihat Detail Tambak
            </Link>
            <Link
              href="/mitra/ponds"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#163252] text-[12px] font-bold py-2.5 rounded-xl text-center transition"
            >
              Daftar Kolam Tambak
            </Link>
          </div>
        </div>

        {/* Secondary Farm Card (Preview/Cabang Baru) */}
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-4 space-y-3 opacity-90">
          <div className="flex items-center justify-between">
            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Tahap Onboarding Perangkat
            </span>
            <span className="font-mono text-[10px] text-slate-400 font-semibold">
              FSC-FARM-0029
            </span>
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#163252]">
              Tambak Berkah (Ekspansi Kolam B2)
            </h3>
            <p className="text-[11.5px] text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="size-3 text-slate-400" />
              Gresik, Jawa Timur · 4 Kolam (1.600 m²)
            </p>
          </div>

          <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            Perangkat Gateway LoRa &amp; probe sensor kualitas air sedang dalam proses pengiriman dan instalasi oleh teknisi Fiscycle.
          </p>

          <Link
            href="/mitra/onboarding"
            className="flex items-center justify-between w-full text-[11.5px] font-bold text-[#00629b] pt-1 hover:underline"
          >
            <span>Cek Status Instalasi Tambak Berkah</span>
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
