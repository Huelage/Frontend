import { useAppSelector } from '@api/app/appHooks';
import { isAuthenticated } from '@api/slices/globalSlice';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import StackNavigator from './StackNavigator';

const MainNavigator = () => {
  const isSignedIn = useAppSelector(isAuthenticated);
  return (
    <NavigationContainer>
      {isSignedIn ? <AuthStackNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;