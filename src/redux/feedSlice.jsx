import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addfeed: (state, action) => {
      return action.payload;
    },
    removefeed: (state) => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addfeed, removefeed } = feedSlice.actions;

export default feedSlice.reducer;
