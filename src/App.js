import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './Navigation/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => 
    (<MenuProvider>
        <AppNavigator /> 
    </MenuProvider>);

export default App;
