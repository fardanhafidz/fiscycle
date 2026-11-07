'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMitraStore } from '@/store/useMitraStore';
import { toast } from 'sonner';
import {
  Plus,
  Download,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Scale,
  Calendar,
} from 'lucide-react';

export default function MitraFeedPage() {
  const { farm, ponds } = useMitraStore();
  const [selectedPondFilter, setSelectedPondFilter] = useState('all');

  const totalTargetKg = ponds.reduce((acc, p) => acc + (p.feed.dailyTargetKg || 0), 0);
  const totalRealizedKg = ponds.reduce((acc, p) => acc + (p.feed.realizedTodayKg || 0), 0);
  const totalRemainingKg = Math.max(0, totalTargetKg - totalRealizedKg);
  const avgWeightG = Math.round(
    ponds.reduce((acc, p) => acc + (p.harvest.avgWeightG || 0), 0) / (ponds.length || 1)
  );

  const filteredPonds = ponds.filter((p) => {
    if (selectedPondFilter !== 'all' && p.id !== selectedPondFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Kolam &amp; Ikan › <span className="text-[#173251] font-medium">Pakan &amp; Pertumbuhan</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Pakan &amp; Pertumbuhan
        </h1>
        <p className="text-[11px] text-[#8192a5] mt-0.5 leading-relaxed">
          Pantau pemberian pakan dan perkembangan pertumbuhan ikan di {farm.name}.
        </p>
      </div>

      {/* Main Action Buttons */}
      <div className="px-4 mt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => toast.info('Modal catat log pemberian pakan harian')}
          className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center gap-1.5 shadow-sm transition active:scale-[0.99]"
        >
          <Plus className="size-3.5" />
          <span>+ Catat Pakan</span>
        </button>

        <button
          type="button"
          onClick={() => toast.success('Mengunduh Laporan FCR & Pakan Mingguan (PDF)...')}
          className="w-full bg-white border border-[#a9c9db] text-[#00629b] font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center gap-1.5 shadow-xs transition hover:bg-slate-50"
        >
          <Download className="size-3.5" />
          <span>Unduh Laporan</span>
        </button>
      </div>

      {/* Pakan Section */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">Pakan</h2>
            <div className="bg-[#e2f3fc] px-2.5 py-1 rounded-[5px] text-[10px] font-semibold text-[#00629b] flex items-center gap-1">
              <Calendar className="size-3" />
              <span>Hari ini, 5 Nov 2026</span>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-2xs">
                <div className="size-7 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
                  <BarChart3 className="size-4" />
                </div>
                <div className="mt-2">
                  <p className="text-[21px] font-bold text-[#173251] leading-none">
                    {Math.round(totalTargetKg)} kg
                  </p>
                  <p className="text-[10px] font-bold text-[#173251] mt-1">Total Kebutuhan</p>
                </div>
              </div>

              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-2xs">
                <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="mt-2">
                  <p className="text-[21px] font-bold text-[#173251] leading-none">
                    {Math.round(totalRealizedKg)} kg
                  </p>
                  <p className="text-[10px] font-bold text-[#173251] mt-1">Realisasi</p>
                  <p className="text-[9px] text-[#8192a5]">
                    {Math.round((totalRealizedKg / (totalTargetKg || 1)) * 100)}% dari target
                  </p>
                </div>
              </div>
            </div>

            {/* Sisa pakan metric */}
            <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-[#fdebea] flex items-center justify-center text-[#f34860]">
                  <AlertCircle className="size-4.5" />
                </div>
                <div>
                  <p className="text-[21px] font-bold text-[#173251] leading-none">
                    {Math.round(totalRemainingKg)} kg
                  </p>
                  <p className="text-[10px] font-bold text-[#173251] mt-1">Sisa Hari Ini</p>
                </div>
              </div>
              <span className="text-[9.5px] px-2 py-0.5 rounded-[4px] bg-[#fff3df] text-[#f69b23] font-medium">
                Jadwal Sore (16:30)
              </span>
            </div>
          </div>

          {/* Jadwal & Realisasi Pakan per Kolam */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-[#173251]">
                Jadwal &amp; Realisasi Pakan
              </h3>
              <select
                value={selectedPondFilter}
                onChange={(e) => setSelectedPondFilter(e.target.value)}
                className="bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] text-[9.5px] font-bold px-2 py-1 rounded-[5px] focus:outline-none"
              >
                <option value="all">Semua Kolam ⌄</option>
                {ponds.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              {filteredPonds.map((p) => {
                const isFinished = p.feed.realizedTodayKg >= p.feed.dailyTargetKg;
                return (
                  <div
                    key={p.id}
                    className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5 space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-bold text-[#173251]">
                        {p.name}
                      </p>
                      <span
                        className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${
                          isFinished
                            ? 'bg-[#e5f8ef] text-[#14b97c]'
                            : 'bg-[#fdebea] text-[#f34860]'
                        }`}
                      >
                        {isFinished ? 'Selesai' : 'Belum Selesai'}
                      </span>
                    </div>

                    <div className="text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8192a5]">Rekomendasi</span>
                        <span className="font-semibold text-[#173251]">
                          {p.feed.dailyTargetKg} kg
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8192a5]">Pagi (09:30)</span>
                        <span className="font-semibold text-[#173251]">
                          {Math.round(p.feed.realizedTodayKg)} kg
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8192a5]">Sore (16:30)</span>
                        <span className="font-semibold text-[#173251]">
                          {isFinished
                            ? 'Selesai'
                            : `${Math.round(p.feed.dailyTargetKg - p.feed.realizedTodayKg)} kg`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#fff3df] border border-[#fde68a] rounded-[8px] p-2.5 flex items-start gap-2 mt-2">
              <Lightbulb className="size-4 text-[#f69b23] shrink-0 mt-0.5" />
              <div className="text-[11px]">
                <p className="font-bold text-[#f69b23]">Insight Pakan</p>
                <p className="text-[#173251] mt-0.5 leading-relaxed">
                  Pakan Kolam 2 disesuaikan dengan kondisi DO. Realisasi Kolam 4 menunggu verifikasi petugas lapangan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pertumbuhan Section */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">Pertumbuhan</h2>
            <span className="text-[10px] text-[#00629b] font-medium">
              Semua Kolam ⌄
            </span>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-2xs">
                <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="mt-2">
                  <p className="text-[21px] font-bold text-[#173251] leading-none">
                    {avgWeightG} g
                  </p>
                  <p className="text-[10px] font-bold text-[#173251] mt-1">Berat Rata-rata</p>
                  <p className="text-[9px] text-[#14b97c] font-semibold">+12% vs minggu lalu</p>
                </div>
              </div>

              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-2xs">
                <div className="size-7 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
                  <Scale className="size-4" />
                </div>
                <div className="mt-2">
                  <p className="text-[21px] font-bold text-[#173251] leading-none">
                    8,5 ton
                  </p>
                  <p className="text-[10px] font-bold text-[#173251] mt-1">Biomassa Estimasi</p>
                </div>
              </div>
            </div>

            <div className="bg-[#e5f8ef] border border-[#a7f3d0] rounded-[8px] p-3 flex items-center justify-between">
              <div>
                <p className="text-[21px] font-bold text-[#14b97c] leading-none">92%</p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Pertumbuhan vs Target
                </p>
              </div>
              <span className="text-[9.5px] font-semibold bg-white px-2 py-1 rounded-[4px] text-[#14b97c] shadow-2xs">
                Sesuai Target FCR
              </span>
            </div>
          </div>

          {/* Tren Pertumbuhan SVG Chart */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-[13px] font-bold text-[#173251]">
              Tren Pertumbuhan (Berat Rata-rata)
            </p>
            <p className="text-[9px] text-[#8192a5]">8 minggu terakhir</p>

            <div className="w-full h-[130px] bg-slate-50/60 rounded-md p-2 flex items-center justify-center border border-slate-100 relative">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 280 80"
                preserveAspectRatio="none"
              >
                {/* Target line */}
                <polyline
                  fill="none"
                  stroke="#a9c9db"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  points="0,70 40,60 80,50 120,40 160,32 200,24 240,16 280,10"
                />
                {/* Actual line */}
                <polyline
                  fill="none"
                  stroke="#00629b"
                  strokeWidth="2.5"
                  points="0,75 40,62 80,52 120,41 160,30 200,20 240,14 280,8"
                />
                <circle cx="280" cy="8" r="4" fill="#00629b" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[8px] text-[#8192a5] px-1">
              <span>Mgg 1</span>
              <span>Mgg 2</span>
              <span>Mgg 3</span>
              <span>Mgg 4</span>
              <span>Mgg 5</span>
              <span>Mgg 6</span>
              <span>Mgg 7</span>
              <span className="font-bold text-[#173251]">Mgg 8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rekomendasi Pakan per Kolam */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Rekomendasi Pakan per Kolam
            </h2>
            <Link
              href="/mitra/insights"
              className="text-[10px] font-medium text-[#00629b] hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="space-y-2">
            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">
                  Kolam 2 · Kurangi pakan sementara
                </p>
                <span className="px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold bg-[#fdebea] text-[#f34860]">
                  Prioritas
                </span>
              </div>
              <p className="text-[11px] text-[#8192a5] mt-1">
                DO 3,2 mg/L · Tingkatkan aerasi sebelum sesi pakan sore.
              </p>
            </div>

            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">
                  Kolam 1 &amp; Kolam 3 · Pertahankan jadwal
                </p>
                <span className="px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold bg-[#e5f8ef] text-[#14b97c]">
                  Stabil
                </span>
              </div>
              <p className="text-[11px] text-[#8192a5] mt-1">
                Pemberian pakan sesuai rencana dan pertumbuhan biomassa optimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
