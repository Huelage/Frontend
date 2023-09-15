import { UserStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen, DetailScreen } from "@screens/core";
import { SkRRect } from "@shopify/react-native-skia";
import React from "react";
import UserTabNavigator from "./UserTabNavigator";

const Stack = createNativeStackNavigator<UserStackParamList>();
interface NavigatorProps {
  testRect?: SkRRect; /* This is for unit testing purposes only */
}

const UserStackNavigator = ({ testRect }: NavigatorProps) => {
  const PropedUserTabNavigator = () => <UserTabNavigator testRect={testRect} />;
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={PropedUserTabNavigator} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
