import React,{createContext, useState} from 'react'

const initialization = {
    plan_id:0,
    goal_id:0,
    task_id:0,
    start_date:'',
    end_date:'',
    statisticsChanged:false,
}

export const PlanContext = createContext(initialization);

export const PlanProvider = ({children}) => {

    const [startDate,setStartDate] = useState(initialization.start_date);
    const [endDate,setEndDate] = useState(initialization.end_date);

    const [planId,setPlanId] = useState(initialization.plan_id);
    const [goalId,setGoalId] = useState(initialization.goal_id);
    const [taskId,setTaskId] = useState(initialization.task_id);

    const [statisticsChanged, setStatisticsChanged] = useState(initialization.statisticsChanged)

    const changeStartDate = (date) => {
        setStartDate(date);
    }

    const changeEndDate = (date) => {
        setEndDate(date);
    }

    const updateCurrentPlanId = (id) => {
        setPlanId(id);
    }

    const updateCurrentGoalId = (id) => {
        setGoalId(id);
    }

    const updateCurrentTaskId = (id) => {
        setTaskId(id);
    }

    const updateStatisticsChanged = (statisticsChangedFlag) => {
        setStatisticsChanged(statisticsChangedFlag);
    }

    return (
        <PlanContext.Provider
            value={
                {
                    start_date: startDate,
                    end_date: endDate,
                    planId:planId,
                    goalId:goalId,
                    taskId:taskId,
                    statisticsChanged,
                    changeStartDate,
                    changeEndDate,
                    updateCurrentPlanId,
                    updateCurrentGoalId,
                    updateCurrentTaskId,
                    updateStatisticsChanged,
                }
            }
        >
            {children}
        </PlanContext.Provider>
    )
}