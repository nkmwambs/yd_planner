import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Alert, View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import Colors from '../../../Constants/Colors';
import { PlanContext } from '../../../Context/PlanContext';
import ContentRow from './ContentRow';


const GoalListItem = ({ goal }) => {

    const navigation = useNavigation()
    const {updateCurrentGoalId} = useContext(PlanContext)

    return (
            <ListItem
                key={goal.goal_id}
                bottomDivider
                containerStyle={
                    {
                        margin: 5,
                        borderRadius: 10,
                        elevation: 5,
                        borderColor: Colors.mainBackgroundColor,
                        borderWidth: 2,
                    }
                }
                onPress={() => {
                    updateCurrentGoalId(goal.goal_id)
                    navigation.navigate("ViewGoal")
                }}
                onLongPress={() => {
                    Alert.alert(
                        "Confirmation",
                        "Please choose the action to perform",
                        [
                            {
                                text: "Add Task",
                                onPress: () => {
                                    updateCurrentGoalId(goal.goal_id)
                                    navigation.navigate("AddTask")
                                    //navigation.navigate("AddTask", { goal_id: props.goalId });
                                }
                            },
                            {
                                text: 'Edit Goal',
                                onPress: () => { 
                                    alert("Feature under construction")
                                    //navigation.navigate("EditGoal", { goalId: props.goalId }) 
                                }
                            },
                            {
                                text: "Cancel",
                                onPress: () => null
                            }
                        ]
                    );
                }}
            >

                <ListItem.Content>
                    <ListItem.Title>
                        <View 
                        style={{
                            borderBottomColor:'black',
                            borderBottomWidth:1, 
                            borderStyle:'solid',
                            width:'100%',
                            }}>
                            <Text>{goal.goal_name}</Text>
                            </View>
                    </ListItem.Title>

                    {/* <View style={{ paddingTop: 5 }}> */}
                    <ContentRow tiles={[
                        { title: 'Start Date', value: goal.goal_start_date },
                        { title: 'End Date', value: goal.goal_end_date }
                    ]} />

                    <ContentRow tiles={[
                        { title: 'Status', value: "New" },
                        { title: 'Created On', value: goal.goal_created_date }
                    ]} />
                    {/* </View> */}
                </ListItem.Content>
            </ListItem>

    )
}

export default GoalListItem;