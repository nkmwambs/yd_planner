import React, { useState } from 'react'
import { 
    View, 
    Text,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import Loader from '../Components/Loader'
import GoalTextInput from './Components/GoalTextInput'
import PlannerDatePicker from '../Components/PlannerDatePicker'
import PlannerButton from '../Components/PlannerButton'

const AddPlan = () => {

    const [loading, setLoading] = useState(false)
    const [planTitle, setPlanTitle] = useState('')
    const [planStartDate, setPlanStartDate] = useState('');
    const [planEndDate, setPlanEndDate] = useState('');

    const onChangePlanStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || planStartDate;
        setPlanStartDate(currentDate);
    };

    const onChangePlanEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || planEndDate;
        setPlanEndDate(currentDate);
    };

    const onSubmitHandler = () => {
        alert('Hello');
    }

    return (
        <View style={{ flex: 1 }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <GoalTextInput
                            onChangeText={(planTitle) => setPlanTitle(planTitle)}
                            placeholder="Plan Title"
                            numberOfLines={5}
                    />

            
                    <PlannerDatePicker
                        onChange={onChangePlanStartDate} 
                        inputLabel="Choose Start Date"
                    />

                
                    <PlannerDatePicker 
                        inputLabel="Choose end Date"
                        onChange={onChangePlanEndDate}
                    />

                    <PlannerButton 
                        error="Error occurred"
                        buttonLabel = "Add a Plan"
                        onClick = {onSubmitHandler}
                    />

                </KeyboardAvoidingView>
                </ScrollView>
            
        </View>
    )
}

export default AddPlan;