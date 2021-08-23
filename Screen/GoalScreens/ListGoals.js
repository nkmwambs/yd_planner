import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import GoalListItem from './Components/GoalListItem';
import FloatActionButton from '../Components/FloatActionButton';
import Loader from '../Components/Loader';
import Endpoints from '../../Constants/Endpoints'


const ListGoals = ({ route, navigation }) => {

    const [goalDetails, setgoalDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const { planId } = route.params;


    useEffect(() => {

        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            getGoals();
        });

        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };

    }, [navigation]);


    const getGoals = async () => {
        //const user_id = await AsyncStorage.getItem('user_id');

        await fetch(Endpoints.goals + planId, {

            method: "get",
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setgoalDetails(json.data);
                // if (json.status === 'success') {
                //     console.log(json.data);
                // }
                setLoading(false);
            })
            .catch((error) => console.error(error))

    };

    renderItem = ({ item }) => (
        // <Pressable onPress={() => { navigation.navigate("ListTasks", { goal_id: item.goal_id, isGoalAddFormInStack: false }) }}>
        <GoalListItem
            //Key={item.goal_id}
            title={item.goal_name}
            startDate={item.goal_start_date}
            endDate={item.goal_end_date}
            goalTheme={item.theme_name}
            countOfTasks={item.count_of_tasks}
            //onPressEvent={() => { navigation.navigate("ListTasks", { goal_id: item.goal_id }) }}
            goalId={item.goal_id}
        />
        // </Pressable>
    )

    if (loading) {
        return <Loader loading={loading} />
    } else if (goalDetails.length == 0) {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', paddingTop: 50 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>You have no Goals Created</Text>
                </View>
                <FloatActionButton clickHandler={() => {
                    navigation.navigate("AddGoal", { planId: planId });
                }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ elevation: 1 }}
                //keyExtractor={keyExtractor}
                keyExtractor={(item) => item.goal_id}
                data={goalDetails}
                renderItem={renderItem}
            />

            <FloatActionButton clickHandler={() => {
                navigation.navigate("AddGoal", { planId: planId });
            }} />
        </View>
    );
};

export default ListGoals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10,
    },
})
