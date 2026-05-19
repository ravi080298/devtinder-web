import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    conneectionRemove: (state) => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addConnection, conneectionRemove } = connectionSlice.actions;

export default connectionSlice.reducer;
