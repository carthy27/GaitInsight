import React from "react";
import { View, Button, Alert } from "react-native";
import styles from "../styles/SingIn";
import { Link } from "expo-router";
import GoogleLogo from "../assets/google";
import { useAuth } from '../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function SignIn() {
  const { user } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handlePress = () => {
    Alert.alert("Button Pressed", "You pressed the sign-in button!");
  };

  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={handlePress} />
      <Link href="/about" style={styles.button}>About  </Link>
      {/* <Link href="/Register"><GoogleLogo  /> </Link>   */}
      <Link href="/Register" style={styles.button}>Register</Link>
    </View>
  );
}