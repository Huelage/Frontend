import globalSlice from "@api/slices/globalSlice";
import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";

export const store = configureStore({
  reducer: globalSlice
});

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

export const renderApolloNavigator = (ui: React.ReactNode, mocks: any) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NavigationContainer>
        {ui}
      </NavigationContainer>
    </MockedProvider>
  );
};

// export const renderRedux = (ui: React.ReactNode) => (
//   render(
//     <Provider store={store}>
//       {ui}
//     </Provider>
//   )
// );

const rect = { x: 0, y: 0, width: 0, height: 0 };
export const testRect = { rect, rx: 0, ry: 0 };