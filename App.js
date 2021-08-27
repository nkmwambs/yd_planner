// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import "react-native-gesture-handler";

// Import React and Component
import React from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens and Navigators
import SplashScreen from "./Screen/Authentication/SplashScreen";
import AuthStackNavigator from "./Screen/Navigators/AuthStackNavigator";
import MainDrawerNavigator from "./Screen/Navigators/MainDrawerNavigator";

import { GlobalProvider } from "./Context/GlobalContext";
import {PlanProvider} from './Context/PlanContext'

const Stack = createStackNavigator();

const App = () => {
  return (
    <GlobalProvider>
      <PlanProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AuthStackNavigator"
              component={AuthStackNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MainDrawerNavigator"
              component={MainDrawerNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PlanProvider>
    </GlobalProvider>
  );
};

export default App;
