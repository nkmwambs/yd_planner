import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Loader from '../Components/Loader'
import FloatActionButton from '../Components/FloatActionButton'
import Endpoints from '../../Constants/Endpoints'
import PlanListItem from './Components/PlanListItem'
import AsyncStorage from '@react-native-async-storage/async-storage';
import getItems from '../../Functions/getItems'
import { GlobalContext } from '../../Context/GlobalContext'


const ListPlans = ({ navigation }) => {

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const {theme} = useContext(GlobalContext)

    const getPlans = async () => {

        const user_id = await AsyncStorage.getItem('user_id');
        const url = Endpoints.get_plans + "?user_id=" + user_id

        await getItems(url).then((data) => {
            //console.log(url)
            //console.log(data)
            setPlans(data)
            setLoading(false)
        })

    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getPlans();
        });

        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    })


    const renderItem = ({ item }) => {
        return (
            <PlanListItem
                plan={item}
            />

        )
    }
    

    return (
        <View style={[styles.container,{backgroundColor:theme.listContentBackgroundColor}]}>
            <Loader loading={loading} />
            <FlatList
                style={{ elevation: 1 }}
                keyExtractor={(item) => item.plan_id}
                data={plans}
                renderItem={renderItem}
            />

            {/* <FloatActionButton clickHandler={() => {
                navigation.navigate("AddPlan");
            }} /> */}

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