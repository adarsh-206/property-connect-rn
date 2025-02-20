import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeScreen from '../screens/home/HomeScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const getTabIcon = routeName => {
  switch (routeName) {
    case 'Home':
      return require('../assests/homeIcon.png');
    case 'Explore':
      return require('../assests/search.png');
    case 'Profile':
      return require('../assests/person.png');
    default:
      return null;
  }
};

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return (
            <Image
              source={getTabIcon(route.name)}
              style={{width: size, height: size, tintColor: color}}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#0061FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          paddingBottom: 5,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
