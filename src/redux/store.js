import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import basketSlice from './slices/basketSlice'
import productsSlice from './slices/productsSlice'


export const store = configureStore({
  reducer: {
    filter: filterSlice,
    basket: basketSlice,
    products: productsSlice,
  },
})