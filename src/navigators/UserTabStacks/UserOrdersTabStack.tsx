import { UserTabHeader } from "@components/navigation";
import { UserOrdersTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrderDetailScreen, OrderScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserOrdersTabStackParamList>();

const UserOrdersTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={OrderScreen} options={{ header: () => <UserTabHeader /> }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default UserOrdersTabStack;