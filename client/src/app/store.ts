import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import productSlice from "../features/products/productSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
