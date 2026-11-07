import { POINT_VALUE_IDR, MAX_REDEEM_RATIO } from '@/lib/constants';

// ============================================================================
// CHECKOUT PRICING & POINT REDEMPTION HELPERS
// ============================================================================

export interface PointRedemptionInput {
  balancePoints: number;
  subtotalIdr: number;
  enabled: boolean;
}

export interface PointRedemptionResult {
  redeemablePoints: number;
  discountIdr: number;
}

export interface CheckoutTotalsInput {
  subtotalIdr: number;
  shippingIdr: number;
  balancePoints: number;
  redeem: boolean;
}

export interface CheckoutTotalsResult {
  subtotalIdr: number;
  shippingIdr: number;
  redeemablePoints: number;
  discountIdr: number;
  totalIdr: number;
}

/**
 * Computes circular point redemption:
 * Maximum discount is capped at MAX_REDEEM_RATIO (20%) of subtotal or wallet balance.
 */
export function computePointRedemption(input: PointRedemptionInput): PointRedemptionResult {
  const { balancePoints, subtotalIdr, enabled } = input;
  if (!enabled || balancePoints <= 0) {
    return { redeemablePoints: 0, discountIdr: 0 };
  }

  const maxDiscountCap = Math.floor(subtotalIdr * MAX_REDEEM_RATIO);
  const maxPossibleFromPoints = balancePoints * POINT_VALUE_IDR;
  const maxDiscount = Math.min(maxPossibleFromPoints, maxDiscountCap);

  const redeemablePoints = Math.floor(maxDiscount / POINT_VALUE_IDR);
  const discountIdr = redeemablePoints * POINT_VALUE_IDR;

  return {
    redeemablePoints,
    discountIdr,
  };
}

/**
 * Computes complete checkout totals including subtotal, shipping, and discounts.
 *
 * @example
 * computeCheckoutTotals({ subtotalIdr: 16000000, shippingIdr: 250000, balancePoints: 3000, redeem: true })
 * // => { subtotalIdr: 16000000, shippingIdr: 250000, redeemablePoints: 3000, discountIdr: 300000, totalIdr: 15950000 }
 */
export function computeCheckoutTotals(input: CheckoutTotalsInput): CheckoutTotalsResult {
  const { redeemablePoints, discountIdr } = computePointRedemption({
    balancePoints: input.balancePoints,
    subtotalIdr: input.subtotalIdr,
    enabled: input.redeem,
  });

  const totalIdr = input.subtotalIdr + input.shippingIdr - discountIdr;

  return {
    subtotalIdr: input.subtotalIdr,
    shippingIdr: input.shippingIdr,
    redeemablePoints,
    discountIdr,
    totalIdr,
  };
}
