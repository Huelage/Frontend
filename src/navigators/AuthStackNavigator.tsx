import { AuthStackParamList } from '@interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, OTPScreen, OnBoardScreen, SignUpScreen, SignupSelectScreen } from '@screens/auth';
import React from 'react';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoard" component={OnBoardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="SignupSelect" component={SignupSelectScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;