import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text
} from "react-native";

import Colors from '../../../Constants/Colors'
import Endpoints from '../../../Constants/Endpoints'
import Strings from '../../../Constants/Strings/en'
import LoadingIndicator from '../../Components/LoadingIndicator'
import TaskCard from './TaskCard'

import { useNavigation } from '@react-navigation/native'


const UpdateTaskHeader = (props) => {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskState, setTaskState] = useState(0);
    const [taskType, setTaskType] = useState('')
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const getTask = async () => {

        await fetch(Endpoints.task + props.taskId, {

            method: "get",
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setTaskTitle(json.data.task_name);
                setTaskDescription(json.data.task_description);
                setTaskState(json.data.task_status);
                setTaskType(json.data.task_type_name);
                setTaskStartDate(json.data.task_start_date);
                setTaskEndDate(json.data.task_end_date);

                //console.log(json.data);

                setLoading(false);
            })
            .catch((error) => console.error(error))

    };

    useEffect(() => {
        getTask();
    }, [navigation])


    return (
        <View style={{ marginTop: -10 }}>
            {
                loading
                    ?
                    <LoadingIndicator animating={loading} />
                    :
                    <TaskCard
                        taskTitle={taskTitle}
                        taskDescription={taskDescription}
                        taskState={taskState}
                        taskType={taskType}
                        taskStartDate={taskStartDate}
                        taskEndDate={taskEndDate}
                        taskId={props.taskId}
                    />
            }
        </View>
    )
}

export default UpdateTaskHeader;
