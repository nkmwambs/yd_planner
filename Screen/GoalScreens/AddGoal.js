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
import getItems from '../../Functions/getItems'
// import { useNavigation } from "@react-navigation/native";

const AddGoal = ({ route, navigation }) => {
  const [goalThemeId, setGoalThemeId] = useState(0);
  const [goalTheme, setGoalTheme] = useState("");
  const [themeDetails, setthemeDetails] = useState([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [quarterNumber, setQuarterNumber] = useState(0);
  const [quarterName, setQuarterName] = useState("");

  const [planStartDate, setPlanStartDate] = useState('');
  const [planEndDate, setPlanEndDate] = useState('');

  //const [quarterStartDate, setQuarterStartDate] = useState('2021-07-01');
  //const [quarterEndDate, setQuarterEndDate] = useState('2021-09-30');

  const [quarters, setQuarters] = useState([]);

  //const { planId } = route.params;

  const {updateCurrentGoalId, planId, statisticsChanged, updateStatisticsChanged} = useContext(PlanContext);
  //const { planId } = route.params;

  //const navigation = useNavigation();

  useEffect(() => {
    getPlan();
    getThemes();
    getQuarters()
  },[navigation]);

  const getThemes = async () => {
    fetch(Endpoints.themes, {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setthemeDetails(json.data);
      })
      .catch((error) => console.error(error));
  };

  const getQuarters = async () => {
    fetch(Endpoints.get_quarters, {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setQuarters(json.data);
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
        const url = Endpoints.get_plan + "?plan_id=" +  planId
        //console.log(url)
        await getItems(url).then((data) => {
            setPlanStartDate(data.plan_start_date);
            setPlanEndDate(data.plan_end_date);
            //console.log(data.plan_start_date + " " + data.plan_end_date)
            setLoading(false);
        })

      // await fetch(Endpoints.get_plan + "?plan_id=" +  planId, {

      //     method: "get",
      //     headers: {
      //         'Content-Type':
      //             'application/x-www-form-urlencoded;charset=UTF-8',
      //     }
      // })
      //     .then((response) => response.json())
      //     .then((json) => {
      //         console.log(json.data.plan_start_date)
      //         console.log(json.data.plan_end_date)
      //         setPlanStartDate(json.data.plan_start_date);
      //         setPlanEndDate(json.data.plan_end_date);
      //         //setGoalName(json.data.goal_name);
      //         setLoading(false);

      //         //console.log(json.data.plan_start_date + ' => ' + json.data.plan_end_date);
              
      //     })
      //     .catch((error) => console.error(error))

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

    if (quarterNumber == 0) {
      alert("Please fill Goal Period");
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
            //goal_start_date: goalStartDate,
            //goal_end_date: goalEndDate,
            goal_period: quarterNumber,
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
                const goalCount = responseJson.data["goal_count"];
                // navigation.navigate("ListTasks", {
                //   goal_id: response_goal_id,
                //   isGoalAddFormInStack: true,
                // });
                // console.log(
                //     'Goal Submitted Successfully'
                // );
                statisticsChanged ? updateStatisticsChanged(false) :  updateStatisticsChanged(true);
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

  // const Quarters = [
  //   {quarter_number: 1, quarter_name: 'First Quarter'},
  //   {quarter_number: 2, quarter_name: 'Second Quarter'},
  //   {quarter_number: 3, quarter_name: 'Third Quarter'},
  //   {quarter_number: 4, quarter_name: 'Fourth Quarter'}
  // ];



  const renderQuarters = () => {
    return quarters.map((quarter) => {
      return (
        <Picker.Item
          key={quarter.quarter_number}
          label={quarter.quarter_name}
          value={quarter.quarter_number}
        />
      );
    });
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

          {/* <PlannerDatePicker
            inputLabel="Choose Start Date"
            datePosition="start"
          />

          <PlannerDatePicker inputLabel="Choose end Date" datePosition="end" /> */}

          <GoalPicker
            selectedValue={quarterName}
            onValueChange={(itemValue, itemIndex) => {
              setQuarterName(itemValue);
              setQuarterNumber(itemIndex);
              //changeStartDate(quarterStartDate)
              //changeEndDate(quarterEndDate)
            }}
            pickerLabel="Please choose a period"
            renderItems={renderQuarters()}
          />

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
