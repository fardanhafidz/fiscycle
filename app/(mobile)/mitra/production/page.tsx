'use client';

import React from 'react';
import Link from 'next/link';
import { useMitraStore } from '@/store/useMitraStore';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Fish,
  Calendar,
} from 'lucide-react';

export default function MitraProductionPage() {
  const { farm, ponds, devices } = useMitraStore();

  const totalBiomassKg = ponds.reduce(
    (acc, p) => acc + (p.harvest.estimatedBiomassKg || 0),
    0
  );

  const totalDailyTargetKg = ponds.reduce(
    (acc, p) => acc + (p.feed.dailyTargetKg || 0),
    0
  );

  const totalRealizedKg = ponds.reduce(
    (acc, p) => acc + (p.feed.realizedTodayKg || 0),
    0
  );

  const onlineDevicesCount = devices.filter((d) => d.status === 'Online').length;
  const criticalPonds = ponds.filter((p) => p.status === 'Kritis');
  const warningPonds = ponds.filter((p) => p.status === 'Perhatian');
  const mendekatiPanenPonds = ponds.filter(
    (p) =>
      p.harvest.readinessStatus === 'Mendekati Panen' ||
      p.harvest.readinessStatus === 'Siap Panen'
  );

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Kolam &amp; Ikan › <span className="text-[#173251] font-medium">Ringkasan Produksi</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Ringkasan Produksi
        </h1>
        <p className="text-[11px] text-[#8192a5] mt-0.5">
          Ringkasan kondisi produksi ikan di seluruh {farm.name}.
        </p>
      </div>

      {/* Date Pill / Section Tab */}
      <div className="px-4 mt-2 flex items-center gap-2">
        <div className="bg-[#e2f3fc] border border-[#a9c9db] px-3 py-1.5 rounded-[5px] text-[10px] font-bold text-[#00629b] flex items-center gap-1.5">
          <Calendar className="size-3" />
          <span>Hari Ini · 5 Nov 2026</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="px-4 mt-3">
        <Link
          href="/mitra/cycles"
          className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center transition active:scale-[0.99] shadow-xs"
        >
          Lihat Siklus Budidaya
        </Link>
      </div>

      {/* Summary Metrics Bento (5 Cards) */}
      <div className="px-4 mt-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Metric 1 */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 flex flex-col justify-between shadow-xs">
            <div className="size-7 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
              <BarChart3 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {ponds.length}
              </p>
              <p className="text-[10px] font-bold text-[#8192a5] mt-1">Kolam Aktif</p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 flex flex-col justify-between shadow-xs">
            <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
              <CheckCircle2 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {(totalBiomassKg / 1000).toFixed(1).replace('.', ',')} ton
              </p>
              <p className="text-[10px] font-bold text-[#8192a5] mt-1">
                Biomassa Aktif (Estimasi)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Metric 3 */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 flex flex-col justify-between shadow-xs">
            <div className="size-7 rounded-full bg-[#fff3df] flex items-center justify-center text-[#f69b23]">
              <AlertTriangle className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {Math.round(totalDailyTargetKg)} kg
              </p>
              <p className="text-[10px] font-bold text-[#8192a5] mt-1">Pakan Hari Ini</p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 flex flex-col justify-between shadow-xs">
            <div className="size-7 rounded-full bg-[#f4ebff] flex items-center justify-center text-[#9857e8]">
              <Fish className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {mendekatiPanenPonds.length}
              </p>
              <p className="text-[10px] font-bold text-[#8192a5] mt-1">
                Kolam Mendekati Panen
              </p>
            </div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-[#fdebea] flex items-center justify-center text-[#f34860]">
              <AlertCircle className="size-4.5" />
            </div>
            <div>
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {criticalPonds.length + warningPonds.length}
              </p>
              <p className="text-[10px] font-bold text-[#8192a5] mt-1">
                Masalah Produksi Aktif
              </p>
            </div>
          </div>
          <Link
            href="/mitra/ponds"
            className="text-[11px] font-bold text-[#00629b] flex items-center gap-1 hover:underline"
          >
            <span>Tinjau</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Perlu Ditangani Sekarang Section */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Perlu Ditangani Sekarang
            </h2>
            <Link
              href="/mitra/ponds"
              className="text-[10px] font-medium text-[#00629b] hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          {/* Issue 1: DO rendah Kolam 2 */}
          <Link
            href="/mitra/ponds/POND-02"
            className="block bg-[#fdebea] border border-[#fecdd3] rounded-[8px] p-3 hover:shadow-xs transition"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="size-4.5 text-[#f34860] shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px]">
                <p className="font-bold text-[#f34860] text-[12px]">
                  DO rendah di Kolam 2
                </p>
                <p className="text-[#173251] mt-0.5 leading-relaxed">
                  Oksigen terlarut 3,2 mg/L, di bawah batas aman (minimal 5,0 mg/L).
                </p>
                <p className="font-bold text-[#00629b] text-[10px] mt-1">
                  2 menit lalu · Tangani Segera →
                </p>
              </div>
            </div>
          </Link>

          {/* Issue 2: Suhu tinggi Kolam 5 */}
          <Link
            href="/mitra/ponds/POND-05"
            className="block bg-[#fdebea] border border-[#fecdd3] rounded-[8px] p-3 hover:shadow-xs transition"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="size-4.5 text-[#f34860] shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px]">
                <p className="font-bold text-[#f34860] text-[12px]">
                  Suhu tinggi di Kolam 5
                </p>
                <p className="text-[#173251] mt-0.5 leading-relaxed">
                  Suhu air mencapai 30,2°C, mendekati batas toleransi atas ikan nila.
                </p>
                <p className="font-bold text-[#00629b] text-[10px] mt-1">
                  18 menit lalu · Periksa Aerasi →
                </p>
              </div>
            </div>
          </Link>

          {/* Issue 3: Pakan pagi */}
          <Link
            href="/mitra/feed"
            className="block bg-[#fff3df] border border-[#fde68a] rounded-[8px] p-3 hover:shadow-xs transition"
          >
            <div className="flex items-start gap-2.5">
              <Lightbulb className="size-4.5 text-[#f69b23] shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px]">
                <p className="font-bold text-[#f69b23] text-[12px]">
                  Pakan belum diberikan
                </p>
                <p className="text-[#173251] mt-0.5 leading-relaxed">
                  Kolam 3 · Jadwal pagi 15 kg pelet BSF belum selesai divalidasi.
                </p>
                <p className="font-bold text-[#00629b] text-[10px] mt-1">
                  1 jam lalu · Buka Jadwal Pakan →
                </p>
              </div>
            </div>
          </Link>

          <p className="text-[10px] text-[#8192a5] pt-1">
            Prioritaskan kondisi air sebelum melanjutkan pemberian pakan.
          </p>
        </div>
      </div>

      {/* Siklus Budidaya Aktif Preview */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Siklus Budidaya Aktif
            </h2>
            <Link
              href="/mitra/cycles"
              className="text-[10px] font-medium text-[#00629b] hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="space-y-2">
            {ponds.slice(0, 3).map((pond) => (
              <Link
                key={pond.id}
                href={`/mitra/ponds/${pond.id}`}
                className="block bg-white border border-[#e7eff4] rounded-[7px] p-2.5 hover:shadow-xs transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-[#173251]">
                      {pond.name}
                    </p>
                    <p className="text-[10px] text-[#8192a5] mt-0.5">
                      {pond.species} · {pond.cycleStage} · Hari ke-{pond.cycleDay}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${
                      pond.status === 'Kritis'
                        ? 'bg-[#fdebea] text-[#f34860]'
                        : pond.status === 'Perhatian'
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-[#e5f8ef] text-[#14b97c]'
                    }`}
                  >
                    {pond.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Panen Terdekat Section */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Panen Terdekat
            </h2>
            <Link
              href="/mitra/harvest"
              className="text-[10px] font-medium text-[#00629b] hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="space-y-2">
            {mendekatiPanenPonds.length > 0 ? (
              mendekatiPanenPonds.map((pond) => (
                <div
                  key={pond.id}
                  className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[12px] font-bold text-[#173251]">
                      {pond.name}
                    </p>
                    <p className="text-[10px] text-[#8192a5] mt-0.5">
                      Target {pond.harvest.windowStart} (± 11 hari lagi)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold bg-[#fff3df] text-[#f69b23]">
                      {pond.harvest.readinessStatus}
                    </span>
                    <p className="text-[11px] font-bold text-[#173251] mt-1">
                      ≈ {(pond.harvest.estimatedBiomassKg / 1000).toFixed(1).replace('.', ',')} ton
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-[#8192a5]">
                Belum ada kolam dalam fase panen terdekat.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Kondisi Produksi per Kolam (Deep-dive) */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Kondisi Produksi per Kolam
            </h2>
            <Link
              href="/mitra/ponds"
              className="text-[10px] font-medium text-[#00629b] hover:underline"
            >
              Lihat Semua Kolam →
            </Link>
          </div>

          <div className="space-y-2">
            {ponds.slice(0, 3).map((pond) => (
              <div
                key={pond.id}
                className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold text-[#173251]">
                    {pond.name}
                  </p>
                  <span
                    className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${
                      pond.status === 'Kritis'
                        ? 'bg-[#fdebea] text-[#f34860]'
                        : pond.status === 'Perhatian'
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-[#e5f8ef] text-[#14b97c]'
                    }`}
                  >
                    {pond.status}
                  </span>
                </div>

                <div className="text-[11px] space-y-1 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8192a5]">Fase Budidaya</span>
                    <span className="font-semibold text-[#173251]">
                      {pond.cycleStage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8192a5]">Hari Siklus</span>
                    <span className="font-semibold text-[#173251]">
                      Hari ke-{pond.cycleDay}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8192a5]">Biomassa Aktif</span>
                    <span className="font-semibold text-[#173251]">
                      {pond.harvest.estimatedBiomassKg} kg
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aktivitas Hari Ini */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Aktivitas Hari Ini
          </h2>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Realisasi pakan</span>
              <span className="font-semibold text-[#173251]">
                {Math.round(totalRealizedKg)} / {Math.round(totalDailyTargetKg)} kg
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Pakan tersisa</span>
              <span className="font-semibold text-[#173251]">
                {Math.max(0, Math.round(totalDailyTargetKg - totalRealizedKg))} kg
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Perangkat online</span>
              <span className="font-semibold text-[#173251]">
                {onlineDevicesCount} / {devices.length}
              </span>
            </div>
          </div>

          <div className="bg-[#fff3df] border border-[#fde68a] rounded-[8px] p-2.5 flex items-start gap-2 mt-2">
            <Lightbulb className="size-4 text-[#f69b23] shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <p className="font-bold text-[#f69b23]">Lanjutkan jadwal pakan sore</p>
              <p className="text-[#173251] mt-0.5">
                Sesuaikan pakan Kolam 2 dengan kondisi DO terkini.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Informative Callout */}
      <div className="px-4 mt-4">
        <div className="bg-[#e2f3fc] border border-[#bae6fd] rounded-[8px] p-3 flex items-start gap-2.5">
          <CheckCircle2 className="size-4.5 text-[#00629b] shrink-0 mt-0.5" />
          <div className="text-[11px]">
            <p className="font-bold text-[#00629b] text-[12px]">
              Produksi terpantau, keputusan lebih tepat
            </p>
            <p className="text-[#173251] mt-0.5">
              Data sensor terakhir diterima 2 menit lalu · {ponds.length} kolam di {farm.name}.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA to IoT Devices */}
      <div className="px-4 mt-4">
        <Link
          href="/mitra/devices"
          className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center transition active:scale-[0.99] shadow-xs"
        >
          Lihat Data Perangkat
        </Link>
      </div>
    </div>
  );
}
