// import { Platform, NativeModules } from 'react-native';
// import { showMessage } from 'react-native-flash-message';

// class AppleSignInService {
//   static isAvailable() {
//     // Check if native module exists and iOS version is supported
//     try {
//       const hasNativeModule = !!NativeModules.RNAppleAuthentication;
//       return Platform.OS === 'ios' && hasNativeModule;
//     } catch (error) {
//       return false;
//     }
//   }

//   static async signIn() {
//     if (!this.isAvailable()) {
//       showMessage({
//         message: 'Apple Sign-In is not available on this device',
//         type: 'warning',
//       });
//       return null;
//     }

//     try {
//       // Use the native module directly
//       const result = await NativeModules.RNAppleAuthentication.performRequest({
//         requestedOperation: 'LOGIN',
//         requestedScopes: ['EMAIL', 'FULL_NAME'],
//       });
      
//       return {
//         success: true,
//         user: {
//           id: result.user,
//           email: result.email,
//           firstName: result.fullName?.givenName,
//           lastName: result.fullName?.familyName,
//         },
//         data: result
//       };
//     } catch (error) {
//       if (error.code === '1001') { // Cancelled by user
//         console.log('Apple Sign-In cancelled by user');
//         return null;
//       }
      
//       console.error('Apple Sign-In error:', error);
      
//       // Fallback to mock data if native module fails
//       return this.fallbackSignIn();
//     }
//   }

//   static async fallbackSignIn() {
//     // Mock implementation for testing
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           success: true,
//           user: {
//             id: 'mock_apple_user_' + Date.now(),
//             email: 'test.user@apple.com',
//             firstName: 'Test',
//             lastName: 'User',
//           },
//           data: {
//             identityToken: 'mock_token_' + Date.now(),
//             authorizationCode: 'mock_code_' + Date.now(),
//             user: 'mock_apple_user_' + Date.now()
//           }
//         });
//       }, 1000);
//     });
//   }
// }

// export default AppleSignInService;


// services/AppleSignInService.js
import { appleAuth } from '@invertase/react-native-apple-authentication';

class AppleSignInService {
  static isAvailable = async () => {
    try {
      return appleAuth.isSupported;
    } catch (error) {
      console.error('Apple Sign-In availability check failed:', error);
      return false;
    }
  };

  static signIn = async () => {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Get current authentication state
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      // Check if authentication was successful
      if (credentialState === appleAuth.State.AUTHORIZED) {
        return {
          success: true,
          data: appleAuthRequestResponse,
          user: {
            id: appleAuthRequestResponse.user,
            email: appleAuthRequestResponse.email,
            firstName: appleAuthRequestResponse.fullName?.givenName || 'Apple User',
            lastName: appleAuthRequestResponse.fullName?.familyName || '',
          }
        };
      } else {
        throw new Error('Apple Sign-In not authorized');
      }
    } catch (error) {
      console.error('Apple Sign-In error:', error);
      throw error;
    }
  };
}

export default AppleSignInService;