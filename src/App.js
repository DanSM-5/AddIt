import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import AppNavigator from './components/AppNavigator';
import MenuButton from './components/MenuButton';
import MenuNavigation from './components/MenuNavigation';
import { Button, Alert } from 'react-native';

const App = () => {
    return (
      <>
          <NavigationContainer>
            <MenuNavigation />
          </NavigationContainer>
      </>
    );
};

export default App;