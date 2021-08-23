import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { ListItem, Avatar, Card } from 'react-native-elements'

import Strings from '../../../Constants/Strings/en'

import { useNavigation } from '@react-navigation/native';

import Loader from '../../Components/Loader'

const TaskListItem = (props) => {

    const navigation = useNavigation();


    return (
        <TouchableOpacity onPress={() => { navigation.navigate("ViewTask", { task_id: props.itemId }) }}>

            <ListItem
                containerStyle={{ marginBottom: 5 }}
                key={props.itemId}
                bottomDivider
            >

                <ListItem.Content>
                    <ListItem.Title>
                        <View style={styles.profileHeader}>
                            <View style={{
                                backgroundColor: "#D7DBDD",
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{ fontSize: 25, color: '#307ecc' }}>
                                    {
                                        props.status == 0 ? "N" : (props.status == 1 ? "I" : "C")
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={
                            [styles.profileHeader, {
                                alignItems: 'center',
                                height: 40,
                                justifyContent: 'center',
                                paddingLeft: 10,
                            }]}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {props.title}
                            </Text>
                        </View>
                    </ListItem.Title>
                    <View style={styles.subtitleView}>
                        <Text style={styles.dateText}>
                            {Strings.startDate}: {props.startDate} {Strings.endDate}: {props.endDate}
                        </Text>
                    </View>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );
}

export default TaskListItem;

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
    profileHeaderPicCircle: {
        // width: 60,
        // height: 60,
        // borderRadius: 60 / 2,
        // color: 'white',
        // // backgroundColor: 'red',//#ffffff
        // textAlign: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: 'grey',//#307ecc
        padding: 15,
        textAlign: 'center',
    },
})