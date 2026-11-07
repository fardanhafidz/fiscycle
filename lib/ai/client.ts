import type {
  FishOrder,
  WaterTelemetry,
  PondStatus,
  AiInsight,
  AllocationSuggestion,
  IoTDevice,
} from '@/lib/types';

export interface AiHealthResponse {
  ok: boolean;
  mode: 'LIVE_FASTAPI' | 'DETERMINISTIC_FALLBACK';
  service?: string;
  services?: Record<string, { ready: boolean; [key: string]: unknown }>;
  upstream?: unknown;
}

export interface WaterAnalysisResponse {
  ok: boolean;
  mode?: string;
  pondId: string;
  pondName: string;
  species: string;
  status: PondStatus;
  activeInsight: AiInsight | null;
  telemetry: WaterTelemetry;
  recommendations: Array<{
    title: string;
    action: string;
    severity: string;
  }>;
}

export interface SupplyMatchResponse {
  ok: boolean;
  mode: string;
  orderId: string;
  order?: Partial<FishOrder>;
  topMatch?: AllocationSuggestion | null;
  recommendations: AllocationSuggestion[];
}

export interface BsfForecastResponse {
  ok: boolean;
  mode: string;
  result?: {
    predictedBiomassKg?: number;
    recommendedDailyFeedKg?: number;
    feedConversionRatio?: number;
    harvestReadinessDays?: number;
    analysisText?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface PondTelemetryResponse {
  ok: boolean;
  pondId?: string;
  pondName?: string;
  status?: PondStatus;
  telemetry?: WaterTelemetry;
  thresholds?: Record<string, { min?: number; max?: number; optimal?: string }>;
  devices?: IoTDevice[];
  ponds?: Array<{
    pondId: string;
    pondName: string;
    species: string;
    status: PondStatus;
    telemetry: WaterTelemetry;
    devicesCount: number;
  }>;
}

/**
 * Centralized typed AI & IoT client.
 * Connects to Next.js API route handlers which bridge to live FastAPI / external AI microservices
 * with graceful deterministic fallback.
 */
export const FiscycleAiClient = {
  /**
   * Check status and latency of the AI service.
   */
  async checkHealth(): Promise<AiHealthResponse> {
    try {
      const res = await fetch('/api/ai/bridge', {
        headers: { Accept: 'application/json' },
      });
      return await res.json();
    } catch {
      return {
        ok: true,
        mode: 'DETERMINISTIC_FALLBACK',
        service: 'fiscycle-client-offline-fallback',
      };
    }
  },

  /**
   * Fetch pond water quality analysis and AI health recommendation.
   */
  async fetchWaterAnalysis(pondId: string): Promise<WaterAnalysisResponse> {
    const res = await fetch(`/api/ai/recommend/${pondId}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Gagal memuat analisis AI untuk kolam ${pondId} (HTTP ${res.status})`);
    }
    return await res.json();
  },

  /**
   * Fetch AI supply-demand matching recommendations for a given B2B order.
   */
  async fetchSupplyMatching(
    orderOrId: string | Partial<FishOrder>
  ): Promise<SupplyMatchResponse> {
    const payload =
      typeof orderOrId === 'string'
        ? { orderId: orderOrId }
        : { order: orderOrId };

    const res = await fetch('/api/ai/match-supply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Gagal memuat rekomendasi pasokan AI (HTTP ${res.status})`);
    }
    return await res.json();
  },

  /**
   * Fetch BSF bioconversion forecast and feeding optimization.
   */
  async fetchBsfForecast(payload: Record<string, unknown>): Promise<BsfForecastResponse> {
    const res = await fetch('/api/ai/bridge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: 'bsf_b1',
        payload,
      }),
    });

    if (!res.ok) {
      throw new Error(`Gagal memuat prediksi biokonversi BSF (HTTP ${res.status})`);
    }
    return await res.json();
  },

  /**
   * Fetch current pond IoT telemetry and sensor status.
   */
  async fetchTelemetry(pondId?: string): Promise<PondTelemetryResponse> {
    const url = pondId
      ? `/api/iot/telemetry?pondId=${encodeURIComponent(pondId)}`
      : '/api/iot/telemetry';

    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Gagal memuat telemetri IoT (HTTP ${res.status})`);
    }
    return await res.json();
  },

  /**
   * Submit live IoT telemetry readings.
   */
  async postTelemetry(payload: {
    pondId: string;
    ph?: number;
    temperatureC?: number;
    dissolvedOxygenMgL?: number;
    turbidityNtu?: number;
    ammoniaMgL?: number;
  }) {
    const res = await fetch('/api/iot/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Gagal mengirim telemetri IoT (HTTP ${res.status})`);
    }
    return await res.json();
  },
};
