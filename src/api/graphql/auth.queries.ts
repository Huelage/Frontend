import { gql } from "@apollo/client";

export const SIGNUP_USER = gql(`
  mutation RegisterUser ($input: CreateUserInput!) {
    signUpUser(input: $input) {
      userId
      firstName
      lastName
    }
  }
`);

export const SIGNUP_VENDOR = gql(`
  mutation RegisterVendor ($input: CreateVendorInput!) {
    signUpVendor(input: $input) {
      vendorId
      businessName
    }
  }
`);

export const LOGIN_USER = gql(`
  mutation LoginUser ($input: AuthenticateUserInput!) {
    signInUser(input: $input) {
      entity {
        entityId
        email
        phone
        imgUrl
        wallet {
          walletId
        }
        isPhoneVerified
        isEmailVerified
        accessToken
        refreshToken
      }
      firstName
      lastName
      knownLocation
    }
  }
`);

export const LOGIN_VENDOR = gql(`
  mutation LoginVendor ($input: AuthenticateVendorInput!) {
    signInVendor(input: $input) {
      entity {
        entityId
        email
        phone
        imgUrl
        wallet {
          walletId
        }
        isPhoneVerified
        isEmailVerified
        accessToken
        refreshToken
      }
      businessName
      businessAddress
      repName
    }
  }
`);

export const VERIFY_OTP = gql(`
  mutation VerifyOTP ($input: VerifyPhoneInput!) {
    verifyPhoneOtp(input: $input) {
      entityId
      wallet {
        walletId
      }
      email
      phone
      imgUrl
      isPhoneVerified
      isEmailVerified
      refreshToken
      accessToken
      user {
        firstName
        lastName
        knownLocation
      }
      vendor {
        businessName
        businessAddress
        repName
      }
    }
  }
`);

export const REFRESH_OTP = gql(`
  mutation RefreshOTP ($input: UpdatePhoneInput!) {
    updatePhone(input: $input) {
      entityId
    }
  }
`);

export const REQUEST_EMAIL_VERIFICATION = gql(`
  mutation RequestEmailOTP ($email: String!) {
    requestEmailVerification(email: $email) {
      entityType
      email
    }
  }
`);

export const VERIFY_EMAIL = gql(`
  mutation VerifyEmailOTP ($input: VerifyEmailInput!) {
    verifyEmailOtp(input: $input) {
      entityId
    }
  }
`);

export const VERIFY_PHONE = gql(`
  mutation VerifyPhoneOTP ($input: VerifyPhoneInput!) {
    verifyPhoneOtp(input: $input) {
      refreshToken
      accessToken
    }
  }
`);

export const SET_PASSWORD = gql(`
  mutation ChangePassword ($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      entityId
      user {
        firstName
        lastName
      }
      vendor {
        businessName
        businessAddress
        repName
      }
    }
  }
`);

export const REFRESH_ACCESS_TOKEN = gql(`
  mutation RefreshAccessToken {
    refreshAccessToken
  }
`);