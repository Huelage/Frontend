import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
  OTP: { phoneno: string; };
  SignupSelect: undefined;
};

export type StackParamList = {
  MainTabs: undefined,
  Cart: undefined;
};

export type UserTabParamList = {
  Home: undefined,
  Vendors: undefined,
  History: undefined,
  Profile: undefined;
};

// SCREEN INTERFACES
export type NavigationProps = NativeStackNavigationProp<StackParamList>;
export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
export type TabProps = BottomTabNavigationProp<UserTabParamList>;
export type SignupRouteProps = RouteProp<AuthStackParamList, 'SignUp'>;
export type OTPRouteProps = RouteProp<AuthStackParamList, 'OTP'>;

// REDUX INTERFACES
export interface globalStateInterface {
  isAuthenticated: boolean;
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
