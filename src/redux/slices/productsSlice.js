import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProductsStatus",
  async ({ pageCount, categoryNames, sort, searchItemsName }) => {
    const { data } = await axios.get(
      `https://63c88c2c5c0760f69acdf3b4.mockapi.io/items?page=${pageCount}&limit=4${categoryNames}&sortBy=${sort.type}&order=desc&${searchItemsName}`
    );
    return data;
  }
);

const initialState = {
  products: [],
  status: "", // 'success' | 'loading' | 'failed'
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.status = "success";
    },
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
      state.products = [];
    },
    [fetchProducts.rejected]: (state) => {
      state.status = "failed";
      state.products = [];
    },
  },
});


export const productsSelector = ({ products }) => products;


export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
