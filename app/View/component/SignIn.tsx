import React, { useEffect } from "react";
import { View, Button, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import SignOutButton from "./SignOut"; // Import the SignOutButton component

export default function SignIn() {
  const { signIn, loading, error, user, setShouldNavigate, signOut } = useAuth();

  // Enable navigation only when user explicitly signs in
  const handleSignIn = async () => {
    // First enable navigation
    setShouldNavigate(true);
    // Then sign in
    await signIn();
  };

  // Handle sign out and navigation to Register
  const handleSignOut = async () => {
    setShouldNavigate(true);
    await signOut();
    router.replace('/(auth)/Register');
  };

  // If user is already signed in, show a different UI
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, {user.displayName || user.email}</Text>
        <TouchableOpacity 
          style={styles.dashboardButton} 
          onPress={() => {
            setShouldNavigate(true);
            router.push('/(tabs)/Dashboard');
          }}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
        
        {/* Use the SignOutButton component or the handleSignOut method */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button 
        title={loading ? "Signing in..." : "Sign In with Google"} 
        onPress={handleSignIn}
        disabled={loading}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#4285F4" />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Link href="/(auth)/Register" style={styles.registerLink}>Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  dashboardButton: {
    backgroundColor: '#4285F4',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 20,
    padding: 12,
    width: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 5,
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  registerLink: {
    marginTop: 20,
    color: '#4285F4',
    fontWeight: 'bold',
  }
});