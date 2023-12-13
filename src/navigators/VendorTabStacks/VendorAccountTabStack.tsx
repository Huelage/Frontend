import { VendorAccountTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AboutScreen, ChangePasswordScreen, ChangePhoneScreen, FAQScreen, HelpScreen, VerifyEmailScreen, VerifyPhoneScreen } from "@screens/General";
import { AccountDetailScreen, AccountScreen, SettingScreen, WalletScreen } from "@screens/Vendor";
import React from "react";

const Stack = createNativeStackNavigator<VendorAccountTabStackParamList>();

const VendorAccountTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="AccountDetails" component={AccountDetailScreen} />
      <Stack.Screen name="ChangePass" component={ChangePasswordScreen} />
      <Stack.Screen name="ChangePhone" component={ChangePhoneScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Main" component={AccountScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
    </Stack.Navigator>
  );
};

export default VendorAccountTabStack;