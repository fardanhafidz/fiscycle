'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMitraStore } from '@/store/useMitraStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { toast } from 'sonner';
import {
  Search,
  Leaf,
  CheckCircle2,
  BarChart3,
  AlertTriangle,
  Scale,
  Calendar,
  Sparkles,
  Camera,
  Cpu,
  RefreshCw,
} from 'lucide-react';

export default function MitraBsfPage() {
  const { bsfBatches, bsfFeedAllocations } = useMitraStore();
  const { contributions } = useWastePointStore();

  const [activeTab, setActiveTab] = useState<'sampah' | 'bsf' | 'pakan'>('sampah');
  const [searchQuery, setSearchQuery] = useState('');

  // AI State Integration
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMode, setAiMode] = useState<'LIVE_FASTAPI' | 'DETERMINISTIC_FALLBACK' | null>(null);
  const [b1Result, setB1Result] = useState<{
    predictedNextWeightMg: number;
    expectedDeltaMg: number;
    horizonDays: number;
  } | null>({
    predictedNextWeightMg: 195.4,
    expectedDeltaMg: 25.4,
    horizonDays: 3,
  });
  const [dssResult, setDssResult] = useState<{
    status: string;
    recommendations: string[];
  } | null>({
    status: 'OPTIMAL',
    recommendations: [
      'Jaga kelembapan substrat pada rentang 60–70% untuk akselerasi makan larva.',
      'Suhu media 30°C optimal untuk konversi protein sisa dapur.',
    ],
  });

  // Photo AI State
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoResult, setPhotoResult] = useState<{
    mode: string;
    larvaCount: number;
    meanWeightMg: number;
    minWeightMg: number;
    maxWeightMg: number;
    recommendation: string;
  } | null>(null);

  const fetchAiForecast = async () => {
    setAiLoading(true);
    try {
      const activeBatch = bsfBatches[0] || {
        mediaHumidityPct: 65,
        dayOfCycle: 8,
      };

      const [resB1, resDss] = await Promise.all([
        fetch('/api/ai/bridge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            domain: 'bsf_b1',
            payload: {
              moisture_percent: activeBatch.mediaHumidityPct || 65,
              elapsed_days: activeBatch.dayOfCycle || 8,
              current_weight_mg: 170.0,
              previous_weight_mg: 145.0,
              recent_growth_mg_per_day: 8.3,
              forecast_horizon_days: 3,
            },
          }),
        }),
        fetch('/api/ai/bridge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            domain: 'bsf_dss',
            payload: {
              batch_id: activeBatch.id || 'BSF-04',
              moisture_percent: activeBatch.mediaHumidityPct || 65,
              substrate_temperature_c: activeBatch.mediaTempC || 30,
              observations: [
                { day: 5, measured_weight_mg: 120 },
                { day: 7, measured_weight_mg: 155 },
                { day: 8, measured_weight_mg: 170 },
              ],
            },
          }),
        }),
      ]);

      if (resB1.ok) {
        const dataB1 = await resB1.json();
        setAiMode(dataB1.mode);
        const data = dataB1.data || {};
        setB1Result({
          predictedNextWeightMg: data.predicted_next_weight_mg ?? 198.2,
          expectedDeltaMg: data.expected_weight_delta_mg ?? 28.2,
          horizonDays: 3,
        });
      }

      if (resDss.ok) {
        const dataDss = await resDss.json();
        const d = dataDss.data || {};
        setDssResult({
          status: d.status || 'OPTIMAL',
          recommendations: d.recommendations?.length
            ? d.recommendations
            : ['Kondisi media BSF terpantau ideal untuk pertumbuhan biomassa.'],
        });
      }

      toast.success('Prediksi AI Model B1 & Rekomendasi DSS berhasil diperbarui!');
    } catch {
      toast.error('Gagal memperbarui data AI, menggunakan estimasi deterministik.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAnalyzePhoto = async (samplePath = '/images/bsf-batch-1.jpg') => {
    setPhotoLoading(true);
    try {
      const imgRes = await fetch(samplePath);
      const blob = await imgRes.blob();

      const res = await fetch('/api/ai/bsf-photo', {
        method: 'POST',
        headers: {
          'Content-Type': blob.type || 'image/jpeg',
        },
        body: blob,
      });

      if (res.ok) {
        const data = await res.json();
        const d = data.data || {};
        setPhotoResult({
          mode: data.mode,
          larvaCount: d.larva_count ?? 42,
          meanWeightMg: Number((d.mean_weight_mg ?? 184.6).toFixed(1)),
          minWeightMg: Number((d.min_weight_mg ?? 122.0).toFixed(1)),
          maxWeightMg: Number((d.max_weight_mg ?? 231.5).toFixed(1)),
          recommendation:
            d.recommendation ??
            'Ukuran larva mencapai 185 mg/ekor. Siap dipanen dalam 3-4 hari ke depan untuk alokasi pakan kolam.',
        });
        toast.success(`AI Vision A1+A2 Berhasil: Terdeteksi ${d.larva_count ?? 42} larva!`);
      }
    } catch {
      toast.error('Gagal menganalisis foto sampel larva.');
    } finally {
      setPhotoLoading(false);
    }
  };

  useEffect(() => {
    fetchAiForecast();
  }, []);

  const totalBiowasteKg = contributions.reduce(
    (acc, c) => acc + (c.actualKg || c.estimatedKg || 0),
    0
  );

  const totalHarvestedMaggotKg = bsfBatches.reduce(
    (acc, b) => acc + (b.harvestedMaggotKg || b.estimatedMaggotYieldKg || 0),
    0
  );

  const totalAllocatedKg = bsfFeedAllocations.reduce(
    (acc, a) => acc + (a.maggotKg || 0),
    0
  );

  const availableMaggotKg = Math.max(0, totalHarvestedMaggotKg - totalAllocatedKg);

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Sirkular › <span className="text-[#173251] font-medium">BSF &amp; Sirkular</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          BSF &amp; Sirkular
        </h1>
        <p className="text-[11px] text-[#8192a5] mt-0.5 leading-relaxed">
          Ubah sampah organik menjadi pakan, untuk tambak yang lebih berkelanjutan.
        </p>
      </div>

      {/* Search Input */}
      <div className="px-4 mt-2">
        <div className="bg-white border border-[#e7eff4] rounded-[7px] px-3 py-2 flex items-center gap-2 shadow-xs">
          <Search className="size-4 text-[#8192a5] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari batch, input organik, atau informasi BSF..."
            className="w-full text-[11px] text-[#173251] placeholder:text-[#8192a5] focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Hero Visual Pill */}
      <div className="px-4 mt-3">
        <div className="h-[90px] rounded-[8px] bg-gradient-to-r from-[#00566b] via-[#008d91] to-[#14b97c] p-3.5 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">
              Siklus Biokonversi Maggot
            </span>
            <Leaf className="size-5 text-white/80" />
          </div>
          <div>
            <p className="text-[15px] font-bold leading-tight">
              Biowaste {totalBiowasteKg} kg → Pakan Berprotein Tinggi
            </p>
            <p className="text-[10px] opacity-80 mt-0.5">
              Efisiensi biaya pakan tambak hemat hingga 35%.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {(
          [
            { id: 'sampah', label: 'Sampah Organik' },
            { id: 'bsf', label: 'Budidaya BSF' },
            { id: 'pakan', label: 'Pakan untuk Ikan' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-[5px] text-[10px] font-bold whitespace-nowrap transition border ${
              activeTab === tab.id
                ? 'bg-[#e2f3fc] border-[#a9c9db] text-[#00629b]'
                : 'bg-white border-[#e7eff4] text-[#8192a5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Metrics (6 Bento Cards) */}
      <div className="px-4 mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Batch Aktif */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
              <CheckCircle2 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {bsfBatches.length}
              </p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">Batch Aktif</p>
              <p className="text-[9px] text-[#8192a5]">1 mendekati panen</p>
            </div>
          </div>

          {/* Bahan Organik */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
              <BarChart3 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {totalBiowasteKg} kg
              </p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Bahan Organik Diproses
              </p>
              <p className="text-[9px] text-[#8192a5]">Minggu ini</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Batch Normal */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e5f8ef] flex items-center justify-center text-[#14b97c]">
              <CheckCircle2 className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">2</p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">Batch Normal</p>
              <p className="text-[9px] text-[#14b97c] font-medium">Kondisi optimal</p>
            </div>
          </div>

          {/* Perlu Perhatian */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#fff3df] flex items-center justify-center text-[#f69b23]">
              <AlertTriangle className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">1</p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Perlu Perhatian
              </p>
              <p className="text-[9px] text-[#f69b23]">BSF-04 (Suhu 34°C)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Estimasi Panen BSF */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#f4ebff] flex items-center justify-center text-[#9857e8]">
              <Scale className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">
                {totalHarvestedMaggotKg} kg
              </p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Estimasi Panen BSF
              </p>
              <p className="text-[9px] text-[#8192a5]">Dalam 2 minggu</p>
            </div>
          </div>

          {/* Panen Terdekat */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
            <div className="size-7 rounded-full bg-[#e2f3fc] flex items-center justify-center text-[#00629b]">
              <Calendar className="size-4" />
            </div>
            <div className="mt-2">
              <p className="text-[21px] font-bold text-[#173251] leading-none">1</p>
              <p className="text-[10px] font-bold text-[#173251] mt-1">
                Panen dalam 5 hari
              </p>
              <p className="text-[9px] text-[#00629b]">Batch BSF-02</p>
            </div>
          </div>
        </div>
      </div>

      {/* Perlu Ditangani Sekarang */}
      <div className="px-4 mt-4">
        <div className="bg-[#fdebea] border border-[#fecdd3] rounded-[10px] p-3 shadow-xs space-y-2">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Perlu Ditangani Sekarang
          </h2>

          <div className="space-y-2">
            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">BSF-04</p>
                <span className="text-[10px] text-[#8192a5]">3 jam lalu</span>
              </div>
              <p className="text-[11px] text-[#f34860] font-medium mt-1">
                Suhu media lebih tinggi dari normal (34°C)
              </p>
            </div>

            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">BSF-02</p>
                <span className="text-[10px] text-[#8192a5]">6 jam lalu</span>
              </div>
              <p className="text-[11px] text-[#f69b23] font-medium mt-1">
                Kelembapan rendah (48%)
              </p>
            </div>

            <div className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#173251]">Input IN-0045</p>
                <span className="text-[10px] text-[#8192a5]">8 jam lalu</span>
              </div>
              <p className="text-[11px] text-[#00629b] font-medium mt-1">
                Menunggu verifikasi kualitas bahan (ABC Restaurant)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BSF Intelligence AI Dashboard (Model B1 + DSS + Vision A1/A2) */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-br from-white to-[#f0f8ff] border border-[#b8ddf2] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="size-6 rounded-md bg-[#00629b] text-white flex items-center justify-center">
                <Sparkles className="size-3.5" />
              </div>
              <h2 className="text-[13px] font-bold text-[#173251]">
                BSF AI Intelligence (Model B1 &amp; DSS)
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  aiMode === 'LIVE_FASTAPI'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                <Cpu className="size-3" />
                {aiMode === 'LIVE_FASTAPI' ? 'LIVE FastAPI (v2.1)' : 'Deterministic Fallback'}
              </span>
              <button
                type="button"
                onClick={fetchAiForecast}
                disabled={aiLoading}
                className="p-1 rounded-md text-[#00629b] hover:bg-[#e2f3fc] transition disabled:opacity-50"
                title="Perbarui Prediksi AI"
              >
                <RefreshCw className={`size-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Model B1 Growth Forecast Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 shadow-2xs">
              <span className="text-[9px] text-[#8192a5] uppercase font-bold tracking-wider">
                Prediksi Bobot ({b1Result?.horizonDays ?? 3} Hari)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[20px] font-extrabold text-[#00629b]">
                  {b1Result?.predictedNextWeightMg.toFixed(1) ?? '195.4'}
                </span>
                <span className="text-[10px] text-[#8192a5]">mg/larva</span>
              </div>
              <span className="text-[9.5px] text-[#14b97c] font-semibold">
                +{b1Result?.expectedDeltaMg.toFixed(1) ?? '25.4'} mg ({b1Result?.horizonDays ?? 3} hari)
              </span>
            </div>

            <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 shadow-2xs">
              <span className="text-[9px] text-[#8192a5] uppercase font-bold tracking-wider">
                Status Substrat DSS
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[14px] font-bold text-[#173251]">
                  {dssResult?.status ?? 'OPTIMAL'}
                </span>
              </div>
              <p className="text-[9px] text-[#8192a5] mt-0.5 line-clamp-2">
                {dssResult?.recommendations[0] ?? 'Media dalam rentang biokonversi optimal.'}
              </p>
            </div>
          </div>

          {/* AI Vision Photo Scanner (YOLO A1 + MobileNetV3 A2 v3) */}
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Camera className="size-3.5 text-[#00629b]" />
                <span className="text-[11px] font-bold text-[#173251]">
                  AI Vision Sampel Maggot (YOLO A1 + MobileNetV3 A2)
                </span>
              </div>
              <span className="text-[8.5px] font-semibold text-[#8192a5]">
                {photoResult ? photoResult.mode : 'Siap Deteksi'}
              </span>
            </div>

            {photoResult ? (
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-[6px] p-2 space-y-1.5 text-[10px]">
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="bg-white p-1 rounded border border-[#e0f2fe]">
                    <span className="text-[#8192a5] text-[8.5px]">Jumlah Larva</span>
                    <p className="font-bold text-[#00629b] text-[13px]">{photoResult.larvaCount} ekor</p>
                  </div>
                  <div className="bg-white p-1 rounded border border-[#e0f2fe]">
                    <span className="text-[#8192a5] text-[8.5px]">Rerata Bobot</span>
                    <p className="font-bold text-[#14b97c] text-[13px]">{photoResult.meanWeightMg} mg</p>
                  </div>
                  <div className="bg-white p-1 rounded border border-[#e0f2fe]">
                    <span className="text-[#8192a5] text-[8.5px]">Rentang Bobot</span>
                    <p className="font-bold text-[#173251] text-[11px]">{photoResult.minWeightMg}-{photoResult.maxWeightMg} mg</p>
                  </div>
                </div>
                <p className="text-[9.5px] text-[#173251] pt-1 border-t border-[#e0f2fe]">
                  <span className="font-bold text-[#00629b]">Rekomendasi Panen:</span> {photoResult.recommendation}
                </p>
              </div>
            ) : (
              <p className="text-[9.5px] text-[#8192a5]">
                Unggah foto cawan sampel untuk menghitung jumlah larva dan estimasi bobot rata-rata secara otomatis via Computer Vision.
              </p>
            )}

            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleAnalyzePhoto('/images/bsf-batch-1.jpg')}
                disabled={photoLoading}
                className="flex-1 bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[10px] py-1.5 px-2 rounded-[5px] flex items-center justify-center gap-1 transition shadow-2xs disabled:opacity-50"
              >
                <Sparkles className="size-3" />
                <span>{photoLoading ? 'Menganalisis YOLO A1...' : 'Scan Foto Sampel Demo'}</span>
              </button>
              <label className="cursor-pointer bg-white border border-[#a9c9db] text-[#00629b] font-bold text-[10px] py-1.5 px-2 rounded-[5px] hover:bg-slate-50 transition">
                <span>Pilih Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setPhotoLoading(true);
                    try {
                      const res = await fetch('/api/ai/bsf-photo', {
                        method: 'POST',
                        headers: { 'Content-Type': file.type || 'image/jpeg' },
                        body: file,
                      });
                      if (res.ok) {
                        const data = await res.json();
                        const d = data.data || {};
                        setPhotoResult({
                          mode: data.mode,
                          larvaCount: d.larva_count ?? 38,
                          meanWeightMg: Number((d.mean_weight_mg ?? 178.4).toFixed(1)),
                          minWeightMg: Number((d.min_weight_mg ?? 115.0).toFixed(1)),
                          maxWeightMg: Number((d.max_weight_mg ?? 220.0).toFixed(1)),
                          recommendation: d.recommendation ?? 'Larva terdeteksi dalam kondisi sehat dan siap panen.',
                        });
                        toast.success('Foto berhasil dianalisis dengan model YOLO A1 + MobileNetV3 A2!');
                      }
                    } catch {
                      toast.error('Gagal menganalisis foto.');
                    } finally {
                      setPhotoLoading(false);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Batch BSF Aktif */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Batch BSF Aktif
            </h2>
            <Link
              href="/mitra/bsf/allocate"
              className="text-[10px] font-bold text-[#00629b] hover:underline"
            >
              + Alokasikan ke Kolam →
            </Link>
          </div>

          <div className="space-y-2">
            {bsfBatches.map((batch) => (
              <div
                key={batch.id}
                className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-[6px] bg-[#e2f3fc] flex items-center justify-center font-bold text-[11px] text-[#00629b]">
                      {batch.id}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#173251]">
                        {batch.name}
                      </p>
                      <p className="text-[10px] text-[#8192a5]">
                        Hari {batch.dayOfCycle}/14 · Suhu: {batch.mediaTempC}°C · Kelembaban: {batch.mediaHumidityPct}%
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${
                      batch.status === 'Siap Panen'
                        ? 'bg-[#e5f8ef] text-[#14b97c]'
                        : batch.status === 'Perhatian'
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-[#e2f3fc] text-[#00629b]'
                    }`}
                  >
                    {batch.status}
                  </span>
                </div>

                <div className="text-[11px] space-y-1 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8192a5]">Input Sampah Organik</span>
                    <span className="font-semibold text-[#173251]">
                      {batch.organicInputTotalKg} kg
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8192a5]">Estimasi Hasil Maggot</span>
                    <span className="font-semibold text-[#173251]">
                      {batch.estimatedMaggotYieldKg} kg (Panen: {batch.harvestedMaggotKg} kg)
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href={`/mitra/bsf/allocate?batchId=${batch.id}`}
                    className="w-full bg-[#f3f9fc] hover:bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] font-bold text-[11px] py-1.5 rounded-[5px] flex items-center justify-center transition"
                  >
                    Alokasikan Pakan ke Kolam
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alur Sirkular Minggu Ini */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Alur Sirkular Minggu Ini
          </h2>

          <div className="bg-slate-50 border border-slate-200/80 rounded-[8px] p-3 text-center space-y-2">
            <div>
              <p className="text-[18px] font-bold text-[#173251]">
                {totalBiowasteKg} kg
              </p>
              <p className="text-[10px] text-[#8192a5]">Sampah Organik Terkumpul</p>
            </div>

            <p className="text-[#14b97c] font-bold text-[16px] leading-none">↓</p>

            <div className="flex items-center justify-around text-[11px] pt-1 border-t border-slate-200">
              <div>
                <span className="text-[#8192a5]">Sudah Diproses</span>
                <p className="font-bold text-[#173251]">270 kg</p>
              </div>
              <div>
                <span className="text-[#8192a5]">Hasil Maggot BSF</span>
                <p className="font-bold text-[#14b97c]">{totalHarvestedMaggotKg} kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pemanfaatan Hasil BSF untuk Pakan Ikan */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Pemanfaatan Hasil BSF
            </h2>
            <Link
              href="/mitra/bsf/allocate"
              className="text-[10px] font-bold text-[#00629b] hover:underline"
            >
              Kelola Alokasi →
            </Link>
          </div>

          <p className="text-[24px] font-bold text-[#173251] leading-none">
            {totalHarvestedMaggotKg} kg
          </p>
          <p className="text-[10px] text-[#8192a5]">Total hasil BSF (panen)</p>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Dialokasikan ke pakan ikan</span>
              <span className="font-semibold text-[#00629b]">
                {totalAllocatedKg} kg ·{' '}
                {Math.round((totalAllocatedKg / (totalHarvestedMaggotKg || 1)) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Tersedia</span>
              <span className="font-semibold text-[#14b97c]">
                {availableMaggotKg} kg ·{' '}
                {Math.round((availableMaggotKg / (totalHarvestedMaggotKg || 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* Horizontal Linear Progress Bar */}
          <div className="w-full bg-[#e7eff4] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#14b97c] h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (totalAllocatedKg / (totalHarvestedMaggotKg || 1)) * 100
                )}%`,
              }}
            />
          </div>

          {/* Alokasi ke Kolam Summary */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
            <p className="font-bold text-[#173251]">Alokasi ke Kolam</p>
            {bsfFeedAllocations.slice(0, 4).map((alloc) => (
              <div key={alloc.id} className="flex items-center justify-between text-[#8192a5]">
                <span>{alloc.pondName}</span>
                <span className="font-semibold text-[#173251]">
                  {alloc.maggotKg} kg
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/mitra/bsf/allocate"
              className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] min-h-[38px] rounded-[6px] flex items-center justify-center transition active:scale-[0.99] shadow-xs"
            >
              Alokasikan Pakan ke Kolam
            </Link>
          </div>
        </div>
      </div>

      {/* Input Organik Terverifikasi */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Input Organik Terverifikasi
            </h2>
            <span className="text-[10px] text-[#00629b] font-medium">
              Lihat Semua
            </span>
          </div>

          <div className="space-y-2">
            {contributions.slice(0, 4).map((contrib) => (
              <div
                key={contrib.id}
                className="bg-white border border-[#e7eff4] rounded-[7px] p-2.5 flex items-center justify-between"
              >
                <div>
                  <p className="text-[12px] font-bold text-[#173251]">
                    {contrib.id} · {contrib.contributorName}
                  </p>
                  <p className="text-[10px] text-[#8192a5] mt-0.5">
                    {contrib.actualKg || contrib.estimatedKg} kg · {contrib.category}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-semibold ${
                    contrib.status === 'Diterima'
                      ? 'bg-[#e5f8ef] text-[#14b97c]'
                      : 'bg-[#fdebea] text-[#f34860]'
                  }`}
                >
                  {contrib.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dampak Sirkular */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2.5">
          <h2 className="text-[14px] font-bold text-[#173251]">
            Dampak Sirkular
          </h2>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
                <p className="text-[21px] font-bold text-[#173251] leading-none">
                  {totalBiowasteKg} kg
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Sampah dimanfaatkan
                </p>
                <p className="text-[9px] text-[#14b97c] font-semibold">↑ 12% vs bln lalu</p>
              </div>

              <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs">
                <p className="text-[21px] font-bold text-[#173251] leading-none">
                  {Math.round(totalBiowasteKg * 1.5)} kg
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Emisi Terhindari
                </p>
                <p className="text-[9px] text-[#14b97c] font-semibold">↑ 18% reduksi CO2e</p>
              </div>
            </div>

            <div className="bg-[#e5f8ef] border border-[#a7f3d0] rounded-[8px] p-3 flex items-center justify-between">
              <div>
                <p className="text-[21px] font-bold text-[#14b97c] leading-none">
                  100%
                </p>
                <p className="text-[10px] font-bold text-[#173251] mt-1">
                  Bahan Organik Terverifikasi
                </p>
              </div>
              <span className="text-[10px] text-[#14b97c] font-semibold bg-white px-2 py-1 rounded-[4px] shadow-2xs">
                Sesuai Standar Mutu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
