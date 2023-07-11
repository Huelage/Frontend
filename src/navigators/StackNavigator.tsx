import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import OnBoardScreen from '../screens/auth/OnBoardScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import { StackParamList } from '../utils/interfaces';
import OTPScreen from '../screens/auth/OTPScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoard" component={OnBoardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;