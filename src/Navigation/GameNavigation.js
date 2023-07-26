import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import SettingsPage from '../pages/SettingsPage';
import MenuButton from '../components/MenuButton';
import LanguageContext from '../components/LanguageContext';

const Game = createStackNavigator();

const GameNavigation = ({ navigation }) => {
    const lang = useContext(LanguageContext).language;
    return (
    <Game.Navigator>
        <Game.Screen
            name="Menu"
            component={HomePage}
            options={{
                title: lang.chooseDif,
                headerRight: () => <MenuButton onPress={navigation.toggleDrawer} />,
            }}
        />
        <Game.Screen
            name="Game"
            component={GamePage}
            options={{ title: lang.game }}
        />
        <Game.Screen
            name="Settings"
            component={SettingsPage}
            options={{ title: lang.settings }}
        />
    </Game.Navigator>);
}
export default GameNavigation;
