'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  MapPin,
  Globe,
  User,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Fish,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
} from 'lucide-react';

const imgBrandLogo = '/images/desktop-brand-logo.png';
const imgFarmLandscape = '/images/desktop-farm-landscape.png';

export default function BrowserWindowPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [farmName, setFarmName] = useState('Tambak Mina Barokah Sejahtera');
  const [farmLocation, setFarmLocation] = useState('Dusun Bandeng, Kec. Manyar, Kab. Gresik, Jawa Timur');
  const [selectedCommodity, setSelectedCommodity] = useState('Ikan Nila Merah Organik');
  const [pondCount, setPondCount] = useState('6 Kolam Aktif');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const steps = [
    { num: 1, label: 'Informasi Tambak' },
    { num: 2, label: 'Dimensi Kolam' },
    { num: 3, label: 'Telemetri IoT' },
    { num: 4, label: 'Aktivasi Akun' },
  ];

  return (
    <div
      className="bg-[#0f172a] min-h-screen text-slate-800 font-sans p-3 md:p-6 flex flex-col items-center justify-center antialiased"
      data-node-id="3:1027"
      data-name="Browser window"
    >
      {/* Mock Browser Chrome Shell (1440x900 framing) */}
      <div className="w-full max-w-[1440px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700/40 flex flex-col min-h-[860px]">
        {/* Browser Titlebar */}
        <div className="bg-[#1e293b] px-4 py-2.5 flex items-center justify-between border-b border-slate-700/60 select-none">
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ef4444] inline-block" />
            <span className="size-3 rounded-full bg-[#f59e0b] inline-block" />
            <span className="size-3 rounded-full bg-[#10b981] inline-block" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-xl mx-4 bg-[#0f172a]/70 border border-slate-600/50 rounded-lg px-3 py-1 flex items-center justify-center text-xs text-slate-300 font-mono">
            <span className="text-[#38bdf8] mr-1.5">https://</span>
            <span>app.fiscycle.id/mitra/onboarding</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <Minimize2 className="size-3.5 hover:text-white cursor-pointer" />
            <Maximize2 className="size-3.5 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Browser Content Frame */}
        <div className="flex-1 flex flex-col md:flex-row bg-[#f8fafc]">
          {/* Left Brand Sidebar (260px matching Figma 3:1045) */}
          <aside className="w-full md:w-[280px] bg-[#163252] text-white flex flex-col justify-between shrink-0 p-6">
            <div>
              {/* Brand Logo & Ocean Deco */}
              <div className="flex items-center gap-2 mb-8">
                <div className="h-10 w-28 relative">
                  <Image
                    src={imgBrandLogo}
                    alt="Fiscycle"
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
              </div>

              {/* Brand Promise */}
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1c74a7]/40 text-[#7dd3fc]">
                  <Sparkles className="size-3" />
                  Kemitraan Tambak Cerdas
                </span>
                <h2 className="text-xl font-bold leading-tight">
                  Solusi Ekosistem Akuakultur Sirkular Berbasis IoT &amp; AI
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tingkatkan rasio efisiensi pakan hingga 30% dengan integrasi pakan maggot BSF mandiri dan
                  penjaminan serapan hasil panen langsung ke buyer B2B.
                </p>
              </div>
            </div>

            {/* Coastal Aquaculture Photograph */}
            <div className="mt-8 rounded-xl overflow-hidden border border-white/10 relative h-48">
              <Image
                src={imgFarmLandscape}
                alt="Tambak Ikan Fiscycle"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#163252] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] text-white/90 font-medium">
                Kawasan Tambak Manyar, Gresik
              </div>
            </div>
          </aside>

          {/* Right Setup Workspace (matching Figma 3:1053) */}
          <main className="flex-1 flex flex-col justify-between p-6 md:p-10">
            {/* Setup Navigation Bar */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e2e8f0]">
                {/* Stepper */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  {steps.map((st, idx) => {
                    const isActive = currentStep === st.num;
                    const isPassed = currentStep > st.num;
                    return (
                      <React.Fragment key={st.num}>
                        <button
                          onClick={() => setCurrentStep(st.num)}
                          className="flex items-center gap-2 text-left group"
                        >
                          <div
                            className={`size-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                              isActive
                                ? 'bg-[#1c74a7] text-white shadow-xs'
                                : isPassed
                                ? 'bg-[#10b981] text-white'
                                : 'bg-[#e2e8f0] text-[#64748b]'
                            }`}
                          >
                            {isPassed ? '✓' : st.num}
                          </div>
                          <span
                            className={`text-xs font-semibold whitespace-nowrap ${
                              isActive
                                ? 'text-[#1c74a7] font-bold'
                                : 'text-[#64748b] group-hover:text-[#163252]'
                            }`}
                          >
                            {st.label}
                          </span>
                        </button>
                        {idx < steps.length - 1 && (
                          <div className="w-8 h-0.5 bg-[#e2e8f0] shrink-0" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Account Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs font-medium text-[#64748b] cursor-pointer hover:bg-slate-50">
                    <Globe className="size-3.5 text-[#1c74a7]" />
                    <span>Indonesia (ID)</span>
                    <ChevronDown className="size-3 text-[#94a3b8]" />
                  </div>

                  <div className="size-8 rounded-full bg-[#e2f3fc] text-[#1c74a7] flex items-center justify-center">
                    <User className="size-4" />
                  </div>
                </div>
              </div>

              {/* Form Content Area */}
              <div className="max-w-2xl py-8 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#163252]">
                    Inisialisasi &amp; Registrasi Tambak Mitra
                  </h1>
                  <p className="text-xs text-[#64748b] mt-1">
                    Lengkapi identitas tambak untuk penerbitan token kemitraan resmi, kalibrasi sensor IoT,
                    dan aktivasi dashboard operasional.
                  </p>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4">
                  {/* Business Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#163252] mb-1.5">
                      Nama Usaha Tambak / Pokdakan
                    </label>
                    <div className="flex items-center gap-3 bg-white border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 focus-within:border-[#1c74a7] focus-within:ring-2 focus-within:ring-[#1c74a7]/10 transition">
                      <Building2 className="size-4 text-[#8192a5]" />
                      <input
                        type="text"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        placeholder="Contoh: Tambak Mina Barokah Sejahtera"
                        className="bg-transparent text-xs text-[#163252] outline-none w-full font-medium"
                      />
                    </div>
                  </div>

                  {/* Location Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#163252] mb-1.5">
                      Lokasi Geografis &amp; Titik Koordinat Tambak
                    </label>
                    <div className="flex items-center gap-3 bg-white border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 focus-within:border-[#1c74a7] focus-within:ring-2 focus-within:ring-[#1c74a7]/10 transition">
                      <MapPin className="size-4 text-[#8192a5]" />
                      <input
                        type="text"
                        value={farmLocation}
                        onChange={(e) => setFarmLocation(e.target.value)}
                        placeholder="Alamat lengkap lokasi kolam tambak"
                        className="bg-transparent text-xs text-[#163252] outline-none w-full font-medium"
                      />
                    </div>
                  </div>

                  {/* Commodity & Pond Count Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#163252] mb-1.5">
                        Komoditas Utama Budidaya
                      </label>
                      <div className="flex items-center gap-3 bg-white border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 focus-within:border-[#1c74a7] transition">
                        <Fish className="size-4 text-[#8192a5]" />
                        <select
                          value={selectedCommodity}
                          onChange={(e) => setSelectedCommodity(e.target.value)}
                          className="bg-transparent text-xs text-[#163252] outline-none w-full font-medium cursor-pointer"
                        >
                          <option>Ikan Nila Merah Organik</option>
                          <option>Ikan Nila Hitam</option>
                          <option>Bandeng Super Gurih</option>
                          <option>Lele Sangkuriang</option>
                          <option>Udang Vaname</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#163252] mb-1.5">
                        Jumlah Kolam Aktif
                      </label>
                      <div className="flex items-center gap-3 bg-white border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 focus-within:border-[#1c74a7] transition">
                        <Layers className="size-4 text-[#8192a5]" />
                        <input
                          type="text"
                          value={pondCount}
                          onChange={(e) => setPondCount(e.target.value)}
                          placeholder="Jumlah kolam"
                          className="bg-transparent text-xs text-[#163252] outline-none w-full font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-[#e2e8f0]">
              <Link
                href="/desktop/dashboard"
                className="px-4 py-2.5 text-xs font-semibold text-[#64748b] hover:text-[#163252] transition"
              >
                Kembali ke Beranda
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => showToast('Draf formulir kemitraan berhasil disimpan.')}
                  className="px-5 py-2.5 bg-white border border-[#cbd5e1] hover:bg-slate-50 text-[#163252] font-semibold text-xs rounded-xl transition"
                >
                  Simpan Draf
                </button>

                <button
                  onClick={() => {
                    if (currentStep < 4) {
                      setCurrentStep((prev) => prev + 1);
                      showToast(`Lanjut ke Tahap ${currentStep + 1}`);
                    } else {
                      showToast('Selamat! Registrasi tambak mitra berhasil diproses.');
                    }
                  }}
                  className="px-6 py-2.5 bg-[#1c74a7] hover:bg-[#155a82] text-white font-bold text-xs rounded-xl transition shadow-md flex items-center gap-2"
                >
                  <span>{currentStep === 4 ? 'Aktivasi Sekarang' : 'Lanjut ke Tahap Berikutnya'}</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </main>
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
