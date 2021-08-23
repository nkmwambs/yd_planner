import React, { useState, useEffect } from 'react'
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import styled from "styled-components";
import Colors from '../../../Constants/Colors'
import { Icon } from 'react-native-elements'

const UpdateTaskInput = (props) => {

    const [value, setValue] = useState("");

    const onChangeText = (text) => {
        setValue(text);
    };

    return (
        <View>
            <TextInput
                style={styles.inputStyle}
                onChangeText={onChangeText}
                underlineColorAndroid="#f000"
                placeholder="Enter notes here"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                multiline
                numberOfLines={10}
                editable
                //maxLength={255}
                blurOnSubmit={false}
            />
            <TouchableOpacity onPress={() => null}>
                <Icon
                    name='sc-telegram'
                    type='evilicon'
                    color='white'
                    size={30}
                    containerStyle={styles.iconStyle}
                />
            </TouchableOpacity>

        </View>

    )
}



export default UpdateTaskInput;

const styles = StyleSheet.create({
    inputStyle: {
        flex: 1,
        borderColor: '#dadae8',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
    },
    iconStyle: {
        backgroundColor: Colors.mainBackgroundColor,
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    }
})