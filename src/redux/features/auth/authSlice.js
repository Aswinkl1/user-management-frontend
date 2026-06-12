import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestAccessToken, userLogin } from "./authService";
import axios from "axios";
const initialState = {
  token: "",
  user: null,
  isAuthenticated: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    resetError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      console.log("action", action);
      state.user = action.payload?.data;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      // state.user = action.payload.data;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.isAuthenticated = true;
      state.token = action.payload.accessToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      console.log("she");
      state.token = action.payload?.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload?.data;
    });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await userLogin(userData);
    } catch (error) {
      console.log("hey man");
      console.log(error);

      const message = error.response?.data?.message || "Login failed";

      // 3. This forces the PROMISE to REJECT with your custom message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      return await requestAccessToken();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + "/logout",
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("eer", error);
    }
  }
);

export default authSlice.reducer;
export const { logout, resetError, updateUser } = authSlice.actions;
