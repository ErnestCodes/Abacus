import { cartState } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: cartState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
  addSuccess: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = [...state.items, action.payload];
      state.addSuccess = true;
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
    getCartTotal: (state, action) => {
      let { totalAmount, totalCount } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.totalAmount += itemTotal;
          cartTotal.totalCount += amount;
          return cartTotal;
        },
        {
          totalAmount: 0,
          totalCount: 0,
        }
      );
      state.totalAmount = parseInt(totalAmount.toFixed(2));
      state.totalCount = totalCount;
    },
  },
});

export const { setCart, remove, getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
