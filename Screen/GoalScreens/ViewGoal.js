import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import getItems from "../../Functions/getItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import Endpoints from "../../Constants/Endpoints";
import PlannerView from "../Components/PlannerView";
import EmptyPlaceholder from '../Components/EmptyPlaceholder'

const ViewGoal = ({ route, navigation }) => {
  const [goal, setGoal] = useState({});
  const [loading, setLoading] = useState(true);


  const goalId = route.params.goalId;
  const planId = route.params.planId;

  const getGoal = async () => {
    
    const viewGoal = Endpoints.get_goal + goalId;

    await getItems(viewGoal).then((data) => {
      setGoal(data);
      setLoading(false);
      //console.log(data)
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getGoal();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  });

  const is_valid_object = (obj) => {
    return typeof obj == "object" && obj != null;
  };

  if (!is_valid_object(goal)) {
    return (
      <View>
        <Loader loading={loading} />
        <EmptyPlaceholder
          placeholderText="You have no Goals Created"
          buttonLabel = "Add a Goal"
          onClickHandler={() => {
            navigation.navigate("AddGoal",{planId:planId});
          }}
        />
        
      </View>
    );
  }

  const DATA = [
    {
      title: "Goal Description",
      rows: [
        [
          { title: "Title", value: goal.goal_name },
          {
            title: "Status",
            value: "New",
          },
        ],
        [
          { title: "Start Date", value: goal.goal_start_date },
          { title: "End Date", value: goal.goal_end_date },
        ],
        [
          {
            title: "Owner",
            value: goal.user_first_name + " " + goal.user_last_name,
          },
          { title: "Created On", value: goal.goal_created_date },
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
      title: "Tasks shared to you",
      rows: [],
    },
  ];

  return (
    <View>
      <Loader loading={loading} />
      <PlannerView
        data={DATA}
        showNavButtons={true}
        onLeftbackPress={() => navigation.navigate("ListGoals", {planId: planId})}
        onRightButtonPress={() =>
          navigation.navigate("ListTasks", { goalId: goal.goal_id })
        }
        leftButtonTitle="All Goals"
        rightButtonTitle="Goal Tasks"
      />
    </View>
  );
};

export default ViewGoal;
