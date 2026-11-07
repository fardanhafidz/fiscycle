import { NextResponse, type NextRequest } from 'next/server';
import { SEED_PONDS } from '@/mocks/seed';
import { derivePondStatus } from '@/lib/telemetry';

const AI_URL = process.env.FISCYCLE_AI_URL || 'http://127.0.0.1:8000';

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ pondId: string }> }
) {
  const { pondId } = await context.params;
  const normalizedId = pondId.toUpperCase();

  // 1. Try forwarding to external AI backend if running
  try {
    const upstreamRes = await fetch(`${AI_URL}/api/v1/recommend/${normalizedId}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(1500),
    });

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      return NextResponse.json({
        ok: true,
        mode: 'LIVE_FASTAPI',
        pondId: normalizedId,
        ...data,
      });
    }
  } catch {
    // Upstream not reached -> continue to deterministic fallback
  }

  // 2. Deterministic Fallback using seeded pond state
  const pond = SEED_PONDS.find(
    (p) => p.id.toUpperCase() === normalizedId || p.id.replace('-', '').toUpperCase() === normalizedId.replace('-', '')
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

  const derivedStatus = derivePondStatus(pond.telemetry);

  return NextResponse.json({
    ok: true,
    mode: 'DETERMINISTIC_FALLBACK',
    pondId: pond.id,
    pondName: pond.name,
    species: pond.species,
    status: derivedStatus,
    activeInsight: pond.activeInsight,
    telemetry: pond.telemetry,
    harvest: pond.harvest,
    feed: pond.feed,
    recommendations: pond.activeInsight
      ? [
          {
            title: pond.activeInsight.parameterLabel,
            action: pond.activeInsight.recommendedActions[0] || pond.activeInsight.summary,
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
