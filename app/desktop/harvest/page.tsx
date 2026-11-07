'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Users,
  Fish,
  Truck,
  Banknote,
  CreditCard,
  MapPin,
  TrendingUp,
  CircleDollarSign,
  Info,
  BarChart3,
  Check,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

const imgFarmLandscape = '/images/desktop-farm-landscape.png';
const imgBuyerPhoto1 = '/images/desktop-buyer-1.png';
const imgBuyerPhoto2 = '/images/desktop-buyer-2.png';
const imgBuyerPhoto3 = '/images/desktop-buyer-3.png';
const imgFishProduct1 = '/images/desktop-fish-prod-1.png';
const imgFishProduct2 = '/images/desktop-fish-prod-2.png';
const imgSalesTrend = '/images/desktop-sales-trend.svg';
const imgNilaShare = '/images/desktop-nila-share.svg';
const imgBandengShare = '/images/desktop-bandeng-share.svg';
const imgLeleShare = '/images/desktop-lele-share.svg';

interface OrderItem {
  id: string;
  buyer: string;
  buyerCity: string;
  product: string;
  size: string;
  amount: string;
  schedule: string;
  status: string;
  statusColor: string;
  statusBg: string;
  sourcePond: string;
  price: string;
  stepActive: number; // 0 to 6
}

const ordersData: OrderItem[] = [
  {
    id: 'ORD-0241',
    buyer: 'ABC Restaurant',
    buyerCity: 'Surabaya',
    product: 'Nila',
    size: '300–400 g',
    amount: '500 kg',
    schedule: '4 Nov 2026',
    status: 'Menunggu Panen',
    statusColor: '#f69b23',
    statusBg: '#fff3df',
    sourcePond: 'Kolam 4',
    price: 'Rp 12.500.000',
    stepActive: 2,
  },
  {
    id: 'ORD-0242',
    buyer: 'Budi Sejahtera',
    buyerCity: 'Bandung',
    product: 'Nila',
    size: '250–350 g',
    amount: '300 kg',
    schedule: '12 Nov 2026',
    status: 'Dikonfirmasi',
    statusColor: '#1688f8',
    statusBg: '#e8f3ff',
    sourcePond: 'Kolam 1',
    price: 'Rp 7.500.000',
    stepActive: 1,
  },
  {
    id: 'ORD-0243',
    buyer: 'PT FreshMart',
    buyerCity: 'Jakarta',
    product: 'Bandeng',
    size: '400–600 g',
    amount: '1.000 kg',
    schedule: '6 Nov 2026',
    status: 'Siap Dikirim',
    statusColor: '#14b97c',
    statusBg: '#e5f8ef',
    sourcePond: 'Kolam 5',
    price: 'Rp 28.000.000',
    stepActive: 4,
  },
  {
    id: 'ORD-0244',
    buyer: 'Warung Laut',
    buyerCity: 'Gresik',
    product: 'Nila',
    size: '200–300 g',
    amount: '200 kg',
    schedule: '15 Nov 2026',
    status: 'Perlu Konfirmasi',
    statusColor: '#f34860',
    statusBg: '#fdebea',
    sourcePond: 'Kolam 2',
    price: 'Rp 5.000.000',
    stepActive: 0,
  },
];

export default function FiscyclePasarPenjualanPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem>(ordersData[0]);
  const [orderFilter, setOrderFilter] = useState<'all' | 'action' | 'harvest' | 'shipping'>('all');
  const [supplyFilter, setSupplyFilter] = useState<'ready' | 'approaching' | 'scheduled'>('approaching');
  const [searchQuery, setSearchQuery] = useState('');

  const progressSteps = [
    'Permintaan Masuk',
    'Dikonfirmasi',
    'Menunggu Panen',
    'Dalam Panen',
    'Siap Dikirim',
    'Dalam Pengiriman',
    'Selesai',
  ];

  const filteredOrders = ordersData.filter((o) => {
    if (orderFilter === 'action') return o.status === 'Perlu Konfirmasi';
    if (orderFilter === 'harvest') return o.status === 'Menunggu Panen';
    if (orderFilter === 'shipping') return o.status === 'Siap Dikirim';
    return true;
  });

  return (
    <div
      className="bg-[#f3f9fc] content-stretch flex flex-col gap-[12px] min-h-screen overflow-x-hidden p-[20px] relative w-full select-none"
      data-node-id="44:4180"
      data-name="Fiscycle · Pasar & Penjualan"
    >
      {/* 1. Market Header: Search & Account */}
      <div className="flex h-[30px] items-center justify-between relative shrink-0 w-full">
        {/* Search */}
        <div className="border border-[#e7eff4] bg-white flex gap-[7px] h-[28px] items-center px-[10px] rounded-[6px] shrink-0 w-[440px]">
          <Search className="size-[13px] text-[#8192a5]" />
          <input
            type="text"
            placeholder="Cari buyer, pesanan, pelanggan, atau informasi pasar..."
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

      {/* 2. Market Introduction Banner */}
      <div className="bg-[#e2f3fc] flex gap-[12px] h-[72px] items-center overflow-hidden p-[12px] relative rounded-[10px] shrink-0 w-full">
        <div className="absolute h-[72px] right-0 top-0 w-[476px] pointer-events-none overflow-hidden">
          <Image
            src={imgFarmLandscape}
            alt="Farm landscape"
            width={476}
            height={72}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div className="absolute bg-gradient-to-r from-[#e2f3fc] via-[#e2f3fc]/90 to-transparent h-[72px] left-[600px] top-0 w-[240px] pointer-events-none" />
        <div className="flex flex-col gap-[4px] items-start relative z-10 text-[#173251] max-w-[700px]">
          <h1 className="font-extrabold text-[22px] leading-tight">Pasar &amp; Penjualan</h1>
          <p className="font-normal text-[9px] text-[#425974] leading-relaxed">
            Hubungkan hasil produksi tambak Anda dengan kebutuhan pasar, untuk penjualan yang lebih mudah, transparan, dan menguntungkan.
          </p>
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.92)] border border-[#cbe4f4] flex flex-col items-start right-[20px] p-[8px] rounded-[6px] top-[10px] w-[200px] z-20 shadow-sm">
          <p className="font-normal text-[#173251] text-[8px] leading-snug">
            Dari tambak ke pasar. Fiscycle membantu Anda menemukan pembeli, mengelola pesanan, dan melacak pembayaran.
          </p>
        </div>
      </div>

      {/* 3. Six KPI Summary Cards */}
      <div className="flex gap-[10px] items-start relative shrink-0 w-full">
        {/* Card 1 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[64px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e5f8ef] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <ShoppingCart className="size-[18px] text-[#14b97c]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[18px]">4</span>
            <span className="font-bold text-[#173251] text-[9px]">Pesanan Aktif</span>
            <span className="text-[#8192a5] text-[7px]">2 perlu ditindaklanjuti</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[64px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e8f3ff] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Users className="size-[18px] text-[#1688f8]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[18px]">3</span>
            <span className="font-bold text-[#173251] text-[9px]">Buyer Aktif</span>
            <span className="text-[#8192a5] text-[7px]">Total 12 pelanggan</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[64px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e5f8ef] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Fish className="size-[18px] text-[#14b97c]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[18px]">1,8 ton</span>
            <span className="font-bold text-[#173251] text-[9px]">Potensi Supply</span>
            <span className="text-[#8192a5] text-[7px]">Dari kolam mendekati panen</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[64px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#fff3df] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Truck className="size-[18px] text-[#f69b23]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[18px]">2</span>
            <span className="font-bold text-[#173251] text-[9px]">Pengiriman Mendatang</span>
            <span className="text-[#8192a5] text-[7px]">4 Nov 2026</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[64px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e5f8ef] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <Banknote className="size-[18px] text-[#14b97c]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[18px]">Rp 48,5 jt</span>
            <span className="font-bold text-[#173251] text-[9px]">Penjualan Bulan Ini</span>
            <span className="text-[#8192a5] text-[7px]">2,8 ton terjual</span>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white flex flex-1 gap-[9px] h-[64px] items-center p-[10px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="bg-[#e8f3ff] flex items-center justify-center rounded-[6px] shrink-0 size-[32px]">
            <CreditCard className="size-[18px] text-[#1688f8]" />
          </div>
          <div className="flex flex-col gap-px leading-tight">
            <span className="font-bold text-[#173251] text-[18px]">1</span>
            <span className="font-bold text-[#173251] text-[9px]">Pembayaran Pending</span>
            <span className="text-[#8192a5] text-[7px]">Rp 12,5 jt</span>
          </div>
        </div>
      </div>

      {/* 4. Row 2: Opportunities, Recommendations, Market Insights */}
      <div className="flex gap-[12px] h-[240px] items-start relative shrink-0 w-full">
        {/* Section: Kebutuhan Buyer Terbaru */}
        <div className="bg-white flex flex-1 flex-col gap-[10px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[14px]">Kebutuhan Buyer Terbaru</h2>
            <button className="font-normal text-[#4d94c2] text-[9px] hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>

          <div className="flex flex-col gap-[8px] overflow-y-auto">
            {/* Buyer 1 */}
            <div className="flex gap-[10px] h-[55px] items-center p-[6px] hover:bg-[#f8fbfd] rounded-[6px] transition cursor-pointer border border-transparent hover:border-[#e7eff4]">
              <div className="h-[46px] rounded-[5px] shrink-0 w-[52px] overflow-hidden bg-gray-100">
                <Image
                  src={imgBuyerPhoto1}
                  alt="ABC Restaurant"
                  width={52}
                  height={46}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col gap-[3px] min-w-0">
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[#173251] text-[10px]">ABC Restaurant</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[8px] px-[6px] py-[2px] rounded-[4px]">
                    Mencari Supply
                  </span>
                </div>
                <div className="flex gap-[5px] items-center">
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    Nila
                  </span>
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    500 kg
                  </span>
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    300–400 g
                  </span>
                </div>
                <div className="flex items-center gap-[4px] text-[#8192a5] text-[7px]">
                  <MapPin className="size-[9px]" />
                  <span>Surabaya | Dibutuhkan 4 Nov 2026</span>
                </div>
              </div>
              <ChevronRight className="size-[12px] text-[#8192a5]" />
            </div>

            {/* Buyer 2 */}
            <div className="flex gap-[10px] h-[55px] items-center p-[6px] hover:bg-[#f8fbfd] rounded-[6px] transition cursor-pointer border border-transparent hover:border-[#e7eff4]">
              <div className="h-[46px] rounded-[5px] shrink-0 w-[52px] overflow-hidden bg-gray-100">
                <Image
                  src={imgBuyerPhoto2}
                  alt="Budi Sejahtera"
                  width={52}
                  height={46}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col gap-[3px] min-w-0">
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[#173251] text-[10px]">Budi Sejahtera</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[8px] px-[6px] py-[2px] rounded-[4px]">
                    Mencari Supply
                  </span>
                </div>
                <div className="flex gap-[5px] items-center">
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    Nila
                  </span>
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    300 kg
                  </span>
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    250–350 g
                  </span>
                </div>
                <div className="flex items-center gap-[4px] text-[#8192a5] text-[7px]">
                  <MapPin className="size-[9px]" />
                  <span>Bandung | Dibutuhkan 12 Nov 2026</span>
                </div>
              </div>
              <ChevronRight className="size-[12px] text-[#8192a5]" />
            </div>

            {/* Buyer 3 */}
            <div className="flex gap-[10px] h-[55px] items-center p-[6px] hover:bg-[#f8fbfd] rounded-[6px] transition cursor-pointer border border-transparent hover:border-[#e7eff4]">
              <div className="h-[46px] rounded-[5px] shrink-0 w-[52px] overflow-hidden bg-gray-100">
                <Image
                  src={imgBuyerPhoto3}
                  alt="PT FreshMart"
                  width={52}
                  height={46}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col gap-[3px] min-w-0">
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[#173251] text-[10px]">PT FreshMart</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[8px] px-[6px] py-[2px] rounded-[4px]">
                    Mencari Supply
                  </span>
                </div>
                <div className="flex gap-[5px] items-center">
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    Bandeng
                  </span>
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    1.000 kg
                  </span>
                  <span className="bg-[#f3f9fc] text-[#4d94c2] text-[8px] px-[5px] py-[2px] rounded-[3px]">
                    400–600 g
                  </span>
                </div>
                <div className="flex items-center gap-[4px] text-[#8192a5] text-[7px]">
                  <MapPin className="size-[9px]" />
                  <span>Jakarta | Rutin hingga Nov 2026</span>
                </div>
              </div>
              <ChevronRight className="size-[12px] text-[#8192a5]" />
            </div>
          </div>
        </div>

        {/* Section: Rekomendasi Ikan Anda */}
        <div className="bg-white flex flex-1 flex-col gap-[8px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[14px]">Rekomendasi Ikan Anda</h2>
            <button className="font-normal text-[#4d94c2] text-[9px] hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-[5px] items-start w-full">
            <button
              onClick={() => setSupplyFilter('ready')}
              className={`h-[24px] px-[7px] rounded-[4px] text-[7px] font-bold transition cursor-pointer ${
                supplyFilter === 'ready'
                  ? 'bg-[#1688f8] text-white'
                  : 'bg-[#f3f9fc] text-[#8192a5] hover:bg-[#e2f3fc]'
              }`}
            >
              Siap Panen (2)
            </button>
            <button
              onClick={() => setSupplyFilter('approaching')}
              className={`h-[24px] px-[7px] rounded-[4px] text-[7px] font-bold transition cursor-pointer ${
                supplyFilter === 'approaching'
                  ? 'bg-[#1688f8] text-white'
                  : 'bg-[#f3f9fc] text-[#8192a5] hover:bg-[#e2f3fc]'
              }`}
            >
              Mendekati Panen (3)
            </button>
            <button
              onClick={() => setSupplyFilter('scheduled')}
              className={`h-[24px] px-[7px] rounded-[4px] text-[7px] font-bold transition cursor-pointer ${
                supplyFilter === 'scheduled'
                  ? 'bg-[#1688f8] text-white'
                  : 'bg-[#f3f9fc] text-[#8192a5] hover:bg-[#e2f3fc]'
              }`}
            >
              Sudah Dijadwalkan (1)
            </button>
          </div>

          {/* Pond Recommendation list */}
          <div className="flex flex-col gap-[6px] overflow-y-auto">
            {/* Recommendation 1 */}
            <div className="flex gap-[9px] h-[47px] items-center p-[4px] rounded-[6px] hover:bg-[#f8fbfd] transition cursor-pointer">
              <div className="h-[44px] rounded-[5px] shrink-0 w-[52px] overflow-hidden bg-gray-100">
                <Image
                  src={imgFishProduct1}
                  alt="Fish product"
                  width={52}
                  height={44}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col gap-[2px] min-w-0">
                <div className="flex items-start justify-between w-full">
                  <span className="font-bold text-[#173251] text-[10px]">Kolam 4</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[8px] px-[6px] py-[2px] rounded-[4px]">
                    Siap Ditawarkan
                  </span>
                </div>
                <div className="flex gap-[5px] text-[8px]">
                  <span className="font-bold text-[#00629b]">Nila</span>
                  <span className="text-[#8192a5]">Estimasi 600 kg | 300–400 g</span>
                </div>
                <span className="text-[#8192a5] text-[7px]">▦ 4–6 Nov 2026</span>
              </div>
              <ChevronRight className="size-[12px] text-[#8192a5]" />
            </div>

            {/* Recommendation 2 */}
            <div className="flex gap-[9px] h-[47px] items-center p-[4px] rounded-[6px] hover:bg-[#f8fbfd] transition cursor-pointer">
              <div className="h-[44px] rounded-[5px] shrink-0 w-[52px] overflow-hidden bg-gray-100">
                <Image
                  src={imgFishProduct1}
                  alt="Fish product"
                  width={52}
                  height={44}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col gap-[2px] min-w-0">
                <div className="flex items-start justify-between w-full">
                  <span className="font-bold text-[#173251] text-[10px]">Kolam 1</span>
                  <span className="bg-[#fff3df] text-[#f69b23] font-bold text-[8px] px-[6px] py-[2px] rounded-[4px]">
                    Mendekati Panen
                  </span>
                </div>
                <div className="flex gap-[5px] text-[8px]">
                  <span className="font-bold text-[#00629b]">Nila</span>
                  <span className="text-[#8192a5]">Estimasi 800 kg | 250–350 g</span>
                </div>
                <span className="text-[#8192a5] text-[7px]">▦ 10–12 Nov 2026</span>
              </div>
              <ChevronRight className="size-[12px] text-[#8192a5]" />
            </div>

            {/* Recommendation 3 */}
            <div className="flex gap-[9px] h-[47px] items-center p-[4px] rounded-[6px] hover:bg-[#f8fbfd] transition cursor-pointer">
              <div className="h-[44px] rounded-[5px] shrink-0 w-[52px] overflow-hidden bg-gray-100">
                <Image
                  src={imgFishProduct2}
                  alt="Fish product"
                  width={52}
                  height={44}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col gap-[2px] min-w-0">
                <div className="flex items-start justify-between w-full">
                  <span className="font-bold text-[#173251] text-[10px]">Kolam 5</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[8px] px-[6px] py-[2px] rounded-[4px]">
                    Siap Ditawarkan
                  </span>
                </div>
                <div className="flex gap-[5px] text-[8px]">
                  <span className="font-bold text-[#00629b]">Bandeng</span>
                  <span className="text-[#8192a5]">Estimasi 400 kg | 400–600 g</span>
                </div>
                <span className="text-[#8192a5] text-[7px]">▦ 15–18 Nov 2026</span>
              </div>
              <ChevronRight className="size-[12px] text-[#8192a5]" />
            </div>
          </div>
        </div>

        {/* Section: Insight Pasar */}
        <div className="bg-white flex flex-col gap-[10px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[294px] shrink-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[14px]">Insight Pasar</h2>
            <ArrowUpRight className="size-[14px] text-[#4d94c2] cursor-pointer" />
          </div>

          <div className="flex flex-col gap-[7px] overflow-y-auto">
            {/* Peluang */}
            <div className="flex gap-[8px] items-center p-[4px] rounded-[6px] hover:bg-[#f8fbfd]">
              <div className="bg-[#e5f8ef] flex items-center justify-center rounded-[6px] shrink-0 size-[28px]">
                <TrendingUp className="size-[15px] text-[#14b97c]" />
              </div>
              <div className="flex flex-1 flex-col leading-tight">
                <span className="font-bold text-[#14b97c] text-[9px]">Peluang</span>
                <p className="text-[#173251] text-[8px] leading-snug">
                  Permintaan nila meningkat menjelang akhir bulan di area sekitar Surabaya.
                </p>
              </div>
            </div>

            {/* Risiko */}
            <div className="flex gap-[8px] items-center p-[4px] rounded-[6px] hover:bg-[#f8fbfd]">
              <div className="bg-[#fff3df] flex items-center justify-center rounded-[6px] shrink-0 size-[28px]">
                <CircleDollarSign className="size-[15px] text-[#f69b23]" />
              </div>
              <div className="flex flex-1 flex-col leading-tight">
                <span className="font-bold text-[#f69b23] text-[9px]">Risiko</span>
                <p className="text-[#173251] text-[8px] leading-snug">
                  Stok pakan perlu dipantau untuk menjaga kecukupan dengan estimasi panen yang sama.
                </p>
              </div>
            </div>

            {/* Catatan */}
            <div className="flex gap-[8px] items-center p-[4px] rounded-[6px] hover:bg-[#f8fbfd]">
              <div className="bg-[#e8f3ff] flex items-center justify-center rounded-[6px] shrink-0 size-[28px]">
                <Info className="size-[15px] text-[#1688f8]" />
              </div>
              <div className="flex flex-1 flex-col leading-tight">
                <span className="font-bold text-[#1688f8] text-[9px]">Catatan</span>
                <p className="text-[#173251] text-[8px] leading-snug">
                  ABC Restaurant membutuhkan pasokan rutin setiap 4 minggu ke depan.
                </p>
              </div>
            </div>

            {/* Supply */}
            <div className="flex gap-[8px] items-center p-[4px] rounded-[6px] hover:bg-[#f8fbfd]">
              <div className="bg-[#f4ebff] flex items-center justify-center rounded-[6px] shrink-0 size-[28px]">
                <BarChart3 className="size-[15px] text-[#9955e8]" />
              </div>
              <div className="flex flex-1 flex-col leading-tight">
                <span className="font-bold text-[#9955e8] text-[9px]">Supply</span>
                <p className="text-[#173251] text-[8px] leading-snug">
                  Potensi supply minggu depan lebih rendah dari kebutuhan buyer aktif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Row 3: Order Management (Active Orders Table + Order Detail) */}
      <div className="flex gap-[12px] h-[218px] items-start relative shrink-0 w-full">
        {/* Left: Active Orders Table */}
        <div className="bg-white flex flex-col gap-[6px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[660px] shrink-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[14px]">Pesanan Aktif</h2>
            <button className="font-normal text-[#4d94c2] text-[9px] hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-[7px] items-start w-full">
            <button
              onClick={() => setOrderFilter('all')}
              className={`h-[23px] px-[12px] rounded-[4px] text-[8px] font-bold transition cursor-pointer ${
                orderFilter === 'all'
                  ? 'bg-[#1688f8] text-white'
                  : 'bg-[#f3f9fc] text-[#8192a5] hover:bg-[#e2f3fc]'
              }`}
            >
              Semua (4)
            </button>
            <button
              onClick={() => setOrderFilter('action')}
              className={`h-[23px] px-[12px] rounded-[4px] text-[8px] font-bold transition cursor-pointer ${
                orderFilter === 'action'
                  ? 'bg-[#1688f8] text-white'
                  : 'bg-[#f3f9fc] text-[#8192a5] hover:bg-[#e2f3fc]'
              }`}
            >
              Perlu Tindakan (2)
            </button>
            <button
              onClick={() => setOrderFilter('harvest')}
              className={`h-[23px] px-[12px] rounded-[4px] text-[8px] font-bold transition cursor-pointer ${
                orderFilter === 'harvest'
                  ? 'bg-[#1688f8] text-white'
                  : 'bg-[#f3f9fc] text-[#8192a5] hover:bg-[#e2f3fc]'
              }`}
            >
              Menunggu Panen (2)
            </button>
            <button
              onClick={() => setOrderFilter('shipping')}
              className={`h-[23px] px-[12px] rounded-[4px] text-[8px] font-bold transition cursor-pointer ${
                orderFilter === 'shipping'
                  ? 'bg-[#1688f8] text-white'
                  : 'bg-[#f3f9fc] text-[#8192a5] hover:bg-[#e2f3fc]'
              }`}
            >
              Pengiriman (1)
            </button>
          </div>

          {/* Table Headings */}
          <div className="flex gap-[8px] h-[17px] items-center text-[#8192a5] font-bold text-[8px] px-[6px] bg-[#f8fbfd] rounded-[4px] mt-1">
            <span className="w-[68px]">Nomor</span>
            <span className="w-[102px]">Buyer</span>
            <span className="w-[80px]">Produk</span>
            <span className="w-[54px]">Jumlah</span>
            <span className="w-[68px]">Jadwal</span>
            <span className="w-[112px]">Status</span>
            <span className="w-[40px] text-center">Aksi</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-[2px] overflow-y-auto">
            {filteredOrders.map((ord) => {
              const isSelected = selectedOrder.id === ord.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`flex gap-[8px] h-[28px] items-center px-[6px] border-t border-[#e7eff4] transition cursor-pointer text-[8px] ${
                    isSelected ? 'bg-[#e2f3fc]/60' : 'hover:bg-[#f8fbfd]'
                  }`}
                >
                  <span className="w-[68px] font-bold text-[#173251]">{ord.id}</span>
                  <span className="w-[102px] text-[#173251] truncate">{ord.buyer}</span>
                  <div className="w-[80px] flex flex-col leading-none">
                    <span className="text-[#173251]">{ord.product}</span>
                    <span className="text-[#8192a5] text-[7px]">{ord.size}</span>
                  </div>
                  <span className="w-[54px] text-[#173251]">{ord.amount}</span>
                  <span className="w-[68px] text-[#173251]">{ord.schedule}</span>
                  <div className="w-[112px]">
                    <span
                      style={{ backgroundColor: ord.statusBg, color: ord.statusColor }}
                      className="font-bold text-[8px] px-[6px] py-[2px] rounded-[4px] inline-block"
                    >
                      {ord.status}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(ord);
                    }}
                    className="border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[8px] h-[22px] px-[8px] rounded-[4px] hover:bg-[#e2f3fc] transition"
                  >
                    Lihat
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Order Detail & Progress */}
        <div className="bg-white flex flex-1 flex-col gap-[8px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[14px]">Detail Pesanan</h2>
            <button className="font-normal text-[#4d94c2] text-[9px] hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>

          {/* Heading */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[10px]">
              <span className="font-bold text-[#173251] text-[17px]">{selectedOrder.id}</span>
              <span
                style={{ backgroundColor: selectedOrder.statusBg, color: selectedOrder.statusColor }}
                className="font-bold text-[8px] px-[6px] py-[3px] rounded-[4px]"
              >
                {selectedOrder.status}
              </span>
            </div>
            <button className="bg-[#00629b] text-white font-bold text-[9px] h-[24px] px-[10px] rounded-[6px] hover:bg-[#004f7c] transition cursor-pointer">
              Kelola Pesanan
            </button>
          </div>

          {/* Details & Progress layout */}
          <div className="flex gap-[14px] items-start w-full">
            {/* Left col: Order info */}
            <div className="flex flex-col gap-[5px] w-[220px] shrink-0 text-[8px]">
              <div className="flex items-center gap-[8px]">
                <div className="size-[34px] rounded-[5px] overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={imgBuyerPhoto1}
                    alt={selectedOrder.buyer}
                    width={34}
                    height={34}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col leading-tight min-w-0 flex-1">
                  <span className="font-bold text-[#173251] text-[9px] truncate">
                    {selectedOrder.buyer}
                  </span>
                  <span className="text-[#8192a5] text-[7px]">⌖ {selectedOrder.buyerCity}</span>
                </div>
                <button className="border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[8px] h-[22px] px-[8px] rounded-[5px] hover:bg-[#e2f3fc]">
                  Hubungi
                </button>
              </div>

              <div className="flex justify-between border-t border-[#f0f4f7] pt-[3px]">
                <span className="text-[#8192a5]">Produk</span>
                <span className="text-[#173251] font-medium">
                  {selectedOrder.product} {selectedOrder.size}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8192a5]">Jumlah</span>
                <span className="text-[#173251] font-medium">{selectedOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8192a5]">Sumber Supply</span>
                <span className="text-[#173251] font-medium">{selectedOrder.sourcePond}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8192a5]">Tanggal Dibutuhkan</span>
                <span className="text-[#173251] font-medium">{selectedOrder.schedule}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8192a5]">Nilai Pesanan</span>
                <span className="text-[#173251] font-bold">{selectedOrder.price}</span>
              </div>
            </div>

            {/* Separator line */}
            <div className="bg-[#e7eff4] h-[125px] w-px shrink-0" />

            {/* Right col: Order progress tracker */}
            <div className="flex flex-1 flex-col gap-[4px] min-w-0">
              <span className="font-bold text-[#173251] text-[9px]">Progres Pesanan</span>
              <div className="flex flex-col gap-[3px]">
                {progressSteps.map((step, idx) => {
                  const isDone = idx < selectedOrder.stepActive;
                  const isCurrent = idx === selectedOrder.stepActive;

                  return (
                    <div key={step} className="flex gap-[7px] h-[13px] items-center">
                      {isDone ? (
                        <div className="bg-[#14b97c] flex items-center justify-center rounded-full shrink-0 size-[12px]">
                          <Check className="size-[8px] text-white stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="bg-[#1688f8] rounded-full shrink-0 size-[12px] flex items-center justify-center">
                          <div className="size-[4px] rounded-full bg-white" />
                        </div>
                      ) : (
                        <div className="bg-[#e7eff4] rounded-full shrink-0 size-[12px]" />
                      )}
                      <span
                        className={`text-[8px] whitespace-nowrap ${
                          isDone
                            ? 'text-[#173251]'
                            : isCurrent
                            ? 'font-bold text-[#00629b]'
                            : 'text-[#8192a5]'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Row 4: Sales Performance, Top Products Donut, Customers List, Payment Transactions */}
      <div className="flex gap-[12px] h-[178px] items-start relative shrink-0 w-full">
        {/* Penjualan (Sales Bar Chart) */}
        <div className="bg-white flex flex-col gap-[5px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[390px] shrink-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[13px]">Penjualan</h2>
            <div className="flex items-center gap-[2px] text-[#4d94c2] text-[9px] cursor-pointer">
              <span>Oktober 2026</span>
              <ChevronDown className="size-[10px]" />
            </div>
          </div>

          <div className="flex gap-[12px] items-start w-full">
            <div className="flex flex-1 flex-col leading-tight">
              <span className="font-bold text-[#173251] text-[13px]">Rp 48,5 jt</span>
              <span className="text-[#8192a5] text-[7px]">Total Penjualan</span>
              <span className="text-[#14b97c] text-[6px]">↑ 12% bulan ini</span>
            </div>
            <div className="flex flex-1 flex-col leading-tight">
              <span className="font-bold text-[#173251] text-[13px]">2,8 ton</span>
              <span className="text-[#8192a5] text-[7px]">Volume Terjual</span>
              <span className="text-[#14b97c] text-[6px]">↑ 8% bulan ini</span>
            </div>
            <div className="flex flex-1 flex-col leading-tight">
              <span className="font-bold text-[#173251] text-[13px]">18</span>
              <span className="text-[#8192a5] text-[7px]">Ikan Terjual</span>
              <span className="text-[#14b97c] text-[6px]">↑ 20% pesanan</span>
            </div>
            <div className="flex flex-1 flex-col leading-tight">
              <span className="font-bold text-[#173251] text-[13px]">3</span>
              <span className="text-[#8192a5] text-[7px]">Pesanan Aktif</span>
              <span className="text-[#14b97c] text-[6px]">↑ 2 bulan ini</span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full text-[7px] text-[#8192a5] mt-1">
            <span className="font-bold text-[#173251] text-[8px]">Penjualan per Bulan</span>
            <span>● Nilai Penjualan ▪ Volume Penjualan</span>
          </div>

          {/* Chart */}
          <div className="flex gap-[6px] h-[65px] items-start w-full relative">
            <div className="flex flex-col justify-between h-[52px] text-[#8192a5] text-[6px] w-[20px] shrink-0">
              <span>6.000</span>
              <span>4.000</span>
              <span>2.000</span>
              <span>0</span>
            </div>
            <div className="flex flex-1 flex-col h-full relative">
              <div className="flex h-[52px] items-end justify-between px-[3px] relative w-full border-b border-[#e7eff4]">
                {/* 10 monthly bars */}
                {[19, 25, 33, 29, 38, 39, 50, 43, 51, 48].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}px` }}
                    className="bg-[#bde2fa] w-[18px] rounded-t-[2px] transition hover:bg-[#1688f8]"
                  />
                ))}
                {/* Overlay trend line from Figma */}
                <div className="absolute inset-0 pointer-events-none">
                  <Image
                    src={imgSalesTrend}
                    alt="Sales trend"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
              <div className="flex justify-between text-[#8192a5] text-[6px] px-[2px] pt-[2px]">
                {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'].map(
                  (m) => (
                    <span key={m}>{m}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Produk Terlaris Donut */}
        <div className="bg-white flex flex-col gap-[10px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[230px] shrink-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[13px]">Produk Terlaris</h2>
          </div>

          <div className="flex gap-[8px] h-[115px] items-center w-full">
            {/* Donut graphic */}
            <div className="relative shrink-0 size-[96px] flex items-center justify-center">
              <Image
                src={imgNilaShare}
                alt="Nila share"
                fill
                className="object-contain"
                unoptimized
              />
              <Image
                src={imgBandengShare}
                alt="Bandeng share"
                fill
                className="object-contain"
                unoptimized
              />
              <Image
                src={imgLeleShare}
                alt="Lele share"
                fill
                className="object-contain"
                unoptimized
              />
              <div className="flex flex-col items-center leading-none z-10">
                <span className="font-bold text-[#173251] text-[14px]">2,8 ton</span>
                <span className="text-[#8192a5] text-[6px] mt-1">Total Terjual</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-1 flex-col gap-[8px]">
              <div>
                <div className="flex items-center gap-[4px]">
                  <div className="size-[6px] rounded-full bg-[#1688f8]" />
                  <span className="font-bold text-[#173251] text-[8px]">Nila</span>
                </div>
                <span className="text-[#8192a5] text-[7px]">60% | 1.680 kg</span>
              </div>
              <div>
                <div className="flex items-center gap-[4px]">
                  <div className="size-[6px] rounded-full bg-[#14b97c]" />
                  <span className="font-bold text-[#173251] text-[8px]">Bandeng</span>
                </div>
                <span className="text-[#8192a5] text-[7px]">25% | 700 kg</span>
              </div>
              <div>
                <div className="flex items-center gap-[4px]">
                  <div className="size-[6px] rounded-full bg-[#f69b23]" />
                  <span className="font-bold text-[#173251] text-[8px]">Lele</span>
                </div>
                <span className="text-[#8192a5] text-[7px]">15% | 420 kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pelanggan */}
        <div className="bg-white flex flex-col gap-[8px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs w-[250px] shrink-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[13px]">Pelanggan</h2>
            <button className="text-[#4d94c2] text-[9px] hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>

          <div className="flex flex-col gap-[6px] overflow-y-auto">
            {/* Customer 1 */}
            <div className="flex gap-[7px] h-[35px] items-center hover:bg-[#f8fbfd] p-[2px] rounded-[4px] cursor-pointer">
              <div className="size-[32px] rounded-[4px] overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={imgBuyerPhoto1}
                  alt="ABC Restaurant"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col leading-tight min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#173251] text-[8px] truncate">ABC Restaurant</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] text-[7px] font-bold px-[4px] py-px rounded">
                    Aktif
                  </span>
                </div>
                <div className="flex justify-between text-[#8192a5] text-[7px]">
                  <span>Surabaya</span>
                  <span>Pesanan terakhir</span>
                </div>
                <div className="flex justify-between text-[7px]">
                  <span className="font-bold text-[#00629b]">Terhubung</span>
                  <span className="text-[#173251]">2 Nov 2026</span>
                </div>
              </div>
            </div>

            {/* Customer 2 */}
            <div className="flex gap-[7px] h-[35px] items-center hover:bg-[#f8fbfd] p-[2px] rounded-[4px] cursor-pointer">
              <div className="size-[32px] rounded-[4px] overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={imgBuyerPhoto2}
                  alt="Budi Sejahtera"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col leading-tight min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#173251] text-[8px] truncate">Budi Sejahtera</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] text-[7px] font-bold px-[4px] py-px rounded">
                    Aktif
                  </span>
                </div>
                <div className="flex justify-between text-[#8192a5] text-[7px]">
                  <span>Bandung</span>
                  <span>Pesanan terakhir</span>
                </div>
                <div className="flex justify-between text-[7px]">
                  <span className="font-bold text-[#00629b]">Terhubung</span>
                  <span className="text-[#173251]">28 Okt 2026</span>
                </div>
              </div>
            </div>

            {/* Customer 3 */}
            <div className="flex gap-[7px] h-[35px] items-center hover:bg-[#f8fbfd] p-[2px] rounded-[4px] cursor-pointer">
              <div className="size-[32px] rounded-[4px] overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={imgBuyerPhoto3}
                  alt="PT FreshMart"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col leading-tight min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#173251] text-[8px] truncate">PT FreshMart</span>
                  <span className="bg-[#e5f8ef] text-[#14b97c] text-[7px] font-bold px-[4px] py-px rounded">
                    Aktif
                  </span>
                </div>
                <div className="flex justify-between text-[#8192a5] text-[7px]">
                  <span>Jakarta</span>
                  <span>Pesanan terakhir</span>
                </div>
                <div className="flex justify-between text-[7px]">
                  <span className="font-bold text-[#00629b]">Terhubung</span>
                  <span className="text-[#173251]">1 Nov 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaksi Pembayaran */}
        <div className="bg-white flex flex-1 flex-col gap-[7px] h-full p-[12px] rounded-[10px] border border-[#e7eff4] shadow-xs">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[#173251] text-[13px]">Transaksi Pembayaran</h2>
            <ChevronRight className="size-[13px] text-[#4d94c2] cursor-pointer" />
          </div>

          <div className="flex flex-col gap-[5px] overflow-y-auto">
            {/* Payment 1 */}
            <div className="flex gap-[6px] h-[28px] items-center">
              <div className="bg-[#e5f8ef] flex items-center justify-center rounded-[5px] shrink-0 size-[24px]">
                <Banknote className="size-[14px] text-[#14b97c]" />
              </div>
              <div className="flex flex-1 flex-col leading-none">
                <span className="font-bold text-[#173251] text-[8px]">INV-0240</span>
                <span className="text-[#8192a5] text-[6px]">ABC Restaurant</span>
              </div>
              <div className="flex flex-col items-end leading-none gap-px">
                <span className="font-bold text-[#173251] text-[8px]">Rp 10.000.000</span>
                <span className="bg-[#e5f8ef] text-[#14b97c] font-bold text-[7px] px-[4px] py-px rounded">
                  Lunas
                </span>
              </div>
            </div>

            {/* Payment 2 */}
            <div className="flex gap-[6px] h-[28px] items-center">
              <div className="bg-[#fff3df] flex items-center justify-center rounded-[5px] shrink-0 size-[24px]">
                <CreditCard className="size-[14px] text-[#f69b23]" />
              </div>
              <div className="flex flex-1 flex-col leading-none">
                <span className="font-bold text-[#173251] text-[8px]">INV-0241</span>
                <span className="text-[#8192a5] text-[6px]">Budi Sejahtera</span>
              </div>
              <div className="flex flex-col items-end leading-none gap-px">
                <span className="font-bold text-[#173251] text-[8px]">Rp 7.500.000</span>
                <span className="bg-[#fff3df] text-[#f69b23] font-bold text-[7px] px-[4px] py-px rounded">
                  Menunggu Pembayaran
                </span>
              </div>
            </div>

            {/* Payment 3 */}
            <div className="flex gap-[6px] h-[28px] items-center">
              <div className="bg-[#e8f3ff] flex items-center justify-center rounded-[5px] shrink-0 size-[24px]">
                <FileText className="size-[14px] text-[#1688f8]" />
              </div>
              <div className="flex flex-1 flex-col leading-none">
                <span className="font-bold text-[#173251] text-[8px]">INV-0242</span>
                <span className="text-[#8192a5] text-[6px]">PT FreshMart</span>
              </div>
              <div className="flex flex-col items-end leading-none gap-px">
                <span className="font-bold text-[#173251] text-[8px]">Rp 12.500.000</span>
                <span className="bg-[#e8f3ff] text-[#1688f8] font-bold text-[7px] px-[4px] py-px rounded">
                  Belum Lunas
                </span>
              </div>
            </div>

            {/* Payment 4 */}
            <div className="flex gap-[6px] h-[28px] items-center">
              <div className="bg-[#e8f3ff] flex items-center justify-center rounded-[5px] shrink-0 size-[24px]">
                <FileText className="size-[14px] text-[#1688f8]" />
              </div>
              <div className="flex flex-1 flex-col leading-none">
                <span className="font-bold text-[#173251] text-[8px]">INV-0243</span>
                <span className="text-[#8192a5] text-[6px]">Warung Laut</span>
              </div>
              <div className="flex flex-col items-end leading-none gap-px">
                <span className="font-bold text-[#173251] text-[8px]">Rp 5.000.000</span>
                <span className="bg-[#e8f3ff] text-[#1688f8] font-bold text-[7px] px-[4px] py-px rounded">
                  Belum Jatuh Tempo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
