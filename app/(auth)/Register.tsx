import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, ImageSourcePropType } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthController from '../Controller/AuthController/authController';
import { router, Stack } from 'expo-router';
import { registerStyles as styles } from '../View/styles/RegisterStyles';

// Add this to hide the header
export const screenOptions = {
  headerShown: false,
};

export default function RegisterScreen() {
  // Form state for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<ImageSourcePropType | null>(null);
  
  // Access auth context (for current user and navigation)
  const { user, shouldNavigate, setShouldNavigate } = useAuth();
  
  // Load the logo
  useEffect(() => {
    try {
      const image = require('../assets/LogoGaitInsight.png');
      setLogoImage(image);
    } catch (error) {
      console.error("Failed to load logo image:", error);
    }
  }, []);
  
  // Navigation logic with useEffect to avoid navigation during render
  useEffect(() => {
    // Debug log for your navigation state
    console.log(`Navigation check: user=${!!user}, shouldNavigate=${shouldNavigate}, loading=${isLoading}`);
    
    // If user is authenticated and navigation is allowed, redirect to dashboard
    if (user && shouldNavigate) {
      router.replace("/(tabs)/Dashboard");
    }
  }, [user, shouldNavigate, isLoading]);
  
  // Handle email/password login
  const handleLogin = async () => {
    // Input validation
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      // Call the auth controller to handle sign in
      const result = await AuthController.handleEmailSignIn(email, password);
      
      if (result.success) {
        console.log('Login successful');
        setShouldNavigate(true); // Enable navigation after login
        // Navigation will be handled by useEffect
      } else {
        setErrorMessage(result.error || 'Failed to sign in');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account creation
  const handleRegister = async () => {
    // Input validation
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      // Call the auth controller to handle sign up
      const result = await AuthController.handleEmailSignUp(email, password);
      
      if (result.success) {
        handleLogin();
        Alert.alert('Success', 'Account created successfully');
        // No need to navigate here, the onAuthStateChanged listener in AuthContext will handle it
      } else {
        setErrorMessage(result.error || 'Failed to create account');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      {logoImage && (
        <Image 
          source={logoImage}
          style={styles.logo}
          resizeMode="contain"
        />
      )}
      
      <Text style={styles.title}>Account Access</Text>
      
      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        returnKeyType="done"
        onSubmitEditing={handleLogin}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {/* Error Message */}
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      
      {/* Login Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
      
      {/* Register Button */}
      <TouchableOpacity 
        style={[styles.button, styles.registerButton]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#25292e" />
        ) : (
          <Text style={[styles.buttonText, styles.registerButtonText]}>Create Account</Text>
        )}
      </TouchableOpacity>
      
      {/* Go Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
