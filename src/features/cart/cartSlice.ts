import { cartState } from "../../interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartService from "./cartService";

// state
const initialState: cartState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
  addSuccess: false,
  linkDetails: "",
  isLinkLoading: false,
  linkErrorMsg: "",
  isLinkError: false,
};

export const getCartTotal = (basket: []) =>
  basket?.reduce(
    (amount: any, item: any) => parseInt(item.price) + parseInt(amount),
    0
  );

export const createPaymentLink = createAsyncThunk(
  "cart/payment",
  async (cartData: {}, thunkAPI) => {
    try {
      return await cartService.createPaymentLink(cartData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
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
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentLink.pending, (state) => {
        state.isLinkLoading = true;
      })
      .addCase(
        createPaymentLink.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLinkLoading = false;
          state.linkDetails = action.payload;
        }
      )
      .addCase(
        createPaymentLink.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLinkLoading = false;
          state.linkErrorMsg = action.payload;
          state.isLinkError = true;
        }
      );
  },
});

export const { setCart, remove, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
