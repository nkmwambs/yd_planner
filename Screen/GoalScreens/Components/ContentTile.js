import React from 'react'
import { View, Text } from 'react-native'


const ContentTile = ({ title, value }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={{ fontWeight: 'bold', }}>{title}:</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text>{value}</Text>
            </View>
        </View>
    )
}

export default ContentTile;