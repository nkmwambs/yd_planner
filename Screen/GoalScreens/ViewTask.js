import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import Endpoints from "../../Constants/Endpoints";
import getItems from '../../Functions/getItems'

import UpdateTaskHeader from "./Components/UpdateTaskHeader";
import TaskNoteListItem from "../GoalScreens/Components/TaskNoteListItem";
import Loader from "../Components/Loader";
import NoteSlider from "./Components/NoteSlider";
import { PlanContext } from "../../Context/PlanContext";

const ViewTask = ({ route, navigation }) => {
  // const { task_id } = route.params;
  const { taskId } = useContext(PlanContext);
  const [taskNotes, setTaskNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTaskNotes = async () => {

    const url = Endpoints.task_notes + "?task_id=" + taskId
    console.log(url)
    await getItems(url).then((data) => {
        console.log(data)
        setTaskNotes(data);
        setLoading(false);
    })

    // await fetch(Endpoints.task_notes + "?task_id=" + taskId, {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setTaskNotes(json.data);
    //     setLoading(false);
    //     // if (json.status === 'success') {
    //     //console.log(json.data);
    //     // }
    //   })
    //   .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener("focus", () => {
      getTaskNotes();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  });

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => null}>
      <TaskNoteListItem note={item.task_note} noteId={item.task_note_id} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <View style={styles.taksDetails}>
            <View>
              <UpdateTaskHeader />
            </View>
          </View>

          <View style={styles.listOfNotes}>
            {taskNotes.length == 0 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>No Notes available</Text>
              </View>
            ) : (
              <View
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <NoteSlider notes={taskNotes} />
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  taksDetails: {
    //backgroundColor: "red"
  },
  listOfNotes: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  }
});

export default ViewTask;
