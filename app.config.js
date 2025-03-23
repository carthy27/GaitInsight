import { version } from './package.json';

export default {
  expo: {
    name: 'GaitInsight',
    slug: 'gaitinsight',
    scheme: 'gaitinsight',
    version,
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    },
    android: {
      package: "com.gaitinsight.firebasestorage",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "CAMERA",
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ]
    },
    plugins: [
      "expo-camera",
      "@react-native-google-signin/google-signin"
    ],
    extra: {
      eas: {
        projectId: "dccece7a-cc19-4352-a538-6e66bcc10d16"
      }
    }
  }
};
