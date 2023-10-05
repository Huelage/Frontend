import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getEntity, switchTheme } from "@api/slices/globalSlice";
import { useAppTheme } from "@hooks";
import { DarkTheme, DefaultTheme, NavigationContainer, } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthStackNavigator from "./AuthStackNavigator";
import StackNavigator from "./StackNavigator";

const MainNavigator = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(getEntity);
  const { theme } = useAppTheme();
  const nativeTheme = useColorScheme();
  useEffect(() => {
    dispatch(switchTheme(nativeTheme || "light"));
  }, [nativeTheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
        {!!isSignedIn ? <StackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
