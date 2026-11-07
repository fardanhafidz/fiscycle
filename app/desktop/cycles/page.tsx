'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const imgSearch = '/images/admin-search.svg';
const imgBell = '/images/desktop-bell.svg';
const imgChevronDown = '/images/desktop-chevron-down.svg';
const imgChevronDownBlue = '/images/desktop-chevron-down-blue.svg';
const imgPlus = '/images/desktop-plus.svg';
const imgSearch1 = '/images/desktop-search-alt.svg';
const imgArrowUpRight = '/images/desktop-arrow-up-right.svg';
const imgFishPond1 = '/images/desktop-fish-pond1.png';
const imgTriangleAlert = '/images/desktop-triangle-alert.svg';
const imgArrowRightBlue = '/images/desktop-arrow-right-blue.svg';

interface CycleCard {
  id: string;
  name: string;
  species: string;
  age: string;
  targetDate: string;
  status: string;
  statusType: 'baik' | 'perhatian' | 'kritis' | 'persiapan' | 'tebar' | 'siap-panen';
  pondLink?: string;
}

export default function DesktopCyclesPage() {
  const [activeTab, setActiveTab] = useState<'aktif' | 'riwayat'>('aktif');
  const [selectedFarm, setSelectedFarm] = useState('Tambak Makmur');
  const [selectedSpecies, setSelectedSpecies] = useState('Semua Jenis Ikan');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const persiapanPonds: CycleCard[] = [
    {
      id: 'kolam-7',
      name: 'Kolam 7',
      species: 'Nila',
      age: 'Hari ke--3',
      targetDate: '15 Nov 2024',
      status: 'Persiapan',
      statusType: 'persiapan',
      pondLink: '/desktop/ponds/kolam-7',
    },
  ];

  const tebarPonds: CycleCard[] = [
    {
      id: 'kolam-6',
      name: 'Kolam 6',
      species: 'Nila',
      age: 'Hari ke-7',
      targetDate: '19 Nov 2024',
      status: 'Tebar',
      statusType: 'tebar',
      pondLink: '/desktop/ponds/kolam-6',
    },
  ];

  const pertumbuhanPonds: CycleCard[] = [
    {
      id: 'kolam-1',
      name: 'Kolam 1',
      species: 'Nila',
      age: 'Hari ke-35',
      targetDate: '10 Nov 2024',
      status: 'Baik',
      statusType: 'baik',
      pondLink: '/desktop/ponds/kolam-1',
    },
    {
      id: 'kolam-2',
      name: 'Kolam 2',
      species: 'Nila',
      age: 'Hari ke-42',
      targetDate: '12 Nov 2024',
      status: 'Kritis',
      statusType: 'kritis',
      pondLink: '/desktop/ponds/kolam-2',
    },
    {
      id: 'kolam-3',
      name: 'Kolam 3',
      species: 'Nila',
      age: 'Hari ke-38',
      targetDate: '15 Nov 2024',
      status: 'Perlu Perhatian',
      statusType: 'perhatian',
      pondLink: '/desktop/ponds/kolam-3',
    },
    {
      id: 'kolam-5',
      name: 'Kolam 5',
      species: 'Nila',
      age: 'Hari ke-40',
      targetDate: '18 Nov 2024',
      status: 'Perlu Perhatian',
      statusType: 'perhatian',
      pondLink: '/desktop/ponds/kolam-5',
    },
  ];

  const menjelangPanenPonds: CycleCard[] = [
    {
      id: 'kolam-4',
      name: 'Kolam 4',
      species: 'Nila',
      age: 'Hari ke-68',
      targetDate: '25 Okt 2024',
      status: 'Perlu Perhatian',
      statusType: 'perhatian',
      pondLink: '/desktop/ponds/kolam-4',
    },
    {
      id: 'kolam-9',
      name: 'Kolam 9',
      species: 'Nila',
      age: 'Hari ke-65',
      targetDate: '28 Okt 2024',
      status: 'Baik',
      statusType: 'baik',
      pondLink: '/desktop/ponds/kolam-9',
    },
    {
      id: 'kolam-10',
      name: 'Kolam 10',
      species: 'Nila',
      age: 'Hari ke-62',
      targetDate: '30 Okt 2024',
      status: 'Baik',
      statusType: 'baik',
      pondLink: '/desktop/ponds/kolam-10',
    },
  ];

  const siapPanenPonds: CycleCard[] = [
    {
      id: 'kolam-8',
      name: 'Kolam 8',
      species: 'Nila',
      age: 'Hari ke-85',
      targetDate: '25 Okt 2024',
      status: 'Siap Panen',
      statusType: 'siap-panen',
      pondLink: '/desktop/ponds/kolam-8',
    },
    {
      id: 'kolam-11',
      name: 'Kolam 11',
      species: 'Nila',
      age: 'Hari ke-82',
      targetDate: '26 Okt 2024',
      status: 'Siap Panen',
      statusType: 'siap-panen',
      pondLink: '/desktop/ponds/kolam-11',
    },
    {
      id: 'kolam-12',
      name: 'Kolam 12',
      species: 'Nila',
      age: 'Hari ke-80',
      targetDate: '28 Okt 2024',
      status: 'Siap Panen',
      statusType: 'siap-panen',
      pondLink: '/desktop/ponds/kolam-12',
    },
  ];

  const renderBadge = (status: string, type: CycleCard['statusType']) => {
    switch (type) {
      case 'kritis':
        return (
          <div className="bg-[#fdebea] flex items-center gap-1 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f34860]" />
            <span className="font-semibold text-[10px] text-[#f34860]">{status}</span>
          </div>
        );
      case 'perhatian':
        return (
          <div className="bg-[#fff3df] flex items-center gap-1 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f69b23]" />
            <span className="font-semibold text-[10px] text-[#f69b23]">{status}</span>
          </div>
        );
      case 'baik':
      case 'siap-panen':
        return (
          <div className="bg-[#e5f8ef] flex items-center gap-1 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14b97c]" />
            <span className="font-semibold text-[10px] text-[#14b97c]">{status}</span>
          </div>
        );
      case 'persiapan':
      case 'tebar':
      default:
        return (
          <div className="bg-[#e2f3fc] flex items-center gap-1 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00629b]" />
            <span className="font-semibold text-[10px] text-[#00629b]">{status}</span>
          </div>
        );
    }
  };

  const renderCard = (card: CycleCard) => (
    <Link
      key={card.id}
      href={card.pondLink || `/desktop/ponds/${card.id}`}
      className="bg-white rounded-[6px] p-2 flex flex-col gap-1.5 shadow-sm border border-[#e7eff4] hover:border-[#00629b] transition-all group"
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-[12px] text-[#173251] group-hover:text-[#00629b] transition-colors">
          {card.name}
        </span>
        <Image
          src={imgArrowUpRight}
          alt="Buka"
          width={12}
          height={12}
          className="opacity-40 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex-1 flex flex-col leading-tight text-[10px]">
          <span className="text-[#8192a5]">{card.species}</span>
          <span className="text-[#173251] font-medium">{card.age}</span>
        </div>
        <div className="relative w-[50px] h-[28px] rounded-[6px] overflow-hidden shrink-0">
          <Image
            src={imgFishPond1}
            alt={card.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-0.5">
        <div className="flex flex-col leading-tight">
          <span className="text-[8px] text-[#8192a5]">Target Panen</span>
          <span className="text-[9px] font-semibold text-[#173251]">{card.targetDate}</span>
        </div>
        {renderBadge(card.status, card.statusType)}
      </div>
    </Link>
  );

  return (
    <div className="p-6 flex flex-col gap-3.5 text-[#173251] max-w-[1224px]">
      {/* Top Bar: Search and Account Controls */}
      <div className="flex h-9 items-center justify-between w-full">
        <div className="flex items-center gap-2 h-8 px-3 rounded-md border border-[#e7eff4] bg-white w-[440px]">
          <Image src={imgSearch} alt="Cari" width={14} height={14} className="opacity-60" />
          <input
            type="text"
            placeholder="Cari kolam, tambak, atau aktivitas..."
            className="w-full text-[11px] bg-transparent outline-none placeholder:text-[#8192a5]"
          />
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            type="button"
            className="relative p-1 hover:bg-[#e2f3fc] rounded-full transition-colors"
            title="Notifikasi"
          >
            <Image src={imgBell} alt="Notifikasi" width={22} height={22} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f34860]" />
          </button>

          <div className="w-px h-6 bg-[#e7eff4]" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00629b] flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px] text-[#173251]">Budi Santoso</span>
              <span className="text-[9px] text-[#8192a5]">Mitra Tambak Makmur</span>
            </div>
            <Image src={imgChevronDown} alt="Menu" width={13} height={13} className="opacity-60 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <p className="text-[10px] text-[#8192a5]">
        Kolam &amp; Ikan &nbsp;›&nbsp; Siklus Budidaya
      </p>

      {/* Page Heading & Actions */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[25px] font-bold text-[#173251] leading-tight">
            Siklus Budidaya
          </h1>
          <p className="text-[12px] text-[#8192a5]">
            Pantau perkembangan setiap kolam berdasarkan fase budidaya.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Dropdown farm select */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSelectedFarm(selectedFarm === 'Tambak Makmur' ? 'Tambak Berkah' : 'Tambak Makmur')}
              className="flex items-center gap-2 h-[34px] px-3.5 rounded-md border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[11px] hover:bg-[#e2f3fc] transition-colors"
            >
              <Image src={imgChevronDownBlue} alt="Pilih" width={14} height={14} />
              <span>{selectedFarm}</span>
            </button>
          </div>

          {/* Tambah Siklus Button */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 h-[34px] px-3.5 rounded-md bg-[#00629b] border border-[#00629b] text-white font-bold text-[11px] hover:bg-[#004e7c] transition-colors shadow-sm"
          >
            <Image src={imgPlus} alt="Tambah" width={14} height={14} />
            <span>Tambah Siklus</span>
          </button>
        </div>
      </div>

      {/* Cycle Filters Bar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('aktif')}
            className={`h-[34px] px-3.5 rounded-md font-bold text-[11px] transition-colors ${
              activeTab === 'aktif'
                ? 'bg-[#00629b] text-white border border-[#00629b]'
                : 'bg-white text-[#00629b] border border-[#a9c9db] hover:bg-[#e2f3fc]'
            }`}
          >
            Siklus Aktif (12)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('riwayat')}
            className={`h-[34px] px-3.5 rounded-md font-bold text-[11px] transition-colors ${
              activeTab === 'riwayat'
                ? 'bg-[#00629b] text-white border border-[#00629b]'
                : 'bg-white text-[#00629b] border border-[#a9c9db] hover:bg-[#e2f3fc]'
            }`}
          >
            Riwayat Siklus
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Dropdown filter */}
          <button
            type="button"
            onClick={() => setSelectedSpecies(selectedSpecies === 'Semua Jenis Ikan' ? 'Nila Merah' : 'Semua Jenis Ikan')}
            className="flex items-center gap-2 h-[34px] px-3.5 rounded-md border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[11px] hover:bg-[#e2f3fc] transition-colors"
          >
            <Image src={imgChevronDownBlue} alt="Filter" width={14} height={14} />
            <span>{selectedSpecies}</span>
          </button>

          {/* Search box */}
          <div className="flex items-center gap-2 h-[34px] px-3 rounded-md border border-[#a9c9db] bg-white">
            <Image src={imgSearch1} alt="Cari" width={14} height={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kolam..."
              className="text-[11px] font-bold text-[#00629b] placeholder:text-[#00629b] outline-none bg-transparent w-24"
            />
          </div>
        </div>
      </div>

      {/* Cultivation Board: 5 Columns Kanban (height ~500px) */}
      <div className="grid grid-cols-5 gap-2.5 min-h-[500px] w-full">
        {/* Column 1: Persiapan */}
        <div className="bg-[#e2f3fc] rounded-[10px] p-2.5 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00629b]" />
              <span className="font-bold text-[12px] text-[#173251]">Persiapan</span>
            </div>
            <span className="text-[10px] text-[#8192a5]">1 kolam</span>
          </div>
          <div className="flex flex-col gap-2">
            {persiapanPonds.map(renderCard)}
          </div>
        </div>

        {/* Column 2: Tebar */}
        <div className="bg-[#e2f3fc] rounded-[10px] p-2.5 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1688f8]" />
              <span className="font-bold text-[12px] text-[#173251]">Tebar</span>
            </div>
            <span className="text-[10px] text-[#8192a5]">1 kolam</span>
          </div>
          <div className="flex flex-col gap-2">
            {tebarPonds.map(renderCard)}
          </div>
        </div>

        {/* Column 3: Pertumbuhan */}
        <div className="bg-[#e5f8ef] rounded-[10px] p-2.5 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14b97c]" />
              <span className="font-bold text-[12px] text-[#173251]">Pertumbuhan</span>
            </div>
            <span className="text-[10px] text-[#8192a5]">4 kolam</span>
          </div>
          <div className="flex flex-col gap-2">
            {pertumbuhanPonds.map(renderCard)}
          </div>
        </div>

        {/* Column 4: Menjelang Panen */}
        <div className="bg-[#fff3df] rounded-[10px] p-2.5 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f69b23]" />
              <span className="font-bold text-[12px] text-[#173251]">Menjelang Panen</span>
            </div>
            <span className="text-[10px] text-[#8192a5]">3 kolam</span>
          </div>
          <div className="flex flex-col gap-2">
            {menjelangPanenPonds.map(renderCard)}
          </div>
        </div>

        {/* Column 5: Siap Panen */}
        <div className="bg-[#e5f8ef] rounded-[10px] p-2.5 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14b97c]" />
              <span className="font-bold text-[12px] text-[#173251]">Siap Panen</span>
            </div>
            <span className="text-[10px] text-[#8192a5]">3 kolam</span>
          </div>
          <div className="flex flex-col gap-2">
            {siapPanenPonds.map(renderCard)}
          </div>
        </div>
      </div>

      {/* Cycle Guidance Bottom Row */}
      <div className="grid grid-cols-12 gap-3.5 w-full">
        {/* Ringkasan Siklus (col-span-4 / 340px) */}
        <div className="col-span-4 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <span className="font-bold text-[15px] text-[#173251] block mb-2">
            Ringkasan Siklus
          </span>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Kolam dalam siklus aktif</span>
              <span className="font-semibold text-[#173251]">12 kolam</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Biomassa aktif (estimasi)</span>
              <span className="font-semibold text-[#173251]">8,5 ton</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8192a5]">Kolam siap panen</span>
              <span className="font-semibold text-[#173251]">3 kolam</span>
            </div>
          </div>
        </div>

        {/* Perlu Perhatian (col-span-4 / 420px) */}
        <div className="col-span-4 bg-[#fff3df] rounded-[10px] p-4 flex flex-col justify-between border border-[#fed7d7]">
          <span className="font-bold text-[15px] text-[#173251] block mb-1">
            Perlu Perhatian
          </span>
          <div className="flex items-start gap-2.5">
            <Image src={imgTriangleAlert} alt="Perhatian" width={18} height={18} className="shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 leading-snug">
              <span className="font-bold text-[12px] text-[#173251]">
                Tinjau kondisi Kolam 2, 3, 4, dan 5
              </span>
              <p className="text-[11px] text-[#173251]">
                DO rendah pada Kolam 2 dan suhu tinggi pada Kolam 5 perlu ditangani sebelum melanjutkan pakan.
              </p>
              <Link href="/desktop/ponds/kolam-2" className="text-[10px] font-semibold text-[#00629b] hover:underline">
                Lihat kondisi kolam →
              </Link>
            </div>
          </div>
        </div>

        {/* Target Panen Setiap Kolam (col-span-4) */}
        <div className="col-span-4 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <span className="font-bold text-[15px] text-[#173251] block mb-1">
            Target Panen Setiap Kolam
          </span>
          <p className="text-[11px] text-[#8192a5] leading-snug mb-2">
            Estimasi diperbarui mengikuti pertumbuhan ikan dan kondisi air. Pastikan sampling dicatat secara berkala.
          </p>
          <Link
            href="/desktop/feed"
            className="flex items-center justify-center gap-2 h-[34px] px-3.5 rounded-md border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[11px] hover:bg-[#e2f3fc] transition-colors"
          >
            <Image src={imgArrowRightBlue} alt="Buka" width={14} height={14} />
            <span>Lihat Pakan &amp; Pertumbuhan</span>
          </Link>
        </div>
      </div>

      {/* Modal Tambah Siklus */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 border border-[#e7eff4]">
            <div className="flex items-center justify-between border-b border-[#e7eff4] pb-3">
              <h3 className="font-bold text-[16px] text-[#173251]">Mulai Siklus Budidaya Baru</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#8192a5] hover:text-[#173251] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-[#173251] mb-1">Pilih Kolam</label>
                <select className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251] bg-[#f8fbfe]">
                  <option>Kolam 7 (Siap Persiapan)</option>
                  <option>Kolam 13 (Baru)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#173251] mb-1">Komoditas Ikan</label>
                <input
                  type="text"
                  defaultValue="Nila Hitam Super"
                  className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#173251] mb-1">Jumlah Benih (Ekor)</label>
                  <input
                    type="number"
                    defaultValue="5000"
                    className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173251] mb-1">Target Panen (Hari)</label>
                  <input
                    type="number"
                    defaultValue="90"
                    className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t border-[#e7eff4]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-md border border-[#a9c9db] text-[#00629b] font-bold text-[12px]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Siklus budidaya berhasil didaftarkan ke IoT Gateway!');
                  setShowAddModal(false);
                }}
                className="px-4 py-2 rounded-md bg-[#00629b] text-white font-bold text-[12px] hover:bg-[#004e7c]"
              >
                Simpan &amp; Aktifkan Sensor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
