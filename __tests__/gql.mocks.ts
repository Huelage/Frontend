import { LOGIN_USER, LOGIN_VENDOR, REFRESH_OTP, REQUEST_EMAIL_VERIFICATION, SET_PASSWORD, SIGNUP_USER, SIGNUP_VENDOR, VERIFY_EMAIL, VERIFY_OTP } from "@api/graphql";

export const MOCK_REQUEST_EMAIL_VERIFICATION = [
  {
    request: {
      query: REQUEST_EMAIL_VERIFICATION,
      variables: { email: 'mail@mail.com' }
    },
    result: {
      data: {
        requestEmailVerification: { entityType: 'VENDOR', email: 'mail@mail.com' }
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
          email: 'mail@mail.com',
          password: 'pass1&onlY',
          confirmPassword: 'pass1&onlY',
          phone: '+2349058731812',
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    },
    result: {
      data: {
        signUpUser: { userId: '123', firstName: 'John', lastName: 'Doe' }
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
          email: 'mail@mail.com',
          password: 'pass1&onlY',
          confirmPassword: 'pass1&onlY',
          phone: '+2349058731812',
          businessName: 'John Doe',
          businessAddress: '123 Main St',
          repName: 'John Doe'
        }
      }
    },
    result: {
      data: {
        signUpVendor: { vendorId: '123', businessName: 'John Doe' }
      }
    }
  }
];

export const MOCK_VERIFY_EMAIL = [
  {
    request: {
      query: VERIFY_EMAIL,
      variables: {
        input: {
          email: "mail@mail.com",
          otp: 1234
        }
      }
    },
    result: {
      data: {
        verifyEmailOtp: { entityId: "123" }
      }
    }
  }
];

export const MOCK_SET_PASSWORD = [
  {
    request: {
      query: SET_PASSWORD,
      variables: {
        input: {
          password: "pass1&onlY",
          entityId: "123"
        }
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

export const MOCK_VERIFY_OTP = [
  {
    request: {
      query: VERIFY_OTP,
      variables: {
        input: {
          phone: "+2349058731812",
          otp: 1234
        }
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
          refreshToken: "123",
          accessToken: "123",
          user: { firstName: "John", lastName: "Doe" },
          vendor: { businessName: "John Doe", businessAddress: "123 Main St", repName: "John Doe" }
        }
      }
    }
  }
];

export const MOCK_REFRESH_OTP = [
  {
    request: {
      query: REFRESH_OTP,
      variables: {
        input: {
          phone: "+2349058731812",
          entityId: "123"
        }
      }
    },
    result: {
      data: {
        updatePhone: { entityId: "123" }
      }
    }
  }
];

export const MOCK_LOGIN_USER = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          password: "pass1&onlY",
          email: "mail@mail.com"
        }
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
            wallet: { walletId: "123" },
            accessToken: "123",
            refreshToken: "123"
          },
          firstName: "John",
          lastName: "Doe"
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
        input: {
          entityId: "123",
          password: "pass1&onlY",
        }
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
            wallet: { walletId: "123" },
            accessToken: "123",
            refreshToken: "123"
          },
          firstName: "John",
          lastName: "Doe"
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
        input: {
          password: "pass1&onlY",
          vendorKey: "123456",
        }
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
        input: {
          entityId: "123",
          password: "pass1&onlY",
        }
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