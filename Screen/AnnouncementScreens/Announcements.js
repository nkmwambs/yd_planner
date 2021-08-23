import React from 'react'
import { View, FlatList } from "react-native";
import { ListItem, Avatar, Icon, Divider } from 'react-native-elements'

import AnnouncementItem from './Components/AnnouncementItem';

const announcements = [
    {
        id: 1,
        title: "Announcement 1",
        body: 'Announcement 1 body'
    },
    {
        id: 2,
        title: "Announcement 2",
        body: 'Announcement 2 body'
    },
    {
        id: 3,
        title: "Announcement 3",
        body: 'Announcement 3 body'
    },
    {
        id: 4,
        title: "Announcement 4",
        body: 'Announcement 4 body'
    }
];


const Announcements = () => {

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <AnnouncementItem
            title={item.title}
            body={item.body}
            monthsLastUpdate={item.months}
        />
    )

    return (
        <FlatList horizontal={true}
            keyExtractor={keyExtractor}
            data={announcements}
            renderItem={renderItem}
        />
    );
};

export default Announcements;



