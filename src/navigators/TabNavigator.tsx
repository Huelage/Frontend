import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FavouriteScreen from '../screens/core/FavouriteScreen';
import HomeScreen from '../screens/core/HomeScreen';
import MenuScreen from '../screens/core/MenuScreen';
import ProfileScreen from '../screens/core/ProfileScreen';
import { TabParamList } from '../utils/interfaces';
import TabBar from '../components/navigation/TabBar';
import TabHeader from '../components/navigation/TabHeader';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <TabHeader {...props} />,
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;