import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../../../Constants/Colors";
import Endpoints from "../../../Constants/Endpoints";
import Strings from "../../../Constants/Strings/en";
import LoadingIndicator from "../../Components/LoadingIndicator";
import TaskCard from "./TaskCard";

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

  const getTask = async () => {
    await getItems(Endpoints.task + taskId).then((data) => {
      //console.log(taskId);
      setTaskTitle(data.task_name);
      setTaskDescription(data.task_description);
      setTaskState(data.task_status);
      setTaskType(data.task_type_name);
      setTaskStartDate(data.task_start_date);
      setTaskEndDate(data.task_end_date);

      setLoading(false);
    });
    
  };

  useEffect(() => {
    getTask();
  }, [navigation]);

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
