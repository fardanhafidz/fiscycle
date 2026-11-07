'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  UserRound,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

export default function BuatAkunFiscycle() {
  const router = useRouter();
  const { setRegisterDraft, registerDraft } = useAuthStore();

  const [name, setName] = useState(registerDraft?.name ?? '');
  const [phone, setPhone] = useState(registerDraft?.phone ?? '');
  const [email, setEmail] = useState(registerDraft?.email ?? '');
  const [password, setPassword] = useState(registerDraft?.password ?? '');
  const [confirmPassword, setConfirmPassword] = useState(
    registerDraft?.password ?? ''
  );
  const [acceptedTerms, setAcceptedTerms] = useState(
    registerDraft?.acceptedTerms ?? false
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      toast.error('Masukkan nama lengkap (minimal 3 karakter)');
      return;
    }

    if (phone.trim().length < 8) {
      toast.error('Masukkan nomor HP yang valid');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Format alamat email tidak valid');
      return;
    }

    if (password.length < 8) {
      toast.error('Kata sandi minimal 8 karakter');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Konfirmasi kata sandi tidak cocok');
      return;
    }

    if (!acceptedTerms) {
      toast.error('Anda harus menyetujui Syarat dan Ketentuan serta Kebijakan Privasi');
      return;
    }

    setIsLoading(true);
    setRegisterDraft({
      name: name.trim(),
      organizationName: '', // Will be assigned or refined
      email: email.trim(),
      phone: phone.trim().startsWith('0') ? phone.trim() : `0${phone.trim()}`,
      password,
      acceptedTerms,
    });
    setIsLoading(false);

    router.push('/auth/register/role');
  };

  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between select-none"
      data-node-id="9:2612"
      data-name="Buat akun Fiscycle"
    >
      <div>
        {/* Navigation Header */}
        <div
          className="h-[66px] px-[22px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="25:36"
          data-name="Navigation"
        >
          <Link
            href="/auth/login"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="25:37"
            data-name="arrow-left"
          >
            <ArrowLeft className="size-[18px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="25:39"
            data-name="Brand"
          >
            <div className="relative w-[88px] h-[36px]" data-node-id="25:40">
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

        {/* Introduction Text */}
        <div
          className="px-[22px] pt-[16px] text-center"
          data-node-id="9:2625"
          data-name="Introduction"
        >
          <h1
            className="font-bold text-[23px] text-[#163252] leading-[1.18] font-sans"
            data-node-id="9:2626"
          >
            Buat Akun Fiscycle
          </h1>
          <p
            className="font-normal text-[13px] text-[#748397] leading-[1.4] font-sans mt-[8px]"
            data-node-id="9:2627"
          >
            Mulai langkah pertamamu bersama Fiscycle.
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-[20px] px-[22px] flex flex-col gap-[16px]"
          data-node-id="9:2628"
          data-name="Account details"
        >
          {/* Field: Nama Lengkap */}
          <div
            className="flex flex-col gap-[7px]"
            data-node-id="9:2629"
            data-name="Form field"
          >
            <label
              htmlFor="name"
              className="font-bold text-[14px] text-[#283d55] font-sans"
              data-node-id="9:2630"
            >
              Nama Lengkap
            </label>
            <div
              className="bg-white border border-[#e1e7ec] flex gap-[10px] h-[48px] items-center px-[12px] rounded-[7px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all"
              data-node-id="9:2631"
              data-name="Input"
            >
              <UserRound className="size-[17px] text-[#96a0af] shrink-0" data-node-id="9:2855" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="flex-1 bg-transparent text-[13px] text-[#283d55] placeholder:text-[#96a0af] outline-none font-sans"
                data-node-id="9:2633"
              />
            </div>
          </div>

          {/* Field: Nomor HP */}
          <div
            className="flex flex-col gap-[7px]"
            data-node-id="9:2634"
            data-name="Form field"
          >
            <label
              htmlFor="phone"
              className="font-bold text-[14px] text-[#283d55] font-sans"
              data-node-id="9:2635"
            >
              Nomor HP
            </label>
            <div
              className="bg-white border border-[#e1e7ec] flex gap-[10px] h-[48px] items-center px-[12px] rounded-[7px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all"
              data-node-id="9:2636"
              data-name="Input"
            >
              <Smartphone className="size-[17px] text-[#96a0af] shrink-0" data-node-id="9:2858" />
              <span
                className="font-bold text-[13px] text-[#283d55] font-sans"
                data-node-id="9:2638"
              >
                +62
              </span>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Masukkan nomor HP"
                className="flex-1 bg-transparent text-[13px] text-[#283d55] placeholder:text-[#96a0af] outline-none font-sans"
                data-node-id="9:2639"
              />
            </div>
          </div>

          {/* Field: Email */}
          <div
            className="flex flex-col gap-[7px]"
            data-node-id="9:2640"
            data-name="Form field"
          >
            <label
              htmlFor="email"
              className="font-bold text-[14px] text-[#283d55] font-sans"
              data-node-id="9:2641"
            >
              Email
            </label>
            <div
              className="bg-white border border-[#e1e7ec] flex gap-[10px] h-[48px] items-center px-[12px] rounded-[7px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all"
              data-node-id="9:2642"
              data-name="Input"
            >
              <Mail className="size-[17px] text-[#96a0af] shrink-0" data-node-id="9:2861" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="flex-1 bg-transparent text-[13px] text-[#283d55] placeholder:text-[#96a0af] outline-none font-sans"
                data-node-id="9:2644"
              />
            </div>
          </div>

          {/* Field: Kata Sandi */}
          <div
            className="flex flex-col gap-[7px]"
            data-node-id="9:2645"
            data-name="Form field"
          >
            <label
              htmlFor="password"
              className="font-bold text-[14px] text-[#283d55] font-sans"
              data-node-id="9:2646"
            >
              Kata Sandi
            </label>
            <div
              className="bg-white border border-[#e1e7ec] flex gap-[10px] h-[48px] items-center px-[12px] rounded-[7px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all"
              data-node-id="9:2647"
              data-name="Input"
            >
              <Lock className="size-[17px] text-[#96a0af] shrink-0" data-node-id="9:2864" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="flex-1 bg-transparent text-[13px] text-[#283d55] placeholder:text-[#96a0af] outline-none font-sans"
                data-node-id="9:2649"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#96a0af] hover:text-[#283d55] transition-colors"
                data-node-id="9:2867"
              >
                {showPassword ? (
                  <EyeOff className="size-[17px]" />
                ) : (
                  <Eye className="size-[17px]" />
                )}
              </button>
            </div>
          </div>

          {/* Field: Konfirmasi Kata Sandi */}
          <div
            className="flex flex-col gap-[7px]"
            data-node-id="9:2651"
            data-name="Form field"
          >
            <label
              htmlFor="confirmPassword"
              className="font-bold text-[14px] text-[#283d55] font-sans"
              data-node-id="9:2652"
            >
              Konfirmasi Kata Sandi
            </label>
            <div
              className="bg-white border border-[#e1e7ec] flex gap-[10px] h-[48px] items-center px-[12px] rounded-[7px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all"
              data-node-id="9:2653"
              data-name="Input"
            >
              <Lock className="size-[17px] text-[#96a0af] shrink-0" data-node-id="9:2870" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Masukkan kembali kata sandi"
                className="flex-1 bg-transparent text-[13px] text-[#283d55] placeholder:text-[#96a0af] outline-none font-sans"
                data-node-id="9:2655"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[#96a0af] hover:text-[#283d55] transition-colors"
                data-node-id="9:2873"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-[17px]" />
                ) : (
                  <Eye className="size-[17px]" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div
            className="flex gap-[10px] items-start pt-[4px]"
            data-node-id="9:2657"
            data-name="Terms agreement"
          >
            <input
              id="acceptedTerms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="size-[18px] rounded-[3px] border-[#afbbc8] text-[#00566b] focus:ring-[#00566b] cursor-pointer mt-0.5 shrink-0"
              data-node-id="9:2658"
              data-name="Checkbox"
            />
            <label
              htmlFor="acceptedTerms"
              className="text-[11.5px] leading-[1.35] text-[#748397] font-sans cursor-pointer select-none"
              data-node-id="9:2659"
            >
              Saya setuju dengan{' '}
              <span className="font-bold text-[#2687af] hover:underline">
                Syarat dan Ketentuan
              </span>{' '}
              dan{' '}
              <span className="font-bold text-[#2687af] hover:underline">
                Kebijakan Privasi
              </span>{' '}
              Fiscycle.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#00566b] border border-[#00566b] flex items-center justify-center h-[46px] rounded-[7px] w-full text-white font-bold text-[16px] hover:bg-[#004758] active:scale-[0.99] transition-all shadow-sm cursor-pointer mt-[6px] disabled:opacity-50"
            data-node-id="9:2660"
            data-name="Button"
          >
            <span data-node-id="9:2661">
              {isLoading ? 'Memproses...' : 'Daftar'}
            </span>
          </button>
        </form>
      </div>

      {/* Footer Area */}
      <div className="mt-[20px] pb-[28px] text-center">
        <p
          className="font-normal text-[12px] text-[#748397] font-sans"
          data-node-id="9:2662"
        >
          Sudah punya akun?{' '}
          <Link
            href="/auth/login"
            className="font-bold text-[#2687af] hover:underline"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
