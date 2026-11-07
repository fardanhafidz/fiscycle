'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useMitraStore } from '@/store/useMitraStore';
import {
  Phone,
  Mail,
  Building2,
  KeyRound,
  ShieldCheck,
  ChevronRight,
  LogOut,
  RotateCcw,
  Cpu,
  FileText,
  Brain,
  Store,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function MitraProfilePage() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { farm, ponds, resetMitraStore } = useMitraStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const userName = currentUser?.name || 'Budi Santoso';
  const userEmail = currentUser?.email || 'budi.santoso@gmail.com';
  const userPhone = currentUser?.phone || '0812-3456-7890';
  const farmToken = farm.partnerToken;
  const avatarInitials =
    currentUser?.avatarInitials ||
    userName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const handleResetData = () => {
    resetMitraStore();
    setToastMessage('Data simulasi mitra tambak berhasil di-reset ke kondisi awal.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Header */}
      <div className="bg-gradient-to-b from-[#00566b] to-[#00629b] text-white px-4 pt-6 pb-6">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-bold text-[20px] text-white">
            {avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-bold">{userName}</h1>
              <span className="bg-[#14b97c] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="size-3" />
                Terverifikasi
              </span>
            </div>
            <p className="text-[12px] text-white/80 mt-0.5">
              Mitra Pembudidaya Tambak Fiscycle
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[10.5px] text-white/70">
              <span className="flex items-center gap-1">
                <Phone className="size-3" />
                {userPhone}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="size-3" />
                {userEmail}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="px-4 mt-3">
          <div className="bg-[#e5f8ef] border border-[#a1e5cb] text-[#0e8a5b] p-3 rounded-[8px] text-[11.5px] font-semibold flex items-center gap-2 shadow-xs transition-all">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Farm Profile Card */}
      <div className="px-4 -mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-[6px] bg-[#e2f3fc] text-[#00629b]">
                <Building2 className="size-4" />
              </span>
              <div>
                <h2 className="text-[14px] font-bold text-[#173251]">{farm.name}</h2>
                <p className="text-[10px] text-[#8192a5]">{farm.city}, {farm.province}</p>
              </div>
            </div>
            <span className="bg-[#e5f8ef] text-[#14b97c] text-[10px] font-bold px-2 py-0.5 rounded-[4px]">
              Aktif Beroperasi
            </span>
          </div>

          <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[8px] p-3 space-y-2 text-[11.5px]">
            <div className="flex justify-between items-center">
              <span className="text-[#8192a5] flex items-center gap-1">
                <KeyRound className="size-3 text-[#00629b]" />
                Token Kemitraan:
              </span>
              <span className="font-mono font-bold text-[#00629b] bg-[#eef6fa] px-2 py-0.5 rounded-[4px]">
                {farmToken}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Luas Lahan Tambak:</span>
              <span className="font-bold text-[#173251]">
                {(farm.totalAreaM2 / 10000).toFixed(1)} Hektar ({farm.totalAreaM2} m²)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Jumlah Kolam Operasional:</span>
              <span className="font-bold text-[#173251]">{ponds.length} Kolam Aktif</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Komoditas Utama:</span>
              <span className="font-semibold text-[#173251]">
                {Array.from(new Set(ponds.map((p) => p.species))).join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Tambak Selector */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-[#173251] flex items-center gap-1.5">
              <Layers className="size-4 text-[#00629b]" />
              Daftar Tambak Saya
            </h3>
            <span className="text-[10px] text-[#00629b] font-medium">+ Tambah Tambak</span>
          </div>

          <div className="space-y-2 text-[11.5px]">
            <div className="p-2.5 rounded-[7px] bg-[#f0f7fb] border border-[#d2e8f6] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#173251]">{farm.name} (Utama)</p>
                <p className="text-[10px] text-[#71859c]">6 Kolam · 12.400 kg biomassa</p>
              </div>
              <span className="text-[10px] font-bold text-[#00629b] bg-white px-2 py-0.5 rounded-full border border-[#cee2ef]">
                Sedang Aktif
              </span>
            </div>

            <div className="p-2.5 rounded-[7px] bg-white border border-slate-200 flex items-center justify-between opacity-70">
              <div>
                <p className="font-bold text-[#173251]">Tambak Pesisir Indah</p>
                <p className="text-[10px] text-[#8192a5]">Tuban, Jawa Timur · Tahap Pengajuan</p>
              </div>
              <span className="text-[10px] font-medium text-[#8192a5]">
                Menunggu Survey
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Shortcuts */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-2 shadow-xs divide-y divide-slate-100">
          <Link
            href="/mitra/devices"
            className="flex items-center justify-between p-3 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <Cpu className="size-4 text-[#00629b]" />
              <span className="text-[12.5px] font-semibold text-[#173251]">Perangkat IoT Tambak</span>
            </div>
            <ChevronRight className="size-4 text-[#8192a5]" />
          </Link>

          <Link
            href="/mitra/reports"
            className="flex items-center justify-between p-3 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="size-4 text-[#00629b]" />
              <span className="text-[12.5px] font-semibold text-[#173251]">Laporan &amp; Analitik</span>
            </div>
            <ChevronRight className="size-4 text-[#8192a5]" />
          </Link>

          <Link
            href="/mitra/insights"
            className="flex items-center justify-between p-3 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <Brain className="size-4 text-[#00629b]" />
              <span className="text-[12.5px] font-semibold text-[#173251]">Insight &amp; Rekomendasi AI</span>
            </div>
            <ChevronRight className="size-4 text-[#8192a5]" />
          </Link>

          <Link
            href="/mitra/harvest"
            className="flex items-center justify-between p-3 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <Store className="size-4 text-[#00629b]" />
              <span className="text-[12.5px] font-semibold text-[#173251]">Pasar &amp; Penjualan Panen</span>
            </div>
            <ChevronRight className="size-4 text-[#8192a5]" />
          </Link>
        </div>
      </div>

      {/* Demo Controls & Logout */}
      <div className="px-4 mt-4 space-y-2.5">
        <button
          onClick={handleResetData}
          className="w-full bg-white hover:bg-slate-50 border border-[#e1e7ec] text-[#5b738e] font-bold text-[12px] min-h-[42px] rounded-[7px] flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-xs"
        >
          <RotateCcw className="size-3.5" />
          Reset Demo Data Mitra
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-[12px] min-h-[42px] rounded-[7px] flex items-center justify-center gap-2 transition active:scale-[0.99]"
        >
          <LogOut className="size-3.5" />
          Keluar dari Akun (Logout)
        </button>
      </div>
    </div>
  );
}
