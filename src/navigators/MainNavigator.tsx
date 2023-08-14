import { useAppSelector } from '@api/app/appHooks';
import { isAuthenticated } from '@api/slices/globalSlice';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './StackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppTheme } from '@hooks';

const MainNavigator = () => {
  const isSignedIn = useAppSelector(isAuthenticated);
  const { theme } = useAppTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        {isSignedIn ? <StackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;