import { useAppSelector } from "@api/app/appHooks";
import { getVendorStatus } from "@api/slices/globalSlice";
import { SkRRect } from "@shopify/react-native-skia";
import React from "react";
import UserStackNavigator from "./UserStackNavigator";
import VendorStackNavigator from "./VendorStackNavigator";

interface NavigatorProps {
  testRect?: SkRRect; /* This is for unit testing purposes only */
}

const StackNavigator = ({ testRect }: NavigatorProps) => {
  const isVendor = useAppSelector(getVendorStatus);
  return <>{isVendor ? <VendorStackNavigator /> : <UserStackNavigator testRect={testRect} />}</>;
};

export default StackNavigator;
