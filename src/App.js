import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import AppNavigator from './components/AppNavigator';


const App = () => {


    return (
      <>
          <NavigationContainer>
            <AppNavigator.Navigator>
              <AppNavigator.Screen name="Home" component={HomePage} 
                options={{ title: 'Home' }}
              />
              <AppNavigator.Screen name="Game" component={GamePage} 
                options={{ title: 'Game' }}
              />
            </AppNavigator.Navigator>
          </NavigationContainer>
      </>
    );
};

export default App;