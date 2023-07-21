import { useAppSelector } from '@api/app/appHooks';
import { isAuthenticated } from '@api/slices/globalSlice';
import { StackNavigator, TabNavigator } from '@navigators';
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