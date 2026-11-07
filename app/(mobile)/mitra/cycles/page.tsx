'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMitraStore } from '@/store/useMitraStore';
import {
  Search,
  Plus,
  ChevronDown,
  Lightbulb,
  ArrowUpRight,
  Fish,
} from 'lucide-react';
import type { CycleStage } from '@/lib/types';

const STAGE_ORDER: CycleStage[] = [
  'Persiapan',
  'Tebar Benih',
  'Pertumbuhan',
  'Menjelang Panen',
  'Siap Panen',
];

const STAGE_THEMES: Record<
  CycleStage,
  {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    dotBg: string;
  }
> = {
  Persiapan: {
    bg: 'bg-[#e2f3fc]',
    border: 'border-[#a9c9db]',
    badgeBg: 'bg-[#e2f3fc]',
    badgeText: 'text-[#00629b]',
    dotBg: 'bg-[#00629b]',
  },
  'Tebar Benih': {
    bg: 'bg-[#e2f3fc]',
    border: 'border-[#a9c9db]',
    badgeBg: 'bg-[#e2f3fc]',
    badgeText: 'text-[#00629b]',
    dotBg: 'bg-[#00629b]',
  },
  Pertumbuhan: {
    bg: 'bg-[#e5f8ef]',
    border: 'border-[#a7f3d0]',
    badgeBg: 'bg-[#e5f8ef]',
    badgeText: 'text-[#14b97c]',
    dotBg: 'bg-[#14b97c]',
  },
  'Menjelang Panen': {
    bg: 'bg-[#fff3df]',
    border: 'border-[#fde68a]',
    badgeBg: 'bg-[#fff3df]',
    badgeText: 'text-[#f69b23]',
    dotBg: 'bg-[#f69b23]',
  },
  'Siap Panen': {
    bg: 'bg-[#e5f8ef]',
    border: 'border-[#a7f3d0]',
    badgeBg: 'bg-[#e5f8ef]',
    badgeText: 'text-[#14b97c]',
    dotBg: 'bg-[#14b97c]',
  },
};

export default function MitraCyclesPage() {
  const { farm, ponds } = useMitraStore();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extended view for demonstration including seeded ponds
  const filteredPonds = ponds.filter((p) => {
    if (selectedSpecies !== 'all' && p.species !== selectedSpecies) return false;
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.species.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalBiomassKg = ponds.reduce(
    (acc, p) => acc + (p.harvest.estimatedBiomassKg || 0),
    0
  );
  const siapPanenCount = ponds.filter(
    (p) => p.cycleStage === 'Siap Panen' || p.harvest.readinessStatus === 'Siap Panen'
  ).length;

  const hasCriticalPond = ponds.some((p) => p.status === 'Kritis');

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Kolam &amp; Ikan › <span className="text-[#173251] font-medium">Siklus Budidaya</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Siklus Budidaya
        </h1>
        <p className="text-[11px] text-[#8192a5] mt-0.5">
          Pantau perkembangan setiap kolam berdasarkan fase budidaya di {farm.name}.
        </p>
      </div>

      {/* Main Action Buttons */}
      <div className="px-4 mt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => alert('Fitur tambah siklus baru akan segera dibuka')}
          className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[7px] flex items-center justify-center gap-1.5 shadow-sm transition active:scale-[0.99]"
        >
          <Plus className="size-3.5" />
          <span>+ Tambah Siklus</span>
        </button>
        <button
          type="button"
          className="w-full bg-white border border-[#a9c9db] text-[#00629b] font-bold text-[11px] min-h-[38px] rounded-[7px] flex items-center justify-center gap-1.5 shadow-xs transition hover:bg-slate-50"
        >
          <span>{farm.name}</span>
          <ChevronDown className="size-3.5" />
        </button>
      </div>

      {/* Section Navigation Tabs */}
      <div className="px-4 mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('active')}
          className={`px-3 py-2 rounded-[5px] text-[10px] font-bold whitespace-nowrap transition border ${
            activeTab === 'active'
              ? 'bg-[#e2f3fc] border-[#a9c9db] text-[#00629b]'
              : 'bg-white border-[#e7eff4] text-[#8192a5]'
          }`}
        >
          Siklus Aktif ({ponds.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-3 py-2 rounded-[5px] text-[10px] font-bold whitespace-nowrap transition border ${
            activeTab === 'history'
              ? 'bg-[#e2f3fc] border-[#a9c9db] text-[#00629b]'
              : 'bg-white border-[#e7eff4] text-[#8192a5]'
          }`}
        >
          Riwayat Siklus
        </button>
      </div>

      {/* Filter Species Dropdown */}
      <div className="px-4 mt-2 flex items-center gap-2">
        <select
          value={selectedSpecies}
          onChange={(e) => setSelectedSpecies(e.target.value)}
          className="bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] text-[10px] font-bold px-3 py-2 rounded-[5px] appearance-none cursor-pointer focus:outline-none"
        >
          <option value="all">Semua Jenis Ikan ⌄</option>
          <option value="Nila">Ikan Nila</option>
          <option value="Bandeng">Ikan Bandeng</option>
          <option value="Lele">Ikan Lele</option>
          <option value="Udang Vaname">Udang Vaname</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[7px] px-3 py-2 flex items-center gap-2 shadow-xs">
          <Search className="size-4 text-[#8192a5] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kolam atau komoditas..."
            className="w-full text-[11px] text-[#173251] placeholder:text-[#8192a5] focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Grouped Ponds by Cycle Stage */}
      <div className="px-4 mt-4 space-y-4">
        {STAGE_ORDER.map((stage) => {
          const pondsInStage = filteredPonds.filter(
            (p) => p.cycleStage === stage
          );
          if (pondsInStage.length === 0) return null;

          const theme = STAGE_THEMES[stage];

          return (
            <div
              key={stage}
              className={`${theme.bg} rounded-[10px] p-3 flex flex-col gap-2.5 border ${theme.border} shadow-xs`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-bold text-[#173251]">{stage}</h2>
                <span className="text-[10px] text-[#8192a5] font-normal">
                  {pondsInStage.length} kolam
                </span>
              </div>

              <div className="space-y-2">
                {pondsInStage.map((pond) => {
                  let statusBadgeStyle = 'bg-[#e5f8ef] text-[#14b97c]';
                  let dotColor = 'bg-[#14b97c]';

                  if (pond.status === 'Kritis') {
                    statusBadgeStyle = 'bg-[#fdebea] text-[#f34860]';
                    dotColor = 'bg-[#f34860]';
                  } else if (pond.status === 'Perhatian') {
                    statusBadgeStyle = 'bg-[#fff3df] text-[#f69b23]';
                    dotColor = 'bg-[#f69b23]';
                  }

                  return (
                    <Link
                      key={pond.id}
                      href={`/mitra/ponds/${pond.id}`}
                      className="block bg-white border border-[#e7eff4] rounded-[8px] p-2.5 hover:shadow-md transition active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-14 rounded-[6px] bg-[#e2f3fc] flex items-center justify-center text-[#00629b] shrink-0 font-bold text-xs relative overflow-hidden">
                          <Fish className="size-7 opacity-80" />
                          <span className="absolute bottom-1 right-1 text-[8px] bg-white/80 px-1 rounded-sm">
                            {pond.name.replace('Kolam ', 'K-')}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-[12px] font-bold text-[#173251] flex items-center gap-1">
                              {pond.name}
                              <ArrowUpRight className="size-3 text-[#8192a5]" />
                            </p>
                          </div>
                          <p className="text-[10px] text-[#8192a5] mt-0.5">
                            {pond.species} · Hari ke-{pond.cycleDay}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${statusBadgeStyle}`}
                            >
                              <span className={`size-1.5 rounded-full ${dotColor}`} />
                              {pond.status}
                            </span>
                            <span className="text-[9.5px] text-[#8192a5]">
                              {pond.harvest.estimatedBiomassKg} kg
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-[#8192a5]">Target Panen</span>
                        <span className="font-semibold text-[#173251]">
                          {pond.harvest.windowStart}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Bento: Ringkasan Siklus */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <h2 className="text-[14px] font-bold text-[#173251] mb-2.5">
            Ringkasan Siklus
          </h2>
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Kolam dalam siklus aktif</span>
              <span className="font-semibold text-[#173251]">{ponds.length} kolam</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Biomassa aktif (estimasi)</span>
              <span className="font-semibold text-[#173251]">
                {(totalBiomassKg / 1000).toFixed(1).replace('.', ',')} ton
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Kolam siap panen</span>
              <span className="font-semibold text-[#173251]">{siapPanenCount} kolam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Banner: Perlu Perhatian */}
      {hasCriticalPond && (
        <div className="px-4 mt-4">
          <div className="bg-[#fff3df] border border-[#fde68a] rounded-[8px] p-3 flex gap-2.5 items-start shadow-xs">
            <Lightbulb className="size-5 text-[#f69b23] shrink-0 mt-0.5" />
            <div className="flex-1 text-[11px]">
              <p className="font-bold text-[#f69b23] text-[12px]">Perlu Perhatian</p>
              <p className="text-[#173251] mt-0.5 leading-relaxed">
                Tinjau kondisi Kolam 2. DO rendah (3,2 mg/L ↓) perlu ditangani sebelum melanjutkan pakan sore.
              </p>
              <Link
                href="/mitra/ponds/POND-02"
                className="inline-block mt-1 font-bold text-[#00629b] text-[10px] hover:underline"
              >
                Lihat kondisi kolam →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Target Panen CTA */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Target Panen Setiap Kolam
          </h2>
          <p className="text-[11px] text-[#8192a5] mt-1 leading-relaxed">
            Estimasi diperbarui mengikuti pertumbuhan ikan dan kondisi air. Pastikan sampling dicatat secara berkala.
          </p>
          <div className="mt-3">
            <Link
              href="/mitra/feed"
              className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center transition active:scale-[0.99]"
            >
              Lihat Pakan &amp; Pertumbuhan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
