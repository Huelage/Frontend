import { UserTabBar, UserTabHeader } from "@components/navigation";
import { useAppTheme } from "@hooks";
import { UserTabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryScreen, HomeScreen, ProfileScreen, VendorScreen } from "@screens/core";
import { SkRRect } from "@shopify/react-native-skia";
import React from "react";
import { View } from "react-native";

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
        header: () => <UserTabHeader />,
        tabBarBackground: () => <View style={{ backgroundColor: color.mainBg, flex: 1 }} />
      }}
      tabBar={(props) => <UserTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={ProppedHomeScreen} />
      <Tab.Screen name="Vendors" component={VendorScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
