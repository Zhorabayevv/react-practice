import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/slice";
import basketSlice from "./basket/slice";
import productsSlice from "./product/slice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    basket: basketSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
