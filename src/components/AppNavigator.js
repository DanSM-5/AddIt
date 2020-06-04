import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import SettingsPage from '../pages/SettingsPage';
import MenuButton from './MenuButton';

const GameNavigation = createStackNavigator();

const AppNavigator = ({ navigation }) => {
    return (
    <GameNavigation.Navigator >
        <GameNavigation.Screen name="Home" component={HomePage} 
            options={{ 
                title: 'Home',
                headerRight: () => <MenuButton onPress={navigation.toggleDrawer} />,
            }}
        />
        <GameNavigation.Screen name="Game" component={GamePage} 
            options={{ title: 'Game' }}
        />
        <GameNavigation.Screen name="Settings" component={SettingsPage}/>
    </GameNavigation.Navigator>)
}



export default AppNavigator;