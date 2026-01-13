// // import React, { useState, useEffect } from 'react';
// // import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   Image,
// //   ScrollView,
// //   useColorScheme,
// //   Alert,
// // } from 'react-native';
// // import TextBox from '../components/TextBox';
// // import Button from '../components/Button';
// // import { ThemeColors } from '../utils/Theme';
// // import styles from '../styles/SignInStyle';
// // import { validateEmail } from '../utils/Helper';
// // import { showMessage } from 'react-native-flash-message';
// // import AuthenticationService from '../services/Authentication/AuthenticationService';
// // import { CommonActions } from '@react-navigation/native';
// // import LocalStorage from '../utils/LocalStorage';
// // import { useDispatch, useSelector } from 'react-redux';
// // import * as reminderAction from '../actions/Reminder/ReminderAction';

// // import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

// // const SignInScreen = ({ navigation }) => {
// //   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

// //   const dispatch = useDispatch();
// //   const rnBiometrics = new ReactNativeBiometrics();

// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [availableSensor, setAvailableSensor] = useState(false);
// //   const [biometryType, setBiometryType] = useState(null);

// //   useEffect(() => {
// //     const onLoad = async () => {
// //       const { available, biometryType, error } =
// //         await rnBiometrics.isSensorAvailable();
// //       setAvailableSensor(available);
// //       setBiometryType(biometryType);
// //     };
// //     onLoad();
// //   }, []);

// //   const handleOnPressSignIn = async () => {
// //     if (!email) {
// //       showMessage({
// //         message: 'Email must be required',
// //         type: 'danger',
// //       });
// //       return;
// //     }
// //     if (!validateEmail(email.trim())) {
// //       showMessage({
// //         message: 'Invalid Email Address',
// //         type: 'danger',
// //       });
// //       return;
// //     }
// //     if (!password) {
// //       showMessage({
// //         message: 'Password must be required',
// //         type: 'danger',
// //       });
// //       return;
// //     }

// //     var payload = {
// //       email: email.trim().toLowerCase(),
// //       password,
// //     };

// //     var response = await AuthenticationService.Login(payload);
    
// //     if (response) {
// //       if (response?.success) {
// //         LocalStorage.SetData('token', response?.token);
// //         dispatch(reminderAction.fetchAllReminders());
// //         dispatch(reminderAction.fetchAllUnplannedStopsReminders());
// //         dispatch(reminderAction.fetchAllRemembranceItems());
// //         dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
// //         dispatch(reminderAction.fetchAllDailySchedule());
// //         dispatch(reminderAction.fetchAllFeeds());
// //         const { available, biometryType } =
// //           await rnBiometrics.isSensorAvailable();
// //         if (
// //           available &&
// //           (biometryType === BiometryTypes.FaceID ||
// //             biometryType === BiometryTypes.TouchID ||
// //             biometryType === BiometryTypes.Biometrics)
// //         ) {
// //           Alert.alert(
// //             biometryType == BiometryTypes.FaceID ? 'Face ID' : 'Touch ID',
// //             biometryType == BiometryTypes.FaceID
// //               ? 'Would you like to enable Face ID authentication for the next time?'
// //               : 'Would you like to enable Touch ID authentication for the next time?',
// //             [
// //               {
// //                 text: 'Yes please',
// //                 onPress: async () => {
// //                   const { publicKey } = await rnBiometrics.createKeys();
// //                   var saveLocalData = {
// //                     publicKey,
// //                     email: email.trim().toLowerCase(),
// //                     password,
// //                   };
// //                   LocalStorage.SetData(
// //                     'faceiddata',
// //                     JSON.stringify(saveLocalData),
// //                   );
// //                   navigation.dispatch(
// //                     CommonActions.reset({
// //                       index: 1,
// //                       routes: [{ name: 'Dashboard' }],
// //                     }),
// //                   );
// //                   if (
// //                     response?.isQuestionSubmit == true &&
// //                     response?.isQuestionApproved == true
// //                   ) {
// //                     LocalStorage.SetData('isQuestionSubmit', 'true');
// //                     LocalStorage.SetData('isQuestionApproved', 'true');
// //                     navigation.dispatch(
// //                       CommonActions.reset({
// //                         index: 1,
// //                         routes: [{ name: 'Dashboard' }],
// //                       }),
// //                     );
// //                   } else if (response?.isQuestionSubmit == false) {
// //                     LocalStorage.SetData('isQuestionSubmit', 'false');
// //                     LocalStorage.SetData('isQuestionApproved', 'false');
// //                     navigation.dispatch(
// //                       CommonActions.reset({
// //                         index: 1,
// //                         routes: [
// //                           { name: 'SignIn' },
// //                           {
// //                             name: 'QuestionScreen',
// //                           },
// //                         ],
// //                       }),
// //                     );
// //                   } else if (response?.isQuestionApproved == false) {
// //                     LocalStorage.SetData('isQuestionSubmit', 'true');
// //                     LocalStorage.SetData('isQuestionApproved', 'false');
// //                     navigation.dispatch(
// //                       CommonActions.reset({
// //                         index: 1,
// //                         routes: [
// //                           { name: 'SignIn' },
// //                           {
// //                             name: 'TimerScreen',
// //                           },
// //                         ],
// //                       }),
// //                     );
// //                   }
// //                 },
// //               },
// //               {
// //                 text: 'Cancel',
// //                 style: 'cancel',
// //                 onPress: async () => {
// //                   navigation.dispatch(
// //                     CommonActions.reset({
// //                       index: 1,
// //                       routes: [{ name: 'Dashboard' }],
// //                     }),
// //                   );
// //                   if (
// //                     response?.isQuestionSubmit == true &&
// //                     response?.isQuestionApproved == true
// //                   ) {
// //                     LocalStorage.SetData('isQuestionSubmit', 'true');
// //                     LocalStorage.SetData('isQuestionApproved', 'true');
// //                     navigation.dispatch(
// //                       CommonActions.reset({
// //                         index: 1,
// //                         routes: [{ name: 'Dashboard' }],
// //                       }),
// //                     );
// //                   } else if (response?.isQuestionSubmit == false) {
// //                     LocalStorage.SetData('isQuestionSubmit', 'false');
// //                     LocalStorage.SetData('isQuestionApproved', 'false');
// //                     navigation.dispatch(
// //                       CommonActions.reset({
// //                         index: 1,
// //                         routes: [
// //                           { name: 'SignIn' },
// //                           {
// //                             name: 'QuestionScreen',
// //                           },
// //                         ],
// //                       }),
// //                     );
// //                   } else if (response?.isQuestionApproved == false) {
// //                     LocalStorage.SetData('isQuestionSubmit', 'true');
// //                     LocalStorage.SetData('isQuestionApproved', 'false');
// //                     navigation.dispatch(
// //                       CommonActions.reset({
// //                         index: 1,
// //                         routes: [
// //                           { name: 'SignIn' },
// //                           {
// //                             name: 'TimerScreen',
// //                           },
// //                         ],
// //                       }),
// //                     );
// //                   }
// //                 },
// //               },
// //             ],
// //           );
// //         } else {
// //           if (
// //             response?.isQuestionSubmit == true &&
// //             response?.isQuestionApproved == true
// //           ) {
// //             LocalStorage.SetData('isQuestionSubmit', 'true');
// //             LocalStorage.SetData('isQuestionApproved', 'true');
// //             navigation.dispatch(
// //               CommonActions.reset({
// //                 index: 1,
// //                 routes: [{ name: 'Dashboard' }],
// //               }),
// //             );
// //           } else if (response?.isQuestionSubmit == false) {
// //             LocalStorage.SetData('isQuestionSubmit', 'false');
// //             LocalStorage.SetData('isQuestionApproved', 'false');
// //             navigation.dispatch(
// //               CommonActions.reset({
// //                 index: 1,
// //                 routes: [
// //                   { name: 'SignIn' },
// //                   {
// //                     name: 'QuestionScreen',
// //                   },
// //                 ],
// //               }),
// //             );
// //           } else if (response?.isQuestionApproved == false) {
// //             LocalStorage.SetData('isQuestionSubmit', 'true');
// //             LocalStorage.SetData('isQuestionApproved', 'false');
// //             navigation.dispatch(
// //               CommonActions.reset({
// //                 index: 1,
// //                 routes: [
// //                   { name: 'SignIn' },
// //                   {
// //                     name: 'TimerScreen',
// //                   },
// //                 ],
// //               }),
// //             );
// //           }
// //         }
// //       } else {
// //         showMessage({
// //           message: response?.message,
// //           type: 'danger',
// //         });
// //       }
// //     }
// //   };

// //   return (
// //     <ScrollView
// //       style={{
// //         backgroundColor:
// //           ThemeMode === 'dark'
// //             ? ThemeColors.DARK_THEME_COLOR
// //             : ThemeColors?.WHITE,
// //       }}
// //       contentContainerStyle={[
// //         styles.ScrollViewContentContainerStyle,
// //         {
// //           backgroundColor:
// //             ThemeMode === 'dark'
// //               ? ThemeColors.DARK_THEME_COLOR
// //               : ThemeColors?.WHITE,
// //         },
// //       ]}
// //       showsVerticalScrollIndicator={false}>
// //       <View
// //         style={[
// //           styles.MainContainer,
// //           {
// //             backgroundColor:
// //               ThemeMode === 'dark'
// //                 ? ThemeColors.DARK_THEME_COLOR
// //                 : ThemeColors?.WHITE,
// //           },
// //         ]}>
// //         <View
// //           style={[
// //             styles.LogoContainer,
// //             {
// //               backgroundColor:
// //                 ThemeMode === 'dark'
// //                   ? ThemeColors.DARK_THEME_COLOR
// //                   : ThemeColors?.WHITE,
// //             },
// //           ]}>
// //           <Image
// //             source={require('../../assets/images/app-icon.png')}
// //             style={{ width: 200, height: 200 }}
// //             resizeMode="contain"
// //           />
// //         </View>
// //         <View
// //           style={[
// //             styles.ContentContainer,
// //             {
// //               backgroundColor:
// //                 ThemeMode === 'dark'
// //                   ? ThemeColors.DARK_THEME_COLOR
// //                   : ThemeColors?.WHITE,
// //             },
// //           ]}>
// //           <TextBox
// //             onChangeText={value => setEmail(value)}
// //             label={'Email Address'}
// //             value={email}
// //             textBoxStyle={{
// //               backgroundColor:
// //                 ThemeMode === 'dark'
// //                   ? ThemeColors.DARK_THEME_COLOR
// //                   : ThemeColors?.WHITE,
// //               color:
// //                 ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
// //             }}
// //           />
// //           <TextBox
// //             onChangeText={value => setPassword(value)}
// //             label={'Password'}
// //             value={password}
// //             secureTextEntry={true}
// //             textBoxStyle={{
// //               backgroundColor:
// //                 ThemeMode === 'dark'
// //                   ? ThemeColors.DARK_THEME_COLOR
// //                   : ThemeColors?.WHITE,
// //               color:
// //                 ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
// //             }}
// //           />
// //           <View style={styles.ForgetPasswordTextContainer}>
// //             <TouchableOpacity
// //               style={styles.ForgetPasswordTextTouch}
// //               onPress={() => navigation.navigate('ForgotPasswordEmail')}>
// //               <Text
// //                 style={[
// //                   styles.ForgetPasswordText,
// //                   {
// //                     color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
// //                   },
// //                 ]}>
// //                 Forgot Password?
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //           <Button title={`Sign In`} onPress={handleOnPressSignIn} />
// //           <View style={styles.SignUpTextContainer}>
// //             <TouchableOpacity
// //               style={styles.SignUpTextTouch}
// //               onPress={() => navigation.navigate('SignUp')}>
// //               <Text style={styles.SignUpText}>Don't have account?</Text>
// //               <Text
// //                 style={[
// //                   styles.SignUpText2,
// //                   {
// //                     color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
// //                   },
// //                 ]}>
// //                 {' '}
// //                 Sign Up
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //           {availableSensor && (
// //             <TouchableOpacity
// //               onPress={async () => {
// //                 var localdata = await LocalStorage.GetData('faceiddata');
// //                 if (
// //                   localdata &&
// //                   localdata !== undefined &&
// //                   localdata !== null
// //                 ) {
// //                   localdata = JSON.parse(localdata);
// //                   const payload = {
// //                     email: localdata.email,
// //                     password: localdata.password,
// //                   };
// //                   const { success, signature } =
// //                     await rnBiometrics.createSignature({
// //                       promptMessage: 'Sign in',
// //                       payload: localdata.email,
// //                     });
// //                   if (!success) {
// //                     showMessage({
// //                       message:
// //                         'Something went wrong during authentication with Face ID. Please try again.',
// //                       type: 'danger',
// //                     });
// //                     return;
// //                   }
// //                   const finalpayload = {
// //                     email: localdata.email,
// //                     password: localdata.password,
// //                     publicKey: localdata.publicKey,
// //                     signature,
// //                   };
// //                   var response = await AuthenticationService.FaceIDLogin(
// //                     finalpayload,
// //                   );
// //                   if (response) {
// //                     if (response?.success) {
// //                       LocalStorage.SetData('token', response?.token);
// //                       dispatch(reminderAction.fetchAllReminders());
// //                       dispatch(reminderAction.fetchAllUnplannedStopsReminders());
// //                       dispatch(reminderAction.fetchAllRemembranceItems());
// //                       dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
// //                       dispatch(reminderAction.fetchAllDailySchedule());
// //                       dispatch(reminderAction.fetchAllFeeds());
// //                       if (
// //                         response?.isQuestionSubmit == true &&
// //                         response?.isQuestionApproved == true
// //                       ) {
// //                         LocalStorage.SetData('isQuestionSubmit', 'true');
// //                         LocalStorage.SetData('isQuestionApproved', 'true');
// //                         navigation.dispatch(
// //                           CommonActions.reset({
// //                             index: 1,
// //                             routes: [{ name: 'Dashboard' }],
// //                           }),
// //                         );
// //                       } else if (response?.isQuestionSubmit == false) {
// //                         LocalStorage.SetData('isQuestionSubmit', 'false');
// //                         LocalStorage.SetData('isQuestionApproved', 'false');
// //                         navigation.dispatch(
// //                           CommonActions.reset({
// //                             index: 1,
// //                             routes: [
// //                               { name: 'SignIn' },
// //                               {
// //                                 name: 'QuestionScreen',
// //                               },
// //                             ],
// //                           }),
// //                         );
// //                       } else if (response?.isQuestionApproved == false) {
// //                         LocalStorage.SetData('isQuestionSubmit', 'true');
// //                         LocalStorage.SetData('isQuestionApproved', 'false');
// //                         navigation.dispatch(
// //                           CommonActions.reset({
// //                             index: 1,
// //                             routes: [
// //                               { name: 'SignIn' },
// //                               {
// //                                 name: 'TimerScreen',
// //                               },
// //                             ],
// //                           }),
// //                         );
// //                       }
// //                     } else {
// //                       showMessage({
// //                         message: response?.message,
// //                         type: 'danger',
// //                       });
// //                     }
// //                   }
// //                 } else {
// //                   showMessage({
// //                     message:
// //                       'No credentials found. You need login one time manually',
// //                     type: 'warning',
// //                   });
// //                 }
// //               }}>
// //               <View
// //                 style={{
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                   padding: 15,
// //                 }}>
// //                 <MaterialCommunityIcons
// //                   name={
// //                     biometryType == BiometryTypes.FaceID
// //                       ? 'line-scan'
// //                       : 'fingerprint'
// //                   }
// //                   style={{
// //                     color:
// //                       ThemeMode === 'dark'
// //                         ? ThemeColors.WHITE
// //                         : ThemeColors.DARK_THEME_COLOR,
// //                   }}
// //                   size={40}
// //                 />
// //                 <Text
// //                   style={[
// //                     styles.SignUpText2,
// //                     {
// //                       color:
// //                         ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
// //                     },
// //                   ]}>
// //                   {biometryType == BiometryTypes.FaceID
// //                     ? 'Login With Face ID'
// //                     : 'Login With Touch ID'}
// //                 </Text>
// //               </View>
// //             </TouchableOpacity>
// //           )}
// //           {/*<View style={styles.SocialLoginContainer}>
// //             <View
// //               style={[
// //                 styles.SocialLoginCircleContainer,
// //                 {
// //                   backgroundColor:
// //                     ThemeMode === 'dark'
// //                       ? ThemeColors?.WHITE
// //                       : ThemeColors.BLACK,
// //                 },
// //               ]}>
// //               <FontAwesome5Pro
// //                 name="apple"
// //                 style={{
// //                   color:
// //                     ThemeMode === 'dark'
// //                       ? ThemeColors.DARK_THEME_COLOR
// //                       : ThemeColors.WHITE,
// //                 }}
// //                 size={20}
// //               />
// //             </View>
// //             <View
// //               style={[
// //                 styles.SocialLoginCircleContainer,
// //                 {
// //                   backgroundColor:
// //                     ThemeMode === 'dark'
// //                       ? ThemeColors?.WHITE
// //                       : ThemeColors.BLACK,
// //                 },
// //               ]}>
// //               <FontAwesome5Pro
// //                 name="facebook-f"
// //                 style={{
// //                   color:
// //                     ThemeMode === 'dark'
// //                       ? ThemeColors.DARK_THEME_COLOR
// //                       : ThemeColors.WHITE,
// //                 }}
// //                 size={20}
// //               />
// //             </View>
// //             <View
// //               style={[
// //                 styles.SocialLoginCircleContainer,
// //                 {
// //                   backgroundColor:
// //                     ThemeMode === 'dark'
// //                       ? ThemeColors?.WHITE
// //                       : ThemeColors.BLACK,
// //                 },
// //               ]}>
// //               <FontAwesome5Pro
// //                 name="google"
// //                 style={{
// //                   color:
// //                     ThemeMode === 'dark'
// //                       ? ThemeColors.DARK_THEME_COLOR
// //                       : ThemeColors.WHITE,
// //                 }}
// //                 size={20}
// //               />
// //             </View>
// //           </View>*/}
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // export default SignInScreen;


// import React, { useState, useEffect } from 'react';
// import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   useColorScheme,
//   Alert,
// } from 'react-native';
// import TextBox from '../components/TextBox';
// import Button from '../components/Button';
// import { ThemeColors } from '../utils/Theme';
// import styles from '../styles/SignInStyle';
// import { validateEmail } from '../utils/Helper';
// import { showMessage } from 'react-native-flash-message';
// import AuthenticationService from '../services/Authentication/AuthenticationService';
// import { CommonActions } from '@react-navigation/native';
// import LocalStorage from '../utils/LocalStorage';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reminderAction from '../actions/Reminder/ReminderAction';

// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

// const SignInScreen = ({ navigation }) => {
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

//   const dispatch = useDispatch();
//   const rnBiometrics = new ReactNativeBiometrics();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [availableSensor, setAvailableSensor] = useState(false);
//   const [biometryType, setBiometryType] = useState(null);

//   useEffect(() => {
//     const onLoad = async () => {
//       const { available, biometryType, error } =
//         await rnBiometrics.isSensorAvailable();
//       setAvailableSensor(available);
//       setBiometryType(biometryType);
//     };
//     onLoad();
//   }, []);

//   // const handleOnPressSignIn = async () => {
//   //   if (!email) {
//   //     showMessage({
//   //       message: 'Email must be required',
//   //       type: 'danger',
//   //     });
//   //     return;
//   //   }
//   //   if (!validateEmail(email.trim())) {
//   //     showMessage({
//   //       message: 'Invalid Email Address',
//   //       type: 'danger',
//   //     });
//   //     return;
//   //   }
//   //   if (!password) {
//   //     showMessage({
//   //       message: 'Password must be required',
//   //       type: 'danger',
//   //     });
//   //     return;
//   //   }

//   //   var payload = {
//   //     email: email.trim().toLowerCase(),
//   //     password,
//   //   };

//   //   var response = await AuthenticationService.Login(payload);
    
//   //   if (response) {
//   //     if (response?.success) {
//   //       LocalStorage.SetData('token', response?.token);
//   //       dispatch(reminderAction.fetchAllReminders());
//   //       dispatch(reminderAction.fetchAllUnplannedStopsReminders());
//   //       dispatch(reminderAction.fetchAllRemembranceItems());
//   //       dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
//   //       dispatch(reminderAction.fetchAllDailySchedule());
//   //       dispatch(reminderAction.fetchAllFeeds());
//   //       const { available, biometryType } =
//   //         await rnBiometrics.isSensorAvailable();
//   //       if (
//   //         available &&
//   //         (biometryType === BiometryTypes.FaceID ||
//   //           biometryType === BiometryTypes.TouchID ||
//   //           biometryType === BiometryTypes.Biometrics)
//   //       ) {
//   //         Alert.alert(
//   //           biometryType == BiometryTypes.FaceID ? 'Face ID' : 'Touch ID',
//   //           biometryType == BiometryTypes.FaceID
//   //             ? 'Would you like to enable Face ID authentication for the next time?'
//   //             : 'Would you like to enable Touch ID authentication for the next time?',
//   //           [
//   //             {
//   //               text: 'Yes please',
//   //               onPress: async () => {
//   //                 const { publicKey } = await rnBiometrics.createKeys();
//   //                 var saveLocalData = {
//   //                   publicKey,
//   //                   email: email.trim().toLowerCase(),
//   //                   password,
//   //                 };
//   //                 LocalStorage.SetData(
//   //                   'faceiddata',
//   //                   JSON.stringify(saveLocalData),
//   //                 );
//   //                 navigation.dispatch(
//   //                   CommonActions.reset({
//   //                     index: 1,
//   //                     routes: [{ name: 'Dashboard' }],
//   //                   }),
//   //                 );
//   //                 if (
//   //                   response?.isQuestionSubmit == true &&
//   //                   response?.isQuestionApproved == true
//   //                 ) {
//   //                   LocalStorage.SetData('isQuestionSubmit', 'true');
//   //                   LocalStorage.SetData('isQuestionApproved', 'true');
//   //                   navigation.dispatch(
//   //                     CommonActions.reset({
//   //                       index: 1,
//   //                       routes: [{ name: 'Dashboard' }],
//   //                     }),
//   //                   );
//   //                 } else if (response?.isQuestionSubmit == false) {
//   //                   LocalStorage.SetData('isQuestionSubmit', 'false');
//   //                   LocalStorage.SetData('isQuestionApproved', 'false');
//   //                   navigation.dispatch(
//   //                     CommonActions.reset({
//   //                       index: 1,
//   //                       routes: [
//   //                         { name: 'SignIn' },
//   //                         {
//   //                           name: 'QuestionScreen',
//   //                         },
//   //                       ],
//   //                     }),
//   //                   );
//   //                 } else if (response?.isQuestionApproved == false) {
//   //                   LocalStorage.SetData('isQuestionSubmit', 'true');
//   //                   LocalStorage.SetData('isQuestionApproved', 'false');
//   //                   navigation.dispatch(
//   //                     CommonActions.reset({
//   //                       index: 1,
//   //                       routes: [
//   //                         { name: 'SignIn' },
//   //                         {
//   //                           name: 'TimerScreen',
//   //                         },
//   //                       ],
//   //                     }),
//   //                   );
//   //                 }
//   //               },
//   //             },
//   //             {
//   //               text: 'Cancel',
//   //               style: 'cancel',
//   //               onPress: async () => {
//   //                 navigation.dispatch(
//   //                   CommonActions.reset({
//   //                     index: 1,
//   //                     routes: [{ name: 'Dashboard' }],
//   //                   }),
//   //                 );
//   //                 if (
//   //                   response?.isQuestionSubmit == true &&
//   //                   response?.isQuestionApproved == true
//   //                 ) {
//   //                   LocalStorage.SetData('isQuestionSubmit', 'true');
//   //                   LocalStorage.SetData('isQuestionApproved', 'true');
//   //                   navigation.dispatch(
//   //                     CommonActions.reset({
//   //                       index: 1,
//   //                       routes: [{ name: 'Dashboard' }],
//   //                     }),
//   //                   );
//   //                 } else if (response?.isQuestionSubmit == false) {
//   //                   LocalStorage.SetData('isQuestionSubmit', 'false');
//   //                   LocalStorage.SetData('isQuestionApproved', 'false');
//   //                   navigation.dispatch(
//   //                     CommonActions.reset({
//   //                       index: 1,
//   //                       routes: [
//   //                         { name: 'SignIn' },
//   //                         {
//   //                           name: 'QuestionScreen',
//   //                         },
//   //                       ],
//   //                     }),
//   //                   );
//   //                 } else if (response?.isQuestionApproved == false) {
//   //                   LocalStorage.SetData('isQuestionSubmit', 'true');
//   //                   LocalStorage.SetData('isQuestionApproved', 'false');
//   //                   navigation.dispatch(
//   //                     CommonActions.reset({
//   //                       index: 1,
//   //                       routes: [
//   //                         { name: 'SignIn' },
//   //                         {
//   //                           name: 'TimerScreen',
//   //                         },
//   //                       ],
//   //                     }),
//   //                   );
//   //                 }
//   //               },
//   //             },
//   //           ],
//   //         );
//   //       } else {
//   //         if (
//   //           response?.isQuestionSubmit == true &&
//   //           response?.isQuestionApproved == true
//   //         ) {
//   //           LocalStorage.SetData('isQuestionSubmit', 'true');
//   //           LocalStorage.SetData('isQuestionApproved', 'true');
//   //           navigation.dispatch(
//   //             CommonActions.reset({
//   //               index: 1,
//   //               routes: [{ name: 'Dashboard' }],
//   //             }),
//   //           );
//   //         } else if (response?.isQuestionSubmit == false) {
//   //           LocalStorage.SetData('isQuestionSubmit', 'false');
//   //           LocalStorage.SetData('isQuestionApproved', 'false');
//   //           navigation.dispatch(
//   //             CommonActions.reset({
//   //               index: 1,
//   //               routes: [
//   //                 { name: 'SignIn' },
//   //                 {
//   //                   name: 'QuestionScreen',
//   //                 },
//   //               ],
//   //             }),
//   //           );
//   //         } else if (response?.isQuestionApproved == false) {
//   //           LocalStorage.SetData('isQuestionSubmit', 'true');
//   //           LocalStorage.SetData('isQuestionApproved', 'false');
//   //           navigation.dispatch(
//   //             CommonActions.reset({
//   //               index: 1,
//   //               routes: [
//   //                 { name: 'SignIn' },
//   //                 {
//   //                   name: 'TimerScreen',
//   //                 },
//   //               ],
//   //             }),
//   //           );
//   //         }
//   //       }
//   //     } else {
//   //       showMessage({
//   //         message: response?.message,
//   //         type: 'danger',
//   //       });
//   //     }
//   //   }
//   // };

//   const handleOnPressSignIn = async () => {
//     if (!email) {
//       showMessage({
//         message: 'Email must be required',
//         type: 'danger',
//       });
//       return;
//     }
//     if (!validateEmail(email.trim())) {
//       showMessage({
//         message: 'Invalid Email Address',
//         type: 'danger',
//       });
//       return;
//     }
//     if (!password) {
//       showMessage({
//         message: 'Password must be required',
//         type: 'danger',
//       });
//       return;
//     }
  
//     var payload = {
//       email: email.trim().toLowerCase(),
//       password,
//     };
  
//     var response = await AuthenticationService.Login(payload);
  
//     if (response) {
//       if (response?.success) {
//         LocalStorage.SetData('token', response?.token);
//         dispatch(reminderAction.fetchAllReminders());
//         dispatch(reminderAction.fetchAllUnplannedStopsReminders());
//         dispatch(reminderAction.fetchAllRemembranceItems());
//         dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
//         dispatch(reminderAction.fetchAllDailySchedule());
//         dispatch(reminderAction.fetchAllFeeds());
  
//         // 🔑 check if user has purchased plan
//         const hasPlan = response?.isSubscribed === true;
  
//         // if no plan → force user to PlansScreen
//         if (!hasPlan) {
//           navigation.dispatch(
//             CommonActions.reset({
//               index: 1,
//               routes: [{ name: 'PlansScreen', params: { fromSignIn: true },
//               }],
//             }),
//           );
//           return;
//         }
  
//         // if user has a plan → continue with biometrics / question checks
//         const { available, biometryType } =
//           await rnBiometrics.isSensorAvailable();
//         if (
//           available &&
//           (biometryType === BiometryTypes.FaceID ||
//             biometryType === BiometryTypes.TouchID ||
//             biometryType === BiometryTypes.Biometrics)
//         ) {
//           Alert.alert(
//             biometryType == BiometryTypes.FaceID ? 'Face ID' : 'Touch ID',
//             biometryType == BiometryTypes.FaceID
//               ? 'Would you like to enable Face ID authentication for the next time?'
//               : 'Would you like to enable Touch ID authentication for the next time?',
//             [
//               {
//                 text: 'Yes please',
//                 onPress: async () => {
//                   const { publicKey } = await rnBiometrics.createKeys();
//                   var saveLocalData = {
//                     publicKey,
//                     email: email.trim().toLowerCase(),
//                     password,
//                   };
//                   LocalStorage.SetData('faceiddata', JSON.stringify(saveLocalData));
  
//                   navigation.dispatch(
//                     CommonActions.reset({
//                       index: 1,
//                       routes: [{ name: 'Dashboard' }],
//                     }),
//                   );
  
//                   if (
//                     response?.isQuestionSubmit == true &&
//                     response?.isQuestionApproved == true
//                   ) {
//                     LocalStorage.SetData('isQuestionSubmit', 'true');
//                     LocalStorage.SetData('isQuestionApproved', 'true');
//                   } else if (response?.isQuestionSubmit == false) {
//                     LocalStorage.SetData('isQuestionSubmit', 'false');
//                     LocalStorage.SetData('isQuestionApproved', 'false');
//                     navigation.dispatch(
//                       CommonActions.reset({
//                         index: 1,
//                         routes: [
//                           { name: 'SignIn' },
//                           { name: 'QuestionScreen' },
//                         ],
//                       }),
//                     );
//                   } else if (response?.isQuestionApproved == false) {
//                     LocalStorage.SetData('isQuestionSubmit', 'true');
//                     LocalStorage.SetData('isQuestionApproved', 'false');
//                     navigation.dispatch(
//                       CommonActions.reset({
//                         index: 1,
//                         routes: [
//                           { name: 'SignIn' },
//                           { name: 'TimerScreen' },
//                         ],
//                       }),
//                     );
//                   }
//                 },
//               },
//               {
//                 text: 'Cancel',
//                 style: 'cancel',
//                 onPress: async () => {
//                   navigation.dispatch(
//                     CommonActions.reset({
//                       index: 1,
//                       routes: [{ name: 'Dashboard' }],
//                     }),
//                   );
//                 },
//               },
//             ],
//           );
//         } else {
//           // no biometrics → normal redirect
//           navigation.dispatch(
//             CommonActions.reset({
//               index: 1,
//               routes: [{ name: 'Dashboard' }],
//             }),
//           );
//         }
//       } else {
//         showMessage({
//           message: response?.message,
//           type: 'danger',
//         });
//       }
//     }
//   };
  

//   return (
//     <ScrollView
//       style={{
//         backgroundColor:
//           ThemeMode === 'dark'
//             ? ThemeColors.DARK_THEME_COLOR
//             : ThemeColors?.WHITE,
//       }}
//       contentContainerStyle={[
//         styles.ScrollViewContentContainerStyle,
//         {
//           backgroundColor:
//             ThemeMode === 'dark'
//               ? ThemeColors.DARK_THEME_COLOR
//               : ThemeColors?.WHITE,
//         },
//       ]}
//       showsVerticalScrollIndicator={false}>
//       <View
//         style={[
//           styles.MainContainer,
//           {
//             backgroundColor:
//               ThemeMode === 'dark'
//                 ? ThemeColors.DARK_THEME_COLOR
//                 : ThemeColors?.WHITE,
//           },
//         ]}>
//         <View
//           style={[
//             styles.LogoContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <Image
//             source={require('../../assets/images/app-icon.png')}
//             style={{ width: 200, height: 200 }}
//             resizeMode="contain"
//           />
//         </View>
//         <View
//           style={[
//             styles.ContentContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <TextBox
//             onChangeText={value => setEmail(value)}
//             label={'Email Address'}
//             value={email}
//             textBoxStyle={{
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//               color:
//                 ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
//             }}
//           />
//           <TextBox
//             onChangeText={value => setPassword(value)}
//             label={'Password'}
//             value={password}
//             secureTextEntry={true}
//             textBoxStyle={{
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//               color:
//                 ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
//             }}
//           />
//           <View style={styles.ForgetPasswordTextContainer}>
//             <TouchableOpacity
//               style={styles.ForgetPasswordTextTouch}
//               onPress={() => navigation.navigate('ForgotPasswordEmail')}>
//               <Text
//                 style={[
//                   styles.ForgetPasswordText,
//                   {
//                     color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
//                   },
//                 ]}>
//                 Forgot Password?
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <Button title={`Sign In`} onPress={handleOnPressSignIn} />
//           <View style={styles.SignUpTextContainer}>
//             <TouchableOpacity
//               style={styles.SignUpTextTouch}
//               onPress={() => navigation.navigate('SignUp')}>
//               <Text style={styles.SignUpText}>Don't have account?</Text>
//               <Text
//                 style={[
//                   styles.SignUpText2,
//                   {
//                     color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
//                   },
//                 ]}>
//                 {' '}
//                 Sign Up
//               </Text>
//             </TouchableOpacity>
//           </View>
//           {availableSensor && (
//             <TouchableOpacity
//               onPress={async () => {
//                 var localdata = await LocalStorage.GetData('faceiddata');
//                 if (
//                   localdata &&
//                   localdata !== undefined &&
//                   localdata !== null
//                 ) {
//                   localdata = JSON.parse(localdata);
//                   const payload = {
//                     email: localdata.email,
//                     password: localdata.password,
//                   };
//                   const { success, signature } =
//                     await rnBiometrics.createSignature({
//                       promptMessage: 'Sign in',
//                       payload: localdata.email,
//                     });
//                   if (!success) {
//                     showMessage({
//                       message:
//                         'Something went wrong during authentication with Face ID. Please try again.',
//                       type: 'danger',
//                     });
//                     return;
//                   }
//                   const finalpayload = {
//                     email: localdata.email,
//                     password: localdata.password,
//                     publicKey: localdata.publicKey,
//                     signature,
//                   };
//                   var response = await AuthenticationService.FaceIDLogin(
//                     finalpayload,
//                   );
//                   if (response) {
//                     if (response?.success) {
//                       LocalStorage.SetData('token', response?.token);
//                       dispatch(reminderAction.fetchAllReminders());
//                       dispatch(reminderAction.fetchAllUnplannedStopsReminders());
//                       dispatch(reminderAction.fetchAllRemembranceItems());
//                       dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
//                       dispatch(reminderAction.fetchAllDailySchedule());
//                       dispatch(reminderAction.fetchAllFeeds());
//                       if (
//                         response?.isQuestionSubmit == true &&
//                         response?.isQuestionApproved == true
//                       ) {
//                         LocalStorage.SetData('isQuestionSubmit', 'true');
//                         LocalStorage.SetData('isQuestionApproved', 'true');
//                         navigation.dispatch(
//                           CommonActions.reset({
//                             index: 1,
//                             routes: [{ name: 'Dashboard' }],
//                           }),
//                         );
//                       } else if (response?.isQuestionSubmit == false) {
//                         LocalStorage.SetData('isQuestionSubmit', 'false');
//                         LocalStorage.SetData('isQuestionApproved', 'false');
//                         navigation.dispatch(
//                           CommonActions.reset({
//                             index: 1,
//                             routes: [
//                               { name: 'SignIn' },
//                               {
//                                 name: 'QuestionScreen',
//                               },
//                             ],
//                           }),
//                         );
//                       } else if (response?.isQuestionApproved == false) {
//                         LocalStorage.SetData('isQuestionSubmit', 'true');
//                         LocalStorage.SetData('isQuestionApproved', 'false');
//                         navigation.dispatch(
//                           CommonActions.reset({
//                             index: 1,
//                             routes: [
//                               { name: 'SignIn' },
//                               {
//                                 name: 'TimerScreen',
//                               },
//                             ],
//                           }),
//                         );
//                       }
//                     } else {
//                       showMessage({
//                         message: response?.message,
//                         type: 'danger',
//                       });
//                     }
//                   }
//                 } else {
//                   showMessage({
//                     message:
//                       'No credentials found. You need login one time manually',
//                     type: 'warning',
//                   });
//                 }
//               }}>
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   padding: 15,
//                 }}>
//                 <MaterialCommunityIcons
//                   name={
//                     biometryType == BiometryTypes.FaceID
//                       ? 'line-scan'
//                       : 'fingerprint'
//                   }
//                   style={{
//                     color:
//                       ThemeMode === 'dark'
//                         ? ThemeColors.WHITE
//                         : ThemeColors.DARK_THEME_COLOR,
//                   }}
//                   size={40}
//                 />
//                 <Text
//                   style={[
//                     styles.SignUpText2,
//                     {
//                       color:
//                         ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
//                     },
//                   ]}>
//                   {biometryType == BiometryTypes.FaceID
//                     ? 'Login With Face ID'
//                     : 'Login With Touch ID'}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           <View style={styles.SocialLoginContainer}>
//             <View
//               style={[
//                 styles.SocialLoginCircleContainer,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors?.WHITE
//                       : ThemeColors.BLACK,
//                 },
//               ]}>
//               <FontAwesome5Pro
//                 name="apple"
//                 style={{
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors.WHITE,
//                 }}
//                 size={20}
//               />
//             </View>
//             <View
//               style={[
//                 styles.SocialLoginCircleContainer,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors?.WHITE
//                       : ThemeColors.BLACK,
//                 },
//               ]}>
//               {/* <FontAwesome5Pro
//                 name="facebook-f"
//                 style={{
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors.WHITE,
//                 }}
//                 size={20}
//               />
//             </View>
//             <View
//               style={[
//                 styles.SocialLoginCircleContainer,
//                 {
//                   backgroundColor:
//                     ThemeMode === 'dark'
//                       ? ThemeColors?.WHITE
//                       : ThemeColors.BLACK,
//                 },
//               ]}> */}
//               <FontAwesome5Pro
//                 name="google"
//                 style={{
//                   color:
//                     ThemeMode === 'dark'
//                       ? ThemeColors.DARK_THEME_COLOR
//                       : ThemeColors.WHITE,
//                 }}
//                 size={20}
//               />
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignInScreen;


// import React, { useState, useEffect } from 'react';
// import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   useColorScheme,
//   Alert,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import TextBox from '../components/TextBox';
// import Button from '../components/Button';
// import { ThemeColors } from '../utils/Theme';
// import styles from '../styles/SignInStyle';
// import { validateEmail } from '../utils/Helper';
// import { showMessage } from 'react-native-flash-message';
// import AuthenticationService from '../services/Authentication/AuthenticationService';
// import { CommonActions } from '@react-navigation/native';
// import LocalStorage from '../utils/LocalStorage';
// import { useDispatch, useSelector } from 'react-redux';
// import * as reminderAction from '../actions/Reminder/ReminderAction';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// import AppleSignInService from '../services/AppleSignInService';
// import { appleAuth } from '@invertase/react-native-apple-authentication';
// import auth from '@react-native-firebase/auth';


// const SignInScreen = ({ navigation }) => {
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
//   const dispatch = useDispatch();
//   const rnBiometrics = new ReactNativeBiometrics();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [availableSensor, setAvailableSensor] = useState(false);
//   const [biometryType, setBiometryType] = useState(null);
//   const [isSigningIn, setIsSigningIn] = useState(false);
//   const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState(false);

//   useEffect(() => {
//     const initialize = async () => {
//       GoogleSignin.configure({
//         webClientId: '95145383541-oqulgtkao1u03am0bvcvaa29qqksmfnm.apps.googleusercontent.com',
//         iosClientId: '95145383541-3mjqv249t0erqmuh6dh32lsl9v4s48g4.apps.googleusercontent.com',
//         offlineAccess: true,
//         forceCodeForRefreshToken: true,
//       });


//       // Check biometric sensor availability
//       const { available, biometryType } = await rnBiometrics.isSensorAvailable();
//       setAvailableSensor(available);
//       setBiometryType(biometryType);

//       // Check Apple Sign-In availability
//       setIsAppleSignInAvailable(AppleSignInService.isAvailable());
//     };
    
//     initialize();
//   }, []);

//   // Handle successful login (common for all login methods)
//   const handleSuccessfulLogin = async (response) => {
//     if (response?.token) {
//       LocalStorage.SetData('token', response.token);
      
//       // Dispatch all necessary actions
//       dispatch(reminderAction.fetchAllReminders());
//       dispatch(reminderAction.fetchAllUnplannedStopsReminders());
//       dispatch(reminderAction.fetchAllRemembranceItems());
//       dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
//       dispatch(reminderAction.fetchAllDailySchedule());
//       dispatch(reminderAction.fetchAllFeeds());

//       // Check subscription status
//       const hasPlan = response?.isSubscribed === true;

//       if (!hasPlan) {
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 1,
//             routes: [{ name: 'PlansScreen', params: { fromSignIn: true } }],
//           }),
//         );
//         return;
//       }

//       // Handle biometrics setup if available
//       const { available } = await rnBiometrics.isSensorAvailable();
//       if (available && (
//         biometryType === BiometryTypes.FaceID ||
//         biometryType === BiometryTypes.TouchID ||
//         biometryType === BiometryTypes.Biometrics
//       )) {
//         Alert.alert(
//           biometryType === BiometryTypes.FaceID ? 'Face ID' : 'Touch ID',
//           `Would you like to enable ${biometryType === BiometryTypes.FaceID ? 'Face ID' : 'Touch ID'} authentication for the next time?`,
//           [
//             {
//               text: 'Yes please',
//               onPress: async () => {
//                 const { publicKey } = await rnBiometrics.createKeys();
//                 const saveLocalData = {
//                   publicKey,
//                   email: response.userEmail || email,
//                 };
//                 LocalStorage.SetData('faceiddata', JSON.stringify(saveLocalData));
//                 navigateToDashboard();
//               },
//             },
//             {
//               text: 'Cancel',
//               style: 'cancel',
//               onPress: () => navigateToDashboard(),
//             },
//           ],
//         );
//       } else {
//         navigateToDashboard();
//       }
//     } else {
//       showMessage({
//         message: 'Login failed: No token received',
//         type: 'danger',
//       });
//     }
//   };

//   const navigateToDashboard = () => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 1,
//         routes: [{ name: 'Dashboard' }],
//       }),
//     );
//   };

//   // Apple Sign-In Handler
//   // Apple Sign-In Handler - FLEXIBLE VERSION
// // const handleAppleSignIn = async () => {
// //   if (!isAppleSignInAvailable) {
// //     showMessage({
// //       message: 'Apple Sign-In is not available on this device',
// //       type: 'warning',
// //     });
// //     return;
// //   }

// //   try {
// //     setIsSigningIn(true);
    
// //     const result = await AppleSignInService.signIn();
    
// //     if (result && result.success) {
// //       // Try different payload structures based on what your API expects
// //       const payloadAttempts = [
// //         // Attempt 1: Based on your screenshot
// //         {
// //           fd1Name: result.user.firstName || 'Apple User',
// //           end1: result.user.email,
// //           phonetuniser: 0,
// //           provider: 'apple',
// //           appleUserId: result.user.id,
// //         },
// //         // Attempt 2: More standard field names
// //         {
// //           firstName: result.user.firstName,
// //           lastName: result.user.lastName,
// //           email: result.user.email,
// //           provider: 'apple',
// //           appleUserId: result.user.id,
// //           identityToken: result.data.identityToken,
// //         },
// //         // Attempt 3: Minimal required fields
// //         {
// //           email: result.user.email,
// //           name: `${result.user.firstName || ''} ${result.user.lastName || ''}`.trim(),
// //           provider: 'apple',
// //         }
// //       ];

// //       let response;
// //       let lastError;
      
// //       // Try each payload structure until one works
// //       for (const payload of payloadAttempts) {
// //         try {
// //           response = await AuthenticationService.SocialLogin(payload);
// //           if (response?.success) {
// //             break;
// //           }
// //         } catch (error) {
// //           lastError = error;
// //           continue;
// //         }
// //       }

// //       if (response?.success) {
// //         await handleSuccessfulLogin(response);
// //       } else {
// //         showMessage({
// //           message: lastError?.message || 'Apple sign-in failed. Please check API configuration.',
// //           type: 'danger',
// //         });
// //       }
// //     }
// //   } catch (error) {
// //     if (error.code === '1001') {
// //       console.log('Apple Sign-In cancelled');
// //     } else {
// //       showMessage({
// //         message: 'Apple sign-in failed. Please try again.',
// //         type: 'danger',
// //       });
// //     }
// //   } finally {
// //     setIsSigningIn(false);
// //   }
// // };

// // Apple Sign-In using Firebase
// const handleAppleSignIn = async () => {
//   try {
//     setIsSigningIn(true);

//     // Start the sign-in request
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });

//     // Ensure Apple returned a user identity token
//     if (!appleAuthRequestResponse.identityToken) {
//       throw new Error('Apple Sign-In failed - no identify token returned');
//     }

//     // Create a Firebase credential from the Apple token
//     const { identityToken, nonce } = appleAuthRequestResponse;
//     const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

//     // Sign in with Firebase
//     const firebaseUserCredential = await auth().signInWithCredential(appleCredential);
//     const firebaseUser = firebaseUserCredential.user;

//     console.log('Apple user info:', firebaseUser);

//     // Prepare payload for your backend (AuthenticationService)
//     const payload = {
//       fullName:
//         firebaseUser.displayName ||
//         `${appleAuthRequestResponse.fullName?.givenName || ''} ${
//           appleAuthRequestResponse.fullName?.familyName || ''
//         }`.trim(),
//       email: firebaseUser.email || appleAuthRequestResponse.email || '',
//       provider: 'apple',
//       appleUserId: firebaseUser.uid,
//       photo: firebaseUser.photoURL || null,
//     };

//     console.log('Sending payload to social-login:', payload);
//     const response = await AuthenticationService.SocialLogin(payload);

//     if (response?.success) {
//       await handleSuccessfulLogin(response);
//     } else {
//       showMessage({
//         message: response?.message || 'Apple sign-in failed',
//         type: 'danger',
//       });
//     }
//   } catch (error) {
//     console.log('Apple Sign-In error:', error);
//     if (error?.code === appleAuth.Error.CANCELED) {
//       console.log('User canceled Apple Sign-In');
//     } else {
//       showMessage({
//         message: error.message || 'Apple sign-in failed. Please try again.',
//         type: 'danger',
//       });
//     }
//   } finally {
//     setIsSigningIn(false);
//   }
// };


//   // Regular email/password sign-in
//   const handleOnPressSignIn = async () => {
//     if (!email) {
//       showMessage({ message: 'Email must be required', type: 'danger' });
//       return;
//     }
//     if (!validateEmail(email.trim())) {
//       showMessage({ message: 'Invalid Email Address', type: 'danger' });
//       return;
//     }
//     if (!password) {
//       showMessage({ message: 'Password must be required', type: 'danger' });
//       return;
//     }

//     const payload = {
//       email: email.trim().toLowerCase(),
//       password,
//     };

//     try {
//       setIsSigningIn(true);
//       const response = await AuthenticationService.Login(payload);
      
//       if (response?.success) {
//         await handleSuccessfulLogin(response);
//       } else {
//         showMessage({
//           message: response?.message || 'Login failed',
//           type: 'danger',
//         });
//       }
//     } catch (error) {
//       showMessage({
//         message: 'Login failed. Please try again.',
//         type: 'danger',
//       });
//     } finally {
//       setIsSigningIn(false);
//     }
//   };

// //Handle google sign in
//   // const handleGoogleSignIn = async () => {
//   //   try {
//   //     setIsSigningIn(true);
//   //     await GoogleSignin.hasPlayServices();
//   //     const userInfo = await GoogleSignin.signIn();
  
//   //     // Build payload based on your AuthenticationService
//   //     const payload = {
//   //       email: userInfo.user.email,
//   //       name: userInfo.user.name,
//   //       provider: 'google',
//   //       googleUserId: userInfo.user.id,
//   //       photo: userInfo.user.photo,
//   //     };
  
//   //     const response = await AuthenticationService.SocialLogin(payload);
  
//   //     if (response?.success) {
//   //       await handleSuccessfulLogin(response);
//   //     } else {
//   //       showMessage({
//   //         message: response?.message || 'Google sign-in failed',
//   //         type: 'danger',
//   //       });
//   //     }
//   //   } catch (error) {
//   //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//   //       console.log('Google Sign-In cancelled');
//   //     } else if (error.code === statusCodes.IN_PROGRESS) {
//   //       console.log('Google Sign-In in progress');
//   //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//   //       showMessage({
//   //         message: 'Play services not available or outdated.',
//   //         type: 'warning',
//   //       });
//   //     } else {
//   //       console.error(error);
//   //       showMessage({
//   //         message: 'Google sign-in failed. Please try again.',
//   //         type: 'danger',
//   //       });
//   //     }
//   //   } finally {
//   //     setIsSigningIn(false);
//   //   }
//   // };


//   const handleGoogleSignIn = async () => {
//     try {
//       setIsSigningIn(true);
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//       const userInfo = await GoogleSignin.signIn();
  
//       console.log('Google user info full response:', userInfo);
  
//       const user = userInfo?.data?.user;
//       if (!user) {
//         showMessage({
//           message: 'No user data received from Google',
//           type: 'danger',
//         });
//         return;
//       }
  
//       // Build payload according to the API schema
//       const payload = {
//         fullName: user.name || `${user.givenName || ''} ${user.familyName || ''}`.trim(),
//         email: user.email,
//         phoneNumber: 0, // Default value since we don't have phone from Google
//       };
  
//       console.log('Sending payload to social-login:', payload);
  
//       const response = await AuthenticationService.SocialLogin(payload);
//       console.log('Social login response:', response);
  
//       if (response?.success) {
//         await handleSuccessfulLogin(response);
//       } else {
//         showMessage({
//           message: response?.message || 'Google sign-in failed',
//           type: 'danger',
//         });
//       }
  
//     } catch (error) {
//       console.log('Google login error:', error);
      
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('Google Sign-In cancelled');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('Google Sign-In in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         showMessage({
//           message: 'Play services not available or outdated.',
//           type: 'warning',
//         });
//       } else {
//         showMessage({
//           message: 'Google sign-in failed. Please try again.',
//           type: 'danger',
//         });
//       }
//     } finally {
//       setIsSigningIn(false);
//     }
//   };
  
  

//   // Biometric sign-in
//   const handleBiometricSignIn = async () => {
//     if (isSigningIn) return;
    
//     try {
//       setIsSigningIn(true);
//       const localdata = await LocalStorage.GetData('faceiddata');
      
//       if (localdata) {
//         const parsedData = JSON.parse(localdata);
//         const { success, signature } = await rnBiometrics.createSignature({
//           promptMessage: 'Sign in',
//           payload: parsedData.email,
//         });
        
//         if (!success) {
//           throw new Error('Biometric authentication failed');
//         }

//         const finalPayload = {
//           email: parsedData.email,
//           publicKey: parsedData.publicKey,
//           password: localdata.password,  // ← This is included
//           signature,
//         };

//         const response = await AuthenticationService.FaceIDLogin(finalPayload);
//         if (response?.success) {
//           await handleSuccessfulLogin(response);
//         } else {
//           throw new Error(response?.message || 'Biometric login failed');
//         }
//       } else {
//         showMessage({
//           message: 'No biometric credentials found. Please login manually first.',
//           type: 'warning',
//         });
//       }
//     } catch (error) {
//       showMessage({
//         message: error.message || 'Biometric login failed',
//         type: 'danger',
//       });
//     } finally {
//       setIsSigningIn(false);
//     }
//   };

//   return (
//     <ScrollView
//       style={{
//         backgroundColor:
//           ThemeMode === 'dark'
//             ? ThemeColors.DARK_THEME_COLOR
//             : ThemeColors?.WHITE,
//       }}
//       contentContainerStyle={[
//         styles.ScrollViewContentContainerStyle,
//         {
//           backgroundColor:
//             ThemeMode === 'dark'
//               ? ThemeColors.DARK_THEME_COLOR
//               : ThemeColors?.WHITE,
//         },
//       ]}
//       showsVerticalScrollIndicator={false}>
//       <View
//         style={[
//           styles.MainContainer,
//           {
//             backgroundColor:
//               ThemeMode === 'dark'
//                 ? ThemeColors.DARK_THEME_COLOR
//                 : ThemeColors?.WHITE,
//           },
//         ]}>
//         <View
//           style={[
//             styles.LogoContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <Image
//             source={require('../../assets/images/app-icon.png')}
//             style={{ width: 200, height: 200 }}
//             resizeMode="contain"
//           />
//         </View>
//         <View
//           style={[
//             styles.ContentContainer,
//             {
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//             },
//           ]}>
//           <TextBox
//             onChangeText={setEmail}
//             label={'Email Address'}
//             value={email}
//             textBoxStyle={{
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//               color:
//                 ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
//             }}
//           />
//           <TextBox
//             onChangeText={setPassword}
//             label={'Password'}
//             value={password}
//             secureTextEntry={true}
//             textBoxStyle={{
//               backgroundColor:
//                 ThemeMode === 'dark'
//                   ? ThemeColors.DARK_THEME_COLOR
//                   : ThemeColors?.WHITE,
//               color:
//                 ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
//             }}
//           />
//           <View style={styles.ForgetPasswordTextContainer}>
//             <TouchableOpacity
//               style={styles.ForgetPasswordTextTouch}
//               onPress={() => navigation.navigate('ForgotPasswordEmail')}
//               disabled={isSigningIn}>
//               <Text
//                 style={[
//                   styles.ForgetPasswordText,
//                   {
//                     color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
//                   },
//                 ]}>
//                 Forgot Password?
//               </Text>
//             </TouchableOpacity>
//           </View>
          
//           <Button 
//             title={isSigningIn ? 'Signing In...' : 'Sign In'} 
//             onPress={handleOnPressSignIn} 
//             disabled={isSigningIn}
//           />
          
//           <View style={styles.SignUpTextContainer}>
//             <TouchableOpacity
//               style={styles.SignUpTextTouch}
//               onPress={() => navigation.navigate('SignUp')}
//               disabled={isSigningIn}>
//               <Text style={styles.SignUpText}>Don't have account?</Text>
//               <Text
//                 style={[
//                   styles.SignUpText2,
//                   {
//                     color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
//                   },
//                 ]}>
//                 {' '}
//                 Sign Up
//               </Text>
//             </TouchableOpacity>
//           </View>


// {/* <View style={styles.socialButtonsRow}>
// {isAppleSignInAvailable && (
//   <View style={styles.AppleSignInButtonContainer}>
//     <TouchableOpacity
//       style={[
//         styles.AppleSignInButton,
//         {
//           backgroundColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//           borderColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//         },
//       ]}
//       onPress={handleAppleSignIn}
//       disabled={isSigningIn}>
//       <FontAwesome5Pro
//         name="apple"
//         style={{
//           color: ThemeMode === 'dark' ? '#000000' : '#FFFFFF',
//           fontSize: 20,
//         }}
//       />
//     </TouchableOpacity>
//   </View>
// )}


// <View style={styles.AppleSignInButtonContainer}>
//     <TouchableOpacity
//       style={[
//         styles.AppleSignInButton,
//         {
//           backgroundColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//           borderColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//         },
//       ]}
//       onPress={handleGoogleSignIn}
//       disabled={isSigningIn}>
//       <Image
//                 source={require('../../assets/images/google-icon.png')}
//                 style={{ width: 34, height: 34, }}
//               />
//     </TouchableOpacity>
//   </View>
//   </View> */}

// <View style={styles.socialButtonsRow}>
//             {/* Apple Sign-In Button (only show on iOS) */}
//             {isAppleSignInAvailable && Platform.OS === 'ios' && (
//               <View style={styles.AppleSignInButtonContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.AppleSignInButton,
//                     {
//                       backgroundColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//                       borderColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//                     },
//                   ]}
//                   onPress={handleAppleSignIn}
//                   disabled={isSigningIn}>
//                   <FontAwesome5Pro
//                     name="apple"
//                     style={{
//                       color: ThemeMode === 'dark' ? '#000000' : '#FFFFFF',
//                       fontSize: 20,
//                     }}
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}

//             {/* Google Sign-In Button (only show on Android) */}
//             {/* {Platform.OS === 'android' && ( */}
//               <View style={styles.AppleSignInButtonContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.AppleSignInButton,
//                     {
//                       backgroundColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//                       borderColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
//                     },
//                   ]}
//                   onPress={handleGoogleSignIn}
//                   disabled={isSigningIn}>
//                   <Image
//                     source={require('../../assets/images/google-icon.png')}
//                     style={{ width: 34, height: 34 }}
//                   />
//                 </TouchableOpacity>
//               </View>
//             {/* )} */}
//           </View>

//           {/* Or Separator */}
//           {/* {(isAppleSignInAvailable || availableSensor) && (
//             <View style={styles.OrSeparator}>
//               <View style={[
//                 styles.OrLine,
//                 { backgroundColor: ThemeMode === 'dark' ? '#666' : '#CCC' }
//               ]} />
//               <Text style={[
//                 styles.OrText,
//                 { color: ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors.BLACK }
//               ]}>
//                 OR
//               </Text>
//               <View style={[
//                 styles.OrLine,
//                 { backgroundColor: ThemeMode === 'dark' ? '#666' : '#CCC' }
//               ]} />
//             </View>
//           )} */}


//           {/* Google Sign-In Button */}
//           {/* <View style={styles.GoogleSignInButtonContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.GoogleSignInButton,
//                 {
//                   backgroundColor: '#FFFFFF',
//                   borderColor: '#DDDDDD',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   paddingVertical: 10,
//                   borderRadius: 10,
//                 },
//               ]}
//               onPress={handleGoogleSignIn}
//               disabled={isSigningIn}>
//               <Image
//                 source={require('../../assets/images/google-icon.png')}
//                 style={{ width: 24, height: 24, marginRight: 10 }}
//               />
//               {/* <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>
//                 Sign in with Google
//               </Text> */}
//             {/* </TouchableOpacity> */}
//           {/* </View> */}


          

//           {/* Biometric Sign-In */}
//           {availableSensor && (
//             <TouchableOpacity
//               onPress={handleBiometricSignIn}
//               disabled={isSigningIn}>
//               <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
//                 {isSigningIn ? (
//                   <ActivityIndicator 
//                     size="large" 
//                     color={ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK} 
//                   />
//                 ) : (
//                   <>
//                     <MaterialCommunityIcons
//                       name={biometryType === BiometryTypes.FaceID ? 'face-recognition' : 'fingerprint'}
//                       style={{
//                         color: ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors.DARK_THEME_COLOR,
//                       }}
//                       size={40}
//                     />
//                     <Text
//                       style={[
//                         styles.SignUpText2,
//                         {
//                           color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
//                         },
//                       ]}>
//                       {biometryType === BiometryTypes.FaceID
//                         ? 'Login With Face ID'
//                         : 'Login With Touch ID'}
//                     </Text>
//                   </>
//                 )}
//               </View>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignInScreen;





import React, { useState, useEffect } from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { ThemeColors } from '../utils/Theme';
import styles from '../styles/SignInStyle';
import { validateEmail } from '../utils/Helper';
import { showMessage } from 'react-native-flash-message';
import AuthenticationService from '../services/Authentication/AuthenticationService';
import { CommonActions } from '@react-navigation/native';
import LocalStorage from '../utils/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import * as commonAction from '../actions/Common/CommonAction';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AppleSignInService from '../services/AppleSignInService';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({ navigation }) => {
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const dispatch = useDispatch();
  const rnBiometrics = new ReactNativeBiometrics();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [availableSensor, setAvailableSensor] = useState(false);
  const [biometryType, setBiometryType] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      GoogleSignin.configure({
        webClientId: '95145383541-oqulgtkao1u03am0bvcvaa29qqksmfnm.apps.googleusercontent.com',
        iosClientId: '95145383541-3mjqv249t0erqmuh6dh32lsl9v4s48g4.apps.googleusercontent.com',
        offlineAccess: true,
        forceCodeForRefreshToken: true,
      });

      // Check biometric sensor availability
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      setAvailableSensor(available);
      setBiometryType(biometryType);

      // Check Apple Sign-In availability
      setIsAppleSignInAvailable(AppleSignInService.isAvailable());
    };
    
    initialize();
  }, []);

  // Handle successful login (common for all login methods)
  const handleSuccessfulLogin = async (response) => {
    console.log('Login successful, response:', response);
    
    if (response?.token) {
      await LocalStorage.SetData('token', response.token);
      console.log('Token saved successfully');
      
      // Fetch fresh user details to update Redux state
      dispatch(commonAction.fetchUserDetail());
      
      // Dispatch all necessary actions
      dispatch(reminderAction.fetchAllReminders());
      dispatch(reminderAction.fetchAllUnplannedStopsReminders());
      dispatch(reminderAction.fetchAllRemembranceItems());
      dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
      dispatch(reminderAction.fetchAllDailySchedule());
      dispatch(reminderAction.fetchAllFeeds());

      // Check subscription status from login response
      const hasPlan = response?.isSubscribed === true;
      console.log('User has plan:', hasPlan, 'isSubscribed value:', response?.isSubscribed);

      if (!hasPlan) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'PlansScreen', params: { fromSignIn: true } }],
          }),
        );
        return;
      }

      // Continue with normal flow
      navigateToDashboard(response);
    } else {
      console.log('Login response missing token');
      showMessage({
        message: 'Login failed: No token received',
        type: 'danger',
      });
    }
  };

  const navigateToDashboard = (response) => {
    // Handle question flow if needed
    if (response?.isQuestionSubmit == true && response?.isQuestionApproved == true) {
      LocalStorage.SetData('isQuestionSubmit', 'true');
      LocalStorage.SetData('isQuestionApproved', 'true');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Dashboard' }],
        }),
      );
    } else if (response?.isQuestionSubmit == false) {
      LocalStorage.SetData('isQuestionSubmit', 'false');
      LocalStorage.SetData('isQuestionApproved', 'false');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'SignIn' },
            { name: 'QuestionScreen' },
          ],
        }),
      );
    } else if (response?.isQuestionApproved == false) {
      LocalStorage.SetData('isQuestionSubmit', 'true');
      LocalStorage.SetData('isQuestionApproved', 'false');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'SignIn' },
            { name: 'TimerScreen' },
          ],
        }),
      );
    } else {
      // Default to dashboard
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Dashboard' }],
        }),
      );
    }
  };

  // Handle post-login navigation for biometric enrollment
  const handlePostLoginNavigation = (response) => {
    if (response?.isQuestionSubmit == true && response?.isQuestionApproved == true) {
      LocalStorage.SetData('isQuestionSubmit', 'true');
      LocalStorage.SetData('isQuestionApproved', 'true');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Dashboard' }],
        }),
      );
    } else if (response?.isQuestionSubmit == false) {
      LocalStorage.SetData('isQuestionSubmit', 'false');
      LocalStorage.SetData('isQuestionApproved', 'false');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'SignIn' },
            { name: 'QuestionScreen' },
          ],
        }),
      );
    } else if (response?.isQuestionApproved == false) {
      LocalStorage.SetData('isQuestionSubmit', 'true');
      LocalStorage.SetData('isQuestionApproved', 'false');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'SignIn' },
            { name: 'TimerScreen' },
          ],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Dashboard' }],
        }),
      );
    }
  };

  // FIXED: Biometric Enrollment - Store password like the working code
  const enrollBiometric = async (userEmail, userPassword) => {
    try {
      console.log('Starting biometric enrollment for:', userEmail);
      
      // Check if keys already exist
      const { keysExist } = await rnBiometrics.biometricKeysExist();
      
      if (keysExist) {
        console.log('Biometric keys already exist, deleting old keys...');
        await rnBiometrics.deleteKeys();
      }

      // Create new keys
      const { publicKey } = await rnBiometrics.createKeys();
      console.log('New biometric keys created');

      if (!publicKey) {
        throw new Error('Failed to create biometric keys');
      }

      // Store biometric data INCLUDING PASSWORD (like the working code)
      const saveLocalData = {
        publicKey,
        email: userEmail,
        password: userPassword, // ← This is the key fix!
        enrolledAt: new Date().toISOString(),
      };

      await LocalStorage.SetData('faceiddata', JSON.stringify(saveLocalData));
      console.log('Biometric data saved successfully');

      return true;
    } catch (error) {
      console.error('Biometric enrollment error:', error);
      throw error;
    }
  };

  // FIXED: Biometric Login - Include password in the request
  const handleBiometricSignIn = async () => {
    if (isSigningIn) return;
    
    try {
      setIsSigningIn(true);
      const localdata = await LocalStorage.GetData('faceiddata');
      
      console.log('Stored biometric data:', localdata);
      
      if (!localdata) {
        showMessage({
          message: 'No biometric credentials found. Please login manually first.',
          type: 'warning',
        });
        return;
      }

      const parsedData = JSON.parse(localdata);
      console.log('Parsed biometric data:', parsedData);
      
      // Check if essential fields exist
      if (!parsedData.email || !parsedData.publicKey || !parsedData.password) {
        showMessage({
          message: 'Biometric data incomplete. Please login manually again.',
          type: 'warning',
        });
        // Clear invalid data
        await LocalStorage.RemoveData('faceiddata');
        return;
      }

      console.log('Starting biometric authentication...');
      
      // Create signature with biometrics
      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: 'Authenticate to sign in',
        payload: parsedData.email,
      });
      
      if (!success) {
        throw new Error('Biometric authentication failed or was cancelled');
      }

      console.log('Biometric signature created successfully');

      // FIXED: Include password in the payload (like the working code)
      const finalPayload = {
        email: parsedData.email,
        password: parsedData.password, // ← This is the key fix!
        publicKey: parsedData.publicKey,
        signature: signature,
      };

      console.log('Sending biometric login request:', {
        email: finalPayload.email,
        hasPassword: !!finalPayload.password,
        publicKeyLength: finalPayload.publicKey?.length,
        signatureLength: finalPayload.signature?.length,
      });

      // Call the FaceID login API
      const response = await AuthenticationService.FaceIDLogin(finalPayload);
      console.log('Biometric login API response:', response);
      
      if (response?.success) {
        console.log('Biometric login successful');
        await handleSuccessfulLogin(response);
      } else {
        // Handle specific backend errors
        console.error('Biometric login failed:', response);
        
        if (response?.message?.includes('Internal Server Error')) {
          showMessage({
            message: 'Server error during biometric login. Please try manual login.',
            type: 'danger',
          });
        } else if (response?.message?.includes('No user found') || response?.message?.includes('User not found')) {
          showMessage({
            message: 'User account not found. Please login manually to re-enable biometric login.',
            type: 'warning',
          });
          await LocalStorage.RemoveData('faceiddata');
        } else {
          throw new Error(response?.message || 'Biometric login failed');
        }
      }
    } catch (error) {
      console.error('Biometric login error:', error);
      
      if (error.message.includes('cancelled')) {
        console.log('Biometric authentication cancelled by user');
      } else {
        showMessage({
          message: `Biometric login failed: ${error.message}`,
          type: 'danger',
        });
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  // Apple Sign-In using Firebase
  const handleAppleSignIn = async () => {
    try {
      setIsSigningIn(true);

      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identity token
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the Apple token
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // Sign in with Firebase
      const firebaseUserCredential = await auth().signInWithCredential(appleCredential);
      const firebaseUser = firebaseUserCredential.user;

      console.log('Apple user info:', firebaseUser);

      // Prepare payload for your backend (AuthenticationService)
      const payload = {
        fullName:
          firebaseUser.displayName ||
          `${appleAuthRequestResponse.fullName?.givenName || ''} ${
            appleAuthRequestResponse.fullName?.familyName || ''
          }`.trim(),
        email: firebaseUser.email || appleAuthRequestResponse.email || '',
        provider: 'apple',
        appleUserId: firebaseUser.uid,
        photo: firebaseUser.photoURL || null,
      };

      console.log('Sending payload to social-login:', payload);
      const response = await AuthenticationService.SocialLogin(payload);

      if (response?.success) {
        await handleSuccessfulLogin(response);
      } else {
        showMessage({
          message: response?.message || 'Apple sign-in failed',
          type: 'danger',
        });
      }
    } catch (error) {
      console.log('Apple Sign-In error:', error);
      if (error?.code === appleAuth.Error.CANCELED) {
        console.log('User canceled Apple Sign-In');
      } else {
        showMessage({
          message: error.message || 'Apple sign-in failed. Please try again.',
          type: 'danger',
        });
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  // Regular email/password sign-in
  const handleOnPressSignIn = async () => {
    if (!email) {
      showMessage({ message: 'Email must be required', type: 'danger' });
      return;
    }
    if (!validateEmail(email.trim())) {
      showMessage({ message: 'Invalid Email Address', type: 'danger' });
      return;
    }
    if (!password) {
      showMessage({ message: 'Password must be required', type: 'danger' });
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      setIsSigningIn(true);
      const response = await AuthenticationService.Login(payload);
      
      if (response?.success) {
        LocalStorage.SetData('token', response?.token);
        dispatch(reminderAction.fetchAllReminders());
        dispatch(reminderAction.fetchAllUnplannedStopsReminders());
        dispatch(reminderAction.fetchAllRemembranceItems());
        dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
        dispatch(reminderAction.fetchAllDailySchedule());
        dispatch(reminderAction.fetchAllFeeds());

        // Check subscription status
        const hasPlan = response?.isSubscribed === true;

        if (!hasPlan) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'PlansScreen', params: { fromSignIn: true } }],
            }),
          );
          return;
        }

        // Handle biometrics setup if available
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();
        if (available && (
          biometryType === BiometryTypes.FaceID ||
          biometryType === BiometryTypes.TouchID ||
          biometryType === BiometryTypes.Biometrics
        )) {
          Alert.alert(
            biometryType === BiometryTypes.FaceID ? 'Face ID' : 'Touch ID',
            `Would you like to enable ${biometryType === BiometryTypes.FaceID ? 'Face ID' : 'Touch ID'} authentication for the next time?`,
            [
              {
                text: 'Yes please',
                onPress: async () => {
                  try {
                    await enrollBiometric(email.trim().toLowerCase(), password);
                    showMessage({
                      message: `${biometryType === BiometryTypes.FaceID ? 'Face ID' : 'Touch ID'} enabled successfully!`,
                      type: 'success',
                    });
                    handlePostLoginNavigation(response);
                  } catch (error) {
                    console.error('Biometric enrollment failed:', error);
                    showMessage({
                      message: `Failed to enable ${biometryType === BiometryTypes.FaceID ? 'Face ID' : 'Touch ID'}. Please try again later.`,
                      type: 'warning',
                    });
                    handlePostLoginNavigation(response);
                  }
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => handlePostLoginNavigation(response),
              },
            ],
          );
        } else {
          handlePostLoginNavigation(response);
        }
      } else {
        showMessage({
          message: response?.message || 'Login failed',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Login failed. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
  
      console.log('Google user info full response:', userInfo);
  
      const user = userInfo?.data?.user;
      if (!user) {
        showMessage({
          message: 'No user data received from Google',
          type: 'danger',
        });
        return;
      }
  
      // Build payload according to the API schema
      const payload = {
        fullName: user.name || `${user.givenName || ''} ${user.familyName || ''}`.trim(),
        email: user.email,
        phoneNumber: 0, // Default value since we don't have phone from Google
      };
  
      console.log('Sending payload to social-login:', payload);
  
      const response = await AuthenticationService.SocialLogin(payload);
      console.log('Social login response:', response);
  
      if (response?.success) {
        await handleSuccessfulLogin(response);
      } else {
        showMessage({
          message: response?.message || 'Google sign-in failed',
          type: 'danger',
        });
      }
  
    } catch (error) {
      console.log('Google login error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Sign-In cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showMessage({
          message: 'Play services not available or outdated.',
          type: 'warning',
        });
      } else {
        showMessage({
          message: 'Google sign-in failed. Please try again.',
          type: 'danger',
        });
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor:
          ThemeMode === 'dark'
            ? ThemeColors.DARK_THEME_COLOR
            : ThemeColors?.WHITE,
      }}
      contentContainerStyle={[
        styles.ScrollViewContentContainerStyle,
        {
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.MainContainer,
          {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors?.WHITE,
          },
        ]}>
        <View
          style={[
            styles.LogoContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
          <Image
            source={require('../../assets/images/app-icon.png')}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={[
            styles.ContentContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
          <TextBox
            onChangeText={setEmail}
            label={'Email Address'}
            value={email}
            textBoxStyle={{
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
              color:
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
            }}
          />
          <TextBox
            onChangeText={setPassword}
            label={'Password'}
            value={password}
            secureTextEntry={true}
            textBoxStyle={{
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
              color:
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
            }}
          />
          <View style={styles.ForgetPasswordTextContainer}>
            <TouchableOpacity
              style={styles.ForgetPasswordTextTouch}
              onPress={() => navigation.navigate('ForgotPasswordEmail')}
              disabled={isSigningIn}>
              <Text
                style={[
                  styles.ForgetPasswordText,
                  {
                    color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
                  },
                ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          
          <Button 
            title={isSigningIn ? 'Signing In...' : 'Sign In'} 
            onPress={handleOnPressSignIn} 
            disabled={isSigningIn}
          />
          
          <View style={styles.SignUpTextContainer}>
            <TouchableOpacity
              style={styles.SignUpTextTouch}
              onPress={() => navigation.navigate('SignUp')}
              disabled={isSigningIn}>
              <Text style={styles.SignUpText}>Don't have account?</Text>
              <Text
                style={[
                  styles.SignUpText2,
                  {
                    color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
                  },
                ]}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialButtonsRow}>
            {isAppleSignInAvailable && Platform.OS === 'ios' && (
              <View style={styles.AppleSignInButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.AppleSignInButton,
                    {
                      backgroundColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
                      borderColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
                    },
                  ]}
                  onPress={handleAppleSignIn}
                  disabled={isSigningIn}>
                  <FontAwesome5Pro
                    name="apple"
                    style={{
                      color: ThemeMode === 'dark' ? '#000000' : '#FFFFFF',
                      fontSize: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.AppleSignInButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.AppleSignInButton,
                  {
                    backgroundColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
                    borderColor: ThemeMode === 'dark' ? '#FFFFFF' : '#000000',
                  },
                ]}
                onPress={handleGoogleSignIn}
                disabled={isSigningIn}>
                <Image
                  source={require('../../assets/images/google-icon.png')}
                  style={{ width: 34, height: 34 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Biometric Sign-In */}
          {availableSensor && (
            <TouchableOpacity
              onPress={handleBiometricSignIn}
              disabled={isSigningIn}>
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                {isSigningIn ? (
                  <ActivityIndicator 
                    size="large" 
                    color={ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK} 
                  />
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name={biometryType === BiometryTypes.FaceID ? 'face-recognition' : 'fingerprint'}
                      style={{
                        color: ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors.DARK_THEME_COLOR,
                      }}
                      size={40}
                    />
                    <Text
                      style={[
                        styles.SignUpText2,
                        {
                          color: ThemeMode === 'dark' ? '#00DCFF' : ThemeColors.BLACK,
                        },
                      ]}>
                      {biometryType === BiometryTypes.FaceID
                        ? 'Login With Face ID'
                        : 'Login With Touch ID'}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;