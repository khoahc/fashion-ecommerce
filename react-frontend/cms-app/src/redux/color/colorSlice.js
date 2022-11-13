import { createSlice } from "@reduxjs/toolkit";
import { getAllColor } from "./colorAction";

const initialState = {
  loading: false,
  colors: null,
  error: null,
  success: false,
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllColor.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllColor.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.colors = payload;
        state.success = true;
    },
    [getAllColor.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload;
    }
  },
});

export default colorSlice.reducer;
