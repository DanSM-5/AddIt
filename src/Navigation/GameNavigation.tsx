import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import SettingsPage from '../pages/SettingsPage';
import MenuButton from '../components/MenuButton';
import LanguageContext from '../components/LanguageContext';

const Game = createStackNavigator();
const GameNavigation = ({ navigation }: {
    route: Record<string, unknown>;
    navigation: any;
}) => {
    const { game, settings, chooseDif } = useContext(LanguageContext).language;
    return (
    <Game.Navigator>
        <Game.Screen
            name="Menu"
            component={HomePage}
            options={{
                title: chooseDif,
                headerRight: () => <MenuButton navigation onPress={navigation.toggleDrawer} />,
            }}
        />
        <Game.Screen
            name="Game"
            component={GamePage}
            options={{ title: game }}
        />
        <Game.Screen
            name="Settings"
            component={SettingsPage}
            options={{ title: settings }}
        />
    </Game.Navigator>);
};

export default GameNavigation;
