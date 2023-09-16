import { UserTabBar, UserTabHeader } from "@components/navigation";
import { useAppTheme } from "@hooks";
import { UserTabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@screens/core";
import { SkRRect } from "@shopify/react-native-skia";
import React from "react";
import { View } from "react-native";
import { UserOrdersTabStack, UserProfileTabStack, UserVendorsTabStack } from "./UserTabStacks";

const Tab = createBottomTabNavigator<UserTabParamList>();
interface NavigatorProps {
  testRect?: SkRRect; /* This is for unit testing purposes only */
}

const UserTabNavigator = ({ testRect }: NavigatorProps) => {
  const { color } = useAppTheme();
  const ProppedHomeScreen = () => <HomeScreen testRect={testRect} />;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarBackground: () => <View style={{ backgroundColor: color.mainBg, flex: 1 }} />
      }}
      tabBar={(props) => <UserTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={ProppedHomeScreen} options={{ header: () => <UserTabHeader /> }} />
      <Tab.Screen name="Vendors" component={UserVendorsTabStack} options={{ headerShown: false }} />
      <Tab.Screen name="My Orders" component={UserOrdersTabStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={UserProfileTabStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
