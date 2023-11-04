import { UserProfileTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AboutScreen, ChangePasswordScreen, FAQScreen, HelpScreen, LocationScreen, PersonalDetailScreen, ProfileScreen, ReferralScreen, SettingScreen, VerifyEmailScreen, VerifyPhoneScreen, WalletScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserProfileTabStackParamList>();

const UserProfileTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={ProfileScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="ChangePass" component={ChangePasswordScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="UserDetails" component={PersonalDetailScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator >
  );
};

export default UserProfileTabStack;
