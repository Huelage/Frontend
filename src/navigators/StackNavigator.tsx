import { StackParamList } from '@interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from '@screens/core';
import React from 'react';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;