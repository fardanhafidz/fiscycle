import { POINT_VALUE_IDR } from '@/lib/constants';

// ============================================================================
// INDONESIAN LOCALE FORMATTERS (ANTI-SLOP & DETERMINISTIC)
// ============================================================================

const MONTHS_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

/**
 * Formats a number using Indonesian thousand and decimal separators (. and ,)
 */
export function formatNumberId(value: number, decimals = 0): string {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats IDR currency with clean standard spacing:
 * 15950000 -> "Rp 15.950.000"
 * -300000  -> "-Rp 300.000"
 */
export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded < 0) {
    return `-Rp ${formatNumberId(Math.abs(rounded))}`;
  }
  return `Rp ${formatNumberId(rounded)}`;
}

/**
 * Formats point balance: 3000 -> "3.000 Poin"
 */
export function formatPoints(points: number): string {
  return `${formatNumberId(points)} Poin`;
}

/**
 * Converts points to IDR equivalence: 3000 pts -> 300000
 */
export function pointsToRupiah(points: number): number {
  return points * POINT_VALUE_IDR;
}

/**
 * Formats weight in kilograms: 1000 -> "1.000 kg"
 */
export function formatWeightKg(kg: number, decimals = 0): string {
  return `${formatNumberId(kg, decimals)} kg`;
}

/**
 * Formats telemetry or generic metric with unit:
 * (3.2, 'mg/L', 1) -> "3,2 mg/L"
 */
export function formatMetric(value: number, unit: string, decimals = 1): string {
  const formattedNum = formatNumberId(value, decimals);
  return unit ? `${formattedNum} ${unit}` : formattedNum;
}

/**
 * Parses 'YYYY-MM-DD' manually to prevent timezone shifts and formats as:
 * '2026-11-15' -> '15 Nov 2026'
 */
export function formatDateId(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const monthName = MONTHS_ID[monthIdx] ?? parts[1];
  return `${day} ${monthName} ${year}`;
}

/**
 * Formats a date range with en-dash (–):
 * ('2026-11-15', '2026-11-18') -> '15–18 Nov 2026'
 * ('2026-11-29', '2026-12-02') -> '29 Nov – 2 Des 2026'
 */
export function formatDateRangeId(startDateStr: string, endDateStr: string): string {
  const p1 = startDateStr.split('-');
  const p2 = endDateStr.split('-');
  if (p1.length < 3 || p2.length < 3) {
    return `${startDateStr} – ${endDateStr}`;
  }

  const y1 = p1[0];
  const m1 = parseInt(p1[1], 10) - 1;
  const d1 = parseInt(p1[2], 10);

  const y2 = p2[0];
  const m2 = parseInt(p2[1], 10) - 1;
  const d2 = parseInt(p2[2], 10);

  if (y1 === y2) {
    if (m1 === m2) {
      return `${d1}–${d2} ${MONTHS_ID[m1]} ${y1}`;
    }
    return `${d1} ${MONTHS_ID[m1]} – ${d2} ${MONTHS_ID[m2]} ${y1}`;
  }

  return `${d1} ${MONTHS_ID[m1]} ${y1} – ${d2} ${MONTHS_ID[m2]} ${y2}`;
}

/**
 * Formats percentage value: 96 -> "96%"
 */
export function formatPercent(value: number, decimals = 0): string {
  return `${formatNumberId(value, decimals)}%`;
}
