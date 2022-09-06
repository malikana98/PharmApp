//import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/stacks/home';
import SettingsScreen from './screens/stacks/profile';


const Tab = createBottomTabNavigator();


  export default function Main(){
    return (
    <NavigationContainer>
    <Tab.Navigator  screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  )
  } 