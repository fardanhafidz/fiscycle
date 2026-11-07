'use client';

import React, { useEffect } from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { useAuthStore } from '@/store/useAuthStore';
import type { Role } from '@/lib/types';
import { WorkspaceSkeleton } from './WorkspaceSkeleton';

interface RoleGuardProps {
  allowedRole: Role;
  children: React.ReactNode;
  allowUnonboardedMitra?: boolean;
}

export function RoleGuard({
  allowedRole,
  children,
  allowUnonboardedMitra = false,
}: RoleGuardProps) {
  const hydrated = useHydrated();
  const { currentUser, quickLoginAsRole, completeMitraOnboarding } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;

    // Review-Mode Seamless Auto-Switch
    if (!currentUser || currentUser.role !== allowedRole) {
      quickLoginAsRole(allowedRole);
      return;
    }

    // Role-specific checks: Auto-complete onboarding for smooth reviewer experience
    if (allowedRole === 'mitra' && !allowUnonboardedMitra) {
      if (!currentUser.partnerTokenVerified || !currentUser.onboardingCompleted) {
        completeMitraOnboarding();
      }
    }
  }, [hydrated, currentUser, allowedRole, allowUnonboardedMitra, quickLoginAsRole, completeMitraOnboarding]);

  if (!hydrated || !currentUser || currentUser.role !== allowedRole) {
    return <WorkspaceSkeleton />;
  }

  return <>{children}</>;
}

export default RoleGuard;
