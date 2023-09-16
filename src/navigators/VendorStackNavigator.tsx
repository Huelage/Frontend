import { VendorStackParamList } from '@interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import VendorTabNavigator from './VendorTabNavigator';
import { NotificationScreen } from '@screens/Vendor';

const Stack = createNativeStackNavigator<VendorStackParamList>();


const VendorStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={VendorTabNavigator} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default VendorStackNavigator;
