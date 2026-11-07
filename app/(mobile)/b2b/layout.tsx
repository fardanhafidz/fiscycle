'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import B2BHeader from '@/components/b2b/B2BHeader';
import B2BBottomNavbar from '@/components/b2b/B2BBottomNavbar';

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, quickLoginAsRole } = useAuthStore();

  useEffect(() => {
    // If not logged in or wrong role, auto-switch for seamless reviewer mode
    if (!currentUser || currentUser.role !== 'b2b') {
      quickLoginAsRole('b2b');
    }
  }, [currentUser, quickLoginAsRole, router]);

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans antialiased">
      <main className="max-w-md mx-auto min-h-screen bg-[#f3f9fc] pb-24 relative shadow-md">
        <B2BHeader />
        {children}
        <B2BBottomNavbar />
      </main>
    </div>
  );
}
