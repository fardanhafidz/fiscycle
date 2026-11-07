'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

function MitraTokenForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyMitraToken = useAuthStore((state) => state.verifyMitraToken);

  const initialToken = searchParams.get('token') || 'FSC-FARM-0028';
  const initialContact = searchParams.get('contact') || '0812 3456 7890';

  const [token, setToken] = useState(initialToken);
  const [contact, setContact] = useState(initialContact);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanToken = token.trim().toUpperCase();
    const cleanContact = contact.trim();

    if (!cleanToken) {
      toast.error('Masukkan Token Mitra Anda');
      return;
    }

    if (!cleanContact || cleanContact.length < 6) {
      toast.error('Masukkan nomor HP atau email yang valid');
      return;
    }

    setIsSubmitting(true);
    const isValid = verifyMitraToken(cleanToken, cleanContact);

    if (isValid) {
      toast.success('Token mitra valid, kode verifikasi dikirimkan!');
      router.push(
        `/auth/mitra/verify?token=${encodeURIComponent(cleanToken)}&contact=${encodeURIComponent(cleanContact)}`
      );
    } else {
      // In demo mode, still allow proceed if token starts with FSC
      if (cleanToken.startsWith('FSC-')) {
        toast.success('Token mitra valid, kode verifikasi dikirimkan!');
        router.push(
          `/auth/mitra/verify?token=${encodeURIComponent(cleanToken)}&contact=${encodeURIComponent(cleanContact)}`
        );
      } else {
        toast.error('Format token tidak valid. Gunakan format FSC-FARM-XXXX');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between pb-8 select-none"
      data-node-id="18:59"
      data-name="Masukkan Token Mitra"
    >
      <div>
        {/* Navigation Header */}
        <div
          className="h-[56px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="25:49"
          data-name="Navigation"
        >
          <Link
            href="/auth/mitra"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="25:50"
            data-name="arrow-left"
          >
            <ArrowLeft className="size-[18px]" />
          </Link>

          <div
            className="flex items-center justify-center flex-1 max-w-[276px] mx-auto"
            data-node-id="29:3"
            data-name="Progress"
          >
            <div className="relative w-[276px] h-[13px]">
              <Image
                src="/images/progress-mitra-token.svg"
                alt="Progres"
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
        <div className="flex flex-col gap-[20px] items-start pt-[20px] px-[20px] w-full">
          {/* Introduction */}
          <div
            className="flex flex-col gap-[10px] items-center text-center w-full"
            data-node-id="18:68"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[22px] text-[#172b59] leading-[1.2] font-sans"
              data-node-id="18:69"
            >
              Aktivasi Akun Mitra
            </h1>
            <p
              className="font-normal text-[13.5px] text-[#7d8b9e] leading-[1.4] font-sans"
              data-node-id="18:70"
            >
              Masukkan token mitra dan nomor HP / email yang terdaftar untuk
              melanjutkan.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[20px] items-start w-full pt-[6px]"
          >
            {/* Field: Token Mitra */}
            <div
              className="flex flex-col gap-[8px] items-start w-full"
              data-node-id="18:71"
              data-name="Account field"
            >
              <label
                htmlFor="tokenInput"
                className="font-bold text-[#172b59] text-[15px] font-sans"
                data-node-id="18:72"
              >
                Token Mitra
              </label>
              <div
                className="border border-[#e3e8ec] flex gap-[14px] h-[56px] items-center px-[16px] rounded-[8px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all bg-white"
                data-node-id="18:73"
                data-name="Input"
              >
                <div className="relative size-[22px] shrink-0" data-node-id="18:136">
                  <Image
                    src="/images/icon-key-round.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <input
                  id="tokenInput"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value.toUpperCase())}
                  placeholder="FSC-FARM-0028"
                  className="w-full bg-transparent font-medium text-[#35465d] text-[16px] tracking-wide outline-none font-sans placeholder:text-[#a0acb9]"
                  data-node-id="18:75"
                />
              </div>
              <p
                className="font-normal text-[#7d8b9e] text-[12px] font-sans"
                data-node-id="18:76"
              >
                Contoh: FSC-FARM-0028
              </p>
            </div>

            {/* Field: Kontak Terdaftar */}
            <div
              className="flex flex-col gap-[8px] items-start w-full"
              data-node-id="18:77"
              data-name="Account field"
            >
              <label
                htmlFor="contactInput"
                className="font-bold text-[#172b59] text-[15px] font-sans"
                data-node-id="18:78"
              >
                Nomor HP / Email Terdaftar
              </label>
              <div
                className="border border-[#e3e8ec] flex gap-[14px] h-[56px] items-center px-[16px] rounded-[8px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all bg-white"
                data-node-id="18:79"
                data-name="Input"
              >
                <div className="relative size-[22px] shrink-0" data-node-id="18:139">
                  <Image
                    src="/images/icon-mail-slate.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <input
                  id="contactInput"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="0812 3456 7890"
                  className="w-full bg-transparent font-medium text-[#35465d] text-[16px] outline-none font-sans placeholder:text-[#a0acb9]"
                  data-node-id="18:81"
                />
              </div>
              <p
                className="font-normal text-[#7d8b9e] text-[12px] leading-[1.4] font-sans"
                data-node-id="18:82"
              >
                Gunakan nomor HP atau email yang sudah terdaftar di Fiscycle.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#00566b] flex h-[54px] items-center justify-center rounded-[8px] w-full text-white font-semibold text-[16.5px] hover:bg-[#004758] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-[6px] disabled:opacity-50"
              data-node-id="18:83"
              data-name="Primary action"
            >
              <span data-node-id="18:84">
                {isSubmitting ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
              </span>
            </button>

            {/* Token Info Box */}
            <div
              className="bg-[#e4f4fe] flex gap-[14px] items-center p-[16px] rounded-[9px] w-full mt-[12px]"
              data-node-id="18:85"
              data-name="Token information"
            >
              <div
                className="bg-[#2698d7] flex items-center justify-center rounded-full shrink-0 size-[25px]"
                data-node-id="18:86"
              >
                <span className="font-bold text-white text-[16px] font-sans leading-none">
                  i
                </span>
              </div>
              <p
                className="flex-1 font-semibold text-[#35465d] text-[12px] leading-[1.45] font-sans"
                data-node-id="18:88"
              >
                Token Mitra diberikan oleh tim Fiscycle setelah mitra resmi
                terdaftar.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function MasukkanTokenMitraPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-[#7d8b9e]">
          Memuat formulir aktivasi token...
        </div>
      }
    >
      <MitraTokenForm />
    </Suspense>
  );
}
