import { ADD_FOOD_ITEM, CHANGE_PASSWORD, EDIT_LOCATIONS, GET_KNOWN_LOCATIONS, GET_MANY_VENDORS, GET_PRODUCT, GET_PRODUCTS, GET_VENDORS_LIST, GET_VENDOR_INFO, LOGIN_USER, LOGIN_VENDOR, REQUEST_EMAIL_VERIFICATION, REQUEST_PHONE_VERIFICATION, SET_PASSWORD, SIGNUP_USER, SIGNUP_VENDOR, UPLOAD_IMAGE, VERIFY_EMAIL, VERIFY_OTP, VERIFY_PHONE } from "@api/graphql";
import { mockFoods } from "./testhelpers";

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

export const MOCK_LOGIN_ERROR = [
  {
    request: {
      query: LOGIN_USER,
      variables: { input: { password: "pass1&onlY", email: "mail@mail.com" } }
    },
    error: new Error("An error occurred")
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

export const MOCK_GET_VENDOR_INFO = [
  {
    request: {
      query: GET_VENDOR_INFO,
      variables: { vendorId: "123" }
    },
    result: {
      data: {
        getVendorProfile: {
          vendorId: "123",
          businessName: "John Doe",
          businessAddress: "123 Main St",
          repName: "John cena",
          avgResponseTime: 10,
          rating: 5,
          entity: { imgUrl: "image" },
          products: mockFoods,
          reviews: [{ reviewId: "1" }, { reviewId: "2" }]
        }
      }
    }
  }
];

export const MOCK_GET_VENDORS_LIST = [
  {
    request: {
      query: GET_VENDORS_LIST,
    },
    result: {
      data: {
        getAllVendors: [
          {
            vendorId: "123", businessName: "John Doe",
            businessAddress: "123 Main St", entity: { imgUrl: "image" }
          },
          {
            vendorId: "1234", businessName: "John Cena",
            businessAddress: "123 Second St", entity: { imgUrl: "image" }
          },
        ]
      }
    }
  }
];

export const MOCK_GET_PRODUCT = [
  {
    request: {
      query: GET_PRODUCT,
      variables: { productId: "1" }
    },
    result: {
      data: { getProduct: mockFoods[0] }
    }
  },
  {
    request: {
      query: GET_PRODUCT,
      variables: { productId: "2" }
    },
    result: {
      data: { getProduct: mockFoods[1] }
    }
  },
  {
    request: {
      query: GET_PRODUCT,
      variables: { productId: "3" }
    },
    result: {
      data: { getProduct: mockFoods[2] }
    }
  },
  {
    request: {
      query: GET_PRODUCT,
      variables: { productId: "4" }
    },
    result: {
      data: { getProduct: mockFoods[3] }
    }
  }
];


export const MOCK_GET_MANY_VENDORS = [
  {
    request: {
      query: GET_MANY_VENDORS,
      variables: { vendorIds: ["123", "234", "345"] }
    },
    result: {
      data: {
        getVendorsById: [
          { vendorId: "123", businessName: "John Doe", entity: { imgUrl: "image" } },
          { vendorId: "234", businessName: "John Cena", entity: { imgUrl: "image" } },
          { vendorId: "345", businessName: "John Mackleberry", entity: { imgUrl: "image" } }
        ]
      }
    }
  }
];
export const MOCK_GET_MANY_VENDORS_ONE = [
  {
    request: {
      query: GET_MANY_VENDORS,
      variables: { vendorIds: ["123"] }
    },
    result: {
      data: {
        getVendorsById: [
          { vendorId: "123", businessName: "John Doe", entity: { imgUrl: "image" } },
        ]
      }
    }
  }
];
export const MOCK_GET_MANY_VENDORS_EMPTY = [
  {
    request: {
      query: GET_MANY_VENDORS,
      variables: { vendorIds: [] }
    },
    result: {
      data: { getVendorsById: [] }
    }
  }
];

// Vendor Queries
export const MOCK_GET_PRODUCTS = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: { vendorId: "123" }
    },
    result: {
      data: { getVendorProducts: mockFoods }
    }
  }
];

export const MOCK_GET_PRODUCTS_EMPTY = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: { vendorId: "123" }
    },
    result: {
      data: { getVendorProducts: [] }
    }
  }
];

export const MOCK_ADD_FOOD_ITEM = [
  {
    request: {
      query: ADD_FOOD_ITEM,
      variables: {
        input: {
          name: "test name",
          description: "test description",
          category: "MAIN",
          price: 1000,
          preparationTime: 0,
          pricingMethod: "FIXED",
          imgUrl: "image"
        }
      }
    },
    result: {
      data: { addFood: { productId: "123" } }
    }
  }
];

export const MOCK_ADD_FOOD_PACKAGE_ITEM = [
  {
    request: {
      query: ADD_FOOD_ITEM,
      variables: {
        input: {
          name: "test name",
          description: "test description",
          category: "MAIN",
          pricingMethod: "PACKAGE",
          preparationTime: 30,
          packageSizes: [{ "name": "big pack", "price": 1000 }, { "name": "small pack", "price": 500 }],
          imgUrl: "image",
          price: 0
        }
      }
    },
    result: {
      data: { addFood: { productId: "123" } }
    }
  }
];

// General Queries
export const MOCK_UPLOAD_IMAGE = [
  {
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