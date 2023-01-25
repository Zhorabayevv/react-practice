import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  products: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct: (state, action) => {
        const findProduct = state.products.find(item => item.id === action.payload.id);
        if (findProduct) {
           findProduct.count ++;
        } else {            
            state.products.push({
                ...action.payload,
                count: 1,
            });
        }
        state.totalPrice = state.products.reduce((sum, product) => sum + product.price * product.count, 0);
    },
    removeProduct: (state, action) => {
        const findProduct = state.products.find(item => item.id === action.payload.id);
        if (findProduct) {
            if (findProduct.count > 1) {
                findProduct.count --;
            } else {
                state.products = state.products.filter(item => item.id !== action.payload.id);
            }
        }
        state.totalPrice = state.totalPrice - findProduct.price;
        // state.totalPrice = state.products.
    },
    removeProducts: (state, action) => {
        state.products = state.products.filter(item => item.id !== action.payload);
        state.totalPrice = state.products.reduce((sum, product) => sum + product.price * product.count, 0);
    },
    clearBasket: (state) => {
        state.products = [];
        state.totalPrice = 0;
    },
  }
});


export const basketSelector = ({basket}) => basket;
export const basketProductsSelector = (i) => ({ basket }) => basket.products.find((item) => item.id === i);

export const {addProduct, removeProduct, removeProducts, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;