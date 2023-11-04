import globalReducer from "@api/slices/globalSlice";
import { globalStateInterface } from "@interfaces";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, createTransform, persistReducer, persistStore } from "redux-persist";

const CustomSecureStore = {
  getItem: async (key: string) => {
    let result = await SecureStore.getItemAsync(replacer(key, "_"));
    return result ? JSON.parse(result) : null;
  },
  setItem: async (key: string, value: any) => {
    return await SecureStore.setItemAsync(replacer(key, "_"), JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    return await SecureStore.deleteItemAsync(replacer(key, "_"));
  },
};
const replacer = (key: string, replaceCharacter: string) => {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
};

const globalTransform = createTransform(
  (inboundState: globalStateInterface) => {
    return {
      ...inboundState,
      showOnboard: true,
      entity: { ...inboundState.entity, knownLocation: [] },
    };
  },
  (outboundState: any) => outboundState,
  { whitelist: ["global"] }
);

const persistConfig = {
  key: "root",
  storage: CustomSecureStore,
  transforms: [globalTransform]
};

const rootReducers = combineReducers({
  global: globalReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers) as typeof rootReducers;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: true
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
