'use client';

import React, { useState } from 'react';
import { useWastePointStore } from '@/store/useWastePointStore';
import { useMitraStore } from '@/store/useMitraStore';
import { QualityGrade, WasteContribution } from '@/lib/types';
import { formatDateId, formatRupiah } from '@/lib/format';
import {
  CheckCircle2,
  Sparkles,
  Scale,
} from 'lucide-react';

export default function AdminWastePage() {
  const { contributions, verifyWaste, rejectWaste } = useWastePointStore();
  const { bsfBatches } = useMitraStore();

  const [selectedContribution, setSelectedContribution] = useState<WasteContribution | null>(null);
  const [actualKg, setActualKg] = useState<number>(42);
  const [grade, setGrade] = useState<QualityGrade>('A');
  const [targetBatchId, setTargetBatchId] = useState<string>('BSF-04');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredContributions = contributions;

  const pendingList = filteredContributions.filter(
    (c) => c.status === 'Menunggu Verifikasi' || c.status === 'Dijemput Kurir'
  );
  const verifiedList = filteredContributions.filter((c) => c.status === 'Diterima');

  const handleOpenVerifyModal = (item: WasteContribution) => {
    setSelectedContribution(item);
    setActualKg(item.actualKg || item.estimatedKg);
  };

  const handleConfirmVerification = () => {
    if (!selectedContribution) return;

    verifyWaste(selectedContribution.id, actualKg, grade, targetBatchId);
    setToastMessage(
      `Setoran ${selectedContribution.id} (${actualKg} kg) berhasil diverifikasi Grade ${grade}! +${actualKg * 10} Poin diterbitkan dan biowaste dialokasikan ke ${targetBatchId}.`
    );
    setSelectedContribution(null);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleReject = (id: string) => {
    rejectWaste(id, 'Tercampur limbah anorganik / plastik lebih dari 15%');
    setToastMessage(`Setoran ${id} telah ditolak dengan alasan kontaminasi anorganik.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f7fafc]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-extrabold text-[#1A365D] tracking-tight">
              Verifikasi Limbah Organik &amp; Biokonversi BSF
            </h1>
            <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
              Sirkular Closed-Loop
            </span>
          </div>
          <p className="text-[12px] text-[#718096] mt-0.5">
            Verifikasi timbangan aktual limbah restoran &amp; rumah tangga, penerbitan Poin Sirkular, serta alokasi ke fasilitas budidaya BSF mitra tambak.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#fffaf0] border border-[#fbd38d] text-[#744210] rounded-[8px] px-3 py-1.5 text-[11.5px] font-semibold">
            Menunggu Verifikasi: <strong>{pendingList.length}</strong>
          </div>
          <div className="bg-[#f0fff4] border border-[#9ae6b4] text-[#22543d] rounded-[8px] px-3 py-1.5 text-[11.5px] font-semibold">
            Total Terverifikasi: <strong>{verifiedList.length}</strong>
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

      {/* Main Table Area */}
      <div className="p-6 space-y-6">
        {/* Antrean Verifikasi Pending */}
        <div className="bg-white border border-[#e2e8f0] rounded-[10px] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#edf2f7] flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#1A365D] flex items-center gap-2">
              <Scale className="size-4 text-[#dd6b20]" />
              Antrean Verifikasi Timbangan Limbah
            </h2>
            <span className="text-[11px] text-[#718096]">
              {pendingList.length} pengajuan menunggu validasi
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f7fafc] border-b border-[#e2e8f0] text-[#718096] uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">ID Setoran</th>
                  <th className="py-3 px-4">Kontributor / Resto</th>
                  <th className="py-3 px-4">Kategori Limbah</th>
                  <th className="py-3 px-4">Estimasi Berat</th>
                  <th className="py-3 px-4">Jadwal Jemput</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {pendingList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-[#a0aec0] italic">
                      Tidak ada antrean limbah menunggu verifikasi saat ini.
                    </td>
                  </tr>
                ) : (
                  pendingList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#00629b]">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#1a202c]">
                        {item.contributorName}
                        <span className="text-[10px] text-[#718096] block font-normal">
                          Peran: {item.contributorRole.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#4a5568]">
                        {item.categoryLabel}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1a202c]">
                        {item.estimatedKg} kg
                      </td>
                      <td className="py-3.5 px-4 text-[#718096]">
                        {formatDateId(item.pickupDate)}
                        <span className="block text-[10px]">{item.pickupSlot}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-[#fffaf0] border border-[#fbd38d] text-[#744210] font-bold text-[10px] px-2 py-0.5 rounded-[4px]">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleReject(item.id)}
                          className="bg-white hover:bg-rose-50 border border-slate-200 text-rose-600 font-bold text-[11px] px-2.5 py-1.5 rounded-[5px] transition"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => handleOpenVerifyModal(item)}
                          className="bg-[#1A365D] hover:bg-[#132845] text-white font-bold text-[11px] px-3 py-1.5 rounded-[5px] transition active:scale-95 shadow-xs"
                        >
                          Verifikasi &amp; Terbitkan Poin
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Riwayat Verifikasi Sukses */}
        <div className="bg-white border border-[#e2e8f0] rounded-[10px] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#edf2f7] flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#1A365D] flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#38a169]" />
              Riwayat Limbah Terverifikasi &amp; Terhubung BSF
            </h2>
            <span className="text-[11px] text-[#718096]">
              {verifiedList.length} transaksi selesai
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f7fafc] border-b border-[#e2e8f0] text-[#718096] uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">ID Setoran</th>
                  <th className="py-3 px-4">Kontributor</th>
                  <th className="py-3 px-4">Berat Aktual</th>
                  <th className="py-3 px-4">Mutu Grade</th>
                  <th className="py-3 px-4">Poin Terbit</th>
                  <th className="py-3 px-4">Fasilitas BSF</th>
                  <th className="py-3 px-4">Tanggal Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {verifiedList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#00629b]">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#1a202c]">
                      {item.contributorName}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#1a202c]">
                      {item.actualKg || item.estimatedKg} kg
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-[#f0fff4] text-[#22543d] font-bold text-[10px] px-2 py-0.5 rounded-[4px] border border-[#c6f6d5]">
                        Grade {item.qualityGrade || 'A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#14b97c]">
                      +{item.pointsAwarded} Poin
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#00629b]">
                      {item.bsfBatchId || 'BSF-04'}
                    </td>
                    <td className="py-3 px-4 text-[#718096]">
                      {item.verifiedAt ? formatDateId(item.verifiedAt.split('T')[0]) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {selectedContribution && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[14px] shadow-2xl max-w-md w-full p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#edf2f7] pb-3">
              <div>
                <h3 className="text-[15px] font-bold text-[#1A365D]">
                  Verifikasi Timbangan &amp; Alokasi BSF
                </h3>
                <p className="text-[11px] text-[#718096]">
                  Setoran ID: <strong className="font-mono">{selectedContribution.id}</strong> ({selectedContribution.contributorName})
                </p>
              </div>
              <button
                onClick={() => setSelectedContribution(null)}
                className="size-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="font-bold text-[#2d3748] block mb-1">
                  Berat Aktual Timbang (kg)
                </label>
                <input
                  type="number"
                  value={actualKg}
                  onChange={(e) => setActualKg(Number(e.target.value))}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e0] rounded-[7px] h-10 px-3 font-bold text-[14px] text-[#1a202c]"
                />
              </div>

              <div>
                <label className="font-bold text-[#2d3748] block mb-1">
                  Kualitas / Grade Kemurnian Organik
                </label>
                <div className="flex gap-2">
                  {(['A', 'B', 'C'] as QualityGrade[]).map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-[6px] border ${
                        grade === g
                          ? 'bg-[#1A365D] text-white border-[#1A365D]'
                          : 'bg-[#f7fafc] border-[#e2e8f0] text-[#4a5568]'
                      }`}
                    >
                      Grade {g} {g === 'A' ? '(Sangat Murni)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2d3748] block mb-1">
                  Target Batch Biokonversi BSF Mitra
                </label>
                <select
                  value={targetBatchId}
                  onChange={(e) => setTargetBatchId(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e0] rounded-[7px] h-10 px-3 font-semibold text-[#1a202c]"
                >
                  {bsfBatches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.id}) · Siklus Hari ke-{b.dayOfCycle}/14
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-[#f0fff4] border border-[#9ae6b4] rounded-[8px] p-3 text-[#22543d] space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="size-3.5 text-[#38a169]" />
                  Poin yang Diterbitkan: +{actualKg * 10} Poin Sirkular
                </p>
                <p className="text-[10.5px]">
                  Poin senilai {formatRupiah(actualKg * 1000)} akan langsung masuk ke dompet digital kontributor.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#edf2f7]">
              <button
                type="button"
                onClick={() => setSelectedContribution(null)}
                className="flex-1 py-2 text-[12px] font-bold border border-slate-300 rounded-[7px] text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmVerification}
                className="flex-1 py-2 text-[12px] font-bold bg-[#1A365D] hover:bg-[#132845] text-white rounded-[7px] shadow-xs active:scale-[0.99]"
              >
                Konfirmasi &amp; Terbitkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
