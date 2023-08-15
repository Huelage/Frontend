import { TabBar, TabHeader } from "@components/navigation";
import { TabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FavouriteScreen,
  HomeScreen,
  MenuScreen,
  ProfileScreen,
  CartScreen,
} from "@screens/core";
import React from "react";
import { View } from "react-native";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => <TabHeader />,
        tabBarBackground: () => <View style={{ backgroundColor: "#fff", flex: 1 }} />
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vendors" component={MenuScreen} />
      <Tab.Screen name="History" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
