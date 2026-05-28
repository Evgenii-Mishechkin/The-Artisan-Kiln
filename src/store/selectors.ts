import { createSelector } from "@reduxjs/toolkit";
import {
  calculateGrandTotal,
  calculateShipping,
  calculateSubtotal,
} from "@/lib/totals";
import type { RootState } from "@/store";

export const selectCartLines = (state: RootState) => state.cart.lines;

export const selectCartLineCount = createSelector(
  selectCartLines,
  (lines) => lines.length,
);

export const selectSubtotal = createSelector(selectCartLines, calculateSubtotal);

export const selectShipping = createSelector(
  selectCartLines,
  selectSubtotal,
  (lines, subtotal) => calculateShipping(subtotal, lines.length > 0),
);

export const selectGrandTotal = createSelector(
  selectSubtotal,
  selectShipping,
  calculateGrandTotal,
);

export const selectPaletteTileIds = createSelector(selectCartLines, (lines) =>
  [...new Set(lines.map((l) => l.tileId))],
);

export const selectDesignCells = (state: RootState) => state.designGrid.cells;
