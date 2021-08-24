import React from 'react'
import { Text, TouchableOpacity,StyleSheet } from 'react-native';


const PlannerButton = ({errortext, buttonLabel, onClick}) => {
    
    return (
        <>
            {
            errortext != '' 
                ? (
                    <Text style={styles.errorTextStyle}>
                        {errortext}
                    </Text>
                ) 
                : null
            }
            
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={onClick}
            >
                <Text style={styles.buttonTextStyle}>{buttonLabel}</Text>
            </TouchableOpacity>
        </>
    )
}

export default PlannerButton;

const styles = StyleSheet.create({
  
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
