import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'

const TaskNoteListItem = (props) => {
    return (
        <TouchableOpacity onPress={() => null}>
            <ListItem
                containerStyle={{ marginBottom: 5 }}
                Key={props.noteId}
                bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title>
                        <Text>
                            {props.note}
                        </Text>
                    </ListItem.Title>

                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

export default TaskNoteListItem;