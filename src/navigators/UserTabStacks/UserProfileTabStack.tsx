import { UserTabHeader } from "@components/navigation";
import { UserProfileTabStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "@screens/core";
import React from "react";

const Stack = createNativeStackNavigator<UserProfileTabStackParamList>();

const UserProfileTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={ProfileScreen} options={{ header: () => <UserTabHeader /> }} />
    </Stack.Navigator>
  );
};

export default UserProfileTabStack;