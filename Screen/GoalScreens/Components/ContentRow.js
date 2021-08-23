import React from 'react'
import ContentTile from './ContentTile'
import { View } from 'react-native'

const ContentRow = ({ tiles }) => {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, }}>
            {
                tiles.map((tile, i) => {
                    return (
                        <ContentTile
                            key={i}
                            title={tile.title}
                            value={tile.value}
                        />
                    )
                })
            }
        </View>
    )
}

export default ContentRow;