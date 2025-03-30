import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import authController from '../Controller/AuthController/authController';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../Model/firebase';
import * as Google from 'expo-auth-session/providers/google';

export default function GaitStarted() { 
    const [logoImage, setLogoImage] = useState<ImageSourcePropType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { user, shouldNavigate, setShouldNavigate } = useAuth();
    
    // Initialize Google Auth Request for the controller to use
    const googleAuth = Google.useAuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        
    });
   
    
    // Set the Google Auth in the controller
    useEffect(() => {
        // Make the auth hook result available to the controller
        authController.setGoogleAuth(googleAuth);
        
        console.log("Google Auth initialized in controller:", !!googleAuth[0]);
    }, [googleAuth]);
  
    // Load the logo
    useEffect(() => {
        try {
            const image = require('../assets/LogoGaitInsight.png');
            setLogoImage(image);
        } catch (error) {
            console.error("Failed to load logo image:", error);
        }
    }, []);

    // Handle Google sign-in response
    useEffect(() => {
        const [, response] = googleAuth;
        
        if (response) {
            const processResponse = async () => {
                try {
                    setIsLoading(true);
                    
                    const result = await authController.processGoogleSignInResponse(response);
                    
                    if (result.success) {
                        setShouldNavigate(true);
                    } else {
                        setErrorMsg(result.error || "Failed to sign in with Google");
                    }
                } catch (error) {
                    console.error("Error processing Google response:", error);
                    setErrorMsg(error instanceof Error ? error.message : "Unknown error");
                } finally {
                    setIsLoading(false);
                }
            };
            
            processResponse();
        }
    }, [googleAuth[1], setShouldNavigate]);

    // Navigation logic with useEffect
    useEffect(() => {
        if (user && shouldNavigate) {
            console.log("Navigating to dashboard...");
            router.replace("/(tabs)/Dashboard");
        }
    }, [user, shouldNavigate]);

    // Handle navigation to regular sign in
    const navigateToSignIn = () => {
        router.push('/(auth)/Register');
    };

    // Extract the request to check if Google Auth is ready
    const [request] = googleAuth;

    return (
        <View style={styles.container}>
            {/* Logo at the top of the page */}
            <View style={styles.logoContainer}>
                {logoImage && (
                    <Image 
                        source={logoImage}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                )}
            </View>
            
            {/* Welcome content */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Welcome to GaitInsight</Text>
                <Text style={styles.subtitle}>
                    Let's Gait Started!
                </Text>
                
                <View style={styles.buttonContainer}>

                    {/* Regular Sign In Button */}
                    <TouchableOpacity 
                        style={[
                            styles.emailButton,
                            isLoading && styles.disabledButton
                        ]} 
                        onPress={navigateToSignIn}
                        disabled={isLoading}
                    >
                        <Ionicons name="mail" size={24} color="#fff" style={styles.buttonIcon} />
                        <Text style={styles.emailButtonText}>Sign in with Email</Text>
                    </TouchableOpacity>
                    
                    {/* Display error message if any */}
                    {errorMsg && (
                        <Text style={styles.errorText}>{errorMsg}</Text>
                    )}
                    
                    <Text style={styles.termsText}>
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </Text>
                </View>
            </View>
        </View>
    );
}

// Styles remain unchanged
const styles = StyleSheet.create({
    // Your existing styles...
    container: {
        flex: 1,
        backgroundColor: 'darkblue',
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonIcon: {
        marginRight: 10,
    },
    googleButtonText: {
        color: '#444',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emailButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285F4',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    emailButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    termsText: {
        fontSize: 12,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 24,
        paddingHorizontal: 20,
    },
    errorText: {
        color: '#FF6B6B',
        marginTop: 16,
        textAlign: 'center',
        fontSize: 14,
        padding: 10,
    }
});