import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authState, productState } from "../../interface";
import productService from "./productService";

const initialState: productState = {
  products: [],
  isProductError: false,
  isProductSuccess: false,
  isProductLoading: false,
  productMessage: "",
};

// Create new goal
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData: any, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
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

// Get user goals
export const getProducts = createAsyncThunk(
  "product/getProduct",
  async (productId: string, thunkAPI) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("accessToken") as any
      );
      return await productService.getProducts(accessToken, productId);
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

export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProduct();
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

// Delete a product
export const deleteProduct = createAsyncThunk(
  "goals/delete",
  async (productId: string, thunkAPI) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("accessToken") as string
      );
      const refreshToken = JSON.parse(
        localStorage.getItem("refreshToken") as string
      );
      return await productService.deleteProduct(
        productId,
        accessToken,
        refreshToken
      );
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isProductLoading = false;
          state.isProductSuccess = true;
          state.products = action.payload;
        }
      )
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action: PayloadAction<any>) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      });
  },
});

export const { productReset } = productSlice.actions;
export default productSlice.reducer;
