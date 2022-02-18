import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native'


const GoalTextInput = (props) => {

    return (
        <View style={styles.SectionStyle}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={props.onChangeText}
                underlineColorAndroid="#f000"
                placeholder={props.placeholder}
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                multiline
                numberOfLines={props.numberOfLines}
                editable
                maxLength={255}
                // onSubmitEditing={() =>
                //     emailInputRef.current && emailInputRef.current.focus()
                // }
                blurOnSubmit={false}
                value={typeof props.value !== 'undefined' ? props.value : this.onChangeText}
            />
        </View>
    )

}

export default GoalTextInput;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        borderColor: '#dadae8',
        //color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        // borderRadius: 30,

    }
});