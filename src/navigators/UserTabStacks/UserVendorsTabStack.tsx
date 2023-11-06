import { UserTabHeader } from "@components/navigation";
import { UserVendorsTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ItemDetailScreen, VendorListScreen, VendorScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserVendorsTabStackParamList>();

const UserVendorsTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={VendorListScreen} options={{ header: () => <UserTabHeader /> }} />
      <Stack.Screen name="VendorHome" component={VendorScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default UserVendorsTabStack;