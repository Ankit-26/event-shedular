import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice/app-slice";

export const store = configureStore({
  reducer: {
    appReducer: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
