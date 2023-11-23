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

export const renderApolloNavigator = (ui: React.ReactNode, mocks: any) => {
  render(
    <NavigationContainer>
      <MockedProvider mocks={mocks} addTypename={false}>
        {ui}
      </MockedProvider>
    </NavigationContainer>
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

// MOCKS
export const mockFoods = [
  {
    productId: "1",
    name: "River prawn spicy soup",
    description: "River prawn spiacy soup eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: "image river prawn spicy soup", food: {
      category: "SOUPS",
      pricingMethod: "FIXED",
      price: 1500,
      preparationTime: 60,
      availability: "AVAILABLE",
      packageSizes: null,
      sides: [
        {
          id: "1", description: "Please select a pack", options: [
            { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
            { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
          ], isRequired: true, isMultiple: false
        },
        {
          id: "2", description: "What would you like to add", options: [
            { groupId: "2", name: "Plantain", price: 200, isSingle: false },
            { groupId: "2", name: "Bread", price: 300, isSingle: false }
          ], isRequired: false, isMultiple: true
        }
      ]
    }
  },
  {
    productId: "2",
    name: "Jollof Rice",
    description: "Jollof Rice eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: "image jollof rice", food: {
      category: "MAIN",
      pricingMethod: "PORTION",
      price: 150,
      preparationTime: null,
      availability: "AVAILABLE",
      packageSizes: null,
      sides: [
        {
          id: "1", description: "Please select a pack", options: [
            { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
            { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
          ], isRequired: true, isMultiple: false
        },
        {
          id: "2", description: "What would you like to add", options: [
            { groupId: "2", name: "Plantain", price: 200, isSingle: false },
            { groupId: "2", name: "Spaghetti", price: 150, isSingle: false },
            { groupId: "2", name: "Moi moi", price: 300, isSingle: false },
            { groupId: "2", name: "Beans", price: 100, isSingle: false }
          ], isRequired: false, isMultiple: true
        }
      ]
    }
  },
  {
    productId: "3",
    name: "Macaroni",
    description: "Macaroni eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: "image macaroni", food: {
      category: "MAIN",
      pricingMethod: "PRICE",
      price: 300,
      preparationTime: null,
      availability: "AVAILABLE",
      packageSizes: null,
      sides: [
        {
          id: "1", description: "Please select a pack", options: [
            { groupId: "1", name: "Big Pack", price: 500, isSingle: true },
            { groupId: "1", name: "Small Pack", price: 300, isSingle: true }
          ], isRequired: true, isMultiple: false
        },
        {
          id: "2", description: "What would you like to add", options: [
            { groupId: "2", name: "Plantain", price: 200, isSingle: false },
            { groupId: "2", name: "Chicken Sauce", price: 1100, isSingle: false }
          ], isRequired: false, isMultiple: true
        }
      ]
    }
  },
  {
    productId: "4",
    name: "Yamarita",
    description: "Yamarita eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    imgUrl: "image yamarita", food: {
      category: "SNACKS",
      pricingMethod: "PACKAGE",
      price: null,
      preparationTime: null,
      availability: "AVAILABLE",
      packageSizes: [
        { name: "small", price: 1500 },
        { name: "medium", price: 2500 },
        { name: "large", price: 3500 },
      ],
      sides: null
    }
  }
];