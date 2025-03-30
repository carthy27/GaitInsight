import { auth } from '../../Model/firebase';
import { User, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { AuthSessionResult } from 'expo-auth-session'; // Import the type from main package
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
  // Store the Google Auth passed from the component
  private googleAuth: ReturnType<typeof Google.useAuthRequest> | null = null;

  // Method to set the Google Auth from the component
  setGoogleAuth(auth: ReturnType<typeof Google.useAuthRequest>) {
    this.googleAuth = auth;
    console.log('Google Auth set in controller');
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

  // This method triggers Google Sign-in process
  async handleGoogleSignIn(): Promise<AuthResponse> {
    try {
      if (!this.googleAuth) {
        return {
          success: false,
          error: 'Google Auth is not initialized'
        };
      }

      const [request, , promptAsync] = this.googleAuth;

      if (!request) {
        return {
          success: false,
          error: 'Google Auth request is not ready'
        };
      }

      // Trigger the sign-in flow
      await promptAsync();
      
      // Return success - the actual response will be handled separately
      return {
        success: true
      };
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // This method processes the Google Sign-in response
  async processGoogleSignInResponse(response: AuthSessionResult): Promise<AuthResponse> {
    try {
      if (response.type !== 'success') {
        return {
          success: false,
          error: `Google sign-in failed: ${response.type}`
        };
      }

      // Extract the ID token from the result
      const { id_token } = response.params;

      if (!id_token) {
        return {
          success: false,
          error: 'ID token is missing from Google sign-in response'
        };
      }

      // Create a Firebase credential with the ID token
      const credential = GoogleAuthProvider.credential(id_token);

      // Sign in with Firebase using the credential
      const userCredential = await signInWithCredential(auth, credential);

      console.log('Firebase user signed in:', userCredential.user.email);

      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error: any) {
      console.error('Error processing Google sign-in:', error);
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
        success: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Make sure you export the controller as a singleton instance
const authController = new AuthController();
export default authController;