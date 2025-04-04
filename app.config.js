export default {
  expo: {
    name: "GaitInsight",
    slug: "gaitinsight",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "gaitinsight",
    userInterfaceStyle: "automatic",
    experiments: {
      typedRoutes: true,
      reactServerFunctions: true
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    plugins: [
      ["expo-camera", {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera."
      }],
      ["@react-native-google-signin/google-signin", {
        iosUrlScheme: "com.googleusercontent.apps.1026938501679-c7uctus7nc7cfusi7vduomtg1nm8nssj"
      }],
      ["expo-dev-client", {
        launchMode: "most-recent"
      }]
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.gaitinsight.firebasestorage",
      googleServicesFile: process.env.GOOGLE_SERVICES_INFOPLIST,
      buildNumber: "1"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      googleServicesFile: "./google-services.json",
      package: "com.gaitinsight.firebasestorage",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      bundler: "metro",
      config: {
        firebase: {
          authDomain: "gaitinsight-46a89.firebaseapp.com"
        }
      },
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        "Cross-Origin-Embedder-Policy": "require-corp"
      }
    },
    extra: {
      eas: {
        projectId: "dccece7a-cc19-4352-a538-6e66bcc10d16"
      }
    }
  }
};
