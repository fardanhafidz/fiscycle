'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { FishSpecies, OrderFrequency } from '@/lib/types';
import { B2B_PRICE_PER_KG, SIZE_GRADE_OPTIONS } from '@/lib/constants';
import { formatNumberId, formatRupiah, formatDateId } from '@/lib/format';
import {
  Fish,
  Truck,
  Award,
  CheckCircle2,
} from 'lucide-react';

export default function B2BOrdersPage() {
  const { currentUser } = useAuthStore();
  const { wallets, deductPointsForOrder } = useWastePointStore();
  const {
    b2bDraft,
    updateB2BDraft,
    b2bRedeemPoints,
    setB2BRedeemPoints,
    computeB2BCheckoutTotals,
    submitB2BOrder,
    orders,
  } = useB2BCartStore();

  const [activeTab, setActiveTab] = useState<'pesan' | 'riwayat'>('pesan');
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const wallet = wallets['WAL-0007'];
  const balancePoints = wallet?.balancePoints ?? 2580;
  const totals = computeB2BCheckoutTotals(balancePoints);

  const speciesOptions: { key: FishSpecies; name: string; price: number }[] = [
    { key: 'Nila', name: 'Ikan Nila Super Sirkular', price: B2B_PRICE_PER_KG['Nila'] },
    { key: 'Bandeng', name: 'Ikan Bandeng Cabut Duri', price: B2B_PRICE_PER_KG['Bandeng'] },
    { key: 'Lele', name: 'Ikan Lele Segar Bersih', price: B2B_PRICE_PER_KG['Lele'] },
  ];

  const handleSpeciesChange = (species: FishSpecies) => {
    updateB2BDraft({ species });
  };

  const handleQuantityChange = (qty: number) => {
    updateB2BDraft({ quantityKg: Math.max(50, qty) });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const buyerUser = currentUser || {
      id: 'USR-B2B-01',
      name: 'Hendro Wijaya',
      email: 'procurement@abcrestaurant.id',
      phone: '081355550007',
      role: 'b2b',
      organizationName: 'ABC Restaurant',
      avatarInitials: 'AR',
      walletId: 'WAL-0007',
    };

    const newOrder = submitB2BOrder(buyerUser, balancePoints);
    if (newOrder.pointsRedeemed > 0 && wallet) {
      deductPointsForOrder(wallet.id, newOrder.pointsRedeemed, newOrder.id);
    }
    setCreatedOrderId(newOrder.id);
  };

  // Filter orders for B2B
  const b2bOrders = orders.filter((o) => o.buyerChannel === 'b2b');

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Horeka › <span className="text-[#173251] font-medium">Pasokan Ikan Tambak</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Pasokan Ikan Segar B2B
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Pemesanan grosir komoditas tambak bersertifikasi Fiscycle dengan jaminan mutu bebas bau tanah.
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-2 flex gap-2">
        <button
          onClick={() => setActiveTab('pesan')}
          className={`flex-1 py-2 text-[11.5px] font-bold rounded-[7px] border transition ${
            activeTab === 'pesan'
              ? 'bg-[#00629b] text-white border-[#00629b] shadow-xs'
              : 'bg-white border-[#e1e7ec] text-[#5b738e] hover:bg-slate-50'
          }`}
        >
          Form Buat Pesanan Baru
        </button>
        <button
          onClick={() => setActiveTab('riwayat')}
          className={`flex-1 py-2 text-[11.5px] font-bold rounded-[7px] border transition ${
            activeTab === 'riwayat'
              ? 'bg-[#00629b] text-white border-[#00629b] shadow-xs'
              : 'bg-white border-[#e1e7ec] text-[#5b738e] hover:bg-slate-50'
          }`}
        >
          Riwayat &amp; Status ({b2bOrders.length})
        </button>
      </div>

      {/* Success Banner */}
      {createdOrderId && (
        <div className="px-4 mt-3">
          <div className="bg-[#e5f8ef] border border-[#a1e5cb] text-[#0e8a5b] p-3.5 rounded-[10px] shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0" />
              <p className="text-[13px] font-bold">
                Pesanan Berhasil Dibuat! ({createdOrderId})
              </p>
            </div>
            <p className="text-[11px] leading-relaxed">
              Pesanan grosir Anda telah dialokasikan ke sistem lelang &amp; kurasi mitra tambak. Kami akan memberitahu saat tambak siap panen.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setCreatedOrderId(null);
                  setActiveTab('riwayat');
                }}
                className="text-[11px] font-bold text-[#00629b] bg-white border border-[#a9c9db] px-3 py-1.5 rounded-[5px]"
              >
                Lihat Status Pesanan
              </button>
              <button
                onClick={() => setCreatedOrderId(null)}
                className="text-[11px] font-bold text-[#5b738e] hover:underline px-2"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: FORM PEMESANAN */}
      {activeTab === 'pesan' && (
        <div className="px-4 mt-3">
          <form
            onSubmit={handleSubmitOrder}
            className="bg-white border border-[#e7eff4] rounded-[12px] p-4 shadow-xs space-y-3.5"
          >
            {/* Species Selection */}
            <div>
              <label className="text-[12px] font-bold text-[#173251] block mb-1.5">
                1. Pilih Komoditas Ikan
              </label>
              <div className="space-y-2">
                {speciesOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => handleSpeciesChange(opt.key)}
                    className={`w-full p-2.5 rounded-[8px] flex items-center justify-between border transition text-left ${
                      b2bDraft.species === opt.key
                        ? 'bg-[#e2f3fc] border-[#00629b] text-[#00629b]'
                        : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#5b738e] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Fish className="size-4" />
                      <div>
                        <p className="text-[12px] font-bold">{opt.name}</p>
                        <p className="text-[10px] opacity-75">Mutu Super · Bebas Bau Tanah</p>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-[#14b97c]">
                      {formatRupiah(opt.price)} / kg
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Grade Selector */}
            <div>
              <label className="text-[12px] font-bold text-[#173251] block mb-1">
                2. Grade Ukuran Ikan
              </label>
              <select
                value={b2bDraft.sizeGradeLabel}
                onChange={(e) => updateB2BDraft({ sizeGradeLabel: e.target.value })}
                className="w-full bg-[#f8fbfd] border border-[#dce6ee] rounded-[6px] h-9 px-2.5 text-[11.5px] text-[#173251] focus:outline-hidden"
              >
                {SIZE_GRADE_OPTIONS[b2bDraft.species].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade} (Rekomendasi Resto)
                  </option>
                ))}
              </select>
            </div>

            {/* Volume Quantity */}
            <div>
              <label className="text-[12px] font-bold text-[#173251] flex justify-between items-center mb-1">
                <span>3. Volume Pasokan (Minimal 50 kg)</span>
                <span className="text-[#00629b] font-bold text-[15px]">
                  {formatNumberId(b2bDraft.quantityKg)} kg
                </span>
              </label>
              <input
                type="range"
                min={50}
                max={2000}
                step={50}
                value={b2bDraft.quantityKg}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-full accent-[#00629b]"
              />
              <div className="flex gap-1.5 mt-1.5">
                {[100, 300, 500, 1000].map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => handleQuantityChange(preset)}
                    className={`flex-1 py-1 text-[10.5px] font-semibold rounded-[5px] border ${
                      b2bDraft.quantityKg === preset
                        ? 'bg-[#00629b] text-white border-[#00629b]'
                        : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#71859c]'
                    }`}
                  >
                    {preset} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency & Target Delivery Date */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[#173251] block mb-1">
                  Frekuensi Pasokan
                </label>
                <select
                  value={b2bDraft.frequency}
                  onChange={(e) =>
                    updateB2BDraft({ frequency: e.target.value as OrderFrequency })
                  }
                  className="w-full bg-[#f8fbfd] border border-[#dce6ee] rounded-[6px] h-9 px-2 text-[11px] text-[#173251] focus:outline-hidden"
                >
                  <option value="Sekali">Sekali Kirim</option>
                  <option value="Mingguan">Rutin Mingguan</option>
                  <option value="Dua Mingguan">Dua Mingguan</option>
                  <option value="Bulanan">Rutin Bulanan</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#173251] block mb-1">
                  Tanggal Pengiriman
                </label>
                <input
                  type="date"
                  value={b2bDraft.deliveryDate}
                  onChange={(e) => updateB2BDraft({ deliveryDate: e.target.value })}
                  className="w-full bg-[#f8fbfd] border border-[#dce6ee] rounded-[6px] h-9 px-2 text-[11px] text-[#173251] focus:outline-hidden"
                >
                </input>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="text-[11px] font-bold text-[#173251] block mb-1">
                Alamat Tujuan Dapur Resto
              </label>
              <input
                type="text"
                value={b2bDraft.deliveryAddress}
                onChange={(e) => updateB2BDraft({ deliveryAddress: e.target.value })}
                className="w-full bg-[#f8fbfd] border border-[#dce6ee] rounded-[6px] h-9 px-2.5 text-[11px] text-[#173251] focus:outline-hidden"
              />
            </div>

            {/* Circular Points Redemption Toggle */}
            <div className="bg-[#f0f8fc] border border-[#cee4f3] rounded-[8px] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-[#f69b23]" />
                  <div>
                    <p className="text-[11.5px] font-bold text-[#173251]">Tukarkan Poin Sirkular</p>
                    <p className="text-[9.5px] text-[#5b738e]">
                      Saldo: {formatNumberId(balancePoints)} Poin (Diskon maks 20%)
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={b2bRedeemPoints}
                    onChange={(e) => setB2BRedeemPoints(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00629b]"></div>
                </label>
              </div>

              {b2bRedeemPoints && totals.redeemablePoints > 0 && (
                <div className="bg-white/80 rounded-[6px] p-2 flex justify-between items-center text-[11px] text-[#14b97c] font-semibold">
                  <span>Hemat dari {totals.redeemablePoints} Poin:</span>
                  <span>-{formatRupiah(totals.discountIdr)}</span>
                </div>
              )}
            </div>

            {/* Total Payment Breakdown */}
            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[8px] p-3 space-y-1.5 text-[11.5px]">
              <div className="flex justify-between">
                <span className="text-[#8192a5]">Subtotal ({b2bDraft.quantityKg} kg):</span>
                <span className="font-semibold text-[#173251]">
                  {formatRupiah(totals.subtotalIdr)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8192a5]">Ongkir Truk Pendingin:</span>
                <span className="font-semibold text-[#173251]">
                  {formatRupiah(totals.shippingIdr)}
                </span>
              </div>
              {totals.discountIdr > 0 && (
                <div className="flex justify-between text-[#14b97c]">
                  <span>Diskon Poin Sirkular:</span>
                  <span className="font-bold">-{formatRupiah(totals.discountIdr)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#e3ebf0] flex justify-between items-baseline">
                <span className="font-bold text-[#173251]">Total Pembayaran:</span>
                <span className="text-[17px] font-bold text-[#00629b]">
                  {formatRupiah(totals.totalIdr)}
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[13px] min-h-[44px] rounded-[7px] flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
            >
              <Truck className="size-4" />
              Pesan Pasokan Ikan Tambak Sekarang
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: RIWAYAT & STATUS PESANAN */}
      {activeTab === 'riwayat' && (
        <div className="px-4 mt-3 space-y-3">
          {b2bOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#00629b] bg-[#eef6fa] px-1.5 py-0.2 rounded-[3px]">
                      {order.id}
                    </span>
                    <span className="text-[13px] font-bold text-[#173251]">
                      {order.species}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#8192a5] mt-0.5">
                    Grade: {order.sizeGradeLabel} · {order.quantityKg} kg
                  </p>
                </div>

                <span
                  className={`text-[9.5px] font-bold px-2 py-0.5 rounded-[4px] ${
                    order.status === 'Dalam Pengiriman'
                      ? 'bg-[#e2f3fc] text-[#00629b]'
                      : order.status === 'Menunggu Panen'
                      ? 'bg-[#fff3df] text-[#f69b23]'
                      : order.status === 'Selesai'
                      ? 'bg-[#e5f8ef] text-[#14b97c]'
                      : 'bg-slate-100 text-[#5b738e]'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2.5 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#8192a5]">Alamat Antar:</span>
                  <span className="font-medium text-[#173251] line-clamp-1">
                    {order.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8192a5]">Jadwal Pengiriman:</span>
                  <span className="font-semibold text-[#173251]">
                    {formatDateId(order.deliveryDate)}
                  </span>
                </div>
                {order.pointsRedeemed > 0 && (
                  <div className="flex justify-between text-[#14b97c]">
                    <span>Diskon Poin:</span>
                    <span className="font-semibold">
                      -{formatRupiah(order.discountIdr)} ({order.pointsRedeemed} Poin)
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-[#eaf1f5] font-bold">
                  <span className="text-[#173251]">Total:</span>
                  <span className="text-[#00629b] text-[13px]">
                    {formatRupiah(order.totalIdr)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#8192a5] pt-0.5">
                <span>Dibuat: {formatDateId(order.createdAt.split('T')[0])}</span>
                <span className="text-[#00629b] font-medium">{order.fulfilmentType}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
