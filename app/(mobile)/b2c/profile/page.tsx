'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { resetAllStores } from '@/lib/demo/resetAllStores';
import { formatNumberId, formatRupiah, formatDateId } from '@/lib/format';
import {
  Award,
  QrCode,
  ShieldCheck,
  LogOut,
  RotateCcw,
  CheckCircle2,
  Package,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export default function B2CProfilePage() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { wallets } = useWastePointStore();
  const { orders } = useB2BCartStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const wallet = wallets['WAL-0012'];
  const balancePoints = wallet?.balancePoints ?? 450;
  const totalKg = wallet?.totalWasteContributedKg ?? 45;

  const userName = currentUser?.name || 'Ibu Sari Wulandari';
  const userEmail = currentUser?.email || 'sari.wulandari@gmail.com';
  const userPhone = currentUser?.phone || '0812-7777-0012';
  const userAddress = 'Jl. Manyar Kertoarjo No. 21, Surabaya';

  // Past household fish orders
  const b2cOrders = orders.filter((o) => o.buyerChannel === 'b2c');

  const handleReset = () => {
    resetAllStores({ keepSession: true });
    setToastMessage('Data demo berhasil di-reset ke kondisi awal.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-28 text-[#173251] font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-[#00566b] to-[#008d91] text-white px-4 pt-6 pb-6">
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
                Rumah Tangga
              </span>
            </div>
            <p className="text-[12px] text-white/80">Keluarga Sirkular Binaan Fiscycle</p>
            <p className="text-[10px] text-white/70 mt-0.5 flex items-center gap-1">
              <MapPin className="size-3" />
              {userAddress}
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

      {/* QR Member Card */}
      <div className="px-4 -mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[12px] p-4 shadow-sm text-center space-y-2.5">
          <span className="text-[10px] font-bold text-[#8192a5] uppercase tracking-wider block">
            ID QR Member Rumah Tangga
          </span>

          <div className="size-32 mx-auto bg-[#f8fbfd] border-2 border-dashed border-[#b8d4e5] rounded-[10px] flex flex-col items-center justify-center p-2">
            <QrCode className="size-16 text-[#008d91]" />
            <p className="font-mono text-[9px] font-bold text-[#173251] mt-1">
              {wallet?.qrCodePayload || 'FISCYCLE:WAL-0012'}
            </p>
          </div>

          <p className="text-[11px] text-[#5b738e] leading-snug">
            Tunjukkan kepada kurir Fiscycle saat penjemputan sampah organik dapur untuk verifikasi poin otomatis.
          </p>
        </div>
      </div>

      {/* Poin & Waste Stats */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
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
            <Package className="size-4 text-[#14b97c]" />
          </div>
          <p className="text-[18px] font-bold text-[#173251] leading-none">
            {formatNumberId(totalKg)} kg
          </p>
          <p className="text-[11px] font-semibold text-[#5a718c] mt-1">Total Sampah Didaur Ulang</p>
          <p className="text-[9.5px] text-[#008d91]">Biokonversi Maggot BSF</p>
        </div>
      </div>

      {/* Account Info Details */}
      <div className="px-4 mt-4 space-y-2">
        <h2 className="text-[12.5px] font-bold text-[#173251]">Informasi Kontak Akun</h2>
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 space-y-2.5 text-xs text-[#5b738e] shadow-xs">
          <div className="flex items-center gap-2">
            <Phone className="size-3.5 text-[#008d91]" />
            <span>{userPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-3.5 text-[#008d91]" />
            <span>{userEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-[#008d91]" />
            <span>{userAddress}</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="px-4 mt-4 space-y-2">
        <h2 className="text-[12.5px] font-bold text-[#173251] flex items-center gap-1.5">
          <ShoppingBag className="size-4 text-[#008d91]" />
          Pesanan Ikan Terakhir
        </h2>
        {b2cOrders.length === 0 ? (
          <div className="bg-white border border-[#e7eff4] rounded-[10px] p-4 text-center text-xs text-slate-400">
            Belum ada transaksi pembelian ikan.
          </div>
        ) : (
          <div className="space-y-2">
            {b2cOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-[#00629b]">{ord.id}</span>
                    <span className="bg-[#e5f8ef] text-[#14b97c] text-[9.5px] font-bold px-1.5 py-0.2 rounded-full">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {formatDateId(ord.createdAt || ord.deliveryDate)} · {ord.species} ({ord.quantityKg} kg)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#173251]">{formatRupiah(ord.totalIdr)}</p>
                  {ord.pointsRedeemed > 0 && (
                    <p className="text-[10px] text-[#008d91]">Diskon {ord.pointsRedeemed} Poin</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Actions */}
      <div className="px-4 mt-6 space-y-2">
        <button
          onClick={handleReset}
          className="w-full py-2.5 rounded-[8px] bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
        >
          <RotateCcw className="size-3.5 text-slate-400" />
          <span>Reset Data Demo</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-2.5 rounded-[8px] bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
        >
          <LogOut className="size-3.5 text-rose-500" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </div>
  );
}
