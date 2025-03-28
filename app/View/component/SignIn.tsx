import React, { useEffect } from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import styles from "../styles/SingIn";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  const { signIn, loading, error, user, setShouldNavigate } = useAuth();

  // Set shouldNavigate to false when this component mounts
  useEffect(() => {
    setShouldNavigate(false);
    return () => {
      // Reset it when unmounting
      setShouldNavigate(true);
    };
  }, []);

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <Button 
            title={loading ? "Signing in..." : "Sign In with Google"} 
            onPress={signIn}
            disabled={loading}
          />
          {loading && (
            <View >
              <ActivityIndicator size="small" color="#4285F4" />
              <Text >Please wait...</Text>
            </View>
          )}
          {error && <Text >{error}</Text>}
          <Link href="/View/Register" style={styles.button}>Register</Link>
        </>
      ) : (
        <>
          <Text >Welcome, {user.displayName || user.email}</Text>
          <Link href="/View/About" style={styles.button}>Go to About</Link>
        </>
      )}
    </View>
  );
}