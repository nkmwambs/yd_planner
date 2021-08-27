import React, { useState, useEffect, useContext } from "react";
import { Icon } from 'react-native-elements'
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList
} from "react-native";

import Colors from '../../Constants/Colors'
import Endpoints from '../../Constants/Endpoints'
import Strings from '../../Constants/Strings/en'
import LoadingIndicator from '../Components/LoadingIndicator'

import { useNavigation } from '@react-navigation/native'

import UpdateTaskHeader from './Components/UpdateTaskHeader'
import UpdateTaskNotesList from './Components/UpdateTaskNotesList'
import UpdateTaskInput from './Components/UpdateTaskInput'
import FloatActionButton from '../Components/FloatActionButton'
import TaskNoteListItem from '../GoalScreens/Components/TaskNoteListItem'
import Loader from '../Components/Loader'
import NoteSlider from './Components/NoteSlider'
import { PlanContext } from "../../Context/PlanContext";


const ViewTask = ({ route, navigation }) => {

    // const { task_id } = route.params;
    const {taskId} = useContext(PlanContext)
    const [taskNotes, setTaskNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTaskNotes = async () => {
        await fetch(Endpoints.task_notes + taskId, {

            method: "get",
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setTaskNotes(json.data);
                setLoading(false);
                // if (json.status === 'success') {
                //console.log(json.data);
                // }
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {

        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            getTaskNotes();
        });

        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    })


    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => null}>
            <TaskNoteListItem
                note={item.task_note}
                noteId={item.task_note_id}
            />
        </TouchableOpacity>

    )

    return (

        <View style={styles.container}>

            <View style={styles.taksDetails}>
                <View>
                    <UpdateTaskHeader />
                </View>
            </View >

            <View style={styles.listOfNotes}>
                {
                    loading ?
                        <Loader loading={loading} /> :
                        taskNotes.length == 0 ?
                            <View
                                style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    No Notes available
                                </Text>
                            </View> :
                            <View style={{
                                // flex: 1,
                                // backgroundColor: 'white',
                                paddingLeft: 5,
                                paddingRight: 5,
                                marginTop: 10,
                                marginBottom: 10,
                            }}>
                                {/* <FlatList
                                    keyExtractor={item => item.task_note_id}
                                    data={taskNotes}
                                    renderItem={renderItem}
                                /> */}
                                <NoteSlider notes={taskNotes} />
                            </View>

                }

            </View>

            {/* <FloatActionButton
                clickHandler={() => navigation.navigate("AddtaskNote", { task_id: task_id })}
            /> */}


        </View >
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    taksDetails: {
        //backgroundColor: "red"

    },
    listOfNotes: {
        flex: 1,
        paddingLeft: 0,
        paddingRight: 0,
    },
    // chatSection: {
    //     position: "absolute",
    //     bottom: 5,
    //     flexDirection: 'row',
    //     width: Dimensions.get('window').width,
    //     height: 100,
    //     marginTop: 20,
    //     marginBottom: 10,
    // }
})

export default ViewTask;