import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authState, productState } from "../../interface";
import productService from "./productService";

const initialState: productState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData: object, { getState }) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("accessToken") as string
      );
      console.log(accessToken);
      return await productService.createProduct(productData, accessToken);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
      // return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user goals
export const getProducts = createAsyncThunk(
  "product/getProduct",
  async (_, { getState }) => {
    try {
      const token = localStorage.getItem("token") as any;
      const id = getState() as { id: productState };
      return await productService.getProducts(token.accessToken, id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user goal
// export const deleteGoal = createAsyncThunk(
//   'goals/delete',
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await goalService.deleteGoal(id, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
