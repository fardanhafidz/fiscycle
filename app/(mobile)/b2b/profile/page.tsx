'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { formatNumberId, formatRupiah, formatDateId } from '@/lib/format';
import {
  Award,
  QrCode,
  ShieldCheck,
  History,
  LogOut,
  RotateCcw,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export default function B2BProfilePage() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { wallets, resetWastePointStore } = useWastePointStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const wallet = wallets['WAL-0007'];
  const balancePoints = wallet?.balancePoints ?? 2580;
  const totalKg = wallet?.totalWasteContributedKg ?? 258;
  const transactions = wallet?.transactions ?? [];

  const userName = currentUser?.name || 'Hendro Wijaya';
  const orgName = currentUser?.organizationName || 'ABC Restaurant (Surya Group)';
  const userEmail = currentUser?.email || 'procurement@abcrestaurant.id';
  const userPhone = currentUser?.phone || '0813-5555-0007';

  const handleReset = () => {
    resetWastePointStore();
    setToastMessage('Data transaksi & poin sirkular berhasil di-reset.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-[#1A365D] to-[#00566b] text-white px-4 pt-6 pb-6">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-bold text-[20px] text-white">
            {userName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[17px] font-bold">{userName}</h1>
              <span className="bg-[#14b97c] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                <ShieldCheck className="size-2.5" />
                Horeka
              </span>
            </div>
            <p className="text-[12px] text-white/80">{orgName}</p>
            <p className="text-[10px] text-white/60 mt-1">
              {userPhone} · {userEmail}
            </p>
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

      {/* QR Code Partner Identifier */}
      <div className="px-4 -mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[12px] p-4 shadow-sm text-center space-y-3">
          <span className="text-[10px] font-bold text-[#8192a5] uppercase tracking-wider block">
            ID QR Penjemputan Limbah Horeka
          </span>

          <div className="size-36 mx-auto bg-[#f8fbfd] border-2 border-dashed border-[#b8d4e5] rounded-[10px] flex flex-col items-center justify-center p-3">
            <QrCode className="size-20 text-[#00629b]" />
            <p className="font-mono text-[10px] font-bold text-[#173251] mt-1">
              {wallet?.qrCodePayload || 'FISCYCLE:WAL-0007'}
            </p>
          </div>

          <p className="text-[11px] text-[#5b738e] leading-snug">
            Tunjukkan QR ini kepada kurir logistik Fiscycle saat serah terima limbah organik untuk verifikasi otomatis.
          </p>
        </div>
      </div>

      {/* Poin & Ringkasan Kontribusi */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-2.5">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="size-7 rounded-[6px] bg-[#e2f3fc] flex items-center justify-center text-[#00629b] mb-1.5">
            <Award className="size-4 text-[#f69b23]" />
          </div>
          <p className="text-[18px] font-bold text-[#173251] leading-none">
            {formatNumberId(balancePoints)}
          </p>
          <p className="text-[11px] font-semibold text-[#5a718c] mt-1">Saldo Poin Sirkular</p>
          <p className="text-[9.5px] text-[#14b97c]">Setara {formatRupiah(balancePoints * 100)}</p>
        </div>

        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="size-7 rounded-[6px] bg-[#e5f8ef] flex items-center justify-center text-[#14b97c] mb-1.5">
            <Trash2 className="size-4" />
          </div>
          <p className="text-[18px] font-bold text-[#173251] leading-none">
            {formatNumberId(totalKg)} kg
          </p>
          <p className="text-[11px] font-semibold text-[#5a718c] mt-1">Limbah Terkelola</p>
          <p className="text-[9.5px] text-[#5a718c]">0 kg terbuang ke TPA</p>
        </div>
      </div>

      {/* Riwayat Mutasi Poin Sirkular */}
      <div className="px-4 mt-4 space-y-2.5">
        <h2 className="text-[13.5px] font-bold text-[#173251] flex items-center gap-1.5">
          <History className="size-4 text-[#00629b]" />
          Riwayat Mutasi Poin
        </h2>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs flex items-center justify-between text-[11px]"
            >
              <div>
                <p className="font-bold text-[#173251]">{tx.description}</p>
                <p className="text-[9.5px] text-[#8192a5] mt-0.5">
                  Ref: {tx.referenceId} · {formatDateId(tx.createdAt.split('T')[0])}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`font-bold text-[12px] ${
                    tx.pointsDelta > 0 ? 'text-[#14b97c]' : 'text-rose-600'
                  }`}
                >
                  {tx.pointsDelta > 0 ? `+${tx.pointsDelta}` : tx.pointsDelta} Poin
                </span>
                <p className="text-[9.5px] text-[#8192a5]">
                  {formatRupiah(tx.rupiahEquivalent)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset & Logout Actions */}
      <div className="px-4 mt-5 space-y-2">
        <button
          onClick={handleReset}
          className="w-full bg-white hover:bg-slate-50 border border-[#e1e7ec] text-[#5b738e] font-bold text-[12px] min-h-[42px] rounded-[7px] flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-xs"
        >
          <RotateCcw className="size-3.5" />
          Reset Demo Data Poin
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
