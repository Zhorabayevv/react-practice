import axios from 'axios';
import { GetProductInterface, FetchProductsInterface } from './types';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk<
  GetProductInterface[],
  FetchProductsInterface
>("product/fetchProductsStatus", async (params) => {
  const { pageCountN, categoryNames, sort, searchItemsName } = params;
  const page = pageCountN ? `&page=${pageCountN}` : "";
  const category = categoryNames ? `&category=${categoryNames}` : "";
  const sortBy = sort.type ? `&sortBy=${sort.type}` : "";
  const search = searchItemsName ? `&search=${searchItemsName}` : "";
  const { data } = await axios.get<GetProductInterface[]>(
    `https://63c88c2c5c0760f69acdf3b4.mockapi.io/items?${page}&limit=4&${category}&${sortBy}&order=desc&${search}`
  );
  return data;
});