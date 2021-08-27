import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { Button, Icon } from "react-native-elements";

const EmptyPlaceholder = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        {props.placeholderText}
      </Text>

      <Button
        icon={<Icon type="font-awesome" name="plus" color="#ffffff" size={15} />}
        onPress={props.onClickHandler}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          marginTop:30,
        }}
        title={" "+props.buttonLabel}
      />
    </View>
  );
};

export default EmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent:"center",
  },
});
