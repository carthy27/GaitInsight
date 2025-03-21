import React from "react";
import { View, Text } from "react-native";
import SignIn from "./component/SignIn";

export default function Index() {

  return (
        <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Text>We are now using register.tsx as index file.</Text>
      <SignIn />
    </View>
  
  );
}
