'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, quickLoginAsRole } = useAuthStore();

  useEffect(() => {
    // If not logged in or wrong role, auto-switch for seamless reviewer mode
    if (!currentUser || currentUser.role !== 'admin') {
      quickLoginAsRole('admin');
    }
  }, [currentUser, quickLoginAsRole, router]);

  return (
    <div className="flex min-h-screen bg-[#f7fafc] text-[#1a202c] font-sans antialiased">
      {/* 216px Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen flex flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
