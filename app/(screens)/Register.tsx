import React from "react";
import { Text, View } from "react-native";

import SignIn from "../component/SignIn";


export default function Register() {
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
