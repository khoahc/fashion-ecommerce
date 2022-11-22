import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../services/axios/userApi";

const { loginWithEmail, getInfo } = userApi;

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await loginWithEmail({ email, password });
      localStorage.setItem("userToken", data.accessToken);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      // const { data } = await getInfo(config);
      const resp = await getInfo(config);
      console.log(resp);
      if (resp.status === 'OK') {
        return resp.data;
      }
      rejectWithValue(resp.message);
      return undefined;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
