import React, { useContext, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import SettingsPage from '../pages/SettingsPage';
import MenuButton from '../components/MenuButton';
import LanguageContext from '../components/LanguageContext';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

const Game = createStackNavigator();
const GameNavigation = ({
  navigation,
}: {
  route: Record<string, unknown>;
  navigation: DrawerNavigationHelpers;
}) => {
  const { game, settings, chooseDif } = useContext(LanguageContext).language;
  const HeaderRight = useMemo(() => {
    return () => <MenuButton navigation onPress={navigation.toggleDrawer} />;
  }, [navigation]);

  return (
    <Game.Navigator>
      <Game.Screen
        name="Menu"
        component={HomePage}
        options={{
          title: chooseDif,
          headerRight: HeaderRight,
        }}
      />
      <Game.Screen name="Game" component={GamePage} options={{ title: game }} />
      <Game.Screen
        name="Settings"
        component={SettingsPage}
        options={{ title: settings }}
      />
    </Game.Navigator>
  );
};

export default GameNavigation;
