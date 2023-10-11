import { useAppSelector } from "@api/app/appHooks";
import { getVendorStatus } from "@api/slices/globalSlice";
import React from "react";
import UserStackNavigator from "./UserStackNavigator";
import VendorStackNavigator from "./VendorStackNavigator";

const StackNavigator = () => {
  const isVendor = useAppSelector(getVendorStatus);
  return <>{isVendor ? <VendorStackNavigator /> : <UserStackNavigator />}</>;
};

export default StackNavigator;
