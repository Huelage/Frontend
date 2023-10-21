import { RootState } from "@api/app/store";
import { CartInterface, entityInterface, globalStateInterface } from "@interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const initialState: globalStateInterface = {
  isVendor: false,
  showOnboard: true,
  entity: null,
  accessToken: null,
  themeType: "system",
  theme: "dark",
  cart: [],
  allowPush: true,
  allowToast: true,
  allowLocation: true
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ entity?: entityInterface, accessToken?: string; }>) => {
      const { entity, accessToken } = action.payload;
      if (entity) state.entity = entity;
      if (accessToken) state.accessToken = accessToken;
    },
    clearCredentials: (state) => {
      state.entity = null;
      state.accessToken = null;
    },
    setShowOnboard: (state, action: PayloadAction<boolean>) => {
      state.showOnboard = action.payload;
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
    toggleThemeType: (state) => {
      state.themeType = state.themeType === "system" ? "manual" : "system";
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    toggleAllowPush: (state) => {
      state.allowPush = !state.allowPush;
    },
    toggleAllowToast: (state) => {
      state.allowToast = !state.allowToast;
    },
    toggleAllowLocation: (state) => {
      state.allowLocation = !state.allowLocation;
    }
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
  setShowOnboard,
  switchTheme,
  toggleAllowLocation,
  toggleAllowPush,
  toggleAllowToast,
  toggleTheme,
  toggleThemeType
} = globalSlice.actions;
// Selectors
export const getAccessToken = (state: RootState) => state.global.accessToken;
export const getAllowLocation = (state: RootState) => state.global.allowLocation;
export const getAllowPush = (state: RootState) => state.global.allowPush;
export const getAllowToast = (state: RootState) => state.global.allowToast;
export const getCart = (state: RootState) => state.global.cart;
export const getEntity = (state: RootState) => state.global.entity;
export const getGlobalState = (state: RootState) => state.global;
export const getShowOnboard = (state: RootState) => state.global.showOnboard;
export const getTheme = (state: RootState) => state.global.theme;
export const getThemeType = (state: RootState) => state.global.themeType;
export const getVendorStatus = (state: RootState) => state.global.isVendor;
// Reducer
export default globalSlice.reducer;
