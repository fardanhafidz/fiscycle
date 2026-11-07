'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMitraStore } from '@/store/useMitraStore';
import {
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RotateCw,
  Lightbulb,
  ChevronRight,
} from 'lucide-react';

export default function MitraInsightsPage() {
  const { ponds, resolvePondAlert } = useMitraStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);

  // Check if Pond 2 (or any pond) is critical/attention
  const criticalPond = ponds.find((p) => p.status === 'Kritis' || p.status === 'Perhatian');

  const handleApplyResolution = (pondId: string) => {
    setResolving(true);
    setTimeout(() => {
      resolvePondAlert(pondId);
      setResolving(false);
      setToastMessage(`Rekomendasi AI berhasil diterapkan pada ${pondId}! Aerator aktif dan kadar DO kembali normal.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Mitra › <span className="text-[#173251] font-medium">Insight &amp; Rekomendasi AI</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-[6px] bg-[#e2f3fc] text-[#00629b]">
            <Brain className="size-5" />
          </span>
          <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
            Insight &amp; Rekomendasi AI
          </h1>
        </div>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Diagnostik preventif cerdas, deteksi anomali telemetri, dan saran manajemen pakan harian.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="px-4 mt-2">
          <div className="bg-[#e5f8ef] border border-[#a1e5cb] text-[#0e8a5b] p-3 rounded-[8px] text-[11.5px] font-semibold flex items-center gap-2 shadow-xs transition-all">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Summary Metrics */}
      <div className="px-4 mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 shadow-xs">
          <p className="text-[18px] font-bold text-[#00629b]">3</p>
          <p className="text-[10px] font-semibold text-[#5a718c] mt-0.5">Rekomendasi</p>
        </div>
        <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 shadow-xs">
          <p className="text-[18px] font-bold text-rose-600">
            {criticalPond ? 1 : 0}
          </p>
          <p className="text-[10px] font-semibold text-[#5a718c] mt-0.5">Anomali Kritis</p>
        </div>
        <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 shadow-xs">
          <p className="text-[18px] font-bold text-[#14b97c]">2</p>
          <p className="text-[10px] font-semibold text-[#5a718c] mt-0.5">Optimasi Pakan</p>
        </div>
      </div>

      {/* Critical Anomaly AI Card */}
      {criticalPond ? (
        <div className="px-4 mt-4">
          <div className="bg-gradient-to-b from-[#fff5f5] to-white border-2 border-rose-200 rounded-[12px] p-4 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <span className="p-1.5 rounded-full bg-rose-100 text-rose-600 mt-0.5 shrink-0">
                  <AlertTriangle className="size-4" />
                </span>
                <div>
                  <span className="bg-rose-100 text-rose-700 font-bold text-[9.5px] px-2 py-0.5 rounded-[4px]">
                    ANOMALI KRITIS TERDETEKSI
                  </span>
                  <h2 className="text-[14px] font-bold text-[#173251] mt-1">
                    {criticalPond.name} — Oksigen Terlarut Rendah ({criticalPond.telemetry.dissolvedOxygenMgL.toFixed(1)} mg/L ↓)
                  </h2>
                </div>
              </div>
            </div>

            <div className="bg-white/80 border border-rose-100 rounded-[8px] p-3 space-y-1.5 text-[11px]">
              <p className="font-bold text-[#742a2a] flex items-center gap-1">
                <Sparkles className="size-3 text-[#dd6b20]" />
                Diagnostik Akar Masalah (Root-Cause):
              </p>
              <p className="text-[#7d3c3c] leading-relaxed">
                Biomassa ikan mencapai {criticalPond.harvest.estimatedBiomassKg} kg dengan kenaikan suhu air siang hari ke {criticalPond.telemetry.temperatureC}°C, mempercepat konsumsi oksigen respirasi dan dekomposisi bahan organik dasar.
              </p>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <p className="font-bold text-[#173251]">Tindakan Terarah yang Direkomendasikan:</p>
              <div className="space-y-1 text-[#5b738e]">
                <div className="flex items-center gap-2">
                  <span className="size-4 rounded-full bg-[#00629b] text-white flex items-center justify-center font-bold text-[9px]">1</span>
                  <span>Nyalakan 2 kincir aerator cadangan selama minimal 3 jam.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-4 rounded-full bg-[#00629b] text-white flex items-center justify-center font-bold text-[9px]">2</span>
                  <span>Tunda pemberian pakan sore selama 2 jam untuk hindari beban amonia.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-4 rounded-full bg-[#00629b] text-white flex items-center justify-center font-bold text-[9px]">3</span>
                  <span>Alokasikan 15 kg pakan maggot BSF berprotein tinggi saat air kembali stabil.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleApplyResolution(criticalPond.id)}
              disabled={resolving}
              className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[12px] min-h-[42px] rounded-[7px] flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-xs disabled:opacity-50"
            >
              <RotateCw className={`size-3.5 ${resolving ? 'animate-spin' : ''}`} />
              {resolving ? 'Menerapkan Tindakan AI...' : 'Terapkan Rekomendasi & Pulihkan Kolam'}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 mt-4">
          <div className="bg-[#e5f8ef] border border-[#a1e5cb] rounded-[10px] p-3.5 flex items-center gap-2.5">
            <CheckCircle2 className="size-5 text-[#14b97c] shrink-0" />
            <div>
              <p className="text-[12.5px] font-bold text-[#0e8a5b]">
                Semua Kolam dalam Kondisi Optimal
              </p>
              <p className="text-[10.5px] text-[#247053]">
                Tidak ada anomali telemetri yang memerlukan intervensi segera saat ini.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Insight 2: Optimasi Pakan Maggot BSF */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-[5px] bg-[#e5f8ef] text-[#14b97c]">
                <TrendingUp className="size-4" />
              </span>
              <div>
                <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[9px] px-1.5 py-0.5 rounded-[3px]">
                  OPTIMASI PAKAN
                </span>
                <h3 className="text-[13px] font-bold text-[#173251] mt-0.5">
                  Tingkatkan Rasio Maggot BSF Kolam 1 ke 40%
                </h3>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#5b738e] leading-relaxed">
            Ikan nila di Kolam 1 berada pada siklus hari ke-45 (pembesaran cepat). Peningkatan porsi maggot segar berprotein 42% dapat mempercepat pertumbuhan bobot harian (ADG) hingga <strong>+0,4 g/ekor/hari</strong> dan menekan FCR ke 1,28.
          </p>

          <div className="pt-1">
            <Link
              href="/mitra/bsf/allocate?batchId=BSF-04"
              className="w-full bg-[#f3f9fc] hover:bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] font-bold text-[11px] py-1.5 rounded-[5px] flex items-center justify-center gap-1 transition"
            >
              Alokasikan Pakan Maggot Sekarang
              <ChevronRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Insight 3: Proyeksi Panen & Harga Pasar */}
      <div className="px-4 mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-[5px] bg-[#f0ebfa] text-[#7e42d6]">
                <Lightbulb className="size-4" />
              </span>
              <div>
                <span className="bg-[#f0ebfa] text-[#7e42d6] font-bold text-[9px] px-1.5 py-0.5 rounded-[3px]">
                  PROYEKSI PASAR
                </span>
                <h3 className="text-[13px] font-bold text-[#173251] mt-0.5">
                  Permintaan Ikan Nila Super Naik Menjelang Akhir Pekan
                </h3>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#5b738e] leading-relaxed">
            Data permintaan B2B Horeka Surabaya mengindikasikan lonjakan kebutuhan ikan nila 300-400g sebesar 35%. Menjadwalkan panen parsial Kolam 4 pada 15 Nov akan menjamin serapan 100% pada harga puncak Rp 40.000/kg.
          </p>

          <div className="pt-1">
            <Link
              href="/mitra/harvest"
              className="w-full bg-[#f3f9fc] hover:bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] font-bold text-[11px] py-1.5 rounded-[5px] flex items-center justify-center gap-1 transition"
            >
              Lihat Penawaran Pembeli di Pasar
              <ChevronRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
