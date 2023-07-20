import { StackParamList } from '@interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '@screens/core/CartScreen';
import WelcomePage from '@screens/auth/SignupSelectScreen';
import { LoginScreen, OTPScreen, OnBoardScreen, SignUpScreen } from '@screens/auth';
import React from 'react';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OTP" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoard" component={OnBoardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} initialParams={{ isVendor: false }} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;