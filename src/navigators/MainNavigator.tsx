import { useAppSelector } from '@api/app/appHooks';
import { isAuthenticated } from '@api/slices/globalSlice';
import StackNavigator from './StackNavigator';
import TabNavigator from './TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const MainNavigator = () => {
  const isSignedIn = useAppSelector(isAuthenticated);
  return (
    <NavigationContainer>
      {isSignedIn ? <TabNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;