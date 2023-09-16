import { RootState } from "@api/app/store";
import { CartInterface, globalStateInterface } from "@interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const initialState: globalStateInterface = {
  isAuthenticated: false,
  isVendor: false,
  themeType: "system",
  theme: "light",
  cart: [],
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
    addToCart: (state, action: PayloadAction<CartInterface>) => {
      const idx = state.cart.findIndex((item) => item.id === action.payload.id);
      if (idx !== -1) {
        state.cart[idx].quantity += action.payload.quantity;
        return;
      }
      state.cart.push({ ...action.payload, id: uuid.v4().toString() });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCart: (state, action: PayloadAction<CartInterface>) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      state.cart[index] = action.payload;
    },
    clearCart: state => { state.cart = []; },
  },
});

// Dispatches
export const {
  addToCart,
  clearCart,
  removeFromCart,
  updateCart,
  setAuthStatus,
  setVendorStatus,
  switchTheme
} = globalSlice.actions;
// Selectors
export const getAuthStatus = (state: RootState) => state.global.isAuthenticated;
export const getTheme = (state: RootState) => state.global.theme;
export const getVendorStatus = (state: RootState) => state.global.isVendor;
export const getCart = (state: RootState) => state.global.cart;
// Reducer
export default globalSlice.reducer;
