import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../../../Constants/Colors";
import Endpoints from "../../../Constants/Endpoints";
import Strings from "../../../Constants/Strings/en";
import LoadingIndicator from "../../Components/LoadingIndicator";
import TaskCard from "./TaskCard";
import getItems from '../../../Functions/getItems'
import { useNavigation } from "@react-navigation/native";
import { PlanContext } from "../../../Context/PlanContext";

const UpdateTaskHeader = () => {
  const { taskId } = useContext(PlanContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskState, setTaskState] = useState(0);
  const [taskType, setTaskType] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  //console.log(taskState + '+++++++++++')

  const getTask = async () => {
    const url = Endpoints.task + taskId
    await getItems(url).then((data) => {
      //console.log(data[0]);
      setTaskTitle(data[0].task_name);
      setTaskDescription(data[0].task_description);
      setTaskState(data[0].task_status);
      setTaskType(data[0].task_type_name);
      setTaskStartDate(data[0].task_start_date);
      setTaskEndDate(data[0].task_end_date);
      //console.log(taskState)
      setLoading(false);
    });
    
  };

  useEffect(() => {
    getTask();
  }, [navigation, taskState]);

  return (
    <View style={{ marginTop: -10 }}>
      {loading ? (
        <LoadingIndicator animating={loading} />
      ) : (
        <TaskCard
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          taskState={taskState}
          taskType={taskType}
          taskStartDate={taskStartDate}
          taskEndDate={taskEndDate}
        />
      )}
    </View>
  );
};

export default UpdateTaskHeader;
