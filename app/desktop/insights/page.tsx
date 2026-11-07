'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Sprout,
  ClipboardList,
  Search,
  Bell,
  ChevronDown,
  CheckCircle2,
  PlusCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

interface InsightItem {
  id: string;
  category: 'Kritis' | 'Peringatan' | 'Saran' | 'Optimal';
  title: string;
  description: string;
  target: string;
  timeAgo: string;
  impactScore: string;
  pondId: string;
  iconType: 'pond' | 'bsf' | 'sensor' | 'feed' | 'waste';
  parameters?: {
    name: string;
    value: string;
    status: 'Aman' | 'Peringatan' | 'Kritis';
  }[];
  trendPoints?: number[];
  recommendations: string[];
}

const INSIGHTS_DATA: InsightItem[] = [
  {
    id: 'INS-01',
    category: 'Kritis',
    title: 'Penurunan Drastis Dissolved Oxygen (DO)',
    description: 'Nilai DO berada di level 2.8 mg/L selama 40 menit terakhir. Ikan menunjukkan indikasi stres permukaan.',
    target: 'Kolam B-02 (Nila Hitam)',
    timeAgo: '15 menit lalu',
    impactScore: '-35% nafsu makan',
    pondId: 'POND-02',
    iconType: 'pond',
    parameters: [
      { name: 'Dissolved Oxygen (DO)', value: '2.8 mg/L', status: 'Kritis' },
      { name: 'Suhu Air', value: '29.2 °C', status: 'Aman' },
      { name: 'pH Air', value: '7.4', status: 'Aman' },
      { name: 'ORP (Redox)', value: '210 mV', status: 'Peringatan' },
      { name: 'Kekeruhan (Turbidity)', value: '45 NTU', status: 'Aman' },
    ],
    trendPoints: [5.2, 5.0, 4.8, 4.5, 4.2, 3.8, 3.5, 3.1, 2.9, 2.8],
    recommendations: [
      'Nyalakan aerator paddle-wheel cadangan nomor 2 dan 3 sekarang juga.',
      'Hentikan sementara pakan sore hingga kadar DO kembali di atas 4.5 mg/L.',
      'Buka pintu inlet sirkulasi air baru 15% untuk menyegarkan kolom air.',
      'Lakukan validasi manual menggunakan optical DO meter portabel.',
    ],
  },
  {
    id: 'INS-02',
    category: 'Peringatan',
    title: 'Kelembaban Substrat Biokonversi Terlalu Tinggi',
    description: 'Kadar air media maggot BSF mencapai 78% (ambang optimal 60-70%). Pertumbuhan larva berisiko melambat.',
    target: 'Unit Biokonversi BSF Rak-03',
    timeAgo: '1 jam lalu',
    impactScore: '-15% konversi',
    pondId: 'BSF-03',
    iconType: 'bsf',
    parameters: [
      { name: 'Kelembaban Substrat', value: '78 %', status: 'Peringatan' },
      { name: 'Suhu Biopond', value: '31.5 °C', status: 'Aman' },
      { name: 'pH Media', value: '6.2', status: 'Aman' },
      { name: 'Densitas Larva', value: '3.2 kg/m²', status: 'Aman' },
    ],
    trendPoints: [62, 64, 65, 68, 70, 72, 75, 76, 78, 78],
    recommendations: [
      'Tambahkan dedak kering atau ampas gergaji sebanyak 15 kg untuk menyerap kelembaban.',
      'Tingkatkan putaran blower sirkulasi udara pada lorong pembesaran.',
      'Balik media substrat menggunakan sekop bergigi halus.',
    ],
  },
  {
    id: 'INS-03',
    category: 'Peringatan',
    title: 'Sinyal Telemetri Sensor Fluktuatif (Intermittent)',
    description: 'Probe sensor IoT Kolam D-04 mengalami packet loss 12% dalam 3 jam terakhir karena endapan biofilm.',
    target: 'Sensor DO-05 · Kolam D-04',
    timeAgo: '2 jam lalu',
    impactScore: 'Data noise',
    pondId: 'DEV-05',
    iconType: 'sensor',
    parameters: [
      { name: 'Paket Telemetri', value: '88 %', status: 'Peringatan' },
      { name: 'Baterai Sensor', value: '84 %', status: 'Aman' },
      { name: 'Sinyal LoRaWAN', value: '-92 dBm', status: 'Aman' },
    ],
    trendPoints: [99, 98, 97, 95, 92, 90, 88, 86, 88, 88],
    recommendations: [
      'Bersihkan membran optik sensor dengan air aquades dan tisu optik.',
      'Lakukan kalibrasi 2-titik (air jenuh udara dan natrium sulfit 0%).',
      'Periksa pengencangan konektor IP68 pada kabel probe.',
    ],
  },
  {
    id: 'INS-04',
    category: 'Saran',
    title: 'Potensi Percepatan Pertumbuhan Ikan Nila',
    description: 'Kondisi air kolam A-01 prima (DO 6.1 mg/L, suhu 28.5°C). Efisiensi konversi pakan dapat dinaikkan 5%.',
    target: 'Kolam A-01 (Nila Merah)',
    timeAgo: '3 jam lalu',
    impactScore: '+45 kg biomassa',
    pondId: 'POND-01',
    iconType: 'feed',
    parameters: [
      { name: 'Dissolved Oxygen (DO)', value: '6.1 mg/L', status: 'Aman' },
      { name: 'Suhu Air', value: '28.5 °C', status: 'Aman' },
      { name: 'pH Air', value: '7.6', status: 'Aman' },
      { name: 'FCR Siklus', value: '1.15', status: 'Aman' },
    ],
    trendPoints: [5.8, 5.9, 6.0, 6.1, 6.2, 6.1, 6.1, 6.0, 6.1, 6.1],
    recommendations: [
      'Tambahkan porsi pakan maggot berprotein tinggi sebesar 5% pada sesi siang.',
      'Catat penambahan sampling bobot mingguan di aplikasi.',
    ],
  },
  {
    id: 'INS-05',
    category: 'Optimal',
    title: 'Rasio Konversi Pakan (FCR) Capai Rekor Terbaik',
    description: 'Kolam C-03 mencatatkan FCR 1.08 dengan substitusi 40% pakan pelet maggot mandiri.',
    target: 'Kolam C-03 (Bandeng Organik)',
    timeAgo: '5 jam lalu',
    impactScore: 'Hemat Rp 3,2 jt',
    pondId: 'POND-03',
    iconType: 'pond',
    parameters: [
      { name: 'FCR Terkini', value: '1.08', status: 'Aman' },
      { name: 'Substitusi Maggot', value: '40 %', status: 'Aman' },
      { name: 'Kelangsungan Hidup (SR)', value: '94 %', status: 'Aman' },
    ],
    trendPoints: [1.25, 1.22, 1.20, 1.18, 1.15, 1.12, 1.10, 1.09, 1.08, 1.08],
    recommendations: [
      'Pertahankan jadwal feeding regiment 3 kali sehari.',
      'Jadikan standar operasional prosedur untuk siklus berikutnya.',
    ],
  },
  {
    id: 'INS-06',
    category: 'Saran',
    title: 'Pembersihan Sedimen Organik Dasar Kolam',
    description: 'Sensor ORP mengindikasikan akumulasi bahan organik dasar kolam mendekati batas toleransi.',
    target: 'Kolam D-04 (Lele Sangkuriang)',
    timeAgo: '8 jam lalu',
    impactScore: 'Cegah amonia',
    pondId: 'POND-04',
    iconType: 'waste',
    parameters: [
      { name: 'ORP (Redox)', value: '165 mV', status: 'Peringatan' },
      { name: 'pH Air', value: '6.9', status: 'Aman' },
      { name: 'Amonia Total', value: '0.04 mg/L', status: 'Aman' },
    ],
    trendPoints: [220, 210, 200, 195, 185, 180, 175, 170, 165, 165],
    recommendations: [
      'Lakukan penyedotan (siphon) lumpur dasar kolam pada central drain.',
      'Berikan probiotik Bacillus sp. untuk mempercepat dekomposisi feses.',
    ],
  },
];

export default function InsightsDesktopPage() {
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'Kritis' | 'Peringatan' | 'Saran' | 'Optimal'>('Semua');
  const [activeTab, setActiveTab] = useState<'Ringkasan' | 'Telemetri' | 'Tren' | 'Dampak' | 'Aksi' | 'Histori'>('Ringkasan');
  const [selectedInsight, setSelectedInsight] = useState<InsightItem>(INSIGHTS_DATA[0]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredInsights = INSIGHTS_DATA.filter((item) => {
    if (selectedFilter === 'Semua') return true;
    return item.category === selectedFilter;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleStep = (stepIdx: number) => {
    const key = `${selectedInsight.id}-${stepIdx}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className="bg-[#f3f9fc] min-h-screen text-[#163252] font-sans antialiased pb-12"
      data-node-id="55:58809"
      data-name="Fiscycle · Insight & Rekomendasi"
    >
      {/* Search and Account Strip */}
      <header className="bg-white border-b border-[#e7eff4] px-8 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3 w-96 bg-[#f7fafc] border border-[#e2e8f0] rounded-lg px-3 py-1.5 focus-within:border-[#1c74a7] transition">
          <Search className="size-4 text-[#8192a5]" />
          <input
            type="text"
            placeholder="Cari insight, anomali air, atau rekomendasi..."
            className="bg-transparent text-[13px] outline-none text-[#163252] placeholder-[#8192a5] w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => showToast('Semua rekomendasi telah disinkronkan.')}
            className="relative p-2 text-[#64748b] hover:text-[#1c74a7] transition rounded-lg hover:bg-slate-100"
            title="Notifikasi"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-[#dc2626] rounded-full" />
          </button>

          <div className="h-6 w-px bg-[#e2e8f0]" />

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="size-8 rounded-full bg-[#1c74a7] text-white flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-[#163252] leading-none">Budi Santoso</p>
              <p className="text-[11px] text-[#8192a5] mt-0.5">Mitra Tambak Utama</p>
            </div>
            <ChevronDown className="size-3.5 text-[#8192a5]" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-8 pt-6 space-y-6">
        {/* Page Banner */}
        <div
          className="relative bg-gradient-to-r from-[#173251] via-[#1c4b75] to-[#1c74a7] rounded-2xl p-6 text-white overflow-hidden shadow-md"
          data-node-id="55:58902"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-[#8ed8f8] mb-2">
              <Sparkles className="size-3.5" />
              <span>AI Agronomist Engine v2.4 · Akurasi 96.8%</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Insight &amp; Rekomendasi Budidaya</h1>
            <p className="text-xs text-[#d0e6f5] mt-1 leading-relaxed">
              Analisis cerdas multivariat menggabungkan telemetri sensor IoT air, formula pakan BSF maggot,
              dan prakiraan cuaca lokal untuk memitigasi risiko kematian ikan serta menekan FCR.
            </p>
          </div>

          <div className="absolute right-6 top-6 hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
            <div className="text-right">
              <p className="text-xs text-[#8ed8f8] font-medium">Kondisi Tambak Terkini</p>
              <p className="text-sm font-bold text-white">94% Kepatuhan CBIB</p>
            </div>
            <div className="size-10 rounded-full bg-[#10b981]/20 flex items-center justify-center text-[#34d399]">
              <Sprout className="size-5" />
            </div>
          </div>
        </div>

        {/* 5 Summary KPI Metrics */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-3.5"
          data-node-id="55:58919"
          data-name="Insight summary"
        >
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="size-10 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
              <AlertTriangle className="size-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#dc2626]">3</p>
              <p className="text-xs font-semibold text-[#163252] leading-none mt-0.5">Kritis</p>
              <p className="text-[10px] text-[#8192a5]">Perlu tindakan cepat</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="size-10 rounded-lg bg-[#fffbeb] text-[#d97706] flex items-center justify-center shrink-0">
              <AlertCircle className="size-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#d97706]">5</p>
              <p className="text-xs font-semibold text-[#163252] leading-none mt-0.5">Peringatan</p>
              <p className="text-[10px] text-[#8192a5]">Pantau dalam 24 jam</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="size-10 rounded-lg bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
              <Info className="size-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#2563eb]">8</p>
              <p className="text-xs font-semibold text-[#163252] leading-none mt-0.5">Saran Optimasi</p>
              <p className="text-[10px] text-[#8192a5]">Peningkatan efisiensi</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="size-10 rounded-lg bg-[#ecfdf5] text-[#059669] flex items-center justify-center shrink-0">
              <Sprout className="size-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#059669]">94%</p>
              <p className="text-xs font-semibold text-[#163252] leading-none mt-0.5">Skor Kepatuhan</p>
              <p className="text-[10px] text-[#8192a5]">Standar ekosistem</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="size-10 rounded-lg bg-[#f8fafc] text-[#475569] flex items-center justify-center shrink-0">
              <ClipboardList className="size-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#163252]">16</p>
              <p className="text-xs font-semibold text-[#163252] leading-none mt-0.5">Total Insight</p>
              <p className="text-[10px] text-[#8192a5]">Aktif siklus ini</p>
            </div>
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
          data-node-id="55:58955"
          data-name="Insight list and analysis"
        >
          {/* Left Panel: Insight List (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-xs space-y-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {(['Semua', 'Kritis', 'Peringatan', 'Saran', 'Optimal'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition ${
                    selectedFilter === filter
                      ? 'bg-[#1c74a7] text-white font-semibold'
                      : 'bg-[#f1f5f9] text-[#64748b] hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* List Cards */}
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredInsights.map((insight) => {
                const isSelected = selectedInsight.id === insight.id;
                return (
                  <div
                    key={insight.id}
                    onClick={() => setSelectedInsight(insight)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-[#1c74a7] bg-[#f0f8fd] shadow-xs ring-1 ring-[#1c74a7]/20'
                        : 'border-[#e2e8f0] hover:border-[#cbd5e1] hover:bg-slate-50/70'
                    }`}
                  >
                    <div
                      className={`size-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        insight.category === 'Kritis'
                          ? 'bg-[#fef2f2] text-[#dc2626]'
                          : insight.category === 'Peringatan'
                          ? 'bg-[#fffbeb] text-[#d97706]'
                          : insight.category === 'Saran'
                          ? 'bg-[#eff6ff] text-[#2563eb]'
                          : 'bg-[#ecfdf5] text-[#059669]'
                      }`}
                    >
                      {insight.category === 'Kritis' && <AlertTriangle className="size-5" />}
                      {insight.category === 'Peringatan' && <AlertCircle className="size-5" />}
                      {insight.category === 'Saran' && <Sparkles className="size-5" />}
                      {insight.category === 'Optimal' && <CheckCircle2 className="size-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            insight.category === 'Kritis'
                              ? 'bg-[#dc2626] text-white'
                              : insight.category === 'Peringatan'
                              ? 'bg-[#f59e0b] text-white'
                              : insight.category === 'Saran'
                              ? 'bg-[#2563eb] text-white'
                              : 'bg-[#10b981] text-white'
                          }`}
                        >
                          {insight.category}
                        </span>
                        <span className="text-[10px] text-[#8192a5]">{insight.timeAgo}</span>
                      </div>

                      <h3 className="font-bold text-xs text-[#163252] mt-1 truncate">
                        {insight.title}
                      </h3>
                      <p className="text-[11px] text-[#64748b] line-clamp-2 mt-0.5 leading-snug">
                        {insight.description}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e2e8f0]/60 text-[10px]">
                        <span className="font-semibold text-[#1c74a7]">{insight.target}</span>
                        <span className="text-[#64748b] font-medium">{insight.impactScore}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Detailed Insight View (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-4">
            {/* Header of Selected Insight */}
            <div className="flex items-start justify-between pb-3.5 border-b border-[#e2e8f0]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      selectedInsight.category === 'Kritis'
                        ? 'bg-[#dc2626] text-white'
                        : selectedInsight.category === 'Peringatan'
                        ? 'bg-[#f59e0b] text-white'
                        : selectedInsight.category === 'Saran'
                        ? 'bg-[#2563eb] text-white'
                        : 'bg-[#10b981] text-white'
                    }`}
                  >
                    {selectedInsight.category}
                  </span>
                  <span className="text-xs text-[#8192a5]">{selectedInsight.target}</span>
                </div>
                <h2 className="text-base font-bold text-[#163252]">{selectedInsight.title}</h2>
                <p className="text-xs text-[#64748b] mt-1">{selectedInsight.description}</p>
              </div>

              <span className="text-xs font-semibold text-[#1c74a7] bg-[#e0f2fe] px-2.5 py-1 rounded-md shrink-0">
                {selectedInsight.id}
              </span>
            </div>

            {/* Sub-tab Navigation */}
            <div className="flex items-center gap-2 border-b border-[#e2e8f0] text-xs">
              {(['Ringkasan', 'Telemetri', 'Tren', 'Dampak', 'Aksi'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 px-2 font-medium transition relative ${
                    activeTab === tab
                      ? 'text-[#1c74a7] font-bold'
                      : 'text-[#64748b] hover:text-[#163252]'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1c74a7] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="space-y-4 pt-1">
              {/* Telemetri Air Parameters */}
              {selectedInsight.parameters && (
                <div>
                  <h4 className="text-xs font-bold text-[#163252] mb-2 flex items-center justify-between">
                    <span>Bacaan Sensor IoT Terkini</span>
                    <span className="text-[10px] text-[#8192a5] font-normal">Sinkron 1 mnt lalu</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selectedInsight.parameters.map((param) => (
                      <div
                        key={param.name}
                        className="p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex items-center justify-between"
                      >
                        <span className="text-[#64748b] text-[11px]">{param.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#163252]">{param.value}</span>
                          <span
                            className={`size-2 rounded-full ${
                              param.status === 'Aman'
                                ? 'bg-[#10b981]'
                                : param.status === 'Peringatan'
                                ? 'bg-[#f59e0b]'
                                : 'bg-[#dc2626]'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trend Chart (SVG) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#163252]">Tren Parameter 24 Jam</h4>
                  <span className="text-[11px] font-semibold text-[#dc2626] flex items-center gap-1">
                    <TrendingDown className="size-3" />
                    Ambang Kritis &lt; 4.0 mg/L
                  </span>
                </div>

                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 relative h-36 flex flex-col justify-between">
                  {/* Grid lines */}
                  <div className="absolute inset-x-3 top-6 border-b border-dashed border-[#e2e8f0]" />
                  <div className="absolute inset-x-3 top-16 border-b border-dashed border-[#fca5a5]" />
                  <div className="absolute inset-x-3 top-26 border-b border-dashed border-[#e2e8f0]" />

                  {/* SVG Sparkline */}
                  <div className="relative h-24 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
                      {/* Safety threshold line */}
                      <line
                        x1="0"
                        y1="40"
                        x2="300"
                        y2="40"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      {/* Curve */}
                      <path
                        d="M 0 15 Q 40 18, 80 25 T 160 42 T 220 58 T 300 68"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                      />
                      {/* Data Points */}
                      <circle cx="0" cy="15" r="3.5" fill="#0284c7" />
                      <circle cx="80" cy="25" r="3.5" fill="#0284c7" />
                      <circle cx="160" cy="42" r="3.5" fill="#0284c7" />
                      <circle cx="220" cy="58" r="3.5" fill="#dc2626" />
                      <circle cx="300" cy="68" r="4" fill="#dc2626" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#8192a5] pt-1">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00 (Kritis)</span>
                    <span>Sekarang</span>
                  </div>
                </div>
              </div>

              {/* Recommended Action Checklist */}
              <div>
                <h4 className="text-xs font-bold text-[#163252] mb-2 flex items-center justify-between">
                  <span>Langkah Penanganan Direkomendasikan AI</span>
                  <span className="text-[10px] text-[#1c74a7] font-semibold">
                    {selectedInsight.recommendations.length} Tindakan
                  </span>
                </h4>

                <div className="space-y-2">
                  {selectedInsight.recommendations.map((step, idx) => {
                    const stepKey = `${selectedInsight.id}-${idx}`;
                    const isDone = !!completedSteps[stepKey];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        className={`p-2.5 rounded-lg border text-xs flex items-start gap-3 cursor-pointer transition ${
                          isDone
                            ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#065f46]'
                            : 'bg-white border-[#e2e8f0] text-[#163252] hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`size-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                            isDone
                              ? 'bg-[#10b981] text-white'
                              : 'bg-[#f1f5f9] text-[#64748b] border border-[#cbd5e1]'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <p className={`flex-1 text-[11px] leading-snug ${isDone ? 'line-through text-[#047857]' : ''}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  onClick={() => showToast(`Tindakan untuk ${selectedInsight.id} berhasil ditandai selesai!`)}
                  className="flex-1 py-2.5 bg-[#1c74a7] hover:bg-[#165d86] text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="size-4" />
                  <span>Selesaikan Tindakan</span>
                </button>

                <button
                  onClick={() => showToast('Catatan lapangan berhasil ditambahkan ke buku tambak.')}
                  className="px-4 py-2.5 bg-[#f1f5f9] hover:bg-slate-200 text-[#163252] font-semibold text-xs rounded-lg transition flex items-center gap-1.5"
                >
                  <PlusCircle className="size-4" />
                  <span>Tambah Catatan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#163252] text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
