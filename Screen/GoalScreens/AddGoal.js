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
import PlannerButton from "../Components/PlannerButton";
import getItems from '../../Functions/getItems'
import postItem from '../../Functions/postItem'
//import { useNavigation } from "@react-navigation/native";

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

  const [quarters, setQuarters] = useState([]);

  const {updateCurrentGoalId, planId, statisticsChanged, updateStatisticsChanged} = useContext(PlanContext);
  const { goalId } = route.params;
  const [editModeOn, setEditModeOn] = useState(false)

  //const nav = useNavigation();

  const updateNavigationStackTitle = () => {
    if(goalId > 0){
      navigation.setOptions({ title: 'Edit a Goal' })
    }
  }

  useEffect(() => {
    
    getPlan()
    getThemes()
    getQuarters()
    toggleEditMode()
    updateNavigationStackTitle()
    getGoal()
  },[navigation]);


  const toggleEditMode = ()=>{
    goalId > 0 ? setEditModeOn(true) : setEditModeOn(false)
  }

  const getGoal = async () => {
    if( goalId > 0){
      const url = Endpoints.get_goal + "?goal_id=" + goalId;
    
      await getItems(url).then((data) => {
          const goal = data[0]

          setGoalTitle(goal.goal_name)
          setGoalDescription(goal.goal_description)
          setGoalTheme(goal.theme_name)
          setGoalThemeId(goal.theme_id)
          setQuarterNumber(goal.goal_period)
          //console.log(goal.goal_period)
          
      })
    }
  }

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
        //console.log(goalId)
        //console.log(JSON.stringify(route))
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

        await getItems(url).then((data) => {
            setPlanStartDate(data.plan_start_date);
            setPlanEndDate(data.plan_end_date);
            setLoading(false);
        })
  }

  const onUpdateYesPress = async() => {
    const url = Endpoints.edit_goal + "?goal_id=" + goalId
    const user_id = await AsyncStorage.getItem("user_id")
    const dataToSend = {
        goal_name: goalTitle,
        theme_id: goalThemeId,
        goal_description: goalDescription,
        goal_period: quarterNumber,
        plan_id: planId,
        user_id: user_id,
        goal_last_modified_by: user_id,
        //goal_created_by: user_id,
        //goal_created_date: new Date().toISOString().slice(0, 10),
    }

    await postItem(url,dataToSend)
      .then((data) => {

        const response_goal_id = data["goal_id"];
        statisticsChanged ? updateStatisticsChanged(false) :  updateStatisticsChanged(true);
        updateCurrentGoalId(response_goal_id)
        navigation.navigate("ListGoals")

      })
  }

  const onUpdateCancelPress = () => {
    //console.log("Not updated")
    alert("Request aborted")
  }
  
  const handleEditButton = () => {
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

    const confirmation_message = "Are you sure you want to update this goal?"

    setLoading(true);
    
    Alert.alert("Confirmation", confirmation_message, [
      {
        text: "Yes",
        onPress: onUpdateYesPress
      },
      {
        text: "Cancel",
        onPress: onUpdateCancelPress,
        style: "cancel",
      },
    ])
    
    setLoading(false);
  }

  // const formValidation = () => {
    
  // }

  const onSubmitYesPress = async () => {

    const url = Endpoints.add_goal
    const user_id = await AsyncStorage.getItem("user_id")
    const dataToSend = {
        goal_name: goalTitle,
        theme_id: goalThemeId,
        goal_description: goalDescription,
        goal_period: quarterNumber,
        plan_id: planId,
        user_id: user_id,
        goal_last_modified_by: user_id,
        goal_created_by: user_id,
        goal_created_date: new Date().toISOString().slice(0, 10),
    }

    await postItem(url,dataToSend)
      .then((data) => {

        const response_goal_id = data["goal_id"];
        statisticsChanged ? updateStatisticsChanged(false) :  updateStatisticsChanged(true);
        updateCurrentGoalId(response_goal_id)
        navigation.navigate("ListTasks")

      })
  }

  const onSubmitCancelPress = () => {
    alert("Request aborted");
  }

  const handleSubmitButton = async ()  => {

      // formValidation()

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

      const confirmation_message = "Are you sure you want to submit this goal?"

      setLoading(true)

      Alert.alert("Confirmation", confirmation_message, [
        {
          text: "Yes",
          onPress: onSubmitYesPress
        },
        {
          text: "Cancel",
          onPress: onSubmitCancelPress,
          style: "cancel",
        },
      ])

      setLoading(false)
      
  }

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
      {/* {console.log("=>" + quarterNumber)} */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <KeyboardAvoidingView enabled>
          <GoalTextInput
            value={editModeOn ? goalTitle: null}
            onChangeText={(goalTitle) => setGoalTitle(goalTitle)}
            placeholder="Goal Title"
            numberOfLines={5}
          />

          <GoalPicker
            selectedValue={editModeOn ? goalThemeId: goalTheme}
            onValueChange={(itemValue, itemIndex) => {
              setGoalTheme(itemValue);
              setGoalThemeId(itemIndex);
              
            }}
            pickerLabel="Please choose a theme"
            renderItems={renderThemes()}
          />

          <GoalTextInput
            value={editModeOn ? goalDescription: null}
            onChangeText={(goalDescription) =>
              setGoalDescription(goalDescription)
            }
            placeholder="Goal Description"
            numberOfLines={5}
          />

          <GoalPicker
      
            selectedValue={editModeOn ? parseInt(quarterNumber) : quarterName} 
            onValueChange={(itemValue, itemIndex) => {
              setQuarterName(itemValue);
              setQuarterNumber(itemIndex);
            }}
            pickerLabel="Please choose a period"
            renderItems={renderQuarters()}
          />

          <PlannerButton
            error="Error occurred"
            buttonLabel={editModeOn ? "Edit Goal": "Add a Goal"}//"Add a Goal"
            onClick={editModeOn ? handleEditButton : handleSubmitButton}
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
