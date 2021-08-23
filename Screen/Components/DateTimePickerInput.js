import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';


const DateTimePickerInput = (props) => {

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()}`;
    };

    return (
        <View style={styles.SectionStyle}>

            <View style={styles.inputStyle}>
                <Icon
                    containerStyle={styles.iconStyle}
                    type="font-awesome"
                    name="calendar"
                    onPress={props.showMode} //() => showMode('date')
                />
                <Text>{formatDate(props.date)}</Text>
            </View>

            {props.show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={props.date}
                    mode={props.mode}
                    is24Hour={true}
                    display="default"
                    onChange={props.onChange}
                />
            )}
        </View>
    )

}

export default DateTimePickerInput;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 0,
    },
    inputStyle: {
        flex: 1,
        borderColor: '#dadae8',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    iconStyle: {
        position: 'absolute',
        left: 0,
        padding: 5,
    }
});