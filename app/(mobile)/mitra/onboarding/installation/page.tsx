'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

function InstalasiFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Screen 14 vs 15 view state (supports ?scheduled=true for review)
  const [isScheduled, setIsScheduled] = useState(
    () => searchParams.get('scheduled') === 'true'
  );

  // Form states for Screen 14
  const [date, setDate] = useState('18 Juli 2025');
  const [timeSlot, setTimeSlot] = useState('09:00 - 12:00 WIB');
  const [contactPerson, setContactPerson] = useState('Budi (0812-3456-7890)');
  const [notes, setNotes] = useState('');

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduled(true);
    toast.success('Jadwal instalasi berhasil dikonfirmasi!');
  };

  // Screen 15: Instalasi Terjadwal
  if (isScheduled) {
    return (
      <div
        className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
        data-node-id="32:5009"
        data-name="Instalasi Terjadwal"
      >
        <div>
          {/* Navigation Bar */}
          <div
            className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
            data-node-id="32:5016"
            data-name="Navigation"
          >
            <button
              type="button"
              onClick={() => setIsScheduled(false)}
              className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
              data-node-id="32:5399"
              data-name="chevron-left"
            >
              <ChevronLeft className="size-[20px]" />
            </button>

            <div
              className="flex items-center justify-center"
              data-node-id="79:22"
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

            <div className="relative size-[17px] opacity-75">
              <Image
                src="/images/icon-hourglass.svg"
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="flex flex-col gap-[18px] items-center pt-[20px] px-[20px] w-full font-sans"
            data-node-id="32:5020"
            data-name="Scheduled installation"
          >
            {/* Calendar Graphic with Check */}
            <div className="relative size-[110px] flex items-center justify-center">
              <div className="relative size-[90px] opacity-90">
                <Image
                  src="/images/illustration-calendar.svg"
                  alt=""
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#07b18c] flex items-center justify-center rounded-full size-[42px] shadow-sm">
                <Check className="size-[22px] text-white stroke-[3]" />
              </div>
            </div>

            {/* Header Text */}
            <div className="flex flex-col gap-[4px] items-center text-center w-full">
              <h1 className="font-bold text-[#173653] text-[24px] leading-tight">
                Instalasi Terjadwal!
              </h1>
              <p className="font-normal text-[#6f8191] text-[13.5px] leading-normal max-w-[280px]">
                Tim teknisi Fiscycle akan datang sesuai jadwal yang Anda pilih.
              </p>
            </div>

            {/* Appointment Details Box */}
            <div className="bg-white border border-[#d9e4ea] rounded-[10px] p-[16px] flex flex-col gap-[14px] w-full shadow-2xs mt-1">
              <div className="flex gap-[12px] items-center">
                <div className="bg-[#eaf5f8] rounded-full p-2 text-[#008d91]">
                  <Calendar className="size-[17px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#6f8191]">Tanggal</span>
                  <span className="text-[13.5px] font-bold text-[#173653]">
                    Jumat, {date}
                  </span>
                </div>
              </div>

              <div className="flex gap-[12px] items-center">
                <div className="bg-[#eaf5f8] rounded-full p-2 text-[#008d91]">
                  <Clock className="size-[17px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#6f8191]">Waktu</span>
                  <span className="text-[13.5px] font-bold text-[#173653]">
                    {timeSlot}
                  </span>
                </div>
              </div>

              <div className="flex gap-[12px] items-center">
                <div className="bg-[#eaf5f8] rounded-full p-2 text-[#008d91]">
                  <MapPin className="size-[17px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#6f8191]">Lokasi Tambak</span>
                  <span className="text-[13.5px] font-bold text-[#173653]">
                    Tambak Makmur Jaya
                  </span>
                </div>
              </div>

              <div className="flex gap-[12px] items-center">
                <div className="bg-[#eaf5f8] rounded-full p-2 text-[#008d91]">
                  <Phone className="size-[17px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#6f8191]">Kontak Teknisi</span>
                  <span className="text-[13.5px] font-bold text-[#173653]">
                    Pak Joko (Teknisi IoT Fiscycle)
                  </span>
                </div>
              </div>
            </div>

            {/* Reminder Box */}
            <div className="bg-[#eff7fa] rounded-[9px] p-[14px] flex gap-[10px] items-start w-full">
              <span className="bg-[#008d91] text-white rounded-full size-[18px] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                !
              </span>
              <p className="text-[12px] text-[#6f8191] leading-relaxed">
                Pastikan ada perwakilan di lokasi tambak saat teknisi tiba untuk
                mempermudah akses dan pendampingan instalasi.
              </p>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={() => router.push('/mitra/onboarding/status')}
              className="bg-[#008d91] flex gap-[10px] h-[46px] items-center justify-center rounded-[7px] w-full text-white font-semibold text-[14px] hover:bg-[#007b7f] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-2"
            >
              <span>Pantau Status Instalasi</span>
              <ArrowRight className="size-[17px]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 14: Jadwal Instalasi Form
  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-white via-white via-[68%] to-[#edf7fb] flex flex-col justify-between pb-8 select-none"
      data-node-id="32:4964"
      data-name="Jadwal Instalasi"
    >
      <div>
        {/* Navigation Bar */}
        <div
          className="h-[52px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="32:4971"
          data-name="Navigation"
        >
          <Link
            href="/mitra/onboarding/ponds"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="32:5369"
            data-name="chevron-left"
          >
            <ChevronLeft className="size-[20px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="79:20"
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

          <div className="relative size-[17px] opacity-75" data-node-id="32:5372">
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
          className="flex flex-col gap-[20px] items-start pt-[14px] px-[20px] w-full"
          data-node-id="32:4975"
          data-name="Installation appointment"
        >
          {/* Header Title */}
          <div
            className="flex flex-col gap-[4px] items-start w-full font-sans"
            data-node-id="32:4976"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[#173653] text-[21px] leading-tight"
              data-node-id="32:4977"
            >
              Jadwal Instalasi
            </h1>
            <p
              className="font-normal text-[#6f8191] text-[13px] leading-normal"
              data-node-id="32:4978"
            >
              Pilih jadwal yang sesuai untuk instalasi perangkat di lokasi Anda.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleConfirmSchedule}
            className="flex flex-col gap-[16px] items-start w-full font-sans"
          >
            {/* Field: Tanggal Instalasi */}
            <div className="flex flex-col gap-[5px] items-start w-full">
              <label
                htmlFor="installDate"
                className="font-semibold text-[#173653] text-[12px]"
              >
                Tanggal instalasi
              </label>
              <div className="bg-white border border-[#d9e4ea] flex gap-[9px] items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all">
                <div className="relative size-[18px] shrink-0">
                  <Image
                    src="/images/icon-calendar-days.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <input
                  id="installDate"
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none"
                />
              </div>
            </div>

            {/* Field: Waktu Kedatangan */}
            <div className="flex flex-col gap-[5px] items-start w-full">
              <label
                htmlFor="timeSlot"
                className="font-semibold text-[#173653] text-[12px]"
              >
                Waktu kedatangan teknisi
              </label>
              <div className="relative bg-white border border-[#d9e4ea] flex gap-[9px] items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all">
                <div className="relative size-[18px] shrink-0">
                  <Image
                    src="/images/icon-clock.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <select
                  id="timeSlot"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none appearance-none cursor-pointer pr-6"
                >
                  <option value="09:00 - 12:00 WIB">09:00 - 12:00 WIB (Pagi)</option>
                  <option value="13:00 - 16:00 WIB">13:00 - 16:00 WIB (Siang)</option>
                </select>
                <div className="absolute right-[11px] pointer-events-none text-[#6f8191]">
                  <ChevronDown className="size-[16px]" />
                </div>
              </div>
            </div>

            {/* Field: Kontak Lapangan */}
            <div className="flex flex-col gap-[5px] items-start w-full">
              <label
                htmlFor="contactPerson"
                className="font-semibold text-[#173653] text-[12px]"
              >
                Kontak penanggung jawab lapangan
              </label>
              <div className="bg-white border border-[#d9e4ea] flex items-center h-[42px] px-[11px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all">
                <input
                  id="contactPerson"
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-transparent text-[#173653] text-[13px] outline-none"
                />
              </div>
            </div>

            {/* Field: Catatan untuk Teknisi */}
            <div className="flex flex-col gap-[5px] items-start w-full">
              <label
                htmlFor="installNotes"
                className="font-semibold text-[#173653] text-[12px]"
              >
                Catatan untuk teknisi (opsional)
              </label>
              <div className="bg-white border border-[#d9e4ea] flex items-start min-h-[64px] px-[11px] py-[8px] rounded-[7px] w-full focus-within:border-[#008d91] transition-all">
                <textarea
                  id="installNotes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: gerbang masuk warna biru, dll."
                  className="w-full bg-transparent text-[#173653] text-[13px] placeholder:text-[#6f8191] outline-none resize-none"
                />
              </div>
            </div>

            {/* Notice Note */}
            <div className="bg-[#eff7fa] rounded-[8px] p-[12px] flex gap-[10px] items-start w-full mt-1">
              <span className="text-[#008d91] font-bold text-[13px]">💡</span>
              <p className="text-[12px] text-[#6f8191] leading-relaxed">
                Teknisi kami akan membawa semua perangkat sensor dan peralatan yang
                dibutuhkan untuk instalasi dan pengujian langsung.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#008d91] flex gap-[10px] h-[46px] items-center justify-center rounded-[7px] w-full text-white font-semibold text-[14px] hover:bg-[#007b7f] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-3"
            >
              <span>Konfirmasi Jadwal</span>
              <ArrowRight className="size-[17px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function InstalasiFlowPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <InstalasiFlowContent />
    </Suspense>
  );
}
