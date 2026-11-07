'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';
import { LEAD_STAGE_ORDER, LEAD_STAGE_LABELS } from '@/lib/constants';
import { LeadStage } from '@/lib/types';
import LeadDetailDrawer from '@/components/admin/LeadDetailDrawer';
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  ChevronRight,
  UserPlus,
  Phone,
  Calendar,
  PhoneCall,
  CheckCheck,
  ClipboardCheck,
  FileText,
  FileSignature,
  Users,
  Wrench,
  Fish,
  Filter,
  Activity,
  Trash2,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';

const STAGE_ICONS: Record<LeadStage, React.ComponentType<{ className?: string }>> = {
  lead_baru: UserPlus,
  belum_dihubungi: Phone,
  call_terjadwal: Calendar,
  sudah_dihubungi: PhoneCall,
  qualified: CheckCheck,
  assessment: ClipboardCheck,
  penawaran: FileText,
  kontrak: FileSignature,
  onboarding: Users,
  instalasi: Wrench,
  mitra_aktif: Fish,
};

export default function AdminInternalDesktopPage() {
  const { leads, selectLead } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<LeadStage | 'semua'>('semua');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === 'semua' ? true : l.stage === selectedStage;
    const matchesCommodity =
      selectedCommodity === 'semua' ? true : l.primarySpecies === selectedCommodity;
    return matchesSearch && matchesStage && matchesCommodity;
  });

  const stageCounts = LEAD_STAGE_ORDER.reduce((acc, stage) => {
    acc[stage] = leads.filter((l) => l.stage === stage).length;
    return acc;
  }, {} as Record<LeadStage, number>);

  return (
    <div
      className="flex-1 flex flex-col min-h-screen bg-[#f7fafc] text-[#1a202c] font-sans antialiased pb-12"
      data-node-id="69:2719"
      data-name="Fiscycle · Admin Internal"
    >
      {/* Top Search & Account Strip */}
      <header className="bg-white border-b border-[#e2e8f0] px-8 py-3 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 w-96 bg-[#f7fafc] border border-[#cbd5e0] rounded-lg px-3 py-1.5 focus-within:border-[#1A365D] transition">
          <Search className="size-4 text-[#718096]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tambak, calon mitra, token, kota..."
            className="bg-transparent text-[13px] outline-none text-[#1a202c] placeholder-[#a0aec0] w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => showToast('Tidak ada notifikasi sistem baru.')}
            className="relative p-2 text-[#718096] hover:text-[#1A365D] transition rounded-lg hover:bg-slate-100"
            title="Notifikasi"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-[#e53e3e] rounded-full" />
          </button>

          <div className="h-6 w-px bg-[#e2e8f0]" />

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="size-8 rounded-full bg-[#1A365D] text-white flex items-center justify-center font-bold text-xs">
              AP
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-[#1a202c] leading-none">Andi Pratama</p>
              <p className="text-[11px] text-[#718096] mt-0.5">Admin Akuisisi &amp; Ops</p>
            </div>
            <ChevronDown className="size-3.5 text-[#718096]" />
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-[1240px] w-full mx-auto px-8 pt-6 space-y-6">
        {/* Page Heading & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#718096] mb-1">
              <span>Admin Internal</span>
              <span>›</span>
              <span className="font-semibold text-[#1A365D]">Pipeline Akuisisi Mitra</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1A365D] tracking-tight">
              Pusat Kendali Operasional Mitra Tambak
            </h1>
            <p className="text-xs text-[#718096] mt-0.5">
              11 tahapan proses onboarding dari pengisian form, survei lapangan, validasi token, hingga instalasi IoT.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/farms"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#cbd5e0] hover:bg-slate-50 text-[#1A365D] font-bold text-xs rounded-lg transition"
            >
              <Activity className="size-3.5 text-[#00B4D8]" />
              <span>Monitoring IoT</span>
            </Link>

            <Link
              href="/admin/waste"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#cbd5e0] hover:bg-slate-50 text-[#1A365D] font-bold text-xs rounded-lg transition"
            >
              <Trash2 className="size-3.5 text-[#38a169]" />
              <span>Verifikasi Limbah</span>
            </Link>

            <button
              onClick={() => showToast('Membuka formulir pendaftaran calon mitra baru...')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1A365D] hover:bg-[#152c4d] text-white font-bold text-xs rounded-lg shadow-sm transition"
            >
              <Plus className="size-4" />
              <span>+ Tambah Calon Mitra</span>
            </button>
          </div>
        </div>

        {/* 11-Stage Ribbon ("Lead journey", 69px height matching Figma) */}
        <div
          className="bg-white border border-[#e2e8f0] rounded-xl p-2.5 shadow-xs overflow-x-auto"
          data-node-id="69:2806"
          data-name="Lead journey"
        >
          <div className="flex items-center min-w-[1080px] justify-between">
            {LEAD_STAGE_ORDER.map((stageKey, idx) => {
              const Icon = STAGE_ICONS[stageKey];
              const count = stageCounts[stageKey] || 0;
              const isSelected = selectedStage === stageKey;
              return (
                <React.Fragment key={stageKey}>
                  <button
                    onClick={() =>
                      setSelectedStage(selectedStage === stageKey ? 'semua' : stageKey)
                    }
                    className={`flex flex-col items-center py-1.5 px-2.5 rounded-lg transition ${
                      isSelected
                        ? 'bg-[#1A365D] text-white shadow-xs'
                        : 'hover:bg-slate-50 text-[#4a5568]'
                    }`}
                  >
                    <div
                      className={`size-7 rounded-md flex items-center justify-center font-bold text-xs mb-1 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : count > 0
                          ? 'bg-[#ebf8fa] text-[#00629b]'
                          : 'bg-[#edf2f7] text-[#a0aec0]'
                      }`}
                    >
                      <Icon className="size-3.5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold whitespace-nowrap ${
                        isSelected ? 'text-white' : 'text-[#2d3748]'
                      }`}
                    >
                      {LEAD_STAGE_LABELS[stageKey]}
                    </span>
                    <span
                      className={`text-[9px] font-semibold ${
                        isSelected ? 'text-[#8ed8f8]' : 'text-[#718096]'
                      }`}
                    >
                      {count} Lead
                    </span>
                  </button>

                  {idx < LEAD_STAGE_ORDER.length - 1 && (
                    <ChevronRight className="size-3.5 text-[#cbd5e0] shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Filter Strip & Active Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-[#718096] flex items-center gap-1 shrink-0">
              <Filter className="size-3.5" /> Filter Komoditas:
            </span>
            {(['semua', 'Nila', 'Bandeng', 'Lele', 'Udang Vaname'] as const).map((comm) => (
              <button
                key={comm}
                onClick={() => setSelectedCommodity(comm)}
                className={`px-3 py-1 text-xs rounded-md font-semibold transition capitalize ${
                  selectedCommodity === comm
                    ? 'bg-[#1A365D] text-white'
                    : 'bg-[#f7fafc] border border-[#e2e8f0] text-[#4a5568] hover:bg-slate-100'
                }`}
              >
                {comm}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#718096]">
            Menampilkan <strong className="text-[#1A365D]">{filteredLeads.length}</strong> dari{' '}
            <strong>{leads.length}</strong> calon mitra
          </div>
        </div>

        {/* Table of Leads matching Figma */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#718096] font-bold">
                <tr>
                  <th className="py-3 px-4">ID &amp; Calon Tambak</th>
                  <th className="py-3 px-3">Pemilik &amp; Kontak</th>
                  <th className="py-3 px-3">Lokasi</th>
                  <th className="py-3 px-3">Komoditas &amp; Luas</th>
                  <th className="py-3 px-3">Tahapan Pipeline</th>
                  <th className="py-3 px-3">PIC Admin</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {filteredLeads.map((lead) => {
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => selectLead(lead.id)}
                      className="hover:bg-[#f0f8fd]/60 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-[#1A365D] text-xs">
                          {lead.farmName}
                        </div>
                        <div className="text-[10px] text-[#718096] font-mono mt-0.5">
                          {lead.id}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-[#2d3748]">{lead.ownerName}</div>
                        <div className="text-[11px] text-[#718096]">{lead.phone}</div>
                      </td>

                      <td className="py-3.5 px-3 text-[#4a5568]">
                        <span className="font-medium">{lead.city}</span>,{' '}
                        <span className="text-[10px] text-[#718096]">{lead.province}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-[#00629b]">{lead.primarySpecies}</span>
                        <div className="text-[10px] text-[#718096]">
                          {lead.areaM2} m² · {lead.pondCount} Kolam
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ebf8fa] text-[#00629b]">
                          <span className="size-1.5 rounded-full bg-[#00B4D8]" />
                          {LEAD_STAGE_LABELS[lead.stage]}
                        </span>
                        {lead.issuedPartnerToken && (
                          <div className="flex items-center gap-1 text-[10px] text-[#38a169] font-mono mt-1 font-semibold">
                            <KeyRound className="size-3" />
                            <span>{lead.issuedPartnerToken}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-[#4a5568] font-medium">
                        {lead.picName}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectLead(lead.id);
                          }}
                          className="px-3 py-1 bg-[#1A365D] hover:bg-[#152c4d] text-white font-bold text-[11px] rounded-md transition"
                        >
                          Detail Lead
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Drawer */}
        <LeadDetailDrawer />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A365D] text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-[#38a169]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
