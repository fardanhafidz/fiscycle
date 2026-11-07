'use client';

import React from 'react';
import Link from 'next/link';
import {
  Waves,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  Droplet,
  Thermometer,
  Wind,
  FlaskConical,
  Clock,
  TrendingUp,
  Handshake,
  Server,
  ArrowRight,
} from 'lucide-react';
import { useMitraStore } from '@/store/useMitraStore';
import { MitraHeader } from '@/components/mitra/MitraHeader';

export default function MitraDashboardPage() {
  const ponds = useMitraStore((s) => s.ponds);
  const getPondSummaryCounts = useMitraStore((s) => s.getPondSummaryCounts);
  const resolvePondAlert = useMitraStore((s) => s.resolvePondAlert);

  const summary = getPondSummaryCounts();
  const criticalPond = ponds.find((p) => p.status === 'Kritis');

  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* Top Header & Farm Greeting (Figma 35:5243 & 35:5251) */}
      <MitraHeader showGreeting={true} />

      {/* 4-Bento Summary Metrics (Figma 35:5259) */}
      <section className="px-3" aria-label="Ringkasan Kolam">
        <div className="grid grid-cols-4 gap-2">
          {/* Total Kolam */}
          <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-200/80 shadow-xs">
            <div className="size-7 rounded-full bg-[#e2f3fc] text-[#00629b] flex items-center justify-center mb-1">
              <Waves className="size-4" />
            </div>
            <span className="font-extrabold text-[17px] text-[#173251] leading-none">
              {summary.total}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
              Kolam
            </span>
          </div>

          {/* Kolam Kondisi Baik */}
          <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-200/80 shadow-xs">
            <div className="size-7 rounded-full bg-[#e5f8ef] text-[#14b97c] flex items-center justify-center mb-1">
              <CheckCircle2 className="size-4" />
            </div>
            <span className="font-extrabold text-[17px] text-[#173251] leading-none">
              {summary.baik}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
              Baik
            </span>
          </div>

          {/* Kolam Perlu Perhatian */}
          <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-200/80 shadow-xs">
            <div className="size-7 rounded-full bg-[#fff3df] text-[#f69b23] flex items-center justify-center mb-1">
              <AlertTriangle className="size-4" />
            </div>
            <span className="font-extrabold text-[17px] text-[#173251] leading-none">
              {summary.perhatian}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
              Perhatian
            </span>
          </div>

          {/* Kolam Kritis */}
          <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-200/80 shadow-xs">
            <div className="size-7 rounded-full bg-[#fdebea] text-[#f34860] flex items-center justify-center mb-1">
              <AlertCircle className="size-4" />
            </div>
            <span className="font-extrabold text-[17px] text-[#173251] leading-none">
              {summary.kritis}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
              Kritis
            </span>
          </div>
        </div>
      </section>

      {/* Urgent Anomaly Alert Card (Figma 35:5281) */}
      {criticalPond && (
        <section className="px-3" aria-label="Peringatan Kritis">
          <div className="bg-[#fdebea] border border-rose-200 rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#f34860]">
                <AlertCircle className="size-4 animate-bounce" />
                <span className="text-[10px] font-extrabold tracking-wider uppercase">
                  PERLU DITANGANI SEKARANG
                </span>
              </div>
              <Link
                href={`/mitra/ponds/${criticalPond.id}`}
                className="text-[#f34860] hover:text-[#d32742] transition-colors"
                aria-label="Buka detail kolam kritis"
              >
                <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-16 rounded-xl bg-slate-200 flex-shrink-0 overflow-hidden relative border border-slate-300">
                <div className="size-full bg-gradient-to-tr from-cyan-900 to-sky-700 flex items-center justify-center text-white text-[10px] font-bold">
                  {criticalPond.name}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-[15px] text-[#173251] truncate">
                    {criticalPond.name}
                  </h3>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#fdebea] text-[#f34860] border border-rose-300">
                    <span className="size-1.5 rounded-full bg-[#f34860]" />
                    Kritis
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-[#173251]">
                  Kadar oksigen air rendah
                </p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[10px] text-slate-500 font-medium">Oksigen (DO):</span>
                  <span className="text-[18px] font-extrabold text-[#f34860] leading-none">
                    {criticalPond.telemetry.dissolvedOxygenMgL.toFixed(1)}
                  </span>
                  <span className="text-[10px] font-bold text-[#f34860]">mg/L ↓</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-0.5">
              <Link
                href={`/mitra/ponds/${criticalPond.id}`}
                className="flex items-center justify-center py-2 px-3 rounded-xl bg-[#00629b] text-white text-[11px] font-bold hover:bg-[#00566b] transition-colors text-center"
              >
                Lihat Analisis
              </Link>
              <button
                type="button"
                onClick={() => resolvePondAlert(criticalPond.id)}
                className="flex items-center justify-center py-2 px-3 rounded-xl bg-white border border-[#a9c9db] text-[#00629b] text-[11px] font-bold hover:bg-slate-50 transition-colors"
              >
                Tandai Ditangani
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Kondisi Semua Kolam (Figma 35:5303) */}
      <section className="px-3" aria-label="Kondisi Semua Kolam">
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[13px] text-[#173251]">
              Kondisi Semua Kolam
            </h2>
            <Link
              href="/mitra/ponds"
              className="text-[10px] font-semibold text-[#00629b] hover:underline flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
            {ponds.map((pond) => {
              const isKritis = pond.status === 'Kritis';
              const isPerhatian = pond.status === 'Perhatian';

              return (
                <Link
                  key={pond.id}
                  href={`/mitra/ponds/${pond.id}`}
                  className="flex-shrink-0 w-[110px] p-2 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col gap-1.5 bg-slate-50/50"
                >
                  <div className="h-12 rounded-lg bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                    {pond.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] text-[#173251] truncate">
                      {pond.name}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-bold self-start ${
                      isKritis
                        ? 'bg-[#fdebea] text-[#f34860]'
                        : isPerhatian
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-[#e5f8ef] text-[#14b97c]'
                    }`}
                  >
                    <span
                      className={`size-1 rounded-full ${
                        isKritis
                          ? 'bg-[#f34860]'
                          : isPerhatian
                          ? 'bg-[#f69b23]'
                          : 'bg-[#14b97c]'
                      }`}
                    />
                    {pond.status}
                  </span>

                  <div className="space-y-0.5 pt-1 border-t border-slate-200/60 text-[9px] text-slate-500">
                    <div className="flex justify-between">
                      <span>pH</span>
                      <span className="font-semibold text-slate-800">
                        {pond.telemetry.ph.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Suhu</span>
                      <span className="font-semibold text-slate-800">
                        {pond.telemetry.temperatureC.toFixed(0)}°C
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>DO</span>
                      <span
                        className={`font-semibold ${
                          isKritis ? 'text-[#f34860] font-bold' : 'text-slate-800'
                        }`}
                      >
                        {pond.telemetry.dissolvedOxygenMgL.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kualitas Air Hari Ini (Figma 40:4) */}
      <section className="px-3" aria-label="Kualitas Air Hari Ini">
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[13px] text-[#173251]">
              Kualitas Air Hari Ini
            </h2>
            <Link
              href="/mitra/reports"
              className="text-[10px] font-semibold text-[#00629b] hover:underline flex items-center gap-0.5"
            >
              <span>Lihat Detail</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* pH */}
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#e2f3fc] text-[#00629b] flex items-center justify-center flex-shrink-0">
                <Droplet className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[11px] text-[#173251]">pH Air</p>
                <p className="text-[9px] text-[#8192a5]">5 dari 6 kolam optimal</p>
                <div className="h-1.5 w-full bg-[#e6f0f4] rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-[#14b97c] rounded-full" style={{ width: '83%' }} />
                </div>
              </div>
            </div>

            {/* Suhu */}
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#e2f3fc] text-[#00629b] flex items-center justify-center flex-shrink-0">
                <Thermometer className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[11px] text-[#173251]">Suhu Air</p>
                <p className="text-[9px] text-[#8192a5]">Semua kolam normal</p>
                <div className="h-1.5 w-full bg-[#e6f0f4] rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-[#14b97c] rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            {/* DO */}
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#fdebea] text-[#f34860] flex items-center justify-center flex-shrink-0">
                <Wind className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[11px] text-[#173251]">Oksigen Air (DO)</p>
                <p className="text-[9px] text-[#8192a5]">{criticalPond ? '1 kolam kritis' : 'Semua kolam aman'}</p>
                <div className="h-1.5 w-full bg-[#e6f0f4] rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full rounded-full ${criticalPond ? 'bg-[#f34860]' : 'bg-[#14b97c]'}`}
                    style={{ width: criticalPond ? '35%' : '90%' }}
                  />
                </div>
              </div>
            </div>

            {/* Kekeruhan & Kimia */}
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#fff3df] text-[#f69b23] flex items-center justify-center flex-shrink-0">
                <FlaskConical className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[11px] text-[#173251]">Nitrit &amp; Amonia</p>
                <p className="text-[9px] text-[#8192a5]">1 kolam meningkat</p>
                <div className="h-1.5 w-full bg-[#e6f0f4] rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-[#f69b23] rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rekomendasi untuk Tambakmu (Figma 40:56) */}
      <section className="px-3" aria-label="Rekomendasi AI">
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[13px] text-[#173251]">
              Rekomendasi untuk Tambakmu
            </h2>
            <Link
              href="/mitra/insights"
              className="text-[10px] font-semibold text-[#00629b] hover:underline flex items-center gap-0.5"
            >
              <span>Lihat Detail</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="space-y-1.5 text-xs">
            {/* Rekomendasi Kolam 2 */}
            <div className="bg-[#fff1f2] border border-rose-100 rounded-xl p-2.5 flex items-center gap-2.5">
              <AlertCircle className="size-4 text-[#f34860] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[11px] text-[#173251]">Kolam 2</p>
                <p className="text-[10px] text-slate-600 truncate">
                  Tingkatkan aerasi sekarang dan tunda pakan sore.
                </p>
              </div>
            </div>

            {/* Rekomendasi Kolam 3 */}
            <div className="bg-[#fff7e9] border border-amber-100 rounded-xl p-2.5 flex items-center gap-2.5">
              <AlertTriangle className="size-4 text-[#f69b23] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[11px] text-[#173251]">Kolam 3</p>
                <p className="text-[10px] text-slate-600 truncate">
                  Periksa kekeruhan air, amati sisa pakan di dasar kolam.
                </p>
              </div>
            </div>

            {/* Rekomendasi Kolam 1 */}
            <div className="bg-[#edfaf5] border border-emerald-100 rounded-xl p-2.5 flex items-center gap-2.5">
              <CheckCircle2 className="size-4 text-[#14b97c] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[11px] text-[#173251]">Kolam 1</p>
                <p className="text-[10px] text-slate-600 truncate">
                  Kondisi stabil, pertahankan jadwal pelet BSF seperti biasa.
                </p>
              </div>
            </div>
          </div>

          <p className="text-[9px] text-[#8192a5]">
            Rekomendasi diperbarui mengikuti data sensor dan aktivitas tambak.
          </p>
        </div>
      </section>

      {/* Operasional: Pakan & Pertumbuhan (Figma 40:80) */}
      <section className="px-3" aria-label="Operasional Tambak">
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[13px] text-[#173251]">
              Pakan &amp; Pertumbuhan
            </h2>
            <Link
              href="/mitra/feed"
              className="text-[10px] font-semibold text-[#00629b] hover:underline flex items-center gap-0.5"
            >
              <span>Lihat Detail</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="flex items-center justify-between bg-slate-50/70 p-2 rounded-xl border border-slate-100">
            <div>
              <p className="text-[11px] font-bold text-[#173251]">Pakan Hari Ini</p>
              <p className="text-[9px] text-[#8192a5]">3 dari 5 jadwal selesai (12,5 / 18 kg)</p>
            </div>
            <span className="text-[10px] font-extrabold text-[#14b97c] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              35% BSF Maggot
            </span>
          </div>

          <div className="flex items-center justify-between bg-sky-50/60 p-2 rounded-xl border border-sky-100">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-[#00629b]" />
              <div>
                <p className="text-[10px] font-bold text-[#173251]">Jadwal Pakan Berikutnya</p>
                <p className="text-[9px] text-[#8192a5]">Kolam 2 · 16:30 WIB (4 kg)</p>
              </div>
            </div>
            <Link
              href="/mitra/bsf"
              className="text-[10px] font-bold text-[#00629b] hover:underline"
            >
              Alokasikan Pakan ›
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-[9px]">
            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
              <p className="font-bold text-slate-800">Kolam 1</p>
              <p className="text-emerald-700 font-semibold">Sesuai target</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
              <p className="font-bold text-slate-800">Kolam 2</p>
              <p className="text-amber-700 font-semibold">Perlu perhatian</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
              <p className="font-bold text-slate-800">Kolam 3</p>
              <p className="text-emerald-700 font-semibold">Sesuai target</p>
            </div>
          </div>
        </div>
      </section>

      {/* Panen & Peluang Penjualan (Figma 40:118 & 40:130) */}
      <section className="px-3" aria-label="Panen dan Pasar">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Panen Terdekat */}
          <Link
            href="/mitra/harvest"
            className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[12px] text-[#173251]">Panen Terdekat</span>
                <TrendingUp className="size-3.5 text-slate-400" />
              </div>
              <p className="text-[13px] font-bold text-[#00629b]">Kolam 4 (Nila)</p>
              <p className="text-[10px] text-slate-500">15–18 Nov 2026</p>
              <p className="text-[11px] font-extrabold text-[#173251] mt-1">Est. 1,2 Ton</p>
            </div>
            <span className="text-[9px] font-bold text-[#f69b23] mt-2 inline-block">
              Mendekati Panen ›
            </span>
          </Link>

          {/* Peluang Penjualan Buyer */}
          <Link
            href="/mitra/harvest"
            className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[12px] text-[#173251]">Peluang Buyer</span>
                <Handshake className="size-3.5 text-[#00629b]" />
              </div>
              <p className="text-[11px] font-bold text-slate-800">Restoran Surya</p>
              <p className="text-[10px] text-slate-500">Nila 300-500g</p>
              <p className="text-[11px] font-extrabold text-[#14b97c] mt-1">Butuh 500 kg</p>
            </div>
            <span className="text-[9px] font-bold text-[#00629b] mt-2 inline-block">
              Tinjau Kontrak ›
            </span>
          </Link>
        </div>
      </section>

      {/* Status Perangkat IoT (Figma 40:147) */}
      <section className="px-3" aria-label="Status Perangkat">
        <Link
          href="/mitra/devices"
          className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all block"
        >
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Server className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#173251]">Status Perangkat IoT</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[10px] text-slate-500">6 dari 6 sensor aktif · Data 2 menit lalu</p>
            </div>
          </div>
          <ChevronRight className="size-4 text-slate-400" />
        </Link>
      </section>
    </div>
  );
}
