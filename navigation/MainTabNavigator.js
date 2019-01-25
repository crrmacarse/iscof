import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NavigateScreen from '../screens/NavigateScreen';
import AboutScreen from '../screens/AboutScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CamusMapScreen from '../screens/CamusMapScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: 'green',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const NavigateStack = createStackNavigator({
  Navigate: NavigateScreen,
});

NavigateStack.navigationOptions = {
  tabBarLabel: 'Navigate',
  tabBarOptions: {
    activeTintColor: 'green',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-navigate' : 'md-navigate'}
    />
  ),
};

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
});

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarOptions: {
    activeTintColor: 'green',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
    />
  ),
};

const AboutStack = createStackNavigator({
  About: AboutScreen,
  CampusMap: CamusMapScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarOptions: {
    activeTintColor: 'green',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  NavigateStack,
  ExploreStack,
  AboutStack,
});
