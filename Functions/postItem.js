import React from "react";
import { Alert } from "react-native";

export default postItem = async (endPoint,dataToSend) => {

    let data = []

    // Alert.alert("Confirmation", confirmation_message, [
    //     {
    //       text: "Yes",
    //       onPress: async () => {

            //setLoading(true)
  
            var formBody = [];
  
            for (var key in dataToSend) {
              var encodedKey = encodeURIComponent(key);
              var encodedValue = encodeURIComponent(dataToSend[key]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
  
            await fetch(endPoint, {
              method: "POST",
              body: formBody,
              headers: {
                //Header Defination
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              },
            })

            .then(response => response.json())
            .then(json => {
                data = json.data;
            })
            .catch(err => { console.error(err); })
            
            return data;
    //       },
    //     },
    //     {
    //       text: "Cancel",
    //       onPress: () => {
    //         //console.log("Cancel Pressed");
    //       },
    //       style: "cancel",
    //     },
    //   ])

      
}
  