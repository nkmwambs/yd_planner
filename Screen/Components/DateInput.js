import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker'

const DateInput = (props) => {

    return (
        <DatePicker
            style={props.style}
            date={props.date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder={props.inputPlaceholder}
            format="YYYY-MM-DD"
            //minDate="01-01-2016"
            //maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                },
                dateInput: {
                    marginLeft: 36,
                },
            }}
            onDateChange={props.onDateChange}
        />
    )
}

export default DateInput;