'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { B2CFulfilment } from '@/lib/types';
import { formatNumberId, formatRupiah } from '@/lib/format';
import {
  ShoppingCart,
  Plus,
  Minus,
  Award,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';

export default function B2CCheckoutPage() {
  const { currentUser } = useAuthStore();
  const { wallets, deductPointsForOrder } = useWastePointStore();
  const {
    b2cCart,
    updateB2CCartQty,
    removeFromB2CCart,
    b2cFulfilment,
    setB2CFulfilment,
    b2cEstimatedWasteKg,
    setB2CEstimatedWasteKg,
    b2cRedeemPoints,
    setB2CRedeemPoints,
    computeB2CCheckoutTotals,
    submitB2COrder,
  } = useB2BCartStore();

  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const wallet = wallets['WAL-0012'];
  const balancePoints = wallet?.balancePoints ?? 450;
  const totals = computeB2CCheckoutTotals(balancePoints);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const buyerUser = currentUser || {
      id: 'USR-B2C-01',
      name: 'Ibu Sari Wulandari',
      email: 'sari.wulandari@gmail.com',
      phone: '081277770012',
      role: 'b2c',
      organizationName: 'Rumah Tangga Surabaya',
      avatarInitials: 'SW',
      walletId: 'WAL-0012',
    };

    const newOrder = submitB2COrder(buyerUser, balancePoints);

    if (totals.redeemablePoints > 0 && wallet) {
      deductPointsForOrder(wallet.id, totals.redeemablePoints, newOrder.id);
    }

    setConfirmedOrderId(newOrder.id);
  };

  // If order confirmed
  if (confirmedOrderId) {
    return (
      <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased p-4 flex flex-col justify-center items-center">
        <div className="bg-white border border-[#e7eff4] rounded-[16px] p-6 shadow-md text-center max-w-sm w-full space-y-4">
          <div className="size-16 rounded-full bg-[#e5f8ef] text-[#14b97c] flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-9" />
          </div>

          <div>
            <span className="font-mono text-[11px] font-bold text-[#008d91] bg-[#eaf7f5] px-2 py-0.5 rounded-full">
              {confirmedOrderId}
            </span>
            <h1 className="text-[19px] font-bold text-[#173251] mt-2">
              Pesanan Ikan Dikonfirmasi!
            </h1>
            <p className="text-[12px] text-[#71859c] mt-1 leading-relaxed">
              Ikan segar dari tambak sedang dikemas dalam boks pendingin higienis dan segera diantar ke alamat Anda.
            </p>
          </div>

          <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[8px] p-3 text-[11.5px] space-y-1.5 text-left">
            <div className="flex justify-between">
              <span className="text-[#8192a5]">Metode:</span>
              <span className="font-semibold text-[#173251]">{b2cFulfilment}</span>
            </div>
            {b2cFulfilment === 'Antar + Jemput Sampah' && (
              <div className="flex justify-between text-[#14b97c]">
                <span>Siapkan Sampah:</span>
                <span className="font-bold">{b2cEstimatedWasteKg} kg sampah dapur</span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
              <span>Total Bayar:</span>
              <span className="text-[#008d91] text-[13px]">{formatRupiah(totals.totalIdr)}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/b2c"
              className="w-full bg-[#008d91] hover:bg-[#007478] text-white font-bold text-[12.5px] py-2.5 rounded-[8px] flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
            >
              <ShoppingBag className="size-4" />
              Kembali ke Belanja Ikan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (b2cCart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased p-4 flex flex-col justify-center items-center text-center">
        <div className="size-16 rounded-full bg-[#eaf4f7] text-[#008d91] flex items-center justify-center mb-3">
          <ShoppingCart className="size-8" />
        </div>
        <h1 className="text-[18px] font-bold text-[#173251]">Keranjang Belanja Kosong</h1>
        <p className="text-[12px] text-[#71859c] mt-1 max-w-xs leading-relaxed">
          Pilih ikan nila, bandeng segar, atau lele higienis langsung dari panen tambak sirkular hari ini.
        </p>
        <Link
          href="/b2c"
          className="mt-4 bg-[#008d91] text-white font-bold text-[12px] px-4 py-2 rounded-[6px] flex items-center gap-1.5 shadow-xs"
        >
          <ShoppingBag className="size-4" />
          Mulai Belanja Ikan Segar
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Belanja › <span className="text-[#173251] font-medium">Checkout &amp; Tukar Poin</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Keranjang Belanja
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Periksa pesanan ikan segar dan tukarkan Poin Sirkular untuk potongan harga.
        </p>
      </div>

      {/* Cart Items List */}
      <div className="px-4 mt-2 space-y-2.5">
        {b2cCart.map((item) => (
          <div
            key={item.product.id}
            className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs flex items-center justify-between"
          >
            <div>
              <h3 className="text-[12.5px] font-bold text-[#173251] leading-tight">
                {item.product.name}
              </h3>
              <p className="text-[10px] text-[#8192a5] mt-0.5">
                {formatRupiah(item.product.pricePerKgIdr)} / kg · Grade {item.product.sizeGradeLabel}
              </p>
              <p className="text-[11.5px] font-bold text-[#008d91] mt-1">
                {formatRupiah(item.product.pricePerKgIdr * item.quantityKg)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (item.quantityKg > 1) {
                    updateB2CCartQty(item.product.id, item.quantityKg - 1);
                  } else {
                    removeFromB2CCart(item.product.id);
                  }
                }}
                className="size-7 rounded-[6px] bg-[#f0f5f9] hover:bg-slate-200 flex items-center justify-center text-[#173251] transition"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="font-bold text-[12px] w-6 text-center">
                {item.quantityKg}
              </span>
              <button
                onClick={() => updateB2CCartQty(item.product.id, item.quantityKg + 1)}
                className="size-7 rounded-[6px] bg-[#008d91] hover:bg-[#007478] flex items-center justify-center text-white transition"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Details */}
      <form onSubmit={handleCheckout} className="px-4 mt-4 space-y-3">
        {/* Fulfilment Selector */}
        <div className="bg-white border border-[#e7eff4] rounded-[12px] p-3.5 shadow-xs space-y-2.5">
          <label className="text-[12px] font-bold text-[#173251] block">
            Pilih Metode Pengiriman &amp; Sirkular
          </label>

          <div className="space-y-2">
            {[
              {
                key: 'Antar + Jemput Sampah' as B2CFulfilment,
                title: 'Antar ke Rumah + Jemput Sampah Dapur',
                desc: 'Ongkir Rp 10.000 · Kurir membawa timbangan digital.',
              },
              {
                key: 'Ambil di Depot' as B2CFulfilment,
                title: 'Ambil Mandiri di Depot Fiscycle Surabaya',
                desc: 'Gratis ongkir · Bawa sampah organik ke depot.',
              },
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => setB2CFulfilment(opt.key)}
                className={`w-full p-2.5 rounded-[8px] border text-left transition ${
                  b2cFulfilment === opt.key
                    ? 'bg-[#e2f7f4] border-[#008d91] text-[#008d91]'
                    : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#5b738e]'
                }`}
              >
                <p className="text-[11.5px] font-bold">{opt.title}</p>
                <p className="text-[9.5px] opacity-80 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>

          {b2cFulfilment === 'Antar + Jemput Sampah' && (
            <div className="pt-2 border-t border-slate-100">
              <label className="text-[11px] font-semibold text-[#173251] flex justify-between">
                <span>Estimasi Sampah Diserahkan:</span>
                <span className="font-bold text-[#008d91]">{b2cEstimatedWasteKg} kg</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={b2cEstimatedWasteKg}
                onChange={(e) => setB2CEstimatedWasteKg(Number(e.target.value))}
                className="w-full accent-[#008d91] mt-1"
              />
            </div>
          )}
        </div>

        {/* Circular Points Redemption Card */}
        <div className="bg-[#f0f8fc] border border-[#cee4f3] rounded-[10px] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-[#f69b23]" />
              <div>
                <p className="text-[11.5px] font-bold text-[#173251]">Tukarkan Poin Sirkular</p>
                <p className="text-[9.5px] text-[#5b738e]">
                  Saldo Anda: {formatNumberId(balancePoints)} Poin
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={b2cRedeemPoints}
                onChange={(e) => setB2CRedeemPoints(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008d91]"></div>
            </label>
          </div>

          {b2cRedeemPoints && totals.redeemablePoints > 0 && (
            <div className="bg-white/90 rounded-[6px] p-2 flex justify-between items-center text-[11px] text-[#14b97c] font-semibold">
              <span>Gunakan {totals.redeemablePoints} Poin:</span>
              <span>-{formatRupiah(totals.discountIdr)}</span>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 space-y-1.5 text-[11.5px] shadow-xs">
          <div className="flex justify-between">
            <span className="text-[#8192a5]">Subtotal Ikan Segar:</span>
            <span className="font-semibold text-[#173251]">{formatRupiah(totals.subtotalIdr)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8192a5]">Biaya Pengantaran:</span>
            <span className="font-semibold text-[#173251]">{formatRupiah(totals.shippingIdr)}</span>
          </div>
          {totals.discountIdr > 0 && (
            <div className="flex justify-between text-[#14b97c]">
              <span>Diskon Poin Sirkular:</span>
              <span className="font-bold">-{formatRupiah(totals.discountIdr)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-[#e3ebf0] flex justify-between items-baseline font-bold">
            <span className="text-[#173251]">Total Bayar:</span>
            <span className="text-[17px] text-[#008d91]">{formatRupiah(totals.totalIdr)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#008d91] hover:bg-[#007478] text-white font-bold text-[13px] min-h-[44px] rounded-[8px] flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
        >
          <CheckCircle2 className="size-4" />
          Bayar &amp; Pesan Ikan Segar ({formatRupiah(totals.totalIdr)})
        </button>
      </form>
    </div>
  );
}
