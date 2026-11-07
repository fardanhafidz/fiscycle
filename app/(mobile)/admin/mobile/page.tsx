'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';

// Static asset constants from Figma Node 69:70442
const imgFishSymbol = '/images/admin-fish-symbol.svg';
const imgMenu = '/images/admin-menu.svg';
const imgNotifications = '/images/admin-notifications.svg';
const imgSearch = '/images/admin-search.svg';
const imgChartNoAxesCombined = '/images/admin-chart.svg';
const imgCircleAlert = '/images/admin-circle-alert.svg';
const imgTriangleAlert = '/images/admin-triangle-alert.svg';
const imgCircleCheck = '/images/admin-circle-check.svg';
const imgChartNoAxesCombined1 = '/images/admin-chart-purple.svg';
const imgStatusIndicator = '/images/admin-status-indicator.svg';
const imgStatusIndicator1 = '/images/admin-status-indicator1.svg';
const imgStatusIndicator2 = '/images/admin-status-indicator2.svg';
const imgStatusIndicator3 = '/images/admin-status-indicator3.svg';
const imgStatusIndicator4 = '/images/admin-status-indicator4.svg';
const imgSourceImagery = '/images/admin-source-imagery.png';
const imgLightbulb = '/images/admin-lightbulb.svg';
const imgCircleCheck1 = '/images/admin-circle-check-green.svg';
const imgHouse = '/images/admin-house.svg';
const imgUsers = '/images/admin-users.svg';
const imgListChecks = '/images/admin-list-checks.svg';
const imgMenu1 = '/images/admin-menu-bottom.svg';

interface MockLeadCard {
  id: string;
  name: string;
  farm: string;
  statusText: string;
  statusType: 'blue' | 'red' | 'orange' | 'green' | 'purple';
  location: string;
  partnershipType: string;
  pic: string;
  nextFollowUp: string;
}

const INITIAL_MOCK_LEADS: MockLeadCard[] = [
  {
    id: 'lead-1',
    name: 'Budi Santoso',
    farm: 'Tambak Maju Jaya',
    statusText: 'Baru Masuk',
    statusType: 'blue',
    location: 'Lamongan · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Andi',
    nextFollowUp: 'Hari ini, 10:00',
  },
  {
    id: 'lead-2',
    name: 'Agus Widodo',
    farm: 'Mina Makmur',
    statusText: 'Belum Dihubungi',
    statusType: 'red',
    location: 'Gresik · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Sinta',
    nextFollowUp: '6 Mei 2025',
  },
  {
    id: 'lead-3',
    name: 'Ahmad Fauzi',
    farm: 'Tambak Berkah',
    statusText: 'Call Terjadwal',
    statusType: 'orange',
    location: 'Sidoarjo · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Rudy',
    nextFollowUp: 'Hari ini, 13:00',
  },
  {
    id: 'lead-4',
    name: 'Dedi Saputra',
    farm: 'Mina Sejahtera',
    statusText: 'Qualified',
    statusType: 'green',
    location: 'Probolinggo · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Andi',
    nextFollowUp: 'Hari ini, 15:00',
  },
  {
    id: 'lead-5',
    name: 'Rudi Hartono',
    farm: 'Tambak Rejeki',
    statusText: 'Assessment',
    statusType: 'blue',
    location: 'Blitar · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Dian',
    nextFollowUp: '25 Apr 2025',
  },
  {
    id: 'lead-6',
    name: 'Hendra Wijaya',
    farm: 'Mina Lestari',
    statusText: 'Penawaran',
    statusType: 'purple',
    location: 'Tulungagung · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Sinta',
    nextFollowUp: '24 Apr 2025',
  },
  {
    id: 'lead-7',
    name: 'Wawan Kurniawan',
    farm: 'Tambak Sentosa',
    statusText: 'Kontrak',
    statusType: 'blue',
    location: 'Malang · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Rudy',
    nextFollowUp: '23 Apr 2025',
  },
  {
    id: 'lead-8',
    name: 'Slamet Raharjo',
    farm: 'Mina Bahari',
    statusText: 'Onboarding',
    statusType: 'green',
    location: 'Pasuruan · Jawa Timur',
    partnershipType: 'Mitra Tambak',
    pic: 'Budi',
    nextFollowUp: '22 Apr 2025',
  },
];

const PIPELINE_TABS = [
  'Lead Baru',
  'Belum Dihubungi',
  'Call Terjadwal',
  'Sudah Dihubungi',
  'Qualified',
  'Assessment',
  'Penawaran',
  'Kontrak',
  'Onboarding',
  'Instalasi',
  'Mitra Aktif',
];

export default function FiscyclePhoneAdminInternal() {
  const { createLeadFromApplication } = useAdminStore();

  const [activePipelineTab, setActivePipelineTab] = useState<string>('Lead Baru');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddLeadModal, setShowAddLeadModal] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  // New Lead Form state
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newFarmName, setNewFarmName] = useState('');
  const [newCity, setNewCity] = useState('Lamongan');
  const [newPhone, setNewPhone] = useState('');

  // Selected lead for detail card
  const [selectedLead, setSelectedLead] = useState<MockLeadCard>(INITIAL_MOCK_LEADS[0]);
  const [detailTab, setDetailTab] = useState<'Informasi' | 'Aktivitas'>('Informasi');

  // Filtered leads
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return INITIAL_MOCK_LEADS;
    const q = searchQuery.toLowerCase();
    return INITIAL_MOCK_LEADS.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.farm.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOwnerName.trim() || !newFarmName.trim()) return;

    createLeadFromApplication({
      ownerName: newOwnerName,
      farmName: newFarmName,
      city: newCity,
      province: 'Jawa Timur',
      phone: newPhone || '0812-9988-7766',
      email: `${newOwnerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      areaM2: 2500,
      pondCount: 4,
      primarySpecies: 'Nila',
    });

    setShowAddLeadModal(false);
    setNewOwnerName('');
    setNewFarmName('');
    setNewPhone('');
    setShowSuccessToast(`Lead ${newOwnerName} berhasil ditambahkan!`);
    setTimeout(() => setShowSuccessToast(null), 3000);
  };

  const getStatusIndicatorIcon = (type: MockLeadCard['statusType']) => {
    switch (type) {
      case 'red':
        return imgStatusIndicator1;
      case 'orange':
        return imgStatusIndicator2;
      case 'green':
        return imgStatusIndicator3;
      case 'purple':
        return imgStatusIndicator4;
      case 'blue':
      default:
        return imgStatusIndicator;
    }
  };

  const getStatusBadgeStyle = (type: MockLeadCard['statusType']) => {
    switch (type) {
      case 'red':
        return { bg: 'bg-[#fdebea]', text: 'text-[#f34860]' };
      case 'orange':
        return { bg: 'bg-[#fff3df]', text: 'text-[#f69b23]' };
      case 'green':
        return { bg: 'bg-[#e5f8ef]', text: 'text-[#14b97c]' };
      case 'purple':
        return { bg: 'bg-[#f4ebff]', text: 'text-[#9857e8]' };
      case 'blue':
      default:
        return { bg: 'bg-[#e2f3fc]', text: 'text-[#00629b]' };
    }
  };

  return (
    <div
      className="bg-[#f3f9fc] content-stretch flex flex-col items-start overflow-clip relative w-full min-h-screen pb-16"
      data-node-id="69:70442"
      data-name="Fiscycle · Phone Admin Internal"
    >
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#14b97c] text-white px-4 py-2 rounded-md shadow-lg text-[12px] font-bold animate-in fade-in duration-200">
          {showSuccessToast}
        </div>
      )}

      {/* Brand bar */}
      <div
        className="bg-white content-stretch flex h-[46px] items-center justify-between overflow-clip px-[16px] relative shrink-0 w-full border-b border-[#e7eff4]"
        data-node-id="69:70449"
        data-name="Brand bar"
      >
        <div
          className="content-stretch flex gap-[5px] items-center overflow-clip relative shrink-0"
          data-node-id="69:70450"
          data-name="Fiscycle brand"
        >
          <div className="relative shrink-0 size-[34px]" data-node-id="69:70451" data-name="Fish symbol">
            <Image
              alt="Fish symbol"
              className="absolute block inset-0 max-w-none size-full"
              src={imgFishSymbol}
              width={34}
              height={34}
              priority
            />
          </div>
          <p
            className="font-bold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[21px] whitespace-nowrap tracking-tight"
            data-node-id="69:70455"
          >
            Fiscycle
          </p>
        </div>
        <div
          className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0"
          data-node-id="69:70456"
          data-name="Header actions"
        >
          <button
            type="button"
            aria-label="Menu"
            className="relative shrink-0 size-[20px] flex items-center justify-center cursor-pointer"
            data-node-id="69:75799"
            data-name="menu"
            onClick={() => alert('Menu navigasi admin')}
          >
            <Image
              alt="menu"
              className="absolute block inset-0 max-w-none size-full"
              src={imgMenu}
              width={20}
              height={20}
            />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="h-[27px] relative shrink-0 w-[24px] flex items-center justify-center cursor-pointer"
            data-node-id="69:70458"
            data-name="Notifications"
            onClick={() => alert('Pusat Notifikasi Admin Fiscycle')}
          >
            <Image
              alt="Notifications"
              className="absolute block inset-0 max-w-none size-full"
              src={imgNotifications}
              width={24}
              height={27}
            />
          </button>
        </div>
      </div>

      {/* Account context */}
      <div
        className="bg-white content-stretch flex items-center justify-between overflow-clip pb-[12px] pt-[6px] px-[16px] relative shrink-0 w-full border-b border-[#e7eff4]"
        data-node-id="69:70461"
        data-name="Account context"
      >
        <div
          className="content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap"
          data-node-id="69:70462"
          data-name="Account"
        >
          <p className="font-semibold relative shrink-0 text-[#173251] text-[11px]" data-node-id="69:70463">
            Admin Fiscycle ⌄
          </p>
          <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]" data-node-id="69:70464">
            Admin Internal
          </p>
        </div>
        <div
          className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
          data-node-id="69:70465"
          data-name="Avatar"
        >
          <p
            className="font-bold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[11px] whitespace-nowrap"
            data-node-id="69:70466"
          >
            A
          </p>
        </div>
      </div>

      {/* Mobile workspace */}
      <div
        className="content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[20px] pt-[16px] px-[12px] relative shrink-0 w-full"
        data-node-id="69:70467"
        data-name="Mobile workspace"
      >
        {/* Page heading */}
        <div
          className="content-stretch flex flex-col gap-[5px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-full"
          data-node-id="69:70468"
          data-name="Page heading"
        >
          <h1
            className="font-bold relative shrink-0 text-[#173251] text-[22px] w-full"
            data-node-id="69:70469"
          >
            Calon Mitra Tambak
          </h1>
          <p
            className="font-normal relative shrink-0 text-[#8192a5] text-[11px] w-full"
            data-node-id="69:70470"
          >
            Kelola semua calon mitra, pantau progres, dan pastikan tidak ada prospek yang terlewat.
          </p>
        </div>

        {/* Search */}
        <div
          className="bg-white border border-[#e7eff4] border-solid content-stretch flex gap-[8px] items-center min-h-[36px] overflow-clip p-[10px] relative rounded-[6px] shrink-0 w-full"
          data-node-id="69:70471"
          data-name="Search"
        >
          <div className="relative shrink-0 size-[16px]" data-node-id="69:75802" data-name="search">
            <Image
              alt="search"
              className="absolute block inset-0 max-w-none size-full"
              src={imgSearch}
              width={16}
              height={16}
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari calon mitra, tambak, atau aktivitas..."
            className="flex-[1_0_0] font-normal leading-[1.4] min-w-px not-italic relative text-[#173251] placeholder:text-[#8192a5] text-[10px] bg-transparent outline-none border-none p-0"
            data-node-id="69:70473"
          />
        </div>

        {/* Actions (+ Tambah Lead) */}
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          data-node-id="69:70474"
          data-name="Actions"
        >
          <button
            type="button"
            onClick={() => setShowAddLeadModal(true)}
            className="bg-[#00629b] border border-[#00629b] border-solid content-stretch flex items-center justify-center min-h-[36px] overflow-clip px-[10px] py-[8px] relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-[#005282] transition"
            data-node-id="69:70475"
            data-name="Action"
          >
            <p
              className="flex-[1_0_0] font-bold leading-[1.35] min-w-px not-italic relative text-[11px] text-center text-white"
              data-node-id="69:70476"
            >
              + Tambah Lead
            </p>
          </button>
        </div>

        {/* Lead pipeline section */}
        <div
          className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full border border-[#e7eff4]"
          data-node-id="69:70477"
          data-name="Lead pipeline"
        >
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70478"
            data-name="Section heading"
          >
            <p
              className="font-bold leading-[1.4] not-italic relative shrink-0 text-[#173251] text-[14px] w-full"
              data-node-id="69:70479"
            >
              Lead pipeline
            </p>
          </div>
          <div
            className="content-start flex flex-wrap gap-[6px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70480"
            data-name="Section navigation"
          >
            {PIPELINE_TABS.map((tab) => {
              const isActive = activePipelineTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActivePipelineTab(tab)}
                  className={`content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 border cursor-pointer transition ${
                    isActive
                      ? 'bg-[#e2f3fc] border-[#a9c9db]'
                      : 'bg-white border-[#e7eff4] hover:bg-slate-50'
                  }`}
                  data-name="Tab"
                >
                  <p
                    className={`leading-[normal] not-italic relative shrink-0 text-[10px] whitespace-nowrap ${
                      isActive ? 'font-bold text-[#00629b]' : 'font-normal text-[#8192a5]'
                    }`}
                  >
                    {tab}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary metrics */}
        <div
          className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full"
          data-node-id="69:70503"
          data-name="Summary metrics"
        >
          {/* Row 1 */}
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70504"
            data-name="Metric row"
          >
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70505"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70506"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75805"
                  data-name="chart-no-axes-combined"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgChartNoAxesCombined}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70508"
              >
                124
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70509"
              >
                Total Lead
              </p>
            </div>
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70510"
              data-name="Summary metric"
            >
              <div
                className="bg-[#fdebea] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70511"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75808"
                  data-name="circle-alert"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgCircleAlert}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70513"
              >
                18
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70514"
              >
                Belum Dihubungi
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70515"
            data-name="Metric row"
          >
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70516"
              data-name="Summary metric"
            >
              <div
                className="bg-[#fff3df] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70517"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75811"
                  data-name="triangle-alert"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgTriangleAlert}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70519"
              >
                12
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70520"
              >
                Follow Up Hari Ini
              </p>
            </div>
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70521"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70522"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75814"
                  data-name="chart-no-axes-combined"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgChartNoAxesCombined}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70524"
              >
                15
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70525"
              >
                Call Terjadwal
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70526"
            data-name="Metric row"
          >
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70527"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e5f8ef] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70528"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75817"
                  data-name="circle-check"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgCircleCheck}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70530"
              >
                20
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70531"
              >
                Qualified
              </p>
            </div>
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70532"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70533"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75820"
                  data-name="chart-no-axes-combined"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgChartNoAxesCombined}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70535"
              >
                9
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70536"
              >
                Assessment
              </p>
            </div>
          </div>

          {/* Row 4 */}
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70537"
            data-name="Metric row"
          >
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70538"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70539"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75823"
                  data-name="chart-no-axes-combined"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgChartNoAxesCombined}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70541"
              >
                14
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70542"
              >
                Penawaran
              </p>
            </div>
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70543"
              data-name="Summary metric"
            >
              <div
                className="bg-[#f4ebff] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70544"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75826"
                  data-name="chart-no-axes-combined"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgChartNoAxesCombined1}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70546"
              >
                10
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70547"
              >
                Kontrak
              </p>
            </div>
          </div>

          {/* Row 5 */}
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70548"
            data-name="Metric row"
          >
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70549"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e5f8ef] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70550"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75829"
                  data-name="circle-check"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgCircleCheck}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70552"
              >
                8
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70553"
              >
                Onboarding
              </p>
            </div>
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70554"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e5f8ef] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70555"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75832"
                  data-name="circle-check"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgCircleCheck}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70557"
              >
                6
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70558"
              >
                Instalasi
              </p>
            </div>
          </div>

          {/* Row 6 */}
          <div
            className="content-stretch flex items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70559"
            data-name="Metric row"
          >
            <div
              className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[12px] relative rounded-[8px] border border-[#e7eff4]"
              data-node-id="69:70560"
              data-name="Summary metric"
            >
              <div
                className="bg-[#e5f8ef] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[28px]"
                data-node-id="69:70561"
                data-name="Metric symbol"
              >
                <div
                  className="relative shrink-0 size-[17px]"
                  data-node-id="69:75835"
                  data-name="circle-check"
                >
                  <Image
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgCircleCheck}
                    width={17}
                    height={17}
                  />
                </div>
              </div>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[21px] w-[min-content]"
                data-node-id="69:70563"
              >
                17
              </p>
              <p
                className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                data-node-id="69:70564"
              >
                Mitra Aktif
              </p>
            </div>
          </div>
        </div>

        {/* Daftar Calon Mitra */}
        <div
          className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full border border-[#e7eff4]"
          data-node-id="69:70565"
          data-name="Daftar Calon Mitra"
        >
          <div
            className="content-stretch flex flex-row justify-between items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-full"
            data-node-id="69:70566"
            data-name="Section heading"
          >
            <p
              className="font-bold relative shrink-0 text-[#173251] text-[14px]"
              data-node-id="69:70567"
            >
              Daftar Calon Mitra
            </p>
            <button
              type="button"
              onClick={() => alert('Exporting data CSV/Excel...')}
              className="font-normal relative shrink-0 text-[#00629b] text-[10px] hover:underline cursor-pointer"
              data-node-id="69:70568"
            >
              Export ↓
            </button>
          </div>

          <div
            className="content-start flex flex-wrap gap-[6px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70569"
            data-name="Section navigation"
          >
            <div
              className="bg-[#e2f3fc] border border-[#a9c9db] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer"
              data-node-id="69:70570"
              data-name="Tab"
            >
              <p
                className="font-bold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[10px] whitespace-nowrap"
                data-node-id="69:70571"
              >
                Semua status ⌄
              </p>
            </div>
            <div
              className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer"
              data-node-id="69:70572"
              data-name="Tab"
            >
              <p
                className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap"
                data-node-id="69:70573"
              >
                Semua lokasi ⌄
              </p>
            </div>
            <div
              className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer"
              data-node-id="69:70574"
              data-name="Tab"
            >
              <p
                className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap"
                data-node-id="69:70575"
              >
                Semua PIC ⌄
              </p>
            </div>
          </div>

          <p
            className="font-normal leading-[1.4] not-italic relative shrink-0 text-[#8192a5] text-[10px] w-full"
            data-node-id="69:70576"
          >
            Cari nama, lokasi, atau nomor...
          </p>

          {/* Lead Cards List */}
          {filteredLeads.map((card) => {
            const badge = getStatusBadgeStyle(card.statusType);
            const icon = getStatusIndicatorIcon(card.statusType);
            const isSelected = selectedLead.id === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setSelectedLead(card)}
                className={`bg-white border border-solid content-stretch flex flex-col gap-[9px] items-start overflow-clip p-[10px] relative rounded-[7px] shrink-0 w-full cursor-pointer transition ${
                  isSelected ? 'border-[#00629b] ring-1 ring-[#00629b]/20 shadow-xs' : 'border-[#e7eff4] hover:border-slate-300'
                }`}
                data-name="Record card"
              >
                <div
                  className="content-stretch flex items-center overflow-clip relative shrink-0 w-full"
                  data-name="Record identity"
                >
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative"
                    data-name="Record information"
                  >
                    <p className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[12px] w-[min-content]">
                      {card.name}
                    </p>
                    <p className="font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#8192a5] text-[10px] w-[min-content]">
                      {card.farm}
                    </p>
                    <div
                      className={`${badge.bg} content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[4px] relative rounded-[4px] shrink-0`}
                      data-name="Status badge"
                    >
                      <div className="relative shrink-0 size-[4px]" data-name="Status indicator">
                        <Image
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={icon}
                          width={4}
                          height={4}
                        />
                      </div>
                      <p
                        className={`font-semibold leading-[normal] not-italic relative shrink-0 ${badge.text} text-[10px] whitespace-nowrap`}
                      >
                        {card.statusText}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="content-stretch flex flex-col gap-[9px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-[11px] w-full"
                  data-name="Details"
                >
                  <div
                    className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                    data-name="Information field"
                  >
                    <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">
                      Lokasi
                    </p>
                    <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                      {card.location}
                    </p>
                  </div>
                  <div
                    className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                    data-name="Information field"
                  >
                    <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">
                      Jenis Kemitraan
                    </p>
                    <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                      {card.partnershipType}
                    </p>
                  </div>
                  <div
                    className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                    data-name="Information field"
                  >
                    <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">
                      PIC
                    </p>
                    <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                      {card.pic}
                    </p>
                  </div>
                  <div
                    className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full"
                    data-name="Information field"
                  >
                    <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">
                      Follow Up Berikutnya
                    </p>
                    <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                      {card.nextFollowUp}
                    </p>
                  </div>
                </div>

                <div
                  className="bg-white border border-[#a9c9db] border-solid content-stretch flex items-center justify-center min-h-[36px] overflow-clip px-[10px] py-[8px] relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-sky-50 transition mt-1"
                  data-name="Action"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Aksi follow-up untuk ${card.name}: Telepon, WhatsApp, Jadwalkan.`);
                  }}
                >
                  <p className="flex-[1_0_0] font-bold leading-[1.35] min-w-px not-italic relative text-[#00629b] text-[11px] text-center">
                    Telepon · WhatsApp · Jadwalkan · •••
                  </p>
                </div>
              </div>
            );
          })}

          <p
            className="font-normal leading-[1.4] not-italic relative shrink-0 text-[#8192a5] text-[10px] w-full pt-1"
            data-node-id="69:70769"
          >
            Menampilkan 1–{filteredLeads.length} dari 124 calon mitra
          </p>

          {/* Pagination */}
          <div
            className="content-start flex flex-wrap gap-[6px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70770"
            data-name="Section navigation"
          >
            <div className="bg-[#e2f3fc] border border-[#a9c9db] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer">
              <p className="font-bold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[10px] whitespace-nowrap">
                ‹
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                1
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                2
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                3
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                …
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                16
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 cursor-pointer">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                ›
              </p>
            </div>
          </div>
        </div>

        {/* Detail Calon Mitra */}
        <div
          className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full border border-[#e7eff4]"
          data-node-id="69:70785"
          data-name="Detail Calon Mitra"
        >
          <div
            className="content-stretch flex justify-between items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-full"
            data-node-id="69:70786"
            data-name="Section heading"
          >
            <p
              className="font-bold relative shrink-0 text-[#173251] text-[14px]"
              data-node-id="69:70787"
            >
              Detail Calon Mitra
            </p>
            <button
              type="button"
              className="font-normal relative shrink-0 text-[#00629b] text-[10px] cursor-pointer"
              data-node-id="69:70788"
              onClick={() => alert(`Aksi lainnya untuk ${selectedLead.name}`)}
            >
              •••
            </button>
          </div>

          <div
            className="h-[130px] relative rounded-[6px] shrink-0 w-full overflow-hidden"
            data-node-id="69:70789"
            data-name="Source imagery"
          >
            <Image
              alt="Source imagery"
              className="absolute inset-0 object-cover pointer-events-none rounded-[6px] size-full"
              src={imgSourceImagery}
              fill
              sizes="(max-width: 480px) 100vw, 360px"
            />
          </div>

          <p
            className="font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#173251] text-[18px] w-[min-content]"
            data-node-id="69:70790"
          >
            {selectedLead.name}
          </p>
          <p
            className="font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#8192a5] text-[11px] w-[min-content] -mt-2"
            data-node-id="69:70791"
          >
            {selectedLead.farm}
          </p>

          <div
            className="bg-[#e2f3fc] content-stretch flex gap-[4px] items-center overflow-clip px-[7px] py-[4px] relative rounded-[4px] shrink-0"
            data-node-id="69:70792"
            data-name="Status badge"
          >
            <div className="relative shrink-0 size-[4px]" data-node-id="69:70793" data-name="Status indicator">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgStatusIndicator}
                width={4}
                height={4}
              />
            </div>
            <p
              className="font-semibold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[10px] whitespace-nowrap"
              data-node-id="69:70794"
            >
              {selectedLead.statusText}
            </p>
          </div>

          {/* Section navigation tabs (Informasi / Aktivitas) */}
          <div
            className="content-start flex flex-wrap gap-[6px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70795"
            data-name="Section navigation"
          >
            <button
              type="button"
              onClick={() => setDetailTab('Informasi')}
              className={`content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 border cursor-pointer transition ${
                detailTab === 'Informasi' ? 'bg-[#e2f3fc] border-[#a9c9db]' : 'bg-white border-[#e7eff4]'
              }`}
              data-name="Tab"
            >
              <p
                className={`leading-[normal] not-italic relative shrink-0 text-[10px] whitespace-nowrap ${
                  detailTab === 'Informasi' ? 'font-bold text-[#00629b]' : 'font-normal text-[#8192a5]'
                }`}
              >
                Informasi
              </p>
            </button>
            <button
              type="button"
              onClick={() => setDetailTab('Aktivitas')}
              className={`content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0 border cursor-pointer transition ${
                detailTab === 'Aktivitas' ? 'bg-[#e2f3fc] border-[#a9c9db]' : 'bg-white border-[#e7eff4]'
              }`}
              data-name="Tab"
            >
              <p
                className={`leading-[normal] not-italic relative shrink-0 text-[10px] whitespace-nowrap ${
                  detailTab === 'Aktivitas' ? 'font-bold text-[#00629b]' : 'font-normal text-[#8192a5]'
                }`}
              >
                Aktivitas
              </p>
            </button>
          </div>

          {/* Details list */}
          <div
            className="content-stretch flex flex-col gap-[9px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-[11px] w-full"
            data-node-id="69:70800"
            data-name="Details"
          >
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">Nama Pemilik</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                {selectedLead.name}
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">Kota/Kabupaten</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                {selectedLead.location.split('·')[0].trim()}
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">Provinsi</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                {selectedLead.location.includes('·') ? selectedLead.location.split('·')[1].trim() : 'Jawa Timur'}
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">No. WhatsApp</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                0812 3456 7890
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">Email</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                {selectedLead.name.toLowerCase().replace(/\s+/g, '')}@gmail.com
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">Luas Tambak</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                2.000 m²
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">Komoditas</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                Nila
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">PIC Internal</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                {selectedLead.pic}
              </p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <p className="flex-[1_0_0] font-normal min-w-px relative text-[#8192a5]">Asal Lead</p>
              <p className="flex-[1_0_0] font-semibold min-w-px relative text-[#173251] text-right">
                Hubungi Kami
              </p>
            </div>
          </div>

          {/* Contact actions */}
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70828"
            data-name="Contact actions"
          >
            <button
              type="button"
              onClick={() => alert(`Memanggil ${selectedLead.name} (0812 3456 7890)`)}
              className="bg-white border border-[#a9c9db] border-solid content-stretch flex flex-[1_0_0] items-center justify-center min-h-[36px] min-w-px overflow-clip px-[10px] py-[8px] relative rounded-[6px] cursor-pointer hover:bg-sky-50 transition"
              data-node-id="69:70829"
              data-name="Action"
            >
              <p className="flex-[1_0_0] font-bold leading-[1.35] min-w-px not-italic relative text-[#00629b] text-[11px] text-center">
                Telepon
              </p>
            </button>
            <button
              type="button"
              onClick={() => window.open(`https://wa.me/6281234567890`, '_blank')}
              className="bg-white border border-[#a9c9db] border-solid content-stretch flex flex-[1_0_0] items-center justify-center min-h-[36px] min-w-px overflow-clip px-[10px] py-[8px] relative rounded-[6px] cursor-pointer hover:bg-sky-50 transition"
              data-node-id="69:70831"
              data-name="Action"
            >
              <p className="flex-[1_0_0] font-bold leading-[1.35] min-w-px not-italic relative text-[#00629b] text-[11px] text-center">
                WhatsApp
              </p>
            </button>
          </div>

          <button
            type="button"
            onClick={() => alert(`Jadwal follow-up dicatat untuk ${selectedLead.name}`)}
            className="bg-[#00629b] border border-[#00629b] border-solid content-stretch flex items-center justify-center min-h-[36px] overflow-clip px-[10px] py-[8px] relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-[#005282] transition"
            data-node-id="69:70833"
            data-name="Action"
          >
            <p className="flex-[1_0_0] font-bold leading-[1.35] min-w-px not-italic relative text-[11px] text-center text-white">
              Jadwalkan Follow Up
            </p>
          </button>

          {/* Notice */}
          <div
            className="bg-[#e2f3fc] content-stretch flex gap-[9px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full"
            data-node-id="69:70835"
            data-name="Notice"
          >
            <div className="relative shrink-0 size-[19px]" data-node-id="69:75838" data-name="lightbulb">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgLightbulb}
                width={19}
                height={19}
              />
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start leading-[1.4] min-w-px not-italic overflow-clip relative"
              data-node-id="69:70837"
              data-name="Notice information"
            >
              <p className="font-bold relative shrink-0 text-[#00629b] text-[12px] w-full" data-node-id="69:70838">
                Call pertama dengan calon mitra
              </p>
              <p className="font-normal relative shrink-0 text-[#173251] text-[11px] w-full" data-node-id="69:70839">
                Hari ini, 10:00 WIB · PIC {selectedLead.pic}
              </p>
            </div>
          </div>
        </div>

        {/* Agenda Follow Up */}
        <div
          className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full border border-[#e7eff4]"
          data-node-id="69:70840"
          data-name="Agenda Follow Up"
        >
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70841"
            data-name="Section heading"
          >
            <p
              className="font-bold leading-[1.4] not-italic relative shrink-0 text-[#173251] text-[14px] w-full"
              data-node-id="69:70842"
            >
              Agenda Follow Up
            </p>
          </div>

          {[
            { title: 'Call pertama', date: '12 Jun 2025' },
            { title: 'Kirim proposal', date: '23 Jun 2025' },
            { title: 'Jadwalkan assessment', date: '23 Jun 2025' },
            { title: 'Proses dokumen', date: '24 Jun 2025' },
          ].map((agenda, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e7eff4] border-solid content-stretch flex flex-col gap-[9px] items-start overflow-clip p-[10px] relative rounded-[7px] shrink-0 w-full"
              data-name="Record card"
            >
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.4] min-w-px not-italic overflow-clip relative">
                  <p className="font-bold relative shrink-0 text-[#173251] text-[12px] w-full">
                    {agenda.title}
                  </p>
                  <p className="font-normal relative shrink-0 text-[#8192a5] text-[10px] w-full">
                    {agenda.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tugas & Reminder */}
        <div
          className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full border border-[#e7eff4]"
          data-node-id="69:70867"
          data-name="Tugas & Reminder"
        >
          <div
            className="content-stretch flex justify-between items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-full"
            data-node-id="69:70868"
            data-name="Section heading"
          >
            <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">Tugas & Reminder</p>
            <button
              type="button"
              onClick={() => alert('Membuka seluruh daftar tugas admin')}
              className="font-normal relative shrink-0 text-[#00629b] text-[10px] hover:underline cursor-pointer"
              data-node-id="69:70870"
            >
              Lihat Semua
            </button>
          </div>

          {[
            { task: '☐ Follow up Budi Santoso (Tambak Maju Jaya)', time: 'Hari ini, 10:00' },
            { task: '☐ Kirim penawaran ke Pak Dedi (Mina Sejahtera)', time: 'Hari ini, 15:00' },
            { task: '☐ Cek dokumen Hendra Wijaya', time: 'Besok, 09:00' },
            { task: '☐ Konfirmasi jadwal assessment Pak Wawan', time: '25 Apr 2025' },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e7eff4] border-solid content-stretch flex flex-col gap-[9px] items-start overflow-clip p-[10px] relative rounded-[7px] shrink-0 w-full"
              data-name="Record card"
            >
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.4] min-w-px not-italic overflow-clip relative">
                  <p className="font-bold relative shrink-0 text-[#173251] text-[12px] w-full">
                    {t.task}
                  </p>
                  <p className="font-normal relative shrink-0 text-[#8192a5] text-[10px] w-full">
                    {t.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Green Banner */}
        <div
          className="bg-[#e5f8ef] content-stretch flex gap-[9px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full"
          data-node-id="69:70895"
          data-name="Notice"
        >
          <div className="relative shrink-0 size-[19px]" data-node-id="69:75841" data-name="circle-check">
            <Image
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgCircleCheck1}
              width={19}
              height={19}
            />
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start leading-[1.4] min-w-px not-italic overflow-clip relative"
            data-node-id="69:70897"
            data-name="Notice information"
          >
            <p className="font-bold relative shrink-0 text-[#14b97c] text-[12px] w-full" data-node-id="69:70898">
              Dashboard admin internal
            </p>
            <p className="font-normal relative shrink-0 text-[#173251] text-[11px] w-full" data-node-id="69:70899">
              Memudahkan tracking calon mitra, onboarding, instalasi, dan manajemen mitra dalam satu alur.
            </p>
          </div>
        </div>

        {/* Admin Internal Navigation Sections */}
        <div
          className="bg-white content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full border border-[#e7eff4]"
          data-node-id="69:70900"
          data-name="Admin Internal"
        >
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70901"
            data-name="Section heading"
          >
            <p
              className="font-bold leading-[1.4] not-italic relative shrink-0 text-[#173251] text-[14px] w-full"
              data-node-id="69:70902"
            >
              Admin Internal
            </p>
          </div>
          <p
            className="font-normal leading-[1.4] not-italic relative shrink-0 text-[#8192a5] text-[11px] w-full"
            data-node-id="69:70903"
          >
            Kelola calon mitra dan operasional Fiscycle dalam satu dashboard.
          </p>

          <div
            className="content-start flex flex-wrap gap-[6px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70904"
            data-name="Section navigation"
          >
            <Link
              href="/admin/dashboard"
              className="bg-[#e2f3fc] border border-[#a9c9db] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0"
            >
              <p className="font-bold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[10px] whitespace-nowrap">
                Dashboard
              </p>
            </Link>
            <Link
              href="/admin/leads"
              className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0"
            >
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Calon Mitra Tambak
              </p>
            </Link>
            <Link
              href="/admin/farms"
              className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0"
            >
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Mitra Tambak
              </p>
            </Link>
            <Link
              href="/admin/leads"
              className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0"
            >
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Onboarding Mitra
              </p>
            </Link>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Jadwal Instalasi
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Perangkat
              </p>
            </div>
          </div>

          <p
            className="font-bold leading-[1.4] not-italic relative shrink-0 text-[#173251] text-[10px] w-full pt-2"
            data-node-id="69:70917"
          >
            AKTIVITAS
          </p>
          <div
            className="content-start flex flex-wrap gap-[6px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70918"
            data-name="Section navigation"
          >
            <div className="bg-[#e2f3fc] border border-[#a9c9db] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-bold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[10px] whitespace-nowrap">
                Tugas & Reminder
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Notifikasi
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Laporan
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Riwayat Aktivitas
              </p>
            </div>
          </div>

          <p
            className="font-bold leading-[1.4] not-italic relative shrink-0 text-[#173251] text-[10px] w-full pt-2"
            data-node-id="69:70927"
          >
            PENGATURAN
          </p>
          <div
            className="content-start flex flex-wrap gap-[6px] items-start overflow-clip relative shrink-0 w-full"
            data-node-id="69:70928"
            data-name="Section navigation"
          >
            <div className="bg-[#e2f3fc] border border-[#a9c9db] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-bold leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[10px] whitespace-nowrap">
                Manajemen Tim
              </p>
            </div>
            <div className="bg-white border border-[#e7eff4] border-solid content-stretch flex items-start overflow-clip px-[9px] py-[8px] relative rounded-[5px] shrink-0">
              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[10px] whitespace-nowrap">
                Pengaturan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Pusat Bantuan Admin Fiscycle: Hubungi tim operasional 24/7 di support@fiscycle.id')}
            className="bg-white border border-[#a9c9db] border-solid content-stretch flex items-center justify-center min-h-[36px] overflow-clip px-[10px] py-[8px] relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-sky-50 transition mt-2"
            data-node-id="69:70933"
            data-name="Action"
          >
            <p className="flex-[1_0_0] font-bold leading-[1.35] min-w-px not-italic relative text-[#00629b] text-[11px] text-center">
              Pusat Bantuan
            </p>
          </button>
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-[#e7eff4] border-solid border-t content-stretch flex flex-col gap-[8px] items-center overflow-clip pb-[8px] pt-[9px] shadow-lg max-w-md mx-auto"
        data-node-id="69:70935"
        data-name="Bottom navigation"
      >
        <div
          className="content-stretch flex items-start justify-between overflow-clip px-[14px] relative shrink-0 w-full"
          data-node-id="69:70936"
          data-name="Navigation destinations"
        >
          <Link
            href="/admin/dashboard"
            className="content-stretch flex flex-col gap-[3px] items-center overflow-clip relative shrink-0 w-[76px]"
            data-name="Navigation item"
          >
            <div className="relative shrink-0 size-[21px]" data-name="house">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgHouse}
                width={21}
                height={21}
              />
            </div>
            <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap">
              Dashboard
            </p>
          </Link>

          <div
            className="content-stretch flex flex-col gap-[3px] items-center overflow-clip relative shrink-0 w-[76px] cursor-pointer"
            data-name="Navigation item"
          >
            <div className="relative shrink-0 size-[21px]" data-name="users">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgUsers}
                width={21}
                height={21}
              />
            </div>
            <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[#00629b] text-[8px] whitespace-nowrap font-bold">
              Calon Mitra
            </p>
          </div>

          <div
            onClick={() => alert('Membuka daftar tugas follow-up')}
            className="content-stretch flex flex-col gap-[3px] items-center overflow-clip relative shrink-0 w-[76px] cursor-pointer"
            data-name="Navigation item"
          >
            <div className="relative shrink-0 size-[21px]" data-name="list-checks">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgListChecks}
                width={21}
                height={21}
              />
            </div>
            <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap">
              Tugas
            </p>
          </div>

          <div
            onClick={() => alert('Menu administratif lainnya')}
            className="content-stretch flex flex-col gap-[3px] items-center overflow-clip relative shrink-0 w-[76px] cursor-pointer"
            data-name="Navigation item"
          >
            <div className="relative shrink-0 size-[21px]" data-name="menu">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgMenu1}
                width={21}
                height={21}
              />
            </div>
            <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap">
              Lainnya
            </p>
          </div>
        </div>

        <div
          className="bg-[#152334] h-[3px] relative rounded-[100px] shrink-0 w-[108px]"
          data-node-id="69:70949"
          data-name="Home indicator"
        />
      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[12px] p-5 w-full max-w-sm shadow-xl flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-[#e7eff4] pb-2">
              <h3 className="font-bold text-[#173251] text-[15px]">Tambah Calon Mitra Baru</h3>
              <button
                type="button"
                onClick={() => setShowAddLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddLeadSubmit} className="flex flex-col gap-3 text-[11px]">
              <div>
                <label className="font-semibold text-[#173251] block mb-1">Nama Pemilik Tambak</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Supriyadi"
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                  className="w-full border border-[#e7eff4] rounded-md px-2.5 py-1.5 outline-none focus:border-[#00629b]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#173251] block mb-1">Nama Tambak</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tambak Mina Barokah"
                  value={newFarmName}
                  onChange={(e) => setNewFarmName(e.target.value)}
                  className="w-full border border-[#e7eff4] rounded-md px-2.5 py-1.5 outline-none focus:border-[#00629b]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#173251] block mb-1">Kota / Kabupaten</label>
                <input
                  type="text"
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full border border-[#e7eff4] rounded-md px-2.5 py-1.5 outline-none focus:border-[#00629b]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#173251] block mb-1">No. WhatsApp</label>
                <input
                  type="tel"
                  placeholder="0812-XXXX-XXXX"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full border border-[#e7eff4] rounded-md px-2.5 py-1.5 outline-none focus:border-[#00629b]"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="flex-1 border border-[#e7eff4] rounded-md py-2 font-semibold text-[#8192a5]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#00629b] text-white rounded-md py-2 font-bold hover:bg-[#005282]"
                >
                  Simpan Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
