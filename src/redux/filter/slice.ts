import { SortInterface } from './types';
import { SortType } from './types';
import { FilterInterface } from './types';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: FilterInterface = {
  searchValue: "",
  activeCategories: 0,
  sort: {
    id: "0",
    name: "популярности",
    type: SortType.POPULAR,
  },
  pageCount: 1,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.activeCategories = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortInterface>) => {
      state.sort = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    setQueryParams: (state, action: PayloadAction<FilterInterface>) => {
      state.activeCategories = Number(action.payload.activeCategories);
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setPageCount,
  setQueryParams,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
