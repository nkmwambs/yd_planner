import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FAB, Icon } from 'react-native-elements';

const ThemeChanger = (props) => {
    return (
        <View style={styles.container}>
            <FAB 
                onPress={props.clickHandler}
                title=""
                icon={
                    <Icon
                        name="undo"
                        type="font-awesome"
                        size={25}
                        color="white"
                    />
                }
            />
        </View>
    )
}

export default ThemeChanger;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 5,
        position: 'absolute',
        top: 10,
        left: 15,
    }
});