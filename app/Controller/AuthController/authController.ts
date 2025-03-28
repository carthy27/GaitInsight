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
      console.log('Google Auth state before sign-in:', this.googleAuth); // Log googleAuth state before sign-in

      if (!this.googleAuth) {
        throw new Error('Google Auth is not initialized');
      }

      const [request, response, promptAsync] = this.googleAuth;

      console.log('Google Auth request:', request); // Log the request object
      console.log('Google Auth response:', response); // Log the response object

      // Prompt the user to sign in
      const result = await promptAsync();

      console.log('Google Auth result:', result); // Log the result of promptAsync

      if (result.type !== 'success') {
        throw new Error(result.type);
      }

      // Extract the ID token from the result
      const { id_token } = result.params;

      if (!id_token) {
        throw new Error('ID token is missing from Google sign-in response');
      }

      console.log('Google Auth ID token:', id_token); // Log the ID token

      // Create a Firebase credential with the ID token
      const credential = GoogleAuthProvider.credential(id_token);

      // Sign in with Firebase using the credential
      const userCredential = await signInWithCredential(auth, credential);

      console.log('Firebase user credential:', userCredential); // Log the Firebase user credential

      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error: any) {
      console.error('Google sign-in error:', error); // Log the error
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