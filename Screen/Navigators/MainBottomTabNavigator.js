import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

import DashboardScreen from '../DashboardScreens/DashboardScreen'
import StoryStackNavigator from './StoryStackNavigator'
import GoalScreenStackNavigator from './GoalScreenStackNavigator'

import NavigationDrawerHeader from '../Components/NavigationDrawerHeader';
import Colors from '../../Constants/Colors';
import LogoTitle from '../Components/LogoTitle'
import { GlobalContext } from '../../Context/GlobalContext';

const Tab = createBottomTabNavigator();


const MainBottomTabNavigator = ({ route, navigation }) => {

    const {theme} = useContext(GlobalContext)

    return (
        <Tab.Navigator
            initialRouteName="DashboardScreen"
            screenOptions={({ route }) => ({
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: theme.mainBackGroundColor, //Set Header color
                    height: 160,
                },
                headerTitle: props => <LogoTitle {...props} />,
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },

                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: theme.mainBackGroundColor },
                tabBarIcon: ({ focused, color, size }) => {
                    //console.log(route)
                    let iconName = '';
                    if (route.name === 'Dashboard') {
                        iconName = 'ios-bar-chart-outline' //'ios-bar-chart-outline'
                    } else if (route.name === 'Goals') {
                        iconName = 'ios-watch-outline' //'ios-watch-outline'
                    } else if (route.name === 'Stories') {
                        iconName = 'ios-chatbox-ellipses-outline' //'ios-hatbox-ellipses-outline';
                    }

                    // return <Ionicons name={iconName} size={size} color={color} />
                    return <Icon
                        reverse
                        name={iconName}
                        type='ionicon'
                        color={color}
                    />
                },
            })}
           
            >
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: "" }} />
            <Tab.Screen name="Goals" component={GoalScreenStackNavigator} options={{ title: "" }} />
            <Tab.Screen name="Stories" component={StoryStackNavigator} options={{ title: "" }} />

        </Tab.Navigator>
    );
};

export default MainBottomTabNavigator;

