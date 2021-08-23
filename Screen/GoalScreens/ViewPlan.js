import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import getItems from '../../Functions/getItems'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader'
import getItem from '../../Functions/getItems'
import Endpoints from '../../Constants/Endpoints'
import PlanItem from './Components/PlanItem'
import { Button, Icon } from 'react-native-elements'
import Colors from '../../Constants/Colors'

const ViewPlan = ({ navigation }) => {

    const [plan, setPlan] = useState({})
    const [loading, setLoading] = useState(false)

    const getPlan = async () => {

        const user_id = await AsyncStorage.getItem('user_id');

        await getItems(Endpoints.active_plan + user_id).then((data) => {
            setPlan(data)
            setLoading(false)
            //console.log(data)
        })

    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getPlan();
        });

        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };

    })

    return (
        <View>
            <Loader loading={loading} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Button
                        title="All Plans"
                        onPress={() => navigation.navigate("ListPlans")}
                        buttonStyle={{ margin: 5, backgroundColor: Colors.mainBackgroundColor }}
                        icon={
                            <Icon
                                name="arrow-left"
                                type="font-awesome"
                                color="white"
                                containerStyle={
                                    {
                                        position: 'absolute',
                                        left: 5
                                    }
                                }
                            />
                        }
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Plan Goals"
                        onPress={() => navigation.navigate("ListGoals", { planId: plan.plan_id })}
                        buttonStyle={{ margin: 5, backgroundColor: Colors.mainBackgroundColor }}
                        icon={
                            <Icon
                                name="arrow-right"
                                type="font-awesome"
                                color='white'
                                containerStyle={
                                    {
                                        position: 'absolute',
                                        right: 5
                                    }
                                }
                            />
                        }
                    />
                </View>
            </View>
            <View>
                <PlanItem plan={plan} />
            </View>

        </View>
    )
}

export default ViewPlan;