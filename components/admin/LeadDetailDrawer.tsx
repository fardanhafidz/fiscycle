'use client';

import React, { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { LEAD_STAGE_ORDER, LEAD_STAGE_LABELS } from '@/lib/constants';
import { LeadStage } from '@/lib/types';
import { formatNumberId } from '@/lib/format';
import {
  X,
  Building2,
  Phone,
  Mail,
  Calendar,
  User,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  Copy,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export default function LeadDetailDrawer() {
  const { leads, selectedLeadId, selectLead, advanceLeadStage } = useAdminStore();
  const [copiedToken, setCopiedToken] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const lead = leads.find((l) => l.id === selectedLeadId);

  if (!lead) return null;

  const currentStageIndex = LEAD_STAGE_ORDER.indexOf(lead.stage);
  const nextStage =
    currentStageIndex < LEAD_STAGE_ORDER.length - 1
      ? LEAD_STAGE_ORDER[currentStageIndex + 1]
      : null;

  const handleAdvance = (targetStage: LeadStage) => {
    const issuedToken = advanceLeadStage(lead.id, targetStage);
    if (issuedToken) {
      setToastMessage(`Token Kemitraan ${issuedToken} berhasil diterbitkan untuk ${lead.farmName}!`);
    } else {
      setToastMessage(`Status prospek diperbarui ke: ${LEAD_STAGE_LABELS[targetStage]}`);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleIssueToken = () => {
    const token = advanceLeadStage(lead.id, 'kontrak');
    if (token) {
      setToastMessage(`Token Kemitraan ${token} berhasil diterbitkan!`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div>
          <div className="p-4 border-b border-[#edf2f7] flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-[#1A365D] bg-[#ebf8fa] px-2 py-0.5 rounded-[4px]">
                {lead.id}
              </span>
              <span className="bg-[#e2e8f0] text-[#4a5568] text-[10px] font-bold px-2 py-0.5 rounded-[4px]">
                {LEAD_STAGE_LABELS[lead.stage]}
              </span>
            </div>

            <button
              onClick={() => selectLead(null)}
              className="size-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-[#e5f8ef] text-[#0e8a5b] text-[11.5px] font-semibold border-b border-[#a1e5cb] flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Main Content Details */}
          <div className="p-5 space-y-4">
            {/* Title & Contact */}
            <div>
              <h2 className="text-[18px] font-bold text-[#1a202c] leading-tight">
                {lead.farmName}
              </h2>
              <p className="text-[12px] text-[#718096] mt-0.5 flex items-center gap-1">
                <User className="size-3.5" />
                Pemilik: <strong className="text-[#2d3748]">{lead.ownerName}</strong>
              </p>
            </div>

            {/* Issued Partner Token Banner */}
            {lead.issuedPartnerToken ? (
              <div className="bg-[#f0fff4] border border-[#9ae6b4] rounded-[10px] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#22543d] flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-[#38a169]" />
                    Token Kemitraan Resmi Diterbitkan
                  </span>
                  <span className="text-[10px] bg-[#38a169] text-white px-1.5 py-0.2 rounded-full font-bold">
                    Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white border border-[#c6f6d5] p-2 rounded-[6px]">
                  <span className="font-mono text-[15px] font-extrabold text-[#22543d] tracking-wider">
                    {lead.issuedPartnerToken}
                  </span>
                  <button
                    onClick={() => handleCopy(lead.issuedPartnerToken!)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#38a169] hover:underline"
                  >
                    <Copy className="size-3" />
                    {copiedToken ? 'Disalin!' : 'Salin Token'}
                  </button>
                </div>
                <p className="text-[10px] text-[#276749]">
                  Token ini dapat digunakan mitra untuk verifikasi akun dan onboarding mandiri.
                </p>
              </div>
            ) : (
              <div className="bg-[#fffaf0] border border-[#fbd38d] rounded-[10px] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-bold text-[#744210] flex items-center gap-1.5">
                    <KeyRound className="size-4 text-[#dd6b20]" />
                    Penerbitan Token Mitra
                  </span>
                  <span className="text-[10px] text-[#975a16]">Tahap Kontrak / Onboarding</span>
                </div>
                <p className="text-[11px] text-[#744210] leading-snug">
                  Terbitkan token kemitraan resmi Fiscycle berurutan untuk calon mitra ini setelah kontrak disepakati.
                </p>
                <button
                  onClick={handleIssueToken}
                  className="w-full bg-[#dd6b20] hover:bg-[#c05621] text-white font-bold text-[12px] py-2 rounded-[6px] flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
                >
                  <KeyRound className="size-3.5" />
                  Terbitkan Token Sekarang (FSC-FARM-XXXX)
                </button>
              </div>
            )}

            {/* Farm Profile Specs */}
            <div className="bg-[#f7fafc] border border-[#e2e8f0] rounded-[10px] p-3.5 space-y-2.5 text-[12px]">
              <h3 className="font-bold text-[#2d3748] flex items-center gap-1.5 border-b border-[#edf2f7] pb-1.5">
                <Building2 className="size-4 text-[#1A365D]" />
                Spesifikasi Tambak
              </h3>

              <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                <div>
                  <span className="text-[#718096]">Lokasi:</span>
                  <p className="font-semibold text-[#1a202c] mt-0.5">
                    {lead.city}, {lead.province}
                  </p>
                </div>
                <div>
                  <span className="text-[#718096]">Komoditas Utama:</span>
                  <p className="font-semibold text-[#1a202c] mt-0.5">
                    {lead.primarySpecies}
                  </p>
                </div>
                <div>
                  <span className="text-[#718096]">Jumlah Kolam:</span>
                  <p className="font-semibold text-[#1a202c] mt-0.5">
                    {lead.pondCount} Kolam
                  </p>
                </div>
                <div>
                  <span className="text-[#718096]">Luas Lahan:</span>
                  <p className="font-semibold text-[#1a202c] mt-0.5">
                    {formatNumberId(lead.areaM2)} m² ({(lead.areaM2 / 10000).toFixed(1)} Ha)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-[#f7fafc] border border-[#e2e8f0] rounded-[10px] p-3.5 space-y-2 text-[11.5px]">
              <h3 className="font-bold text-[#2d3748] border-b border-[#edf2f7] pb-1.5">
                Kontak &amp; PIC Follow-Up
              </h3>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#718096] flex items-center gap-1.5">
                    <Phone className="size-3.5" /> Telepon / WhatsApp:
                  </span>
                  <span className="font-bold text-[#1a202c]">{lead.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718096] flex items-center gap-1.5">
                    <Mail className="size-3.5" /> Email:
                  </span>
                  <span className="font-semibold text-[#1a202c]">{lead.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718096] flex items-center gap-1.5">
                    <User className="size-3.5" /> PIC Internal:
                  </span>
                  <span className="font-bold text-[#1A365D]">{lead.picName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718096] flex items-center gap-1.5">
                    <Calendar className="size-3.5" /> Jadwal Follow-Up:
                  </span>
                  <span className="font-semibold text-[#dd6b20]">
                    {lead.nextFollowUpDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Stage Selector */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-[#2d3748] block">
                Pindahkan Tahapan Pipeline (11 Stages)
              </label>
              <select
                value={lead.stage}
                onChange={(e) => handleAdvance(e.target.value as LeadStage)}
                className="w-full bg-white border border-[#cbd5e0] rounded-[7px] h-10 px-3 text-[12px] font-semibold text-[#1a202c] focus:outline-hidden"
              >
                {LEAD_STAGE_ORDER.map((stage) => (
                  <option key={stage} value={stage}>
                    {LEAD_STAGE_LABELS[stage]}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes History */}
            <div className="space-y-1.5">
              <h3 className="text-[12px] font-bold text-[#2d3748] flex items-center gap-1.5">
                <FileText className="size-3.5" />
                Catatan Aktivitas Prospek
              </h3>
              <div className="space-y-1">
                {lead.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-[6px] text-[11px] text-[#4a5568]"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#edf2f7] bg-white sticky bottom-0 flex gap-2">
          {nextStage && (
            <button
              onClick={() => handleAdvance(nextStage)}
              className="flex-1 bg-[#1A365D] hover:bg-[#132845] text-white font-bold text-[12px] py-2.5 rounded-[7px] flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
            >
              <span>Lanjut ke: {LEAD_STAGE_LABELS[nextStage]}</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
          <button
            onClick={() => selectLead(null)}
            className="px-4 py-2.5 rounded-[7px] border border-slate-300 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
