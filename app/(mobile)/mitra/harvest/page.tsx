'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMitraStore } from '@/store/useMitraStore';
import { formatRupiah, formatNumberId, formatDateId } from '@/lib/format';
import {
  Search,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

function MitraHarvestContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab =
    tabParam === 'penawaran' || tabParam === 'buyer' || tabParam === 'riwayat' || tabParam === 'harga'
      ? tabParam
      : 'buyer';

  const { allocationOffers } = useMitraStore();
  const [activeTab, setActiveTab] = useState<'buyer' | 'penawaran' | 'riwayat' | 'harga'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Demand data
  const buyerDemands = [
    {
      id: 'DMD-101',
      buyerName: 'Restoran Seafood Surya',
      city: 'Surabaya',
      species: 'Ikan Nila Super',
      grade: 'Grade A (300-400g/ekor)',
      quantityKg: 400,
      pricePerKg: 40000,
      neededDate: '2026-11-15',
      matchScorePct: 96,
      notes: 'Bebas bau tanah, uji nitrit < 0,05 mg/L, sertifikasi Fiscycle.',
      category: 'Horeka / Restoran',
      urgent: true,
    },
    {
      id: 'DMD-102',
      buyerName: 'Hotel Grand Majapahit',
      city: 'Surabaya',
      species: 'Ikan Bandeng Cabut Duri',
      grade: 'Grade A (400-600g/ekor)',
      quantityKg: 250,
      pricePerKg: 45000,
      neededDate: '2026-11-18',
      matchScorePct: 88,
      notes: 'Ukuran seragam, pengiriman dingin rantai pasok suhu 2-4°C.',
      category: 'Hotel Bintang 5',
      urgent: false,
    },
    {
      id: 'DMD-103',
      buyerName: 'Catering Berkah Jaya',
      city: 'Sidoarjo',
      species: 'Ikan Lele Segar',
      grade: 'Standard (8-10 ekor/kg)',
      quantityKg: 150,
      pricePerKg: 24000,
      neededDate: '2026-11-20',
      matchScorePct: 75,
      notes: 'Ikan hidup segar diantar pagi sebelum pukul 07:00 WIB.',
      category: 'Katering & Hajatan',
      urgent: false,
    },
  ];

  const filteredDemands = buyerDemands.filter(
    (d) =>
      d.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingOffers = allocationOffers.filter((o) => o.status === 'Ditawarkan');
  const activeContracts = allocationOffers.filter((o) => o.status === 'Diterima');

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Mitra › <span className="text-[#173251] font-medium">Pasar &amp; Penjualan</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Pasar &amp; Penjualan
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Hubungkan panen Anda langsung ke buyer, pantau harga pasar, dan kelola penyerapan hasil tambak.
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-2">
        <div className="bg-white border border-[#dce6ee] rounded-[8px] h-10 px-3 flex items-center gap-2 shadow-xs">
          <Search className="size-4 text-[#8192a5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari komoditas, buyer, atau penawaran..."
            className="w-full bg-transparent text-[12px] text-[#173251] placeholder:text-[#8192a5] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { key: 'buyer', label: 'Kebutuhan Buyer' },
          { key: 'penawaran', label: `Penawaran (${allocationOffers.length})` },
          { key: 'riwayat', label: 'Riwayat Transaksi' },
          { key: 'harga', label: 'Tren Harga' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-3 py-1.5 rounded-[6px] text-[11px] font-semibold whitespace-nowrap transition ${
              activeTab === tab.key
                ? 'bg-[#00629b] text-white shadow-xs'
                : 'bg-white border border-[#e1e7ec] text-[#71859c] hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Metrics */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-2.5">
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="size-7 rounded-[6px] bg-[#e2f3fc] flex items-center justify-center text-[#00629b] mb-2">
            <CheckCircle2 className="size-4" />
          </div>
          <p className="text-[19px] font-bold text-[#173251] leading-none">3.120 kg</p>
          <p className="text-[11px] font-semibold text-[#5a718c] mt-1">Siap Panen Bulan Ini</p>
          <p className="text-[10px] text-[#8192a5]">2 Kolam mencapai bobot ideal</p>
        </div>

        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="size-7 rounded-[6px] bg-[#e5f8ef] flex items-center justify-center text-[#14b97c] mb-2">
            <TrendingUp className="size-4" />
          </div>
          <p className="text-[19px] font-bold text-[#173251] leading-none">Rp 48,6 Jt</p>
          <p className="text-[11px] font-semibold text-[#5a718c] mt-1">Total Penjualan</p>
          <p className="text-[10px] text-[#14b97c] font-medium">+12% dibanding bulan lalu</p>
        </div>

        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="size-7 rounded-[6px] bg-[#fff3df] flex items-center justify-center text-[#f69b23] mb-2">
            <Clock className="size-4" />
          </div>
          <p className="text-[19px] font-bold text-[#173251] leading-none">
            {activeContracts.length + pendingOffers.length} Kontrak
          </p>
          <p className="text-[11px] font-semibold text-[#5a718c] mt-1">Pesanan Aktif</p>
          <p className="text-[10px] text-[#8192a5]">
            {pendingOffers.length} menunggu persetujuan
          </p>
        </div>

        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs">
          <div className="size-7 rounded-[6px] bg-[#f0ebfa] flex items-center justify-center text-[#7e42d6] mb-2">
            <ShieldCheck className="size-4" />
          </div>
          <p className="text-[19px] font-bold text-[#173251] leading-none">Rp 39.500</p>
          <p className="text-[11px] font-semibold text-[#5a718c] mt-1">Rata-rata / kg</p>
          <p className="text-[10px] text-[#8192a5]">Harga kontrak terjamin B2B</p>
        </div>
      </div>

      {/* AI Recommendation Match Banner */}
      {pendingOffers.length > 0 && (
        <div className="px-4 mt-4">
          <div className="bg-gradient-to-r from-[#e5f3fb] to-[#ebf7ff] border border-[#a9c9db] rounded-[10px] p-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="bg-[#00629b] text-white p-1 rounded-full">
                <Sparkles className="size-3.5" />
              </span>
              <p className="text-[12px] font-bold text-[#173251]">
                {pendingOffers.length} Penawaran Penyerapan Panen Menunggu Anda!
              </p>
            </div>
            <p className="text-[11px] text-[#4b6380] mt-1.5 leading-relaxed">
              Algoritma AI Fiscycle mencocokkan stok biomassa siap panen Anda dengan permintaan pembeli hotel &amp; resto dengan margin harga optimal.
            </p>
            <div className="mt-2.5">
              <Link
                href={`/mitra/harvest/offers/${pendingOffers[0].id}`}
                className="inline-flex items-center gap-1.5 bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] px-3 py-1.5 rounded-[6px] transition"
              >
                Tinjau Penawaran ({pendingOffers[0].id})
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Kebutuhan Buyer */}
      {activeTab === 'buyer' && (
        <div className="px-4 mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Kebutuhan Buyer Terbaru
            </h2>
            <span className="text-[11px] text-[#00629b] font-medium">
              {filteredDemands.length} Permintaan
            </span>
          </div>

          <div className="space-y-3">
            {filteredDemands.map((demand) => (
              <div
                key={demand.id}
                className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#eef5fa] text-[#5b738e]">
                      {demand.category}
                    </span>
                    <h3 className="text-[13px] font-bold text-[#173251] mt-1">
                      {demand.buyerName}
                    </h3>
                    <p className="text-[10px] text-[#8192a5]">
                      {demand.city} · Panen Dibutuhkan: {formatDateId(demand.neededDate)}
                    </p>
                  </div>

                  <span className="bg-[#e5f8ef] text-[#14b97c] text-[10px] font-bold px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                    <Sparkles className="size-2.5" />
                    {demand.matchScorePct}% Cocok
                  </span>
                </div>

                <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2.5 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#8192a5]">Komoditas &amp; Grade:</span>
                    <span className="font-semibold text-[#173251]">
                      {demand.species} ({demand.grade})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8192a5]">Kebutuhan Volume:</span>
                    <span className="font-bold text-[#00629b]">
                      {formatNumberId(demand.quantityKg)} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8192a5]">Harga Penawaran:</span>
                    <span className="font-bold text-[#14b97c]">
                      {formatRupiah(demand.pricePerKg)} / kg
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#eaf1f5]">
                    <span className="text-[#8192a5]">Potensi Pendapatan:</span>
                    <span className="font-bold text-[#173251]">
                      {formatRupiah(demand.quantityKg * demand.pricePerKg)}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-[#71859c] italic">
                  Catatan: {demand.notes}
                </p>

                <div className="pt-1">
                  <Link
                    href={`/mitra/harvest/offers/${allocationOffers[0]?.id || 'ALC-0031'}`}
                    className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[11px] py-2 rounded-[6px] flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
                  >
                    Kirim Penawaran Panen dari Kolam
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Penawaran Masuk & Kontrak Aktif */}
      {activeTab === 'penawaran' && (
        <div className="px-4 mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Daftar Penawaran Alokasi Pembeli
            </h2>
            <span className="text-[11px] text-[#00629b] font-medium">
              {allocationOffers.length} Total
            </span>
          </div>

          <div className="space-y-3">
            {allocationOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-[#00629b] bg-[#e2f3fc] px-1.5 py-0.5 rounded-[4px]">
                        {offer.id}
                      </span>
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded-[4px] ${
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
                    <h3 className="text-[13px] font-bold text-[#173251] mt-1.5">
                      {offer.buyerName}
                    </h3>
                    <p className="text-[10px] text-[#8192a5]">
                      {offer.buyerCity} · Target Panen: {formatDateId(offer.targetHarvestDate)}
                    </p>
                  </div>

                  <span className="bg-[#e5f8ef] text-[#14b97c] text-[10px] font-bold px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                    <Sparkles className="size-2.5" />
                    {offer.aiMatchScorePct}% Match
                  </span>
                </div>

                <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2.5 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#8192a5]">Alokasi Sumber:</span>
                    <span className="font-semibold text-[#173251]">
                      {offer.pondName} ({offer.species} · {offer.sizeGradeLabel})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8192a5]">Volume Alokasi:</span>
                    <span className="font-bold text-[#00629b]">
                      {formatNumberId(offer.allocatedKg)} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8192a5]">Harga Satuan:</span>
                    <span className="font-bold text-[#14b97c]">
                      {formatRupiah(offer.pricePerKgIdr)} / kg
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#eaf1f5]">
                    <span className="text-[#8192a5]">Estimasi Payout:</span>
                    <span className="font-bold text-[#173251] text-[12px]">
                      {formatRupiah(offer.estimatedPayoutIdr)}
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href={`/mitra/harvest/offers/${offer.id}`}
                    className="w-full bg-[#f3f9fc] hover:bg-[#e2f3fc] border border-[#a9c9db] text-[#00629b] font-bold text-[11px] py-2 rounded-[6px] flex items-center justify-center gap-1 transition"
                  >
                    Lihat Rincian Kontrak &amp; Keputusan
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Riwayat Transaksi */}
      {activeTab === 'riwayat' && (
        <div className="px-4 mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Riwayat Transaksi Penjualan
            </h2>
            <span className="text-[11px] text-[#00629b] font-medium">
              2 Transaksi Selesai
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: 'ORD-0238',
                buyer: 'ABC Restaurant',
                commodity: 'Ikan Bandeng Cabut Duri',
                volume: '200 kg',
                payout: 'Rp 7.000.000',
                date: '20 Okt 2026',
                status: 'Selesai & Dicairkan',
              },
              {
                id: 'ORD-0235',
                buyer: 'Depot Bu Rudy Surabaya',
                commodity: 'Ikan Nila Segar Sirkular',
                volume: '350 kg',
                payout: 'Rp 11.200.000',
                date: '12 Okt 2026',
                status: 'Selesai & Dicairkan',
              },
            ].map((tx) => (
              <div
                key={tx.id}
                className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#5b738e] bg-[#f0f4f8] px-1.5 py-0.5 rounded-[3px]">
                      {tx.id}
                    </span>
                    <span className="text-[12px] font-bold text-[#173251]">{tx.buyer}</span>
                  </div>
                  <span className="text-[9.5px] font-bold text-[#14b97c] bg-[#e5f8ef] px-2 py-0.5 rounded-[4px]">
                    {tx.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8192a5]">
                  <span>{tx.commodity} · {tx.volume}</span>
                  <span className="font-bold text-[#173251]">{tx.payout}</span>
                </div>
                <p className="text-[9.5px] text-[#8192a5]">Tanggal: {tx.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Tren Harga Pasar */}
      {activeTab === 'harga' && (
        <div className="px-4 mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#173251]">
              Tren Harga Komoditas Pasar Surabaya &amp; Sekitar
            </h2>
            <span className="text-[10px] text-[#8192a5]">Update hari ini</span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                name: 'Ikan Nila Super Sirkular (300-400g)',
                range: 'Rp 38.000 – Rp 42.000 / kg',
                trend: '+3,8%',
                direction: 'up',
                notes: 'Permintaan Horeka naik menjelang akhir pekan.',
              },
              {
                name: 'Ikan Bandeng Cabut Duri (400-600g)',
                range: 'Rp 42.000 – Rp 46.000 / kg',
                trend: 'Stabil',
                direction: 'stable',
                notes: 'Pasokan stabil dari pesisir Lamongan & Gresik.',
              },
              {
                name: 'Ikan Lele Segar Ukuran Konsumsi',
                range: 'Rp 22.000 – Rp 25.000 / kg',
                trend: 'Stabil',
                direction: 'stable',
                notes: 'Dukungan permintaan industri katering regional.',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e7eff4] rounded-[8px] p-3 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#173251]">{p.name}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] ${
                      p.direction === 'up'
                        ? 'bg-[#e5f8ef] text-[#14b97c]'
                        : 'bg-[#f0f4f8] text-[#5b738e]'
                    }`}
                  >
                    {p.trend}
                  </span>
                </div>
                <p className="text-[13px] font-bold text-[#00629b]">{p.range}</p>
                <p className="text-[10px] text-[#8192a5]">{p.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MitraHarvestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f3f9fc] p-8 text-center text-xs text-slate-400">
          Memuat data panen...
        </div>
      }
    >
      <MitraHarvestContent />
    </Suspense>
  );
}
