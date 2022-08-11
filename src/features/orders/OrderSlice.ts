import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderState } from "../../interface";
// import orderService from "./OrderService";

const initialState: orderState = {
  order: [],
  orderSuccess: false,
};

// export const createOrders = createAsyncThunk(
//   "order/create",
//   async (orderData: {}, thunkAPI) => {
//     try {
//       return await orderService.createOrder(orderData);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = [...state.order, action.payload];
      state.orderSuccess = true;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
