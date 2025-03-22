import React from "react";
import { useState } from "react"; 
import { View, Button  } from "react-native";
import styles from "../styles/SingIn";
import { Link, router } from "expo-router";
import { signInWithGoogle } from "../firebase/firebase";

export default function SignIn() {

  const [error, setError] = useState<string | null>(null); // State for error
  const [loading, setLoading] = useState(false);  // State for loading indicator

  const handleLogin = async (): Promise<void> => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true); // Start loading indicator
    setError(null);   // Clear any previous error
  
    try {
      const user = await signInWithGoogle(); // Try to sign in with Google
      if (user) {
        console.log("Signed in as:", user.displayName); // Log the user name to console
        router.push("/About"); // Redirect to the profile page on success
      }
    } catch (error: any) {
      setError(error.message); // Capture any error and display it
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false); // Stop loading indicator after sign-in attempt
    }
  };
  
  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={handleLogin} />
      <Link href="/about" style={styles.button}>About  </Link>
      {/* <Link href="/Register"><GoogleLogo  /> </Link>   */}
      <Link href="/Register" style={styles.button}>Register</Link>
    </View>
  );
}