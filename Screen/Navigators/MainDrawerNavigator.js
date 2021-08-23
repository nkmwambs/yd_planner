// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import CustomSidebarMenu from '../Components/CustomSidebarMenu';
import MainBottomTabNavigator from './MainBottomTabNavigator'
import settingScreenStack from './SettingScreenStack'

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = (props) => {
    return (
        <Drawer.Navigator
            screenOptions={{ 
                headerShown: false,
                drawerActiveTintColor:'white',
                drawerInactiveTintColor:'white',
            }}
            drawerContent={CustomSidebarMenu}>
            <Drawer.Screen
                name="MainBottomTabNavigator"
                options={{ drawerLabel: 'Dashboard' }}
                component={MainBottomTabNavigator}

            />
            <Drawer.Screen
                name="settingScreenStack"
                options={{ drawerLabel: 'Settings' }}
                component={settingScreenStack}
            />
        </Drawer.Navigator>
    );
};

export default MainDrawerNavigator;