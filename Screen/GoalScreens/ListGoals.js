import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Loader from '../Components/Loader'
import FloatActionButton from '../Components/FloatActionButton'
import Endpoints from '../../Constants/Endpoints'
import GoalListItem from './Components/GoalListItem'
import getItems from '../../Functions/getItems'
import { GlobalContext } from '../../Context/GlobalContext'
import { PlanContext } from '../../Context/PlanContext'


const ListPlans = ({ route, navigation }) => {

    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const {theme} = useContext(GlobalContext)

    const {planId} = useContext(PlanContext)
    //const { planId } = route.params;

    const getGoals = async () => {

        await getItems(Endpoints.goals + planId).then((data) => {
            setGoals(data)
            setLoading(false)
        })

    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
          getGoals();
        });

        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    })


    const renderItem = ({ item }) => {
        return (

            <GoalListItem
                goal={item}
            />

        )
    }


    return (
        <View style={[styles.container,{backgroundColor:theme.listContentBackgroundColor}]}>
            <Loader loading={loading} />
            <FlatList
                style={{ elevation: 1 }}
                keyExtractor={(item) => item.goal_id}
                data={goals}
                renderItem={renderItem}
            />

            <FloatActionButton clickHandler={() => {
                navigation.navigate("AddGoal", {planId: planId});
            }} />

        </View>
    )
}

export default ListPlans;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: Colors.mainBackgroundColor,
    }
})