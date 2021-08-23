import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import Colors from '../../../Constants/Colors'


const ItemHeader = ({ title }) => {
    return (
        <View style={[styles.sectionHeaderStyle, { marginTop: 5 }]}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
            <Icon
                type="font-awesome"
                name="caret-down"
                color='white'
                containerStyle={styles.iconContainerStyle}
            />
        </View>
    )
}

export default ItemHeader;

const styles = StyleSheet.create({

    sectionHeaderStyle: {
        width: Dimensions.get('window').width - 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        alignItems: "center",
        backgroundColor: Colors.mainBackgroundColor,
    },
    sectionHeaderText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "white",
    }
    ,
    iconContainerStyle: {
        position: "absolute",
        right: 15,
        top: 10,
        backgroundColor: "#C0C0C0",
        borderRadius: 20,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    }
})