// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';

import StoryListScreen from '../StoryScreens/StoryListScreen';
import AddStory from '../StoryScreens/AddStory';
import NavigationDrawerHeader from '../Components/NavigationDrawerHeader'

import Strings from '../../Constants/Strings/en'

const Stack = createStackNavigator();

const StoryStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="StoryListScreen"
        >
            <Stack.Screen
                name="StoryListScreen"
                component={StoryListScreen}
                options={{
                    title: Strings.ListStories,
                    headerTitleStyle: {
                        alignSelf: 'center'
                    }
                }}
            />

            <Stack.Screen
                name="AddStory"
                component={AddStory}
                options={{
                    title: Strings.addStory //'Add a Story', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

export default StoryStackNavigator;