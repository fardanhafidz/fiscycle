'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * Hook to avoid hydration mismatch when rendering UI depending on persisted client stores.
 * Uses React's useSyncExternalStore to reliably detect client hydration without cascading renders.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
