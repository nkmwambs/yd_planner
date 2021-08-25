import React, { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import Section from "../Components/Section";
import { View, Dimensions } from "react-native";
import NavButton from "../Components/NavButton";

const PlannerView = ({ data, showNavButtons, rightButtonTitle, onRightButtonPress, leftButtonTitle, onLeftbackPress }) => {
  const { theme } = useContext(GlobalContext);
  

  return (
    <View
      style={{ backgroundColor: theme.mainBackGroundColor, paddingBottom: 10, height:Dimensions.get('window').height }}
    >
      {!showNavButtons ? null : (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <NavButton
              navArrowDirection="left"
              title={leftButtonTitle}
              onPress={onLeftbackPress}
            />
          </View>
          <View style={{ flex: 1 }}>
            <NavButton
              navArrowDirection="right"
              title={rightButtonTitle}
              onPress={onRightButtonPress}
            />
          </View>
        </View>
      )}

      {data.map((section, sectionIndex) => {
        return (
          <Section
            key={sectionIndex}
            title={section.title}
            rowData={section.rows}
          />
        );
      })}
    </View>
  );
};

export default PlannerView;
