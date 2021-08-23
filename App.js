// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens and Navigators 
import SplashScreen from './Screen/Authentication/SplashScreen';
import AuthStackNavigator from './Screen/Navigators/AuthStackNavigator';
import MainDrawerNavigator from './Screen/Navigators/MainDrawerNavigator';

// import UserAvatar from './Screen/DashboardScreens/UserAvatar';
// import StoryStackNavigator from './Screen/Navigators/StoryStackNavigator'

// import Strings from './Constants/Strings/en'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="AuthStackNavigator"
          component={AuthStackNavigator}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="MainDrawerNavigator"
          component={MainDrawerNavigator}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="UserAvatar"
          component={UserAvatar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Stories"
          component={StoryStackNavigator}
          options={{
            title: Strings.ListStories,
            headerTitleStyle: {
              alignSelf: 'center'
            }
          }}
        /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;