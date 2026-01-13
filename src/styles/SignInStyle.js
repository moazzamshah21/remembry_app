// import {StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
// import {ThemeColors, ThemeFonts} from '../utils/Theme';
// const {width, height} = Dimensions.get('window');
// const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// export default StyleSheet.create({
//   ScrollViewContentContainerStyle: {
//     // flex: 1,
//   },
//   MainContainer: {
//     flex: 1,
//     backgroundColor: ThemeColors.WHITE,
//   },
//   LogoContainer: {
//     height: 200,
//     backgroundColor: ThemeColors.WHITE,
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ContentContainer: {
//     backgroundColor: ThemeColors.WHITE,
//     flexGrow: 1,
//     padding: 20,
//     paddingBottom: 0,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   ForgetPasswordTextContainer: {
//     paddingVertical: 10,
//     marginBottom: 35,
//   },
//   ForgetPasswordTextTouch: {
//     alignSelf: 'flex-end',
//   },
//   ForgetPasswordText: {
//     fontSize: 15,
//     color: ThemeColors.BLACK,
//     fontFamily: ThemeFonts.LIGHT,
//     textDecorationLine: 'underline',
//   },
//   SignUpTextContainer: {
//     marginVertical: 15,
//   },
//   SignUpTextTouch: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   SignUpText: {
//     fontSize: 15,
//     color: ThemeColors.LIGHT_GRAY,
//     fontFamily: ThemeFonts.LIGHT,
//     textDecorationLine: 'underline',
//   },
//   SignUpText2: {
//     fontSize: 15,
//     color: ThemeColors.BLACK,
//     fontFamily: ThemeFonts.REGULAR,
//     textDecorationLine: 'none',
//   },
//   SocialLoginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     //flexGrow: 1,
//   },
//   SocialLoginCircleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 30,
//     height: 30,
//     backgroundColor: ThemeColors.BLACK,
//     borderRadius: 15,
//     margin: 6,
//   },
// });


import {StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    // flex: 1,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  LogoContainer: {
    height: 200,
    backgroundColor: ThemeColors.WHITE,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentContainer: {
    backgroundColor: ThemeColors.WHITE,
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ForgetPasswordTextContainer: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  ForgetPasswordTextTouch: {
    alignSelf: 'flex-end',
  },
  ForgetPasswordText: {
    fontSize: 15,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.LIGHT,
    textDecorationLine: 'underline',
  },
  SignUpTextContainer: {
    marginVertical: 15,
  },
  SignUpTextTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  SignUpText: {
    fontSize: 15,
    color: ThemeColors.LIGHT_GRAY,
    fontFamily: ThemeFonts.LIGHT,
    textDecorationLine: 'underline',
  },
  SignUpText2: {
    fontSize: 15,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.REGULAR,
    textDecorationLine: 'none',
  },
  SocialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    //flexGrow: 1,
  },
  SocialLoginCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: ThemeColors.BLACK,
    borderRadius: 15,
    margin: 6,
  },
  // Add only these two new styles for Apple Sign-In button
  // AppleSignInButtonContainer: {
  //   alignItems: 'center',
  //   marginVertical: 15,
  // },
  // AppleSignInButton: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  // },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // centers horizontally
    alignItems: 'center',     // centers vertically
    gap: 15,                  // space between buttons (React Native 0.71+)
    marginTop: 0,
  },
  AppleSignInButtonContainer: {
    // Optional: You can remove this if not needed
  },
  AppleSignInButton: {
    width: 35,
    height: 35,
    borderRadius: 30,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});