import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Strings from '../../../Constants/Strings/en'

const TaskHeader = (props) => {

    return (
        <>
            <View style={styles.heading}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', textDecorationLine: 'underline' }}>
                    {Strings.goalLabel}
                </Text>
            </View>

            <View style={styles.heading}>
                <View>
                    <Text style={{ fontSize: 15 }}>{props.goalName}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontStyle: "italic" }}>
                        <Text style={{ fontWeight: 'bold' }}>{Strings.startDate}: </Text> {props.goalStartDate}
                        <Text style={{ fontWeight: 'bold' }}> {Strings.endDate}: </Text> {props.goalEndDate}</Text>
                </View>
            </View>
        </>
    )
}

export default TaskHeader;

const styles = StyleSheet.create({
    heading: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
    }
})