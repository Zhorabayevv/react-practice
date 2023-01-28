import { RootState } from "../store";
export const basketSelector = (state: RootState) => state.basket;
export const basketProductsSelector = (i: string) => (state: RootState) =>
  state.basket.products.find((item) => item.id === i);
