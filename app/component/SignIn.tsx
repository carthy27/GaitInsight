import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function SignIn() {
  const handlePress = () => {
    Alert.alert("Button Pressed", "You pressed the sign-in button!");
  };

  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});