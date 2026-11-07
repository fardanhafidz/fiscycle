'use client';

import React from 'react';
import Link from 'next/link';
import { useWastePointStore } from '@/store/useWastePointStore';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { formatNumberId, formatRupiah, formatDateId } from '@/lib/format';
import {
  Award,
  Trash2,
  Fish,
  QrCode,
  Truck,
  Clock,
  Leaf,
  Scale,
} from 'lucide-react';

export default function B2BDashboardPage() {
  const { wallets, contributions } = useWastePointStore();
  const { orders } = useB2BCartStore();

  const wallet = wallets['WAL-0007'];
  const balancePoints = wallet?.balancePoints ?? 2580;
  const rupiahDiscount = balancePoints * 100;
  const totalContributedKg = wallet?.totalWasteContributedKg ?? 258;

  // Active B2B orders
  const activeOrders = orders.filter(
    (o) =>
      o.buyerChannel === 'b2b' &&
      (o.status === 'Dalam Pengiriman' || o.status === 'Menunggu Panen' || o.status === 'Menunggu Alokasi')
  );

  // Recent waste contributions
  const recentContributions = contributions.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Hero Circular Wallet Card */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-[#1A365D] via-[#00566b] to-[#008d91] rounded-[14px] p-4 text-white shadow-md relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 size-36 rounded-full bg-white/10 blur-xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/80 flex items-center gap-1.5">
              <Award className="size-3.5 text-[#f69b23]" />
              Dompet Poin Sirkular Resto
            </span>
            <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              WAL-0007
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="text-[28px] font-extrabold tracking-tight leading-none">
                {formatNumberId(balancePoints)}
              </p>
              <p className="text-[11px] text-white/80 mt-1">
                Setara Diskon Belanja Ikan: <strong className="text-white">{formatRupiah(rupiahDiscount)}</strong>
              </p>
            </div>

            <Link
              href="/b2b/profile"
              className="size-11 rounded-[10px] bg-white/15 hover:bg-white/25 border border-white/30 flex flex-col items-center justify-center text-white transition active:scale-95"
            >
              <QrCode className="size-5" />
              <span className="text-[8px] font-bold mt-0.5">QR Mitra</span>
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px]">
            <span className="text-white/80">Limbah Organik Terkumpul:</span>
            <span className="font-bold text-white flex items-center gap-1">
              <Scale className="size-3.5 text-[#14b97c]" />
              {formatNumberId(totalContributedKg)} kg
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action CTAs */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        <Link
          href="/b2b/waste"
          className="bg-white hover:bg-slate-50 border border-[#e7eff4] rounded-[10px] p-3 shadow-xs flex items-center gap-2.5 transition active:scale-[0.98]"
        >
          <div className="size-9 rounded-[8px] bg-[#e5f8ef] flex items-center justify-center text-[#14b97c] shrink-0">
            <Trash2 className="size-5" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#173251] leading-snug">Setor Limbah</p>
            <p className="text-[10px] text-[#8192a5]">+10 Poin / kg</p>
          </div>
        </Link>

        <Link
          href="/b2b/orders"
          className="bg-white hover:bg-slate-50 border border-[#e7eff4] rounded-[10px] p-3 shadow-xs flex items-center gap-2.5 transition active:scale-[0.98]"
        >
          <div className="size-9 rounded-[8px] bg-[#e2f3fc] flex items-center justify-center text-[#00629b] shrink-0">
            <Fish className="size-5" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#173251] leading-snug">Pesan Ikan Tambak</p>
            <p className="text-[10px] text-[#8192a5]">Klaim Diskon Poin</p>
          </div>
        </Link>
      </div>

      {/* Circular Impact Bento Box */}
      <div className="px-4 mt-4">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[13.5px] font-bold text-[#173251] flex items-center gap-1.5">
              <Leaf className="size-4 text-[#14b97c]" />
              Dampak Ekologi &amp; Sirkular Resto
            </h2>
            <span className="text-[9.5px] font-bold text-[#14b97c] bg-[#e5f8ef] px-2 py-0.5 rounded-[4px]">
              Net Zero Organik
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10.5px]">
            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2.5">
              <p className="text-[#8192a5]">Diverted from Landfill</p>
              <p className="text-[14px] font-bold text-[#173251] mt-0.5">{totalContributedKg} kg</p>
            </div>
            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2.5">
              <p className="text-[#8192a5]">Pelet Maggot BSF</p>
              <p className="text-[14px] font-bold text-[#00629b] mt-0.5">{(totalContributedKg * 0.2).toFixed(1)} kg</p>
            </div>
            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2.5">
              <p className="text-[#8192a5]">Emisi Gas Metana</p>
              <p className="text-[14px] font-bold text-[#14b97c] mt-0.5">-{(totalContributedKg * 0.5).toFixed(0)} kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Fish Supply Orders */}
      <div className="px-4 mt-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[13.5px] font-bold text-[#173251] flex items-center gap-1.5">
            <Truck className="size-4 text-[#00629b]" />
            Pesanan Pasokan Ikan Aktif
          </h2>
          <Link href="/b2b/orders" className="text-[11px] font-medium text-[#00629b]">
            Lihat Semua
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <div className="bg-white border border-[#e7eff4] rounded-[8px] p-4 text-center">
            <p className="text-[12px] text-[#8192a5]">Tidak ada pesanan aktif saat ini.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {activeOrders.slice(0, 2).map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#00629b] bg-[#eef6fa] px-1.5 py-0.5 rounded-[3px]">
                      {order.id}
                    </span>
                    <span className="text-[12px] font-bold text-[#173251]">
                      {order.species} ({order.quantityKg} kg)
                    </span>
                  </div>

                  <span
                    className={`text-[9.5px] font-bold px-2 py-0.5 rounded-[4px] ${
                      order.status === 'Dalam Pengiriman'
                        ? 'bg-[#e2f3fc] text-[#00629b]'
                        : order.status === 'Menunggu Panen'
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-slate-100 text-[#5b738e]'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-[11px] text-[#8192a5] flex justify-between">
                  <span>Ukuran: {order.sizeGradeLabel}</span>
                  <span className="font-bold text-[#173251]">{formatRupiah(order.totalIdr)}</span>
                </div>

                <div className="text-[10px] text-[#8192a5] pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span>Estimasi Tiba: {formatDateId(order.deliveryDate)}</span>
                  <span className="text-[#00629b] font-medium">{order.fulfilmentType}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Waste Contributions */}
      <div className="px-4 mt-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[13.5px] font-bold text-[#173251] flex items-center gap-1.5">
            <Clock className="size-4 text-[#5b738e]" />
            Riwayat Setoran Sampah Terakhir
          </h2>
          <Link href="/b2b/waste" className="text-[11px] font-medium text-[#00629b]">
            Kelola Setoran
          </Link>
        </div>

        <div className="space-y-2">
          {recentContributions.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 shadow-xs flex items-center justify-between text-[11px]"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9.5px] font-bold text-[#5b738e]">
                    {c.id}
                  </span>
                  <span className="font-bold text-[#173251]">{c.categoryLabel}</span>
                </div>
                <p className="text-[10px] text-[#8192a5] mt-0.5">
                  {c.actualKg || c.estimatedKg} kg · {formatDateId(c.pickupDate)}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-[3px] ${
                    c.status === 'Diterima'
                      ? 'bg-[#e5f8ef] text-[#14b97c]'
                      : 'bg-[#fff3df] text-[#f69b23]'
                  }`}
                >
                  {c.status}
                </span>
                {c.pointsAwarded > 0 && (
                  <p className="text-[10px] font-bold text-[#00629b] mt-0.5">
                    +{c.pointsAwarded} Poin
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
