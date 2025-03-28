import { auth } from '../../Model/firebase';
import { User, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { authModel } from '../../Model/authModel';

// Define the response type for authentication operations
interface AuthResponse {
  success: boolean;
  user?: User | null;
  error?: string;
}

// Google Auth configuration
const googleAuthConfig = {
  clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID, 
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID, 
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
};

class AuthController {
  private googleAuth: ReturnType<typeof Google.useAuthRequest> | undefined;

  initializeGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest(googleAuthConfig);
    this.googleAuth = [request, response, promptAsync];
    console.log('Google Auth initialized:', this.googleAuth); // Log the initialized googleAuth state
    return this.googleAuth;
  }

  async handleEmailSignIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const userCredential = await authModel.signIn(email, password);
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async handleEmailSignUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const userCredential = await authModel.signUp(email, password);
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async handleGoogleSignIn(): Promise<AuthResponse> {
    try {
      if (!this.googleAuth) {
        throw new Error('Google Auth is not initialized');
      }

      const [request, response, promptAsync] = this.googleAuth;
      console.log('Google Auth request:', request);
      console.log('Google Auth response:', response);

      // Check if we already have a response (might be from redirect)
      if (response?.type === 'success') {
        const { id_token, access_token } = response.params;
        
        // Create a credential with the token
        const credential = id_token 
          ? GoogleAuthProvider.credential(id_token)
          : GoogleAuthProvider.credential(null, access_token);

        // Sign in with Firebase
        const userCredential = await signInWithCredential(auth, credential);
        return {
          success: true,
          user: userCredential.user,
        };
      }

      // If no response yet, prompt user to sign in
      const result = await promptAsync();
      console.log('Google Auth result:', result);

      if (result.type !== 'success') {
        throw new Error(`Authentication failed: ${result.type}`);
      }

      // Get tokens from result
      const { id_token, access_token } = result.params;
      
      if (!id_token && !access_token) {
        throw new Error('No authentication tokens received');
      }
      
      // Create a credential with the tokens
      const credential = id_token 
        ? GoogleAuthProvider.credential(id_token)
        : GoogleAuthProvider.credential(null, access_token);

      // Sign in with Firebase
      const userCredential = await signInWithCredential(auth, credential);
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async handleSignOut(): Promise<AuthResponse> {
    try {
      await authModel.signOut();
      return {
        success: true,
        user: null
      };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new AuthController();