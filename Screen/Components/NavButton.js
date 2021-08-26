import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { GlobalContext } from "../../Context/GlobalContext";

const NavButton = (props) => {
  const { theme } = useContext(GlobalContext);

  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      buttonStyle={
        { 
        margin: 5, 
        backgroundColor: theme.buttonBackgroundColor,
        borderColor:theme.navButtonBorderColor,
        borderStyle:'solid',
        borderWidth:1,
      }
    }
      icon={
        props.navArrowDirection == 'left' ? 
        <Icon
          name={"arrow-" + props.navArrowDirection}
          type="font-awesome"
          color="white"
          containerStyle={{
            position: "absolute",
            left: 5,
          }}
        />
        : 
        <Icon
          name={"arrow-" + props.navArrowDirection}
          type="font-awesome"
          color="white"
          containerStyle={{
            position: "absolute",
            right: 5,
          }}
        />
        
        
      }
    />
  );
};

export default NavButton;

const styles = StyleSheet.create({});
