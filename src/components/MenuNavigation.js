import React from 'react';
import { Image } from 'react-native';
import { 
    createDrawerNavigator, 
    DrawerContentScrollView,
    DrawerItem, 
} from '@react-navigation/drawer';
import AppNavigator from '../components/AppNavigator';

const DrawerContent = (props) => (
    <DrawerContentScrollView>
        <DrawerItem 
            label=""
            icon={() => <Image style={{width: 20, height: 20}} source={require('../../images/menu.webp')} />}
            onPress={() => props.navigation.toggleDrawer()}
        />
        <DrawerItem 
            label="Settings"
            onPress={() => props.navigation.navigate('Home', { screen: 'Settings'})}
        />
    </DrawerContentScrollView>
);

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
            <Menu.Screen name="Home" component={AppNavigator} />
        </Menu.Navigator>
    );
};

export default MenuNavigation;