'use client';

export const dynamic = 'force-dynamic';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMitraStore } from '@/store/useMitraStore';
import { toast } from 'sonner';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Sparkles,
  Cpu,
  ArrowLeft,
} from 'lucide-react';

function PondDetailContent() {
  const params = useParams<{ id: string }>();
  const pondId = params?.id || 'POND-01';

  const { farm, ponds, resolvePondAlert } = useMitraStore();
  const pond = ponds.find((p) => p.id === pondId) || ponds[0];

  const [activeSection, setActiveSection] = useState<'ringkasan' | 'air' | 'pakan' | 'panen' | 'aktivitas'>('ringkasan');
  const [isResolving, setIsResolving] = useState(false);

  if (!pond) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-slate-500">Kolam tidak ditemukan.</p>
        <Link href="/mitra/ponds" className="mt-4 inline-block text-xs font-bold text-[#00629b]">
          Kembali ke Daftar Kolam
        </Link>
      </div>
    );
  }

  const isCritical = pond.status === 'Kritis';
  const isWarning = pond.status === 'Perhatian';

  const handleResolveAlert = () => {
    setIsResolving(true);
    setTimeout(() => {
      resolvePondAlert(pond.id);
      setIsResolving(false);
      toast.success(
        `✅ Anomali ${pond.name} berhasil ditangani! Aerasi diaktifkan dan DO meningkat ke 5,6 mg/L (Aman).`
      );
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Breadcrumb & Back */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <Link
          href="/mitra/ponds"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#00629b] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          <span>Daftar Kolam</span>
        </Link>
        <p className="text-[10px] font-normal text-[#8192a5]">
          {farm.name} › <span className="text-[#173251] font-medium">{pond.name}</span>
        </p>
      </div>

      {/* Page Heading & Status Badge */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
            {pond.name}
          </h1>
          <span
            className={`px-2.5 py-1 rounded-[5px] text-[10px] font-bold flex items-center gap-1.5 ${
              isCritical
                ? 'bg-[#fdebea] text-[#f34860] border border-[#fecdd3]'
                : isWarning
                ? 'bg-[#fff3df] text-[#f69b23] border border-[#fde68a]'
                : 'bg-[#e5f8ef] text-[#14b97c] border border-[#a7f3d0]'
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                isCritical
                  ? 'bg-[#f34860] animate-pulse'
                  : isWarning
                  ? 'bg-[#f69b23]'
                  : 'bg-[#14b97c]'
              }`}
            />
            {pond.status}
          </span>
        </div>
        <p className="text-[11px] text-[#8192a5] mt-0.5">
          {farm.name} · {pond.species} · Hari ke-{pond.cycleDay}
        </p>
        <p className="text-[10px] text-[#14b97c] font-medium mt-1">
          ● Diperbarui 2 menit lalu
        </p>
      </div>

      {/* Main Action Buttons */}
      <div className="px-4 mt-2 space-y-2">
        {isCritical || isWarning ? (
          <button
            type="button"
            disabled={isResolving}
            onClick={handleResolveAlert}
            className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center gap-1.5 shadow-sm transition active:scale-[0.99] disabled:opacity-50"
          >
            <Sparkles className="size-3.5" />
            <span>
              {isResolving
                ? 'Menerapkan Tindakan AI...'
                : 'Tandai Sudah Ditangani & Pulihkan DO'}
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => toast.info('Kondisi kolam dalam status optimal dan aman.')}
            className="w-full bg-[#14b97c] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center gap-1.5 shadow-xs"
          >
            <CheckCircle2 className="size-3.5" />
            <span>Kondisi Kolam Normal &amp; Optimal</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('ai-recommendation-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full bg-white border border-[#a9c9db] text-[#00629b] font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center transition hover:bg-slate-50 shadow-xs"
        >
          Lihat Analisis &amp; Diagnostik AI
        </button>
      </div>

      {/* Section Navigation Tabs */}
      <div className="px-4 mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {(
          [
            { id: 'ringkasan', label: 'Ringkasan' },
            { id: 'air', label: 'Kualitas Air' },
            { id: 'pakan', label: 'Pakan' },
            { id: 'panen', label: 'Panen' },
            { id: 'aktivitas', label: 'Aktivitas' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id)}
            className={`px-3 py-1.5 rounded-[5px] text-[10px] font-bold whitespace-nowrap transition border ${
              activeSection === tab.id
                ? 'bg-[#e2f3fc] border-[#a9c9db] text-[#00629b]'
                : 'bg-white border-[#e7eff4] text-[#8192a5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Live Sensor Telemetry Cards (4 Bento Metrics) */}
      <div className="px-4 mt-4">
        <h2 className="text-[14px] font-bold text-[#173251] mb-2.5">
          Kondisi Air Saat Ini
        </h2>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* pH */}
            <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs flex flex-col justify-between">
              <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="mt-2">
                <p className="text-[21px] font-bold text-[#173251] leading-none">
                  {pond.telemetry.ph.toFixed(1).replace('.', ',')}
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">pH Air</p>
                <p className="text-[9px] text-[#8192a5]">Optimal (6,5 - 8,5)</p>
              </div>
            </div>

            {/* Suhu */}
            <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs flex flex-col justify-between">
              <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="mt-2">
                <p className="text-[21px] font-bold text-[#173251] leading-none">
                  {pond.telemetry.temperatureC.toFixed(1).replace('.', ',')} °C
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">Suhu Air</p>
                <p className="text-[9px] text-[#8192a5]">Normal (28 - 30 °C)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* DO (Dissolved Oxygen) */}
            <div
              className={`rounded-[8px] p-3 shadow-xs flex flex-col justify-between border ${
                pond.telemetry.dissolvedOxygenMgL < 4.0
                  ? 'bg-[#fdebea] border-[#fecdd3]'
                  : pond.telemetry.dissolvedOxygenMgL < 5.0
                  ? 'bg-[#fff3df] border-[#fde68a]'
                  : 'bg-white border-[#e7eff4]'
              }`}
            >
              <div
                className={`size-7 rounded-full flex items-center justify-center ${
                  pond.telemetry.dissolvedOxygenMgL < 4.0
                    ? 'bg-rose-200 text-[#f34860]'
                    : pond.telemetry.dissolvedOxygenMgL < 5.0
                    ? 'bg-amber-200 text-[#f69b23]'
                    : 'bg-[#e5f8ef] text-[#14b97c]'
                }`}
              >
                {pond.telemetry.dissolvedOxygenMgL < 5.0 ? (
                  <AlertCircle className="size-4" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}
              </div>
              <div className="mt-2">
                <p
                  className={`text-[21px] font-bold leading-none ${
                    pond.telemetry.dissolvedOxygenMgL < 4.0
                      ? 'text-[#f34860]'
                      : 'text-[#173251]'
                  }`}
                >
                  {pond.telemetry.dissolvedOxygenMgL.toFixed(1).replace('.', ',')} mg/L
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Oksigen Air (DO)
                </p>
                <p
                  className={`text-[9px] ${
                    pond.telemetry.dissolvedOxygenMgL < 4.0
                      ? 'text-[#f34860] font-semibold'
                      : 'text-[#8192a5]'
                  }`}
                >
                  {pond.telemetry.dissolvedOxygenMgL < 4.0
                    ? 'Rendah (Target > 5,0)'
                    : 'Optimal (Aman)'}
                </p>
              </div>
            </div>

            {/* Kekeruhan */}
            <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs flex flex-col justify-between">
              <div className="size-7 rounded-full bg-[#fff3df] flex items-center justify-center text-[#f69b23]">
                <AlertTriangle className="size-4" />
              </div>
              <div className="mt-2">
                <p className="text-[21px] font-bold text-[#173251] leading-none">
                  {pond.telemetry.turbidityNtu} NTU
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">Kekeruhan</p>
                <p className="text-[9px] text-[#8192a5]">Perlu perhatian</p>
              </div>
            </div>
          </div>

          {/* Nitrit & Amonia */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-7 rounded-full bg-[#f4ebff] flex items-center justify-center text-[#9857e8]">
                <BarChart3 className="size-4" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#173251] leading-tight">
                  {pond.telemetry.ammoniaMgL} mg/L
                </p>
                <p className="text-[10px] font-bold text-[#173251]">Nitrit &amp; Amonia</p>
              </div>
            </div>
            <span className="text-[9.5px] px-2 py-0.5 rounded-[4px] bg-[#e2f3fc] text-[#00629b] font-medium">
              Ambang Aman (&lt; 0,05)
            </span>
          </div>
        </div>
      </div>

      {/* Critical Anomaly Notice & Recommendation Card */}
      {isCritical && (
        <div id="ai-recommendation-section" className="px-4 mt-4 space-y-2.5">
          <div className="bg-[#fdebea] border border-[#fecdd3] rounded-[8px] p-3 flex gap-2.5 items-start shadow-xs">
            <AlertCircle className="size-5 text-[#f34860] shrink-0 mt-0.5" />
            <div className="text-[11px] flex-1">
              <p className="font-bold text-[#f34860] text-[12px]">Kondisi Kritis</p>
              <p className="text-[#173251] mt-0.5 leading-relaxed">
                Kadar oksigen air rendah. Oksigen terlarut berada di bawah batas aman ({pond.telemetry.dissolvedOxygenMgL} mg/L). Segera tingkatkan aerasi untuk menjaga kelangsungan hidup ikan.
              </p>
            </div>
          </div>

          <div className="bg-[#fff3df] border border-[#fde68a] rounded-[10px] p-3 shadow-xs space-y-2">
            <h3 className="text-[14px] font-bold text-[#173251]">Saran Penanganan</h3>
            <div className="space-y-1.5 text-[11px] text-[#173251]">
              <p className="flex items-center gap-1.5">
                <span className="text-[#14b97c] font-bold">✓</span>
                <span>Tingkatkan aerasi sekarang (nyalakan kincir tambahan).</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-[#14b97c] font-bold">✓</span>
                <span>Kurangi porsi pakan sore 2 jam hingga kadar DO stabil.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-[#14b97c] font-bold">✓</span>
                <span>Pantau kembali kondisi sensor dalam 30 menit.</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResolveAlert}
                disabled={isResolving}
                className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] py-2.5 rounded-[6px] transition active:scale-[0.99] flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="size-3.5" />
                <span>
                  {isResolving
                    ? 'Memulihkan Aerasi...'
                    : 'Terapkan Rekomendasi & Selesaikan Anomali'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Perangkat Terhubung */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#173251]">
              Perangkat Terhubung
            </h3>
            <Link
              href="/mitra/devices"
              className="text-[10px] text-[#00629b] font-medium hover:underline"
            >
              Lihat Data Perangkat →
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
                <Cpu className="size-4" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#173251]">
                  FSC-SENSOR-{pond.id.replace('POND-', '00')}
                </p>
                <p className="text-[10px] text-[#8192a5]">
                  Sensor DO &amp; Kualitas Air LoRa
                </p>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold bg-[#e5f8ef] text-[#14b97c]">
              Online
            </span>
          </div>

          <p className="text-[10px] text-[#8192a5] pt-1 border-t border-slate-100">
            Data diterima 2 menit lalu · Sinyal LoRa Kuat (-68 dBm)
          </p>
        </div>
      </div>

      {/* Riwayat Kualitas Air (7-Day / 24-Hour Trend SVG Chart) */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-[#173251]">
                Riwayat Kualitas Air
              </h3>
              <p className="text-[9px] text-[#8192a5]">
                Oksigen terlarut (mg/L) — 7 hari terakhir
              </p>
            </div>
            <span className="text-[10px] text-[#00629b] font-bold">
              24 jam terakhir ⌄
            </span>
          </div>

          <p className="text-[9px] text-[#00629b]">
            <span className="font-bold">— DO {pond.name}</span> &nbsp;&nbsp;
            <span className="text-[#14b97c] font-bold">- - Batas aman: 5,0 mg/L</span>
          </p>

          {/* SVG Sparkline Chart */}
          <div className="relative w-full h-[140px] bg-slate-50/60 rounded-md p-2 flex items-center justify-center overflow-hidden border border-slate-100">
            {/* Grid & Threshold Line */}
            <div className="absolute inset-x-2 top-[50%] border-b border-dashed border-[#14b97c] z-10">
              <span className="absolute right-1 -top-3.5 text-[8px] font-bold text-[#14b97c]">
                5,0 mg/L
              </span>
            </div>

            {/* SVG Path */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 300 100"
              preserveAspectRatio="none"
            >
              {/* Trend line */}
              <polyline
                fill="none"
                stroke={isCritical ? '#f34860' : '#00629b'}
                strokeWidth="2.5"
                points="0,40 45,35 90,45 135,30 180,50 225,65 270,85 300,80"
              />
              {/* Highlight points */}
              <circle cx="270" cy="85" r="4" fill="#f34860" />
              <circle cx="300" cy="80" r="4" fill={isCritical ? '#f34860' : '#14b97c'} />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[8px] text-[#8192a5] px-1">
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kam</span>
            <span>Jum</span>
            <span>Sab</span>
            <span className="font-bold text-[#173251]">Sekarang</span>
          </div>

          <p
            className={`text-[10px] ${
              isCritical ? 'text-[#f34860]' : 'text-[#14b97c]'
            }`}
          >
            {isCritical
              ? '↓ DO menurun di bawah batas aman. Pembacaan terakhir: 3,2 mg/L.'
              : '✓ Kadar DO terpantau stabil di ambang optimal 5,6 mg/L.'}
          </p>
        </div>
      </div>

      {/* Informasi Kolam */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#173251]">
              Informasi Kolam
            </h3>
            <button
              type="button"
              onClick={() => toast.info('Mode edit konfigurasi kolam')}
              className="text-[10px] text-[#00629b] font-medium hover:underline"
            >
              Edit →
            </button>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Jenis Ikan</span>
              <span className="font-semibold text-[#173251]">{pond.species}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Umur Budidaya</span>
              <span className="font-semibold text-[#173251]">
                {pond.cycleDay} hari
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Luas Kolam</span>
              <span className="font-semibold text-[#173251]">{pond.areaM2} m²</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Populasi Awal</span>
              <span className="font-semibold text-[#173251]">
                {pond.initialPopulation.toLocaleString('id-ID')} ekor
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Fase Budidaya</span>
              <span className="font-semibold text-[#173251]">{pond.cycleStage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pakan & Pertumbuhan */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#173251]">
              Pakan &amp; Pertumbuhan
            </h3>
            <Link
              href="/mitra/feed"
              className="text-[10px] text-[#00629b] font-medium hover:underline"
            >
              Lihat Detail →
            </Link>
          </div>

          <div className="space-y-1 text-[11px]">
            <p className="text-[#8192a5]">Jadwal Berikutnya</p>
            <p className="text-[18px] font-bold text-[#173251]">
              {pond.feed.nextFeedTime} · {Math.round(pond.feed.dailyTargetKg / 2)} kg
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold bg-[#fff3df] text-[#f69b23]">
                Pakan BSF Sirkular {pond.feed.bsfMaggotSharePct}%
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <div>
              <p className="text-[#8192a5]">Bobot rata-rata ikan</p>
              <p className="text-[18px] font-bold text-[#173251] mt-0.5">
                {pond.harvest.avgWeightG} g/ekor
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#8192a5]">Survival Rate (SR)</p>
              <p className="text-[14px] font-bold text-[#14b97c] mt-0.5">
                {pond.harvest.survivalRatePct}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rencana Panen */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#173251]">
              Rencana Panen
            </h3>
            <Link
              href="/mitra/harvest"
              className="text-[10px] text-[#00629b] font-medium hover:underline"
            >
              Lihat Pasar →
            </Link>
          </div>

          <p className="text-[18px] font-bold text-[#173251]">
            {pond.harvest.windowStart} s/d {pond.harvest.windowEnd}
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold bg-[#e2f3fc] text-[#00629b]">
              {pond.harvest.readinessStatus}
            </span>
            <span className="text-[11px] text-[#8192a5]">
              Estimasi: {pond.harvest.estimatedBiomassKg} kg
            </span>
          </div>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2">
          <h3 className="text-[14px] font-bold text-[#173251]">
            Aktivitas Terbaru
          </h3>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">
                {isCritical ? 'Peringatan DO rendah' : 'Status aerasi normal'}
              </span>
              <span
                className={`font-semibold ${
                  isCritical ? 'text-[#f34860]' : 'text-[#14b97c]'
                }`}
              >
                2 menit lalu
              </span>
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

export default function PondDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 text-sm">
          Memuat data detail kolam...
        </div>
      }
    >
      <PondDetailContent />
    </Suspense>
  );
}
