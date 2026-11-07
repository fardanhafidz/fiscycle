'use client';

import React from 'react';
import { useMitraStore } from '@/store/useMitraStore';
import { formatNumberId } from '@/lib/format';
import {
  Building2,
  Cpu,
  Waves,
} from 'lucide-react';

export default function AdminFarmsPage() {
  const { farm, ponds, devices } = useMitraStore();

  const totalBiomass = ponds.reduce(
    (acc, p) => acc + p.harvest.estimatedBiomassKg,
    0
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f7fafc]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-extrabold text-[#1A365D] tracking-tight">
              Monitoring Tambak Mitra &amp; Jaringan IoT Telemetri
            </h1>
            <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
              Live Realtime Telemetry
            </span>
          </div>
          <p className="text-[12px] text-[#718096] mt-0.5">
            Pengawasan kualitas air kolam (DO, pH, suhu) dan status operasional perangkat IoT LoRaWAN mitra tambak.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#f0fff4] border border-[#9ae6b4] text-[#22543d] rounded-[8px] px-3 py-1.5 text-[11.5px] font-semibold">
            Biomassa Aktif: <strong>{formatNumberId(totalBiomass)} kg</strong>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Farm Profile Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-[8px] bg-[#ebf8fa] flex items-center justify-center text-[#00629b]">
                <Building2 className="size-5" />
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[#1a202c]">{farm.name}</h2>
                <p className="text-[11.5px] text-[#718096]">
                  Token: <strong className="font-mono text-[#00629b]">{farm.partnerToken}</strong> · {farm.city}, {farm.province}
                </p>
              </div>
            </div>

            <span className="bg-[#f0fff4] text-[#22543d] font-bold text-[11px] px-3 py-1 rounded-full border border-[#c6f6d5]">
              Sensor Online · {farm.sensorLastSyncedText}
            </span>
          </div>
        </div>

        {/* Ponds Telemetry Grid */}
        <div className="bg-white border border-[#e2e8f0] rounded-[10px] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#edf2f7] flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#1A365D] flex items-center gap-2">
              <Waves className="size-4 text-[#00629b]" />
              Status 6 Kolam Operasional
            </h3>
            <span className="text-[11px] text-[#718096]">Ambang Aman DO ≥ 5,0 mg/L</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f7fafc] border-b border-[#e2e8f0] text-[#718096] uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nama Kolam</th>
                  <th className="py-3 px-4">Komoditas</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">DO (Oksigen)</th>
                  <th className="py-3 px-4">pH Air</th>
                  <th className="py-3 px-4">Suhu Air</th>
                  <th className="py-3 px-4">Biomassa</th>
                  <th className="py-3 px-4">Kesiapan Panen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {ponds.map((pond) => (
                  <tr key={pond.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-[#1a202c]">
                      {pond.name}
                    </td>
                    <td className="py-3 px-4 text-[#4a5568]">
                      {pond.species}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] ${
                          pond.status === 'Baik'
                            ? 'bg-[#e5f8ef] text-[#14b97c]'
                            : pond.status === 'Perhatian'
                            ? 'bg-[#fff3df] text-[#f69b23]'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {pond.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold">
                      <span
                        className={
                          pond.telemetry.dissolvedOxygenMgL < 4.0
                            ? 'text-rose-600'
                            : 'text-[#14b97c]'
                        }
                      >
                        {pond.telemetry.dissolvedOxygenMgL.toFixed(1)} mg/L
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#4a5568]">
                      {pond.telemetry.ph.toFixed(1)}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#4a5568]">
                      {pond.telemetry.temperatureC.toFixed(1)} °C
                    </td>
                    <td className="py-3 px-4 font-bold text-[#1a202c]">
                      {formatNumberId(pond.harvest.estimatedBiomassKg)} kg
                    </td>
                    <td className="py-3 px-4 text-[#718096]">
                      {pond.harvest.readinessStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IoT Devices Health */}
        <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#edf2f7] pb-3">
            <h3 className="text-[14px] font-bold text-[#1A365D] flex items-center gap-2">
              <Cpu className="size-4 text-[#00629b]" />
              Status Perangkat IoT LoRaWAN Tambak
            </h3>
            <span className="text-[11px] text-[#718096]">{devices.length} Perangkat</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {devices.map((dev) => (
              <div
                key={dev.id}
                className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[11.5px] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#00629b] text-[10.5px]">
                    {dev.id}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-[3px] ${
                      dev.status === 'Online'
                        ? 'bg-[#e5f8ef] text-[#14b97c]'
                        : dev.status === 'Perlu Kalibrasi'
                        ? 'bg-[#fff3df] text-[#f69b23]'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {dev.status}
                  </span>
                </div>
                <p className="font-bold text-[#1a202c]">{dev.name}</p>
                <div className="flex justify-between text-[10.5px] text-[#718096] pt-1">
                  <span>Lokasi: {dev.pondName}</span>
                  <span>Baterai: {dev.batteryPct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
