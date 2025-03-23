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
      <Link href="./(screens)/About.tsx" style={styles.button}>{error} </Link>
      {/* <Link href="/Register"><GoogleLogo  /> </Link>   */}
      <Link href="/(screens)/Register" style={styles.button}>Register</Link>
    </View>
  );
}