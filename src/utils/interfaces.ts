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
  phone?: string;
  password?: string;
  oldPassword?: string;
  confirmPassword?: string;
}

export interface AddFoodInterface {
  name: string;
  description: string;
  imgUrl: string;
  category: FoodCategory;
  pricingMethod: PricingMethod;
  price?: number;
  packageSizes?: { name: string; price: number; }[];
  preparationTime?: number;
  sides?: SideInterface[];
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
  VendorHome: { vendorId: string; };
  ItemDetail: { itemId: string; vendorId: string; };
};
export type UserOrdersTabStackParamList = {
  Main: undefined;
  OrderDetail: { orderId: string; };
};
export type UserProfileTabStackParamList = {
  Main: undefined;
  UserDetails: undefined;
  ChangePass: undefined;
  ChangePhone: undefined;
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
  OrderDetail: { order: OrderInterface; };
  TrackOrder: { orderId: string; };
};
export type VendorMenuTabStackParamList = {
  Main: undefined;
  ItemDetail: { itemId: string; };
  AddItem: undefined;
};
export type VendorAccountTabStackParamList = {
  Main: undefined;
  AccountDetails: undefined;
  ChangePass: undefined;
  ChangePhone: undefined;
  VerifyEmail: undefined;
  VerifyPhone: undefined;
  Wallet: undefined;
  Setting: undefined;
  FAQ: undefined;
  Help: undefined;
  About: undefined;
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
export type UserVendorsTabVendorRouteProps = RouteProp<UserVendorsTabStackParamList, "VendorHome">;
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
  cart: OrderItemInterface[];
  accessToken: string | null;
  allowPush: boolean;
  allowToast: boolean;
  allowLocation: boolean;
  orderItemRenderGrid: boolean;
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
  nav: keyof (UserProfileTabStackParamList & VendorAccountTabStackParamList);
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
export interface LocationInterface {
  locationId: string;
  name: string;
}
export interface extraInterface extends itemExtraInterface {
  groupId: string;
}

export interface DropDataInterface {
  value: string;
  imgUrl: string;
  desc?: string;
}

// Server Interfaces
// // Entity Interfaces
export interface entityInterface {
  id: string;
  walletId: string;
  email: string;
  phone: string;
  isPhoneVerified: boolean,
  isEmailVerified: boolean,
  imgUrl?: string;
  knownLocation?: LocationInterface[];
  firstName?: string;
  lastName?: string;
  repName?: string;
  businessName?: string;
  businessAddress?: string;
}

// // Food Interfaces
interface UserFoodBase {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  category: FoodCategory;
  isFavourite: boolean;
  availability: FoodAvailability;
  preparationTime?: number;
  sides?: SideInterface[];
}
interface UserFoodPrice extends UserFoodBase {
  pricingMethod: "PRICE" | "PORTION" | "FIXED";
  price: number;
}
interface UserFoodPackage extends UserFoodBase {
  pricingMethod: "PACKAGE";
  packageSizes: PackageSize[];
}
export interface SideInterface {
  id: string;
  description: string;
  options: SideOptionsInterface[];
  isRequired: boolean;
  isMultiple: boolean;
}
export interface SideOptionsInterface {
  groupId: string;
  name: string;
  price: number;
  isSingle: boolean;
}
export type UserFoodInterface = UserFoodPrice | UserFoodPackage;
export type FoodCategory = "MAIN" | "PROTEIN" | "SOUPS" | "SNACKS" | "DRINKS";
export type FoodAvailability = "AVAILABLE" | "TEMPORARILY_UNAVAILABLE" | "UNAVAILABLE";
export type PricingMethod = "PRICE" | "PORTION" | "FIXED" | "PACKAGE";
export interface PackageSize { name: string; price: number; }

// // Order Interfaces
export interface OrderInterface {
  id: string;
  vendorName: string;
  status: OrderStatus;
  deliveryAddress: string;
  vendorAddress: string;
  estimatedDeliveryTime: string;
  subTotal: number;
  deliveryFee: number;
  paymentBreakdown: { name: PaymentMethod; amount: number; }[];
  totalAmount: number;
  paymentStatus: boolean;
  orderItems: OrderItemInterface[];
  orderedAt: string;
  updatedAt: string;
}
export interface OrderItemInterface {
  id: string;
  vendorId: string;
  item_id: string;
  item_name: string;
  quantity: number;
  portion?: number;
  price?: number;
  size?: string;
  extras?: itemExtraInterface[];
  totalPrice: number;
}
export interface itemExtraInterface {
  name: string;
  price: number;
  quantity?: number;
}
export type PaymentMethod = "CARD" | "HUENIT" | "CASH";
export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "EN_ROUTE" | "DELIVERED" | "COMPLETED" | "CANCELLED";

// // Vendor
export interface VendorInterface {
  id: string;
  businessName: string;
  businessAddress: string;
  repName: string;
  avgResponseTime: string;
  imgUrl: string;
  rating: number;
  noOfReviews: number;
  products: UserFoodInterface[];
}

export interface ReviewInterface {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  message: string;
}
