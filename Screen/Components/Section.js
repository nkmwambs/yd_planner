import React from "react";
import ItemHeader from "../GoalScreens/Components/ItemHeader";
import ContentRow from "../GoalScreens/Components/ContentRow";
import { StyleSheet, View } from "react-native";

const Section = ({ title, rowData }) => {
  return (
    <>
      <ItemHeader title={title} />
      <View style={styles.sectionContent}>
        {rowData.length == 0
          ? null
          : rowData.map((row, rowIndex) => {
              return <ContentRow key={rowIndex} tiles={row} />;
            })}
      </View>
    </>
  );
};

export default Section;

const styles = StyleSheet.create({
  sectionContent: {
    padding: 10,
  },
});
