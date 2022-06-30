import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productState } from "../../interface";

const initialState: productState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
