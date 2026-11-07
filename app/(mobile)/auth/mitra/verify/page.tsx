'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

function MitraVerifyForm() {
  const router = useRouter();
  const verifyMitraOtp = useAuthStore((state) => state.verifyMitraOtp);

  // Figma default OTP demo digits: 1, 7, 7, 0, 1, 3
  const [digits, setDigits] = useState<string[]>(['1', '7', '7', '0', '1', '3']);
  const [countdown, setCountdown] = useState<number>(28);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleDigitChange = (index: number, val: string) => {
    const char = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setDigits(newDigits);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');

    if (code.length < 6) {
      toast.error('Masukkan 6 digit kode verifikasi');
      return;
    }

    setIsSubmitting(true);
    const ok = verifyMitraOtp(code);

    if (ok || code === '177013') {
      toast.success('Akun mitra berhasil diverifikasi!');
      // Navigate to Screen 11 (Selamat Datang, Mitra Disetujui)
      router.push('/mitra/onboarding');
    } else {
      toast.error('Kode verifikasi salah (Gunakan kode demo: 177013 atau 123456)');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between pb-8 select-none"
      data-node-id="18:90"
      data-name="Verifikasi"
    >
      <div>
        {/* Navigation */}
        <div
          className="h-[56px] px-[20px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="25:55"
          data-name="Navigation"
        >
          <Link
            href="/auth/mitra/token"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="25:56"
            data-name="arrow-left"
          >
            <ArrowLeft className="size-[18px]" />
          </Link>

          <div
            className="flex items-center justify-center flex-1 max-w-[276px] mx-auto"
            data-node-id="29:13"
            data-name="Progress"
          >
            <div className="relative w-[276px] h-[13px]">
              <Image
                src="/images/progress-mitra-verify.svg"
                alt="Progres Verifikasi"
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
        <div className="flex flex-col gap-[16px] items-center pt-[20px] px-[20px] w-full">
          {/* Introduction */}
          <div
            className="flex flex-col gap-[8px] items-center text-center w-full"
            data-node-id="18:99"
            data-name="Introduction"
          >
            <h1
              className="font-bold text-[22px] text-[#172b59] leading-[1.2] font-sans"
              data-node-id="18:100"
            >
              Verifikasi Akun Mitra
            </h1>
            <p
              className="font-normal text-[13.5px] text-[#7d8b9e] leading-[1.4] font-sans"
              data-node-id="18:101"
            >
              Masukkan kode verifikasi yang dikirim ke nomor HP / email terdaftar.
            </p>
          </div>

          {/* Verification Symbol Circle */}
          <div
            className="bg-[#e4f4fe] flex items-center justify-center rounded-full size-[76px] my-[10px]"
            data-node-id="18:102"
            data-name="Verification symbol"
          >
            <div className="relative size-[34px]" data-node-id="18:151">
              <Image
                src="/images/icon-mail-blue.svg"
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleVerify}
            className="flex flex-col gap-[18px] items-center w-full"
          >
            {/* 6 Digit Input Boxes */}
            <div
              className="flex gap-[8px] items-center justify-between w-full"
              data-node-id="18:104"
              data-name="Verification code"
            >
              {digits.map((digit, idx) => (
                <div
                  key={idx}
                  className="border-[1.5px] border-[#e3e8ec] flex flex-1 h-[64px] items-center justify-center rounded-[6px] focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all bg-white"
                  data-node-id={`18:10${5 + idx}`}
                  data-name="Code digit"
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className="w-full text-center font-bold text-[#172b59] text-[22px] bg-transparent outline-none font-sans"
                    data-node-id={`18:10${6 + idx}`}
                  />
                </div>
              ))}
            </div>

            {/* Resend Code Section */}
            <div
              className="flex flex-col gap-[4px] items-center text-center font-sans pt-[4px]"
              data-node-id="18:117"
              data-name="Resend code"
            >
              <p
                className="font-normal text-[#7d8b9e] text-[13.5px]"
                data-node-id="18:118"
              >
                Tidak menerima kode?
              </p>
              <button
                type="button"
                onClick={() => {
                  if (countdown === 0) {
                    setCountdown(30);
                    toast.success('Kode baru telah dikirimkan ulang');
                  }
                }}
                disabled={countdown > 0}
                className="font-semibold text-[#2698d7] text-[13.5px] hover:underline cursor-pointer disabled:cursor-default"
                data-node-id="18:119"
              >
                {countdown > 0
                  ? `Kirim ulang (00:${countdown < 10 ? `0${countdown}` : countdown})`
                  : 'Kirim ulang sekarang'}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#00566b] flex h-[54px] items-center justify-center rounded-[8px] w-full text-white font-semibold text-[17px] hover:bg-[#004758] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-[10px] disabled:opacity-50"
              data-node-id="18:120"
              data-name="Primary action"
            >
              <span data-node-id="18:121">
                {isSubmitting ? 'Memverifikasi...' : 'Verifikasi'}
              </span>
            </button>

            {/* Activation Confirmation Banner */}
            <div
              className="bg-[#e1f7f3] flex gap-[14px] items-center p-[15px] rounded-[9px] w-full mt-[10px]"
              data-node-id="18:122"
              data-name="Activation confirmation"
            >
              <div
                className="bg-[#08b784] flex items-center justify-center rounded-full shrink-0 size-[32px] shadow-2xs"
                data-node-id="18:123"
              >
                <div className="relative size-[20px]" data-node-id="18:154">
                  <Image
                    src="/images/icon-check-white.svg"
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <p
                className="flex-1 font-semibold text-[#35465d] text-[13.5px] leading-[1.4] font-sans text-left"
                data-node-id="18:125"
              >
                Token Mitra valid → akun berhasil diverifikasi.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function MitraVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-[#7d8b9e]">
          Memuat halaman verifikasi...
        </div>
      }
    >
      <MitraVerifyForm />
    </Suspense>
  );
}
