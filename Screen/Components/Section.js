import React, { useContext } from "react";
import ItemHeader from "../GoalScreens/Components/ItemHeader";
import ContentRow from "../GoalScreens/Components/ContentRow";
import { StyleSheet, View } from "react-native";
import { GlobalContext } from "../../Context/GlobalContext";

const Section = ({ title, rowData }) => {
  const { theme } = useContext(GlobalContext);

  return (
    <>
      <ItemHeader title={title} />
     
        {rowData.length == 0 ? null : (
          <View style={[
            styles.sectionContent,
            { 
              backgroundColor: theme.sectionContentBackgroundColor, 
              borderColor:theme.contentBorderColor,
              borderStyle:'solid',
              borderWidth:1,
            },
          ]}>
            {rowData.map((row, rowIndex) => {
              return <ContentRow key={rowIndex} tiles={row} />;
            })}
          </View>
        )}
     
    </>
  );
};

export default Section;

const styles = StyleSheet.create({
  sectionContent: {
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    elevation: 5,
    shadowColor: "gray",
    shadowRadius: 1,
  },
});
