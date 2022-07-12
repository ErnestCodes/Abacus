import { cartState } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createSlice } from "@reduxjs/toolkit";

const { user } = useSelector((state: RootState) => state.user);

const initialState: cartState = {
  items: [],
  user: user ? user : null,
  totalAmount: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
