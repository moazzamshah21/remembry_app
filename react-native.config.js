module.exports = {
  assets: ['./assets/fonts'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-iap': {
      platforms: {
        android: null, // This will prevent auto-linking on Android
      },
    },
    '@invertase/react-native-apple-authentication': {
      platforms: {
        android: null, // This will prevent auto-linking on Android
      },
    },
  },
};