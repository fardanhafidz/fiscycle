'use client';

import React from 'react';
import { useWastePointStore } from '@/store/useWastePointStore';
import { formatNumberId, formatRupiah, formatDateId } from '@/lib/format';
import {
  Award,
  QrCode,
  Scale,
  History,
  Info,
} from 'lucide-react';

export default function B2CPointsPage() {
  const { wallets } = useWastePointStore();

  const wallet = wallets['WAL-0012'];
  const balancePoints = wallet?.balancePoints ?? 450;
  const rupiahDiscount = balancePoints * 100;
  const totalWasteKg = wallet?.totalWasteContributedKg ?? 45;
  const transactions = wallet?.transactions ?? [];

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Keluarga › <span className="text-[#173251] font-medium">Poin Sirkular Saya</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Dompet Poin Sirkular
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Kumpulkan Poin dari setoran sampah dapur dan tukarkan langsung untuk subsidi belanja ikan segar.
        </p>
      </div>

      {/* Hero Points Card */}
      <div className="px-4 mt-2">
        <div className="bg-gradient-to-br from-[#00566b] via-[#008d91] to-[#20a39e] rounded-[14px] p-4 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/80 flex items-center gap-1.5">
              <Award className="size-3.5 text-[#f69b23]" />
              Saldo Poin Rumah Tangga
            </span>
            <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              {wallet?.id || 'WAL-0012'}
            </span>
          </div>

          <div className="mt-3">
            <p className="text-[32px] font-extrabold tracking-tight leading-none">
              {formatNumberId(balancePoints)}
            </p>
            <p className="text-[12px] text-white/90 mt-1">
              Nilai Tukar Diskon: <strong>{formatRupiah(rupiahDiscount)}</strong>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px]">
            <span>Total Sampah Didaur Ulang:</span>
            <span className="font-bold flex items-center gap-1">
              <Scale className="size-3.5 text-[#a1f3de]" />
              {totalWasteKg} kg
            </span>
          </div>
        </div>
      </div>

      {/* QR Code Identification Card */}
      <div className="px-4 mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[12px] p-4 shadow-xs text-center space-y-2.5">
          <span className="text-[10px] font-bold text-[#8192a5] uppercase tracking-wider block">
            QR Member Sirkular Keluarga
          </span>

          <div className="size-32 mx-auto bg-[#f8fbfd] border-2 border-dashed border-[#b8d4e5] rounded-[10px] flex flex-col items-center justify-center p-2">
            <QrCode className="size-16 text-[#008d91]" />
            <p className="font-mono text-[9px] font-bold text-[#173251] mt-1">
              {wallet?.qrCodePayload || 'FISCYCLE:WAL-0012'}
            </p>
          </div>

          <p className="text-[11px] text-[#71859c] leading-snug">
            Tunjukkan kepada kurir saat penjemputan sampah organik di depan rumah Anda.
          </p>
        </div>
      </div>

      {/* Explainer: How it works */}
      <div className="px-4 mt-3">
        <div className="bg-[#f0f8fc] border border-[#cee4f3] rounded-[10px] p-3 space-y-2 text-[11px]">
          <div className="flex items-center gap-1.5 font-bold text-[#00629b]">
            <Info className="size-4" />
            <span>Cara Kerja Poin Sirkular Fiscycle:</span>
          </div>
          <div className="space-y-1 text-[#4b6380]">
            <p>1. Setiap 1 kg sampah organik dapur bernilai <strong>10 Poin Sirkular</strong>.</p>
            <p>2. 10 Poin dapat digunakan sebagai potongan belanja ikan segar senilai <strong>Rp 1.000</strong>.</p>
            <p>3. Poin dapat ditukarkan hingga 20% dari total pesanan ikan Anda.</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4 mt-4 space-y-2.5">
        <h2 className="text-[13.5px] font-bold text-[#173251] flex items-center gap-1.5">
          <History className="size-4 text-[#008d91]" />
          Riwayat Transaksi Poin
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
    </div>
  );
}
