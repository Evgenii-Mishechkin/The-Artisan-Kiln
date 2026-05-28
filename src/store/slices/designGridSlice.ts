import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TileId } from "@/types";
import { GRID_CELL_COUNT } from "@/types";

export interface DesignGridState {
  cells: (TileId | null)[];
}

const emptyGrid = (): (TileId | null)[] =>
  Array.from({ length: GRID_CELL_COUNT }, () => null);

const initialState: DesignGridState = {
  cells: emptyGrid(),
};

const designGridSlice = createSlice({
  name: "designGrid",
  initialState,
  reducers: {
    placeTile(
      state,
      action: PayloadAction<{ index: number; tileId: TileId }>,
    ) {
      const { index, tileId } = action.payload;
      if (index >= 0 && index < state.cells.length) {
        state.cells[index] = tileId;
      }
    },
    clearCell(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.cells.length) {
        state.cells[index] = null;
      }
    },
    resetGrid(state) {
      state.cells = emptyGrid();
    },
  },
});

export const { placeTile, clearCell, resetGrid } = designGridSlice.actions;
export default designGridSlice.reducer;
