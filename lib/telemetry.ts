import type { PondStatus, WaterTelemetry, TelemetryMetricKey } from '@/lib/types';

// ============================================================================
// IOT TELEMETRY EVALUATION & THRESHOLDS
// ============================================================================

export const METRIC_META: Record<
  TelemetryMetricKey,
  { label: string; unit: string; decimals: number; safeText: string }
> = {
  ph: {
    label: 'pH Air',
    unit: '',
    decimals: 1,
    safeText: 'Aman 6,5 – 8,5',
  },
  temperatureC: {
    label: 'Suhu Air',
    unit: '°C',
    decimals: 1,
    safeText: 'Aman 26 – 30 °C',
  },
  dissolvedOxygenMgL: {
    label: 'Oksigen Terlarut (DO)',
    unit: 'mg/L',
    decimals: 1,
    safeText: 'Minimal 5,0 mg/L',
  },
  turbidityNtu: {
    label: 'Kekeruhan',
    unit: 'NTU',
    decimals: 0,
    safeText: 'Maksimal 30 NTU',
  },
};

/**
 * Evaluates individual telemetry metric value against agronomic safe thresholds.
 */
export function evaluateMetric(key: TelemetryMetricKey, value: number): PondStatus {
  switch (key) {
    case 'ph':
      if (value >= 6.5 && value <= 8.5) return 'Baik';
      if ((value >= 6.0 && value < 6.5) || (value > 8.5 && value <= 9.0)) return 'Perhatian';
      return 'Kritis';

    case 'temperatureC':
      if (value >= 26.0 && value <= 30.0) return 'Baik';
      if ((value >= 24.0 && value < 26.0) || (value > 30.0 && value <= 32.0)) return 'Perhatian';
      return 'Kritis';

    case 'dissolvedOxygenMgL':
      if (value >= 5.0) return 'Baik';
      if (value >= 4.0 && value < 5.0) return 'Perhatian';
      return 'Kritis';

    case 'turbidityNtu':
      if (value <= 30) return 'Baik';
      if (value > 30 && value <= 50) return 'Perhatian';
      return 'Kritis';
  }
}

/**
 * Derives the overall status of a pond from its 4 primary telemetry parameters.
 * Hierarchy: 'Kritis' > 'Perhatian' > 'Baik'
 */
export function derivePondStatus(t: WaterTelemetry): PondStatus {
  const statuses: PondStatus[] = [
    evaluateMetric('ph', t.ph),
    evaluateMetric('temperatureC', t.temperatureC),
    evaluateMetric('dissolvedOxygenMgL', t.dissolvedOxygenMgL),
    evaluateMetric('turbidityNtu', t.turbidityNtu),
  ];

  if (statuses.includes('Kritis')) return 'Kritis';
  if (statuses.includes('Perhatian')) return 'Perhatian';
  return 'Baik';
}

/**
 * Counts how many ponds have a 'Baik' status for a specific metric.
 */
export function countSafePonds(
  ponds: { telemetry: WaterTelemetry }[],
  key: TelemetryMetricKey
): number {
  return ponds.filter((p) => evaluateMetric(key, p.telemetry[key]) === 'Baik').length;
}
