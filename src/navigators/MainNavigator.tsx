import { useAppDispatch, useAppSelector } from '@api/app/appHooks';
import { getAuthStatus, switchTheme } from '@api/slices/globalSlice';
import { useAppTheme } from '@hooks';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthStackNavigator from './AuthStackNavigator';
import StackNavigator from './StackNavigator';
import { useColorScheme } from 'react-native';

const MainNavigator = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(getAuthStatus);
  const { theme } = useAppTheme();
  const nativeTheme = useColorScheme();
  useEffect(() => {
    dispatch(switchTheme(nativeTheme || "light"));
  }, [nativeTheme]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        {isSignedIn ? <StackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;