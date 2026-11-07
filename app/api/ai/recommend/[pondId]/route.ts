import { NextResponse, type NextRequest } from 'next/server';
import { SEED_PONDS } from '@/mocks/seed';
import { derivePondStatus } from '@/lib/telemetry';

const AI_URL = process.env.FISCYCLE_AI_URL || 'http://127.0.0.1:8000';
const AI_TOKEN = process.env.FISCYCLE_AI_TOKEN || '';

function toNaiveWibIso(date = new Date()): string {
  const wibMs = date.getTime() + 7 * 60 * 60 * 1000;
  return new Date(wibMs).toISOString().slice(0, 19);
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ pondId: string }> }
) {
  const { pondId } = await context.params;
  const normalizedId = pondId.toUpperCase();

  const pond = SEED_PONDS.find(
    (p) =>
      p.id.toUpperCase() === normalizedId ||
      p.id.replace('-', '').toUpperCase() === normalizedId.replace('-', '')
  );

  if (!pond) {
    return NextResponse.json(
      {
        ok: false,
        error: `Kolam dengan ID '${pondId}' tidak ditemukan.`,
        availablePonds: SEED_PONDS.map((p) => p.id),
      },
      { status: 404 }
    );
  }

  const url = new URL(req.url);
  const ph = Number(url.searchParams.get('ph') ?? pond.telemetry.ph);
  const temperatureC = Number(
    url.searchParams.get('temperatureC') ?? pond.telemetry.temperatureC
  );
  const turbidityNtu = Number(
    url.searchParams.get('turbidityNtu') ?? pond.telemetry.turbidityNtu
  );
  const dissolvedOxygenMgL = Number(
    url.searchParams.get('doMgL') ?? pond.telemetry.dissolvedOxygenMgL
  );

  const telemetry = {
    ...pond.telemetry,
    ph,
    temperatureC,
    turbidityNtu,
    dissolvedOxygenMgL,
  };
  const derivedStatus = derivePondStatus(telemetry);

  const fallbackForecasts = [
    {
      horizon_minutes: 30,
      ph: Number((ph - 0.03).toFixed(2)),
      temperature_c: Number((temperatureC + 0.1).toFixed(2)),
      turbidity_ntu: Number((turbidityNtu + 0.6).toFixed(1)),
    },
    {
      horizon_minutes: 60,
      ph: Number((ph - 0.05).toFixed(2)),
      temperature_c: Number((temperatureC + 0.2).toFixed(2)),
      turbidity_ntu: Number((turbidityNtu + 1.2).toFixed(1)),
    },
    {
      horizon_minutes: 120,
      ph: Number((ph - 0.08).toFixed(2)),
      temperature_c: Number((temperatureC + 0.3).toFixed(2)),
      turbidity_ntu: Number((turbidityNtu + 2.1).toFixed(1)),
    },
  ];

  // 1. Try forwarding to external AI backend (/water-quality/analyze) if running
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (AI_TOKEN) {
      headers['Authorization'] = `Bearer ${AI_TOKEN}`;
    }

    const upstreamRes = await fetch(`${AI_URL}/water-quality/analyze`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        pond_id: pond.id,
        timestamp: toNaiveWibIso(),
        mode: 'historical_replay',
        ph,
        temperature_c: temperatureC,
        turbidity_ntu: turbidityNtu,
      }),
      signal: AbortSignal.timeout(2500),
    });

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      return NextResponse.json({
        ok: true,
        mode: 'LIVE_FASTAPI',
        pondId: pond.id,
        pondName: pond.name,
        species: pond.species,
        status: derivedStatus,
        telemetry,
        forecasts: data.predictions ?? fallbackForecasts,
        waterDss: data.decision_support ?? null,
        recommendations:
          data.decision_support?.recommendations?.length > 0
            ? data.decision_support.recommendations.map((rec: string, idx: number) => ({
                title: idx === 0 ? 'Rekomendasi Model Air A/B/C' : `Tindakan Lanjutan #${idx + 1}`,
                action: rec,
                severity: derivedStatus === 'Kritis' ? 'Kritis' : 'Perhatian',
              }))
            : [
                {
                  title:
                    dissolvedOxygenMgL < 4.5
                      ? 'Peringatan Oksigen Terlarut (DO)'
                      : 'Prediksi Air 30/60/120m Stabil',
                  action:
                    dissolvedOxygenMgL < 4.5
                      ? 'Nyalakan aerator kincir cadangan dan tunda pakan 2 jam.'
                      : 'Parameter pH, Suhu, dan Kekeruhan diprediksi aman dalam 120 menit ke depan.',
                  severity: dissolvedOxygenMgL < 4.5 ? 'Kritis' : 'Informasi',
                },
              ],
      });
    }
  } catch {
    // Upstream not reached -> continue to deterministic fallback
  }

  // 2. Deterministic Fallback using seeded pond state
  return NextResponse.json({
    ok: true,
    mode: 'DETERMINISTIC_FALLBACK',
    pondId: pond.id,
    pondName: pond.name,
    species: pond.species,
    status: derivedStatus,
    activeInsight: pond.activeInsight,
    telemetry,
    harvest: pond.harvest,
    feed: pond.feed,
    forecasts: fallbackForecasts,
    recommendations:
      dissolvedOxygenMgL < 4.5
        ? [
            {
              title: 'Oksigen Terlarut (DO) Rendah',
              action:
                'Aktifkan aerator tambahan segera dan kurangi porsi pakan sore hingga DO > 5,0 mg/L.',
              severity: 'Kritis',
            },
          ]
        : pond.activeInsight
        ? [
            {
              title: pond.activeInsight.parameterLabel,
              action:
                pond.activeInsight.recommendedActions[0] || pond.activeInsight.summary,
              severity: pond.activeInsight.severity,
            },
          ]
        : [
            {
              title: 'Kondisi Air Optimal',
              action: 'Pertahankan aerasi dan jadwal pakan harian sesuai SOP.',
              severity: 'Informasi',
            },
          ],
  });
}
