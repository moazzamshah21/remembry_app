// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Text,
//   useColorScheme,
// } from 'react-native';
// import React from 'react';
// import {GradientColors, ThemeColors, ThemeFonts} from '../utils/Theme';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {useSelector} from 'react-redux';
// const {width, height} = Dimensions.get('window');

// const SecondHeader = ({
//   navigation,
//   title = '',
//   subTitle = '',
//   backButtonGradient = GradientColors.GREEN,
//   backButtonColor = '#5da441',
// }) => {
//   const handleOnPressMenu = () => {
//     navigation.goBack();
//   };
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

//   return (
//     <View
//       style={{
//         backgroundColor:
//           ThemeMode === 'dark' ? ThemeColors?.DARK_THEME_COLOR : '#F5F5F5',
//       }}>
//       <View style={styles.MainContainer}>
//         <LinearGradient
//           colors={GradientColors.GREEN}
//           start={{x: 0, y: 0}}
//           end={{x: 0, y: 1}}
//           style={styles.LinearGradientContainer}>
//           <View style={styles.IconView}>
//             <View style={styles.IconRing}>
//               <TouchableOpacity onPress={handleOnPressMenu}>
//                 <LinearGradient
//                   colors={backButtonGradient}
//                   start={{x: 0, y: 0}}
//                   end={{x: 0, y: 1}}
//                   style={styles.IconCircleLinearGradient}>
//                   <View
//                     style={[
//                       styles.IconCircle,
//                       {backgroundColor: backButtonColor},
//                     ]}>
//                     <EntypoIcon
//                       name="chevron-small-left"
//                       style={{color: ThemeColors.WHITE}}
//                       size={30}
//                     />
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.TextView}>
//             <Text style={styles.MainTitleText}>{title}</Text>
//             <Text adjustsFontSizeToFit style={styles.SubTitleText}>{subTitle}</Text>
//           </View>
//         </LinearGradient>
//       </View>
//     </View>
//   );
// };

// export default SecondHeader;

// const styles = StyleSheet.create({
//   MainContainer: {
//     height: 100,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     overflow: 'hidden',
//   },
//   LinearGradientContainer: {
//     height: 100,
//     width: width,
//     flexDirection: 'row',
//   },
//   IconView: {
//     height: 100,
//     width: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   IconRing: {
//     width: 53,
//     height: 53,
//     borderRadius: 53 / 2,
//     borderWidth: 1,
//     borderColor: ThemeColors.WHITE,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   IconCircleLinearGradient: {
//     width: 53,
//     height: 53,
//     padding: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   IconCircle: {
//     width: 42,
//     height: 42,
//     borderRadius: 42 / 2,
//     backgroundColor: '#59a03d',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 0,
//   },
//   TextView: {
//     height: 100,
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   MainTitleText: {
//     textAlign: 'right',
//     color: ThemeColors.WHITE,
//     fontFamily: ThemeFonts.SEMI_BOLD,
//     fontSize: 20,
//   },
//   SubTitleText: {
//     textAlign: 'right',
//     color: ThemeColors.WHITE,
//     fontFamily: ThemeFonts.MEDIUM,
//     fontSize: 10,
//     opacity: 0.6,
//   },
//   ProfileText: {
//     fontSize: 15,
//     color: ThemeColors.BLACK,
//     fontFamily: ThemeFonts.MEDIUM,
//   },
// });


// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Text,
//   useColorScheme,
// } from 'react-native';
// import React from 'react';
// import {GradientColors, ThemeColors, ThemeFonts} from '../utils/Theme';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {useSelector} from 'react-redux';
// const {width, height} = Dimensions.get('window');

// const SecondHeader = ({
//   navigation,
//   title = '',
//   subTitle = '',
//   backButtonGradient = GradientColors.GREEN,
//   backButtonColor = '#5da441',
// }) => {
//   const handleOnPressMenu = () => {
//     navigation.goBack();
//   };
//   const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

//   return (
//     <View
//       style={{
//         backgroundColor:
//           ThemeMode === 'dark' ? ThemeColors?.DARK_THEME_COLOR : '#F5F5F5',
//       }}>
//       <View style={styles.MainContainer}>
//         <LinearGradient
//           colors={GradientColors.GREEN}
//           start={{x: 0, y: 0}}
//           end={{x: 0, y: 1}}
//           style={styles.LinearGradientContainer}>
//           <View style={styles.IconView}>
//             <View style={styles.IconRing}>
//               <TouchableOpacity onPress={handleOnPressMenu}>
//                 <LinearGradient
//                   colors={backButtonGradient}
//                   start={{x: 0, y: 0}}
//                   end={{x: 0, y: 1}}
//                   style={styles.IconCircleLinearGradient}>
//                   <View
//                     style={[
//                       styles.IconCircle,
//                       {backgroundColor: backButtonColor},
//                     ]}>
//                     <EntypoIcon
//                       name="chevron-small-left"
//                       style={{color: ThemeColors.WHITE}}
//                       size={30}
//                     />
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.TextView}>
//             <Text style={styles.MainTitleText}>{title}</Text>
//             <Text adjustsFontSizeToFit style={styles.SubTitleText}>{subTitle}</Text>
//           </View>
//         </LinearGradient>
//       </View>
//     </View>
//   );
// };

// export default SecondHeader;

// const styles = StyleSheet.create({
//   MainContainer: {
//     height: 100,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     overflow: 'hidden',
//   },
//   LinearGradientContainer: {
//     height: 100,
//     width: width,
//     flexDirection: 'row',
//   },
//   IconView: {
//     height: 100,
//     width: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   IconRing: {
//     width: 53,
//     height: 53,
//     borderRadius: 53 / 2,
//     borderWidth: 1,
//     borderColor: ThemeColors.WHITE,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   IconCircleLinearGradient: {
//     width: 53,
//     height: 53,
//     padding: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   IconCircle: {
//     width: 42,
//     height: 42,
//     borderRadius: 42 / 2,
//     backgroundColor: '#59a03d',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 0,
//   },
//   TextView: {
//     height: 100,
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   MainTitleText: {
//     textAlign: 'right',
//     color: ThemeColors.WHITE,
//     fontFamily: ThemeFonts.SEMI_BOLD,
//     fontSize: 20,
//   },
//   SubTitleText: {
//     textAlign: 'right',
//     color: ThemeColors.WHITE,
//     fontFamily: ThemeFonts.MEDIUM,
//     fontSize: 10,
//     opacity: 0.6,
//   },
//   ProfileText: {
//     fontSize: 15,
//     color: ThemeColors.BLACK,
//     fontFamily: ThemeFonts.MEDIUM,
//   },
// });


import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {GradientColors, ThemeColors, ThemeFonts} from '../utils/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import LocalStorage from '../utils/LocalStorage';
import { CommonActions } from '@react-navigation/native';
import * as ActionTypes from '../actions/ActionTypes';

const {width, height} = Dimensions.get('window');

const SecondHeader = ({
  navigation,
  title = '',
  subTitle = '',
  backButtonGradient = GradientColors.GREEN,
  backButtonColor = '#5da441',
  hideBackButton = false,
  showLogoutButton = false
}) => {
  const dispatch = useDispatch();
  
  const handleOnPressMenu = () => {
    navigation.goBack();
  };
  
  const handleLogout = async () => {
    // Clear Redux state (including user.isSubscribed)
    dispatch({ type: ActionTypes.LOGOUT });
    
    // Clear token from storage
    await LocalStorage.RemoveData('token');
    
    // Navigate to SignIn
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      }),
    );
  };
  
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  return (
    <View
      style={{
        backgroundColor:
          ThemeMode === 'dark' ? ThemeColors?.DARK_THEME_COLOR : '#F5F5F5',
      }}>
      <View style={styles.MainContainer}>
        <LinearGradient
          colors={GradientColors.GREEN}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.LinearGradientContainer}>
          
          {/* Back Button or Logout Button */}
          <View style={styles.IconView}>
            {!hideBackButton && (
              <View style={styles.IconRing}>
                <TouchableOpacity onPress={handleOnPressMenu}>
                  <LinearGradient
                    colors={backButtonGradient}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    style={styles.IconCircleLinearGradient}>
                    <View
                      style={[
                        styles.IconCircle,
                        {backgroundColor: backButtonColor},
                      ]}>
                      <EntypoIcon
                        name="chevron-small-left"
                        style={{color: ThemeColors.WHITE}}
                        size={30}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
            
            {showLogoutButton && (
              <View style={styles.IconRing}>
                <TouchableOpacity onPress={handleLogout}>
                  <LinearGradient
                    colors={GradientColors.RED}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    style={styles.IconCircleLinearGradient}>
                    <View
                      style={[
                        styles.IconCircle,
                        {backgroundColor: '#e74c3c'},
                      ]}>
                      <SimpleLineIcons
                        name="logout"
                        style={{color: ThemeColors.WHITE}}
                        size={20}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.TextView}>
            <Text style={styles.MainTitleText}>{title}</Text>
            <Text adjustsFontSizeToFit style={styles.SubTitleText}>{subTitle}</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default SecondHeader;

const styles = StyleSheet.create({
  MainContainer: {
    height: 100,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  LinearGradientContainer: {
    height: 100,
    width: width,
    flexDirection: 'row',
  },
  IconView: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconRing: {
    width: 53,
    height: 53,
    borderRadius: 53 / 2,
    borderWidth: 1,
    borderColor: ThemeColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IconCircleLinearGradient: {
    width: 53,
    height: 53,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconCircle: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    backgroundColor: '#59a03d',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  TextView: {
    height: 100,
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  MainTitleText: {
    textAlign: 'right',
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 20,
  },
  SubTitleText: {
    textAlign: 'right',
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    opacity: 0.6,
  },
  ProfileText: {
    fontSize: 15,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
});