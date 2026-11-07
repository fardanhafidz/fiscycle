import type { User, Role } from '@/lib/types';

// ============================================================================
// ROLE HOME-ROUTE RESOLVER & WORKSPACE PREFIXES (1 USER = 1 ROLE)
// ============================================================================

export const ROLE_ROUTE_PREFIX: Record<Role, string> = {
  mitra: '/mitra',
  b2b: '/b2b',
  b2c: '/b2c',
  admin: '/admin',
};

/**
 * Resolves the primary workspace landing route for an authenticated user.
 * Strictly adheres to 1 User = 1 Role architecture.
 */
export function getHomeRouteForUser(user: User): string {
  switch (user.role) {
    case 'mitra':
      if (!user.partnerTokenVerified) {
        return '/auth/mitra';
      }
      if (!user.onboardingCompleted) {
        return '/mitra/onboarding';
      }
      return '/mitra/dashboard';

    case 'b2b':
      return '/b2b/dashboard';

    case 'b2c':
      return '/b2c/marketplace';

    case 'admin':
      return '/admin/leads';
  }
}
