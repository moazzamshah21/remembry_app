import React, { useEffect, useState } from 'react';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { navigationRef } from './NavigationRef';
import LocalStorage from '../utils/LocalStorage';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordEmailScreen from '../screens/ForgotPasswordEmailScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EmailVerifyScreen from '../screens/EmailVerifyScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import AddItemScreen from '../screens/AddItemScreen';
import RemembranceScreen from '../screens/RemembranceScreen';
import CreateRemembranceItemScreen from '../screens/CreateRemembranceItemScreen';
import DailyScheculeScreen from '../screens/DailyScheculeScreen';
import UnplannedStopsScreen from '../screens/UnplannedStopsScreen';
import CreateUnplannedStopsScreen from '../screens/CreateUnplannedStopsScreen';
import LocateItemScreen from '../screens/LocateItemScreen';
import UnplannedStopsLocateItemScreen from '../screens/UnplannedStopsLocateItemScreen';
import LocateItemDetailScreen from '../screens/LocateItemDetailScreen';
import TrackItemScreen from '../screens/TrackItemScreen';
import QuestionScreen from '../screens/QuestionScreen';
import TimerScreen from '../screens/TimerScreen';
import SettingScreen from '../screens/SettingScreen';
import EditSettingScreen from '../screens/EditSettingScreen';
import Animated, { interpolate } from 'react-native-reanimated';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Switch,
} from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import CreateAddItemScreen from '../screens/CreateAddItemScreen';
import SetTimerForAddItemScreen from '../screens/SetTimerForAddItemScreen';
import SetTimerForRemembranceItemScreen from '../screens/SetTimerForRemembranceItemScreen';
import SetTimerForScheduleScreen from '../screens/SetTimerForScheduleScreen';
import SetTimerForUnplannedStopsScreen from '../screens/SetTimerForUnplannedStopsScreen';
import FeedsScreen from '../screens/FeedsScreen';
import FeedsDetailScreen from '../screens/FeedsDetailScreen';
import { useDispatch, useSelector } from 'react-redux';
import * as reminderAction from '../actions/Reminder/ReminderAction';
import * as commonAction from '../actions/Common/CommonAction';
import * as ActionTypes from '../actions/ActionTypes';
import UserManualScreen from '../screens/UserManualScreen';
import UserService from '../services/UserServices/UserService';
import NotesScreen from '../screens/NotesScreen';
import PlansScreen from '../screens/PlansScreen';
import { ModalProvider, useModal } from '../modals/ModalProvider';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const { navigation } = props;

  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: ThemeColors.WHITE,
    },
    ContentContainer: {
      flexGrow: 1,
    },
    LogoContainer: {
      height: 100,
      paddingHorizontal: 15,
      marginBottom: 30,
      justifyContent: 'center',
    },
    MenuItem: {
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    MenuItemText: {
      fontFamily: ThemeFonts.MEDIUM,
      fontSize: 15,
      color: ThemeColors.BLACK,
    },
    MenuItemText2: {
      fontFamily: ThemeFonts.SEMI_BOLD,
      fontSize: 15,
      color: '#2196F3',
    },
    TextView: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    CompanyBrandingText: {
      fontFamily: ThemeFonts.MEDIUM,
      color: ThemeColors.BLACK,
      fontSize: 12,
      textAlign: 'left',
      paddingBottom: 15,
      paddingVertical: 10,
      flexGrow: 1
    },
  });

  const [themeMode, setThemeMode] = useState(false);
  const [notificationSwitch, setNotificationSwitch] = useState(false);

  const { openPlansModal } = useModal();
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const NotificationSwitch = useSelector(state => state.CommonReducer.notificationSwitch);
  const user = useSelector(state => state.CommonReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const onLoad = async () => {
      var mode = await LocalStorage.GetData('ThemeMode');
      if (mode && mode != undefined && mode != null) {
        if (mode == 'dark') {
          setThemeMode(true);
        } else {
          setThemeMode(false);
        }
      } else {
        setThemeMode(false);
      }

      var notification = await LocalStorage.GetData('NotificationSwitch');
      if (notification && notification != undefined && notification != null) {
        if (notification == 'true') {
          setNotificationSwitch(true);
        } else {
          setNotificationSwitch(false);
        }
      } else {
        setNotificationSwitch(false);
      }
    };
    onLoad();
  }, []);

  const toggleDarkModeSwitch = () => {
    if (themeMode == true) {
      LocalStorage.SetData('ThemeMode', 'light');
      dispatch(commonAction?.changeTheme('light'));
      setThemeMode(previousState => !previousState);
    } else {
      if (user.isSubscribed === true) {
        LocalStorage.SetData('ThemeMode', 'dark');
        dispatch(commonAction?.changeTheme('dark'));
        setThemeMode(previousState => !previousState);
      } else {
        openPlansModal()
      }
    }
  };

  const toggleSwitch = () => {
    if (NotificationSwitch == false) {
      LocalStorage.SetData('NotificationSwitch', 'true');
      dispatch(commonAction?.changeNotificationSwitch(true));
      setNotificationSwitch(true);
    } else {
      LocalStorage.SetData('NotificationSwitch', 'false');
      dispatch(commonAction?.changeNotificationSwitch(false));
      setNotificationSwitch(false);
    }
  };

  return (
    <Animated.View
      style={[
        styles.MainContainer,
        {
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        },
      ]}>
      <View style={styles.ContentContainer}>
        <View style={styles.LogoContainer}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.MenuContainer}>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AboutUs');
              }}>
              <Text
                style={[
                  styles.MenuItemText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                About
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.MenuItem}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.MenuItemText,
                    {
                      color:
                        ThemeMode === 'dark'
                          ? ThemeColors.WHITE
                          : ThemeColors?.BLACK,
                    },
                  ]}>
                  Notifications
                </Text>
              </TouchableOpacity>
              <Switch
                trackColor={{ false: '#767577', true: ThemeColors.SIMPLE_GRAY }}
                thumbColor={notificationSwitch ? '#3BA20F' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={notificationSwitch}
              />
            </View>
          </View>
          <View style={styles.MenuItem}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.MenuItemText,
                    {
                      color:
                        ThemeMode === 'dark'
                          ? ThemeColors.WHITE
                          : ThemeColors?.BLACK,
                    },
                  ]}>
                  Dark Mode
                </Text>
              </TouchableOpacity>
              <Switch
                trackColor={{ false: '#767577', true: ThemeColors.SIMPLE_GRAY }}
                thumbColor={themeMode ? '#3BA20F' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDarkModeSwitch}
                value={themeMode}
              />
            </View>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FeedsScreen');
              }}>
              <Text
                style={[
                  styles.MenuItemText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                Social Feed
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserManualScreen');
              }}>
              <Text
                style={[
                  styles.MenuItemText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                User Manual
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NotesScreen');
              }}>
              <Text
                style={[
                  styles.MenuItemText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                Notes
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PlansScreen');
              }}>
              <Text
                style={[
                  styles.MenuItemText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                Plans
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SettingScreen');
              }}>
              <Text
                style={[
                  styles.MenuItemText,
                  {
                    color:
                      ThemeMode === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors?.BLACK,
                  },
                ]}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.FooterContainer}>
        <View style={styles.MenuContainer}>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                // Clear Redux state
                dispatch({ type: ActionTypes.LOGOUT });
                LocalStorage.RemoveData('token');
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'SignIn' }],
                  }),
                );
              }}>
              <Text style={styles.MenuItemText2}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.TextView}>
          <Text
            style={[
              styles.CompanyBrandingText,
              {
                color:
                  ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors?.BLACK,
              },
            ]}>
            <Text style={{ fontSize: 8 }}>Powered by</Text>{'\n'}Digital Software Labs{'\n'}Version
            {/* {' '}
            {DeviceInfo.getVersion()} */} 1.0.7
          </Text>
          <Image
            source={require('../../assets/images/ada-logo.png')}
            style={{
              height: 70,
              width: 70
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const DrawerNavigator = ({ isLogin = false }) => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName={'Home'}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ animationEnabled: false }}
      />
    </Drawer.Navigator>
  );
};

const StackNavigator = ({
  isLogin = false,
  isQuestionSubmit = false,
  isQuestionApproved = false,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'Dashboard' : 'SignIn'}
      screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="TimerScreen"
        component={TimerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCodeScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="EmailVerify"
        component={EmailVerifyScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DrawerNavigator}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="Remembrance"
        component={RemembranceScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreateRemembranceItem"
        component={CreateRemembranceItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="DailySchecule"
        component={DailyScheculeScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="UnplannedStops"
        component={UnplannedStopsScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="LocateItem"
        component={LocateItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="UnplannedStopsLocateItem"
        component={UnplannedStopsLocateItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="LocateItemDetail"
        component={LocateItemDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="TrackItem"
        component={TrackItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreateAddItem"
        component={CreateAddItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SetTimerForAddItem"
        component={SetTimerForAddItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SetTimerForRemembranceItem"
        component={SetTimerForRemembranceItemScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SetTimerForSchedule"
        component={SetTimerForScheduleScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreateUnplannedStops"
        component={CreateUnplannedStopsScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SetTimerForUnplannedStops"
        component={SetTimerForUnplannedStopsScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="FeedsScreen"
        component={FeedsScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="FeedsDetailScreen"
        component={FeedsDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="UserManualScreen"
        component={UserManualScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="EditSettingScreen"
        component={EditSettingScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="NotesScreen"
        component={NotesScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="PlansScreen"
        component={PlansScreen}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(null);
  const [isQuestionSubmit, setIsQuestionSubmit] = useState(null);
  const [isQuestionApproved, setIsQuestionApproved] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      const token = await LocalStorage.GetData('token');
      var tempIsQuestionSubmit = await LocalStorage.GetData('isQuestionSubmit');
      setIsQuestionSubmit(tempIsQuestionSubmit == 'true' ? true : false);
      var tempIsQuestionApproved = await LocalStorage.GetData(
        'isQuestionSubmit',
      );
      setIsQuestionApproved(tempIsQuestionApproved == 'true' ? true : false);
      setIsLogin(token !== null);
      if (token !== null) {
        dispatch(commonAction.fetchUserDetail());
        dispatch(reminderAction.fetchAllReminders());
        dispatch(reminderAction.fetchAllUnplannedStopsReminders());
        dispatch(reminderAction.fetchAllRemembranceItems());
        dispatch(reminderAction.fetchAllCurrentMonthDailySchedule());
        dispatch(reminderAction.fetchAllDailySchedule());
        dispatch(reminderAction.fetchAllFeeds());
      }
    };
    onLoad();
    return () => {
      onLoad();
    };
  }, []);

  const saveFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    let payload = {
      token: fcmToken,
    };
    await UserService.AddDeviceToken(payload);
  };

  useEffect(() => {
    saveFcmToken();
  }, []);

  return isLogin !== null ? (
    <NavigationContainer ref={navigationRef}>
      <ModalProvider>
        <StackNavigator
          isLogin={isLogin}
          isQuestionSubmit={isQuestionSubmit}
          isQuestionApproved={isQuestionApproved}
        />
      </ModalProvider>
    </NavigationContainer>
  ) : null;
};

export default MainNavigator;
