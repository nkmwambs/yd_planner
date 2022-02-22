import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import getItems from "../../Functions/getItems";
import {is_valid_object} from "../../Functions/helpers"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import Endpoints from "../../Constants/Endpoints";
import PlannerView from "../Components/PlannerView";
import EmptyPlaceholder from "../Components/EmptyPlaceholder";
import { PlanContext } from "../../Context/PlanContext";
import { GlobalContext } from "../../Context/GlobalContext";

const ViewPlan = ({  navigation }) => {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);

  const [dueTasksCount, setDueTasksCount] = useState(0)
  const [goalsCount,setGoalsCount] = useState(0)
  const [overdueTasksCount,setOverdueTasksCount] = useState(0)
  const [tasksCount,setTasksCount] = useState(0)

  const { planId, updateCurrentPlanId, statisticsChanged } = useContext(PlanContext);
  const { theme, userId } = useContext(GlobalContext);
  //const  planId = typeof route.params == 'undefined' ? 0 : route.params.planId;


  const getPlan = async () => {
    const user_id = await AsyncStorage.getItem("user_id");

    let viewPlan = Endpoints.active_plan + '?user_id=' + user_id + "&plan_status=1";

    if (planId > 0) {
      viewPlan = Endpoints.active_plan + "?user_id=" + user_id + "&plan_id=" + planId;
    }

    await getItems(viewPlan).then((data) => {
      setPlan(data);
      setLoading(false);
      updateCurrentPlanId(data.plan_id)
    });
  };

  const getStatistics = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    const url = Endpoints.plan_statistics + "?plan_id=" + planId + '&target_date=' + new Date().toISOString().slice(0, 10)
    
    await getItems(url)
    .then((data) => {
        setDueTasksCount(data.count_plan_due_tasks);
        setGoalsCount(data.count_plan_goals);
        setOverdueTasksCount(data.count_overdue_plan_tasks);
        setTasksCount(data.count_plan_tasks);
    });

  };

  useEffect(() => {

    getPlan();
    getStatistics()

  }, [navigation,planId, statisticsChanged]); //navigation, planId, dueTasksCount, goalsCount, overdueTasksCount, tasksCount


  if (!is_valid_object(plan)) {
    return (
      <View
        style={[
          { flex: 1 },
          { backgroundColor: theme.listContentBackgroundColor },
        ]}
      >
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <EmptyPlaceholder
            placeholderText="You have no Plans Created"
            buttonLabel="Add a Plan"
            onClickHandler={() => {
              navigation.navigate("AddPlan");
            }}
          />
        )}
      </View>
    );
  }

  const DATA = [
    {
      title: "Plan Description",
      rows: [
        [
          { title: "Title", value: plan.plan_name },
          {
            title: "Status",
            value: plan.plan_status == 1 ? "Active" : "Closed",
          },
        ],
        [
          { title: "Start Date", value: plan.plan_start_date },
          { title: "End Date", value: plan.plan_end_date },
        ],
        [
          {
            title: "Owner",
            value: plan.user_first_name + " " + plan.user_last_name,
          },
          { title: "Created On", value: plan.plan_created_date },
        ],
      ],
    },
    {
      title: "Plan Progress",
      rows: [
        [
          { title: "Goals", value: goalsCount },
          { title: "Tasks", value: tasksCount },
        ],
        [
          { title: "Due Tasks", value: dueTasksCount },
          { title: "Overdue Tasks", value: overdueTasksCount },
        ],
      ],
    },
    {
      title: "Goals shared to you",
      rows: [],
    },
  ];

  return (
    <View
      style={[
        { flex: 1 },
        { backgroundColor: theme.listContentBackgroundColor },
      ]}
    >
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <PlannerView
          data={DATA}
          showNavButtons={true}
          onLeftbackPress={() => navigation.navigate("ListPlans")}
          onRightButtonPress={() =>
            navigation.navigate("ListGoals", { planId: plan.plan_id })
          }
          leftButtonTitle="All Plans"
          rightButtonTitle="Plan Goals"
        />
      )}
    </View>
  );
};

export default ViewPlan;
