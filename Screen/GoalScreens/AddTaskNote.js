import React, { useState, useContext } from 'react'
import { TextInput, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import Colors from '../../Constants/Colors'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader'
import Endpoints from '../../Constants/Endpoints'
import { PlanContext } from '../../Context/PlanContext';

const AddTaskNote = ({ route, navigation }) => {

    // const { task_id } = route.params;
    const {taskId} = useContext(PlanContext)
    const [task_note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeText = (text) => {
        setNote(text);
    };

    const postNote = async () => {
        //alert(value);
        const user_id = await AsyncStorage.getItem('user_id');

        setLoading(true);

        var dataToSend = {
            task_note: task_note,
            task_id: taskId,
            task_note_created_by: user_id,
            task_note_last_modified_by: user_id,
            task_note_created_date: new Date().toISOString().slice(0, 10),
        };

        //console.log(dataToSend);

        var formBody = [];

        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        const url = Endpoints.add_task_note
        
        await fetch(url, {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);

                // If server response message same as Data Matched
                if (responseJson.status === 'success') {

                    navigation.navigate("ViewTask")

                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    }

    return (
        <View style={styles.chatSection}>
            <Loader loading={loading} />
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={onChangeText}
                    underlineColorAndroid="#f000"
                    placeholder="Enter notes here"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    multiline
                    numberOfLines={100}
                    editable
                    //maxLength={255}
                    blurOnSubmit={false}
                />
            </View>


            <View>
                <TouchableOpacity onPress={postNote}>
                    <Icon
                        name='sc-telegram'
                        type='evilicon'
                        color='white'
                        size={30}
                        containerStyle={styles.iconStyle}
                    />
                </TouchableOpacity>
            </View>

        </View>

    )
}



export default AddTaskNote;

const styles = StyleSheet.create({
    inputStyle: {
        flex: 1,
        borderColor: '#dadae8',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        textAlignVertical: 'top'
    },
    textInputContainer: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height - 300,
    }
    ,
    iconStyle: {
        backgroundColor: Colors.mainBackgroundColor,
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    chatSection: {
        margin: 20,
    }
})