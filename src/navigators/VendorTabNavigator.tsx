import { VendorTabBar, VendorTabHeader } from '@components/navigation';
import { useAppTheme } from '@hooks';
import { VendorTabParamList } from '@interfaces';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/Vendor';
import React from 'react';
import { View } from 'react-native';
import { VendorAccountTabStack, VendorMenuTabStack, VendorOrdersTabStack } from './VendorTabStacks';

const Tab = createBottomTabNavigator<VendorTabParamList>();

const VendorTabNavigator = () => {
  const { color } = useAppTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarBackground: () => <View style={{ backgroundColor: color.mainBg, flex: 1 }} />
      }}
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
