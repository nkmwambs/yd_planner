import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../../../Constants/Colors";
import { GlobalContext } from "../../../Context/GlobalContext";

const ItemHeader = ({ title }) => {
  const { theme } = useContext(GlobalContext);

  return (
    <View
      style={[
        styles.sectionHeaderStyle,
        {
          backgroundColor: theme.headerBackgroundColor,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: theme.headerBorderColor,
        },
      ]}
    >
      <Text
        style={[styles.sectionHeaderText, { color: theme.headerFontColor }]}
      >
        {title}
      </Text>
      <Icon
        type="font-awesome"
        name="caret-down"
        color={theme.headerFontColor}
        containerStyle={styles.iconContainerStyle}
      />
    </View>
  );
};

export default ItemHeader;

const styles = StyleSheet.create({
  sectionHeaderStyle: {
    width: Dimensions.get("window").width - 10,
    margin: 5,
    padding: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "gray",
    shadowRadius: 1,
    marginTop: 5,
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  iconContainerStyle: {
    position: "absolute",
    right: 15,
    top: 10,
    backgroundColor: "#C0C0C0",
    borderRadius: 20,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
