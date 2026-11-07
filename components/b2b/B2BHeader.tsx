'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { formatNumberId } from '@/lib/format';
import { Award, UtensilsCrossed, ShieldCheck } from 'lucide-react';

export default function B2BHeader() {
  const { currentUser } = useAuthStore();
  const { wallets } = useWastePointStore();

  const b2bWallet = wallets['WAL-0007'];
  const orgName = currentUser?.organizationName || 'ABC Restaurant (Surya Group)';
  const contactName = currentUser?.name || 'Hendro Wijaya';
  const balancePoints = b2bWallet?.balancePoints ?? 2580;

  return (
    <header className="bg-white border-b border-[#e7eff4] sticky top-0 z-30 shadow-xs">
      {/* Brand Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-[8px] bg-[#00629b] flex items-center justify-center text-white font-bold text-[14px]">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-[#173251] tracking-tight">
                FISCYCLE
              </span>
              <span className="bg-[#e2f3fc] text-[#00629b] font-bold text-[8.5px] px-1.5 py-0.2 rounded-[3px]">
                HOREKA B2B
              </span>
            </div>
            <p className="text-[9.5px] text-[#8192a5]">Ekosistem Sirkular Resto</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/b2b/profile"
            className="flex items-center gap-1.5 bg-[#f3f9fc] border border-[#dce6ee] px-2 py-1 rounded-full text-[11px] font-bold text-[#00629b]"
          >
            <Award className="size-3.5 text-[#f69b23]" />
            <span>{formatNumberId(balancePoints)} Poin</span>
          </Link>
          <div className="size-8 rounded-full bg-[#1A365D] text-white flex items-center justify-center font-bold text-[11px]">
            {contactName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
        </div>
      </div>

      {/* Greeting & Org context */}
      <div className="px-4 py-2 bg-[#f8fbfd] border-t border-[#edf2f6] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-[5px] bg-[#eef5fa] flex items-center justify-center text-[#5b738e]">
            <UtensilsCrossed className="size-3.5" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#173251] leading-none">{orgName}</p>
            <p className="text-[9.5px] text-[#8192a5] mt-0.5">PIC: {contactName} · Surabaya</p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[9.5px] font-bold text-[#14b97c] bg-[#e5f8ef] px-1.5 py-0.5 rounded-[4px]">
          <ShieldCheck className="size-3" />
          Mitra Sirkular Hijau
        </span>
      </div>
    </header>
  );
}
