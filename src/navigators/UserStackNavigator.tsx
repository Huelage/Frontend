import { UserStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "@screens/core";
import { Cart } from "@screens/core";
import React from "react";
import UserTabNavigator from "./UserTabNavigator";

const Stack = createNativeStackNavigator<UserStackParamList>();

const UserStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={UserTabNavigator} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="CartScreen" component={Cart} />
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
