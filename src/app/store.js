import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});
