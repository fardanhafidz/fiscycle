import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role, RegisterDraft } from '@/lib/types';
import { getHomeRouteForUser } from '@/lib/routing';
import { nextAvailableId } from '@/lib/ids';
import { PARTNER_TOKEN_REGEX, DEMO_OTP_CODE } from '@/lib/constants';
import { SEED_USERS } from '@/mocks/seed';
import { persistStorage, storageKey } from './storage';
import { useAdminStore } from './useAdminStore';

export interface AuthStoreState {
  currentUser: User | null;
  users: User[];
  registerDraft: RegisterDraft | null;

  // Actions
  loginWithEmail: (email: string) => {
    ok: boolean;
    redirectTo?: string;
    error?: string;
  };
  quickLoginAsRole: (role: Role) => string;
  setRegisterDraft: (draft: RegisterDraft) => void;
  completeRegistrationWithRole: (role: Role) => {
    user: User;
    redirectTo: string;
  };
  verifyMitraToken: (token: string, phoneOrEmail: string) => boolean;
  verifyMitraOtp: (otpCode: string) => boolean;
  completeMitraOnboarding: () => void;
  logout: () => void;
  resetAuthStore: () => void;
}

function getAvatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: structuredClone(SEED_USERS),
      registerDraft: null,

      loginWithEmail: (email: string) => {
        const { users } = get();
        const normalized = email.trim().toLowerCase();
        const foundUser = users.find((u) => u.email.toLowerCase() === normalized);

        if (!foundUser) {
          return {
            ok: false,
            error: 'Email belum terdaftar. Silakan daftar terlebih dahulu.',
          };
        }

        set({ currentUser: foundUser });
        return {
          ok: true,
          redirectTo: getHomeRouteForUser(foundUser),
        };
      },

      quickLoginAsRole: (role: Role) => {
        const { users } = get();
        const foundUser = users.find((u) => u.role === role);
        if (!foundUser) return '/auth/login';

        set({ currentUser: foundUser });
        return getHomeRouteForUser(foundUser);
      },

      setRegisterDraft: (draft: RegisterDraft) => set({ registerDraft: draft }),

      completeRegistrationWithRole: (role: Role) => {
        const { users, registerDraft } = get();
        if (!registerDraft) {
          throw new Error('Data pendaftaran tidak ditemukan');
        }

        const newId = nextAvailableId(
          'USR-NEW',
          users.map((u) => u.id),
          1,
          2
        );

        const initials = getAvatarInitials(registerDraft.name);

        const newUser: User = {
          id: newId,
          name: registerDraft.name,
          email: registerDraft.email,
          phone: registerDraft.phone,
          role,
          organizationName: registerDraft.organizationName,
          avatarInitials: initials,
          ...(role === 'mitra'
            ? {
                partnerTokenVerified: false,
                onboardingCompleted: false,
              }
            : {}),
        };

        const nextUsers = [...users, newUser];
        set({
          users: nextUsers,
          currentUser: newUser,
          registerDraft: null,
        });

        return {
          user: newUser,
          redirectTo: getHomeRouteForUser(newUser),
        };
      },

      verifyMitraToken: (token: string, phoneOrEmail: string) => {
        if (!PARTNER_TOKEN_REGEX.test(token.trim())) {
          return false;
        }

        if (phoneOrEmail.trim().length < 8) {
          return false;
        }

        const adminLeads = useAdminStore.getState().leads;
        const validTokens = new Set<string>([
          'FSC-FARM-0028',
          ...adminLeads
            .map((l) => l.issuedPartnerToken)
            .filter((t): t is string => Boolean(t)),
        ]);

        return validTokens.has(token.trim());
      },

      verifyMitraOtp: (otpCode: string) => {
        if (otpCode.trim() !== DEMO_OTP_CODE) {
          return false;
        }

        const { currentUser, users } = get();
        if (!currentUser) return true;

        const updatedUser: User = {
          ...currentUser,
          partnerTokenVerified: true,
        };

        set({
          currentUser: updatedUser,
          users: users.map((u) => (u.id === currentUser.id ? updatedUser : u)),
        });

        return true;
      },

      completeMitraOnboarding: () => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser: User = {
          ...currentUser,
          partnerTokenVerified: true,
          onboardingCompleted: true,
        };

        set({
          currentUser: updatedUser,
          users: users.map((u) => (u.id === currentUser.id ? updatedUser : u)),
        });
      },

      logout: () => set({ currentUser: null }),

      resetAuthStore: () =>
        set({
          currentUser: null,
          users: structuredClone(SEED_USERS),
          registerDraft: null,
        }),
    }),
    {
      name: storageKey('auth'),
      storage: persistStorage,
    }
  )
);
