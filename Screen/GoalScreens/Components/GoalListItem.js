import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Alert } from "react-native";
import { ListItem, Badge, Avatar, Button, Icon } from 'react-native-elements'
import TaskListItem from './TaskListItem'
import { useNavigation } from '@react-navigation/native';
import Strings from '../../../Constants/Strings/en'
import Endpoints from '../../../Constants/Endpoints'
import LoadingIndicator from '../../Components/LoadingIndicator'


const GoalListItem = (props) => {
    const navigation = useNavigation();
    const [expanded, setExpanded] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    const getTasks = async () => {

        if (expanded) {
            await fetch(Endpoints.tasks + props.goalId, {

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
        }

    };

    useEffect(() => {
        getTasks();

    }, [expanded]);


    return (
        <View>
            {/* <Loader loading={loading} /> */}
            <ListItem.Accordion
                onLongPress={() => {
                    Alert.alert(
                        "Confirmation",
                        "Please choose the action to perform",
                        [
                            {
                                text: "Add Task",
                                onPress: () => {
                                    navigation.navigate("AddTask", { goal_id: props.goalId });
                                }
                            },
                            {
                                text: 'Update Goal',
                                onPress: () => { navigation.navigate("EditGoal", { goalId: props.goalId }) }
                            },
                            {
                                text: "Cancel",
                                onPress: () => null
                            }
                        ]
                    );
                }}
                containerStyle={{ borderWidth: 2, borderRadius: 10, marginBottom: 10, }}
                Key={props.goalId}
                //bottomDivider
                content={
                    <>
                        <Avatar
                            size="medium"
                            rounded
                            overlayContainerStyle={{ backgroundColor: '#778899' }}
                            icon={{ name: 'rocket', color: 'white', type: 'font-awesome' }}
                            activeOpacity={0.7}
                        />

                        <Badge
                            containerStyle={{ position: 'absolute', left: 55, top: 16 }}
                            value={props.countOfTasks}
                            status={props.countOfTasks == 0 ? 'error' : 'success'}
                        />

                        <ListItem.Content style={{ paddingLeft: 10, }}>
                            <ListItem.Title style={{ fontSize: 15, fontWeight: 'bold' }}>{props.title}</ListItem.Title>
                            <View style={styles.subtitleView}>
                                <Text style={styles.themeText}>{Strings.themeLabel}: {props.goalTheme}</Text>

                            </View>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded)
                    //tasks.length > 0 ? setExpanded(!expanded) : alert(Strings.emptyTasks);
                }}
            >
                {
                    loading
                        ?
                        <LoadingIndicator animating={loading} />
                        :
                        tasks.map((task, i) => (

                            <TaskListItem
                                key={task.task_id}
                                title={task.task_name}
                                startDate={task.task_start_date}
                                endDate={task.task_end_date}
                                itemId={task.task_id}
                                status={task.task_status}
                            />

                        ))
                }

            </ListItem.Accordion>
        </View>
    );
}

export default GoalListItem;

styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        //paddingLeft: 10,
        paddingTop: 5
    },
    themeText: {
        //paddingLeft: 10,
        color: 'grey'
    },
    dateText: {
        //paddingLeft: 10,
        color: 'grey'
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
})