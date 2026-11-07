'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  MoreVertical,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

interface PondItem {
  id: string;
  name: string;
  species: string;
  area: string;
}

const INITIAL_PONDS: PondItem[] = [
  { id: 'p1', name: 'Kolam 1', species: 'Ikan Vaname', area: '0,5 ha' },
  { id: 'p2', name: 'Kolam 2', species: 'Ikan Vaname', area: '0,5 ha' },
  { id: 'p3', name: 'Kolam 3', species: 'Ikan Nila', area: '0,4 ha' },
];

export default function DataKolam() {
  const router = useRouter();
  const [ponds, setPonds] = useState<PondItem[]>(INITIAL_PONDS);
  const [newPondName, setNewPondName] = useState('Kolam 4');
  const [newPondSpecies, setNewPondSpecies] = useState('Vaname');
  const [newPondArea, setNewPondArea] = useState('0,5');
  const [newPondWater, setNewPondWater] = useState('Air Laut');

  const handleAddPond = () => {
    if (!newPondName.trim()) {
      toast.error('Masukkan nama kolam');
      return;
    }
    const nextItem: PondItem = {
      id: `p${ponds.length + 1}`,
      name: newPondName.trim(),
      species: `Ikan ${newPondSpecies}`,
      area: `${newPondArea} ha`,
    };
    setPonds([...ponds, nextItem]);
    setNewPondName(`Kolam ${ponds.length + 2}`);
    toast.success('Kolam berhasil ditambahkan!');
  };

  const handleContinue = () => {
    toast.success('Data kolam tersimpan!');
    router.push('/mitra/onboarding/installation');
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
      data-node-id="32:4896"
      data-name="Data Kolam"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="32:4903"
          data-name="Navigation"
        >
          <Link
            href="/mitra/onboarding/business"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="32:5324"
            data-name="chevron-left"
          >
            <ChevronLeft className="size-[20px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="79:16"
            data-name="Brand"
          >
            <div className="relative w-[87px] h-[36px]">
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

          <div className="relative size-[17px] opacity-75" data-node-id="32:5327">
            <Image
              src="/images/icon-hourglass.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        {/* Content Section */}
        <div
          className="flex flex-col gap-[14px] items-start pt-[14px] px-[20px] w-full"
          data-node-id="32:4907"
          data-name="Pond information"
        >
          {/* Header Title */}
          <div
            className="flex flex-col gap-[4px] items-start w-full font-sans"
            data-node-id="32:4908"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[#173653] text-[21px] leading-tight"
              data-node-id="32:4909"
            >
              Data Kolam
            </h1>
            <p
              className="font-normal text-[#6f8191] text-[13px] leading-normal"
              data-node-id="32:4910"
            >
              Tambahkan data kolam pada tambak Anda.
            </p>
          </div>

          {/* Existing Pond Cards */}
          <div
            className="flex flex-col gap-[8px] items-start w-full font-sans"
            data-node-id="32:4911"
            data-name="Pond list"
          >
            {ponds.map((pond) => (
              <div
                key={pond.id}
                className="bg-white border border-[#d9e4ea] flex gap-[12px] h-[66px] items-center p-[12px] rounded-[10px] w-full shadow-2xs"
                data-node-id="32:4912"
                data-name="Pond card"
              >
                <div className="relative size-[28px] shrink-0" data-node-id="32:5330">
                  <Image
                    src="/images/icon-waves.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>

                <div
                  className="flex flex-1 flex-col gap-[2px] items-start min-w-0"
                  data-node-id="32:4914"
                  data-name="Pond detail"
                >
                  <p
                    className="font-bold text-[#173653] text-[13px] leading-tight"
                    data-node-id="32:4915"
                  >
                    {pond.name}
                  </p>
                  <p
                    className="font-normal text-[#6f8191] text-[11.5px] leading-tight"
                    data-node-id="32:4916"
                  >
                    {pond.species}
                  </p>
                </div>

                <span
                  className="font-normal text-[#173653] text-[12px] whitespace-nowrap mr-1"
                  data-node-id="32:4917"
                >
                  {pond.area}
                </span>

                <button
                  type="button"
                  className="text-[#96a0af] hover:text-[#283d55] transition-colors p-1"
                >
                  <MoreVertical className="size-[16px]" />
                </button>
              </div>
            ))}
          </div>

          {/* Tambah Kolam Outline Button */}
          <button
            type="button"
            onClick={handleAddPond}
            className="bg-white border border-[#008d91] flex gap-[8px] h-[39px] items-center justify-center rounded-[7px] w-full text-[#008d91] font-semibold text-[13px] hover:bg-[#edfcf8] active:scale-[0.99] transition-all cursor-pointer shadow-2xs"
            data-node-id="32:4933"
            data-name="Add pond"
          >
            <Plus className="size-[16px]" />
            <span data-node-id="32:4935">Tambah Kolam</span>
          </button>

          {/* Form Tambah Kolam Baru */}
          <div
            className="bg-[#eff7fa] flex flex-col gap-[10px] items-start p-[14px] rounded-[10px] w-full font-sans mt-1"
            data-node-id="32:4936"
            data-name="New pond form"
          >
            <p
              className="font-bold text-[#173653] text-[13px] leading-tight"
              data-node-id="32:4937"
            >
              Tambah Kolam Baru
            </p>

            {/* Field: Nama Kolam */}
            <div
              className="flex flex-col gap-[4px] items-start w-full"
              data-node-id="32:4938"
            >
              <label
                htmlFor="newPondName"
                className="font-semibold text-[#173653] text-[11px]"
                data-node-id="32:4939"
              >
                Nama kolam
              </label>
              <div
                className="bg-white border border-[#d9e4ea] flex items-center h-[36px] px-[10px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4940"
              >
                <input
                  id="newPondName"
                  type="text"
                  value={newPondName}
                  onChange={(e) => setNewPondName(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[12px] outline-none"
                  data-node-id="32:4941"
                />
              </div>
            </div>

            {/* Field: Jenis Ikan */}
            <div
              className="flex flex-col gap-[4px] items-start w-full"
              data-node-id="32:4942"
            >
              <label
                htmlFor="newPondSpecies"
                className="font-semibold text-[#173653] text-[11px]"
                data-node-id="32:4943"
              >
                Jenis ikan
              </label>
              <div
                className="relative bg-white border border-[#d9e4ea] flex items-center h-[36px] px-[10px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4944"
              >
                <select
                  id="newPondSpecies"
                  value={newPondSpecies}
                  onChange={(e) => setNewPondSpecies(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[12px] outline-none appearance-none cursor-pointer pr-6"
                  data-node-id="32:4945"
                >
                  <option value="Vaname">Vaname</option>
                  <option value="Nila">Nila</option>
                  <option value="Bandeng">Bandeng</option>
                  <option value="Lele">Lele</option>
                </select>
                <div
                  className="absolute right-[10px] pointer-events-none text-[#6f8191]"
                  data-node-id="32:5351"
                >
                  <ChevronDown className="size-[15px]" />
                </div>
              </div>
            </div>

            {/* Field: Luas Kolam */}
            <div
              className="flex flex-col gap-[4px] items-start w-full"
              data-node-id="32:4947"
            >
              <label
                htmlFor="newPondArea"
                className="font-semibold text-[#173653] text-[11px]"
                data-node-id="32:4948"
              >
                Luas kolam (hektar)
              </label>
              <div
                className="bg-white border border-[#d9e4ea] flex gap-[8px] items-center h-[36px] px-[10px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                data-node-id="32:4949"
              >
                <input
                  id="newPondArea"
                  type="text"
                  value={newPondArea}
                  onChange={(e) => setNewPondArea(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[12px] outline-none"
                  data-node-id="32:4950"
                />
                <span
                  className="text-[#6f8191] text-[11.5px] shrink-0"
                  data-node-id="32:4951"
                >
                  ha
                </span>
              </div>
            </div>

            {/* Field: Sumber Air & Continue Button Row */}
            <div
              className="flex gap-[12px] items-end w-full pt-[2px]"
              data-node-id="32:4952"
            >
              <div
                className="flex flex-1 flex-col gap-[4px] items-start"
                data-node-id="32:4953"
              >
                <label
                  htmlFor="newPondWater"
                  className="font-semibold text-[#173653] text-[11px]"
                  data-node-id="32:4955"
                >
                  Sumber air
                </label>
                <div
                  className="relative bg-white border border-[#d9e4ea] flex items-center h-[46px] px-[10px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all"
                  data-node-id="32:4956"
                >
                  <select
                    id="newPondWater"
                    value={newPondWater}
                    onChange={(e) => setNewPondWater(e.target.value)}
                    className="w-full bg-transparent text-[#173653] text-[12px] outline-none appearance-none cursor-pointer pr-6"
                    data-node-id="32:4957"
                  >
                    <option value="Air Laut">Air Laut</option>
                    <option value="Air Tawar">Air Tawar</option>
                    <option value="Air Payau">Air Payau</option>
                  </select>
                  <div
                    className="absolute right-[10px] pointer-events-none text-[#6f8191]"
                    data-node-id="32:5354"
                  >
                    <ChevronDown className="size-[15px]" />
                  </div>
                </div>
              </div>

              {/* Lanjutkan Action Button */}
              <button
                type="button"
                onClick={handleContinue}
                className="bg-[#008d91] flex gap-[8px] h-[46px] items-center justify-center rounded-[7px] px-5 text-white font-semibold text-[13.5px] hover:bg-[#007b7f] active:scale-[0.99] transition-all cursor-pointer shadow-sm shrink-0"
                data-node-id="32:4960"
                data-name="Action"
              >
                <span data-node-id="32:4961">Lanjutkan</span>
                <ArrowRight className="size-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
