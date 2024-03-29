import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState } from "../../interface";
const accessToken = localStorage.getItem("userAccess");
const refreshToken = localStorage.getItem("userRefresh");

const initialState: userState = {
  user: null,
  userAccessToken: accessToken ? accessToken : null,
  userRefreshToken: refreshToken ? refreshToken : null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
};

// Login user
// export const loadingUser = createAsyncThunk(
//   "auth/loginUser",
//   async (_, thunkAPI) => {
//     try {
//       return await userService.loadingUser();
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    userError: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
      state.userAccessToken = null;
      state.userRefreshToken = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loadingUser.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(
  //       loadingUser.fulfilled,
  //       (state, action: PayloadAction<object>) => {
  //         state.isLoading = false;
  //         state.isSuccess = true;
  //         state.user = action.payload;
  //       }
  //     )
  //     .addCase(loadingUser.rejected, (state, action: PayloadAction<any>) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.message = action.payload;
  //       state.user = null;
  //     });
  // },
});

export const { resetUser, setUser, userError } = userSlice.actions;
export default userSlice.reducer;
