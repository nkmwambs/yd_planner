import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Colors from "../../../Constants/Colors";
import { PlanContext } from "../../../Context/PlanContext";
import ContentRow from "./ContentRow";
import PlannerBadge from "../../Components/PlannerBadge";

const GoalListItem = ({ goal, goalDeletionHandler }) => {
  const navigation = useNavigation();
  const { updateCurrentGoalId } = useContext(PlanContext);

  //useEffect(updateGoalId,[])

  const compute_goal_status = () => {
      let status = 'New'
      
    //   count_of_tasks
    //   count_new_tasks
    //   count_inprogress_tasks
    //   count_completed_tasks

      if(goal.count_inprogress_tasks > 0){
        status = 'In Progress'
      }else if(goal.count_completed_tasks > 0 && goal.count_new_tasks == 0 ){
        status = 'Completed';
      }else if(goal.count_new_tasks == 0 && goal.count_completed_tasks == 0 && goal.count_inprogress_tasks == 0){
        status = 'No tasks available'
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
              navigation.navigate("AddGoal", { goalId: goal.goal_id })
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
          <View>
            <View
              style={{
                // borderBottomColor: "black",
                // borderBottomWidth: 1,
                // borderStyle: "solid",
                // marginBottom: 10,
                marginBottom:15
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{goal.goal_name}</Text>
            </View>

            <View style={{
              flex:1,
              flexDirection: "row"
            }}>
              <TouchableOpacity 
                  style={styles.actionStyle} 
                  onPress={() => {
                    updateCurrentGoalId(goal.goal_id)
                    navigation.navigate("ViewGoal")
                  }}
              >
                {/* <Text>Open</Text> */}
                <Icon type="font-awesome" name="folder-open" size={15} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                  style={styles.actionStyle} 
                  onPress={() => {
                    navigation.navigate("AddGoal", { goalId: goal.goal_id })
                  }}
              >
                {/* <Text>Edit</Text> */}
                <Icon type="font-awesome" name="pencil" size={15} />
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.actionStyle} 
                  onPress={() => {
                    //console.log("Delete Goal")
                    Alert.alert("Confirmation", "Are you sure you want to delete this goal", [
                      {
                        text: "Delete Goal",
                        onPress: () => goalDeletionHandler(goal.goal_id),
                      },
                      {
                        text: "Cancel",
                        onPress: () => {
                          console.log('Goal deletion cancelled')
                  
                        },
                      }
                    ])

                  }}
              >
                <Icon type="font-awesome" name="trash" size={15} />
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.actionStyle}
                  onPress={() => {
                    updateCurrentGoalId(goal.goal_id)
                    navigation.navigate("AddTask")
                  }} 
              >
                {/* <Text>Add Task</Text> */}
                <Icon type="font-awesome" name="plus" size={15} />
              </TouchableOpacity>

            </View>
          </View>
        </ListItem.Title>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          
          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"N: " + goal.count_new_tasks}
          />
          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"P: " + goal.count_inprogress_tasks}
          />
          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"C: " + goal.count_completed_tasks}
          />

          <PlannerBadge
            containerStyle={styles.badgeContainerStyle}
            style={styles.badgeTextStyle}
            text={"S: " + goal.count_suspended_tasks}
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
    },
    actionStyle:{marginRight:25}
})