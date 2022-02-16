import React, { useState, useEffect, useContext } from 'react'
import { 
    View, 
    FlatList, 
    StyleSheet, 
    Text, 
    BackHandler, 
    Alert } from "react-native";

import Strings from '../../Constants/Strings/en'

import TaskListItem from './Components/TaskListItem';
import FloatActionButton from '../Components/FloatActionButton';
import Loader from '../Components/Loader';
import TaskHeader from './Components/TaskHeader';
import Endpoints from '../../Constants/Endpoints'
import { PlanContext } from '../../Context/PlanContext';
import getItems from '../../Functions/getItems'


const ListTasks = ({ route, navigation }) => {

    //const { goalId:goal_id, planId } = route.params;

    //console.log(planId)

    const {planId, goalId, taskId,  updateCurrentTaskId} = useContext(PlanContext)
    //const {goalId} = useContext(PlanContext)

    const [tasks, setTasks] = useState([]);
    const [goalStartDate, setGoalStartDate] = useState('');
    const [goalEndDate, setGoalEndDate] = useState('');
    const [goalName, setGoalName] = useState('');
    const [loading, setLoading] = useState(true);

     // BackAction prevents back action to add goals form
     const backAction = () => {
        navigation.navigate("ListGoals");
    };


    useEffect(() => {

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();

    });

    useEffect(() => {
        getGoal();
        getTasks();
        //settaskCount(1)
    },[navigation,taskId])

    const getGoal = async () => {
        
        const url = Endpoints.goal + "?goal_id=" + goalId
        //console.log(url)
        await getItems(url).then((data) => {
            //console.log(data[0])
            setGoalStartDate(data[0].goal_start_date)
            setGoalEndDate(data[0].goal_end_date)
            setGoalName(data[0].goal_name)
            setLoading(false)
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

    };

    const getTasks = async () => {

        const url = Endpoints.tasks + "?goal_id=" + goalId
        //console.log(url)
        await getItems(url).then((data) => {
            //console.log(data)
            setTasks(data);
            setLoading(false);
        })

        // await fetch(Endpoints.tasks + "?goal_id=" + goalId, {

        //     method: "get",
        //     headers: {
        //         'Content-Type':
        //             'application/x-www-form-urlencoded;charset=UTF-8',
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((json) => {
        //         setTasks(json.data);
        //         setLoading(false);
        //         //console.log(json.data);
        //     })
        //     .catch((error) => console.error(error))

    };

    renderItem = ({ item }) => (
        // <TouchableOpacity onPress={() => { 
                        
        //     navigation.navigate("ViewTask") 
        // }}>
            <TaskListItem
                title={item.task_name}
                startDate={item.task_start_date}
                endDate={item.task_end_date}
                itemId={item.task_id}
                status={item.task_status}
            />
        // </TouchableOpacity>

    )

    if (loading) {
        return <Loader loading={loading} />
    } else if (tasks.length == 0) {
        return (
            <>
                <TaskHeader
                    goalId={goalId}
                    goalStartDate={goalStartDate}
                    goalEndDate={goalEndDate}
                    goalName={goalName}
                />

                <View style={styles.container}>
                    <View style={{ alignItems: 'center', paddingTop: 50 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{Strings.emptyTasks}</Text>
                    </View>
                    <FloatActionButton clickHandler={() => {
                        navigation.navigate("AddTask");
                    }} />
                </View>
            </>
        )
    }

    return (
        <View style={styles.container}>

            <TaskHeader
                goalId={goalId}
                goalStartDate={goalStartDate}
                goalEndDate={goalEndDate}
                goalName={goalName}
            />

            <FlatList
                keyExtractor={(item) => item.task_id}
                data={tasks}
                renderItem={renderItem}
            />

            <FloatActionButton clickHandler={() => {
                navigation.navigate("AddTask");
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
