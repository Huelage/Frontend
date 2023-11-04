import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getAccessToken, getThemeType, switchTheme } from "@api/slices/globalSlice";
import { useAppTheme } from "@hooks";
import { DarkTheme, DefaultTheme, NavigationContainer, } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthStackNavigator from "./AuthStackNavigator";
import StackNavigator from "./StackNavigator";

const MainNavigator = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(getAccessToken);
  const themeType = useAppSelector(getThemeType);
  const { theme } = useAppTheme();
  const nativeTheme = useColorScheme();

  useEffect(() => {
    if (themeType === "system")
      dispatch(switchTheme(nativeTheme || "dark"));
  }, [nativeTheme]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
        {!!isSignedIn ? <StackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
