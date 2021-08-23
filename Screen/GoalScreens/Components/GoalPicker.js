import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker';


const GoalPicker = (props) => {
    return (
        <View style={styles.SectionStyle}>
            <View style={styles.inputStyle}>
                <Picker
                    selectedValue={props.selectedValue}
                    style={styles.pickerContainer}
                    onValueChange={props.onValueChange}
                >
                    <Picker.Item
                        label={props.pickerLabel}
                        value={0}
                    />

                    {props.renderItems}

                </Picker>
            </View>
        </View>
    )
}

export default GoalPicker;

const styles = StyleSheet.create({
    pickerContainer: {
        height: 40,
        width: 280
    },
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
})