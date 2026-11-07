'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trash2, Fish, Award } from 'lucide-react';

export default function B2BBottomNavbar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Beranda',
      href: '/b2b/dashboard',
      icon: Home,
      isActive: pathname === '/b2b/dashboard' || pathname === '/b2b',
    },
    {
      label: 'Setor Limbah',
      href: '/b2b/waste',
      icon: Trash2,
      isActive: pathname.startsWith('/b2b/waste'),
    },
    {
      label: 'Pasokan Ikan',
      href: '/b2b/orders',
      icon: Fish,
      isActive: pathname.startsWith('/b2b/orders'),
    },
    {
      label: 'Poin & Profil',
      href: '/b2b/profile',
      icon: Award,
      isActive: pathname.startsWith('/b2b/profile'),
    },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[416px] z-50">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-3xl px-3 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-200 ${
                item.isActive
                  ? 'bg-[#1A365D] text-white shadow-xs scale-[1.02]'
                  : 'text-[#71859c] hover:text-[#173251] hover:bg-slate-100/50'
              }`}
            >
              <Icon className="size-4" />
              <span className="text-[10px] font-semibold leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
