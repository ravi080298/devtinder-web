import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    receiveRequest: (state, action) => {
      return action.payload;
    },
    receiveRequestRemove: (state) => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { receiveRequest, receiveRequestRemove } = requestSlice.actions;

export default requestSlice.reducer;
