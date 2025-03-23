import { auth } from '../../Model/firebase';
import { signInWithCredential, User } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
//import { googleAuthConfig, createGoogleCredential } from '../../context/AuthContext';

interface AuthResponse {
  success: boolean;
  user?: User | null;
  error?: string;
}

class AuthController {
  private googleAuth: ReturnType<typeof Google.useAuthRequest> | undefined;

  // initializeGoogleAuth() {
  //   this.googleAuth = Google.useAuthRequest(googleAuthConfig);
  //   return this.googleAuth;
  // }

  async handleGoogleSignIn(): Promise<AuthResponse> {
    try {
      if (!this.googleAuth) {
        throw new Error('Google Auth is not initialized');
      }
      const [_, response, promptAsync] = this.googleAuth;
      
      if (!response) {
        const result = await promptAsync();
        if (result.type !== 'success') {
          throw new Error('Google sign in was not successful');
        }
        
        const { id_token } = result.params;
        //const credential = createGoogleCredential(id_token);
        //const userCredential = await signInWithCredential(auth, credential);
        
        return {
          success: true,
          //user: userCredential.user
        };
      }

      // Add a fallback return statement
      return {
        success: false,
        error: 'Unexpected error occurred during Google sign-in'
      };

    } catch (error: any) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async handleSignOut(): Promise<AuthResponse> {
    try {
      await auth.signOut();
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