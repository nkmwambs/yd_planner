import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Text, BackHandler, Alert } from "react-native";

import Strings from '../../Constants/Strings/en'

import TaskListItem from './Components/TaskListItem';
import FloatActionButton from '../Components/FloatActionButton';
import Loader from '../Components/Loader';
import TaskHeader from './Components/TaskHeader';
import Endpoints from '../../Constants/Endpoints'


const ListTasks = ({ route, navigation }) => {

    const { goal_id, isGoalAddFormInStack } = route.params;

    const [tasks, setTasks] = useState([]);
    const [goalStartDate, setGoalStartDate] = useState('');
    const [goalEndDate, setGoalEndDate] = useState('');
    const [goalName, setGoalName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        //console.log(isGoalAddFormInStack);

        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            getTasks();
        });

        // BackAction prevents back action to add goals form
        const backAction = () => {
            navigation.navigate("ListGoals");
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove();
            // Unsubscribe for the focus Listener
            unsubscribe;
        };

    }, [navigation]);

    useEffect(() => {
        getGoal();
    })

    const getGoal = async () => {

        await fetch(Endpoints.goal + goal_id, {

            method: "get",
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setGoalStartDate(json.data.goal_start_date);
                setGoalEndDate(json.data.goal_end_date);
                setGoalName(json.data.goal_name);
                setLoading(false);
            })
            .catch((error) => console.error(error))

    };

    const getTasks = async () => {

        await fetch(Endpoints.tasks + goal_id, {

            method: "get",
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setTasks(json.data);
                setLoading(false);
            })
            .catch((error) => console.error(error))

    };

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate("ViewTask", { task_id: item.task_id }) }}>
            <TaskListItem
                title={item.task_name}
                startDate={item.task_start_date}
                endDate={item.task_end_date}
                itemId={item.task_id}
                status={item.task_status}
            />
        </TouchableOpacity>

    )

    if (loading) {
        return <Loader loading={loading} />
    } else if (tasks.length == 0) {
        return (
            <>
                <TaskHeader
                    goalId={goal_id}
                    goalStartDate={goalStartDate}
                    goalEndDate={goalEndDate}
                    goalName={goalName}
                />

                <View style={styles.container}>
                    <View style={{ alignItems: 'center', paddingTop: 50 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{Strings.emptyTasks}</Text>
                    </View>
                    <FloatActionButton clickHandler={() => {
                        navigation.navigate("AddTask", { goal_id: goal_id });
                    }} />
                </View>
            </>
        )
    }

    return (
        <View style={styles.container}>

            <TaskHeader
                goalId={goal_id}
                goalStartDate={goalStartDate}
                goalEndDate={goalEndDate}
                goalName={goalName}
            />

            <FlatList
                keyExtractor={keyExtractor}
                data={tasks}
                renderItem={renderItem}
            />

            <FloatActionButton clickHandler={() => {
                navigation.navigate("AddTask", { goal_id: goal_id });
            }} />
        </View>
    );
}

export default ListTasks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
    },
})
