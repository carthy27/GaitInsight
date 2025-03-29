import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthController from '../Controller/AuthController/authController';
import { router } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';

export default function RegisterScreen() {
  // Form state for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Access auth context (for current user and navigation)
  const { user, setShouldNavigate } = useAuth();
  
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
      setShouldNavigate(true); // Enable navigation after login

      if (result.success) {
        console.log('Login successful');
        router.replace("/View/Dashboard") // Navigate to the dashboard
        // No need to navigate here, the onAuthStateChanged listener in AuthContext will handle it
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4285F4', // Google blue
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  registerButtonText: {
    color: '#4285F4',
  },
  errorText: {
    color: '#FF6B6B',
    marginVertical: 10,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 30,
  },
  backButtonText: {
    color: '#aaa',
    fontSize: 14,
  },
});
