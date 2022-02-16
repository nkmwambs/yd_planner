import React, { useState, useEffect, useContext } from 'react';

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Alert, Platform
} from 'react-native';

import Loader from '../Components/Loader';
import GoalTextInput from './Components/GoalTextInput'
import TaskHeader from './Components/TaskHeader'
import Strings from '../../Constants/Strings/en'
import GoalPicker from './Components/GoalPicker'
import { Picker } from '@react-native-picker/picker';
import Endpoints from '../../Constants/Endpoints';
import DateTimePickerInput from '../Components/DateTimePickerInput'
import getItems from '../../Functions/getItems'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlanContext } from '../../Context/PlanContext';



const AddTask = ({ route, navigation }) => {
    // const { goal_id, planId } = route.params;

    const {planId, goalId, updateCurrentTaskId, statisticsChanged, updateStatisticsChanged} = useContext(PlanContext)

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStartDate, setTaskStartDate] = useState(new Date());
    const [taskEndDate, setTaskEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [goalStartDate, setGoalStartDate] = useState('');
    const [goalEndDate, setGoalEndDate] = useState('');
    const [goalName, setGoalName] = useState('');

    const [taskTypeId, setTaskTypeId] = useState(0);
    const [taskType, setTaskType] = useState("");
    const [taskTypeDetails, setTaskTypeDetails] = useState([]);

    const [errortext, setErrortext] = useState('');

    const [startDateMode, setStartDateMode] = useState('date');
    const [startDateShow, setStartDateShow] = useState(false);

    const [endDateMode, setEndDateMode] = useState('date');
    const [endDateShow, setEndDateShow] = useState(false);

    const onChangeTaskStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || taskStartDate;
        setStartDateShow(Platform.OS === 'ios');
        setTaskStartDate(currentDate);
    };

    const onChangeTaskEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || taskEndDate;
        setEndDateShow(Platform.OS === 'ios');
        setTaskEndDate(currentDate);
    };

    const showStartDateMode = (currentMode) => {
        setStartDateShow(true);
        setStartDateMode(currentMode);
    };

    const showEndDateMode = (currentMode) => {
        setEndDateShow(true);
        setEndDateMode(currentMode);
    };

    const mySQLformatDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}`;
    };

    const getGoal = async () => {

        const url = Endpoints.goal + "?goal_id=" + goalId
        //console.log(url)
        await getItems(url).then((data) => {
            //console.log(data[0])
            setGoalStartDate(data[0].goal_start_date);
            setGoalEndDate(data[0].goal_end_date);
            setGoalName(data[0].goal_name);
            setLoading(false);
        })

        // await fetch(Endpoints.goal + "?goal_id=" + goalId, {

        //     method: "get",
        //     headers: {
        //         'Content-Type':
        //             'application/x-www-form-urlencoded;charset=UTF-8',
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((json) => {
        //         setGoalStartDate(json.data.goal_start_date);
        //         setGoalEndDate(json.data.goal_end_date);
        //         setGoalName(json.data.goal_name);
        //         setLoading(false);
        //     })
        //     .catch((error) => console.error(error))

    }


    const getTaskTypes = async () => {

        const url = Endpoints.task_types
        //console.log(url)
        await getItems(url).then((data) => {
            //console.log(data)
            setTaskTypeDetails(data);
        })

        // fetch(Endpoints.task_types, {

        //     method: "get",
        //     headers: {
        //         'Content-Type':
        //             'application/x-www-form-urlencoded;charset=UTF-8',
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((json) => {
        //         setTaskTypeDetails(json.data);

        //     })
        //     .catch((error) => console.error(error))

    }


    useEffect(() => {
        getGoal();
        getTaskTypes();
    }, [navigation])


    const handleSubmitButton = () => {

        setErrortext('');

        if (!taskTitle) {
            alert(Strings.titleErrorMessage);
            return;
        }

        if (!taskDescription) {
            alert(Strings.descriptionErrorMessage);
            return;
        }

        if (!taskType) {
            alert(Strings.taskTypeErrorMessage);
            return;
        }

        if (!taskStartDate) {
            alert(Strings.startDateErrorMessage);
            return;
        }

        if (!taskEndDate) {
            alert(Strings.endDateErrorMessage);
            return;
        }

        if (taskStartDate > taskEndDate) {
            alert("Start date cannot be greater than end date");
            return;
        }

        if (
            new Date(goalStartDate) >= taskStartDate || new Date(goalStartDate) >= taskEndDate ||
            new Date(goalEndDate) <= taskStartDate || new Date(goalEndDate) <= taskEndDate
        ) {
            alert("The task should be within the goal timeframe");
            return;
        }


        Alert.alert(
            Strings.confirmationAlertTitle,
            Strings.confirmationAlertSubmitMessage, [
            {
                text: Strings.agreeLabel,
                onPress: async () => {
                    //console.log("OK Pressed");

                    const user_id = await AsyncStorage.getItem('user_id');
                    //console.log(user_id);
                    //setLoading(false);
                    setLoading(true);

                    var dataToSend = {
                        task_title: taskTitle,
                        task_description: taskDescription,
                        task_start_date: mySQLformatDate(taskStartDate),
                        task_end_date: mySQLformatDate(taskEndDate),
                        goal_id: goalId,
                        task_type_id: taskTypeId,
                        user_id: user_id,
                        task_status: 0,
                        task_last_modified_by: user_id,
                        task_created_by: user_id,
                        task_created_date: new Date().toISOString().slice(0, 10),
                    };
                    //console.log("Hello")
                    //console.log(dataToSend);

                    var formBody = [];

                    for (var key in dataToSend) {
                        var encodedKey = encodeURIComponent(key);
                        var encodedValue = encodeURIComponent(dataToSend[key]);
                        formBody.push(encodedKey + '=' + encodedValue);
                    }
                    
                    formBody = formBody.join('&');
                    
                    const url = Endpoints.add_task
                    //console.log(url)
                    await fetch(url, {
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
                            const response_task_id = responseJson.data["task_id"];
                            updateCurrentTaskId(response_task_id)
                            statisticsChanged ? updateStatisticsChanged(false) :  updateStatisticsChanged(true);
                            //console.log(responseJson);
                            // If server response message same as Data Matched
                            //if (responseJson.status === 'success') {
                            //setIsRegistraionSuccess(true);
                            navigation.navigate("ListTasks")
                            // console.log(
                            //     'Task Submitted Successfully'
                            // );
                            //} else {
                            setErrortext(responseJson.msg);
                            //}
                        })
                        .catch((error) => {
                            //Hide Loader
                            setLoading(false);
                            console.error(error);
                        });

                }
            },
            {
                text: Strings.canceLabel,
                onPress: () => {
                    //console.log("Cancel Pressed");
                },
                style: "cancel"
            }

        ]);
    }

    const renderTaskType = () => {
        return taskTypeDetails.map((taskType) => {
            return <Picker.Item key={taskType.task_type_id} label={taskType.task_type_name} value={taskType.task_type_id} />
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <KeyboardAvoidingView enabled>
                    <TaskHeader
                        goalId={goalId}
                        goalStartDate={goalStartDate}
                        goalEndDate={goalEndDate}
                        goalName={goalName}
                    />

                    <GoalTextInput
                        onChangeText={(taskTitle) => setTaskTitle(taskTitle)}
                        placeholder={Strings.taskTitle}
                        numberOfLines={5}
                    />


                    <GoalTextInput
                        onChangeText={(taskDescription) => setTaskDescription(taskDescription)}
                        placeholder={Strings.taskDescription}
                        numberOfLines={5}
                    />

                    <GoalPicker
                        selectedValue={taskType}
                        onValueChange={(itemValue, itemIndex) => {
                            setTaskType(itemValue);
                            setTaskTypeId(itemIndex);
                            //console.log(itemIndex);
                        }}
                        pickerLabel='Please choose a task type'
                        renderItems={renderTaskType()}
                    />


                    <DateTimePickerInput
                        onChange={onChangeTaskStartDate}
                        date={taskStartDate}
                        mode={startDateMode}
                        showMode={showStartDateMode}
                        show={startDateShow}
                    />

                    <DateTimePickerInput
                        onChange={onChangeTaskEndDate}
                        date={taskEndDate}
                        mode={endDateMode}
                        showMode={showEndDateMode}
                        show={endDateShow}
                    />

                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}
                    >
                        <Text style={styles.buttonTextStyle}>{Strings.addTask}</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    )
}

export default AddTask;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        borderColor: '#dadae8',
        //color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        // borderRadius: 30,

    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },

});

