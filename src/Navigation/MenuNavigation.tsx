import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import GameNavigation from './GameNavigation';
import LanguageContext from '../components/LanguageContext';
import {
  DrawerNavigationHelpers,
  DrawerNavigationOptions,
} from '@react-navigation/drawer/lib/typescript/src/types';

const IconImage = () => {
  return (
    <Image
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ width: 20, height: 20 }}
      source={require('../images/menu.webp')}
    />
  );
};

const DrawerContent = ({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) => {
  const lang = useContext(LanguageContext).dictionary;
  return (
    <DrawerContentScrollView>
      <DrawerItem label="" icon={IconImage} onPress={navigation.toggleDrawer} />
      <DrawerItem
        label={lang.settings}
        onPress={() => navigation.navigate('Home', { screen: 'Settings' })}
      />
    </DrawerContentScrollView>
  );
};

const MenuNavigation = () => {
  const Menu = createDrawerNavigator();
  return (
    <Menu.Navigator
      drawerContent={DrawerContent}
      // @ts-ignore TODO: Check later if drawerPosition no longer exists
      drawerPosition="right"
      screenOptions={
        {
          swipeEnabled: false,
          gestureEnabled: false,
        } as DrawerNavigationOptions
      }>
      <Menu.Screen
        name="Home"
        component={GameNavigation}
        options={{ title: 'Home' }}
      />
    </Menu.Navigator>
  );
};

export default MenuNavigation;
