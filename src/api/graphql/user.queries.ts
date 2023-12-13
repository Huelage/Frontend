import { gql } from "@apollo/client";

export const EDIT_LOCATIONS = gql(`
  mutation EditKnownLocations ($input: EditUserLocationInput!) {
    editUserLocation(input: $input) {
      knownLocation
    }
  }
`);

export const GET_KNOWN_LOCATIONS = gql(`
  query GetKnownLocations {
    getUserProfile {
      knownLocation
    }
  }
`);

export const GET_VENDORS_LIST = gql(`
  query GetVendorsList {
    getAllVendors {
      vendorId
      businessName
      businessAddress
      entity {
        imgUrl
      }
    }
  }
`);

export const GET_VENDOR_INFO = gql(`
  query GetVendorInfo ($vendorId: String!) {
    getVendorProfile (vendorId: $vendorId) {
      vendorId
      businessName
      businessAddress
      repName
      avgResponseTime
      rating
      entity {
        imgUrl
      }
      products {
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
      reviews {
        reviewId
      }
    }
  }
`);

export const GET_PRODUCT = gql(`
  query GetProduct ($productId: String!) {
    getProduct (productId: $productId) {
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

export const GET_MANY_VENDORS = gql(`
  query GetManyVendors ($vendorIds: [String!]!) {
    getVendorsById(vendorIds: $vendorIds) {
      vendorId
      businessName
      entity {
        imgUrl
      }
    }
  }
`);

export const CREATE_ORDER = gql(`
  mutation CreateOrder ($input: CreateOrderInput!) {
    createOrder (input: $input) {
      orderId
    }
  }
`);