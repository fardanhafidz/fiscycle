'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Fish,
  Building2,
  Home,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import type { Role } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, quickLoginAsRole } = useAuthStore();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      toast.error('Masukkan email atau nomor HP');
      return;
    }

    setIsLoading(true);
    // Use identifier as email in mock auth store
    const result = loginWithEmail(identifier);
    setIsLoading(false);

    if (result.ok && result.redirectTo) {
      toast.success('Login berhasil! Mengalihkan...');
      router.push(result.redirectTo);
    } else {
      toast.error(result.error ?? 'Email atau password salah');
    }
  };

  const handleQuickLogin = (role: Role, roleName: string) => {
    const destination = quickLoginAsRole(role);
    toast.success(`Masuk sebagai ${roleName}`);
    router.push(destination);
  };

  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between select-none"
      data-node-id="9:2562"
      data-name="Masuk ke Fiscycle"
    >
      <div>
        {/* Top Navigation Header */}
        <div
          className="h-[66px] px-[22px] flex items-center justify-between border-b border-[#f3f6f8]"
          data-node-id="9:2569"
          data-name="Navigation"
        >
          <Link
            href="/"
            className="size-[24px] flex items-center justify-center text-[#283d55] hover:opacity-75 transition-opacity"
            data-node-id="9:2831"
            data-name="arrow-left"
          >
            <ArrowLeft className="size-[18px]" />
          </Link>

          <div
            className="flex items-center justify-center"
            data-node-id="9:2571"
            data-name="Brand"
          >
            <div className="relative w-[87px] h-[36px]" data-node-id="25:25">
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
          className="px-[22px] pt-[20px] text-center"
          data-node-id="9:2575"
          data-name="Introduction"
        >
          <h1
            className="font-bold text-[23px] text-[#163252] leading-[1.18] font-sans"
            data-node-id="9:2576"
          >
            Masuk ke Fiscycle
          </h1>
          <p
            className="font-normal text-[13px] text-[#748397] leading-[1.4] font-sans mt-[8px]"
            data-node-id="9:2577"
          >
            Lanjutkan untuk mengakses akun Anda.
          </p>
        </div>

        {/* Credentials Form */}
        <form
          onSubmit={handleManualLogin}
          className="mt-[24px] px-[22px] flex flex-col gap-[20px]"
          data-node-id="9:2578"
          data-name="Credentials"
        >
          {/* Email atau Nomor HP Field */}
          <div
            className="flex flex-col gap-[7px]"
            data-node-id="9:2579"
            data-name="Form field"
          >
            <label
              htmlFor="identifier"
              className="font-bold text-[14px] text-[#283d55] font-sans"
              data-node-id="9:2580"
            >
              Email atau Nomor HP
            </label>
            <div
              className="bg-white border border-[#e1e7ec] flex gap-[10px] h-[48px] items-center px-[12px] rounded-[7px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all"
              data-node-id="9:2581"
              data-name="Input"
            >
              <Mail className="size-[17px] text-[#96a0af] shrink-0" data-node-id="9:2834" />
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Masukkan email atau nomor HP"
                className="flex-1 bg-transparent text-[13px] text-[#283d55] placeholder:text-[#96a0af] outline-none font-sans"
                data-node-id="9:2583"
              />
            </div>
          </div>

          {/* Kata Sandi Field */}
          <div
            className="flex flex-col gap-[7px]"
            data-node-id="9:2584"
            data-name="Form field"
          >
            <label
              htmlFor="password"
              className="font-bold text-[14px] text-[#283d55] font-sans"
              data-node-id="9:2585"
            >
              Kata Sandi
            </label>
            <div
              className="bg-white border border-[#e1e7ec] flex gap-[10px] h-[48px] items-center px-[12px] rounded-[7px] w-full focus-within:border-[#00566b] focus-within:ring-1 focus-within:ring-[#00566b]/20 transition-all"
              data-node-id="9:2586"
              data-name="Input"
            >
              <Lock className="size-[17px] text-[#96a0af] shrink-0" data-node-id="9:2837" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="flex-1 bg-transparent text-[13px] text-[#283d55] placeholder:text-[#96a0af] outline-none font-sans"
                data-node-id="9:2588"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#96a0af] hover:text-[#283d55] transition-colors"
                data-node-id="9:2840"
              >
                {showPassword ? (
                  <EyeOff className="size-[17px]" />
                ) : (
                  <Eye className="size-[17px]" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div
            className="flex items-center justify-between"
            data-node-id="9:2590"
            data-name="Login options"
          >
            <label
              htmlFor="rememberMe"
              className="flex items-center gap-[7px] cursor-pointer select-none"
              data-node-id="9:2591"
              data-name="Remember me"
            >
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-[18px] rounded-[3px] border-[#afbbc8] text-[#00566b] focus:ring-[#00566b] cursor-pointer"
                data-node-id="9:2592"
                data-name="Checkbox"
              />
              <span
                className="font-normal text-[12px] text-[#283d55] font-sans"
                data-node-id="9:2593"
              >
                Ingat saya
              </span>
            </label>

            <button
              type="button"
              onClick={() =>
                toast.info('Untuk demonstrasi, silakan gunakan Demo Switcher di bawah.')
              }
              className="font-bold text-[12px] text-[#2687af] hover:underline font-sans cursor-pointer"
              data-node-id="9:2594"
            >
              Lupa kata sandi?
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#00566b] border border-[#00566b] flex items-center justify-center h-[49px] rounded-[7px] w-full text-white font-bold text-[16px] hover:bg-[#004758] active:scale-[0.99] transition-all shadow-sm cursor-pointer disabled:opacity-50"
            data-node-id="9:2595"
            data-name="Button"
          >
            <span data-node-id="9:2596">
              {isLoading ? 'Memuat...' : 'Masuk'}
            </span>
          </button>
        </form>

        {/* Social Sign In Divider */}
        <div
          className="mt-[20px] px-[22px] flex items-center gap-[10px]"
          data-node-id="9:2598"
          data-name="Sign in divider"
        >
          <div className="bg-[#e1e7ec] flex-1 h-px" data-node-id="9:2599" />
          <span
            className="font-normal text-[12px] text-[#748397] whitespace-nowrap font-sans"
            data-node-id="9:2600"
          >
            atau masuk dengan
          </span>
          <div className="bg-[#e1e7ec] flex-1 h-px" data-node-id="9:2601" />
        </div>

        {/* Social Buttons */}
        <div
          className="mt-[14px] px-[22px] flex flex-col gap-[10px]"
          data-node-id="9:2597"
          data-name="Social sign in"
        >
          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin('mitra', 'Mitra Tambak (Google Demo)')}
            className="border border-[#e1e7ec] flex items-center justify-center gap-[8px] h-[48px] rounded-[7px] w-full bg-white hover:bg-[#fafbfc] active:scale-[0.99] transition-all cursor-pointer"
            data-node-id="9:2602"
            data-name="Social button"
          >
            <div className="relative size-[18px]">
              <Image
                src="/images/icon-google.png"
                alt="Google"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
            <span
              className="font-bold text-[13px] text-[#283d55] font-sans"
              data-node-id="9:2605"
            >
              Lanjutkan dengan Google
            </span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin('b2b', 'B2B Horeka (Apple Demo)')}
            className="border border-[#e1e7ec] flex items-center justify-center gap-[8px] h-[48px] rounded-[7px] w-full bg-white hover:bg-[#fafbfc] active:scale-[0.99] transition-all cursor-pointer"
            data-node-id="9:2606"
            data-name="Social button"
          >
            <div className="relative size-[18px]">
              <Image
                src="/images/icon-apple.png"
                alt="Apple"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
            <span
              className="font-bold text-[13px] text-[#283d55] font-sans"
              data-node-id="9:2609"
            >
              Lanjutkan dengan Apple
            </span>
          </button>
        </div>
      </div>

      {/* Footer Area */}
      <div className="mt-[24px] pb-[28px] flex flex-col items-center gap-[14px]">
        {/* Bottom Registration Link */}
        <p
          className="font-normal text-[13px] text-[#748397] text-center font-sans"
          data-node-id="9:2610"
        >
          Belum punya akun?{' '}
          <Link
            href="/auth/register"
            className="font-bold text-[#2687af] hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>

        {/* Quick Access Toggle Text */}
        <button
          type="button"
          onClick={() => setShowQuickAccess(!showQuickAccess)}
          className="text-[12px] font-bold text-[#2687af] hover:text-[#00566b] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Zap className="size-3 text-[#f69b23] fill-[#f69b23]" />
          <span>{showQuickAccess ? 'Tutup Quick Access' : 'Quick Access'}</span>
        </button>

        {/* Hackathon Quick Role Switcher Chips (Conditional) */}
        {showQuickAccess && (
          <div className="w-[calc(100%-44px)] mx-auto p-3 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]/80 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#1a365d] flex items-center gap-1">
                <Zap className="size-3 text-[#f69b23] fill-[#f69b23]" />
                Demo 1-Klik Role Masuk:
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('mitra', 'Mitra (Budi)')}
                className="p-1.5 rounded-[8px] bg-white border border-[#e2e8f0] hover:border-[#008d91] hover:bg-[#e2f3fc] flex flex-col items-center text-center transition-all cursor-pointer"
              >
                <Fish className="size-3.5 text-[#00629b] mb-0.5" />
                <span className="text-[10px] font-bold text-[#173251]">Mitra</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('b2b', 'B2B (Hendro)')}
                className="p-1.5 rounded-[8px] bg-white border border-[#e2e8f0] hover:border-[#008d91] hover:bg-[#e2f3fc] flex flex-col items-center text-center transition-all cursor-pointer"
              >
                <Building2 className="size-3.5 text-[#9857e8] mb-0.5" />
                <span className="text-[10px] font-bold text-[#173251]">B2B</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('b2c', 'B2C (Sari)')}
                className="p-1.5 rounded-[8px] bg-white border border-[#e2e8f0] hover:border-[#008d91] hover:bg-[#e2f3fc] flex flex-col items-center text-center transition-all cursor-pointer"
              >
                <Home className="size-3.5 text-[#14b97c] mb-0.5" />
                <span className="text-[10px] font-bold text-[#173251]">B2C</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin', 'Admin (Andi)')}
                className="p-1.5 rounded-[8px] bg-white border border-[#e2e8f0] hover:border-[#008d91] hover:bg-[#e2f3fc] flex flex-col items-center text-center transition-all cursor-pointer"
              >
                <ShieldCheck className="size-3.5 text-[#f34860] mb-0.5" />
                <span className="text-[10px] font-bold text-[#173251]">Admin</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
