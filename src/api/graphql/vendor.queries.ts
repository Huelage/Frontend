import { gql } from "@apollo/client";

export const ADD_FOOD_ITEM = gql(`
  mutation AddFoodItem ($input: CreateFoodInput!) {
    addFood(input: $input) {
      productId
    }
  }
`);
