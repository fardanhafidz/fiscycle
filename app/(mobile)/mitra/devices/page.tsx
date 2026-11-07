'use client';

import React, { useState } from 'react';
import { useMitraStore } from '@/store/useMitraStore';
import {
  Cpu,
  Radio,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Signal,
  Search,
} from 'lucide-react';

export default function MitraDevicesPage() {
  const { devices } = useMitraStore();
  const [deviceList, setDeviceList] = useState(devices);
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Online' | 'Perlu Kalibrasi' | 'Offline'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [calibratingId, setCalibratingId] = useState<string | null>(null);

  const handleCalibrate = (deviceId: string) => {
    setCalibratingId(deviceId);
    setTimeout(() => {
      setDeviceList((prev) =>
        prev.map((d) =>
          d.id === deviceId
            ? {
                ...d,
                status: 'Online',
                batteryPct: Math.min(100, d.batteryPct + 15),
                lastPingText: 'Baru saja',
              }
            : d
        )
      );
      setCalibratingId(null);
      setToastMessage(`Perangkat ${deviceId} berhasil dikalibrasi dan status kembali Online!`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  const handlePing = (deviceId: string) => {
    setToastMessage(`Ping terkirim ke ${deviceId}: Respons LoRa 38ms (Sinyal Kuat -68 dBm).`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredDevices = deviceList.filter((d) => {
    const matchesFilter = filterStatus === 'Semua' ? true : d.status === filterStatus;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pondName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const onlineCount = deviceList.filter((d) => d.status === 'Online').length;
  const calibCount = deviceList.filter((d) => d.status === 'Perlu Kalibrasi').length;
  const offlineCount = deviceList.filter((d) => d.status === 'Offline').length;

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-24 text-[#173251] font-sans antialiased">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-normal text-[#8192a5]">
          Ekosistem Mitra › <span className="text-[#173251] font-medium">Perangkat IoT</span>
        </p>
      </div>

      {/* Page Heading */}
      <div className="px-4 py-2">
        <h1 className="text-[22px] font-bold text-[#173251] tracking-tight">
          Perangkat IoT Tambak
        </h1>
        <p className="text-[12px] text-[#71859c] mt-0.5 leading-snug">
          Monitoring status sensor realtime, gateway LoRaWAN, dan kalibrasi probe telemetri.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="px-4 mt-2">
          <div className="bg-[#e5f8ef] border border-[#a1e5cb] text-[#0e8a5b] p-3 rounded-[8px] text-[11.5px] font-semibold flex items-center gap-2 shadow-xs transition-all">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Summary Metrics */}
      <div className="px-4 mt-3 grid grid-cols-3 gap-2">
        <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 text-center shadow-xs">
          <p className="text-[17px] font-bold text-[#14b97c]">{onlineCount}</p>
          <p className="text-[10px] font-semibold text-[#5a718c] mt-0.5">Online Aktif</p>
        </div>
        <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 text-center shadow-xs">
          <p className="text-[17px] font-bold text-[#f69b23]">{calibCount}</p>
          <p className="text-[10px] font-semibold text-[#5a718c] mt-0.5">Perlu Kalibrasi</p>
        </div>
        <div className="bg-white border border-[#e7eff4] rounded-[8px] p-2.5 text-center shadow-xs">
          <p className="text-[17px] font-bold text-rose-600">{offlineCount}</p>
          <p className="text-[10px] font-semibold text-[#5a718c] mt-0.5">Offline</p>
        </div>
      </div>

      {/* Alert Card if Calibration is needed */}
      {calibCount > 0 && (
        <div className="px-4 mt-3">
          <div className="bg-[#fff9f0] border border-[#fbd38d] rounded-[10px] p-3 shadow-xs">
            <div className="flex items-start gap-2">
              <AlertTriangle className="size-4 text-[#dd6b20] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-bold text-[#7b341e]">
                  Kalibrasi Diperlukan: Sensor DO-05
                </p>
                <p className="text-[10.5px] text-[#9c4221] mt-0.5 leading-relaxed">
                  Probe DO di Kolam 2 terdeteksi mengalami deviasi drift 0,4 mg/L setelah 30 hari pemakaian. Segera lakukan kalibrasi 2-titik menggunakan larutan kalibrasi standar.
                </p>
                <button
                  onClick={() => handleCalibrate('DEV-DO-05')}
                  disabled={calibratingId === 'DEV-DO-05'}
                  className="mt-2 bg-[#dd6b20] hover:bg-[#c05621] text-white text-[11px] font-bold px-3 py-1.5 rounded-[5px] flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <RotateCw className={`size-3 ${calibratingId === 'DEV-DO-05' ? 'animate-spin' : ''}`} />
                  {calibratingId === 'DEV-DO-05' ? 'Mengalibrasi...' : 'Kalibrasi Otomatis Sekarang'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="px-4 mt-3">
        <div className="bg-white border border-[#dce6ee] rounded-[8px] h-10 px-3 flex items-center gap-2 shadow-xs">
          <Search className="size-4 text-[#8192a5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ID, jenis probe, atau kolam..."
            className="w-full bg-transparent text-[12px] text-[#173251] placeholder:text-[#8192a5] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {(['Semua', 'Online', 'Perlu Kalibrasi', 'Offline'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-[6px] text-[11px] font-semibold whitespace-nowrap transition ${
              filterStatus === status
                ? 'bg-[#00629b] text-white shadow-xs'
                : 'bg-white border border-[#e1e7ec] text-[#71859c] hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Device Cards List */}
      <div className="px-4 mt-3 space-y-2.5">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white border border-[#e7eff4] rounded-[10px] p-3 shadow-xs space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <div className="size-9 rounded-[7px] bg-[#e2f3fc] flex items-center justify-center text-[#00629b] shrink-0">
                  {device.type === 'Gateway LoRa' ? (
                    <Radio className="size-5" />
                  ) : (
                    <Cpu className="size-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#00629b] bg-[#eef6fa] px-1.5 py-0.2 rounded-[3px]">
                      {device.id}
                    </span>
                    <span className="text-[12.5px] font-bold text-[#173251]">
                      {device.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8192a5] mt-0.5">
                    Lokasi: {device.pondName} · Tipe: {device.type}
                  </p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-bold ${
                  device.status === 'Online'
                    ? 'bg-[#e5f8ef] text-[#14b97c]'
                    : device.status === 'Perlu Kalibrasi'
                    ? 'bg-[#fff3df] text-[#f69b23]'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >
                {device.status}
              </span>
            </div>

            <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[6px] p-2 flex items-center justify-between text-[10.5px]">
              <div className="flex items-center gap-1 text-[#5b738e]">
                {device.batteryPct >= 70 ? (
                  <BatteryCharging className="size-3.5 text-[#14b97c]" />
                ) : device.batteryPct >= 30 ? (
                  <BatteryMedium className="size-3.5 text-[#f69b23]" />
                ) : (
                  <BatteryLow className="size-3.5 text-rose-600" />
                )}
                <span>Baterai: {device.batteryPct}%</span>
              </div>

              <div className="flex items-center gap-1 text-[#8192a5]">
                <Signal className="size-3 text-[#00629b]" />
                <span>Ping: {device.lastPingText}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => handlePing(device.id)}
                className="flex-1 bg-[#f0f5f9] hover:bg-[#e2ebf2] text-[#00629b] font-semibold text-[10.5px] py-1.5 rounded-[5px] transition"
              >
                Tes Sinyal LoRa
              </button>
              <button
                onClick={() => handleCalibrate(device.id)}
                disabled={calibratingId === device.id}
                className="flex-1 bg-[#00629b] hover:bg-[#005180] text-white font-semibold text-[10.5px] py-1.5 rounded-[5px] transition disabled:opacity-50 flex items-center justify-center gap-1"
              >
                <RotateCw className={`size-3 ${calibratingId === device.id ? 'animate-spin' : ''}`} />
                {calibratingId === device.id ? 'Mengalibrasi...' : 'Kalibrasi'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
