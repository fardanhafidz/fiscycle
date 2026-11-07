import { NextResponse, type NextRequest } from 'next/server';

const AI_URL = process.env.FISCYCLE_AI_URL || 'http://127.0.0.1:8000';

export async function GET() {
  try {
    const res = await fetch(`${AI_URL}/health`, {
      signal: AbortSignal.timeout(1500),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        ok: true,
        mode: 'LIVE_FASTAPI',
        upstream: data,
      });
    }
  } catch {
    // Network or timeout failure -> fall through to deterministic fallback
  }

  return NextResponse.json({
    ok: true,
    mode: 'DETERMINISTIC_FALLBACK',
    service: 'fiscycle-model-api-v2.1.0',
    services: {
      water_quality: { ready: true, scope: 'HISTORICAL_REPLAY' },
      bsf: { ready: true, model: 'BSF Model B1 + YOLO A1/A2 v3' },
    },
  });
}

interface BridgeRequestBody {
  domain: 'bsf_b1' | 'water_analyze';
  payload: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  let body: BridgeRequestBody;
  try {
    body = (await req.json()) as BridgeRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  const { domain, payload = {} } = body;

  if (domain === 'bsf_b1') {
    try {
      const upstreamRes = await fetch(`${AI_URL}/api/v1/bsf/forecast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(2000),
      });

      if (upstreamRes.ok) {
        const upstreamData = await upstreamRes.json();
        return NextResponse.json({
          ok: true,
          mode: 'LIVE_FASTAPI',
          upstream: upstreamData,
        });
      }
    } catch {
      // Deterministic fallback
    }

    const currentWeightMg = Number(payload.current_weight_mg ?? payload.currentWeightMg ?? 150);
    const recentGrowthMgPerDay = Number(
      payload.recent_growth_mg_per_day ?? payload.recentGrowthMgPerDay ?? 18.5
    );
    const forecastHorizonDays = Number(
      payload.forecast_horizon_days ?? payload.forecastHorizonDays ?? 1
    );

    const predictedWeightMg = Number(
      (currentWeightMg + recentGrowthMgPerDay * forecastHorizonDays).toFixed(2)
    );

    return NextResponse.json({
      ok: true,
      mode: 'DETERMINISTIC_FALLBACK',
      domain: 'bsf_b1',
      model: 'BSF Model B1 + YOLO A1/A2 v3',
      result: {
        current_weight_mg: currentWeightMg,
        recent_growth_mg_per_day: recentGrowthMgPerDay,
        forecast_horizon_days: forecastHorizonDays,
        predicted_weight_mg: predictedWeightMg,
        bioconversion_efficiency_pct: 22.4,
        recommended_feed_ratio: '100 kg limbah organik dapur per 25 kg larva',
      },
      generatedAt: new Date().toISOString(),
    });
  }

  if (domain === 'water_analyze') {
    try {
      const upstreamRes = await fetch(`${AI_URL}/api/v1/water/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(2000),
      });

      if (upstreamRes.ok) {
        const upstreamData = await upstreamRes.json();
        return NextResponse.json({
          ok: true,
          mode: 'LIVE_FASTAPI',
          upstream: upstreamData,
        });
      }
    } catch {
      // Deterministic fallback
    }

    const dissolvedOxygen = Number(payload.dissolvedOxygenMgL ?? payload.dissolved_oxygen ?? 6.0);
    const ph = Number(payload.ph ?? 7.2);
    const tempC = Number(payload.temperatureC ?? payload.temperature_c ?? 28.0);

    const isDoLow = dissolvedOxygen < 4.0;
    const isPhAbnormal = ph < 6.5 || ph > 8.5;

    return NextResponse.json({
      ok: true,
      mode: 'DETERMINISTIC_FALLBACK',
      domain: 'water_analyze',
      model: 'Water Quality Random Forest v2.1',
      result: {
        status: isDoLow || isPhAbnormal ? 'PERHATIAN' : 'OPTIMAL',
        score: isDoLow ? 65 : 94,
        metrics: {
          dissolvedOxygenMgL: dissolvedOxygen,
          ph,
          temperatureC: tempC,
        },
        recommendation: isDoLow
          ? 'Tingkatkan aerasi turbin mikro-bubble segera.'
          : 'Kondisi air stabil dan ideal untuk siklus pembesaran.',
      },
      generatedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json(
    { ok: false, error: `Unsupported domain: ${domain}` },
    { status: 400 }
  );
}
