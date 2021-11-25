import React, { useState, useEffect, useContext } from "react";

import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import Loader from "../Components/Loader";
import GoalTextInput from "./Components/GoalTextInput";
import GoalPicker from "./Components/GoalPicker";
import Endpoints from "../../Constants/Endpoints";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlanContext } from "../../Context/PlanContext";

import PlannerDatePicker from "../Components/PlannerDatePicker";
import PlannerButton from "../Components/PlannerButton";
// import { useNavigation } from "@react-navigation/native";

const AddGoal = ({ route, navigation }) => {
  const [goalThemeId, setGoalThemeId] = useState(0);
  const [goalTheme, setGoalTheme] = useState("");
  const [themeDetails, setthemeDetails] = useState([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [planStartDate, setPlanStartDate] = useState('');
  const [planEndDate, setPlanEndDate] = useState('');

  //const { planId } = route.params;

  const { start_date: goalStartDate, end_date: goalEndDate, updateCurrentGoalId, planId } =
    useContext(PlanContext);

  //const navigation = useNavigation();

  useEffect(() => {
    getPlan();
    getThemes();
    //console.log(planStartDate + ' => ' + planEndDate);
  },[navigation]);

  const getThemes = async () => {
    fetch(Endpoints.themes, {
      method: "get",
      // headers: {
      //     'Content-Type': 'application/json',
      //     'Authentication': `Bearer ${token}`
      // },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setthemeDetails(json.data);
        // if (json.status === 'success') {
        //     console.log(json.data);
        // }
      })
      .catch((error) => console.error(error));
  };

  const renderThemes = () => {
    return themeDetails.map((theme) => {
      return (
        <Picker.Item
          key={theme.theme_id}
          label={theme.theme_name}
          value={theme.theme_id}
        />
      );
    });
  };

    const getPlan = async () => {

      await fetch(Endpoints.get_plan + planId, {

          method: "get",
          headers: {
              'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8',
          }
      })
          .then((response) => response.json())
          .then((json) => {
              setPlanStartDate(json.data.plan_start_date);
              setPlanEndDate(json.data.plan_end_date);
              //setGoalName(json.data.goal_name);
              setLoading(false);

              //console.log(json.data.plan_start_date + ' => ' + json.data.plan_end_date);
              
          })
          .catch((error) => console.error(error))

  }

  const handleSubmitButton = () => {
    //setErrortext("");

    if (!goalTitle) {
      alert("Please fill Goal Title");
      return;
    }

    if (!goalTheme) {
      alert("Please choose a Theme");
      return;
    }

    if (!goalDescription) {
      alert("Please fill Goal Description");
      return;
    }

    if (!goalStartDate) {
      alert("Please fill Start Date");
      return;
    }

    if (!goalEndDate) {
      alert("Please fill End Date");
      return;
    }

    if (goalStartDate > goalEndDate) {
      alert("Start date cannot be greater than end date");
      return;
    }
    

    if (
        new Date(planStartDate) >= goalStartDate || new Date(planStartDate) >= goalEndDate ||
        new Date(planEndDate) <= goalStartDate || new Date(planEndDate) <= goalEndDate
    ) {
        alert("The goal should be within the plan timeframe");
        return;
    }

    Alert.alert("Confirmation", "Are you sure you want to submit this goal?", [
      {
        text: "Yes",
        onPress: async () => {
          
          const user_id = await AsyncStorage.getItem("user_id");

          //setLoading(false);
          setLoading(true);

          var dataToSend = {
            goal_name: goalTitle,
            theme_id: goalThemeId,
            goal_description: goalDescription,
            goal_start_date: goalStartDate,
            goal_end_date: goalEndDate,
            plan_id: planId,
            user_id: user_id,
            goal_last_modified_by: user_id,
            goal_created_by: user_id,
            goal_created_date: new Date().toISOString().slice(0, 10),
          };

          //console.log(dataToSend);

          var formBody = [];

          for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

          await fetch(Endpoints.add_goal, {
            method: "POST",
            body: formBody,
            headers: {
              //Header Defination
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((responseJson) => {
              //Hide Loader
              setLoading(false);

              //console.log(responseJson);
              // If server response message same as Data Matched
              if (responseJson.status === "success") {
                //setIsRegistraionSuccess(true);
                const response_goal_id = responseJson.data["goal_id"];
                // navigation.navigate("ListTasks", {
                //   goal_id: response_goal_id,
                //   isGoalAddFormInStack: true,
                // });
                // console.log(
                //     'Goal Submitted Successfully'
                // );
                updateCurrentGoalId(response_goal_id)
                navigation.navigate("ListTasks")
              } else {
                //setErrortext(responseJson.msg);
              }
            })
            .catch((error) => {
              //Hide Loader
              setLoading(false);
              console.error(error);
            });
        },
      },
      {
        text: "Cancel",
        onPress: () => {
          //console.log("Cancel Pressed");
        },
        style: "cancel",
      },
    ]);
  };

  return (

    <View style={{ flex: 1 }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <KeyboardAvoidingView enabled>
          <GoalTextInput
            onChangeText={(goalTitle) => setGoalTitle(goalTitle)}
            placeholder="Goal Title"
            numberOfLines={5}
          />

          <GoalPicker
            selectedValue={goalTheme}
            onValueChange={(itemValue, itemIndex) => {
              setGoalTheme(itemValue);
              setGoalThemeId(itemIndex);
              //console.log(itemIndex);
            }}
            pickerLabel="Please choose a theme"
            renderItems={renderThemes()}
          />

          <GoalTextInput
            onChangeText={(goalDescription) =>
              setGoalDescription(goalDescription)
            }
            placeholder="Goal Description"
            numberOfLines={5}
          />

          <PlannerDatePicker
            inputLabel="Choose Start Date"
            datePosition="start"
          />

          <PlannerDatePicker inputLabel="Choose end Date" datePosition="end" />

          <PlannerButton
            error="Error occurred"
            buttonLabel="Add a Goal"
            onClick={handleSubmitButton}
          />

          
        </KeyboardAvoidingView>
      </ScrollView>
    </View>

  );
};
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    borderColor: "#dadae8",
    //color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    // borderRadius: 30,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default AddGoal;
