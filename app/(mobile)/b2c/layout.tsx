'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import B2CHeader from '@/components/b2c/B2CHeader';
import B2CBottomNavbar from '@/components/b2c/B2CBottomNavbar';

export default function B2CLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, quickLoginAsRole } = useAuthStore();

  useEffect(() => {
    // If not logged in or wrong role, auto-switch for seamless reviewer mode
    if (!currentUser || currentUser.role !== 'b2c') {
      quickLoginAsRole('b2c');
    }
  }, [currentUser, quickLoginAsRole, router]);

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans antialiased">
      <main className="max-w-md mx-auto min-h-screen bg-[#f3f9fc] pb-24 relative shadow-md">
        <B2CHeader />
        {children}
        <B2CBottomNavbar />
      </main>
    </div>
  );
}
