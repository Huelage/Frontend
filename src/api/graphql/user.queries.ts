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