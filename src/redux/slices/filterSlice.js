import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  activeCategories: 0,
  sort: {
    id: 0,
    name: "популярности",
    type: "popular",
  },
  pageCount: 1,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action) =>{
      state.activeCategories = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setSortType: (state, action) => {
      state.sort = action.payload
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload
    },
    setQueryParams: (state, action) => {
      state.activeCategories = Number(action.payload.category);
      state.pageCount = Number(action.payload.page)
      state.sort = action.payload.sort
    }
  }
})


export const sortSelector = ({ filter }) => filter.sort;
export const filterSelector = ({ filter }) => filter;
export const pageCountSelector = ({ filter }) => filter.pageCount;


export const { setCategoryId, setSortType, setPageCount, setQueryParams, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;