import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native'
import TaskNoteListItem from './TaskNoteListItem'
import { useNavigation } from '@react-navigation/native'

const UpdateTaskNotesList = (props) => {

    const navigation = useNavigation();

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => null}>
            <TaskNoteListItem
                note={item.task_note}
                noteId={item.task_note_id}
            />
        </TouchableOpacity>

    )

    return (
        <View>
            <FlatList
                keyExtractor={item => item.task_note_id}
                data={props.notes}
                renderItem={renderItem}
            />
        </View>
    )
}

export default UpdateTaskNotesList;