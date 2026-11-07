'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Sparkles, ClipboardList } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  matcher: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Beranda',
    href: '/mitra/dashboard',
    icon: Home,
    matcher: (path) => path === '/mitra/dashboard' || path === '/mitra',
  },
  {
    label: 'Pakan',
    href: '/mitra/feed',
    icon: ListChecks,
    matcher: (path) => path.startsWith('/mitra/feed') || path.startsWith('/mitra/bsf'),
  },
  {
    label: 'Rekomendasi',
    href: '/mitra/insights',
    icon: Sparkles,
    matcher: (path) => path.startsWith('/mitra/insights'),
  },
  {
    label: 'Riwayat',
    href: '/mitra/reports',
    icon: ClipboardList,
    matcher: (path) => path.startsWith('/mitra/reports'),
  },
];

export function MitraBottomNavbar() {
  const pathname = usePathname();

  // Hide on onboarding screens
  if (pathname.startsWith('/mitra/onboarding')) {
    return null;
  }

  return (
    <nav
      aria-label="Navigasi Utama Mitra"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-[390px] z-50 select-none"
    >
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/10 rounded-2xl px-2 py-1.5 flex items-center justify-around transition-all">
        {NAV_ITEMS.map((item) => {
          const isActive = item.matcher(pathname);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[68px] ${
                isActive
                  ? 'bg-[#00566b] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/60'
              }`}
            >
              <Icon
                className={`size-[20px] transition-transform duration-200 ${
                  isActive ? 'scale-110 text-white' : 'text-slate-400'
                }`}
              />
              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium ${
                  isActive ? 'font-bold text-white' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
