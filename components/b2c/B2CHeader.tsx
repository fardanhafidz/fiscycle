'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { formatNumberId } from '@/lib/format';
import { Award, ShoppingCart, MapPin, Sparkles } from 'lucide-react';

export default function B2CHeader() {
  const { currentUser } = useAuthStore();
  const { wallets } = useWastePointStore();
  const { b2cCart } = useB2BCartStore();

  const b2cWallet = wallets['WAL-0012'];
  const balancePoints = b2cWallet?.balancePoints ?? 450;
  const userName = currentUser?.name || 'Ibu Sari Wulandari';
  const totalCartCount = b2cCart.reduce((acc, item) => acc + item.quantityKg, 0);

  return (
    <header className="bg-white border-b border-[#e7eff4] sticky top-0 z-30 shadow-xs">
      {/* Brand & Points Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-[8px] bg-[#008d91] flex items-center justify-center text-white font-bold text-[14px]">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-[#173251] tracking-tight">
                FISCYCLE
              </span>
              <span className="bg-[#e2f7f4] text-[#008d91] font-bold text-[8.5px] px-1.5 py-0.2 rounded-[3px]">
                PASAR KELUARGA
              </span>
            </div>
            <p className="text-[9.5px] text-[#8192a5]">Ikan Tambak Segar Sirkular</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/b2c/points"
            className="flex items-center gap-1.5 bg-[#f3f9fc] border border-[#dce6ee] px-2 py-1 rounded-full text-[11px] font-bold text-[#008d91]"
          >
            <Award className="size-3.5 text-[#f69b23]" />
            <span>{formatNumberId(balancePoints)} Poin</span>
          </Link>

          <Link
            href="/b2c/checkout"
            className="size-8 rounded-full bg-[#f0f5f9] hover:bg-[#e2eaf1] flex items-center justify-center text-[#173251] relative transition"
          >
            <ShoppingCart className="size-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-bold px-1 rounded-full leading-tight">
                {totalCartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Greeting & Location Context */}
      <div className="px-4 py-1.5 bg-[#f8fbfd] border-t border-[#edf2f6] flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-[#173251]">
          <span className="font-semibold">Halo, {userName.split(' ')[0]}!</span>
          <span className="text-[9.5px] text-[#8192a5]">·</span>
          <span className="text-[10px] text-[#8192a5] flex items-center gap-0.5">
            <MapPin className="size-3 text-[#008d91]" />
            Surabaya Timur
          </span>
        </div>

        <span className="text-[9.5px] font-semibold text-[#14b97c] flex items-center gap-1">
          <Sparkles className="size-2.5" />
          Panen Hari Ini
        </span>
      </div>
    </header>
  );
}
