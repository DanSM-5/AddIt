import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import GameNavigation from './GameNavigation';
import LanguageContext from '../components/LanguageContext';

const DrawerContent = ({ navigation }) => {
    const lang = useContext(LanguageContext).language;
    return (
    <DrawerContentScrollView>
        <DrawerItem
            label=""
            icon={() => <Image style={{width: 20, height: 20}}
            source={require('../images/menu.webp')} />}
            onPress={() => navigation.toggleDrawer()}
        />
        <DrawerItem
            label={lang.settings}
            onPress={() => navigation.navigate('Home', { screen: 'Settings'})}
        />
    </DrawerContentScrollView>
);}

const MenuNavigation = () => {
    const Menu = createDrawerNavigator();
    return (
    <Menu.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        drawerPosition="right"
        screenOptions={{
            swipeEnabled: false,
            gestureEnabled: false,
        }}
    >
        <Menu.Screen
            name="Home"
            component={GameNavigation}
            options={{ title: 'Home' }}
        />
    </Menu.Navigator>);
};

export default MenuNavigation;
