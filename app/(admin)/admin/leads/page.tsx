'use client';

import React, { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { LEAD_STAGE_ORDER, LEAD_STAGE_LABELS } from '@/lib/constants';
import { FishSpecies } from '@/lib/types';
import LeadDetailDrawer from '@/components/admin/LeadDetailDrawer';
import {
  Search,
  KeyRound,
  Filter,
} from 'lucide-react';

export default function AdminLeadsPage() {
  const { leads, selectLead } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<'Semua' | FishSpecies>('Semua');

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies =
      selectedSpecies === 'Semua' ? true : l.primarySpecies === selectedSpecies;
    return matchesSearch && matchesSpecies;
  });

  const totalLeads = leads.length;
  const activeMitra = leads.filter((l) => l.stage === 'mitra_aktif').length;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f7fafc]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-extrabold text-[#1A365D] tracking-tight">
              Pipeline Akuisisi Mitra Tambak
            </h1>
            <span className="bg-[#ebf8fa] text-[#00629b] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
              11 Stages CRM
            </span>
          </div>
          <p className="text-[12px] text-[#718096] mt-0.5">
            Manajemen calon mitra mulai dari pengajuan awal, assessment teknis, penerbitan token hingga onboarding aktif.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="bg-[#f7fafc] border border-[#e2e8f0] rounded-[8px] px-3 py-1.5 flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#3182ce]" />
            <span className="text-[11.5px] font-semibold text-[#4a5568]">
              Total: <strong>{totalLeads}</strong>
            </span>
          </div>
          <div className="bg-[#f0fff4] border border-[#9ae6b4] rounded-[8px] px-3 py-1.5 flex items-center gap-2 text-[#22543d]">
            <span className="size-2 rounded-full bg-[#38a169]" />
            <span className="text-[11.5px] font-semibold">
              Mitra Aktif: <strong>{activeMitra}</strong>
            </span>
          </div>
        </div>
      </header>

      {/* Control Bar: Search & Species Filters */}
      <div className="px-6 py-3 bg-white border-b border-[#e2e8f0] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="bg-[#f7fafc] border border-[#cbd5e0] rounded-[7px] h-9 px-3 flex items-center gap-2 w-full">
            <Search className="size-4 text-[#a0aec0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tambak, pemilik, token, atau kota..."
              className="bg-transparent text-[12px] text-[#2d3748] placeholder:text-[#a0aec0] focus:outline-hidden w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-[#718096] mr-1 flex items-center gap-1">
            <Filter className="size-3" /> Komoditas:
          </span>
          {(['Semua', 'Nila', 'Bandeng', 'Lele', 'Udang Vaname'] as const).map((sp) => (
            <button
              key={sp}
              onClick={() => setSelectedSpecies(sp as typeof selectedSpecies)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-[5px] transition ${
                selectedSpecies === sp
                  ? 'bg-[#1A365D] text-white shadow-xs'
                  : 'bg-[#f7fafc] border border-[#e2e8f0] text-[#4a5568] hover:bg-slate-100'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* 11-Stage Horizontal Kanban Board */}
      <div className="flex-1 p-6 overflow-x-auto flex gap-4 items-start select-none">
        {LEAD_STAGE_ORDER.map((stageKey) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === stageKey);
          const stageLabel = LEAD_STAGE_LABELS[stageKey];

          return (
            <div
              key={stageKey}
              className="w-72 shrink-0 bg-[#f1f5f9] rounded-[10px] border border-[#e2e8f0] flex flex-col max-h-[calc(100vh-180px)]"
            >
              {/* Column Header */}
              <div className="p-3 border-b border-[#e2e8f0] bg-white rounded-t-[10px] flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#1A365D] truncate">
                  {stageLabel}
                </span>
                <span className="bg-[#edf2f7] text-[#4a5568] font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-full">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="p-2.5 space-y-2.5 overflow-y-auto flex-1">
                {stageLeads.length === 0 ? (
                  <div className="p-4 text-center text-[11px] text-[#a0aec0] italic border border-dashed border-[#cbd5e0] rounded-[7px]">
                    Kosong
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => selectLead(lead.id)}
                      className="bg-white border border-[#e2e8f0] hover:border-[#3182ce] hover:shadow-md rounded-[8px] p-3 cursor-pointer transition space-y-2 group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[9.5px] font-bold text-[#00629b] bg-[#eef6fa] px-1.5 py-0.2 rounded-[3px]">
                          {lead.id}
                        </span>
                        <span className="text-[9.5px] font-bold text-[#4a5568] bg-[#edf2f7] px-1.5 py-0.2 rounded-[3px]">
                          {lead.primarySpecies}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-[12.5px] font-bold text-[#1a202c] group-hover:text-[#3182ce] transition">
                          {lead.farmName}
                        </h4>
                        <p className="text-[10.5px] text-[#718096] mt-0.5">
                          {lead.ownerName} · {lead.city}
                        </p>
                      </div>

                      <div className="text-[10px] text-[#718096] flex items-center justify-between pt-1 border-t border-[#edf2f7]">
                        <span>{lead.pondCount} Kolam ({lead.areaM2} m²)</span>
                        <span className="text-[#dd6b20] font-medium">{lead.picName.split(' ')[0]}</span>
                      </div>

                      {lead.issuedPartnerToken && (
                        <div className="bg-[#f0fff4] border border-[#c6f6d5] text-[#22543d] rounded-[4px] px-2 py-0.5 flex items-center justify-between text-[9.5px]">
                          <span className="flex items-center gap-1 font-bold">
                            <KeyRound className="size-2.5" />
                            {lead.issuedPartnerToken}
                          </span>
                          <span className="text-[8.5px] font-semibold text-[#38a169]">Siap Aktif</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Detail Drawer */}
      <LeadDetailDrawer />
    </div>
  );
}
