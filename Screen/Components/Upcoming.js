import React from 'react';
import { View, Text } from 'react-native'


const Upcoming = () => {
    return (
        <View
            style={
                {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',

                }
            }
        >
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
            }}>This feature is upcoming</Text>
        </View>
    );
}

export default Upcoming;