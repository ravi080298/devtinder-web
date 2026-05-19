import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionslice";
import requestReducer from "./requestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});
