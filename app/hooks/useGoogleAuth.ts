import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../Model/firebase';

// Google Auth configuration
const googleAuthConfig = {
  clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID, 
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID, 
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  // Add this to properly handle redirects
  redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || 
    (typeof window !== 'undefined' ? window.location.origin : undefined)
};

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest(googleAuthConfig);

  useEffect(() => {
    if (response?.type === 'success') {
      handleSuccess(response.params);
    } else if (response?.type === 'error') {
      setError(response.error?.message || 'Authentication failed');
    }
  }, [response]);

  const handleSuccess = async (params: { id_token?: string; access_token?: string }) => {
    try {
      setLoading(true);
      const { id_token, access_token } = params;
      
      if (!id_token && !access_token) {
        throw new Error('No authentication tokens received');
      }
      
      // Create a credential with the tokens
      const credential = id_token 
        ? GoogleAuthProvider.credential(id_token)
        : GoogleAuthProvider.credential(null, access_token);

      // Sign in with Firebase
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await promptAsync({ showInRecents: true });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    signInWithGoogle,
    request
  };
};