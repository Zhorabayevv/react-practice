import { fetchProducts } from './asyncActions';
import { ProductInterface, Status } from './types';
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductInterface = {
  products: [],
  status: Status.LOADING,
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.products = [];
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.FAILED;
      state.products = [];
    });
  },
  // extraReducers: {
  //   [fetchProducts.fulfilled]: (state, action) => {
  //     state.products = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchProducts.pending]: (state) => {
  //     state.status = "loading";
  //     state.products = [];
  //   },
  //   [fetchProducts.rejected]: (state) => {
  //     state.status = "failed";
  //     state.products = [];
  //   },
  // },
});

export const productsSelector = (state: RootState) => state.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
