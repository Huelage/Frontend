import { useAppSelector } from '@api/app/appHooks';
import { isAuthenticated } from '@api/slices/globalSlice';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './StackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MainNavigator = () => {
  const isSignedIn = useAppSelector(isAuthenticated);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isSignedIn ? <StackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;