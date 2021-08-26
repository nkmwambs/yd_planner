import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import getItems from "../../Functions/getItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import Endpoints from "../../Constants/Endpoints";
import PlannerView from "../Components/PlannerView";
import EmptyPlaceholder from '../Components/EmptyPlaceholder'

const ViewPlan = ({ route, navigation }) => {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);

  let planId = 0;

  if (route.params != undefined) {
    planId = route.params.planId;
  }

  const getPlan = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    let viewPlan = Endpoints.active_plan + user_id;

    if (planId > 0) {
      viewPlan = Endpoints.get_plan + planId;
    }

    await getItems(viewPlan).then((data) => {
      setPlan(data);
      setLoading(false);
      //console.log(data)
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPlan();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  });

  const is_valid_object = (obj) => {
    return typeof obj == "object" && obj != null;
  };

  if (!is_valid_object(plan)) {
    return (
      <View>
        <Loader loading={loading} />
        <EmptyPlaceholder
          placeholderText="You have no Plans Created"
          onClickHandler={() => {
            navigation.navigate("AddPlan");
          }}
        />
        
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
          { title: "Goals", value: 0 },
          { title: "Tasks", value: 0 },
        ],
        [
          { title: "Due Tasks", value: 0 },
          { title: "Overdue Tasks", value: 0 },
        ],
      ],
    },
    {
      title: "Goals shared to you",
      rows: [],
    },
  ];

  return (
    <View>
      <Loader loading={loading} />
      <PlannerView
        data={DATA}
        showNavButtons={true}
        onLeftbackPress={() => navigation.navigate("ListPlans")}
        onRightButtonPress={() =>
          navigation.navigate("ListGoals", { planId: planId })
        }
        leftButtonTitle="All Plans"
        rightButtonTitle="Plan Goals"
      />
    </View>
  );
};

export default ViewPlan;
