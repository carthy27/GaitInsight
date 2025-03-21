import React from "react";
import { View, Button,  Alert } from "react-native";
import styles from "../styles/SingIn"; 
import { Link } from "expo-router";
import GoogleLogo from "../assets/google";
export default function SignIn() {
  const handlePress = () => {
    Alert.alert("Button Pressed", "You pressed the sign-in button!");
  };

  return (
    <View style={styles.container}>
      <Link href="/about" style={styles.button}>About  </Link>
      {/* <Link href="/Register"><GoogleLogo  /> </Link>   */}
      <Link href="/Register" style={styles.button}>Register</Link>
    </View>
  );
}