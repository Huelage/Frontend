import { RootState } from "@api/app/store";
import { globalStateInterface } from "@interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: globalStateInterface = {
  isAuthenticated: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Dispatches
export const { setIsAuthenticated } = globalSlice.actions;
// Selectors
export const isAuthenticated = (state: RootState) =>
  state.global.isAuthenticated;
// Reducer
export default globalSlice.reducer;
