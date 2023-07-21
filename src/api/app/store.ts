import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@api/slices/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;