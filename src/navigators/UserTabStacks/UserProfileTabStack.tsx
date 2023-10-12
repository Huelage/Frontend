import { UserTabHeader } from "@components/navigation";
import { UserProfileTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocationScreen, PersonalDetailScreen, ProfileScreen, VerifyEmailScreen, VerifyPhoneScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserProfileTabStackParamList>();

const UserProfileTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={ProfileScreen} options={{ header: () => <UserTabHeader /> }} />
      <Stack.Screen name="UserDetails" component={PersonalDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default UserProfileTabStack;
