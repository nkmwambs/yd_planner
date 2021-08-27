import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Loader from '../Components/Loader'
import FloatActionButton from '../Components/FloatActionButton'
import Endpoints from '../../Constants/Endpoints'
import GoalListItem from './Components/GoalListItem'
import getItems from '../../Functions/getItems'
import { GlobalContext } from '../../Context/GlobalContext'
import { PlanContext } from '../../Context/PlanContext'
import EmptyPlaceholder from '../Components/EmptyPlaceholder'


const ListGoals = ({ route, navigation }) => {

    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const {theme} = useContext(GlobalContext)

    const {planId} = useContext(PlanContext)
    //const { planId } = route.params;

    const getGoals = async () => {

        await getItems(Endpoints.goals + planId).then((data) => {
            setGoals(data)
            setLoading(false)
            //console.log(data)
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

    if(goals.length == 0){
        return (
            <View style={[styles.container,{backgroundColor:theme.listContentBackgroundColor}]}>
                {
                    loading ? <Loader loading={loading} /> : <EmptyPlaceholder
                    placeholderText="You have no Goals Created"
                    buttonLabel = "Add a Goal"
                    onClickHandler={() => {
                      navigation.navigate("AddGoal",{planId:planId});
                    }}
                  />
                }
            
        
        </View>
        )
    }


    return (
        <View style={[styles.container,{backgroundColor:theme.listContentBackgroundColor}]}>
            {
                loading ? <Loader loading={loading} /> : <FlatList
                style={{ elevation: 1 }}
                keyExtractor={(item) => item.goal_id}
                data={goals}
                renderItem={renderItem}
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