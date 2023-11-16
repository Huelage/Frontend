import { CHANGE_PASSWORD, EDIT_LOCATIONS, GET_KNOWN_LOCATIONS, LOGIN_USER, LOGIN_VENDOR, REQUEST_EMAIL_VERIFICATION, REQUEST_PHONE_VERIFICATION, SET_PASSWORD, SIGNUP_USER, SIGNUP_VENDOR, UPLOAD_IMAGE, VERIFY_EMAIL, VERIFY_OTP, VERIFY_PHONE } from "@api/graphql";

// AUTH QUERIES
export const MOCK_REQUEST_EMAIL_VERIFICATION = [
  {
    request: {
      query: REQUEST_EMAIL_VERIFICATION,
      variables: { email: "mail@mail.com" }
    },
    result: {
      data: {
        requestEmailVerification: { entityType: "VENDOR", email: "mail@mail.com" }
      }
    }
  }
];

export const MOCK_SIGNUP_USER = [
  {
    request: {
      query: SIGNUP_USER,
      variables: {
        input: {
          email: "mail@mail.com",
          password: "pass1&onlY",
          confirmPassword: "pass1&onlY",
          phone: "+2349058731812",
          firstName: "John",
          lastName: "Doe"
        }
      }
    },
    result: {
      data: {
        signUpUser: { userId: "123", firstName: "John", lastName: "Doe" }
      }
    }
  }
];

export const MOCK_SIGNUP_VENDOR = [
  {
    request: {
      query: SIGNUP_VENDOR,
      variables: {
        input: {
          email: "mail@mail.com",
          password: "pass1&onlY",
          confirmPassword: "pass1&onlY",
          phone: "+2349058731812",
          businessName: "John Doe",
          businessAddress: "123 Main St",
          repName: "John Doe"
        }
      }
    },
    result: {
      data: {
        signUpVendor: { vendorId: "123", businessName: "John Doe" }
      }
    }
  }
];

export const MOCK_VERIFY_EMAIL = [
  {
    request: {
      query: VERIFY_EMAIL,
      variables: {
        input: { email: "mail@mail.com", otp: 1234 }
      }
    },
    result: {
      data: {
        verifyEmailOtp: { entityId: "123" }
      }
    }
  }
];

export const MOCK_VERIFY_PHONE = [
  {
    request: {
      query: VERIFY_PHONE,
      variables: {
        input: { phone: "+2349058731812", otp: 1234 }
      }
    },
    result: {
      data: {
        verifyPhoneOtp: { refreshToken: "123", accessToken: "123" }
      }
    }
  }
];

export const MOCK_SET_PASSWORD = [
  {
    request: {
      query: SET_PASSWORD,
      variables: {
        input: { password: "pass1&onlY", entityId: "123" }
      }
    },
    result: {
      data: {
        forgotPassword: {
          entityId: "123",
          user: { firstName: "John", lastName: "Doe" },
          vendor: { businessName: "John Doe", businessAddress: "123 Main St", repName: "John Doe" }
        }
      }
    }
  }
];

export const MOCK_CHANGE_PASSWORD = [
  {
    request: {
      query: CHANGE_PASSWORD,
      variables: {
        input: { oldPassword: "pass1&onlY", password: "pass1&onlY", confirmPassword: "pass1&onlY", entityId: "123" }
      }
    },
    result: {
      data: {
        updatePassword: { entityId: "123" }
      }
    }
  }
];

export const MOCK_VERIFY_OTP = [
  {
    request: {
      query: VERIFY_OTP,
      variables: {
        input: { phone: "+2349058731812", otp: 1234 }
      }
    },
    result: {
      data: {
        verifyPhoneOtp: {
          entityId: "123",
          wallet: { walletId: "123" },
          email: "mail@mail.com",
          phone: "+2349058731812",
          imgUrl: null,
          isPhoneVerified: false,
          isEmailVerified: true,
          refreshToken: "123",
          accessToken: "123",
          user: { firstName: "John", lastName: "Doe", knownLocation: { locations: [] } },
          vendor: { businessName: "John Doe", businessAddress: "123 Main St", repName: "John Doe" }
        }
      }
    }
  }
];

export const MOCK_REQUEST_PHONE_VERIFICATION = [
  {
    request: {
      query: REQUEST_PHONE_VERIFICATION,
      variables: {
        input: { phone: "+2349058731812", entityId: "123" }
      }
    },
    result: {
      data: {
        updatePhone: { entityId: "123", phone: "+2349058731812" }
      }
    }
  }
];

export const MOCK_LOGIN_USER = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: { password: "pass1&onlY", email: "mail@mail.com" }
      }
    },
    result: {
      data: {
        signInUser: {
          entity: {
            entityId: "123",
            email: "mail@mail.com",
            phone: "+2349058731812",
            imgUrl: null,
            isPhoneVerified: false,
            isEmailVerified: true,
            wallet: { walletId: "123" },
            accessToken: "123",
            refreshToken: "123"
          },
          firstName: "John",
          lastName: "Doe",
          knownLocation: { locations: [] }
        }
      }
    }
  }
];

export const MOCK_LOGIN_USER_SAVED = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: { entityId: "123", password: "pass1&onlY", }
      }
    },
    result: {
      data: {
        signInUser: {
          entity: {
            entityId: "123",
            email: "mail@mail.com",
            phone: "+2349058731812",
            imgUrl: null,
            isPhoneVerified: false,
            isEmailVerified: true,
            wallet: { walletId: "123" },
            accessToken: "123",
            refreshToken: "123"
          },
          firstName: "John",
          lastName: "Doe",
          knownLocation: { locations: [] }
        }
      }
    }
  }
];

export const MOCK_LOGIN_VENDOR = [
  {
    request: {
      query: LOGIN_VENDOR,
      variables: {
        input: { password: "pass1&onlY", vendorKey: "123456", }
      }
    },
    result: {
      data: {
        signInVendor: {
          entity: {
            entityId: "123",
            email: "mail@mail.com",
            phone: "+2349058731812",
            imgUrl: null,
            isPhoneVerified: false,
            isEmailVerified: true,
            wallet: { walletId: "123" },
            accessToken: "123",
            refreshToken: "123"
          },
          businessName: "John Doe",
          businessAddress: "123 Main St",
          repName: "John Doe"
        }
      }
    }
  }
];

export const MOCK_LOGIN_VENDOR_SAVED = [
  {
    request: {
      query: LOGIN_VENDOR,
      variables: {
        input: { entityId: "123", password: "pass1&onlY", }
      }
    },
    result: {
      data: {
        signInVendor: {
          entity: {
            entityId: "123",
            email: "mail@mail.com",
            phone: "+2349058731812",
            imgUrl: null,
            isPhoneVerified: false,
            isEmailVerified: true,
            wallet: { walletId: "123" },
            accessToken: "123",
            refreshToken: "123"
          },
          businessName: "John Doe",
          businessAddress: "123 Main St",
          repName: "John Doe"
        }
      }
    }
  }
];

// USER QUERIES
export const MOCK_ADD_LOCATION = [
  {
    request: {
      query: EDIT_LOCATIONS,
      variables: {
        input: { locationId: "123", name: "123 Main St" }
      }
    },
    result: {
      data: {
        editUserLocation: {
          knownLocation: {
            locations: [{ locationId: "123", name: "123 Main St" }]
          }
        }
      }
    }
  }
];

export const MOCK_REMOVE_LOCATION = [
  {
    request: {
      query: EDIT_LOCATIONS,
      variables: {
        input: { locationId: "123" }
      }
    },
    result: {
      data: {
        editUserLocation: { knownLocation: { locations: [] } }
      }
    }
  }
];

export const MOCK_GET_KNOWN_LOCATIONS = [
  {
    request: {
      query: GET_KNOWN_LOCATIONS
    },
    result: {
      data: {
        getUserProfile: {
          knownLocation: {
            locations: [{ locationId: "123", name: "123 Main St" }]
          }
        }
      }
    }
  }
];

// General Queries
export const MOCK_UPLOAD_IMAGE = [
  {
    // delay: 1,
    request: {
      query: UPLOAD_IMAGE,
      variables: {
        input: { id: "123", image: { uri: "123", name: "image-123.", type: "image" } }
      }
    },
    result: {
      data: { uploadImage: "image" }
    }
  }
];