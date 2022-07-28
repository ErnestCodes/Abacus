import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import productSlice from "../features/products/productSlice";
import userSlice from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cartSlice from "../features/cart/cartSlice";
import OrderSlice from "../features/orders/OrderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  user: userSlice,
  cart: cartSlice,
  order: OrderSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
