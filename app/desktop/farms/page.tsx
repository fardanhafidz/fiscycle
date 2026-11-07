'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const imgFishPond = '/images/desktop-fish-pond.png';
const imgFishPond1 = '/images/desktop-fish-pond1.png';
const imgSearch = '/images/admin-search.svg';
const imgBell = '/images/desktop-bell.svg';
const imgChevronDown = '/images/desktop-chevron-down.svg';
const imgPencil = '/images/desktop-pencil.svg';
const imgPlus = '/images/desktop-plus.svg';
const imgSearch1 = '/images/desktop-search-alt.svg';
const imgListFilter = '/images/desktop-list-filter.svg';
const imgEllipsisVertical = '/images/desktop-ellipsis-vertical.svg';
const imgRadioTower = '/images/desktop-radio-tower.svg';

interface PondCardData {
  id: string;
  name: string;
  statusText: string;
  statusType: 'baik' | 'perhatian' | 'kritis';
  speciesAge: string;
  ph: string;
  temp: string;
  tempCritical?: boolean;
  doValue: string;
  doCritical?: boolean;
  updateTime: string;
}

const INITIAL_PONDS: PondCardData[] = [
  {
    id: 'kolam-1',
    name: 'Kolam 1',
    statusText: 'Baik',
    statusType: 'baik',
    speciesAge: 'Nila · Hari ke-35',
    ph: '7,4',
    temp: '28,1°C',
    doValue: '6,2 mg/L',
    updateTime: 'Update 2 jam lalu',
  },
  {
    id: 'kolam-2',
    name: 'Kolam 2',
    statusText: 'Kritis',
    statusType: 'kritis',
    speciesAge: 'Nila · Hari ke-42',
    ph: '7,2',
    temp: '31,5°C',
    tempCritical: true,
    doValue: '2,8 mg/L',
    doCritical: true,
    updateTime: 'Update 2 menit lalu',
  },
  {
    id: 'kolam-3',
    name: 'Kolam 3',
    statusText: 'Perlu Perhatian',
    statusType: 'perhatian',
    speciesAge: 'Nila · Hari ke-38',
    ph: '7,6',
    temp: '28,9°C',
    doValue: '4,1 mg/L',
    updateTime: 'Update 3 jam lalu',
  },
  {
    id: 'kolam-4',
    name: 'Kolam 4',
    statusText: 'Perlu Perhatian',
    statusType: 'perhatian',
    speciesAge: 'Nila · Hari ke-68',
    ph: '7,2',
    temp: '28,4°C',
    doValue: '5,8 mg/L',
    updateTime: 'Update 1 jam lalu',
  },
  {
    id: 'kolam-5',
    name: 'Kolam 5',
    statusText: 'Perlu Perhatian',
    statusType: 'perhatian',
    speciesAge: 'Nila · Hari ke-40',
    ph: '7,3',
    temp: '32,1°C',
    tempCritical: true,
    doValue: '5,6 mg/L',
    updateTime: 'Update 18 menit lalu',
  },
  {
    id: 'kolam-6',
    name: 'Kolam 6',
    statusText: 'Baik',
    statusType: 'baik',
    speciesAge: 'Nila · Hari ke-7',
    ph: '7,4',
    temp: '28,2°C',
    doValue: '6,0 mg/L',
    updateTime: 'Update 2 jam lalu',
  },
  {
    id: 'kolam-7',
    name: 'Kolam 7',
    statusText: 'Baik',
    statusType: 'baik',
    speciesAge: 'Nila · Hari ke-3',
    ph: '7,2',
    temp: '28,0°C',
    doValue: '6,1 mg/L',
    updateTime: 'Update 2 jam lalu',
  },
  {
    id: 'kolam-8',
    name: 'Kolam 8',
    statusText: 'Baik',
    statusType: 'baik',
    speciesAge: 'Nila · Hari ke-85',
    ph: '7,3',
    temp: '28,4°C',
    doValue: '6,2 mg/L',
    updateTime: 'Update 1 jam lalu',
  },
];

export default function FiscycleTambakKolam() {
  const [activeFilter, setActiveFilter] = useState<'semua' | 'baik' | 'perhatian' | 'kritis'>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPonds = INITIAL_PONDS.filter((pond) => {
    if (activeFilter !== 'semua' && pond.statusType !== activeFilter) return false;
    if (searchQuery.trim() && !pond.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div
      className="bg-[#f3f9fc] content-stretch flex flex-col gap-[14px] items-start overflow-x-hidden p-[24px] relative w-full select-none"
      data-node-id="65:17873"
      data-name="Fiscycle · Tambak & Kolam"
    >
      {/* Search and account header */}
      <div
        className="content-stretch flex h-[34px] items-center justify-between overflow-clip relative shrink-0 w-full"
        data-node-id="65:17950"
        data-name="Search and account"
      >
        <div
          className="border border-[#e7eff4] bg-white border-solid content-stretch flex gap-[8px] h-[32px] items-center overflow-clip px-[10px] relative rounded-[6px] shrink-0 w-[440px]"
          data-node-id="65:17951"
          data-name="Search"
        >
          <div className="relative shrink-0 size-[14px]">
            <Image alt="" src={imgSearch} width={14} height={14} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kolam, tambak, atau aktivitas..."
            className="flex-1 bg-transparent border-none outline-none font-normal leading-[1.4] text-[#173251] placeholder:text-[#8192a5] text-[10px]"
          />
        </div>

        <div
          className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0"
          data-node-id="65:17954"
          data-name="Account controls"
        >
          <div className="relative shrink-0 size-[22px] cursor-pointer" onClick={() => alert('Notifikasi Tambak Makmur')}>
            <Image alt="" src={imgBell} width={22} height={22} />
            <div className="absolute bg-[#f34860] right-0 rounded-full size-[7px] top-0" />
          </div>
          <div className="bg-[#e7eff4] h-[24px] relative shrink-0 w-px" />
          <div className="bg-[#00629b] content-stretch flex items-center justify-center overflow-clip relative rounded-full shrink-0 size-[32px]">
            <p className="font-bold leading-[1.4] text-[12px] text-white">B</p>
          </div>
          <div className="flex flex-col items-start leading-[1.4] whitespace-nowrap">
            <p className="font-bold relative shrink-0 text-[#173251] text-[11px]">Budi Santoso</p>
            <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]">Mitra Tambak Makmur</p>
          </div>
          <div className="relative shrink-0 size-[13px]">
            <Image alt="" src={imgChevronDown} width={13} height={13} />
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <p className="font-normal leading-[1.4] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-pre">
        {`Kolam & Ikan  ›  Tambak & Kolam`}
      </p>

      {/* Page heading */}
      <div
        className="content-stretch flex h-[58px] items-center justify-between overflow-clip relative shrink-0 w-full"
        data-node-id="65:17965"
        data-name="Page heading"
      >
        <div className="flex flex-col gap-[3px] items-start leading-[1.4] whitespace-nowrap">
          <h1 className="font-bold relative shrink-0 text-[#173251] text-[25px]">
            Tambak & Kolam
          </h1>
          <p className="font-normal relative shrink-0 text-[#8192a5] text-[12px]">
            Kelola lokasi tambak dan pantau kondisi kolam.
          </p>
        </div>

        <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0">
          <button
            type="button"
            onClick={() => alert('Modal edit data Tambak Makmur')}
            className="bg-white border border-[#a9c9db] border-solid content-stretch flex gap-[7px] h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0 cursor-pointer hover:bg-sky-50 transition"
          >
            <div className="relative shrink-0 size-[14px]">
              <Image alt="" src={imgPencil} width={14} height={14} />
            </div>
            <p className="font-bold leading-[1.4] text-[#00629b] text-[11px] whitespace-nowrap">
              Edit Tambak
            </p>
          </button>
          <button
            type="button"
            onClick={() => alert('Modal tambah kolam baru')}
            className="bg-[#00629b] border border-[#00629b] border-solid content-stretch flex gap-[7px] h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0 cursor-pointer hover:bg-[#005282] transition"
          >
            <div className="relative shrink-0 size-[14px]">
              <Image alt="" src={imgPlus} width={14} height={14} />
            </div>
            <p className="font-bold leading-[1.4] text-[11px] text-white whitespace-nowrap">
              Tambah Kolam
            </p>
          </button>
        </div>
      </div>

      {/* Farm summary */}
      <div
        className="content-stretch flex gap-[14px] items-center overflow-clip relative shrink-0 w-full"
        data-node-id="65:17976"
        data-name="Farm summary"
      >
        {/* Farm identity */}
        <div
          className="bg-white content-stretch flex gap-[14px] items-center overflow-clip p-[14px] relative rounded-[10px] shrink-0 w-[380px] border border-[#e7eff4]"
          data-node-id="65:17977"
        >
          <div className="h-[68px] relative rounded-[6px] shrink-0 w-[104px] overflow-hidden">
            <Image alt="" src={imgFishPond} fill className="object-cover" sizes="104px" />
          </div>
          <div className="flex flex-col gap-[4px] items-start leading-[1.4] whitespace-nowrap">
            <p className="font-bold relative shrink-0 text-[#173251] text-[16px]">Tambak Makmur</p>
            <p className="font-normal relative shrink-0 text-[#8192a5] text-[11px]">⌖ Sidoarjo, Jawa Timur</p>
            <p className="font-normal relative shrink-0 text-[#8192a5] text-[10px]">ID Mitra: FSC-FARM-0028</p>
          </div>
        </div>

        {/* Farm metrics */}
        <div
          className="bg-white content-stretch flex flex-[1_0_0] gap-[10px] h-[96px] items-center leading-[1.4] min-w-px overflow-clip p-[12px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="65:17983"
        >
          <div className="bg-[#e2f3fc] flex flex-[1_0_0] flex-col gap-[2px] items-center justify-center min-w-px rounded-[6px] h-full py-1">
            <p className="font-bold text-[#00629b] text-[24px]">12</p>
            <p className="font-medium text-[#173251] text-[10px]">Total Kolam</p>
          </div>
          <div className="bg-[#e5f8ef] flex flex-[1_0_0] flex-col gap-[2px] items-center justify-center min-w-px rounded-[6px] h-full py-1">
            <p className="font-bold text-[#14b97c] text-[24px]">8</p>
            <p className="font-medium text-[#173251] text-[10px]">Baik</p>
          </div>
          <div className="bg-[#fff3df] flex flex-[1_0_0] flex-col gap-[2px] items-center justify-center min-w-px rounded-[6px] h-full py-1">
            <p className="font-bold text-[#f69b23] text-[24px]">3</p>
            <p className="font-medium text-[#173251] text-[10px]">Perlu Perhatian</p>
          </div>
          <div className="bg-[#fdebea] flex flex-[1_0_0] flex-col gap-[2px] items-center justify-center min-w-px rounded-[6px] h-full py-1">
            <p className="font-bold text-[#f34860] text-[24px]">1</p>
            <p className="font-medium text-[#173251] text-[10px]">Kritis</p>
          </div>
          <div className="bg-[#e5f8ef] flex flex-[1_0_0] flex-col gap-[2px] items-center justify-center min-w-px rounded-[6px] h-full py-1">
            <p className="font-bold text-[#14b97c] text-[24px]">10</p>
            <p className="font-medium text-[#173251] text-[10px]">Perangkat Online</p>
          </div>
        </div>
      </div>

      {/* Filters and sorting */}
      <div
        className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
        data-node-id="65:17999"
        data-name="Filters and sorting"
      >
        <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0">
          <button
            type="button"
            onClick={() => setActiveFilter('semua')}
            className={`content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition ${
              activeFilter === 'semua' ? 'bg-[#e2f3fc] ring-1 ring-[#00629b]' : 'bg-[#e2f3fc]/60'
            }`}
          >
            <div className="bg-[#00629b] relative rounded-full shrink-0 size-[5px]" />
            <p className="font-semibold leading-[1.4] text-[#00629b] text-[10px] whitespace-nowrap">
              Semua (12)
            </p>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('baik')}
            className={`content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition ${
              activeFilter === 'baik' ? 'bg-[#e5f8ef] ring-1 ring-[#14b97c]' : 'bg-[#e5f8ef]/60'
            }`}
          >
            <div className="bg-[#14b97c] relative rounded-full shrink-0 size-[5px]" />
            <p className="font-semibold leading-[1.4] text-[#14b97c] text-[10px] whitespace-nowrap">
              Baik (8)
            </p>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('perhatian')}
            className={`content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition ${
              activeFilter === 'perhatian' ? 'bg-[#fff3df] ring-1 ring-[#f69b23]' : 'bg-[#fff3df]/60'
            }`}
          >
            <div className="bg-[#f69b23] relative rounded-full shrink-0 size-[5px]" />
            <p className="font-semibold leading-[1.4] text-[#f69b23] text-[10px] whitespace-nowrap">
              Perlu Perhatian (3)
            </p>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('kritis')}
            className={`content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition ${
              activeFilter === 'kritis' ? 'bg-[#fdebea] ring-1 ring-[#f34860]' : 'bg-[#fdebea]/60'
            }`}
          >
            <div className="bg-[#f34860] relative rounded-full shrink-0 size-[5px]" />
            <p className="font-semibold leading-[1.4] text-[#f34860] text-[10px] whitespace-nowrap">
              Kritis (1)
            </p>
          </button>
          <div className="bg-[#f3f9fc] border border-[#e7eff4] content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[4px] relative rounded-[4px] shrink-0">
            <div className="bg-[#8192a5] relative rounded-full shrink-0 size-[5px]" />
            <p className="font-semibold leading-[1.4] text-[#8192a5] text-[10px] whitespace-nowrap">
              Offline (2)
            </p>
          </div>
        </div>

        <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0">
          <div className="bg-white border border-[#a9c9db] border-solid content-stretch flex gap-[7px] h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0">
            <div className="relative shrink-0 size-[14px]">
              <Image alt="" src={imgSearch1} width={14} height={14} />
            </div>
            <p className="font-bold leading-[1.4] text-[#00629b] text-[11px] whitespace-nowrap">
              Cari kolam...
            </p>
          </div>
          <div className="bg-white border border-[#a9c9db] border-solid content-stretch flex gap-[7px] h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0 cursor-pointer hover:bg-sky-50 transition">
            <div className="relative shrink-0 size-[14px]">
              <Image alt="" src={imgListFilter} width={14} height={14} />
            </div>
            <p className="font-bold leading-[1.4] text-[#00629b] text-[11px] whitespace-nowrap">
              Urutkan: Nama Kolam
            </p>
          </div>
        </div>
      </div>

      {/* Pond collection (Grid of Cards) */}
      <div
        className="content-stretch grid grid-cols-4 gap-[14px] items-start overflow-clip relative shrink-0 w-full"
        data-node-id="65:18023"
        data-name="Pond collection"
      >
        {filteredPonds.map((pond) => {
          const isKritis = pond.statusType === 'kritis';
          const isPerhatian = pond.statusType === 'perhatian';
          const badgeBg = isKritis ? 'bg-[#fdebea]' : isPerhatian ? 'bg-[#fff3df]' : 'bg-[#e5f8ef]';
          const badgeText = isKritis ? 'text-[#f34860]' : isPerhatian ? 'text-[#f69b23]' : 'text-[#14b97c]';
          const dotBg = isKritis ? 'bg-[#f34860]' : isPerhatian ? 'bg-[#f69b23]' : 'bg-[#14b97c]';

          return (
            <div
              key={pond.id}
              className="bg-white content-stretch flex flex-col gap-[10px] h-[212px] items-start min-w-px overflow-clip p-[14px] relative rounded-[10px] border border-[#e7eff4] hover:shadow-xs transition"
              data-node-id="65:18025"
              data-name="Pond card"
            >
              <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full">
                <div className="h-[52px] relative rounded-[6px] shrink-0 w-[55px] overflow-hidden">
                  <Image alt="" src={imgFishPond1} fill className="object-cover" sizes="55px" />
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative">
                  <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full">
                    <p className="font-bold leading-[1.4] text-[#173251] text-[14px] whitespace-nowrap">
                      {pond.name}
                    </p>
                    <div className="relative shrink-0 size-[13px] cursor-pointer" onClick={() => alert(`Aksi ${pond.name}`)}>
                      <Image alt="" src={imgEllipsisVertical} width={13} height={13} />
                    </div>
                  </div>
                  <div className={`${badgeBg} content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[3px] relative rounded-[4px] shrink-0`}>
                    <div className={`${dotBg} relative rounded-full shrink-0 size-[5px]`} />
                    <p className={`font-semibold leading-[1.4] ${badgeText} text-[10px] whitespace-nowrap`}>
                      {pond.statusText}
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-normal leading-[1.4] text-[#8192a5] text-[10px] whitespace-nowrap">
                {pond.speciesAge}
              </p>

              <div className="content-stretch flex flex-col gap-[6px] items-start leading-[1.4] text-[11px] w-full whitespace-nowrap">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                  <p className="font-normal text-[#8192a5]">pH</p>
                  <p className="font-semibold text-[#173251]">{pond.ph}</p>
                </div>
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                  <p className="font-normal text-[#8192a5]">Suhu</p>
                  <p className={`font-semibold ${pond.tempCritical ? 'text-[#f34860]' : 'text-[#173251]'}`}>
                    {pond.temp}
                  </p>
                </div>
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                  <p className="font-normal text-[#8192a5]">Oksigen (DO)</p>
                  <p className={`font-semibold ${pond.doCritical ? 'text-[#f34860]' : 'text-[#173251]'}`}>
                    {pond.doValue}
                  </p>
                </div>
              </div>

              <div className="content-stretch flex items-start justify-between leading-[1.4] relative shrink-0 w-full whitespace-nowrap pt-1">
                <p className="font-normal text-[#8192a5] text-[9px]">{pond.updateTime}</p>
                <Link
                  href={`/desktop/ponds/${pond.id}`}
                  className="font-semibold text-[#00629b] text-[10px] hover:underline"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* List pagination */}
      <div
        className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full mt-2"
        data-node-id="65:18218"
        data-name="List pagination"
      >
        <p className="font-normal leading-[1.4] text-[#8192a5] text-[10px] whitespace-nowrap">
          Menampilkan 1–{filteredPonds.length} dari 12 kolam
        </p>
        <div className="content-stretch flex gap-[7px] items-start overflow-clip relative shrink-0">
          <div className="bg-white border border-[#a9c9db] border-solid content-stretch flex h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0 cursor-pointer">
            <p className="font-bold leading-[1.4] text-[#00629b] text-[11px] whitespace-nowrap">
              Sebelumnya
            </p>
          </div>
          <div className="bg-[#00629b] border border-[#00629b] border-solid content-stretch flex h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0">
            <p className="font-bold leading-[1.4] text-[11px] text-white whitespace-nowrap">
              1
            </p>
          </div>
          <div className="bg-white border border-[#a9c9db] border-solid content-stretch flex h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0 cursor-pointer">
            <p className="font-bold leading-[1.4] text-[#00629b] text-[11px] whitespace-nowrap">
              2
            </p>
          </div>
          <div className="bg-white border border-[#a9c9db] border-solid content-stretch flex h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0 cursor-pointer">
            <p className="font-bold leading-[1.4] text-[#00629b] text-[11px] whitespace-nowrap">
              Berikutnya
            </p>
          </div>
        </div>
      </div>

      {/* Monitoring summary banner */}
      <div
        className="bg-[#e2f3fc] content-stretch flex gap-[12px] h-[57px] items-center overflow-clip p-[14px] relative rounded-[10px] shrink-0 w-full mt-2"
        data-node-id="65:18229"
        data-name="Monitoring summary"
      >
        <div className="relative shrink-0 size-[25px]">
          <Image alt="" src={imgRadioTower} width={25} height={25} />
        </div>
        <div className="flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[1.4] whitespace-nowrap">
          <p className="font-bold relative shrink-0 text-[#173251] text-[12px]">
            Pantauan kolam selalu terhubung
          </p>
          <p className="font-normal relative shrink-0 text-[#8192a5] text-[10px]">
            10 dari 12 perangkat online · 2 perangkat offline perlu diperiksa.
          </p>
        </div>
        <Link
          href="/desktop/devices"
          className="bg-white border border-[#a9c9db] border-solid content-stretch flex h-[34px] items-center justify-center overflow-clip px-[14px] relative rounded-[6px] shrink-0 hover:bg-sky-50 transition"
        >
          <p className="font-bold leading-[1.4] text-[#00629b] text-[11px] whitespace-nowrap">
            Kelola Perangkat
          </p>
        </Link>
      </div>
    </div>
  );
}
