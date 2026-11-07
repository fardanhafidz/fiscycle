'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { ShoppingBag, Scale, Award, ShoppingCart, User } from 'lucide-react';

export default function B2CBottomNavbar() {
  const pathname = usePathname();
  const { b2cCart } = useB2BCartStore();

  const totalCartCount = b2cCart.reduce((acc, item) => acc + item.quantityKg, 0);

  const navItems = [
    {
      label: 'Belanja',
      href: '/b2c',
      icon: ShoppingBag,
      isActive: pathname === '/b2c' || pathname === '/b2c/marketplace',
    },
    {
      label: 'Setor Sampah',
      href: '/b2c/waste',
      icon: Scale,
      isActive: pathname.startsWith('/b2c/waste'),
    },
    {
      label: 'Poin Sirkular',
      href: '/b2c/points',
      icon: Award,
      isActive: pathname.startsWith('/b2c/points') || pathname === '/b2c/wallet',
    },
    {
      label: 'Keranjang',
      href: '/b2c/checkout',
      icon: ShoppingCart,
      isActive: pathname.startsWith('/b2c/checkout'),
      badge: totalCartCount > 0 ? `${totalCartCount} kg` : null,
    },
    {
      label: 'Profil',
      href: '/b2c/profile',
      icon: User,
      isActive: pathname.startsWith('/b2c/profile'),
    },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[416px] z-50">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-3xl px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-2xl relative transition-all duration-200 ${
                item.isActive
                  ? 'bg-[#008d91] text-white shadow-xs scale-[1.02]'
                  : 'text-[#71859c] hover:text-[#173251] hover:bg-slate-100/50'
              }`}
            >
              <div className="relative">
                <Icon className="size-4" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 bg-rose-500 text-white text-[8px] font-bold px-1 rounded-full leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
