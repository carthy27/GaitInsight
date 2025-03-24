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
  clientId: '1026938501679-c7uctus7nc7cfusi7vduomtg1nm8nssj.apps.googleusercontent.com',
  androidClientId: '1026938501679-c7uctus7nc7cfusi7vduomtg1nm8nssj.apps.googleusercontent.com',
  iosClientId: '1026938501679-c7uctus7nc7cfusi7vduomtg1nm8nssj.apps.googleusercontent.com',
};

class AuthController {
  private googleAuth: ReturnType<typeof Google.useAuthRequest> | undefined;

  initializeGoogleAuth() {
    this.googleAuth = Google.useAuthRequest(googleAuthConfig);
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
      const [_, response, promptAsync] = this.googleAuth;
      
      if (!response) {
        const result = await promptAsync();
        if (result.type !== 'success') {
          throw new Error('Google sign in was not successful');
        }
        
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        
        return {
          success: true,
          user: userCredential.user
        };
      }

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