// Import React and Component
import React from "react";

// Import Navigators from React Navigation
import {
  createStackNavigator
} from "@react-navigation/stack";

//import { HeaderBackButton } from 'react-navigation';

import ListGoals from "../GoalScreens/ListGoals";
import ListTasks from "../GoalScreens/ListTasks";
import AddGoal from "../GoalScreens/AddGoal";
import EditGoal from "../GoalScreens/EditGoal";
import ViewTask from "../GoalScreens/ViewTask";
import AddTask from "../GoalScreens/AddTask";
import AddtaskNote from "../GoalScreens/AddTaskNote";
import ListPlans from "../GoalScreens/ListPlans";
import ViewPlan from "../GoalScreens/ViewPlan";
import AddPlan from "../GoalScreens/AddPlan";
import ViewGoal from "../GoalScreens/ViewGoal";

import Colors from "../../Constants/Colors";

import { Image,Button, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";

const Stack = createStackNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../../Image/logo.png")}
    />
  );
};

const GoalScreenStackNavigator = ({ route, navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ViewPlan"
      screenOptions={{
        headerTitleStyle: { color: "white" },
        headerStyle: { backgroundColor: Colors.mainBackgroundColor },
      }}
    >
      <Stack.Screen
        name="ListPlans"
        component={ListPlans}
        options={{
          title: "List Plans",
        }}
      />

      <Stack.Screen
        name="AddPlan"
        component={AddPlan}
        options={{ title: "Add Plan" }}
      />

      <Stack.Screen
        name="ViewPlan"
        component={ViewPlan}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ViewGoal"
        component={ViewGoal}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ListGoals"
        component={ListGoals}
        options={{
          title: "List Goals",
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

      {/* <Stack.Screen
        name="ListTasks"
        component={ListTasks}
        options={{
          title: "Goal Tasks"
        }}
      /> */}

      <Stack.Screen
        name="ListTasks"
        component={ListTasks}
        options={{
          title: "Goal Tasks",
          headerLeft: (props) => (
            <TouchableOpacity>
              <Icon 
                type="font-awesome"
                name="arrow-left"
                onPress={() =>navigation.navigate("ListGoals")}
                containerStyle={{
                  marginLeft:10
                }}
              />
            </TouchableOpacity>
          ),
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
