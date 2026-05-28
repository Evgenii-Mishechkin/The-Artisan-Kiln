import { TILE_BY_ID } from "@/constants/tiles";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT_RATE,
} from "@/constants/tiles";
import type { CartLine } from "@/types";

export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const tile = TILE_BY_ID[line.tileId];
    return sum + line.quantity * tile.unitPrice;
  }, 0);
}

/** Shipping applies only when the cart has at least one line. */
export function calculateShipping(
  subtotal: number,
  cartHasItems: boolean,
): number {
  if (!cartHasItems) return 0;
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
}

export function calculateGrandTotal(subtotal: number, shipping: number): number {
  return subtotal + shipping;
}
