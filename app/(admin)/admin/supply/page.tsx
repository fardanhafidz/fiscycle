'use client';

import React, { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { useMitraStore } from '@/store/useMitraStore';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { formatRupiah, formatDateId } from '@/lib/format';
import { scorePondForOrder, rankPondsForOrder } from '@/lib/matching';
import {
  Sparkles,
  CheckCircle2,
  Scale,
  Truck,
} from 'lucide-react';

export default function AdminSupplyPage() {
  const { approveSupplyAllocation } = useAdminStore();
  const { ponds, farm, allocationOffers } = useMitraStore();
  const { orders } = useB2BCartStore();

  const b2bOrders = orders.filter((o) => o.buyerChannel === 'b2b');
  const firstPendingB2B = b2bOrders.find((o) => o.status === 'Menunggu Alokasi');

  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    () => firstPendingB2B?.id ?? 'ORD-0244'
  );
  const [selectedPondId, setSelectedPondId] = useState<string>('POND-04');
  const [allocatedKg, setAllocatedKg] = useState<number>(
    () => firstPendingB2B?.quantityKg ?? 200
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedOrder = b2bOrders.find((o) => o.id === selectedOrderId) || b2bOrders[0];
  const selectedPond = ponds.find((p) => p.id === selectedPondId) || ponds[3];

  const currentMatch =
    selectedOrder && selectedPond
      ? scorePondForOrder(selectedPond, selectedOrder)
      : { scorePct: 96, reason: 'Kombinasi cocok' };

  const rankedSuggestions = selectedOrder
    ? rankPondsForOrder(selectedOrder, ponds, farm)
    : [];

  const handleAllocate = () => {
    if (!selectedOrder || !selectedPond) return;

    const offers = approveSupplyAllocation(selectedOrder.id, [
      {
        farmId: farm.id,
        pondId: selectedPond.id,
        allocatedKg,
      },
    ]);

    if (offers.length > 0) {
      setToastMessage(
        `Alokasi pasokan ${offers[0].id} (${allocatedKg} kg ${selectedOrder.species}) dari ${selectedPond.name} berhasil diterbitkan dan dikirim ke Mitra Tambak!`
      );
      setTimeout(() => setToastMessage(null), 4500);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f7fafc]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-extrabold text-[#1A365D] tracking-tight">
              Orkestrasi Alokasi Pasokan Panen &amp; Buyer B2B
            </h1>
            <span className="bg-[#ebf8fa] text-[#00629b] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
              AI Match {currentMatch.scorePct}%
            </span>
          </div>
          <p className="text-[12px] text-[#718096] mt-0.5">
            Pencocokan cerdas antara pesanan pembeli Horeka dengan stok biomassa kolam yang siap panen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#f0fff4] border border-[#9ae6b4] text-[#22543d] rounded-[8px] px-3 py-1.5 text-[11.5px] font-semibold">
            Penawaran Aktif: <strong>{allocationOffers.length} Kontrak</strong>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-[#e5f8ef] text-[#0e8a5b] text-[12px] font-semibold border-b border-[#a1e5cb] flex items-center gap-2 px-6">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Allocation Matching Matrix Grid */}
      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Left Column: Orders Queue */}
        <div className="col-span-4 bg-white border border-[#e2e8f0] rounded-[10px] shadow-xs overflow-hidden flex flex-col">
          <div className="p-3.5 border-b border-[#edf2f7] bg-[#f8fafc] flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-[#1A365D] flex items-center gap-2">
              <Truck className="size-4 text-[#00629b]" />
              Permintaan Buyer B2B
            </h2>
            <span className="text-[10.5px] font-bold text-[#718096]">
              {b2bOrders.length} Pesanan
            </span>
          </div>

          <div className="p-3 space-y-2.5 overflow-y-auto max-h-[600px]">
            {b2bOrders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => {
                  setSelectedOrderId(ord.id);
                  setAllocatedKg(ord.quantityKg);
                }}
                className={`p-3 rounded-[8px] border cursor-pointer transition text-[11.5px] ${
                  selectedOrderId === ord.id
                    ? 'bg-[#ebf8fa] border-[#00629b] shadow-xs'
                    : 'bg-white border-[#e2e8f0] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#00629b]">{ord.id}</span>
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-[3px] ${
                      ord.status === 'Dialokasikan'
                        ? 'bg-[#e2f3fc] text-[#00629b]'
                        : ord.status === 'Menunggu Panen'
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-[#f0f4f8] text-[#5b738e]'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <p className="font-bold text-[#1a202c] mt-1">{ord.buyerName}</p>
                <div className="flex justify-between text-[11px] text-[#718096] mt-0.5">
                  <span>{ord.species} ({ord.sizeGradeLabel})</span>
                  <span className="font-bold text-[#1a202c]">{ord.quantityKg} kg</span>
                </div>
                <p className="text-[10px] text-[#718096] mt-1">
                  Kirim: {formatDateId(ord.deliveryDate)} ({ord.deliveryAddress.split(',')[0]})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Center/Right: Matching Engine & Action */}
        <div className="col-span-8 space-y-5">
          {/* AI Match Overview Card */}
          <div className="bg-gradient-to-r from-[#1A365D] via-[#00566b] to-[#008d91] rounded-[12px] p-5 text-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-white/90 flex items-center gap-1.5">
                <Sparkles className="size-4 text-[#00B4D8]" />
                Algoritma Rekomendasi Kecocokan Pasokan
              </span>
              <span className="bg-[#14b97c] text-white font-mono text-[12px] font-extrabold px-2.5 py-0.5 rounded-full">
                {currentMatch.scorePct}% Skor Kecocokan
              </span>
            </div>

            <p className="text-[12px] text-white/90 leading-relaxed">
              Pesanan <strong className="text-white">{selectedOrder?.buyerName}</strong> ({selectedOrder?.quantityKg} kg {selectedOrder?.species}) dialokasikan dari <strong className="text-white">{selectedPond?.name}</strong>. {currentMatch.reason}.
            </p>

            {/* AI Ranked Recommendations */}
            <div className="pt-2 border-t border-white/20">
              <p className="text-[11px] font-semibold text-white/80 mb-1.5">
                Rekomendasi Kolam Terbaik untuk Pesanan Ini:
              </p>
              <div className="flex flex-wrap gap-2">
                {rankedSuggestions.map((sug) => (
                  <button
                    key={sug.pondId}
                    type="button"
                    onClick={() => {
                      setSelectedPondId(sug.pondId);
                      setAllocatedKg(Math.min(selectedOrder?.quantityKg ?? 200, sug.estimatedBiomassKg));
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1.5 ${
                      selectedPondId === sug.pondId
                        ? 'bg-white text-[#1A365D] ring-2 ring-[#00B4D8]'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    <span>{sug.pondName}</span>
                    <span className="font-mono text-[10px] text-[#a1f3de] bg-black/20 px-1.5 py-0.2 rounded-full">
                      {sug.matchScorePct}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Allocation Setup Form */}
          <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-5 shadow-xs space-y-4">
            <h3 className="text-[14px] font-bold text-[#1A365D] flex items-center gap-2">
              <Scale className="size-4 text-[#00629b]" />
              Konfigurasi Alokasi Pasokan ke Mitra Tambak
            </h3>

            <div className="grid grid-cols-2 gap-4 text-[12px]">
              <div>
                <label className="font-bold text-[#2d3748] block mb-1">
                  Pilih Kolam Tambak Sumber
                </label>
                <select
                  value={selectedPondId}
                  onChange={(e) => setSelectedPondId(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e0] rounded-[7px] h-10 px-3 font-semibold text-[#1a202c]"
                >
                  {ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.species} · {p.harvest.estimatedBiomassKg} kg biomassa · {p.harvest.readinessStatus})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#2d3748] block mb-1">
                  Volume Dialokasikan (kg)
                </label>
                <input
                  type="number"
                  value={allocatedKg}
                  onChange={(e) => setAllocatedKg(Number(e.target.value))}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e0] rounded-[7px] h-10 px-3 font-bold text-[13px] text-[#1a202c]"
                />
              </div>
            </div>

            {/* Financial Payout Calculation */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-3 flex items-center justify-between text-[12px]">
              <div>
                <p className="font-bold text-[#1a202c]">
                  Estimasi Payout ke Mitra: {formatRupiah(allocatedKg * (selectedOrder?.pricePerKgIdr || 32000))}
                </p>
                <p className="text-[10.5px] text-[#718096]">
                  Harga kontrak disetujui: {formatRupiah(selectedOrder?.pricePerKgIdr || 32000)} / kg
                </p>
              </div>

              <button
                onClick={handleAllocate}
                className="bg-[#1A365D] hover:bg-[#132845] text-white font-bold text-[12px] px-5 py-2.5 rounded-[7px] flex items-center gap-2 transition active:scale-95 shadow-xs"
              >
                <Sparkles className="size-3.5 text-[#00B4D8]" />
                Kirim Penawaran ke Mitra Tambak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
