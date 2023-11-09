import globalReducer from "@api/slices/globalSlice";
import { globalStateInterface } from "@interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, createTransform, persistReducer, persistStore } from "redux-persist";

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
  storage: AsyncStorage,
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
