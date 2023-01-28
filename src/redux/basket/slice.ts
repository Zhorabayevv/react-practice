import { BasketProductInterface, ProductInterface } from "./types";
import { calcTotalPrice } from "../../utiles/calcTotalPrice";
import { getBasketFromLS } from "../../utiles/getProductsFromLS";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const basketData = getBasketFromLS();

const initialState: BasketProductInterface = {
  totalPrice: basketData.totalPrice,
  products: basketData.items,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductInterface>) => {
      const findProduct = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.products);
    },
    removeProduct: (state, action: PayloadAction<ProductInterface>) => {
      const findProduct = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (findProduct) {
        if (findProduct.count > 1) {
          findProduct.count--;
        } else {
          state.products = state.products.filter(
            (item) => item.id !== action.payload.id
          );
        }
        state.totalPrice = state.totalPrice - findProduct.price;
      }
    },
    removeProducts: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      state.totalPrice = state.products.reduce(
        (sum, product) => sum + product.price * product.count,
        0
      );
    },
    clearBasket: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, removeProducts, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
