'use client';

import React, { useState } from 'react';
import { useMitraStore } from '@/store/useMitraStore';
import { formatNumberId } from '@/lib/format';
import {
  Download,
  CheckCircle2,
  Sparkles,
  DollarSign,
} from 'lucide-react';

export default function MitraReportsPage() {
  const { ponds } = useMitraStore();
  const totalBiomassKg = ponds.reduce(
    (acc, p) => acc + (p.harvest?.estimatedBiomassKg || 0),
    0
  );
  const [activePeriod, setActivePeriod] = useState<'bulan_ini' | 'bulan_lalu' | 'kuartal'>('bulan_ini');
  const [downloading, setDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExportPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setToastMessage('Laporan Sintesis Tambak Bulanan (PDF) berhasil diunduh ke perangkat Anda!');
      setTimeout(() => setToastMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Mitra › <span className="text-[#173251] font-medium">Laporan &amp; Analitik</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Laporan &amp; Analitik
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Evaluasi efisiensi FCR, laju kelangsungan hidup (SR), mutu air aman, dan rekapitulasi finansial.
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

      {/* Period Filter Tabs */}
      <div className="px-4 mt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { key: 'bulan_ini', label: 'Bulan Ini (Nov 2026)' },
          { key: 'bulan_lalu', label: 'Bulan Lalu (Okt 2026)' },
          { key: 'kuartal', label: 'Kuartal 4 (Q4 2026)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActivePeriod(tab.key as typeof activePeriod)}
            className={`px-3 py-1.5 rounded-[6px] text-[11px] font-semibold whitespace-nowrap transition ${
              activePeriod === tab.key
                ? 'bg-[#00629b] text-white shadow-xs'
                : 'bg-white border border-[#e1e7ec] text-[#71859c] hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4 Core Performance Bento Cards */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold text-[#5a718c]">FCR Rata-rata</span>
            <span className="bg-[#e5f8ef] text-[#14b97c] text-[9.5px] font-bold px-1.5 py-0.5 rounded-[3px]">
              -0,18
            </span>
          </div>
          <p className="text-[20px] font-bold text-[#173251] mt-1 leading-none">1,32</p>
          <p className="text-[9.5px] text-[#14b97c] font-medium mt-1">Efisiensi Sangat Baik (Target ≤1,40)</p>
          <div className="w-full bg-[#e7eff4] rounded-full h-1.5 mt-2">
            <div className="bg-[#14b97c] h-1.5 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold text-[#5a718c]">Survival Rate (SR)</span>
            <span className="bg-[#e5f8ef] text-[#14b97c] text-[9.5px] font-bold px-1.5 py-0.5 rounded-[3px]">
              +9,5%
            </span>
          </div>
          <p className="text-[20px] font-bold text-[#173251] mt-1 leading-none">91,5%</p>
          <p className="text-[9.5px] text-[#5a718c] mt-1">Standar industri 82%</p>
          <div className="w-full bg-[#e7eff4] rounded-full h-1.5 mt-2">
            <div className="bg-[#00629b] h-1.5 rounded-full" style={{ width: '91.5%' }} />
          </div>
        </div>

        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold text-[#5a718c]">Jam Air Aman</span>
            <span className="bg-[#e5f8ef] text-[#14b97c] text-[9.5px] font-bold px-1.5 py-0.5 rounded-[3px]">
              98,2%
            </span>
          </div>
          <p className="text-[20px] font-bold text-[#173251] mt-1 leading-none">707 Jam</p>
          <p className="text-[9.5px] text-[#5a718c] mt-1">Hanya 13 jam anomali terkendali</p>
          <div className="w-full bg-[#e7eff4] rounded-full h-1.5 mt-2">
            <div className="bg-[#14b97c] h-1.5 rounded-full" style={{ width: '98.2%' }} />
          </div>
        </div>

        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold text-[#5a718c]">Biomassa Total</span>
            <span className="bg-[#e2f3fc] text-[#00629b] text-[9.5px] font-bold px-1.5 py-0.5 rounded-[3px]">
              {ponds.length} Kolam
            </span>
          </div>
          <p className="text-[20px] font-bold text-[#173251] mt-1 leading-none">
            {formatNumberId(totalBiomassKg)} kg
          </p>
          <p className="text-[9.5px] text-[#5a718c] mt-1">Kapasitas terutilisasi 82%</p>
          <div className="w-full bg-[#e7eff4] rounded-full h-1.5 mt-2">
            <div className="bg-[#008d91] h-1.5 rounded-full" style={{ width: '82%' }} />
          </div>
        </div>
      </div>

      {/* Finansial & Profitabilitas Tambak */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[13.5px] font-bold text-[#173251] flex items-center gap-1.5">
              <DollarSign className="size-4 text-[#14b97c]" />
              Rekapitulasi Finansial &amp; Margin
            </h2>
            <span className="text-[10px] text-[#14b97c] bg-[#e5f8ef] font-bold px-2 py-0.5 rounded-[4px]">
              Margin Bersih 42%
            </span>
          </div>

          <div className="space-y-2 text-[11.5px]">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#8192a5]">Gross Revenue (Penjualan Ikan)</span>
              <span className="font-bold text-[#173251]">Rp 48.600.000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#8192a5]">Biaya Pakan (Pelet Komersial + BSF)</span>
              <span className="font-semibold text-rose-600">-Rp 16.800.000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#8192a5]">Biaya Listrik, Aerasi &amp; IoT</span>
              <span className="font-semibold text-rose-600">-Rp 4.400.000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#8192a5]">Tenaga Kerja &amp; Perawatan Tambak</span>
              <span className="font-semibold text-rose-600">-Rp 7.000.000</span>
            </div>
            <div className="flex justify-between py-1.5 bg-[#f3fbf7] px-2 rounded-[5px]">
              <div>
                <p className="font-bold text-[#173251]">Estimasi Profit Bersih</p>
                <p className="text-[9.5px] text-[#14b97c]">Efisiensi pakan BSF menghemat Rp 1.450.000</p>
              </div>
              <span className="text-[15px] font-bold text-[#14b97c]">
                Rp 20.400.000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sirkular BSF & Efisiensi Pakan */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <h2 className="text-[13.5px] font-bold text-[#173251] flex items-center gap-1.5">
            <Sparkles className="size-4 text-[#00629b]" />
            Dampak Ekonomi Sirkular BSF
          </h2>

          <div className="grid grid-cols-3 gap-2 text-center text-[10.5px]">
            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2">
              <p className="text-[#8192a5]">Biowaste Diolah</p>
              <p className="text-[14px] font-bold text-[#173251] mt-0.5">1.250 kg</p>
            </div>
            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2">
              <p className="text-[#8192a5]">Maggot Dipanen</p>
              <p className="text-[14px] font-bold text-[#00629b] mt-0.5">242 kg</p>
            </div>
            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2">
              <p className="text-[#8192a5]">Hemat Biaya</p>
              <p className="text-[14px] font-bold text-[#14b97c] mt-0.5">Rp 1,45 Jt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Pembeli Panen */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5">
          <h2 className="text-[13.5px] font-bold text-[#173251]">
            Top Pembeli Panen Siklus Ini
          </h2>

          <div className="space-y-2 text-[11px]">
            {[
              { name: 'Restoran Seafood Surya', volume: '400 kg Nila', total: 'Rp 16.000.000' },
              { name: 'Depot Bu Rudy Surabaya', volume: '350 kg Nila', total: 'Rp 11.200.000' },
              { name: 'Hotel Grand Majapahit', volume: '250 kg Bandeng', total: 'Rp 11.250.000' },
              { name: 'Pasar Pabean Surabaya', volume: '200 kg Bandeng', total: 'Rp 7.000.000' },
            ].map((buyer, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-[6px] bg-[#f8fbfd] border border-[#eaf1f5]"
              >
                <div>
                  <p className="font-bold text-[#173251]">{buyer.name}</p>
                  <p className="text-[9.5px] text-[#8192a5]">{buyer.volume}</p>
                </div>
                <span className="font-bold text-[#00629b]">{buyer.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export CTA */}
      <div className="px-4 mt-4">
        <button
          onClick={handleExportPdf}
          disabled={downloading}
          className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[12px] min-h-[44px] rounded-[7px] flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-xs disabled:opacity-50"
        >
          <Download className="size-4" />
          {downloading ? 'Membuat Laporan PDF...' : 'Ekspor Laporan PDF Lengkap'}
        </button>
      </div>
    </div>
  );
}
