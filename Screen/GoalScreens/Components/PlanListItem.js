import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import Colors from '../../../Constants/Colors';
import ContentRow from './ContentRow';


const PlanListItem = ({ plan }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ViewPlan",{planId:plan.plan_id})}
        >
            <ListItem
                key={plan.plan_id}
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
                        {plan.plan_name}
                    </ListItem.Title>

                    {/* <View style={{ paddingTop: 5 }}> */}
                    <ContentRow tiles={[
                        { title: 'Start Date', value: plan.plan_start_date },
                        { title: 'End Date', value: plan.plan_end_date }
                    ]} />

                    <ContentRow tiles={[
                        { title: 'Status', value: plan.plan_status == 1 ? "Active" : "Closed" },
                        { title: 'Created On', value: plan.plan_created_date }
                    ]} />
                    {/* </View> */}
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

export default PlanListItem;