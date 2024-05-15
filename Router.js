import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Beach, Board, Tutorial, Home, More, Profile, Upload, Edit, Register, Login, Splash } from './assets/pages';
import Nav from './assets/components/Nav';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator tabBar={props => <Nav {...props} />}>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Tab.Screen name="More" component={More} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Beach" component={Beach} options={{ headerShown: false }} />
      <Stack.Screen name="Board" component={Board} options={{ headerShown: false }} />
      <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false }} />
      <Stack.Screen name="Upload" component={Upload} options={{ headerShown: false }} />
      <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
export default Router