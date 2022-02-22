import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView} from 'react-native'
// import Upcoming from '../Components/Upcoming'
import { Picker } from "@react-native-picker/picker";
import getItems from "../../Functions/getItems"
import Endpoints from "../../Constants/Endpoints"
import Loader from "../Components/Loader"
import PlannerButton from "../Components/PlannerButton"
import GoalTextInput from "./Components/GoalTextInput"
import GoalPicker from "./Components/GoalPicker";

const EditGoal = ({route,navigation}) => {

    const [loading, setLoading] = useState(true)

    const [goalName, setGoalName] = useState(null)
    const [goalDesc, setGoalDesc] = useState(null)

    const [goalTheme, setGoalTheme] = useState(null)
    const [themeDetails, setthemeDetails] = useState([])
    const [goalThemeId, setGoalThemeId] = useState(0)

    const [quarterNumber, setQuarterNumber] = useState(0)
    const [quarterName, setQuarterName] = useState(null)
    const [quarters, setQuarters] = useState([])

    const goalId = route.params.goalId


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

    const getGoal = async () => {
    
        const viewGoal = Endpoints.get_goal + "?goal_id=" + goalId;
        console.log(viewGoal)
        await getItems(viewGoal).then((data) => {
            const goal = data[0]

            setGoalName(goal.goal_name)
            setGoalDesc(goal.goal_description)
            setGoalTheme(goal.theme_name)
            setGoalThemeId(goal.theme_id)
            setQuarterNumber(goal.goal_period)
            //console.log(goal.goal_period)
            setLoading(false)

            //console.log(data)
        });
      };


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


    useEffect(() => {
        getGoal()
        getThemes()
        getQuarters()
    },[navigation]);

    const renderThemes = () => {
        return themeDetails.map((theme) => {
          return (
            <Picker.Item
              key={theme.theme_id}
              label={theme.theme_name}
              value={theme.theme_id}
            />
          )
        })
      }


      const renderQuarters = () => {
        return quarters.map((quarter) => {
          return (
            <Picker.Item
              key={quarter.quarter_number}
              label={quarter.quarter_name}
              value={quarter.quarter_number}
            />
          )
        })
      }

    handleSubmitButton = ()=>{

    }
      
    return (
        <KeyboardAvoidingView enabled>
            {
                 loading ? <Loader loading={loading} />:
                 <>

                    <GoalTextInput
                        onChangeText={(goalName) => setGoalName(goalName)}
                        placeholder="Goal Title"
                        value={goalName}
                        numberOfLines={5}
                    />

                    <GoalTextInput
                        onChangeText={(goalDesc) => setGoalDesc(goalDesc)}
                        placeholder="Goal Title"
                        value={goalDesc}
                        numberOfLines={5}
                    />

                    <GoalPicker
                        selectedValue={goalThemeId}
                        onValueChange={(itemValue, itemIndex) => {
                            setGoalTheme(itemValue);
                            setGoalThemeId(itemIndex);
                        }}
                        pickerLabel="Please choose a theme"
                        renderItems={renderThemes()}
                    />

                    <GoalPicker
                        selectedValue={quarterNumber}
                        onValueChange={(itemValue, itemIndex) => {
                            setQuarterName(itemValue);
                            setQuarterNumber(itemIndex);
                        }}
                        pickerLabel="Please choose a period"
                        renderItems={renderQuarters()}
                    />

                    <PlannerButton
                        error="Error occurred"
                        buttonLabel="Save"
                        onClick={handleSubmitButton}
                    />

                 </>
            }
            
        </KeyboardAvoidingView>        
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default EditGoal;