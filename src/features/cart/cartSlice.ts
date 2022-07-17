import { cartState } from "../../interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: cartState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
  addSuccess: false,
};

export const getCartTotal = (basket: []) =>
  basket?.reduce(
    (amount: any, item: any) => parseInt(item.price) + parseInt(amount),
    0
  );

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
  },
});

export const { setCart, remove } = cartSlice.actions;
export default cartSlice.reducer;
