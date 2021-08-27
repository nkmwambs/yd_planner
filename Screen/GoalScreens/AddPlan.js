import React, { useContext, useState } from 'react'
import { 
    View, 
    Alert,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import Loader from '../Components/Loader'
import GoalTextInput from './Components/GoalTextInput'
import PlannerDatePicker from '../Components/PlannerDatePicker'
import PlannerButton from '../Components/PlannerButton'
import { GlobalContext } from '../../Context/GlobalContext'
import { PlanContext } from '../../Context/PlanContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoints from '../../Constants/Endpoints'
import { useNavigation } from '@react-navigation/native';

// const AddPlan = () => {

//     return (
//         <PlanProvider>
//             <NewPlan />
//         </PlanProvider>
//     )
// }

const AddPlan = () => {

    const [loading, setLoading] = useState(false)
    const [planTitle, setPlanTitle] = useState('')

    const {theme} = useContext(GlobalContext)
    const {start_date, end_date} = useContext(PlanContext)

    const navigation = useNavigation();

    const onSubmitHandler = () => {
        alert(start_date);
        
        if (!planTitle) {
            alert('Please fill Plan Title');
            return;
        }

        if (!start_date) {
            alert("Please fill Start Date");
            return;
        }

        if (!end_date) {
            alert("Please fill End Date");
            return;
        }

        Alert.alert(
            "Confirmation",
            "Are you sure you want to submit this plan?", [
            {
                text: "Yes",
                onPress: async () => {
                    //console.log("OK Pressed");

                    const user_id = await AsyncStorage.getItem('user_id');

                    //setLoading(false);
                    setLoading(true);

                    var dataToSend = {
                        plan_name: planTitle,
                        plan_start_date: start_date,
                        plan_end_date: end_date,
                        user_id: user_id,
                    };

                    //console.log(dataToSend);

                    var formBody = [];

                    for (var key in dataToSend) {
                        var encodedKey = encodeURIComponent(key);
                        var encodedValue = encodeURIComponent(dataToSend[key]);
                        formBody.push(encodedKey + '=' + encodedValue);
                    }
                    formBody = formBody.join('&');

                    await fetch(Endpoints.add_plan, {
                        method: 'POST',
                        body: formBody,
                        headers: {
                            //Header Defination
                            'Content-Type':
                                'application/x-www-form-urlencoded;charset=UTF-8',
                        },
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            //Hide Loader
                            setLoading(false);

                            // If server response message same as Data Matched
                            if (responseJson.status === 'success') {
                                //setIsRegistraionSuccess(true);
                                const response_plan_id = responseJson.data["plan_id"];
                                navigation.navigate("ListGoals", { plan_id: response_plan_id })
                                // console.log(
                                //     'Goal Submitted Successfully'
                                // );
                            } else {
                                setErrortext(responseJson.msg);
                            }
                        })
                        .catch((error) => {
                            //Hide Loader
                            setLoading(false);
                            console.error(error);
                        });

                }
            },
            {
                text: "Cancel",
                onPress: () => {
                    //console.log("Cancel Pressed");
                },
                style: "cancel"
            }

        ]);
    }

    return (
        <View style={{ flex: 1, backgroundColor:theme.crudContentBackgroundColor }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <GoalTextInput
                            onChangeText={(planTitle) => setPlanTitle(planTitle)}
                            placeholder="Plan Title"
                            numberOfLines={5}
                    />

            
                    <PlannerDatePicker
                        //onChange={onChangePlanStartDate} 
                        inputLabel="Choose Start Date"
                        datePosition="start"
                    />

                
                    <PlannerDatePicker 
                        inputLabel="Choose end Date"
                        //onChange={onChangePlanEndDate}
                        datePosition="end"
                    />

                    <PlannerButton 
                        error="Error occurred"
                        buttonLabel = "Add a Plan"
                        onClick = {onSubmitHandler}
                    />

                </KeyboardAvoidingView>
                </ScrollView>
            
        </View>
    )
}

export default AddPlan;