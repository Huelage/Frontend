import { gql } from "@apollo/client";

export const UPLOAD_IMAGE = gql(`
  mutation UploadImage ($input: UploadImageInput!) {
    uploadImage(input: $input)
  }
`);
