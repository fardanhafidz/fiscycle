'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  ArrowLeft,
  ChevronRight,
  MoreVertical,
  SlidersHorizontal,
} from 'lucide-react';
import { useMitraStore } from '@/store/useMitraStore';
import { MitraHeader } from '@/components/mitra/MitraHeader';
import type { PondStatus } from '@/lib/types';

type FilterTab = 'Semua' | 'Baik' | 'Perhatian' | 'Kritis' | 'Offline';

export default function MitraPondsPage() {
  const ponds = useMitraStore((s) => s.ponds);
  const farm = useMitraStore((s) => s.farm);
  const getPondSummaryCounts = useMitraStore((s) => s.getPondSummaryCounts);

  const [activeTab, setActiveTab] = useState<FilterTab>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByPriority, setSortByPriority] = useState(true);

  const summary = getPondSummaryCounts();

  const filteredPonds = useMemo(() => {
    let result = ponds.filter((p) => {
      // Status filter
      if (activeTab === 'Baik' && p.status !== 'Baik') return false;
      if (activeTab === 'Perhatian' && p.status !== 'Perhatian') return false;
      if (activeTab === 'Kritis' && p.status !== 'Kritis') return false;
      if (activeTab === 'Offline') return false; // In seed, no offline pond

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = p.name.toLowerCase().includes(query);
        const speciesMatch = p.species.toLowerCase().includes(query);
        if (!nameMatch && !speciesMatch) return false;
      }

      return true;
    });

    if (sortByPriority) {
      // Sort priority: Kritis first, then Perhatian, then Baik
      const order: Record<PondStatus, number> = { Kritis: 0, Perhatian: 1, Baik: 2 };
      result = [...result].sort((a, b) => order[a.status] - order[b.status]);
    }

    return result;
  }, [ponds, activeTab, searchQuery, sortByPriority]);

  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* Top Header */}
      <MitraHeader showGreeting={false} />

      <div className="px-3 flex flex-col gap-3.5">
        {/* Breadcrumb (Figma 69:72600) */}
        <p className="text-[10px] text-[#8192a5] font-medium tracking-tight">
          Tambak &amp; Kolam › {farm.name || 'Tambak Makmur'} › Kolam
        </p>

        {/* Page Heading (Figma 69:72601) */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[21px] font-bold text-[#173251] leading-tight">
            Kolam di {farm.name || 'Tambak Makmur'}
          </h1>
          <p className="text-[11px] text-[#8192a5]">
            Lihat dan pantau kondisi setiap kolam Anda secara real-time.
          </p>
        </div>

        {/* Action Buttons (Figma 69:72604) */}
        <div className="flex flex-col gap-2">
          <Link
            href="/mitra/onboarding/ponds"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#00629b] text-white text-xs font-bold hover:bg-[#00566b] transition-colors shadow-xs"
          >
            <Plus className="size-4" />
            <span>Tambah Kolam</span>
          </Link>
          <Link
            href="/mitra/dashboard"
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-[#a9c9db] text-[#00629b] text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Filter Tabs (Figma 69:72609) */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('Semua')}
            className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all border ${
              activeTab === 'Semua'
                ? 'bg-[#e2f3fc] border-[#a9c9db] text-[#00629b]'
                : 'bg-white border-slate-200 text-[#8192a5] hover:text-slate-700'
            }`}
          >
            Semua ({summary.total})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Baik')}
            className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all border ${
              activeTab === 'Baik'
                ? 'bg-[#e5f8ef] border-[#80cfc1] text-[#14b97c]'
                : 'bg-white border-slate-200 text-[#8192a5] hover:text-slate-700'
            }`}
          >
            Baik ({summary.baik})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Perhatian')}
            className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all border ${
              activeTab === 'Perhatian'
                ? 'bg-[#fff3df] border-[#f6c27e] text-[#f69b23]'
                : 'bg-white border-slate-200 text-[#8192a5] hover:text-slate-700'
            }`}
          >
            Perlu Perhatian ({summary.perhatian})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Kritis')}
            className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all border ${
              activeTab === 'Kritis'
                ? 'bg-[#fdebea] border-rose-300 text-[#f34860]'
                : 'bg-white border-slate-200 text-[#8192a5] hover:text-slate-700'
            }`}
          >
            Kritis ({summary.kritis})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Offline')}
            className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all border ${
              activeTab === 'Offline'
                ? 'bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-white border-slate-200 text-[#8192a5] hover:text-slate-700'
            }`}
          >
            Offline (0)
          </button>
        </div>

        {/* Search Input (Figma 69:72620) */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kolam atau komoditas..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#e7eff4] rounded-lg text-xs placeholder:text-[#8192a5] text-[#173251] focus:outline-hidden focus:ring-1 focus:ring-[#00629b]"
          />
        </div>

        {/* Sort Trigger */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSortByPriority(!sortByPriority)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors border ${
              sortByPriority
                ? 'bg-[#e2f3fc] border-[#a9c9db] text-[#00629b]'
                : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            <SlidersHorizontal className="size-3" />
            <span>Prioritas Kondisi</span>
          </button>
          <span className="text-[10px] text-slate-400 font-medium">
            Menampilkan {filteredPonds.length} kolam
          </span>
        </div>

        {/* Pond Record Cards List (Figma 69:72626 to 69:72756) */}
        <div className="flex flex-col gap-3">
          {filteredPonds.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200/80">
              <p className="text-xs font-bold text-slate-700">Tidak ada kolam yang cocok</p>
              <p className="text-[11px] text-slate-400 mt-1">Coba ubah filter atau kata kunci pencarian.</p>
            </div>
          ) : (
            filteredPonds.map((pond) => {
              const isKritis = pond.status === 'Kritis';
              const isPerhatian = pond.status === 'Perhatian';

              const statusColor = isKritis
                ? 'bg-[#fdebea] text-[#f34860] border-rose-200'
                : isPerhatian
                ? 'bg-[#fff3df] text-[#f69b23] border-amber-200'
                : 'bg-[#e5f8ef] text-[#14b97c] border-emerald-200';

              const dotColor = isKritis
                ? 'bg-[#f34860]'
                : isPerhatian
                ? 'bg-[#f69b23]'
                : 'bg-[#14b97c]';

              return (
                <div
                  key={pond.id}
                  className="bg-white border border-[#e7eff4] rounded-xl p-3 flex flex-col gap-2.5 shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Identity Row */}
                  <div className="flex gap-2.5 items-center">
                    <div className="size-14 rounded-lg bg-gradient-to-tr from-slate-700 to-slate-900 flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold">
                      {pond.name}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-bold text-[13px] text-[#173251] truncate">
                          {pond.name}
                        </h3>
                        <MoreVertical className="size-3.5 text-slate-400 cursor-pointer" />
                      </div>

                      <p className="text-[10px] text-[#8192a5]">
                        {pond.species} · Hari ke-{pond.cycleDay} · {pond.cycleStage}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${statusColor}`}
                        >
                          <span className={`size-1.5 rounded-full ${dotColor} ${isKritis ? 'animate-pulse' : ''}`} />
                          {pond.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Warning summary note */}
                  <p className="text-[10px] text-slate-600 font-medium">
                    {isKritis
                      ? 'DO di bawah batas aman · Diperbarui 2 menit lalu'
                      : isPerhatian
                      ? 'Suhu air meningkat · Diperbarui 2 menit lalu'
                      : 'Kondisi air optimal & stabil · Diperbarui 2 menit lalu'}
                  </p>

                  {/* 4 Sensor Metrics */}
                  <div className="grid grid-cols-4 gap-1.5 p-2 rounded-lg bg-slate-50/70 border border-slate-100 text-[10px]">
                    <div>
                      <p className="text-[9px] text-[#8192a5]">pH</p>
                      <p className="font-bold text-[#173251]">{pond.telemetry.ph.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#8192a5]">Suhu</p>
                      <p className="font-bold text-[#173251]">
                        {pond.telemetry.temperatureC.toFixed(0)}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#8192a5]">DO</p>
                      <p className={`font-bold ${isKritis ? 'text-[#f34860]' : 'text-[#173251]'}`}>
                        {pond.telemetry.dissolvedOxygenMgL.toFixed(1)} mg/L
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#8192a5]">Kekeruhan</p>
                      <p className="font-bold text-[#173251]">
                        {pond.telemetry.turbidityNtu} NTU
                      </p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/mitra/ponds/${pond.id}`}
                    className="flex items-center justify-center py-2 px-3 rounded-lg bg-white border border-[#a9c9db] text-[#00629b] text-xs font-bold hover:bg-slate-50 transition-colors text-center"
                  >
                    <span>Lihat Detail Kolam</span>
                    <ChevronRight className="size-3.5 ml-1" />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
