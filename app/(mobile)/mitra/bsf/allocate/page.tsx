'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMitraStore } from '@/store/useMitraStore';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Coins,
  CheckCircle2,
} from 'lucide-react';

function AllocateBsfFeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultBatchId = searchParams.get('batchId') || 'BSF-04';

  const { bsfBatches, ponds, allocateBsfToPond } = useMitraStore();

  const [selectedBatchId, setSelectedBatchId] = useState(defaultBatchId);
  const [selectedPondId, setSelectedPondId] = useState('POND-01');
  const [amountKg, setAmountKg] = useState<number>(15);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBatch = bsfBatches.find((b) => b.id === selectedBatchId) || bsfBatches[0];
  const selectedPond = ponds.find((p) => p.id === selectedPondId) || ponds[0];

  const maxAvailable = selectedBatch
    ? Math.max(0, selectedBatch.harvestedMaggotKg - selectedBatch.allocatedToFeedKg) || selectedBatch.estimatedMaggotYieldKg
    : 0;

  const costSavingsIdr = amountKg * 8500; // Est. penghematan pakan komersial

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) {
      toast.error('Pilih batch BSF yang valid');
      return;
    }
    if (amountKg <= 0) {
      toast.error('Jumlah pakan harus lebih dari 0 kg');
      return;
    }
    if (amountKg > maxAvailable) {
      toast.error(`Jumlah melebihi stok tersedia (${maxAvailable} kg)`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      allocateBsfToPond(selectedBatch.id, selectedPond.id, amountKg);
      toast.success(
        `Alokasi ${amountKg} kg Maggot BSF berhasil ditambahkan ke ${selectedPond.name}!`
      );
      router.push('/mitra/bsf');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] text-[#173251] font-sans antialiased pb-24">
      {/* Top Header */}
      <div className="bg-white border-b border-[#e7eff4] px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/mitra/bsf"
            className="size-8 rounded-full bg-[#f3f9fc] border border-[#e7eff4] flex items-center justify-center text-[#173251] hover:bg-[#e2f3fc] transition"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-[14px] font-bold text-[#173251]">
              Alokasi Pakan Maggot BSF
            </h1>
            <p className="text-[10px] text-[#8192a5]">
              Distribusikan hasil panen BSF ke kolam budidaya
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 mt-4 space-y-4">
        {/* Source Batch Selection Card */}
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5">
          <label className="text-[11px] font-bold text-[#173251] block">
            Pilih Batch Panen BSF (Sumber)
          </label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="w-full h-10 px-3 text-[12px] font-medium text-[#173251] bg-[#f8fafc] border border-[#d8e3eb] rounded-[6px] focus:outline-hidden focus:border-[#00629b]"
          >
            {bsfBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} — {b.status} ({Math.max(0, b.harvestedMaggotKg - b.allocatedToFeedKg)} kg sisa)
              </option>
            ))}
          </select>

          {selectedBatch && (
            <div className="bg-[#f3f9fc] border border-[#e7eff4] rounded-[6px] p-2.5 text-[10px] space-y-1">
              <div className="flex justify-between text-[#8192a5]">
                <span>Total Panen:</span>
                <span className="font-bold text-[#173251]">{selectedBatch.harvestedMaggotKg} kg</span>
              </div>
              <div className="flex justify-between text-[#8192a5]">
                <span>Sudah Dialokasikan:</span>
                <span className="font-bold text-[#173251]">{selectedBatch.allocatedToFeedKg} kg</span>
              </div>
              <div className="flex justify-between text-[#8192a5] border-t border-[#e7eff4] pt-1">
                <span>Stok Tersedia Saat Ini:</span>
                <span className="font-bold text-[#14b97c]">{maxAvailable} kg</span>
              </div>
            </div>
          )}
        </div>

        {/* Target Pond Selection Card */}
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-2.5">
          <label className="text-[11px] font-bold text-[#173251] block">
            Pilih Kolam Tujuan
          </label>
          <select
            value={selectedPondId}
            onChange={(e) => setSelectedPondId(e.target.value)}
            className="w-full h-10 px-3 text-[12px] font-medium text-[#173251] bg-[#f8fafc] border border-[#d8e3eb] rounded-[6px] focus:outline-hidden focus:border-[#00629b]"
          >
            {ponds.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.species} ({p.status}, Biomassa {p.harvest.estimatedBiomassKg} kg)
              </option>
            ))}
          </select>

          {selectedPond && (
            <div className="bg-[#f3f9fc] border border-[#e7eff4] rounded-[6px] p-2.5 text-[10px] space-y-1">
              <div className="flex justify-between text-[#8192a5]">
                <span>Status Kolam:</span>
                <span className="font-bold text-[#173251]">{selectedPond.status}</span>
              </div>
              <div className="flex justify-between text-[#8192a5]">
                <span>Populasi:</span>
                <span className="font-bold text-[#173251]">{selectedPond.initialPopulation.toLocaleString('id-ID')} ekor</span>
              </div>
              <div className="flex justify-between text-[#8192a5]">
                <span>Rekomendasi Pakan Harian:</span>
                <span className="font-bold text-[#00629b]">{selectedPond.feed.dailyTargetKg} kg/hari</span>
              </div>
            </div>
          )}
        </div>

        {/* Quantity Slider & Direct Input */}
        <div className="bg-white border border-[#e7eff4] rounded-[10px] p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#173251]">
              Jumlah Maggot BSF yang Dialokasikan
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={maxAvailable || 100}
                value={amountKg}
                onChange={(e) => setAmountKg(Number(e.target.value))}
                className="w-16 h-8 text-center text-[12px] font-bold text-[#173251] bg-[#f8fafc] border border-[#d8e3eb] rounded-[5px] focus:outline-hidden focus:border-[#00629b]"
              />
              <span className="text-[11px] font-bold text-[#8192a5]">kg</span>
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={maxAvailable || 50}
            value={amountKg}
            onChange={(e) => setAmountKg(Number(e.target.value))}
            className="w-full accent-[#00629b] cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] text-[#8192a5]">
            <span>1 kg</span>
            <span>Rekomendasi: 15–20 kg</span>
            <span>Maks: {maxAvailable} kg</span>
          </div>
        </div>

        {/* Economic & Circular Impact Card */}
        <div className="bg-[#e5f8ef] border border-[#a7f3d0] rounded-[10px] p-3.5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#14b97c]">
            <Coins className="size-4.5" />
            <h3 className="text-[12px] font-bold">Estimasi Penghematan Biaya</h3>
          </div>
          <p className="text-[18px] font-bold text-[#173251]">
            Rp {costSavingsIdr.toLocaleString('id-ID')}
          </p>
          <p className="text-[10px] text-[#8192a5] leading-relaxed">
            Substitusi {amountKg} kg pakan maggot berprotein tinggi mengurangi konsumsi pelet apung komersial.
          </p>
        </div>

        {/* CTA Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[12px] min-h-[44px] rounded-[7px] flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] disabled:opacity-50"
          >
            <CheckCircle2 className="size-4" />
            <span>
              {isSubmitting
                ? 'Memproses Alokasi Pakan...'
                : `Konfirmasi Alokasi ${amountKg} kg Pakan`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AllocateBsfFeedPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 text-sm">
          Memuat halaman alokasi pakan...
        </div>
      }
    >
      <AllocateBsfFeedContent />
    </Suspense>
  );
}
