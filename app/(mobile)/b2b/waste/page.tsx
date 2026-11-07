'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore, SubmitWastePayload } from '@/store/useWastePointStore';
import { WasteCategory } from '@/lib/types';
import { formatNumberId, formatRupiah, formatDateId } from '@/lib/format';
import {
  CheckCircle2,
  Award,
  Truck,
} from 'lucide-react';

export default function B2BWastePage() {
  const { currentUser } = useAuthStore();
  const { submitWaste, contributions } = useWastePointStore();

  const [category, setCategory] = useState<WasteCategory>('sisa_dapur');
  const [estimatedKg, setEstimatedKg] = useState<number>(42);
  const [pickupDate, setPickupDate] = useState<string>('2026-11-06');
  const [pickupSlot, setPickupSlot] = useState<string>('08:00 - 10:00 WIB');
  const [pickupAddress, setPickupAddress] = useState<string>(
    'ABC Restaurant - Jl. Raya Darmo No. 88, Surabaya'
  );
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const categoryOptions: { key: WasteCategory; label: string; desc: string }[] = [
    {
      key: 'sisa_dapur',
      label: 'Sisa Makanan Dapur',
      desc: 'Nasi, lauk pauk, dan sisa olahan masak harian.',
    },
    {
      key: 'sayur_buah',
      label: 'Kulit & Potongan Sayur/Buah',
      desc: 'Bahan mentah segar dapur tanpa plastik/minyak jenuh.',
    },
    {
      key: 'sisa_ikan',
      label: 'Limbah Insang & Tulang Ikan',
      desc: 'Kaya asam amino, sangat disukai biokonversi larva BSF.',
    },
    {
      key: 'campuran_organik',
      label: 'Campuran Organik Dapur',
      desc: 'Pilah organik umum tanpa kemasan anorganik.',
    },
  ];

  const estimatedPoints = Math.round(estimatedKg * 10);
  const estimatedRupiah = estimatedPoints * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCat = categoryOptions.find((c) => c.key === category);

    const payload: SubmitWastePayload = {
      contributorUserId: currentUser?.id || 'USR-B2B-01',
      contributorName: currentUser?.organizationName || 'ABC Restaurant',
      contributorRole: 'b2b',
      category,
      categoryLabel: selectedCat?.label || 'Sisa Dapur & Restoran',
      estimatedKg,
      pickupDate,
      pickupSlot,
      pickupAddress,
    };

    const newContrib = submitWaste(payload);
    setSubmittedId(newContrib.id);
  };

  // Filter contributions submitted by this B2B user
  const b2bContributions = contributions.filter((c) => c.contributorRole === 'b2b');

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Sirkular › <span className="text-[#173251] font-medium">Setor Limbah Organik</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Setor Limbah Organik
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Jadwalkan penjemputan limbah dapur restoran Anda. Dapatkan 10 Poin per kg untuk subsidi belanja ikan segar.
        </p>
      </div>

      {/* Success Confirmation Modal/Banner */}
      {submittedId && (
        <div className="px-4 mt-2">
          <div className="bg-[#e5f8ef] border border-[#a1e5cb] text-[#0e8a5b] p-3.5 rounded-[10px] shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0" />
              <p className="text-[13px] font-bold">
                Penjemputan Limbah Terjadwal! ({submittedId})
              </p>
            </div>
            <p className="text-[11px] leading-relaxed">
              Tim logistik Fiscycle akan menjemput limbah Anda pada{' '}
              <strong>{formatDateId(pickupDate)}</strong> ({pickupSlot}). Estimasi{' '}
              <strong>+{estimatedPoints} Poin</strong> akan langsung masuk ke dompet Anda begitu diverifikasi oleh admin.
            </p>
            <button
              onClick={() => setSubmittedId(null)}
              className="text-[11px] font-bold text-[#00629b] bg-white border border-[#a9c9db] px-3 py-1.5 rounded-[5px] mt-1 hover:bg-slate-50 transition"
            >
              Jadwalkan Setoran Baru
            </button>
          </div>
        </div>
      )}

      {/* Waste Submission Form */}
      <div className="px-4 mt-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e7eff4] rounded-[12px] p-4 shadow-xs space-y-3.5"
        >
          {/* Category Selector */}
          <div>
            <label className="text-[12px] font-bold text-[#173251] block mb-1.5">
              1. Pilih Kategori Limbah Organik
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => setCategory(opt.key)}
                  className={`p-2.5 rounded-[8px] text-left border transition ${
                    category === opt.key
                      ? 'bg-[#e2f3fc] border-[#00629b] text-[#00629b]'
                      : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#5b738e] hover:bg-slate-50'
                  }`}
                >
                  <p className="text-[11.5px] font-bold leading-tight">{opt.label}</p>
                  <p className="text-[9.5px] opacity-80 mt-1 leading-snug line-clamp-2">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Weight Estimation */}
          <div>
            <label className="text-[12px] font-bold text-[#173251] flex justify-between items-center mb-1">
              <span>2. Estimasi Berat Limbah (kg)</span>
              <span className="text-[#00629b] font-bold text-[14px]">
                {estimatedKg} kg
              </span>
            </label>
            <input
              type="range"
              min={10}
              max={250}
              step={5}
              value={estimatedKg}
              onChange={(e) => setEstimatedKg(Number(e.target.value))}
              className="w-full accent-[#00629b]"
            />
            {/* Presets */}
            <div className="flex gap-1.5 mt-1.5">
              {[20, 42, 90, 150].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setEstimatedKg(preset)}
                  className={`flex-1 py-1 text-[10.5px] font-semibold rounded-[5px] border ${
                    estimatedKg === preset
                      ? 'bg-[#00629b] text-white border-[#00629b]'
                      : 'bg-[#f8fbfd] border-[#e1e7ec] text-[#71859c]'
                  }`}
                >
                  {preset} kg
                </button>
              ))}
            </div>
          </div>

          {/* Reward Points Preview Callout */}
          <div className="bg-[#f3fbf7] border border-[#d2edd7] rounded-[8px] p-3 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-[#f69b23]" />
              <div>
                <p className="font-bold text-[#173251]">Potensi Reward Poin</p>
                <p className="text-[10px] text-[#206941]">10 Poin per kg diverifikasi</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#14b97c]">
                +{formatNumberId(estimatedPoints)} Poin
              </span>
              <p className="text-[9.5px] text-[#8192a5]">Diskon {formatRupiah(estimatedRupiah)}</p>
            </div>
          </div>

          {/* Pickup Date & Slot */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-[#173251] block mb-1">
                Tanggal Jemput
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#f8fbfd] border border-[#dce6ee] rounded-[6px] h-9 px-2 text-[11px] text-[#173251] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#173251] block mb-1">
                Slot Waktu
              </label>
              <select
                value={pickupSlot}
                onChange={(e) => setPickupSlot(e.target.value)}
                className="w-full bg-[#f8fbfd] border border-[#dce6ee] rounded-[6px] h-9 px-2 text-[11px] text-[#173251] focus:outline-hidden"
              >
                <option value="08:00 - 10:00 WIB">Pagi (08:00 - 10:00 WIB)</option>
                <option value="14:00 - 16:00 WIB">Siang (14:00 - 16:00 WIB)</option>
                <option value="20:00 - 22:00 WIB">Malam (20:00 - 22:00 WIB)</option>
              </select>
            </div>
          </div>

          {/* Pickup Address */}
          <div>
            <label className="text-[11px] font-bold text-[#173251] block mb-1">
              Alamat Penjemputan
            </label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full bg-[#f8fbfd] border border-[#dce6ee] rounded-[6px] h-9 px-2.5 text-[11px] text-[#173251] focus:outline-hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00629b] hover:bg-[#005180] text-white font-bold text-[12px] min-h-[42px] rounded-[7px] flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
          >
            <Truck className="size-4" />
            Jadwalkan Penjemputan Kurir Fiscycle
          </button>
        </form>
      </div>

      {/* Riwayat Setoran Limbah */}
      <div className="px-4 mt-4 space-y-2.5">
        <h2 className="text-[14px] font-bold text-[#173251]">
          Riwayat Setoran Limbah Resto
        </h2>

        <div className="space-y-2">
          {b2bContributions.map((contrib) => (
            <div
              key={contrib.id}
              className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-1.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#00629b] bg-[#eef6fa] px-1.5 py-0.2 rounded-[3px]">
                      {contrib.id}
                    </span>
                    <span className="text-[12px] font-bold text-[#173251]">
                      {contrib.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8192a5] mt-0.5">
                    Jadwal Jemput: {formatDateId(contrib.pickupDate)} ({contrib.pickupSlot})
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

              <div className="text-[11px] flex justify-between pt-1 border-t border-slate-100">
                <span className="text-[#8192a5]">
                  Berat: {contrib.actualKg ? `${contrib.actualKg} kg (aktual)` : `${contrib.estimatedKg} kg (estimasi)`}
                </span>
                <span className="font-bold text-[#00629b]">
                  {contrib.pointsAwarded > 0 ? `+${contrib.pointsAwarded} Poin` : 'Menunggu Timbang'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
