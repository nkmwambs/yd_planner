// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import ListGoals from '../GoalScreens/ListGoals'
import ListTasks from '../GoalScreens/ListTasks'
import AddGoal from '../GoalScreens/AddGoal'
import EditGoal from '../GoalScreens/EditGoal'
import ViewTask from '../GoalScreens/ViewTask'
import AddTask from '../GoalScreens/AddTask'
import AddtaskNote from '../GoalScreens/AddTaskNote'
import ListPlans from '../GoalScreens/ListPlans'
import ViewPlan from '../GoalScreens/ViewPlan'
import AddPlan from '../GoalScreens/AddPlan'

import Colors from '../../Constants/Colors'

import { Image } from 'react-native'



const Stack = createStackNavigator();

const LogoTitle = () => {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require('../../Image/logo.png')}
        />
    )
}

const GoalScreenStackNavigator = ({ route, navigation }) => {
    return (
        <Stack.Navigator initialRouteName="ViewPlan"
            screenOptions={{
                headerTitleStyle: { color: 'white' },
                headerStyle: { backgroundColor: Colors.mainBackgroundColor, }
            }}
        >

            <Stack.Screen
                name="ListPlans"
                component={ListPlans}
                options={
                    {
                        title: 'List Plans',
                    }
                }
            />

            <Stack.Screen
                name="AddPlan"
                component={AddPlan}
                options={{ title: 'Add Plan' }}
            />

            <Stack.Screen
                name="ViewPlan"
                component={ViewPlan}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ListGoals"
                component={ListGoals}
                options={{
                    title: 'List Goals',
                }}

            />

            <Stack.Screen
                name="AddGoal"
                component={AddGoal}
                options={{
                    title: "Add a Goal",
                }}
            />

            <Stack.Screen
                name="EditGoal"
                component={EditGoal}
                options={{
                    title: "Edit a Goal",
                }}
            />

            <Stack.Screen
                name="ListTasks"
                component={ListTasks}
                options={{
                    title: "Goal Tasks", headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            style={styles.custom}
                            onPress={() => navigation.popToTop()}
                        />
                    )
                }}

            />

            <Stack.Screen
                name="ViewTask"
                component={ViewTask}
                options={{ title: "Update Task" }}
            />

            <Stack.Screen
                name="AddtaskNote"
                component={AddtaskNote}
                options={{ title: "Add a Note" }}
            />

            <Stack.Screen
                name="AddTask"
                component={AddTask}
                options={{ title: "Add a Task" }}
            />

        </Stack.Navigator>
    );
};

export default GoalScreenStackNavigator;