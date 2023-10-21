import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getShowOnboard, getVendorStatus, setShowOnboard } from "@api/slices/globalSlice";
import React, { useEffect } from "react";
import UserStackNavigator from "./UserStackNavigator";
import VendorStackNavigator from "./VendorStackNavigator";

const StackNavigator = () => {
  const dispatch = useAppDispatch();
  const isVendor = useAppSelector(getVendorStatus);
  const showOnboard = useAppSelector(getShowOnboard);
  useEffect(() => {
    if (showOnboard)
      dispatch(setShowOnboard(false));
  }, []);
  return <>{isVendor ? <VendorStackNavigator /> : <UserStackNavigator />}</>;
};

export default StackNavigator;
