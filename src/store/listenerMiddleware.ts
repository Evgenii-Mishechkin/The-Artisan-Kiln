import {
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import {
  addTileFromCatalog,
  decrementLineQuantity,
  type CartState,
  removeLine,
  setLineQuantity,
} from "@/store/slices/cartSlice";
import { resetGrid } from "@/store/slices/designGridSlice";
import type { DesignGridState } from "@/store/slices/designGridSlice";

type ListenerState = {
  cart: CartState;
  designGrid: DesignGridState;
};

export const cartDesignListener = createListenerMiddleware<ListenerState>();

cartDesignListener.startListening({
  matcher: isAnyOf(
    addTileFromCatalog,
    decrementLineQuantity,
    setLineQuantity,
    removeLine,
  ),
  effect: (_action, listenerApi) => {
    const { lines } = listenerApi.getState().cart;
    if (lines.length === 0) {
      listenerApi.dispatch(resetGrid());
    }
  },
});
