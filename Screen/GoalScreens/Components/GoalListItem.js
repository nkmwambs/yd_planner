import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Colors from "../../../Constants/Colors";
import { PlanContext } from "../../../Context/PlanContext";
import ContentRow from "./ContentRow";
import PlannerBadge from "../../Components/PlannerBadge";

const GoalListItem = ({ goal }) => {
  const navigation = useNavigation();
  const { updateCurrentGoalId } = useContext(PlanContext);

  const compute_goal_status = () => {
      let status = 'New'
      
    //   count_of_tasks
    //   count_new_tasks
    //   count_inprogress_tasks
    //   count_completed_tasks

      if(goal.count_inprogress_tasks > 0){
        status = 'In Progress'
      }else if(goal.count_new_tasks == goal.count_completed_tasks){
        status = 'Completed'
      }

      return status
  }

  return (
    <ListItem
      key={goal.goal_id}
      bottomDivider
      containerStyle={{
        margin: 5,
        borderRadius: 10,
        elevation: 5,
        borderColor: Colors.mainBackgroundColor,
        borderWidth: 2,
      }}
      onPress={() => {
        updateCurrentGoalId(goal.goal_id);
        navigation.navigate("ViewGoal");
      }}
      onLongPress={() => {
        Alert.alert("Confirmation", "Please choose the action to perform", [
          {
            text: "Add Task",
            onPress: () => {
              updateCurrentGoalId(goal.goal_id);
              navigation.navigate("AddTask");
              //navigation.navigate("AddTask", { goal_id: props.goalId });
            },
          },
          {
            text: "Edit Goal",
            onPress: () => {
              //alert("Feature under construction");
              navigation.navigate("EditGoal", { goalId: goal.goal_id })
            },
          },
          {
            text: "Cancel",
            onPress: () => null,
          },
        ]);
      }}
    >
      <ListItem.Content>
        <ListItem.Title style={{ marginBottom: 20 }}>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{goal.goal_name}</Text>
          </View>
        </ListItem.Title>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"All: " + goal.count_of_tasks}
          />
          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"New: " + goal.count_new_tasks}
          />
          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"Progress: " + goal.count_inprogress_tasks}
          />
          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"Complete: " + goal.count_completed_tasks}
          />
        </View>

        {/* <View style={{ paddingTop: 5 }}> */}
        <ContentRow
          tiles={[
            { title: "Start Date", value: goal.goal_start_date },
            { title: "End Date", value: goal.goal_end_date },
          ]}
        />

        <ContentRow
          tiles={[
            { title: "Status", value: compute_goal_status() },
            { title: "Created On", value: goal.goal_created_date },
          ]}
        />
        {/* </View> */}
      </ListItem.Content>
    </ListItem>
  );
};

export default GoalListItem;


const styles = StyleSheet.create({
    badgeTextStyle:{
        fontWeight: "bold",
        color: "white",
    },
    badgeContainerStyle:{
        backgroundColor: "green",
        marginRight: 5,
        padding: 5,
        borderRadius: 5,
    }
})