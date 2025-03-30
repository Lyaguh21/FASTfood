import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios from "axios";
import { PREFIX } from "../helpers/API";
import { LoginResponse } from "../pages/Login/Login";
import { ProfileProps } from "../interfaces/user.interface";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}

export interface userState {
  jwt: string | null;
  loginErrorMessage?: null | string;
  profile?: ProfileProps;
}

const initialState: userState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
      email: params.email,
      password: params.password,
    });
    return data;
  }
);

export const getProfile = createAsyncThunk<
  ProfileProps,
  void,
  { state: RootState }
>("user/profile", async (_, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;
  const { data } = await axios.get<ProfileProps>(`${PREFIX}/user/profile`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.jwt = action.payload.access_token;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
