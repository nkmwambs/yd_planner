import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import getItems from "../../Functions/getItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import Endpoints from "../../Constants/Endpoints";
import PlannerView from "../Components/PlannerView";
import EmptyPlaceholder from '../Components/EmptyPlaceholder'
import { PlanContext } from "../../Context/PlanContext";
import { GlobalContext } from "../../Context/GlobalContext";


const ViewPlan = ({ route, navigation }) => {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);

  const {planId, updateCurrentPlanId} = useContext(PlanContext)
  const {theme} = useContext(GlobalContext)

  //console.log(route)
  //console.log(planId)

  const getPlan = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    let viewPlan = Endpoints.active_plan + user_id;

    if(planId > 0){
      viewPlan = Endpoints.get_plan + planId;
    }

    await getItems(viewPlan).then((data) => {
      setPlan(data);
      setLoading(false);
      updateCurrentPlanId(is_valid_object(data) ? data.plan_id : 0)
      
    });
  };

  useEffect(() => {
    //const unsubscribe = navigation.addListener("focus", () => {
      getPlan();
    //});

    //return () => {
      // Unsubscribe for the focus Listener
      //unsubscribe;
    //};
  },[navigation, planId]);

  const is_valid_object = (obj) => {
    return typeof obj == "object" && obj != null;
  };

  if (!is_valid_object(plan)) {
    return (
      <View style={[{flex:1},{backgroundColor:theme.listContentBackgroundColor}]}>
        {
          loading ? <Loader loading={loading} /> : <EmptyPlaceholder
          placeholderText="You have no Plans Created"
          buttonLabel = "Add a Plan"
          onClickHandler={() => {
            navigation.navigate("AddPlan");
          }}
        />
        }
        
        
        
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
    <View  style={[{flex:1},{backgroundColor:theme.listContentBackgroundColor}]}>
      {
        loading ? <Loader loading={loading} /> : <PlannerView
        data={DATA}
        showNavButtons={true}
        onLeftbackPress={() => navigation.navigate("ListPlans")}
        onRightButtonPress={() =>
          navigation.navigate("ListGoals", { planId: plan.plan_id })
        }
        leftButtonTitle="All Plans"
        rightButtonTitle="Plan Goals"
      />
      }
      
      
    </View>
  );
};

export default ViewPlan;
