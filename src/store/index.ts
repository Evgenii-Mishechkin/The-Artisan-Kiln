import { configureStore } from "@reduxjs/toolkit";
import { cartDesignListener } from "@/store/listenerMiddleware";
import cartReducer from "@/store/slices/cartSlice";
import designGridReducer from "@/store/slices/designGridSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      designGrid: designGridReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(cartDesignListener.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
