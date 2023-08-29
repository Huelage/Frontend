import { RootState } from "@api/app/store";
import { globalStateInterface } from "@interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: globalStateInterface = {
  isAuthenticated: false,
  isVendor: false,
  theme: "light",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setVendorStatus: (state, action: PayloadAction<boolean>) => {
      state.isVendor = action.payload;
    },
    switchTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

// Dispatches
export const { setAuthStatus, setVendorStatus, switchTheme } =
  globalSlice.actions;
// Selectors
export const getAuthStatus = (state: RootState) => state.global.isAuthenticated;
export const getTheme = (state: RootState) => state.global.theme;
export const getVendorStatus = (state: RootState) => state.global.isVendor;
// Reducer
export default globalSlice.reducer;
