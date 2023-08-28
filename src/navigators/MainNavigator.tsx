import { useAppSelector } from "@api/app/appHooks";
import { getAuthStatus } from "@api/slices/globalSlice";
import { useAppTheme } from "@hooks";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthStackNavigator from "./AuthStackNavigator";
import StackNavigator from "./StackNavigator";

const MainNavigator = () => {
  const isSignedIn = useAppSelector(getAuthStatus);
  const { theme } = useAppTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
        {isSignedIn ? <StackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
