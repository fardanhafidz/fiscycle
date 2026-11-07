'use client';

export const dynamic = 'force-dynamic';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMitraStore } from '@/store/useMitraStore';
import { formatRupiah, formatNumberId, formatDateId } from '@/lib/format';
import {
  ArrowLeft,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  ShieldCheck,
} from 'lucide-react';

function MitraOfferDetailContent() {
  const params = useParams();
  const offerId = params?.id as string;

  const { allocationOffers, respondToAllocation } = useMitraStore();
  const offer = allocationOffers.find((o) => o.id === offerId);

  const [notification, setNotification] = useState<{
    type: 'success' | 'danger';
    message: string;
  } | null>(null);

  if (!offer) {
    return (
      <div className="min-h-screen bg-[#f3f9fc] p-4 text-[#173251] font-sans antialiased flex flex-col items-center justify-center">
        <AlertTriangle className="size-12 text-[#f69b23] mb-3" />
        <h1 className="text-[18px] font-bold text-[#173251]">Penawaran Tidak Ditemukan</h1>
        <p className="text-[12px] text-[#71859c] mt-1 text-center">
          ID penawaran {offerId} tidak tercatat dalam sistem alokasi panen Anda.
        </p>
        <Link
          href="/mitra/harvest"
          className="mt-4 bg-[#00629b] text-white text-[12px] font-bold px-4 py-2 rounded-[6px]"
        >
          Kembali ke Pasar &amp; Penjualan
        </Link>
      </div>
    );
  }

  const handleDecision = (accept: boolean) => {
    respondToAllocation(offer.id, accept);
    if (accept) {
      setNotification({
        type: 'success',
        message: `Kontrak panen ${offer.id} berhasil disetujui! Pesanan B2B #${offer.orderId} dialihkan ke status Menunggu Panen.`,
      });
    } else {
      setNotification({
        type: 'danger',
        message: `Penawaran panen ${offer.id} telah ditolak. Buyer akan dialokasikan ulang oleh sistem.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Top Navbar */}
      <div className="bg-white border-b border-[#e7eff4] px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <Link
            href="/mitra/harvest"
            className="size-8 rounded-[6px] bg-[#f0f4f8] hover:bg-[#e2eaf1] flex items-center justify-center text-[#5b738e] transition"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-[14px] font-bold text-[#173251] leading-none">
              Detail Penawaran Panen
            </h1>
            <p className="text-[10px] text-[#8192a5] font-mono mt-0.5">{offer.id}</p>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-[5px] text-[10px] font-bold ${
            offer.status === 'Ditawarkan'
              ? 'bg-[#fff3df] text-[#f69b23]'
              : offer.status === 'Diterima'
              ? 'bg-[#e5f8ef] text-[#14b97c]'
              : 'bg-rose-50 text-rose-600'
          }`}
        >
          {offer.status}
        </span>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="px-4 mt-3">
          <div
            className={`p-3 rounded-[8px] text-[12px] font-semibold flex items-center gap-2 border ${
              notification.type === 'success'
                ? 'bg-[#e5f8ef] text-[#0e8a5b] border-[#a1e5cb]'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="size-4 shrink-0" />
            ) : (
              <XCircle className="size-4 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* AI Match Overview Banner */}
      <div className="px-4 mt-3">
        <div className="bg-gradient-to-r from-[#e5f3fb] to-[#ebf7ff] border border-[#a9c9db] rounded-[10px] p-3.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#00629b]">
              <Sparkles className="size-4" />
              <span className="text-[12px] font-bold">Kecocokan AI Fiscycle</span>
            </div>
            <span className="bg-[#14b97c] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
              {offer.aiMatchScorePct}% Match Score
            </span>
          </div>

          <p className="text-[11px] text-[#5b738e] mt-1.5 leading-relaxed">
            Sistem merekomendasikan penawaran ini karena spesifikasi komoditas{' '}
            <strong className="text-[#173251]">{offer.species} ({offer.sizeGradeLabel})</strong>{' '}
            di <strong className="text-[#173251]">{offer.pondName}</strong> cocok 100% dengan kebutuhan{' '}
            <strong className="text-[#173251]">{offer.buyerName}</strong>.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-[#cee5f3] text-center text-[10px]">
            <div>
              <p className="text-[#8192a5]">Kesesuaian Spesies</p>
              <p className="font-bold text-[#14b97c] mt-0.5">40 / 40 Poin</p>
            </div>
            <div>
              <p className="text-[#8192a5]">Kesesuaian Ukuran</p>
              <p className="font-bold text-[#14b97c] mt-0.5">30 / 30 Poin</p>
            </div>
            <div>
              <p className="text-[#8192a5]">Kesiapan Kolam</p>
              <p className="font-bold text-[#14b97c] mt-0.5">26 / 30 Poin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer & Order Context */}
      <div className="px-4 mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <h2 className="text-[13px] font-bold text-[#173251] flex items-center gap-1.5">
            <Building2 className="size-4 text-[#00629b]" />
            Informasi Pembeli B2B
          </h2>

          <div className="space-y-2 text-[11.5px]">
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Nama Pembeli</span>
              <span className="font-bold text-[#173251]">{offer.buyerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Kota Tujuan</span>
              <span className="font-semibold text-[#173251] flex items-center gap-1">
                <MapPin className="size-3 text-[#8192a5]" />
                {offer.buyerCity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Nomor Pesanan</span>
              <span className="font-mono text-[#00629b] font-semibold">{offer.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Jadwal Pengambilan Panen</span>
              <span className="font-semibold text-[#173251] flex items-center gap-1">
                <Calendar className="size-3 text-[#8192a5]" />
                {formatDateId(offer.targetHarvestDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Commodity & Pricing Breakdown */}
      <div className="px-4 mt-3">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <h2 className="text-[13px] font-bold text-[#173251] flex items-center gap-1.5">
            <Scale className="size-4 text-[#00629b]" />
            Rincian Alokasi &amp; Payout Panen
          </h2>

          <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[8px] p-3 space-y-2 text-[11.5px]">
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Sumber Kolam Tambak</span>
              <span className="font-bold text-[#00629b]">{offer.pondName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Komoditas</span>
              <span className="font-semibold text-[#173251]">{offer.species}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Grade Bobot</span>
              <span className="font-semibold text-[#173251]">{offer.sizeGradeLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Volume yang Dialokasikan</span>
              <span className="font-bold text-[#173251] text-[13px]">
                {formatNumberId(offer.allocatedKg)} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Harga Satuan Kontrak</span>
              <span className="font-bold text-[#14b97c]">
                {formatRupiah(offer.pricePerKgIdr)} / kg
              </span>
            </div>
            <div className="pt-2 border-t border-[#e3ebf0] flex justify-between items-baseline">
              <div>
                <p className="text-[10px] text-[#8192a5]">Total Estimasi Pembayaran</p>
                <p className="text-[9px] text-[#14b97c] font-medium">Bebas potongan perantara</p>
              </div>
              <span className="text-[18px] font-bold text-[#00629b]">
                {formatRupiah(offer.estimatedPayoutIdr)}
              </span>
            </div>
          </div>

          <div className="bg-[#f3fbf7] border border-[#d2edd7] rounded-[7px] p-2.5 flex items-start gap-2 text-[11px] text-[#206941]">
            <ShieldCheck className="size-4 text-[#14b97c] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Jaminan Pembayaran Fiscycle Escrow: Dana senilai{' '}
              <strong>{formatRupiah(offer.estimatedPayoutIdr)}</strong> telah dikunci oleh pembeli dan akan langsung dicairkan maksimal 1x24 jam setelah timbang panen terverifikasi.
            </p>
          </div>
        </div>
      </div>

      {/* Decision Actions */}
      <div className="px-4 mt-4">
        {offer.status === 'Ditawarkan' ? (
          <div className="space-y-2">
            <button
              onClick={() => handleDecision(true)}
              className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[13px] min-h-[46px] rounded-[7px] flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-xs"
            >
              <CheckCircle2 className="size-4" />
              Setujui Kontrak Penyerapan Panen
            </button>
            <button
              onClick={() => handleDecision(false)}
              className="w-full bg-white hover:bg-rose-50 border border-[#e1e7ec] text-rose-600 font-bold text-[12px] min-h-[42px] rounded-[7px] flex items-center justify-center gap-2 transition"
            >
              <XCircle className="size-4" />
              Tolak Penawaran
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-3 text-center space-y-2">
            <p className="text-[12px] text-[#5b738e]">
              Status Penawaran saat ini:{' '}
              <strong
                className={
                  offer.status === 'Diterima' ? 'text-[#14b97c]' : 'text-rose-600'
                }
              >
                {offer.status}
              </strong>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDecision(offer.status !== 'Diterima')}
                className="flex-1 bg-[#f3f9fc] hover:bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] font-bold text-[11px] py-2 rounded-[6px] transition"
              >
                Ubah Menjadi {offer.status === 'Diterima' ? 'Tolak' : 'Setuju'}
              </button>
              <Link
                href="/mitra/harvest"
                className="flex-1 bg-[#00629b] text-white font-bold text-[11px] py-2 rounded-[6px] flex items-center justify-center"
              >
                Kembali ke Daftar
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MitraOfferDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 text-sm">
          Memuat detail penawaran...
        </div>
      }
    >
      <MitraOfferDetailContent />
    </Suspense>
  );
}
