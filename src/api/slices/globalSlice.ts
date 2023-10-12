import { RootState } from "@api/app/store";
import { CartInterface, entityInterface, globalStateInterface } from "@interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const initialState: globalStateInterface = {
  isVendor: false,
  entity: null,
  accessToken: null,
  themeType: "system",
  theme: "dark",
  cart: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ entity: entityInterface, accessToken: string; }>) => {
      const { entity, accessToken } = action.payload;
      state.entity = entity;
      state.accessToken = accessToken;
    },
    clearCredentials: (state) => {
      state.entity = null;
      state.accessToken = null;
    },
    setVendorStatus: (state, action: PayloadAction<boolean>) => {
      state.isVendor = action.payload;
    },
    switchTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    addItemToCart: (state, action: PayloadAction<CartInterface>) => {
      const idx = state.cart.findIndex((item) => item.item_id === action.payload.item_id);
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
      if (index === -1) return;
      state.cart[index] = action.payload;
    },
    clearCart: state => { state.cart = []; },
  },
});

// Dispatches
export const {
  addItemToCart,
  clearCart,
  clearCredentials,
  removeFromCart,
  updateCart,
  setCredentials,
  setVendorStatus,
  switchTheme
} = globalSlice.actions;
// Selectors
export const getTheme = (state: RootState) => state.global.theme;
export const getVendorStatus = (state: RootState) => state.global.isVendor;
export const getCart = (state: RootState) => state.global.cart;
export const getEntity = (state: RootState) => state.global.entity;
// Reducer
export default globalSlice.reducer;
