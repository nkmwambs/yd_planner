import React,{createContext, useState} from 'react'

const initialDates = {
    start_date:'',
    end_date:'',
}

export const PlanContext = createContext(initialDates);

export const PlanProvider = ({children}) => {

    const [startDate,setStartDate] = useState(initialDates.start_date);
    const [endDate,setEndDate] = useState(initialDates.end_date);

    const changeStartDate = (date) => {
        setStartDate(date);
    }

    const changeEndDate = (date) => {
        setEndDate(date);
    }

    return (
        <PlanContext.Provider
            value={
                {
                    start_date: startDate,
                    end_date: endDate,
                    changeStartDate,
                    changeEndDate,
                }
            }
        >
            {children}
        </PlanContext.Provider>
    )
}