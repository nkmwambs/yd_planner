import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import getItems from "../../Functions/getItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import Endpoints from "../../Constants/Endpoints";
import { GlobalContext } from "../../Context/GlobalContext";
import NavButton from "../Components/NavButton";
import PlannerView from "../Components/PlannerView";

const ViewPlan = ({ navigation }) => {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(GlobalContext);

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
          { title: "Goals", value: 6 },
          { title: "Tasks", value: 21 },
        ],
        [
          { title: "Due Tasks", value: 4 },
          { title: "Overdue Tasks", value: 2 },
        ],
      ],
    },
    {
      title: "Goals shared to you",
      rows: [],
    },
  ];

  const getPlan = async () => {
    const user_id = await AsyncStorage.getItem("user_id");

    await getItems(Endpoints.active_plan + user_id).then((data) => {
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

  return (
    <View>
      <Loader loading={loading} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <NavButton
            navArrowDirection="left"
            title="All Plans"
            onPress={() => navigation.navigate("ListPlans")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <NavButton
            navArrowDirection="right"
            title="Plan Goals"
            onPress={() =>
              navigation.navigate("ListGoals", { planId: plan.plan_id })
            }
          />
        </View>
      </View>
      <View>
        <PlannerView data={DATA} />
      </View>
    </View>
  );
};

export default ViewPlan;
