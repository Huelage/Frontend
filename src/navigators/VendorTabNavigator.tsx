import { VendorTabBar, VendorTabHeader } from "@components/navigation";
import { VendorTabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@screens/Vendor";
import React from "react";
import { VendorAccountTabStack, VendorMenuTabStack, VendorOrdersTabStack } from "./VendorTabStacks";

const Tab = createBottomTabNavigator<VendorTabParamList>();

const VendorTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <VendorTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ header: () => <VendorTabHeader /> }} />
      <Tab.Screen name="Orders" component={VendorOrdersTabStack} options={{ headerShown: false }} />
      <Tab.Screen name="Menu" component={VendorMenuTabStack} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={VendorAccountTabStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default VendorTabNavigator;
