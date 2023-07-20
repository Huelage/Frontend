import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

export type StackParamList = {
  OnBoard: undefined,
  Login: undefined,
  SignUp: { isVendor: boolean; };
  OTP: undefined;
  Cart: undefined;
  SignupSelect: undefined;
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;
export type SignupRouteProps = RouteProp<StackParamList, 'SignUp'>;

export type TabParamList = {
  Home: undefined,
  Menu: undefined,
  Favourite: undefined,
  Profile: undefined;
};

export type TabProps = BottomTabNavigationProp<TabParamList>;

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
