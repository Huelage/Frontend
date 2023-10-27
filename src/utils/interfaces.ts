import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as BioAuth from "expo-local-authentication";

// AUTH INTERFACES
export interface LoginInfoInterface {
  vendorKey?: string;
  email?: string;
  password: string;
}

export interface SignUpInfoInterface {
  businessName?: string;
  businessAddress?: string;
  repName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
export interface ResetPasswordInterface {
  email?: string;
  password?: string;
  oldPassword?: string;
  confirmPassword?: string;
}

// NAVIGATION INTERFACES
// // Main Stacks
export type AuthStackParamList = {
  OnBoard: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phoneno: string; };
  SignupSelect: undefined;
  ForgotPassword: undefined;
  SetPassword: { entityId: string; };
  VerifyEmail: { email: string; };
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

// // Main Tabs
export type UserTabParamList = {
  Home: undefined;
  Vendors: NavigatorScreenParams<UserVendorsTabStackParamList>;
  "My Orders": NavigatorScreenParams<UserOrdersTabStackParamList>;
  Profile: NavigatorScreenParams<UserProfileTabStackParamList>;
};
export type VendorTabParamList = {
  Home: undefined;
  Orders: NavigatorScreenParams<VendorOrdersTabStackParamList>;
  Menu: NavigatorScreenParams<VendorMenuTabStackParamList>;
  Account: NavigatorScreenParams<VendorAccountTabStackParamList>;
};

// // User Tab Stacks
export type UserVendorsTabStackParamList = {
  Main: undefined;
  Vendor: { vendorId: string; };
  ItemDetail: { itemId: string; };
};
export type UserOrdersTabStackParamList = {
  Main: undefined;
  OrderDetail: { orderId: string; };
};
export type UserProfileTabStackParamList = {
  Main: undefined;
  UserDetails: undefined;
  Location: undefined;
  VerifyEmail: undefined;
  VerifyPhone: undefined;
  Wallet: undefined;
  Referral: undefined;
  Setting: undefined;
  FAQ: undefined;
  Help: undefined;
  About: undefined;
};

// // Vendor Tab Stacks
export type VendorOrdersTabStackParamList = {
  Main: undefined;
  OrderDetail: { orderId: string; };
  TrackOrder: { orderId: string; };
};
export type VendorMenuTabStackParamList = {
  Main: undefined;
  ItemDetail: { itemId: string; };
  AddItem: undefined;
};
export type VendorAccountTabStackParamList = {
  Main: undefined;
};

// SCREEN INTERFACES
// // Main Stacks
export type UserNavigationProps = NativeStackNavigationProp<UserStackParamList>;
export type VendorNavigationProps = NativeStackNavigationProp<VendorStackParamList>;
export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
// // Main Tabs
export type UserTabProps = CompositeNavigationProp<BottomTabNavigationProp<UserTabParamList>, UserNavigationProps>;
export type VendorTabProps = CompositeNavigationProp<BottomTabNavigationProp<VendorTabParamList>, VendorNavigationProps>;
// // User Tab Stacks
export type UserVendorTabProps = CompositeNavigationProp<NativeStackNavigationProp<UserVendorsTabStackParamList>, UserTabProps>;
export type UserOrdersTabProps = CompositeNavigationProp<NativeStackNavigationProp<UserOrdersTabStackParamList>, UserTabProps>;
export type UserProfileTabProps = CompositeNavigationProp<NativeStackNavigationProp<UserProfileTabStackParamList>, UserTabProps>;
// // Vendor Tab Stacks
export type VendorOrdersTabProps = CompositeNavigationProp<NativeStackNavigationProp<VendorOrdersTabStackParamList>, VendorTabProps>;
export type VendorMenuTabProps = CompositeNavigationProp<NativeStackNavigationProp<VendorMenuTabStackParamList>, VendorTabProps>;
export type VendorAccountTabProps = CompositeNavigationProp<NativeStackNavigationProp<VendorAccountTabStackParamList>, VendorTabProps>;
// // Screen Routes
export type OTPRouteProps = RouteProp<AuthStackParamList, "OTP">;
export type SetPasswordRouteProps = RouteProp<AuthStackParamList, "SetPassword">;
export type VerifyEmailRouteProps = RouteProp<AuthStackParamList, "VerifyEmail">;
export type UserVendorsTabVendorRouteProps = RouteProp<UserVendorsTabStackParamList, "Vendor">;
export type UserVendorsTabItemDetailRouteProps = RouteProp<UserVendorsTabStackParamList, "ItemDetail">;
export type UserOrdersTabOrderDetailRouteProps = RouteProp<UserOrdersTabStackParamList, "OrderDetail">;
export type VendorOrdersTabOrderDetailRouteProps = RouteProp<VendorOrdersTabStackParamList, "OrderDetail">;
export type VendorOrdersTabTrackOrderRouteProps = RouteProp<VendorOrdersTabStackParamList, "TrackOrder">;
export type VendorMenuTabItemDetailRouteProps = RouteProp<VendorMenuTabStackParamList, "ItemDetail">;

// REDUX INTERFACES
export interface globalStateInterface {
  entity: entityInterface | null;
  isVendor: boolean;
  showOnboard: boolean;
  themeType: "system" | "manual";
  theme: "light" | "dark";
  cart: CartInterface[];
  accessToken: string | null;
  allowPush: boolean;
  allowToast: boolean;
  allowLocation: boolean;
}

export interface entityInterface {
  id: string;
  walletId: string;
  email: string;
  phone: string;
  imgUrl: string | null;
  isPhoneVerified: boolean,
  isEmailVerified: boolean,
  knownLocation?: LocationInterface[];
  firstName?: string;
  lastName?: string;
  repName?: string;
  businessName?: string;
  businessAddress?: string;
}

export interface CartInterface {
  id: string;
  item_id: string;
  quantity: number;
  size?: string;
  extras?: CartExtraInterface[];
}

interface CartExtraInterface extends FoodSideInterface {
  quantity: number;
}

// USER SCREEN INTERFACES

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

export interface ProfileElementInterface {
  label: string;
  nav: keyof UserProfileTabStackParamList;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export interface SettingOptionInterface {
  title: string;
  isToggle: boolean;
  onPress: () => void;
  disabled?: boolean;
  initVal?: boolean;
  danger?: boolean;
}

export interface SettingOptionsInterface {
  description?: string;
  options: SettingOptionInterface[];
}

export interface SettingElementInterface {
  title: string;
  Icon: () => React.JSX.Element;
  options: SettingOptionsInterface[];
}

export interface FilterGroup {
  id: string;
  items: FilterItem[];
  label: string;
  type: "SINGLE" | "MULTIPLE";
}

export interface FilterItem {
  id: string;
  groupId: string;
  name: string;
  onPress: (checked: boolean) => void;
}

export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "EN_ROUTE" | "DELIVERED" | "COMPLETED" | "CANCELLED";


// Entity Interfaces
export interface ReviewInterface {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  message: string;
}

interface UserFoodBase {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  category: string;
  isFavourite: boolean;
  availability: "AVAILABLE" | "TEMPORARILY_UNAVAILABLE" | "UNAVAILABLE";
  sides?: FoodSideInterface[];
}
interface UserFoodPrice extends UserFoodBase {
  pricingMethod: "PRICE" | "PORTION" | "FIXED";
  price: number;
}
interface UserFoodPackage extends UserFoodBase {
  pricingMethod: "PACKAGE";
  packageSizes: { name: string; price: number; }[];
}

export type UserFoodInterface = UserFoodPrice | UserFoodPackage;

export interface FoodSideInterface {
  name: string;
  price: number;
}

export interface LocationInterface {
  locationId: string;
  name: string;
}

export interface OrderInterface {
  id: string;
  name: string;
  deliveryAddress: string;
  orderedAt: string;
  updatedAt: string;
  status: OrderStatus;
  total: number;
  vendorAddress: string;
  items: CartInterface[];
}
// interface sides {
//   desription: string;
//   options: {name: string, price: number}[];
//   isRequired: boolean;
// }
