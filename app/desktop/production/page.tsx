'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Waves,
  Fish,
  Package,
  Calendar,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Clock,
  Radio,
  Search,
  Bell,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

interface ProductionPondRow {
  id: string;
  name: string;
  species: string;
  stock: string;
  fcr: string;
  status: 'Optimal' | 'Perhatian' | 'Kritis';
}

const PRODUCTION_PONDS: ProductionPondRow[] = [
  {
    id: 'POND-01',
    name: 'Kolam A-01',
    species: 'Ikan Nila Merah',
    stock: '5.000 ekor',
    fcr: '1.15',
    status: 'Optimal',
  },
  {
    id: 'POND-02',
    name: 'Kolam B-02',
    species: 'Ikan Nila Hitam',
    stock: '4.500 ekor',
    fcr: '1.22',
    status: 'Perhatian',
  },
  {
    id: 'POND-03',
    name: 'Kolam C-03',
    species: 'Bandeng Organik',
    stock: '6.000 ekor',
    fcr: '1.08',
    status: 'Optimal',
  },
  {
    id: 'POND-04',
    name: 'Kolam D-04',
    species: 'Ikan Lele Sangkuriang',
    stock: '8.000 ekor',
    fcr: '1.02',
    status: 'Optimal',
  },
];

export default function ProductionSummaryDesktopPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'Hari Ini' | 'Minggu Ini' | 'Bulan Ini'>('Bulan Ini');
  const [activeFilter, setActiveFilter] = useState<'semua' | 'optimal' | 'perhatian'>('semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredPonds = PRODUCTION_PONDS.filter((p) => {
    if (activeFilter === 'optimal') return p.status === 'Optimal';
    if (activeFilter === 'perhatian') return p.status === 'Perhatian';
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div
      className="bg-[#f3f9fc] min-h-screen text-[#163252] font-sans antialiased pb-12"
      data-node-id="65:17197"
      data-name="Fiscycle · Ringkasan Produksi"
    >
      {/* Top Search & Account Strip */}
      <header className="bg-white border-b border-[#e7eff4] px-8 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3 w-96 bg-[#f7fafc] border border-[#e2e8f0] rounded-lg px-3 py-1.5 focus-within:border-[#1c74a7] transition">
          <Search className="size-4 text-[#8192a5]" />
          <input
            type="text"
            placeholder="Cari data produksi, kolam, atau siklus..."
            className="bg-transparent text-[13px] outline-none text-[#163252] placeholder-[#8192a5] w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => showToast('Tidak ada notifikasi kritis baru.')}
            className="relative p-2 text-[#64748b] hover:text-[#1c74a7] transition rounded-lg hover:bg-slate-100"
            title="Notifikasi"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-[#e05252] rounded-full" />
          </button>

          <div className="h-6 w-px bg-[#e2e8f0]" />

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="size-8 rounded-full bg-[#1c74a7] text-white flex items-center justify-center font-bold text-xs">
              BS
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-[#163252] leading-none">Budi Santoso</p>
              <p className="text-[11px] text-[#8192a5] mt-0.5">Tambak Mina Barokah</p>
            </div>
            <ChevronDown className="size-3.5 text-[#8192a5]" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-8 pt-6 space-y-6">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8192a5] mb-1">
              <span>Produksi</span>
              <span>›</span>
              <span className="font-semibold text-[#1c74a7]">Ringkasan Produksi</span>
            </div>
            <h1 className="text-2xl font-bold text-[#163252]">Ringkasan Produksi</h1>
            <p className="text-xs text-[#64748b] mt-0.5">
              Monitoring performa agregat tambak, utilisasi pakan maggot BSF, dan status panen.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-white border border-[#e2e8f0] rounded-lg p-0.5 text-xs font-semibold text-[#64748b]">
              {(['Hari Ini', 'Minggu Ini', 'Bulan Ini'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-md transition ${
                    selectedPeriod === period
                      ? 'bg-[#e2f3fc] text-[#1c74a7] font-bold shadow-xs'
                      : 'hover:text-[#163252]'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            <Link
              href="/desktop/cycles"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c74a7] hover:bg-[#165d86] text-white font-semibold text-xs rounded-lg shadow-sm transition"
            >
              <span>Tambah Siklus</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* 5 KPI Bento Cards */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-3.5"
          data-node-id="65:17300"
          data-name="Production summary"
        >
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
            <div className="size-11 rounded-lg bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
              <Waves className="size-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#163252]">5</p>
              <p className="text-[11px] text-[#8192a5] font-medium leading-tight">Kolam Aktif</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
            <div className="size-11 rounded-lg bg-[#ecfdf5] text-[#059669] flex items-center justify-center shrink-0">
              <Fish className="size-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#163252]">2.450 kg</p>
              <p className="text-[11px] text-[#8192a5] font-medium leading-tight">Estimasi Biomassa</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
            <div className="size-11 rounded-lg bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0">
              <Package className="size-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#163252]">185 kg</p>
              <p className="text-[11px] text-[#8192a5] font-medium leading-tight">Pakan Hari Ini</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
            <div className="size-11 rounded-lg bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center shrink-0">
              <Calendar className="size-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#163252]">3</p>
              <p className="text-[11px] text-[#8192a5] font-medium leading-tight">Siap Panen (Bulan Ini)</p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
            <div className="size-11 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
              <AlertCircle className="size-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#163252]">1</p>
              <p className="text-[11px] text-[#8192a5] font-medium leading-tight">Peringatan Kualitas</p>
            </div>
          </div>
        </div>

        {/* 3 Column Priority Section (Perlu Ditangani, Siklus Aktif, Panen Terdekat) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          data-node-id="65:17331"
          data-name="Production priorities"
        >
          {/* Col 1: Perlu Ditangani Sekarang (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-sm font-bold text-[#163252]">Perlu Ditangani Sekarang</h2>
                <span className="text-[11px] text-[#e05252] font-semibold bg-[#fef2f2] px-2 py-0.5 rounded-full">
                  3 Masalah
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-[#fff8f8] border border-[#fecaca] rounded-lg flex items-start gap-3">
                  <AlertTriangle className="size-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#dc2626]">DO Rendah · Kolam B-02</p>
                      <span className="text-[10px] text-[#991b1b] font-medium">Kritis</span>
                    </div>
                    <p className="text-[#7f1d1d] text-[11px] mt-0.5">
                      DO 2.8 mg/L (ambang aman &gt; 4.0). Aerator darurat dinyalakan otomatis.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#fffdf0] border border-[#fef08a] rounded-lg flex items-start gap-3">
                  <AlertCircle className="size-4 text-[#d97706] shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#92400e]">Suhu Tinggi · Kolam A-01</p>
                      <span className="text-[10px] text-[#78350f] font-medium">Perhatian</span>
                    </div>
                    <p className="text-[#854d0e] text-[11px] mt-0.5">
                      Suhu 32.4°C akibat terik siang. Direkomendasikan menambah pasokan air segar.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg flex items-start gap-3">
                  <Clock className="size-4 text-[#64748b] shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#1e293b]">Jadwal Pakan Sesi Sore</p>
                      <span className="text-[10px] text-[#64748b] font-medium">16:00 WIB</span>
                    </div>
                    <p className="text-[#64748b] text-[11px] mt-0.5">
                      Pemberian 45 kg formulasi BSF Maggot untuk Kolam C-03 &amp; D-04.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-[#8192a5] text-right mt-3">
              Monitoring telemetri terhubung 24/7
            </p>
          </div>

          {/* Col 2: Siklus Budidaya Aktif (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-sm font-bold text-[#163252]">Siklus Budidaya Aktif</h2>
                <Link
                  href="/desktop/cycles"
                  className="text-[11px] font-semibold text-[#1c74a7] hover:underline"
                >
                  Lihat Semua (5)
                </Link>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 border border-[#e2e8f0] rounded-lg flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-md bg-[#e0f2fe] flex items-center justify-center font-bold text-xs text-[#0284c7]">
                      A1
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#163252]">Kolam A-01 · Nila Merah</p>
                      <p className="text-[11px] text-[#8192a5]">Hari ke-45 · Biomassa 620 kg</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ecfdf5] text-[#059669]">
                    <span className="size-1.5 rounded-full bg-[#10b981]" />
                    Optimal
                  </span>
                </div>

                <div className="p-2.5 border border-[#e2e8f0] rounded-lg flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-md bg-[#fef3c7] flex items-center justify-center font-bold text-xs text-[#d97706]">
                      B2
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#163252]">Kolam B-02 · Nila Hitam</p>
                      <p className="text-[11px] text-[#8192a5]">Hari ke-62 · Biomassa 850 kg</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#fffbeb] text-[#d97706]">
                    <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                    Perhatian
                  </span>
                </div>

                <div className="p-2.5 border border-[#e2e8f0] rounded-lg flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-md bg-[#e0f2fe] flex items-center justify-center font-bold text-xs text-[#0284c7]">
                      C3
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#163252]">Kolam C-03 · Bandeng</p>
                      <p className="text-[11px] text-[#8192a5]">Hari ke-28 · Biomassa 480 kg</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ecfdf5] text-[#059669]">
                    <span className="size-1.5 rounded-full bg-[#10b981]" />
                    Optimal
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-[#8192a5] text-right mt-3">
              Total 5 kolam beroperasi
            </p>
          </div>

          {/* Col 3: Panen Terdekat (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-sm font-bold text-[#163252]">Panen Terdekat</h2>
                <Link
                  href="/desktop/harvest"
                  className="text-[11px] font-semibold text-[#1c74a7] hover:underline"
                >
                  Lihat Pasar
                </Link>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 border border-[#e2e8f0] rounded-lg flex items-center justify-between bg-[#f0fdf4]/50">
                  <div className="flex items-center gap-2.5">
                    <div className="size-10 rounded-md bg-[#dcfce7] flex items-center justify-center font-bold text-xs text-[#15803d]">
                      4 Nov
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#163252]">Kolam B-02 · 850 kg</p>
                      <p className="text-[11px] text-[#8192a5]">Nila Hitam Grade A</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16a34a] text-white">
                    Siap Panen
                  </span>
                </div>

                <div className="p-2.5 border border-[#e2e8f0] rounded-lg flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-2.5">
                    <div className="size-10 rounded-md bg-[#e0f2fe] flex items-center justify-center font-bold text-xs text-[#0284c7]">
                      12 Nov
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#163252]">Kolam A-01 · 620 kg</p>
                      <p className="text-[11px] text-[#8192a5]">Nila Merah Organik</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e0f2fe] text-[#0369a1]">
                    Persiapan
                  </span>
                </div>

                <div className="p-2.5 border border-[#e2e8f0] rounded-lg flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-2.5">
                    <div className="size-10 rounded-md bg-[#f1f5f9] flex items-center justify-center font-bold text-xs text-[#475569]">
                      20 Nov
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#163252]">Kolam C-03 · 550 kg</p>
                      <p className="text-[11px] text-[#8192a5]">Bandeng Super Gurih</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#f1f5f9] text-[#475569]">
                    Mendatang
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-[#8192a5] text-right mt-3">
              Koneksi langsung ke B2B buyer pool
            </p>
          </div>
        </div>

        {/* Bottom Split: Table Kondisi Produksi & Aktivitas Hari Ini */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          data-node-id="65:17423"
          data-name="Production overview"
        >
          {/* Left Table (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#163252]">Kondisi Produksi per Kolam</h3>
                <p className="text-[11px] text-[#8192a5]">
                  Status biomassa, FCR pakan sirkular, dan kesehatan lingkungan air.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {(['semua', 'optimal', 'perhatian'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2.5 py-1 text-xs rounded-md capitalize transition ${
                      activeFilter === filter
                        ? 'bg-[#1c74a7] text-white font-semibold'
                        : 'bg-[#f1f5f9] text-[#64748b] hover:bg-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e2e8f0] text-[#64748b] font-semibold">
                    <th className="pb-2.5 pl-2">Nama Kolam</th>
                    <th className="pb-2.5">Komoditas</th>
                    <th className="pb-2.5">Tebaran</th>
                    <th className="pb-2.5">FCR</th>
                    <th className="pb-2.5 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {filteredPonds.map((pond) => (
                    <tr key={pond.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 pl-2 font-bold text-[#163252]">
                        <Link
                          href="/desktop/farms"
                          className="hover:text-[#1c74a7] transition"
                        >
                          {pond.name}
                        </Link>
                      </td>
                      <td className="py-3 text-[#64748b]">{pond.species}</td>
                      <td className="py-3 text-[#163252] font-medium">{pond.stock}</td>
                      <td className="py-3">
                        <span className="font-bold text-[#059669]">{pond.fcr}</span>
                        <span className="text-[10px] text-[#8192a5] ml-1">(Efisien)</span>
                      </td>
                      <td className="py-3 pr-2 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            pond.status === 'Optimal'
                              ? 'bg-[#ecfdf5] text-[#059669]'
                              : 'bg-[#fffbeb] text-[#d97706]'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              pond.status === 'Optimal' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'
                            }`}
                          />
                          {pond.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Activity Column (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#163252] mb-3">Aktivitas Hari Ini</h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Pakan Terdistribusi</span>
                  <span className="font-bold text-[#163252]">185 kg / 200 kg</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Inspeksi Sensor Air</span>
                  <span className="font-bold text-[#059669]">5 / 5 Kolam Online</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Limbah Organik BSF</span>
                  <span className="font-bold text-[#163252]">120 kg Masuk</span>
                </div>
              </div>

              {/* Next Scheduled Action */}
              <div className="mt-4 p-3 bg-[#e0f2fe]/50 border border-[#bae6fd] rounded-lg flex items-start gap-3">
                <Clock className="size-4 text-[#0284c7] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-[#0369a1]">Sesi Pakan Malam (20:00 WIB)</p>
                  <p className="text-[11px] text-[#0c4a6e] mt-0.5">
                    Estimasi 65 kg pelet maggot formula high-protein untuk kolam pembesaran.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Log aktivitas harian berhasil disinkronkan!')}
              className="mt-4 w-full py-2 bg-[#f1f5f9] hover:bg-slate-200 text-[#163252] font-semibold text-xs rounded-lg transition"
            >
              Sinkronkan Buku Catatan Tambak
            </button>
          </div>
        </div>

        {/* Bottom IoT Gateway Telemetry Banner */}
        <div
          className="bg-white border border-[#e2e8f0] rounded-xl p-4.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs"
          data-node-id="65:17496"
          data-name="Monitoring footer"
        >
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-lg bg-[#e2f3fc] text-[#1c74a7] flex items-center justify-center shrink-0">
              <Radio className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-[#163252]">
                  Monitoring Telemetri IoT Berjalan Normal
                </p>
                <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
              </div>
              <p className="text-xs text-[#64748b]">
                Seluruh stasiun sensor DO, Suhu, dan pH terhubung stabil via jaringan LoRaWAN gateway tambak.
              </p>
            </div>
          </div>

          <Link
            href="/desktop/devices"
            className="px-4 py-2 bg-[#1c74a7] hover:bg-[#165d86] text-white font-semibold text-xs rounded-lg transition shrink-0"
          >
            Periksa Stasiun Sensor
          </Link>
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
