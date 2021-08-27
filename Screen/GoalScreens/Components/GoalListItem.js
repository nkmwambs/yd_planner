import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import Colors from '../../../Constants/Colors';
import ContentRow from './ContentRow';


const GoalListItem = ({ goal, planId }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ViewGoal",{goalId:goal.goal_id, planId: planId})}
        >
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
            >

                <ListItem.Content>
                    <ListItem.Title>
                        {goal.goal_name}
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
        </TouchableOpacity>
    )
}

export default GoalListItem;