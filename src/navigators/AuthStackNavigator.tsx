import { AuthStackParamList } from "@interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForgotPasswordScreen, ImageUploadScreen, LoginScreen, OTPScreen, OnBoardScreen, SetPasswordScreen, SignUpScreen, SignupSelectScreen, VerifyEmailScreen, } from "@screens/auth";
import React from "react";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoard" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="OnBoard" component={OnBoardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
      <Stack.Screen name="SignupSelect" component={SignupSelectScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
