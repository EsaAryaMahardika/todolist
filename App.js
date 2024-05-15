/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router'
export default function App() {
  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );
}