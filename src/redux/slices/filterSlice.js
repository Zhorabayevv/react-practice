import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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

export const { setCategoryId, setSortType, setPageCount, setQueryParams } = filterSlice.actions;

export default filterSlice.reducer;