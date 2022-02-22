import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, StyleSheet,Dimensions, Text } from 'react-native'
import Loader from '../Components/Loader'
import FloatActionButton from '../Components/FloatActionButton'
import Endpoints from '../../Constants/Endpoints'
import GoalListItem from './Components/GoalListItem'
import getItems from '../../Functions/getItems'
import { GlobalContext } from '../../Context/GlobalContext'
import { PlanContext } from '../../Context/PlanContext'
// import EmptyPlaceholder from '../Components/EmptyPlaceholder'


const ListGoals = ({ route, navigation }) => {

    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const {theme} = useContext(GlobalContext)

    const {planId, statisticsChanged, updateStatisticsChanged} = useContext(PlanContext)
    const [isFetching, setIsFetching] = useState(false)
    //const [goalId, setGoalId] = useState(0)

    //const { planId } = route.params;

    const getGoals = async () => {
        const url = Endpoints.goals + "?plan_id=" + planId
        //console.log(url)
        await getItems(url).then((data) => {
            //console.log(data)
            setGoals(data)
            setLoading(false)
            setIsFetching(false);
        })

    }

    useEffect(() => {
        getGoals();
    },[navigation, statisticsChanged ])
    


    const renderItem = ({ item }) => {
        
        return (
            <GoalListItem
                goal={item}
                goalDeletionHandler={goalDeletionHandler}
            />
        )
    }

    const goalDeletionHandler = async(id) => {

        const url = Endpoints.delete_goal + "?goal_id=" + id; 
        
        await getItems(url).then((data) => {
            statisticsChanged ? updateStatisticsChanged(false) :  updateStatisticsChanged(true);
            onRefresh()  
        })

        
    }

    const onRefresh =  () => {
        setIsFetching(true);  
        getGoals()    
    }

    const EmptyList = () => {
        return (
            <View style={{ flex:1,height: Dimensions.get("window").height/2,
            alignItems: "center", justifyContent:"center", backgroundColor: "white"}}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>You have no goals available</Text>  
            </View>
        )
    }
    


    return (
        <View style={[styles.container,{backgroundColor:theme.listContentBackgroundColor}]}>
            {
                loading ? <Loader loading={loading} /> : 
                
                <FlatList
                    style={{ elevation: 1 }}
                    keyExtractor={(item) => item.goal_id}
                    data={goals}
                    renderItem={renderItem}
                    onRefresh={onRefresh}
                    refreshing={isFetching}
                    //extraData={goalId}
                    ListEmptyComponent={<EmptyList/>}
                />
            }
            
            

            <FloatActionButton clickHandler={() => {
                navigation.navigate("AddGoal", {planId: planId});
            }} />

        </View>
    )
}

export default ListGoals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: Colors.mainBackgroundColor,
    }
})