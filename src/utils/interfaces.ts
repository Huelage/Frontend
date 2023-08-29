import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

// NAVIGATION INTERFACES
export type AuthStackParamList = {
  OnBoard: undefined;
  Login: undefined;
  SignUp: { isVendor: boolean };
  OTP: { phoneno: string; vendorStatus: boolean };
  SignupSelect: undefined;
};

export type UserStackParamList = {
  MainTabs: undefined;
  Cart: undefined;
  CartScreen: undefined;
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

export type TabProps = BottomTabNavigationProp<UserTabParamList>;

// USER SCREEN INTERFACES
export interface FoodInterface {
  id: number;
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
  id: number;
  name: string;
  location: string;
  rating: number;
  imgUrl: string;
}
export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imgUrl: string;
}

// Entity Interfaces
export interface ReviewInterface {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  message: string;
}
