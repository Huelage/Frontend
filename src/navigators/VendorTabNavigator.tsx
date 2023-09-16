import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { VendorTabParamList } from '@interfaces';
import { AccountScreen, HomeScreen, MenuScreen, OrderScreen } from '@screens/Vendor';
import { VendorTabBar, VendorTabHeader } from '@components/navigation';
import { useAppTheme } from '@hooks';

const Tab = createBottomTabNavigator<VendorTabParamList>();

const VendorTabNavigator = () => {
  const { color } = useAppTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => <VendorTabHeader />,
        tabBarBackground: () => <View style={{ backgroundColor: color.mainBg, flex: 1 }} />
      }}
      tabBar={(props) => <VendorTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default VendorTabNavigator;

const styles = StyleSheet.create({});