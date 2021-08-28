import React from "react";
import { View, Text } from "react-native";

const PlannerBadge = (props) => {
  return (
    <View
      style={{
        ...props.containerStyle
      }}
    >
      <Text
        style={{...props.style}}
      >
        {props.text}
      </Text>
    </View>
  );
};


export default PlannerBadge;