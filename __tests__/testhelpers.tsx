import globalSlice from "@api/slices/globalSlice";
import { NavigationContainer } from "@react-navigation/native";
import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import { RenderOptions, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { RootState } from "@api/app/store";
import { PropsWithChildren } from "react";
import { globalStateInterface } from "@utils/interfaces";

export const store = configureStore({ reducer: { global: globalSlice } });

export const renderNavigator = (ui: React.ReactNode) => (
  render(
    <NavigationContainer>
      {ui}
    </NavigationContainer>
  )
);

export const renderApollo = (ui: React.ReactNode, mocks: any) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>
  );
};

export const initialState: globalStateInterface = {
  isVendor: false,
  entity: null,
  accessToken: null,
  themeType: "system",
  theme: "dark",
  cart: [],
  showOnboard: true,
  allowPush: true,
  allowToast: true,
  allowLocation: true
};

export const entity = {
  id: "123",
  walletId: "123",
  imgUrl: "123",
  firstName: "John",
  lastName: "Doe",
  phone: "+2349058731812",
  email: "mail@mail.com",
  knownLocation: [{ locationId: "123", name: "123 Main St" }],
  isPhoneVerified: true,
  isEmailVerified: true
};

// export const renderApolloNavigator = (ui: React.ReactNode, mocks: any) => {
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <NavigationContainer>
//         {ui}
//       </NavigationContainer>
//     </MockedProvider>
//   );
// };
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
// const preloadedStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
//   reducer: { global: globalSlice },
//   preloadedState,
// });
// const mainstore = preloadedStore({});
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: PreloadedState<RootState>;
//   store?: typeof mainstore;
// }
// export function renderWithProviders(
//   ui: React.ReactElement,
//   {
//     preloadedState = {},
//     store = configureStore({ reducer: { global: globalSlice }, preloadedState }),
//     ...renderOptions
//   }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }
