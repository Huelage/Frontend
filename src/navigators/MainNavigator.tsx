import { useAppSelector } from '@api/app/appHooks';
import { isAuthenticated } from '@api/slices/globalSlice';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './StackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const MainNavigator = () => {
  const isSignedIn = useAppSelector(isAuthenticated);
  return (
    <NavigationContainer>
      {isSignedIn ? <StackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;