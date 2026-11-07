'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore, SubmitWastePayload } from '@/store/useWastePointStore';
import { WasteCategory } from '@/lib/types';
import { formatRupiah, formatDateId } from '@/lib/format';
import {
  Scale,
  Trash2,
  CheckCircle2,
  MapPin,
  ShoppingBag,
  Truck,
} from 'lucide-react';

export default function B2CWastePage() {
  const { currentUser } = useAuthStore();
  const { submitWaste, contributions } = useWastePointStore();

  const [category, setCategory] = useState<WasteCategory>('sisa_dapur');
  const [estimatedKg, setEstimatedKg] = useState<number>(3.5);
  const [method, setMethod] = useState<'jemput_belanja' | 'drop_point'>('jemput_belanja');
  const [pickupDate] = useState<string>('2026-11-06');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const estimatedPoints = Math.round(estimatedKg * 10);
  const estimatedDiscountRupiah = estimatedPoints * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: SubmitWastePayload = {
      contributorUserId: currentUser?.id || 'USR-B2C-01',
      contributorName: currentUser?.name || 'Ibu Sari Wulandari',
      contributorRole: 'b2c',
      category,
      categoryLabel:
        category === 'sisa_dapur'
          ? 'Sisa Dapur Rumah Tangga'
          : category === 'sayur_buah'
          ? 'Kulit Buah & Sisa Sayur'
          : 'Limbah Ikan Dapur',
      estimatedKg,
      pickupDate,
      pickupSlot: '10:00 - 12:00 WIB',
      pickupAddress:
        method === 'jemput_belanja'
          ? 'Jl. Manyar Kertoarjo No. 21, Surabaya'
          : 'Drop Point Bank Sampah Srikandi - Manyar',
    };

    const newContrib = submitWaste(payload);
    setSubmittedId(newContrib.id);
  };

  const b2cContributions = contributions.filter((c) => c.contributorRole === 'b2c');

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Keluarga › <span className="text-[#173251] font-medium">Timbang &amp; Setor Sampah</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Setor Sampah Dapur
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Ubah sisa dapur rumah tangga menjadi Poin Sirkular untuk diskon belanja ikan tambak segar!
        </p>
      </div>

      {/* Confirmation Banner */}
      {submittedId && (
        <div className="px-4 mt-2">
          <div className="bg-[#e5f8ef] border border-[#a1e5cb] text-[#0e8a5b] p-3.5 rounded-[10px] shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0" />
              <p className="text-[13px] font-bold">
                Setoran Sampah Berhasil Didaftarkan ({submittedId})
              </p>
            </div>
            <p className="text-[11px] leading-relaxed">
              Kurir akan mengambil kantong sampah organik Anda saat pengantaran ikan. Poin estimasi{' '}
              <strong>+{estimatedPoints} Poin</strong> akan langsung aktif setelah ditimbang.
            </p>
            <div className="flex gap-2 pt-1">
              <Link
                href="/b2c"
                className="text-[11px] font-bold text-white bg-[#008d91] px-3 py-1.5 rounded-[5px] flex items-center gap-1"
              >
                <ShoppingBag className="size-3" />
                Belanja Ikan Sekarang
              </Link>
              <button
                onClick={() => setSubmittedId(null)}
                className="text-[11px] font-bold text-[#5b738e] px-2"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Scale Simulator Card */}
      <div className="px-4 mt-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e7eff4] rounded-[14px] p-4 shadow-xs space-y-4"
        >
          {/* Visual Digital Scale Display */}
          <div className="bg-gradient-to-br from-[#1A365D] to-[#00566b] text-white rounded-[12px] p-4 text-center relative overflow-hidden shadow-sm">
            <p className="text-[10.5px] text-white/70 font-semibold tracking-wider uppercase">
              Timbangan Digital Rumah Tangga
            </p>
            <div className="my-2">
              <span className="font-mono text-[42px] font-extrabold text-[#00B4D8] leading-none">
                {estimatedKg.toFixed(1)}
              </span>
              <span className="text-[18px] font-bold ml-1.5 text-white/80">kg</span>
            </div>
            <p className="text-[11px] text-white/90">
              Estimasi Reward:{' '}
              <strong className="text-[#a1f3de]">
                +{estimatedPoints} Poin ({formatRupiah(estimatedDiscountRupiah)})
              </strong>
            </p>
          </div>

          {/* Scale Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-[#8192a5] mb-1 font-semibold">
              <span>0,5 kg</span>
              <span>Geser untuk atur berat</span>
              <span>15 kg</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={15}
              step={0.5}
              value={estimatedKg}
              onChange={(e) => setEstimatedKg(Number(e.target.value))}
              className="w-full accent-[#008d91]"
            />
            <div className="flex gap-2 mt-2">
              {[1, 2.5, 3.5, 5, 10].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setEstimatedKg(val)}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-[6px] border ${
                    estimatedKg === val
                      ? 'bg-[#008d91] text-white border-[#008d91]'
                      : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#5b738e]'
                  }`}
                >
                  {val} kg
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="text-[12px] font-bold text-[#173251] block mb-1.5">
              Jenis Sampah Organik
            </label>
            <div className="space-y-1.5">
              {[
                {
                  key: 'sisa_dapur',
                  label: 'Sisa Makanan & Sayuran Dapur',
                  desc: 'Sisa nasi, sayur matang, dan lauk keluarga.',
                },
                {
                  key: 'sayur_buah',
                  label: 'Kulit Buah & Potongan Sayur Segar',
                  desc: 'Kulit pisang, pepaya, sisa bayam/kangkung.',
                },
                {
                  key: 'sisa_ikan',
                  label: 'Sisa Insang / Tulang Ikan Dapur',
                  desc: 'Dibersihkan dari plastik, sangat kaya protein.',
                },
              ].map((cat) => (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => setCategory(cat.key as WasteCategory)}
                  className={`w-full p-2.5 rounded-[8px] border text-left flex items-start gap-2.5 transition ${
                    category === cat.key
                      ? 'bg-[#e2f7f4] border-[#008d91] text-[#008d91]'
                      : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#5b738e]'
                  }`}
                >
                  <Trash2 className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11.5px] font-bold leading-tight">{cat.label}</p>
                    <p className="text-[10px] opacity-80 mt-0.5">{cat.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Method Selection */}
          <div>
            <label className="text-[12px] font-bold text-[#173251] block mb-1.5">
              Metode Penyerahan Sampah
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod('jemput_belanja')}
                className={`p-2.5 rounded-[8px] border text-left transition ${
                  method === 'jemput_belanja'
                    ? 'bg-[#e2f7f4] border-[#008d91] text-[#008d91]'
                    : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#5b738e]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Truck className="size-3.5" />
                  <p className="text-[11.5px] font-bold">Jemput Kurir</p>
                </div>
                <p className="text-[9.5px] opacity-80">
                  Bersamaan dengan pengantaran ikan pesanan Anda.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMethod('drop_point')}
                className={`p-2.5 rounded-[8px] border text-left transition ${
                  method === 'drop_point'
                    ? 'bg-[#e2f7f4] border-[#008d91] text-[#008d91]'
                    : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#5b738e]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="size-3.5" />
                  <p className="text-[11.5px] font-bold">Drop Point</p>
                </div>
                <p className="text-[9.5px] opacity-80">
                  Antar langsung ke Bank Sampah Manyar.
                </p>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-[#008d91] hover:bg-[#007478] text-white font-bold text-[12.5px] min-h-[44px] rounded-[8px] flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
          >
            <Scale className="size-4" />
            Setor Sampah Sekarang (+{estimatedPoints} Poin)
          </button>
        </form>
      </div>

      {/* Riwayat Setoran Rumah Tangga */}
      <div className="px-4 mt-4 space-y-2.5">
        <h2 className="text-[13.5px] font-bold text-[#173251]">
          Riwayat Setoran Sampah Anda
        </h2>

        <div className="space-y-2">
          {b2cContributions.map((contrib) => (
            <div
              key={contrib.id}
              className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-1.5 text-[11px]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9.5px] font-bold text-[#008d91] bg-[#eaf7f5] px-1.5 py-0.2 rounded-[3px]">
                      {contrib.id}
                    </span>
                    <span className="font-bold text-[#173251]">
                      {contrib.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8192a5] mt-0.5">
                    {contrib.actualKg || contrib.estimatedKg} kg · {formatDateId(contrib.pickupDate)}
                  </p>
                </div>

                <span
                  className={`text-[9.5px] font-bold px-2 py-0.5 rounded-[4px] ${
                    contrib.status === 'Diterima'
                      ? 'bg-[#e5f8ef] text-[#14b97c]'
                      : 'bg-[#fff3df] text-[#f69b23]'
                  }`}
                >
                  {contrib.status}
                </span>
              </div>

              {contrib.pointsAwarded > 0 && (
                <div className="pt-1 border-t border-slate-100 flex justify-between text-[#14b97c] font-semibold">
                  <span>Poin Diperoleh:</span>
                  <span>+{contrib.pointsAwarded} Poin Sirkular</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
