import React from 'react'
import { View, StyleSheet } from 'react-native'
import ContentRow from './ContentRow'
import ItemHeader from './ItemHeader'

const PlanItem = ({ plan }) => {
    return (
        <View>

            <ItemHeader title="Plan Description" />
            <View style={styles.sectionContent}>

                <ContentRow tiles={
                    [
                        { title: "Title", value: plan.plan_name },
                        { title: "Status", value: plan.plan_status == 1 ? "Active" : "Closed" }
                    ]
                }
                />

                <ContentRow tiles={
                    [
                        { title: "Start Date", value: plan.plan_start_date },
                        { title: "End Date", value: plan.plan_end_date }
                    ]
                }
                />

                <ContentRow tiles={
                    [
                        { title: "Owner", value: plan.user_first_name + ' ' + plan.user_last_name },
                        { title: "Created On", value: plan.plan_created_date }
                    ]
                }
                />


            </View>

            <ItemHeader title="Plan Progress" />

            <View style={styles.sectionContent}>
                <ContentRow tiles={
                    [
                        { title: "Goals", value: 6 },
                        { title: "Tasks", value: 21 }
                    ]
                }
                />

                <ContentRow tiles={
                    [
                        { title: "Due Tasks", value: 4 },
                        { title: "Overdue Tasks", value: 2 }
                    ]
                }
                />

            </View>


            <ItemHeader title="Goals shared to you" />
            <View style={styles.sectionContent}>

            </View>
        </View>
    )
}

export default PlanItem;

const styles = StyleSheet.create({
    sectionContent: {
        //margin: 5,
        padding: 10,
    }
})