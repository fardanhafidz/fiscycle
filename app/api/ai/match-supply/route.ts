import { NextResponse, type NextRequest } from 'next/server';
import { SEED_ORDERS, SEED_PONDS, SEED_FARM } from '@/mocks/seed';
import { rankPondsForOrder } from '@/lib/matching';
import type { FishOrder } from '@/lib/types';

const AI_URL = process.env.FISCYCLE_AI_URL || 'http://127.0.0.1:8000';

interface MatchSupplyRequestBody {
  orderId?: string;
  order?: Partial<FishOrder>;
}

export async function POST(req: NextRequest) {
  let body: MatchSupplyRequestBody = {};
  try {
    body = (await req.json()) as MatchSupplyRequestBody;
  } catch {
    // If empty body, fall back to default pending order
  }

  const { orderId, order: customOrder } = body;

  // Determine target order
  let targetOrder: FishOrder | undefined;

  if (orderId) {
    targetOrder = SEED_ORDERS.find(
      (o) => o.id.toUpperCase() === orderId.toUpperCase()
    );
  }

  if (!targetOrder && customOrder) {
    const baseOrder = SEED_ORDERS[0];
    const qty = customOrder.quantityKg ?? 500;
    const price = customOrder.pricePerKgIdr ?? 32000;
    const subtotal = qty * price;

    targetOrder = {
      ...baseOrder,
      ...customOrder,
      id: customOrder.id || 'ORD-CUSTOM',
      buyerUserId: customOrder.buyerUserId || 'USR-B2B-01',
      buyerName: customOrder.buyerName || 'ABC Restaurant',
      buyerChannel: customOrder.buyerChannel || 'b2b',
      species: customOrder.species || 'Nila',
      sizeGradeLabel: customOrder.sizeGradeLabel || '300-400g/ekor',
      quantityKg: qty,
      pricePerKgIdr: price,
      subtotalIdr: subtotal,
      totalIdr: subtotal,
      deliveryAddress: customOrder.deliveryAddress || 'Jl. Basuki Rahmat No. 45, Surabaya',
      deliveryDate: customOrder.deliveryDate || '2026-11-16',
      status: customOrder.status || 'Menunggu Alokasi',
    };
  }

  // Fallback to Golden Thread order ORD-0241 or first pending B2B order
  if (!targetOrder) {
    targetOrder =
      SEED_ORDERS.find((o) => o.id === 'ORD-0241') ||
      SEED_ORDERS.find((o) => o.buyerChannel === 'b2b') ||
      SEED_ORDERS[0];
  }

  // 1. Try forwarding to external AI backend
  try {
    const upstreamRes = await fetch(`${AI_URL}/api/v1/match-supply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: targetOrder }),
      signal: AbortSignal.timeout(1500),
    });

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      return NextResponse.json({
        ok: true,
        mode: 'LIVE_FASTAPI',
        orderId: targetOrder.id,
        ...data,
      });
    }
  } catch {
    // Upstream not reached -> continue to deterministic fallback
  }

  // 2. Deterministic AI Matching Fallback
  const rankedSuggestions = rankPondsForOrder(targetOrder, SEED_PONDS, SEED_FARM);

  return NextResponse.json({
    ok: true,
    mode: 'DETERMINISTIC_FALLBACK',
    orderId: targetOrder.id,
    order: {
      id: targetOrder.id,
      buyerName: targetOrder.buyerName,
      species: targetOrder.species,
      sizeGradeLabel: targetOrder.sizeGradeLabel,
      quantityKg: targetOrder.quantityKg,
      deliveryDate: targetOrder.deliveryDate,
    },
    topMatch: rankedSuggestions[0] ?? null,
    recommendations: rankedSuggestions,
  });
}
