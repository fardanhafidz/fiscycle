'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Users,
  Trash2,
  PieChart,
  Activity,
  LogOut,
  Smartphone,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();

  const adminName = currentUser?.name || 'Andi Pratama';
  const adminEmail = currentUser?.email || 'admin@fiscycle.id';

  const navLinks = [
    {
      label: 'Pipeline Calon Mitra',
      href: '/admin/leads',
      icon: Users,
      isActive: pathname.startsWith('/admin/leads'),
    },
    {
      label: 'Verifikasi Limbah',
      href: '/admin/waste',
      icon: Trash2,
      isActive: pathname.startsWith('/admin/waste'),
    },
    {
      label: 'Alokasi Pasokan Panen',
      href: '/admin/supply',
      icon: PieChart,
      isActive: pathname.startsWith('/admin/supply'),
    },
    {
      label: 'Monitoring Tambak & IoT',
      href: '/admin/farms',
      icon: Activity,
      isActive: pathname.startsWith('/admin/farms'),
    },
    {
      label: 'Tampilan Mobile Admin',
      href: '/admin/mobile',
      icon: Smartphone,
      isActive: pathname === '/admin/mobile',
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <aside className="w-[216px] shrink-0 bg-white border-r border-[#e2e8f0] h-screen sticky top-0 flex flex-col justify-between select-none">
      {/* Brand Bar */}
      <div>
        <div className="p-4 border-b border-[#edf2f7] flex items-center gap-2.5">
          <div className="size-8 rounded-[7px] bg-[#1A365D] flex items-center justify-center text-white font-bold text-[14px]">
            F
          </div>
          <div>
            <h1 className="text-[14px] font-extrabold text-[#1A365D] tracking-tight leading-none">
              FISCYCLE
            </h1>
            <p className="text-[10px] text-[#718096] font-semibold mt-0.5">
              Admin Internal Hub
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1 mt-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[7px] text-[12px] font-semibold transition-all ${
                  link.isActive
                    ? 'bg-[#1A365D] text-white shadow-xs'
                    : 'text-[#4a5568] hover:bg-[#f7fafc] hover:text-[#1A365D]'
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin User Profile & Logout */}
      <div className="p-3 border-t border-[#edf2f7] bg-[#f8fafc]">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="size-8 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
            {adminName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-[11.5px] font-bold text-[#1a202c] truncate leading-tight">
              {adminName}
            </p>
            <p className="text-[9.5px] text-[#718096] truncate">{adminEmail}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[6px] text-[11px] font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
        >
          <LogOut className="size-3.5" />
          Keluar Admin
        </button>
      </div>
    </aside>
  );
}
