import { UserTabBar, UserTabHeader } from "@components/navigation";
import { UserTabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@screens/core";
import React from "react";
import { UserOrdersTabStack, UserProfileTabStack, UserVendorsTabStack } from "./UserTabStacks";

const Tab = createBottomTabNavigator<UserTabParamList>();

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <UserTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ header: () => <UserTabHeader /> }} />
      <Tab.Screen name="Vendors" component={UserVendorsTabStack} options={{ headerShown: false }} />
      <Tab.Screen name="My Orders" component={UserOrdersTabStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={UserProfileTabStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
