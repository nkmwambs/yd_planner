import React from 'react'
import { View, StyleSheet, Text, Image } from "react-native";
import { ListItem, Avatar, Icon, Divider, Card, Button } from 'react-native-elements'

const AnnouncementItem = (props) => {
    return (
        <Card>
            <View>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>{props.title}</ListItem.Title>
                        <View style={styles.body}><Text>{props.body}</Text></View>
                    </ListItem.Content>
                </ListItem>
            </View>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Read More ... ' />
        </Card>
    );
}

export default AnnouncementItem;

styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    subtitleView: {
        flexDirection: 'row',
        //paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    },
    body: {

    }
})