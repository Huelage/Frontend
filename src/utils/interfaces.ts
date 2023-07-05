import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface LoginInfoInterface {
  email: string,
  password: string;
}

export interface SignUpInfoInterface {
  fullname: string,
  email: string,
  password: string;
}

export type StackParamList = {
  OnBoard: undefined,
  Login: undefined,
  SignUp: undefined;
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;

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
  location: string;
}