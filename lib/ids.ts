// ============================================================================
// DETERMINISTIC SEQUENTIAL ID GENERATOR (ZERO RANDOM / ZERO UUID)
// ============================================================================

/**
 * Finds the next available deterministic sequential ID starting from `startAt`.
 *
 * @example
 * nextAvailableId('ORD', ['ORD-0238','ORD-0239','ORD-0242','ORD-0243','ORD-0244'], 241)
 * // => 'ORD-0241'
 *
 * nextAvailableId('ORD', ['ORD-0238','ORD-0239','ORD-0241','ORD-0242','ORD-0243','ORD-0244'], 241)
 * // => 'ORD-0245'
 *
 * nextAvailableId('IN', ['IN-0040','IN-0042','IN-0043','IN-0044'], 45)
 * // => 'IN-0045'
 */
export function nextAvailableId(
  prefix: string,
  existingIds: readonly string[],
  startAt: number,
  pad = 4
): string {
  const existingSet = new Set(existingIds);
  let current = startAt;
  while (true) {
    const candidate = `${prefix}-${String(current).padStart(pad, '0')}`;
    if (!existingSet.has(candidate)) {
      return candidate;
    }
    current += 1;
  }
}

/**
 * Formats a partner activation token sequence:
 * 29 -> "FSC-FARM-0029"
 */
export function formatPartnerToken(sequence: number): string {
  return `FSC-FARM-${String(sequence).padStart(4, '0')}`;
}
