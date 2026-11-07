'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function DataUsahaTambak() {
  const router = useRouter();

  const [farmName, setFarmName] = useState('Tambak Makmur Jaya');
  const [farmLocation, setFarmLocation] = useState(
    'Desa Pesisir, Kec. Sanden, Kab. Bantul, DIY'
  );
  const [farmArea, setFarmArea] = useState('5');
  const [waterSource, setWaterSource] = useState('Air Laut');
  const [cultivationSystem, setCultivationSystem] = useState('Intensif');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) {
      toast.error('Masukkan nama usaha / tambak');
      return;
    }
    toast.success('Data usaha tambak tersimpan!');
    router.push('/mitra/onboarding/ponds');
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
      data-node-id="32:4847"
      data-name="Data Usaha / Tambak"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="32:4854"
          data-name="Navigation"
        >
          <Link
            href="/mitra/onboarding"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="32:5297"
            data-name="chevron-left"
          >
            <ChevronLeft className="size-[20px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="79:11"
            data-name="Brand"
          >
            <div className="relative w-[87px] h-[36px]" data-node-id="79:12">
              <Image
                src="/images/logo-header.png"
                alt="Fiscycle"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          <div className="relative size-[17px] opacity-75" data-node-id="32:5300">
            <Image
              src="/images/icon-hourglass.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        {/* Form Content */}
        <div
          className="flex flex-col gap-[18px] items-start pt-[14px] px-[20px] w-full"
          data-node-id="32:4858"
          data-name="Business information"
        >
          {/* Header Title */}
          <div
            className="flex flex-col gap-[4px] items-start w-full font-sans"
            data-node-id="32:4859"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[#173653] text-[21px] leading-tight"
              data-node-id="32:4860"
            >
              Data Usaha / Tambak
            </h1>
            <p
              className="font-normal text-[#6f8191] text-[13px] leading-normal"
              data-node-id="32:4861"
            >
              Lengkapi informasi usaha tambak Anda.
            </p>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[18px] items-start w-full font-sans"
            data-node-id="32:4862"
            data-name="Business form"
          >
            {/* Field: Nama Usaha */}
            <div
              className="flex flex-col gap-[5px] items-start w-full"
              data-node-id="32:4863"
              data-name="Form field"
            >
              <label
                htmlFor="farmName"
                className="font-semibold text-[#173653] text-[12px]"
                data-node-id="32:4864"
              >
                Nama usaha / nama tambak
              </label>
              <div
                className="bg-white border border-[#d9e4ea] flex items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4865"
                data-name="Input"
              >
                <input
                  id="farmName"
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none"
                  data-node-id="32:4866"
                />
              </div>
            </div>

            {/* Field: Lokasi Tambak */}
            <div
              className="flex flex-col gap-[5px] items-start w-full"
              data-node-id="32:4867"
              data-name="Form field"
            >
              <label
                htmlFor="farmLocation"
                className="font-semibold text-[#173653] text-[12px]"
                data-node-id="32:4868"
              >
                Lokasi tambak
              </label>
              <div
                className="bg-white border border-[#d9e4ea] flex gap-[9px] items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4869"
                data-name="Input"
              >
                <div className="relative size-[18px] shrink-0" data-node-id="32:5303">
                  <Image
                    src="/images/icon-map-pin-blue.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <input
                  id="farmLocation"
                  type="text"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none truncate"
                  data-node-id="32:4871"
                />
              </div>
            </div>

            {/* Field: Luas Area Tambak */}
            <div
              className="flex flex-col gap-[5px] items-start w-full"
              data-node-id="32:4872"
              data-name="Form field"
            >
              <label
                htmlFor="farmArea"
                className="font-semibold text-[#173653] text-[12px]"
                data-node-id="32:4873"
              >
                Luas area tambak (hektar)
              </label>
              <div
                className="bg-white border border-[#d9e4ea] flex gap-[9px] items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4874"
                data-name="Input"
              >
                <input
                  id="farmArea"
                  type="number"
                  step="0.1"
                  value={farmArea}
                  onChange={(e) => setFarmArea(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none"
                  data-node-id="32:4875"
                />
                <span
                  className="text-[#6f8191] text-[12px] font-sans shrink-0"
                  data-node-id="32:4876"
                >
                  ha
                </span>
              </div>
            </div>

            {/* Field: Sumber Air */}
            <div
              className="flex flex-col gap-[5px] items-start w-full"
              data-node-id="32:4877"
              data-name="Form field"
            >
              <label
                htmlFor="waterSource"
                className="font-semibold text-[#173653] text-[12px]"
                data-node-id="32:4878"
              >
                Sumber air
              </label>
              <div
                className="relative bg-white border border-[#d9e4ea] flex items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4879"
                data-name="Input"
              >
                <select
                  id="waterSource"
                  value={waterSource}
                  onChange={(e) => setWaterSource(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none appearance-none cursor-pointer pr-6"
                  data-node-id="32:4880"
                >
                  <option value="Air Laut">Air Laut</option>
                  <option value="Air Tawar">Air Tawar</option>
                  <option value="Air Payau">Air Payau</option>
                </select>
                <div
                  className="absolute right-[11px] pointer-events-none text-[#6f8191]"
                  data-node-id="32:5306"
                >
                  <ChevronDown className="size-[16px]" />
                </div>
              </div>
            </div>

            {/* Field: Sistem Budidaya */}
            <div
              className="flex flex-col gap-[5px] items-start w-full"
              data-node-id="32:4882"
              data-name="Form field"
            >
              <label
                htmlFor="cultivationSystem"
                className="font-semibold text-[#173653] text-[12px]"
                data-node-id="32:4883"
              >
                Sistem budidaya
              </label>
              <div
                className="relative bg-white border border-[#d9e4ea] flex items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4884"
                data-name="Input"
              >
                <select
                  id="cultivationSystem"
                  value={cultivationSystem}
                  onChange={(e) => setCultivationSystem(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none appearance-none cursor-pointer pr-6"
                  data-node-id="32:4885"
                >
                  <option value="Intensif">Intensif</option>
                  <option value="Semi Intensif">Semi Intensif</option>
                  <option value="Tradisional">Tradisional</option>
                </select>
                <div
                  className="absolute right-[11px] pointer-events-none text-[#6f8191]"
                  data-node-id="32:5309"
                >
                  <ChevronDown className="size-[16px]" />
                </div>
              </div>
            </div>

            {/* Field: Catatan Tambahan */}
            <div
              className="flex flex-col gap-[5px] items-start w-full"
              data-node-id="32:4887"
              data-name="Form field"
            >
              <label
                htmlFor="notes"
                className="font-semibold text-[#173653] text-[12px]"
                data-node-id="32:4888"
              >
                Catatan tambahan (opsional)
              </label>
              <div
                className="bg-white border border-[#d9e4ea] flex items-start min-h-[68px] px-[11px] py-[8px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4889"
                data-name="Input"
              >
                <textarea
                  id="notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: akses jalan, patokan lokasi, dll."
                  className="w-full bg-transparent text-[#173653] text-[13px] placeholder:text-[#6f8191] outline-none resize-none"
                  data-node-id="32:4890"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="bg-[#008d91] flex gap-[10px] h-[46px] items-center justify-center rounded-[7px] w-full text-white font-semibold text-[14px] hover:bg-[#007b7f] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-[14px]"
              data-node-id="32:4892"
              data-name="Action"
            >
              <span data-node-id="32:4893">Simpan dan Lanjutkan</span>
              <ArrowRight className="size-[17px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
