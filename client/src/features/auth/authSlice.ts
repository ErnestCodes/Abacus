import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { authState } from "../../interface";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem("user") as string);
const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
const refreshToken = JSON.parse(localStorage.getItem("refreshToken") as string);

const initialState: authState = {
  user: user ? user : null,
  accessToken: accessToken ? accessToken : null,
  refreshToken: refreshToken ? refreshToken : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// // Register user
// export const register = createAsyncThunk(
//   "auth/register",
//   async (user: [], thunkAPI) => {
//     try {
//       return await authService.register(user);
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

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: object, thunkAPI) => {
    try {
      return await authService.login(user);
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

// Load user
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (token: { accessToken: string; refreshToken: string }, thunkAPI) => {
    try {
      return await authService.loadUser(token.accessToken, token.refreshToken);
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

export const logout = createAsyncThunk(
  "auth/logout",
  async (token: { accessToken: string; refreshToken: string }) => {
    await authService.logout(token.accessToken, token.refreshToken);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<object>) => {
        const { accessToken, refreshToken } = action.payload as any;
        state.isLoading = false;
        state.isSuccess = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<object>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
