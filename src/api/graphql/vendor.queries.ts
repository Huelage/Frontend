import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql(`
  query GetProducts ($vendorId:String!) {
    getVendorProducts(vendorId:$vendorId) {
      productId
      name
      description
      imgUrl
      food {
        category
        pricingMethod
        price
        preparationTime
        availability
        packageSizes
        sides
      }
    }
  }
`);

export const ADD_FOOD_ITEM = gql(`
  mutation AddFoodItem ($input: CreateFoodInput!) {
    addFood(input: $input) {
      productId
    }
  }
`);
