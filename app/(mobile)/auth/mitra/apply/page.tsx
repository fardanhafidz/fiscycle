'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminStore } from '@/store/useAdminStore';
import type { FishSpecies } from '@/lib/types';

const SPECIES_OPTIONS: FishSpecies[] = ['Nila', 'Bandeng', 'Lele', 'Udang Vaname'];
const SCALE_OPTIONS = [
  'Mikro (< 2 kolam)',
  'Kecil (2 - 5 kolam)',
  'Menengah (6 - 15 kolam)',
  'Besar (> 15 kolam)',
];

export default function FormPengajuanCalonMitra() {
  const router = useRouter();
  const { createLeadFromApplication } = useAdminStore();

  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [fishSpecies, setFishSpecies] = useState('');
  const [pondCount, setPondCount] = useState('');
  const [businessScale, setBusinessScale] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fullName.trim().length < 3) {
      toast.error('Masukkan nama lengkap sesuai KTP');
      return;
    }

    if (whatsapp.trim().length < 8) {
      toast.error('Masukkan nomor WhatsApp yang valid');
      return;
    }

    if (!farmName.trim()) {
      toast.error('Masukkan nama usaha atau tambak');
      return;
    }

    if (!farmLocation.trim()) {
      toast.error('Masukkan lokasi tambak Anda');
      return;
    }

    if (!fishSpecies) {
      toast.error('Pilih jenis ikan yang dibudidayakan');
      return;
    }

    setIsSubmitting(true);

    try {
      createLeadFromApplication({
        ownerName: fullName.trim(),
        farmName: farmName.trim(),
        city: farmLocation.trim().split(',')[0]?.trim() || 'Lamongan',
        province: 'Jawa Timur',
        phone: whatsapp.trim().startsWith('0') ? whatsapp.trim() : `0${whatsapp.trim()}`,
        email: `${fullName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        areaM2: 2000,
        pondCount: pondCount ? parseInt(pondCount, 10) || 4 : 4,
        primarySpecies: (fishSpecies as FishSpecies) || 'Nila',
      });

      toast.success('Pengajuan kemitraan berhasil dikirim!');
      router.push('/auth/mitra/apply/success');
    } catch {
      toast.error('Gagal mengirim pengajuan, silakan coba lagi');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between pb-8 select-none"
      data-node-id="13:1453"
      data-name="Form Pengajuan Calon Mitra"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[66px] px-[22px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="25:43"
          data-name="Navigation"
        >
          <Link
            href="/auth/mitra"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="25:44"
            data-name="arrow-left"
          >
            <ArrowLeft className="size-[18px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="25:46"
            data-name="Brand"
          >
            <div className="relative w-[87px] h-[36px]" data-node-id="25:47">
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

          <div className="size-[24px]" />
        </div>

        {/* Content Section */}
        <div
          className="flex flex-col gap-[20px] items-start pt-[10px] px-[20px] w-full"
          data-node-id="13:1460"
          data-name="Application"
        >
          {/* Introduction */}
          <div
            className="flex flex-col gap-[6px] items-center text-center w-full"
            data-node-id="13:1461"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[24px] text-[#163252] leading-normal font-sans"
              data-node-id="13:1462"
            >
              Pengajuan Calon Mitra
            </h1>
            <p
              className="font-normal text-[12px] text-[#8492a2] leading-[1.35] font-sans"
              data-node-id="13:1463"
            >
              Lengkapi data berikut agar tim Fiscycle bisa menghubungimu.
            </p>
          </div>

          {/* Application Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[18px] items-start w-full"
            data-node-id="13:1464"
            data-name="Application fields"
          >
            {/* Field: Nama Lengkap */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1465"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1466"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1657">
                  <Image
                    src="/images/icon-user-round.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1468"
                data-name="Field content"
              >
                <label
                  htmlFor="fullName"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1469"
                >
                  Nama Lengkap
                </label>
                <div
                  className="bg-[#fafbfc] border border-[#e8edf1] flex h-[38px] items-center px-[9px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1470"
                  data-name="Input"
                >
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sesuai KTP Anda"
                    className="w-full bg-transparent text-[12px] text-[#283d55] placeholder:text-[#8492a2] outline-none font-sans"
                    data-node-id="13:1471"
                  />
                </div>
              </div>
            </div>

            {/* Field: Nomor WhatsApp */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1472"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1473"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1660">
                  <Image
                    src="/images/icon-phone-teal.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1475"
                data-name="Field content"
              >
                <label
                  htmlFor="whatsapp"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1476"
                >
                  Nomor WhatsApp
                </label>
                <div
                  className="bg-[#fafbfc] border border-[#e8edf1] flex h-[38px] items-center px-[9px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1477"
                  data-name="Input"
                >
                  <input
                    id="whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Contoh: 0812 3456 7890"
                    className="w-full bg-transparent text-[12px] text-[#283d55] placeholder:text-[#8492a2] outline-none font-sans"
                    data-node-id="13:1478"
                  />
                </div>
              </div>
            </div>

            {/* Field: Nama Usaha / Tambak */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1479"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1480"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1663">
                  <Image
                    src="/images/icon-warehouse.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1482"
                data-name="Field content"
              >
                <label
                  htmlFor="farmName"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1483"
                >
                  Nama Usaha / Tambak
                </label>
                <div
                  className="bg-[#fafbfc] border border-[#e8edf1] flex h-[38px] items-center px-[9px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1484"
                  data-name="Input"
                >
                  <input
                    id="farmName"
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="Contoh: Tambak Jaya"
                    className="w-full bg-transparent text-[12px] text-[#283d55] placeholder:text-[#8492a2] outline-none font-sans"
                    data-node-id="13:1485"
                  />
                </div>
              </div>
            </div>

            {/* Field: Lokasi Tambak */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1486"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1487"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1666">
                  <Image
                    src="/images/icon-map-pin.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1489"
                data-name="Field content"
              >
                <label
                  htmlFor="farmLocation"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1490"
                >
                  Lokasi Tambak
                </label>
                <div
                  className="bg-[#fafbfc] border border-[#e8edf1] flex h-[38px] items-center px-[9px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1491"
                  data-name="Input"
                >
                  <input
                    id="farmLocation"
                    type="text"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    placeholder="Kabupaten, kecamatan, atau alamat"
                    className="w-full bg-transparent text-[12px] text-[#283d55] placeholder:text-[#8492a2] outline-none font-sans"
                    data-node-id="13:1492"
                  />
                </div>
              </div>
            </div>

            {/* Field: Jenis Ikan yang Dibudidayakan */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1493"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1494"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1669">
                  <Image
                    src="/images/icon-fish-blue.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1496"
                data-name="Field content"
              >
                <label
                  htmlFor="fishSpecies"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1497"
                >
                  Jenis Ikan yang Dibudidayakan
                </label>
                <div
                  className="relative bg-[#fafbfc] border border-[#e8edf1] flex h-[38px] items-center px-[9px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1498"
                  data-name="Input"
                >
                  <select
                    id="fishSpecies"
                    value={fishSpecies}
                    onChange={(e) => setFishSpecies(e.target.value)}
                    className="w-full bg-transparent text-[12px] text-[#283d55] outline-none font-sans appearance-none cursor-pointer pr-6"
                    data-node-id="13:1499"
                  >
                    <option value="" disabled className="text-[#8492a2]">
                      Pilih jenis ikan
                    </option>
                    {SPECIES_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div
                    className="absolute right-[9px] pointer-events-none text-[#8492a2]"
                    data-node-id="13:1672"
                  >
                    <ChevronDown className="size-[14px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Field: Jumlah Kolam */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1501"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1502"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1675">
                  <Image
                    src="/images/icon-clipboard-list.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1504"
                data-name="Field content"
              >
                <label
                  htmlFor="pondCount"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1505"
                >
                  Jumlah Kolam (jika sudah ada)
                </label>
                <div
                  className="bg-[#fafbfc] border border-[#e8edf1] flex h-[38px] items-center px-[9px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1506"
                  data-name="Input"
                >
                  <input
                    id="pondCount"
                    type="number"
                    min="1"
                    value={pondCount}
                    onChange={(e) => setPondCount(e.target.value)}
                    placeholder="Contoh: 5"
                    className="w-full bg-transparent text-[12px] text-[#283d55] placeholder:text-[#8492a2] outline-none font-sans"
                    data-node-id="13:1507"
                  />
                </div>
              </div>
            </div>

            {/* Field: Skala Usaha Budidaya */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1508"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1509"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1678">
                  <Image
                    src="/images/icon-chart.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1511"
                data-name="Field content"
              >
                <label
                  htmlFor="businessScale"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1512"
                >
                  Skala Usaha Budidaya
                </label>
                <div
                  className="relative bg-[#fafbfc] border border-[#e8edf1] flex h-[38px] items-center px-[9px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1513"
                  data-name="Input"
                >
                  <select
                    id="businessScale"
                    value={businessScale}
                    onChange={(e) => setBusinessScale(e.target.value)}
                    className="w-full bg-transparent text-[12px] text-[#283d55] outline-none font-sans appearance-none cursor-pointer pr-6"
                    data-node-id="13:1514"
                  >
                    <option value="" disabled className="text-[#8492a2]">
                      Pilih skala
                    </option>
                    {SCALE_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div
                    className="absolute right-[9px] pointer-events-none text-[#8492a2]"
                    data-node-id="13:1681"
                  >
                    <ChevronDown className="size-[14px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Field: Catatan Tambahan (opsional) */}
            <div
              className="flex gap-[12px] items-start w-full"
              data-node-id="13:1516"
              data-name="Form field"
            >
              <div
                className="flex flex-col items-start pt-[3px] shrink-0 w-[22px]"
                data-node-id="13:1517"
                data-name="Field symbol"
              >
                <div className="relative size-[20px]" data-node-id="13:1684">
                  <Image
                    src="/images/icon-message.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                data-node-id="13:1519"
                data-name="Field content"
              >
                <label
                  htmlFor="additionalNotes"
                  className="font-bold text-[#3c536c] text-[12.5px] font-sans"
                  data-node-id="13:1520"
                >
                  Catatan Tambahan (opsional)
                </label>
                <div
                  className="bg-[#fafbfc] border border-[#e8edf1] flex min-h-[64px] items-start px-[9px] py-[7px] rounded-[4px] w-full focus-within:border-[#006a8a] focus-within:bg-white transition-all"
                  data-node-id="13:1521"
                  data-name="Input"
                >
                  <textarea
                    id="additionalNotes"
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Tulis informasi tambahan di sini..."
                    className="w-full bg-transparent text-[12px] text-[#283d55] placeholder:text-[#8492a2] outline-none font-sans resize-none"
                    data-node-id="13:1522"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#006a8a] to-[#0dae94] flex gap-[10px] h-[47px] items-center justify-center rounded-[7px] w-full text-white font-bold text-[15px] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm mt-[6px] disabled:opacity-50"
              data-node-id="13:1523"
              data-name="Button"
            >
              <div className="relative size-[20px]" data-node-id="13:1687">
                <Image
                  src="/images/icon-send-white.svg"
                  alt=""
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <span data-node-id="13:1525">
                {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
              </span>
            </button>

            {/* Privacy Assurance */}
            <div
              className="flex gap-[10px] items-start w-full pt-[2px]"
              data-node-id="13:1526"
              data-name="Privacy assurance"
            >
              <div
                className="relative size-[18px] shrink-0 pt-0.5"
                data-node-id="13:1690"
              >
                <Image
                  src="/images/icon-lock-keyhole.svg"
                  alt=""
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <p
                className="flex-1 font-normal text-[10.5px] text-[#8492a2] leading-[1.35] font-sans"
                data-node-id="13:1528"
              >
                Data kamu akan disimpan oleh Fiscycle dan digunakan untuk proses
                pengajuan kemitraan.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
