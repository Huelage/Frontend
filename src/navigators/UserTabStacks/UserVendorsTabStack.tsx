import { UserTabHeader } from "@components/navigation";
import { UserVendorsTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailScreen, VendorScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserVendorsTabStackParamList>();

const UserVendorsTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={VendorScreen} options={{ header: () => <UserTabHeader /> }} />
      <Stack.Screen name="ItemDetail" component={DetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default UserVendorsTabStack;