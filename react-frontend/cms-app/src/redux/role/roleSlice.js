import { createSlice } from "@reduxjs/toolkit";
import { getRoles } from "./roleAction";

const initialState = {
    loading: false,
    roles: null,
    error: null,
    success: false,
  };

  const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: {
      [getRoles.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [getRoles.fulfilled]: (state, { payload }) => {
          state.loading = false;
          state.roles = payload;
          state.success = true;
      },
      [getRoles.rejected]: (state, { payload }) => {
          state.loading = false;
          state.error = payload;
      }
    },
  });
  
  export default roleSlice.reducer;
  