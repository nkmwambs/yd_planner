import React from 'react';
import { FAB, Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

const FloatActionButton = (props) => {

    return (

        <View style={styles.container}>
            <FAB
                title=""
                icon={
                    <Icon
                        name="add-outline"
                        type="ionicon"
                        size={25}
                        color="white"
                    />
                }
                onPress={props.clickHandler}
            />
        </View>

    );
};

export default FloatActionButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white',
        //padding: 10,
        elevation: 5,
        position: 'absolute',
        bottom: 10,
        right: 15,
    }
});