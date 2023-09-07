import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as BioAuth from "expo-local-authentication";

// AUTH INTERFACES
export interface LoginInfoInterface {
  vendorId?: string;
  email?: string;
  password: string;
}

export interface SignUpInfoInterface {
  fullname: string;
  email: string;
  phonenumber: string;
  businessname?: string;
  password: string;
}
export interface ForgotPasswordInfoInterface {
  email: string;
}

// NAVIGATION INTERFACES
export type AuthStackParamList = {
  OnBoard: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phoneno: string };
  SignupSelect: undefined;
  ForgotPassword: undefined;
};

export type UserStackParamList = {
  MainTabs: undefined;
  Cart: undefined;
  Detail: undefined;
};

export type VendorStackParamList = {
  MainTabs: undefined;
  Notifications: undefined;
};

export type UserTabParamList = {
  Home: undefined;
  Vendors: undefined;
  History: undefined;
  Profile: undefined;
};

export type VendorTabParamList = {
  Home: undefined;
  Orders: undefined;
  Menu: undefined;
  Account: undefined;
};

// SCREEN INTERFACES
export type UserNavigationProps = NativeStackNavigationProp<UserStackParamList>;
export type VendorNavigationProps =
  NativeStackNavigationProp<VendorStackParamList>;
export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
export type UserTabProps = BottomTabNavigationProp<UserTabParamList>;
export type VendorTabProps = BottomTabNavigationProp<VendorTabParamList>;
export type OTPRouteProps = RouteProp<AuthStackParamList, "OTP">;

// REDUX INTERFACES
export interface globalStateInterface {
  isAuthenticated: boolean;
  isVendor: boolean;
  themeType: "system" | "manual";
  theme: "light" | "dark";
  cart: CartInterface[];
}

export interface CartInterface {
  id: string;
  item_id: string;
  quantity: number;
  extras?: CartExtraInterface[];
}

interface CartExtraInterface extends FoodSideInterface {
  quantity: number;
}

// USER SCREEN INTERFACES
export interface FoodInterface {
  id: string;
  name: string;
  price: number;
  desc: string;
  imgUrl: string;
  isFavourite: boolean;
  rating: number;
  cals: number;
  location: string;
}

export interface RestaurantInterface {
  id: string;
  name: string;
  location: string;
  rating: number;
  imgUrl: string;
}

// MISCELLANEOUS INTERFACES
export interface BiometricsInterface {
  hasBiometrics: boolean;
  isEnrolled: boolean;
  biometricType: BioAuth.AuthenticationType[];
}

// Entity Interfaces
export interface ReviewInterface {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  message: string;
}

export interface UserBaseFoodInterface {
  id: string;
  name: string;
  description: string;
  img_url: string;
  category: string;
  availability: "available" | "temporarily unavailable" | "unavailable";
  sides?: FoodSideInterface[];
}
interface FoodPriceInterface extends UserBaseFoodInterface {
  pricing_method: "price" | "fixed";
  min_price: number;
}
interface FoodPortionInterface extends UserBaseFoodInterface {
  pricing_method: "portion";
  portion_price: number;
}
interface FoodPackageInterface extends UserBaseFoodInterface {
  pricing_method: "package";
  package_sizes: { name: string; price: number }[];
}

export type UserFoodInterface =
  | FoodPriceInterface
  | FoodPortionInterface
  | FoodPackageInterface;
export interface FoodSideInterface {
  name: string;
  price: number;
}
