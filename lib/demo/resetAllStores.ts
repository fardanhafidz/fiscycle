import { useAuthStore } from '@/store/useAuthStore';
import { useWastePointStore } from '@/store/useWastePointStore';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { useMitraStore } from '@/store/useMitraStore';
import { useAdminStore } from '@/store/useAdminStore';

export interface ResetOptions {
  keepSession?: boolean;
}

/**
 * Resets all 5 persisted Zustand stores back to initial deterministic seed state.
 * Never calls localStorage.clear() to preserve third-party or browser keys.
 */
export function resetAllStores(options: ResetOptions = {}): void {
  // 1. Reset domain stores
  useWastePointStore.getState().resetWastePointStore();
  useB2BCartStore.getState().resetB2BCartStore();
  useMitraStore.getState().resetMitraStore();
  useAdminStore.getState().resetAdminStore();

  // 2. Handle auth store with optional session retention
  const currentUserId = useAuthStore.getState().currentUser?.id;

  useAuthStore.getState().resetAuthStore();

  if (options.keepSession && currentUserId) {
    const refreshedUser = useAuthStore
      .getState()
      .users.find((u) => u.id === currentUserId);

    if (refreshedUser) {
      useAuthStore.setState({ currentUser: refreshedUser });
    }
  }
}
