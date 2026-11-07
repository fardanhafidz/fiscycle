'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Bell,
  ChevronDown,
  Server,
  Wifi,
  AlertCircle,
  AlertTriangle,
  Fish,
  Droplets,
  Thermometer,
  FlaskConical,
  Waves,
  MessageCircle,
  X,
  Bug,
} from 'lucide-react';

const imgFarmLandscape = '/images/desktop-farm-landscape.png';
const imgSensorDevice1 = '/images/desktop-sensor-device-1.png';
const imgSensorDevice2 = '/images/desktop-sensor-device-2.png';
const imgDistributionTrack = '/images/desktop-bsf-distribution-track.svg';
const imgDistributionSegment = '/images/desktop-bsf-distribution-segment.svg';

interface DeviceItem {
  id: string;
  name: string;
  location: string;
  type: string;
  typeDesc: string;
  category: 'Kolam' | 'BSF';
  status: 'Online' | 'Offline' | 'Perlu Pemeriksaan';
  statusColor: string;
  statusBg: string;
  lastData: string;
  lastDataFull: string;
  deviceId: string;
  installedBy: string;
  installDate: string;
  functionDesc: string;
  parameters: string[];
}

const devicesData: DeviceItem[] = [
  {
    id: '1',
    name: 'Sensor DO-01',
    location: 'Kolam 1',
    type: 'Sensor kualitas air (DO, suhu, pH)',
    typeDesc: 'Sensor kualitas air (DO, suhu, pH)',
    category: 'Kolam',
    status: 'Online',
    statusColor: '#14b97c',
    statusBg: '#e5f8ef',
    lastData: '2 menit lalu',
    lastDataFull: '29 Okt 2026, 15:06 (2 menit lalu)',
    deviceId: 'FS-DO-01-7819',
    installedBy: 'Tim Fiscycle',
    installDate: '10 Sep 2026',
    functionDesc: 'Memantau oksigen dan kualitas air kolam 1',
    parameters: ['Oksigen terlarut (DO)', 'Suhu air', 'pH', 'Kekeruhan'],
  },
  {
    id: '2',
    name: 'Sensor Multi-02',
    location: 'Kolam 2',
    type: 'Sensor kualitas air (DO, suhu, pH)',
    typeDesc: 'Sensor kualitas air (DO, suhu, pH)',
    category: 'Kolam',
    status: 'Online',
    statusColor: '#14b97c',
    statusBg: '#e5f8ef',
    lastData: '3 menit lalu',
    lastDataFull: '29 Okt 2026, 15:05 (3 menit lalu)',
    deviceId: 'FS-ML-02-7820',
    installedBy: 'Tim Fiscycle',
    installDate: '10 Sep 2026',
    functionDesc: 'Memantau multi-parameter air kolam 2',
    parameters: ['Oksigen terlarut (DO)', 'Suhu air', 'pH', 'Kekeruhan'],
  },
  {
    id: '3',
    name: 'Sensor DO-03',
    location: 'Kolam 3',
    type: 'Sensor kualitas air (DO, suhu, pH)',
    typeDesc: 'Sensor kualitas air (DO, suhu, pH)',
    category: 'Kolam',
    status: 'Online',
    statusColor: '#14b97c',
    statusBg: '#e5f8ef',
    lastData: '4 menit lalu',
    lastDataFull: '29 Okt 2026, 15:04 (4 menit lalu)',
    deviceId: 'FS-DO-03-7821',
    installedBy: 'Tim Fiscycle',
    installDate: '11 Sep 2026',
    functionDesc: 'Memantau oksigen air kolam 3',
    parameters: ['Oksigen terlarut (DO)', 'Suhu air', 'pH', 'Kekeruhan'],
  },
  {
    id: '4',
    name: 'Sensor Multi-04',
    location: 'Kolam 4',
    type: 'Sensor kualitas air (DO, suhu, pH)',
    typeDesc: 'Sensor kualitas air (DO, suhu, pH)',
    category: 'Kolam',
    status: 'Perlu Pemeriksaan',
    statusColor: '#f69b23',
    statusBg: '#fff3df',
    lastData: '18 menit lalu',
    lastDataFull: '29 Okt 2026, 14:50 (18 menit lalu)',
    deviceId: 'FS-ML-04-7822',
    installedBy: 'Tim Fiscycle',
    installDate: '11 Sep 2026',
    functionDesc: 'Memantau multi-parameter air kolam 4',
    parameters: ['Oksigen terlarut (DO)', 'Suhu air', 'pH', 'Kekeruhan'],
  },
  {
    id: '5',
    name: 'Sensor DO-05',
    location: 'Kolam 5',
    type: 'Sensor kualitas air (DO, suhu, pH)',
    typeDesc: 'Sensor kualitas air (DO, suhu, pH)',
    category: 'Kolam',
    status: 'Offline',
    statusColor: '#f34860',
    statusBg: '#fdebea',
    lastData: '48 menit lalu',
    lastDataFull: '29 Okt 2026, 14:20 (48 menit lalu)',
    deviceId: 'FS-DO-05-7823',
    installedBy: 'Tim Fiscycle',
    installDate: '12 Sep 2026',
    functionDesc: 'Memantau oksigen air',
    parameters: ['Oksigen terlarut (DO)', 'Suhu air', 'pH', 'Kekeruhan'],
  },
  {
    id: '6',
    name: 'BSF Sensor-01',
    location: 'Batch BSF-03',
    type: 'Sensor kondisi media (suhu, kelembapan)',
    typeDesc: 'Sensor kondisi media (suhu, kelembapan)',
    category: 'BSF',
    status: 'Online',
    statusColor: '#14b97c',
    statusBg: '#e5f8ef',
    lastData: '5 menit lalu',
    lastDataFull: '29 Okt 2026, 15:03 (5 menit lalu)',
    deviceId: 'FS-BSF-01-9011',
    installedBy: 'Tim Fiscycle',
    installDate: '20 Sep 2026',
    functionDesc: 'Memantau suhu & kelembapan media biokonversi',
    parameters: ['Suhu media', 'Kelembapan media', 'Aktivitas larva'],
  },
  {
    id: '7',
    name: 'BSF Sensor-02',
    location: 'Batch BSF-04',
    type: 'Sensor kondisi media (suhu, kelembapan)',
    typeDesc: 'Sensor kondisi media (suhu, kelembapan)',
    category: 'BSF',
    status: 'Online',
    statusColor: '#14b97c',
    statusBg: '#e5f8ef',
    lastData: '3 menit lalu',
    lastDataFull: '29 Okt 2026, 15:05 (3 menit lalu)',
    deviceId: 'FS-BSF-02-9012',
    installedBy: 'Tim Fiscycle',
    installDate: '20 Sep 2026',
    functionDesc: 'Memantau suhu & kelembapan media biokonversi',
    parameters: ['Suhu media', 'Kelembapan media', 'Aktivitas larva'],
  },
];

export default function FiscyclePerangkatDesktopPage() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem>(devicesData[4]); // default Sensor DO-05
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [activeTab, setActiveTab] = useState<'summary' | 'chart' | 'history' | 'tickets'>('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const filteredDevices = devicesData.filter((dev) => {
    if (filterCategory === 'Kolam' && dev.category !== 'Kolam') return false;
    if (filterCategory === 'BSF' && dev.category !== 'BSF') return false;
    if (filterCategory === 'Online' && dev.status !== 'Online') return false;
    if (filterCategory === 'Offline' && dev.status !== 'Offline') return false;
    if (filterCategory === 'Perlu Pemeriksaan' && dev.status !== 'Perlu Pemeriksaan') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        dev.name.toLowerCase().includes(q) ||
        dev.location.toLowerCase().includes(q) ||
        dev.deviceId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div
      className="bg-[#f3f9fc] content-stretch flex flex-col gap-[12px] min-h-screen overflow-x-hidden p-[20px] relative w-full select-none"
      data-node-id="55:57234"
      data-name="Fiscycle · Perangkat"
    >
      {/* 1. Header: Search and Account Controls */}
      <div className="flex h-[30px] items-center justify-between relative shrink-0 w-full">
        {/* Search */}
        <div className="border border-[#e7eff4] bg-white flex gap-[7px] h-[28px] items-center px-[10px] rounded-[6px] shrink-0 w-[440px]">
          <Search className="size-[13px] text-[#8192a5]" />
          <input
            type="text"
            placeholder="Cari perangkat, kolam, batch, atau status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-[9px] text-[#173251] placeholder-[#8192a5] bg-transparent outline-none"
          />
        </div>

        {/* Account controls */}
        <div className="flex gap-[14px] items-center relative shrink-0">
          <div className="relative shrink-0 cursor-pointer">
            <Bell className="size-[20px] text-[#173251]" />
            <div className="absolute bg-[#f34860] right-0 top-0 rounded-full size-[6px]" />
          </div>
          <div className="bg-[#e7eff4] h-[24px] w-px shrink-0" />
          <div className="bg-[#00629b] flex items-center justify-center rounded-full shrink-0 size-[30px]">
            <span className="font-bold text-[11px] text-white">B</span>
          </div>
          <div className="flex flex-col items-start leading-[1.35] whitespace-nowrap">
            <span className="font-bold text-[#173251] text-[11px]">Budi Santoso</span>
            <span className="font-normal text-[#8192a5] text-[8px]">Mitra Tambak Makmur</span>
          </div>
          <ChevronDown className="size-[13px] text-[#8192a5] cursor-pointer" />
        </div>
      </div>

      {/* 2. Page Introduction Banner */}
      <div className="bg-[#e2f3fc] flex gap-[12px] h-[80px] items-center overflow-hidden p-[12px] relative rounded-[10px] shrink-0 w-full">
        <div className="absolute h-[80px] right-0 top-0 w-[526px] pointer-events-none overflow-hidden">
          <Image
            src={imgFarmLandscape}
            alt="Banner image"
            width={526}
            height={80}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div className="absolute bg-gradient-to-r from-[#e2f3fc] via-[#e2f3fc]/90 to-transparent h-[80px] left-[580px] top-0 w-[300px] pointer-events-none" />
        <div className="flex flex-col gap-[4px] items-start relative z-10 text-[#173251] max-w-[700px]">
          <h1 className="font-extrabold text-[24px] leading-tight">Perangkat</h1>
          <p className="font-normal text-[10px] text-[#425974] leading-relaxed">
            Pantau status perangkat Fiscycle yang terpasang di tambak Anda.
          </p>
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.93)] border border-[#cbe4f4] flex flex-col items-start right-[20px] p-[8px] rounded-[6px] top-[10px] w-[205px] z-20 shadow-sm">
          <p className="font-normal text-[#173251] text-[8px] leading-snug">
            Perangkat Fiscycle dipasang dan dikelola oleh tim kami. Anda dapat memantau status perangkat dan melaporkan jika ada kendala.
          </p>
        </div>
      </div>

      {/* 3. Six Metric Summary Cards */}
      <div className="flex gap-[10px] items-start relative shrink-0 w-full">
        {/* Card 1 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[68px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e2f3fc] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Server className="size-[18px] text-[#00629b]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[20px]">7</span>
            <span className="font-semibold text-[#173251] text-[10px]">Total Perangkat</span>
            <span className="text-[#8192a5] text-[8px]">Di seluruh tambak</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[68px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e5f8ef] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Wifi className="size-[18px] text-[#14b97c]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[20px]">6</span>
            <span className="font-semibold text-[#173251] text-[10px]">Online</span>
            <span className="text-[#8192a5] text-[8px]">Data masuk normal</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[68px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#fdebea] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <AlertCircle className="size-[18px] text-[#f34860]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[20px]">1</span>
            <span className="font-semibold text-[#173251] text-[10px]">Offline</span>
            <span className="text-[#8192a5] text-[8px]">Tidak mengirim data</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[68px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#fff3df] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <AlertTriangle className="size-[18px] text-[#f69b23]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[20px]">1</span>
            <span className="font-semibold text-[#173251] text-[10px]">Perlu Pemeriksaan</span>
            <span className="text-[#8192a5] text-[8px]">Kualitas koneksi menurun</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[68px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e2f3fc] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Fish className="size-[18px] text-[#00629b]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[20px]">5</span>
            <span className="font-semibold text-[#173251] text-[10px]">Perangkat Kolam</span>
            <span className="text-[#8192a5] text-[8px]">Sensor kualitas air &amp; lingkungan</span>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[68px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#f1ebff] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Bug className="size-[18px] text-[#9955e8]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[20px]">2</span>
            <span className="font-semibold text-[#173251] text-[10px]">Perangkat BSF</span>
            <span className="text-[#8192a5] text-[8px]">Sensor kondisi media</span>
          </div>
        </div>
      </div>

      {/* 4. Middle Row: Device Alert & Connection Status */}
      <div className="flex gap-[12px] h-[142px] items-start relative shrink-0 w-full">
        {/* Left: Perlu Ditangani Sekarang */}
        <div className="bg-[#fdebea] flex flex-col gap-[10px] h-full p-[12px] rounded-[10px] w-[760px] shrink-0 border border-[#fbd0d0]">
          <div className="flex gap-[8px] items-center">
            <AlertCircle className="size-[17px] text-[#f34860]" />
            <span className="font-extrabold text-[#f34860] text-[14px]">
              Perlu Ditangani Sekarang
            </span>
          </div>

          <div className="bg-white/60 flex gap-[12px] h-[85px] items-center p-[10px] rounded-[7px] border border-white">
            <div className="h-[66px] rounded-[6px] shrink-0 w-[90px] overflow-hidden bg-white shadow-xs">
              <Image
                src={imgSensorDevice1}
                alt="Sensor DO-05"
                width={90}
                height={66}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div className="flex flex-1 flex-col gap-[4px] min-w-0">
              <div className="flex gap-[10px] items-center">
                <span className="font-bold text-[#173251] text-[13px]">Sensor DO-05</span>
                <span className="bg-[#fdebea] text-[#f34860] font-semibold text-[9px] px-[6px] py-[2px] rounded-[4px]">
                  ● Offline
                </span>
              </div>
              <span className="text-[#8192a5] text-[10px]">Kolam 5 | Data terakhir: 48 menit lalu</span>
              <p className="text-[#173251] text-[10px]">Kondisi Kolam 5 tidak dapat dipantau secara terkini.</p>
            </div>
            <button
              onClick={() => setSelectedDevice(devicesData[4])}
              className="bg-white border border-[#a9c9db] text-[#00629b] font-bold text-[9px] h-[24px] px-[10px] rounded-[6px] hover:bg-[#e2f3fc] transition cursor-pointer"
            >
              Lihat Detail
            </button>
            <button
              onClick={() => setReportModalOpen(true)}
              className="bg-[#00629b] text-white font-bold text-[9px] h-[24px] px-[10px] rounded-[6px] hover:bg-[#004f7c] transition cursor-pointer"
            >
              Hubungi Fiscycle
            </button>
          </div>
        </div>

        {/* Right: Status Perangkat Donut */}
        <div className="bg-white flex flex-1 flex-col gap-[10px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <h2 className="font-bold text-[#173251] text-[14px]">Status Perangkat</h2>
          <div className="flex gap-[20px] items-center w-full">
            <div className="relative shrink-0 size-[91px] flex items-center justify-center">
              <Image
                src={imgDistributionTrack}
                alt="Track"
                fill
                className="object-contain"
                unoptimized
              />
              <Image
                src={imgDistributionSegment}
                alt="Segment"
                fill
                className="object-contain"
                unoptimized
              />
              <div className="flex flex-col items-center leading-tight z-10">
                <span className="font-bold text-[#173251] text-[18px]">7</span>
                <span className="text-[#8192a5] text-[8px]">Perangkat</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-[5px] text-[10px]">
              <div className="flex gap-[8px] items-center">
                <div className="size-[7px] rounded-full bg-[#14b97c]" />
                <span className="font-bold text-[#173251]">6</span>
                <span className="text-[#8192a5] flex-1">Online</span>
                <span className="text-[#8192a5] text-[9px]">86%</span>
              </div>
              <div className="flex gap-[8px] items-center">
                <div className="size-[7px] rounded-full bg-[#f34860]" />
                <span className="font-bold text-[#173251]">1</span>
                <span className="text-[#8192a5] flex-1">Offline</span>
                <span className="text-[#8192a5] text-[9px]">14%</span>
              </div>
              <div className="flex gap-[8px] items-center">
                <div className="size-[7px] rounded-full bg-[#f69b23]" />
                <span className="font-bold text-[#173251]">1</span>
                <span className="text-[#8192a5] flex-1">Perlu Pemeriksaan</span>
                <span className="text-[#8192a5] text-[9px]">14%</span>
              </div>
              <div className="flex gap-[8px] items-center">
                <div className="size-[7px] rounded-full bg-[#1688f8]" />
                <span className="font-bold text-[#173251]">0</span>
                <span className="text-[#8192a5] flex-1">Dalam Perawatan</span>
                <span className="text-[#8192a5] text-[9px]">0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Row: Device List and Device Detail Panel */}
      <div className="flex gap-[12px] h-[480px] items-start relative shrink-0 w-full">
        {/* Left: Daftar Perangkat */}
        <div className="bg-white flex flex-col gap-[9px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[638px] shrink-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[14px]">Daftar Perangkat</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-[6px] items-start w-full">
            {[
              { label: 'Semua (7)', val: 'Semua' },
              { label: 'Kolam (5)', val: 'Kolam' },
              { label: 'BSF (2)', val: 'BSF' },
              { label: 'Online (6)', val: 'Online' },
              { label: 'Offline (1)', val: 'Offline' },
              { label: 'Perlu Pemeriksaan (1)', val: 'Perlu Pemeriksaan' },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setFilterCategory(f.val)}
                className={`h-[25px] px-[9px] rounded-[5px] text-[9px] transition cursor-pointer ${
                  filterCategory === f.val
                    ? 'bg-[#1688f8] text-white font-bold'
                    : 'bg-[#f3f9fc] border border-[#e7eff4] text-[#8192a5] hover:bg-[#e2f3fc]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Subfilter controls */}
          <div className="flex gap-[8px] items-start w-full">
            <div className="border border-[#e7eff4] bg-white flex flex-1 gap-[7px] h-[29px] items-center px-[10px] rounded-[6px]">
              <Search className="size-[13px] text-[#8192a5]" />
              <input
                type="text"
                placeholder="Cari nama perangkat atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-[9px] text-[#173251] placeholder-[#8192a5] bg-transparent outline-none"
              />
            </div>
            <div className="border border-[#e7eff4] bg-white flex gap-[12px] h-[28px] items-center px-[9px] rounded-[5px] text-[#8192a5] text-[9px] cursor-pointer">
              <span>Tambak: Semua</span>
              <ChevronDown className="size-[11px]" />
            </div>
            <div className="border border-[#e7eff4] bg-white flex gap-[12px] h-[28px] items-center px-[9px] rounded-[5px] text-[#8192a5] text-[9px] cursor-pointer">
              <span>Status: Semua</span>
              <ChevronDown className="size-[11px]" />
            </div>
          </div>

          {/* Table Header */}
          <div className="flex h-[25px] items-center text-[#8192a5] font-semibold text-[8px] px-[6px] bg-[#f8fbfd] rounded-[4px]">
            <span className="w-[135px]">Nama Perangkat</span>
            <span className="w-[70px]">Lokasi</span>
            <span className="w-[130px]">Jenis Perangkat</span>
            <span className="w-[96px]">Status</span>
            <span className="w-[84px]">Data Terakhir</span>
            <span className="w-[99px] text-center">Aksi</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col overflow-y-auto">
            {filteredDevices.map((dev) => {
              const isSelected = selectedDevice.id === dev.id;
              const isRowOffline = dev.status === 'Offline';

              return (
                <div
                  key={dev.id}
                  onClick={() => setSelectedDevice(dev)}
                  className={`border-t border-[#e7eff4] flex h-[43px] items-center px-[6px] text-[8px] transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#e2f3fc]/70'
                      : isRowOffline
                      ? 'bg-[#fdebea]/60 hover:bg-[#fdebea]'
                      : 'bg-white hover:bg-[#f8fbfd]'
                  }`}
                >
                  <div className="flex gap-[6px] items-center w-[135px]">
                    <div className="h-[28px] w-[27px] rounded-[6px] overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={imgSensorDevice1}
                        alt={dev.name}
                        width={27}
                        height={28}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <span className="font-bold text-[#173251]">{dev.name}</span>
                  </div>
                  <span className="w-[70px] text-[#173251]">{dev.location}</span>
                  <span className="w-[130px] text-[#173251] truncate pr-2">{dev.type}</span>
                  <div className="w-[96px]">
                    <span
                      style={{ backgroundColor: dev.statusBg, color: dev.statusColor }}
                      className="font-semibold text-[9px] px-[6px] py-[3px] rounded-[4px] inline-block"
                    >
                      {dev.status}
                    </span>
                  </div>
                  <span className="w-[84px] text-[#8192a5]">{dev.lastData}</span>
                  <div className="w-[99px] flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDevice(dev);
                      }}
                      className="border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[9px] h-[24px] px-[10px] rounded-[6px] hover:bg-[#e2f3fc] transition"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Device Detail Panel */}
        <div className="bg-white flex flex-1 flex-col gap-[9px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          {/* Top Identity */}
          <div className="flex gap-[12px] items-center w-full">
            <div className="h-[68px] w-[83px] rounded-[6px] overflow-hidden bg-gray-50 shrink-0 border border-[#e7eff4]">
              <Image
                src={imgSensorDevice2}
                alt={selectedDevice.name}
                width={83}
                height={68}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div className="flex flex-1 flex-col gap-[3px] min-w-0">
              <div className="flex gap-[8px] items-center">
                <span className="font-bold text-[#173251] text-[18px]">
                  {selectedDevice.name}
                </span>
                <span
                  style={{
                    backgroundColor: selectedDevice.statusBg,
                    color: selectedDevice.statusColor,
                  }}
                  className="font-semibold text-[9px] px-[6px] py-[3px] rounded-[4px]"
                >
                  ● {selectedDevice.status}
                </span>
              </div>
              <span className="text-[#8192a5] text-[10px]">
                {selectedDevice.location} | {selectedDevice.type}
              </span>
            </div>
            <button
              onClick={() => setSelectedDevice(devicesData[0])}
              className="text-[#8192a5] text-[18px] hover:text-[#173251] cursor-pointer"
            >
              <X className="size-[16px]" />
            </button>
          </div>

          {/* Section Navigation Tabs */}
          <div className="border-b border-[#e7eff4] flex gap-[12px] h-[34px] items-center w-full">
            <button
              onClick={() => setActiveTab('summary')}
              className={`h-full px-[7px] text-[9px] font-bold transition border-b-2 cursor-pointer ${
                activeTab === 'summary'
                  ? 'border-[#1688f8] text-[#1688f8]'
                  : 'border-transparent text-[#8192a5] hover:text-[#173251]'
              }`}
            >
              Ringkasan
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`h-full px-[7px] text-[9px] font-medium transition border-b-2 cursor-pointer ${
                activeTab === 'chart'
                  ? 'border-[#1688f8] text-[#1688f8]'
                  : 'border-transparent text-[#8192a5] hover:text-[#173251]'
              }`}
            >
              Data &amp; Grafik
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`h-full px-[7px] text-[9px] font-medium transition border-b-2 cursor-pointer ${
                activeTab === 'history'
                  ? 'border-[#1688f8] text-[#1688f8]'
                  : 'border-transparent text-[#8192a5] hover:text-[#173251]'
              }`}
            >
              Riwayat Koneksi
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`h-full px-[7px] text-[9px] font-medium transition border-b-2 cursor-pointer ${
                activeTab === 'tickets'
                  ? 'border-[#1688f8] text-[#1688f8]'
                  : 'border-transparent text-[#8192a5] hover:text-[#173251]'
              }`}
            >
              Gangguan &amp; Tiket
            </button>
          </div>

          {/* Info and Parameters */}
          <div className="flex gap-[10px] h-[239px] items-start w-full">
            {/* Box 1: Informasi Perangkat */}
            <div className="border border-[#e7eff4] flex flex-col gap-[10px] h-full p-[10px] rounded-[6px] w-[244px] shrink-0 text-[9px]">
              <span className="font-bold text-[#173251] text-[11px]">Informasi Perangkat</span>
              <div className="flex flex-col gap-[7px]">
                <div className="flex justify-between">
                  <span className="text-[#8192a5] w-[90px]">Lokasi</span>
                  <span className="text-[#173251] font-medium flex-1">
                    {selectedDevice.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8192a5] w-[90px]">Fungsi</span>
                  <span className="text-[#173251] font-medium flex-1">
                    {selectedDevice.functionDesc}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8192a5] w-[90px]">Status</span>
                  <span
                    style={{ color: selectedDevice.statusColor }}
                    className="font-medium flex-1"
                  >
                    ● {selectedDevice.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8192a5] w-[90px]">Data terakhir</span>
                  <div className="flex-1 font-medium text-[#173251] leading-tight">
                    <span>{selectedDevice.lastDataFull}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8192a5] w-[90px]">ID Perangkat</span>
                  <span className="text-[#173251] font-medium flex-1">
                    {selectedDevice.deviceId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8192a5] w-[90px]">Dipasang oleh</span>
                  <span className="text-[#173251] font-medium flex-1">
                    {selectedDevice.installedBy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8192a5] w-[90px]">Tanggal Instalasi</span>
                  <span className="text-[#173251] font-medium flex-1">
                    {selectedDevice.installDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: Data Status & Parameters */}
            <div className="flex flex-1 flex-col gap-[9px] h-full">
              {/* Status Data */}
              <div
                className={`p-[10px] rounded-[6px] flex flex-col gap-[5px] text-[9px] border ${
                  selectedDevice.status === 'Offline'
                    ? 'bg-[#fdebea] border-[#fbd0d0]'
                    : 'bg-[#e5f8ef] border-[#c6f0de]'
                }`}
              >
                <span
                  className={`font-bold text-[10px] ${
                    selectedDevice.status === 'Offline' ? 'text-[#f34860]' : 'text-[#14b97c]'
                  }`}
                >
                  Status Data
                </span>
                <span className="text-[#173251]">
                  {selectedDevice.status === 'Offline'
                    ? 'Data terakhir diterima'
                    : 'Koneksi telemetri aktif & sinkron'}
                </span>
                <span
                  className={`font-bold text-[10px] ${
                    selectedDevice.status === 'Offline' ? 'text-[#f34860]' : 'text-[#14b97c]'
                  }`}
                >
                  {selectedDevice.lastDataFull}
                </span>
                <span className="text-[#8192a5]">
                  {selectedDevice.status === 'Offline'
                    ? 'Data setelah waktu tersebut belum tersedia.'
                    : 'Frekuensi pengiriman data setiap 60 detik.'}
                </span>
              </div>

              {/* Parameter yang Dipantau */}
              <div className="border border-[#e7eff4] p-[10px] rounded-[6px] flex flex-col gap-[6px] flex-1">
                <span className="font-bold text-[#173251] text-[10px]">
                  Parameter yang Dipantau
                </span>
                <div className="flex flex-col gap-[5px] text-[9px]">
                  <div className="flex gap-[7px] items-center text-[#173251]">
                    <Droplets className="size-[13px] text-[#00629b]" />
                    <span>Oksigen terlarut (DO)</span>
                  </div>
                  <div className="flex gap-[7px] items-center text-[#173251]">
                    <Thermometer className="size-[13px] text-[#f69b23]" />
                    <span>Suhu air</span>
                  </div>
                  <div className="flex gap-[7px] items-center text-[#173251]">
                    <FlaskConical className="size-[13px] text-[#14b97c]" />
                    <span>pH</span>
                  </div>
                  <div className="flex gap-[7px] items-center text-[#173251]">
                    <Waves className="size-[13px] text-[#1688f8]" />
                    <span>Kekeruhan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="border border-[#e7eff4] flex flex-col gap-[8px] p-[10px] rounded-[6px] w-full mt-auto">
            <span className="font-bold text-[#173251] text-[11px]">Aksi</span>
            <div className="flex gap-[10px] items-center w-full">
              <button
                onClick={() => setReportModalOpen(true)}
                className="bg-white border border-[#a9c9db] flex gap-[6px] h-[32px] items-center justify-center px-[14px] rounded-[6px] text-[#00629b] font-bold text-[10px] hover:bg-[#e2f3fc] transition cursor-pointer"
              >
                <AlertTriangle className="size-[14px] text-[#00629b]" />
                <span>Laporkan Masalah</span>
              </button>
              <button
                onClick={() => setReportModalOpen(true)}
                className="bg-[#00629b] border border-[#00629b] flex gap-[6px] h-[32px] items-center justify-center px-[14px] rounded-[6px] text-white font-bold text-[10px] hover:bg-[#004f7c] transition cursor-pointer"
              >
                <MessageCircle className="size-[14px] text-white" />
                <span>Hubungi Fiscycle</span>
              </button>
            </div>
            <p className="text-[#8192a5] text-[8px]">
              Kirim laporan gangguan ke tim Fiscycle · Konsultasi langsung via WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Support / Issue Reporting Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[12px] p-6 max-w-md w-full shadow-xl border border-[#e7eff4] flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[#e7eff4] pb-3">
              <h3 className="font-bold text-[#173251] text-[15px]">
                Laporkan Masalah: {selectedDevice.name}
              </h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="text-[11px] text-[#425974] leading-relaxed">
              Tim teknisi Fiscycle siap membantu penanganan perangkat di lokasi tambak Anda. Tiket penanganan akan diteruskan ke teknisi lapangan terdekat.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold text-[#173251]">Deskripsi Gangguan</label>
              <textarea
                placeholder="Contoh: Sensor tidak mengirimkan data sejak 48 menit lalu, lampu indikator merah..."
                rows={3}
                className="w-full text-[10px] p-2.5 rounded-[6px] border border-[#d2e2ec] outline-none focus:border-[#00629b]"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 text-[10px] font-semibold text-[#8192a5] rounded-[6px] hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Laporan berhasil dikirim ke tim teknisi Fiscycle!');
                  setReportModalOpen(false);
                }}
                className="px-4 py-2 text-[10px] font-bold bg-[#00629b] text-white rounded-[6px] hover:bg-[#004f7c]"
              >
                Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
