import { UserTabBar, UserTabHeader } from "@components/navigation";
import { useAppTheme } from "@hooks";
import { UserTabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryScreen, HomeScreen, ProfileScreen, VendorScreen } from "@screens/core";
import React from "react";
import { View } from "react-native";

const Tab = createBottomTabNavigator<UserTabParamList>();

const UserTabNavigator = () => {
  const { color } = useAppTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => <UserTabHeader />,
        tabBarBackground: () => <View style={{ backgroundColor: color.mainBg, flex: 1 }} />
      }}
      tabBar={(props) => <UserTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vendors" component={VendorScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
