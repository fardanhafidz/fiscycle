'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useMitraStore } from '@/store/useMitraStore';
import { MitraDrawerMenu } from './MitraDrawerMenu';

interface MitraHeaderProps {
  showGreeting?: boolean;
}

export function MitraHeader({ showGreeting = true }: MitraHeaderProps) {
  const currentUser = useAuthStore((s) => s.currentUser);
  const farm = useMitraStore((s) => s.farm);

  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Budi';
  const partnerToken = farm.partnerToken || 'FSC-FARM-0028';

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40 select-none">
      {/* Brand Bar (Figma Node 35:5243) */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          {/* Hamburger Drawer Menu Trigger */}
          <MitraDrawerMenu />

          {/* Fiscycle Brand Logo & Name */}
          <Link href="/mitra/dashboard" className="flex items-center gap-1.5 group">
            <div className="relative size-7 flex items-center justify-center">
              <svg viewBox="0 0 34 34" fill="none" className="size-full">
                <path
                  d="M8 12C13 7 21 8 26 12C20 10 14 11 8 12Z"
                  fill="#00B4D8"
                />
                <path
                  d="M6 17C12 11 22 11 28 17C21 15 13 15 6 17Z"
                  fill="#0077B6"
                />
                <path
                  d="M9 22C14 26 22 25 27 22C21 23 15 23 9 22Z"
                  fill="#03045E"
                />
              </svg>
            </div>
            <span className="font-extrabold text-[#00629b] text-[19px] tracking-tight group-hover:text-[#00566b] transition-colors">
              Fiscycle
            </span>
          </Link>
        </div>

        {/* Right Action Icons: Token Pill + Notification Bell */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {partnerToken}
          </span>

          <Link
            href="/mitra/insights"
            className="relative size-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notifikasi dan Peringatan"
          >
            <Bell className="size-[19px]" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-[#f34860] ring-2 ring-white animate-pulse" />
          </Link>
        </div>
      </div>

      {/* Farm Greeting & Selector (Figma Node 35:5251) */}
      {showGreeting && (
        <div className="px-4 pb-2.5 pt-0.5 flex flex-col gap-0.5 border-t border-slate-50">
          <p className="font-extrabold text-[#173251] text-[17px] leading-tight">
            Halo, {firstName}! 👋
          </p>

          <div className="flex items-center justify-between">
            <Link
              href="/mitra/profile"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#173251] hover:text-[#00629b] transition-colors"
            >
              <span>{farm.name || 'Tambak Makmur'}</span>
              <ChevronDown className="size-3 text-slate-500" />
            </Link>

            <div className="inline-flex items-center gap-1.5 text-[9px] text-[#8192a5]">
              <span className="size-1.5 rounded-full bg-[#14b97c] animate-pulse" />
              <span>Data sensor diperbarui 2 menit lalu</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
