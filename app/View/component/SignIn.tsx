import React from "react";
import { View, Button  } from "react-native";
import styles from "../styles/SingIn";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";
export default function SignIn() {

  const { signIn, loading, error } = useAuth();

  return (
    <View style={styles.container}>
       <Button 
        title="Sign In with Google" 
        onPress={signIn}
        disabled={loading}
      />
      <Link href="/" style={styles.button}>{error} </Link>
      <Link href="/View/About">About </Link>  
      <Link href="/View/Register" style={styles.button}>Register</Link>
    </View>
  );
}