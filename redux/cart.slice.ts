import { createSlice } from '@reduxjs/toolkit';
import { apiService } from '../services/apiService';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], //apiService.getCartData()
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item._id === action.payload._id);
      if (itemExists) {
        itemExists.quantity++;
        apiService.updateCart(action.payload._id, itemExists)
      } else {
        apiService.addToCart(action.payload)
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item._id === action.payload);
      item.quantity++;
      apiService.updateCart(action.payload, item)
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item._id === action.payload);
        apiService.deleteProductFromCart(action.payload)
        state.splice(index, 1);
        localStorage.setItem('cartData', JSON.stringify(state));
      } else {
        item.quantity--;
        apiService.updateCart(action.payload, item)
        localStorage.setItem('cartData', JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload);
      apiService.deleteProductFromCart(action.payload)
      state.splice(index, 1);
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    dataFromApiToCart: (state, action) => {
      for(let k in action.payload) {
        const found = state.some(el => el._id === action.payload[k]._id);
        if (!found) state.push(action.payload[k]);
      }
    },
    emptyCartOnLogout: (state, action) => {
      state = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  dataFromApiToCart,
  emptyCartOnLogout,
} = cartSlice.actions;
