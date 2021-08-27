import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Alert, View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import Colors from '../../../Constants/Colors';
import { PlanContext } from '../../../Context/PlanContext';
import ContentRow from './ContentRow';


const PlanListItem = ({ plan }) => {

    const navigation = useNavigation()
    const {updateCurrentPlanId} = useContext(PlanContext)

    return (
        
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
                onPress={() => {
                    //console.log(plan.plan_id)
                    updateCurrentPlanId(plan.plan_id);
                    navigation.navigate("ViewPlan",{origin_route: "ListPlans"});
                }}
                onLongPress={() => {
                    Alert.alert(
                        "Confirmation",
                        "Please choose the action to perform",
                        [
                            {
                                text: "Add a Goal",
                                onPress: () => {
                                    updateCurrentPlanId(plan.plan_id);
                                    navigation.navigate("AddGoal");
                                    //alert("Feature under construction")
                                    //navigation.navigate("AddTask", { goal_id: props.goalId });
                                }
                            },
                            {
                                text: 'Edit Plan',
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
                            <Text>{plan.plan_name}</Text>
                            </View>
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

    )
}

export default PlanListItem;