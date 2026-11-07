import { createJSONStorage } from 'zustand/middleware';

export const STORAGE_PREFIX = 'fiscycle-storage-v1';

export const storageKey = (name: 'auth' | 'waste' | 'cart' | 'mitra' | 'admin'): string =>
  `${STORAGE_PREFIX}-${name}`;

export const persistStorage = createJSONStorage(() => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
});
