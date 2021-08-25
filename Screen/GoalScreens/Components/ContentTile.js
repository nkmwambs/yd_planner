import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { GlobalContext } from '../../../Context/GlobalContext'


const ContentTile = ({ title, value }) => {

    const {theme} = useContext(GlobalContext)
    
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={[{ fontWeight: 'bold', }, {color:theme.contentFontColor}]}>{title}:</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[{color:theme.contentFontColor}]}>{value}</Text>
            </View>
        </View>
    )
}

export default ContentTile;