import { UserTabHeader } from "@components/navigation";
import { UserOrdersTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyOrdersScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserOrdersTabStackParamList>();

const UserOrdersTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MyOrdersScreen} options={{ header: () => <UserTabHeader /> }} />
    </Stack.Navigator>
  );
};

export default UserOrdersTabStack;