'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Waves,
  ShieldCheck,
  Cpu,
  ChevronRight,
  Recycle,
} from 'lucide-react';
import { useMitraStore } from '@/store/useMitraStore';
import { formatNumberId, formatWeightKg } from '@/lib/format';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function MitraFarmDetailPage({
  params,
}: {
  params: Promise<{ farmId: string }>;
}) {
  const { farmId } = use(params);
  const { farm, ponds, devices, bsfBatches, getPondSummaryCounts } = useMitraStore();

  const pondSummary = getPondSummaryCounts();
  const totalBiomassKg = ponds.reduce(
    (acc, p) => acc + p.harvest.estimatedBiomassKg,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Header with Back Button */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/mitra/farms"
            className="p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-[17px] font-extrabold text-[#163252] leading-tight">
              Detail Tambak
            </h1>
            <p className="text-[11px] font-mono text-slate-400">
              {farmId.toUpperCase()} · {farm.partnerToken}
            </p>
          </div>
        </div>

        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </span>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Farm Profile Header Card */}
        <div className="bg-gradient-to-r from-[#1A365D] via-[#00566b] to-[#008d91] rounded-2xl p-5 text-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-white/15 text-[#a1f3de] font-mono text-[10.5px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="size-3.5" />
              Mitra Terverifikasi
            </span>
            <span className="text-[11px] text-white/80">
              {farm.sensorLastSyncedText}
            </span>
          </div>

          <div>
            <h2 className="text-[21px] font-extrabold text-white">
              {farm.name}
            </h2>
            <p className="text-[12px] text-white/85 flex items-center gap-1 mt-0.5">
              <MapPin className="size-3.5 shrink-0 text-[#00B4D8]" />
              <span>{farm.city}, {farm.province}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-center">
            <div>
              <p className="text-[10px] text-white/70">Luas Lahan</p>
              <p className="text-[13px] font-extrabold text-white mt-0.5">
                {formatNumberId(farm.totalAreaM2)} m²
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/70">Total Kolam</p>
              <p className="text-[13px] font-extrabold text-white mt-0.5">
                {ponds.length} Kolam
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/70">Biomassa Hidup</p>
              <p className="text-[13px] font-extrabold text-white mt-0.5">
                {formatWeightKg(totalBiomassKg)}
              </p>
            </div>
          </div>
        </div>

        {/* Health Status Bar */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[12px] font-bold text-[#163252]">Kondisi Kualitas Air Tambak</p>
            <p className="text-[10.5px] text-slate-500 mt-0.5">
              Evaluasi telemetri otomatis 6 kolam
            </p>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[11px]">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
              {pondSummary.baik} Baik
            </span>
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200">
              {pondSummary.perhatian} Perhatian
            </span>
            <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200">
              {pondSummary.kritis} Kritis
            </span>
          </div>
        </div>

        {/* Ponds List Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[14px] font-extrabold text-[#163252] flex items-center gap-1.5">
              <Waves className="size-4 text-[#00629b]" />
              Daftar Kolam di Tambak Ini ({ponds.length})
            </h3>
            <Link
              href="/mitra/ponds"
              className="text-[11px] font-bold text-[#00629b] hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-2.5">
            {ponds.map((p) => (
              <Link
                key={p.id}
                href={`/mitra/ponds/${p.id}`}
                className="block bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#00629b] shadow-xs transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[12px] text-[#00629b]">
                      {p.id}
                    </span>
                    <span className="text-[13px] font-bold text-[#163252] group-hover:text-[#00629b] transition">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-slate-400">· {p.species}</span>
                  </div>
                  <StatusBadge status={p.status} size="sm" />
                </div>

                <div className="grid grid-cols-4 gap-2 mt-2.5 pt-2.5 border-t border-slate-100 text-[10.5px]">
                  <div>
                    <span className="text-slate-400 block text-[9.5px]">pH</span>
                    <span className="font-bold text-slate-700">{p.telemetry.ph}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9.5px]">Suhu</span>
                    <span className="font-bold text-slate-700">{p.telemetry.temperatureC}°C</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9.5px]">DO</span>
                    <span className={`font-bold ${p.telemetry.dissolvedOxygenMgL < 4.0 ? 'text-rose-600' : 'text-slate-700'}`}>
                      {p.telemetry.dissolvedOxygenMgL} mg/L
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9.5px]">Biomassa</span>
                    <span className="font-bold text-[#00629b]">{p.harvest.estimatedBiomassKg} kg</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Circular BSF Unit Card */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[13px] font-bold text-[#163252] flex items-center gap-1.5">
              <Recycle className="size-4 text-emerald-600" />
              Fasilitas Biokonversi BSF Terintegrasi
            </h4>
            <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {bsfBatches.length} Batch Aktif
            </span>
          </div>

          <p className="text-[11.5px] text-slate-600 leading-relaxed">
            Tambak ini memproduksi pakan berprotein mandiri dari limbah organik sirkular menggunakan larva Black Soldier Fly.
          </p>

          <Link
            href="/mitra/bsf"
            className="flex items-center justify-between w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-[11.5px] font-bold text-[#00629b] transition"
          >
            <span>Buka Terminal Pengelolaan Maggot BSF</span>
            <ChevronRight className="size-4" />
          </Link>
        </div>

        {/* Connected IoT Devices Overview */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-[13px] font-bold text-[#163252] flex items-center gap-1.5">
              <Cpu className="size-4 text-[#00629b]" />
              Armada Sensor &amp; Gateway IoT ({devices.length} Unit)
            </h4>
            <Link
              href="/mitra/devices"
              className="text-[11px] font-bold text-[#00629b] hover:underline"
            >
              Kelola
            </Link>
          </div>

          <div className="space-y-1.5">
            {devices.slice(0, 3).map((d) => (
              <div
                key={d.id}
                className="p-2 bg-slate-50 rounded-lg border border-slate-150 flex items-center justify-between text-[11px]"
              >
                <div>
                  <p className="font-bold text-[#163252]">{d.name}</p>
                  <p className="text-[9.5px] text-slate-500">{d.pondName} · {d.type}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600 text-[10px]">{d.status}</span>
                  <p className="text-[9px] text-slate-400">Bat {d.batteryPct}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
