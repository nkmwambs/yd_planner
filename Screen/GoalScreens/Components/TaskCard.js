import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
// import Colors from '../../../Constants/Colors'
// import Endpoints from '../../../Constants/Endpoints'
import Strings from "../../../Constants/Strings/en";
import { useNavigation } from "@react-navigation/native";
import ContentRow from "../Components/ContentRow";

// import postData from "../../../Functions/postData";
import Loader from "../../Components/Loader";
import { Card, Button, Icon } from "react-native-elements";
import Endpoints from "../../../Constants/Endpoints";
import { PlanContext } from "../../../Context/PlanContext";

const TaskCard = (props) => {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const { taskId } = useContext(PlanContext);
  const navigation = useNavigation();

  //console.log(taskStatus);

  useEffect(() => {
    //setTaskStatus(props.taskState)
    //setTaskStatus(taskStatus == 0 ? 1 : (taskStatus == 2 ? 1 : 2));
    // if(taskStatus != 0){
    //   setTaskStatus(taskStatus)
    // }
  })


  const updateTaskStatus = async (taskStatus) => {
    //console.log(taskStatus);
    var dataToSend = {
      task_id: taskId,
      task_status: taskStatus,
    };

    var formBody = [];

    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch(Endpoints.update_task_status, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.heading}>
      <View style={styles.centeredView}>
        <Loader loading={loading} />
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          presentationStyle="fullScreen"
          statusBarTranslucent={false}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{props.taskDescription}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <Card containerStyle={{ width: Dimensions.get("window").width }}>
        <Card.Title>
          <Button
            title="Add Note"
            containerStyle={{ paddingRight: 5 }}
            onPress={() => navigation.navigate("AddtaskNote")}
            buttonStyle={{ backgroundColor: "green" }}
          />

          <Button
            onPress={() => {
              setTaskStatus(taskStatus == 0 ? 1 : (taskStatus == 2 ? 1 : 2));
              taskStatus == 0 ? updateTaskStatus(1) : (taskStatus == 2 ? updateTaskStatus(1) : updateTaskStatus(2))
              //updateTaskStatus(taskStatus);
              setLoading(true);
              //console.log(taskStatus)
            }}
            title={
              taskStatus == 0 || taskStatus == 2
                ? "Mark Progress"
                : "Mark Complete"
            } //"Mark Complete"
            containerStyle={{ paddingRight: 5 }}
            buttonStyle={{ backgroundColor: "red" }}
          />
        </Card.Title>
        <Card.Divider />
        <Card.Image source={require("../../../Image/logo.png")}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "bold" }}>{props.taskTitle}</Text>
          </View>

          <ContentRow
            tiles={[
              { title: "Status", value: taskStatus == 0 ? 'New' : (taskStatus == 2 ? 'Complete' : "In Progress") },
              { title: "", value: "" },
            ]}
          />

          <ContentRow
            tiles={[
              { title: Strings.startDate, value: props.taskStartDate },
              { title: Strings.endDate, value: props.taskEndDate },
            ]}
          />

          <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop: 10,
            }}
            title="Read Task Description"
            onPress={() => setModalVisible(true)}
          />
        </Card.Image>
      </Card>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //margin: 22
  },
  modalView: {
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").height - 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    bottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
