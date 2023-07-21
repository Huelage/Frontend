import { AuthStackParamList } from '@interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from '@screens/core';
import React from 'react';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;