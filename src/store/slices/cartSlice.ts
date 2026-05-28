import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartLine, TileId } from "@/types";

export interface CartState {
  lines: CartLine[];
}

const initialState: CartState = {
  lines: [],
};

function nextLineId(): string {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTileFromCatalog(state, action: PayloadAction<TileId>) {
      const existing = state.lines.find((l) => l.tileId === action.payload);
      if (existing) {
        existing.quantity += 1;
        return;
      }
      state.lines.push({
        id: nextLineId(),
        tileId: action.payload,
        quantity: 1,
      });
    },
    incrementLineQuantity(state, action: PayloadAction<string>) {
      const line = state.lines.find((l) => l.id === action.payload);
      if (line) line.quantity += 1;
    },
    decrementLineQuantity(state, action: PayloadAction<string>) {
      const index = state.lines.findIndex((l) => l.id === action.payload);
      if (index === -1) return;
      const line = state.lines[index]!;
      if (line.quantity <= 1) {
        state.lines.splice(index, 1);
      } else {
        line.quantity -= 1;
      }
    },
    setLineQuantity(
      state,
      action: PayloadAction<{ lineId: string; quantity: number }>,
    ) {
      const { lineId, quantity } = action.payload;
      const index = state.lines.findIndex((l) => l.id === lineId);
      if (index === -1) return;
      if (quantity < 1) {
        state.lines.splice(index, 1);
        return;
      }
      state.lines[index]!.quantity = quantity;
    },
    removeLine(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((l) => l.id !== action.payload);
    },
  },
});

export const {
  addTileFromCatalog,
  incrementLineQuantity,
  decrementLineQuantity,
  setLineQuantity,
  removeLine,
} = cartSlice.actions;

export default cartSlice.reducer;
