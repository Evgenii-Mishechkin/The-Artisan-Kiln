import { describe, expect, it } from "vitest";
import {
  calculateGrandTotal,
  calculateShipping,
  calculateSubtotal,
} from "@/lib/totals";
import type { CartLine } from "@/types";

const lines: CartLine[] = [
  { id: "1", tileId: "ocean-wave", quantity: 10 },
];

describe("totals", () => {
  it("calculates subtotal as sum of qty * unit price", () => {
    expect(calculateSubtotal(lines)).toBe(280);
  });

  it("charges no shipping when cart is empty", () => {
    expect(calculateShipping(0, false)).toBe(0);
    expect(calculateShipping(500, false)).toBe(0);
  });

  it("charges flat shipping when subtotal is at threshold", () => {
    expect(calculateShipping(500, true)).toBe(25);
  });

  it("offers free shipping above threshold", () => {
    expect(calculateShipping(500.01, true)).toBe(0);
    expect(calculateShipping(600, true)).toBe(0);
  });

  it("calculates grand total", () => {
    expect(calculateGrandTotal(280, 25)).toBe(305);
    expect(calculateGrandTotal(600, 0)).toBe(600);
  });
});
