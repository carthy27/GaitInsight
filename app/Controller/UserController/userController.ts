import { signInWithGoogle } from "../../Model/firebase";


interface LoginResponse {
  success: boolean;
  user?: any;
  error?: string;
}

class UserController {
  async handleGoogleSignIn(): Promise<LoginResponse> {
    try {
      const user = await signInWithGoogle();
      if (user) {
        console.log("Signed in as:", user.displayName);
        return {
          success: true,
          user
        };
      }
      return {
        success: false,
        error: "No user returned from Google sign in"
      };
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new UserController();