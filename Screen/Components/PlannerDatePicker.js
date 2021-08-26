import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import { PlanContext } from '../../Context/PlanContext';


const PlannerDatePicker = (props) => {

    const [date, setDate] = useState('')
    const [dateShow, setDateShow] = useState(false);
    const [dateMode, setDateMode] = useState('date');

    const {changeStartDate, changeEndDate} = useContext(PlanContext)

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDateShow(Platform.OS === 'ios');
        setDate(currentDate);
        
        if(props.datePosition == 'start'){
            changeStartDate(mysqlFormatDate(currentDate));
        }else{
            changeEndDate(mysqlFormatDate(currentDate));
        }
    };

    const showDateMode = (currentMode) => {
        setDateShow(true);
        setDateMode(currentMode);
    };

    
    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()}`;
    };

    const mysqlFormatDate = (date) => {
        return `${date.getFullYear()}-${(date.getMonth() +
            1) < 10 ? '0' + (date.getMonth() +
            1): (date.getMonth() +
            1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
    };

    return (
        <View style={styles.SectionStyle}>

            <View style={styles.inputStyle}>
                <Icon
                    containerStyle={styles.iconStyle}
                    type="font-awesome"
                    name="calendar"
                    onPress={showDateMode} //() => showMode('date')
                />
                <Text>{date != '' ? formatDate(date) : props.inputLabel }</Text>
            </View>

            {dateShow && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={!date ? new Date() : date}
                    mode={dateMode}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}
        </View>
    )
}

export default PlannerDatePicker;


const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 0,
    },
    inputStyle: {
        flex: 1,
        borderColor: '#dadae8',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    iconStyle: {
        position: 'absolute',
        left: 0,
        padding: 5,
    }
});