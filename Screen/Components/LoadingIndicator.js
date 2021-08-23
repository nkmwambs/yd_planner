import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../Constants/Colors'


const LoadingIndicator = (props) => {

    return (
        <ActivityIndicator
            animating={props.animating}
            color={Colors.mainBackgroundColor}
            size="large"
            style={styles.activityIndicator}
        />
    )
}

export default LoadingIndicator;

styles = StyleSheet.create({
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    }
})