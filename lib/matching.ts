import type { Pond, FishOrder, AllocationSuggestion, Farm } from '@/lib/types';

/**
 * Calculates match score (0-100%) between a harvest-ready pond and a buyer fish order.
 * - Species match: +40 pts
 * - Size grade fit: +30 pts (or +15 if within ±50g)
 * - Harvest readiness: +26 pts ('Siap Panen') or +12 pts ('Mendekati Panen')
 */
export function scorePondForOrder(
  pond: Pond,
  order: FishOrder
): { scorePct: number; reason: string } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Species Match (+40)
  if (pond.species === order.species) {
    score += 40;
    reasons.push(`Komoditas cocok (${pond.species})`);
  } else {
    reasons.push(`Komoditas berbeda (${pond.species} vs ${order.species})`);
  }

  // 2. Size Grade Match (+30 / +15)
  // Parse label like "300-400g/ekor" or "500-700g"
  let minG = 0;
  let maxG = 9999;
  const match = order.sizeGradeLabel.match(/(\d+)\s*-\s*(\d+)/);
  if (match) {
    minG = parseInt(match[1], 10);
    maxG = parseInt(match[2], 10);
  }

  const avgWeight = pond.harvest.avgWeightG;
  if (avgWeight >= minG && avgWeight <= maxG) {
    score += 30;
    reasons.push(`Ukuran ikan ideal (${avgWeight}g masuk rentang ${minG}-${maxG}g)`);
  } else if (avgWeight >= minG - 50 && avgWeight <= maxG + 50) {
    score += 15;
    reasons.push(`Ukuran mendekati toleransi (${avgWeight}g ±50g)`);
  } else {
    reasons.push(`Ukuran belum sesuai target (${avgWeight}g)`);
  }

  // 3. Harvest Readiness (+26 / +12)
  if (pond.harvest.readinessStatus === 'Siap Panen') {
    score += 26;
    reasons.push('Status kolam Siap Panen');
  } else if (pond.harvest.readinessStatus === 'Mendekati Panen') {
    score += 12;
    reasons.push('Status kolam Mendekati Panen');
  } else {
    reasons.push('Status kolam Belum Siap');
  }

  return {
    scorePct: Math.min(100, Math.max(0, score)),
    reason: reasons.join(' · '),
  };
}

/**
 * Evaluates all ponds in a farm and ranks them by suitability for an order.
 */
export function rankPondsForOrder(
  order: FishOrder,
  ponds: Pond[],
  farm: Farm
): AllocationSuggestion[] {
  const suggestions: AllocationSuggestion[] = ponds.map((pond) => {
    const { scorePct, reason } = scorePondForOrder(pond, order);
    const suggestedKg = Math.min(order.quantityKg, pond.harvest.estimatedBiomassKg);

    return {
      pondId: pond.id,
      pondName: pond.name,
      farmId: farm.id,
      farmName: farm.name,
      species: pond.species,
      estimatedBiomassKg: pond.harvest.estimatedBiomassKg,
      avgWeightG: pond.harvest.avgWeightG,
      readinessStatus: pond.harvest.readinessStatus,
      windowStart: pond.harvest.windowStart,
      windowEnd: pond.harvest.windowEnd,
      suggestedKg,
      matchScorePct: scorePct,
      reason,
    };
  });

  return suggestions.sort((a, b) => b.matchScorePct - a.matchScorePct);
}
