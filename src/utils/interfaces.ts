import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as BioAuth from 'expo-local-authentication';

// AUTH INTERFACES
export interface LoginInfoInterface {
  vendorId?: string,
  email?: string,
  password: string;
}

export interface SignUpInfoInterface {
  fullname: string,
  email: string,
  phonenumber: string,
  businessname?: string,
  password: string;
}

// NAVIGATION INTERFACES
export type AuthStackParamList = {
  OnBoard: undefined,
  Login: undefined,
  SignUp: { isVendor: boolean; };
  OTP: { phoneno: string; vendorStatus: boolean; };
  SignupSelect: undefined;
};

export type UserStackParamList = {
  MainTabs: undefined,
  Cart: undefined;
};

export type VendorStackParamList = {
  MainTabs: undefined,
  Notifications: undefined;
};

export type UserTabParamList = {
  Home: undefined,
  Vendors: undefined,
  History: undefined,
  Profile: undefined;
};

export type VendorTabParamList = {
  Home: undefined,
  Orders: undefined,
  Menu: undefined,
  Account: undefined;
};

// SCREEN INTERFACES
export type UserNavigationProps = NativeStackNavigationProp<UserStackParamList>;
export type VendorNavigationProps = NativeStackNavigationProp<VendorStackParamList>;
export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
export type UserTabProps = BottomTabNavigationProp<UserTabParamList>;
export type VendorTabProps = BottomTabNavigationProp<VendorTabParamList>;
export type SignupRouteProps = RouteProp<AuthStackParamList, 'SignUp'>;
export type OTPRouteProps = RouteProp<AuthStackParamList, 'OTP'>;

// REDUX INTERFACES
export interface globalStateInterface {
  isAuthenticated: boolean;
  isVendor: boolean;
  themeType: "system" | "manual";
  theme: "light" | "dark";
}

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

// MISCELLANEOUS INTERFACES
export interface BiometricsInterface {
  hasBiometrics: boolean,
  isEnrolled: boolean,
  biometricType: BioAuth.AuthenticationType[];
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