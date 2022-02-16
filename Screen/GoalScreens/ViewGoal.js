import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import getItems from "../../Functions/getItems";
import {is_valid_object} from "../../Functions/helpers"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import Endpoints from "../../Constants/Endpoints";
import PlannerView from "../Components/PlannerView";
import EmptyPlaceholder from '../Components/EmptyPlaceholder'
import { PlanContext } from "../../Context/PlanContext";

const ViewGoal = ({ route, navigation }) => {
  const [goal, setGoal] = useState({});
  const [loading, setLoading] = useState(true);

  const {planId, goalId, statisticsChanged} = useContext(PlanContext)  

  const [dueTasksCount, setDueTasksCount] = useState(0)
  const [completeTasksCount,setCompleteTasksCount] = useState(0)
  const [overdueTasksCount,setOverdueTasksCount] = useState(0)
  const [allTasksCount,setAllTasksCount] = useState(0)

  const getGoal = async () => {
    
    const viewGoal = Endpoints.get_goal + "?goal_id=" + goalId;
    //console.log(viewGoal)
    await getItems(viewGoal).then((data) => {
      setGoal(data[0]);
      setLoading(false);
      //console.log(data[0])
    });
  };

  useEffect(() => {
    getStatistics();
    //const unsubscribe = navigation.addListener("focus", () => {
      getGoal();
    //});

    // return () => {
    //   // Unsubscribe for the focus Listener
    //   unsubscribe;
    // };
  },[statisticsChanged]);

  const getStatistics = async () => {
    //const user_id = await AsyncStorage.getItem("user_id");

    await getItems(Endpoints.goal_statistics + "?goal_id=" + goalId + '&target_date=' + new Date().toISOString().slice(0, 10) ).then((data) => {
        setDueTasksCount(data.count_goal_due_tasks);
        setCompleteTasksCount(data.count_goal_complete_tasks);
        setOverdueTasksCount(data.count_goal_overdue_tasks);
        setAllTasksCount(data.count_goal_all_tasks);
        
    });

  };

  // const is_valid_object = (obj) => {
  //   return typeof obj == "object" && obj != null;
  // };

  if (!is_valid_object(goal)) {
    return (
      <View style={[{flex:1},{backgroundColor:theme.listContentBackgroundColor}]}>
        {
          loading ? <Loader loading={loading} /> : <EmptyPlaceholder
          placeholderText="You have no Goals Created"
          buttonLabel = "Add a Goal"
          onClickHandler={() => {
            navigation.navigate("AddGoal",{planId:planId});
          }}
        />
        }
        
        
        
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
            value: goal.user_full_name,
          },
          { title: "Created On", value: goal.goal_created_date },
        ],
      ],
    },
    {
      
      title: "Goal Progress",
      rows: [
        [
          { title: "Due Tasks", value: dueTasksCount },
          { title: "Overdue Tasks", value: overdueTasksCount },
        ],
        [
          { title: "Completed Tasks", value: completeTasksCount },
          { title: "All Tasks", value: allTasksCount}
        ]
      ],
    },
    {
      title: "Tasks shared to you",
      rows: [],
    },
  ];

  return (
    <View>
      {
        loading ? <Loader loading={loading} /> : <PlannerView
        data={DATA}
        showNavButtons={true}
        onLeftbackPress={() => navigation.navigate("ListGoals", {planId: planId})}
        onRightButtonPress={() =>
          navigation.navigate("ListTasks", { goalId: goal.goal_id,planId: planId })
        }
        leftButtonTitle="All Goals"
        rightButtonTitle="Goal Tasks"
      />
      }
      
      
    </View>
  );
};

export default ViewGoal;
