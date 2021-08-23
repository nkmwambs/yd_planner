// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../SettingScreens/SettingsScreen';
import NavigationDrawerHeader from '../Components/NavigationDrawerHeader'
import Colors from '../../Constants/Colors'
import LogoTitle from '../Components/LogoTitle'


const Stack = createStackNavigator();


const SettingScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: Colors.mainBackgroundColor, //Set Header color
                    height: 160,
                },
                headerTitle: props => <LogoTitle {...props} />,
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Settings', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

export default SettingScreenStack;