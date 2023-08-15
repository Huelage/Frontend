import { RootState } from "@api/app/store";
import { globalStateInterface } from "@interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: globalStateInterface = {
  isAuthenticated: false,
  theme: "light"
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    switchTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    }
  }
});

// Dispatches
export const {
  setIsAuthenticated,
  switchTheme
} = globalSlice.actions;
// Selectors
export const getTheme = (state: RootState) => state.global.theme;
export const isAuthenticated = (state: RootState) => state.global.isAuthenticated;
// Reducer
export default globalSlice.reducer;