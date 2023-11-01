import globalSlice from "@api/slices/globalSlice";
import { MockedProvider } from "@apollo/client/testing";
import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";
import { globalStateInterface } from "@interfaces";

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
