import { UserTabHeader } from "@components/navigation";
import { UserProfileTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AboutUs, FAQs, Help, LocationScreen, MyOrders, Notification, ProfileDetails, Referral, Setting, Wallet, PersonalDetailScreen, ProfileScreen, VerifyEmailScreen, VerifyPhoneScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserProfileTabStackParamList>();

const UserProfileTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={ProfileScreen} options={{ header: () => <UserTabHeader /> }} />
      <Stack.Screen name="About" component={AboutUs} options={{ headerShown: false }} />
      <Stack.Screen name="FAQs" component={FAQs} options={{ headerShown: false }} />
      <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
      <Stack.Screen name="MyOrders" component={MyOrders} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Referral" component={Referral} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
      <Stack.Screen name="UserDetails" component={PersonalDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />
    </Stack.Navigator >
  );
};

export default UserProfileTabStack;
