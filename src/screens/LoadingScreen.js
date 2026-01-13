import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Modal,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainNavigator from '../navigations/MainNavigator';
import FlashMessage from 'react-native-flash-message';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import {useDispatch, useSelector} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import * as commonAction from '../actions/Common/CommonAction';
import LocalStorage from '../utils/LocalStorage';
import messaging from '@react-native-firebase/messaging';
import NotificationServices from '../helper/NotificationServices';

console.log('✅ LoadingScreen: All imports completed');

const LoadingScreen = () => {
  console.log('🟢 LoadingScreen: Component function called');
  
  const permissionsToRequest = [
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ];

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.CommonReducer.loading);
  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);
  const isDarkMode = ThemeMode === 'dark';

  useEffect(() => {
    const checkAndRequestPermissions = async () => {
      try {
        await PermissionsAndroid.requestMultiple(permissionsToRequest);
      } catch (err) {
        //console.log(err);
      }
    };
    //checkAndRequestPermissions();
  }, []);

  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ Authorization status:', authStatus);
      }
    } catch (error) {
      console.error('❌ Error requesting user permission:', error);
    }
  }

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const hasPermission = await PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS');
        if (!hasPermission) {
          await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS', {
            title: 'Notification',
            message: 'App needs access to your notification so you can get Updates',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          });
        }
      } catch (err) {
        console.error('❌ Notification permission error:', err);
      }
    }
  };

  async function registerAppWithFCM() {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('✅ App registered with FCM');
    } catch (error) {
      console.error('❌ Error registering with FCM:', error);
    }
  }

  useEffect(() => {
    console.log('🟢 LoadingScreen: useEffect [notifications] - Starting...');
    try {
      console.log('🟢 LoadingScreen: Creating push notification channel...');
      PushNotification.createChannel(
        {
          channelId: '500',
          channelName: 'Remembery App channel',
          channelDescription: 'A channel to categorise your notifications',
          playSound: false,
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        },
        created => console.log(`✅ PushNotification.createChannel returned '${created}'`),
      );
      console.log('✅ LoadingScreen: Push notification channel creation initiated');
      
      // Wrap async calls in try-catch
      (async () => {
        try {
          console.log('🟢 LoadingScreen: Requesting notification permissions...');
          await requestNotificationPermission();
          console.log('✅ LoadingScreen: Notification permission requested');
          
          console.log('🟢 LoadingScreen: Requesting user permission...');
          await requestUserPermission();
          console.log('✅ LoadingScreen: User permission requested');
          
          console.log('🟢 LoadingScreen: Registering app with FCM...');
          await registerAppWithFCM();
          console.log('✅ LoadingScreen: App registered with FCM');
        } catch (error) {
          console.error('❌ LoadingScreen: Error initializing notifications:', error);
          console.error('❌ LoadingScreen: Error stack:', error?.stack);
        }
      })();
    } catch (error) {
      console.error('❌ LoadingScreen: Error setting up push notifications:', error);
      console.error('❌ LoadingScreen: Error stack:', error?.stack);
    }
    console.log('✅ LoadingScreen: useEffect [notifications] - Completed');
  }, []);

  useEffect(() => {
    console.log('🟢 LoadingScreen: useEffect [onLoad] - Starting...');
    const onLoad = async () => {
      try {
        console.log('🟢 LoadingScreen: Loading ThemeMode from storage...');
        var mode = await LocalStorage.GetData('ThemeMode');
        console.log('🟢 LoadingScreen: ThemeMode from storage:', mode);
        if (mode && mode != undefined && mode != null) {
          if (mode == 'dark') {
            console.log('🟢 LoadingScreen: Setting theme to dark');
            dispatch(commonAction?.changeTheme('dark'));
          } else {
            console.log('🟢 LoadingScreen: Setting theme to light');
            dispatch(commonAction?.changeTheme('light'));
          }
        } else {
          console.log('🟢 LoadingScreen: No theme mode found, setting to light');
          dispatch(commonAction?.changeTheme('light'));
        }
        
        console.log('🟢 LoadingScreen: Loading NotificationSwitch from storage...');
        var notification = await LocalStorage.GetData('NotificationSwitch');
        console.log('🟢 LoadingScreen: NotificationSwitch from storage:', notification);
        if (notification && notification != undefined && notification != null) {
          if (notification == 'true') {
            console.log('🟢 LoadingScreen: Setting notification switch to true');
            dispatch(commonAction?.changeNotificationSwitch(true));
          } else {
            console.log('🟢 LoadingScreen: Setting notification switch to false');
            dispatch(commonAction?.changeNotificationSwitch(false));
          }
        } else {
          console.log('🟢 LoadingScreen: No notification switch found, setting to true');
          await LocalStorage.SetData('NotificationSwitch', 'true');
          dispatch(commonAction?.changeNotificationSwitch(true));
        }
        console.log('✅ LoadingScreen: onLoad completed successfully');
      } catch (error) {
        console.error('❌ LoadingScreen: Error in onLoad:', error);
        console.error('❌ LoadingScreen: Error message:', error?.message);
        console.error('❌ LoadingScreen: Error stack:', error?.stack);
        // Set defaults on error
        console.log('🟢 LoadingScreen: Setting defaults due to error');
        dispatch(commonAction?.changeTheme('light'));
        dispatch(commonAction?.changeNotificationSwitch(true));
      }
    };
    onLoad();
    console.log('✅ LoadingScreen: useEffect [onLoad] - Completed');
  }, []);

  useEffect(() => {
    console.log('🟢 LoadingScreen: Configuring PushNotification...');
    try {
      PushNotification.configure({
        onRegister: function (token) {
          console.log('✅ PushNotification token:', token);
        },
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        onAction: function (notification) {
          console.log('ACTION:', notification.action);
          console.log('NOTIFICATION:', notification);
        },
        onRegistrationError: function (err) {
          console.error('❌ PushNotification registration error:', err.message, err);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
      });
      console.log('✅ PushNotification configured successfully');
    } catch (error) {
      console.error('❌ LoadingScreen: Error configuring PushNotification:', error);
      console.error('❌ Error stack:', error?.stack);
    }
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <React.Fragment>
      <NotificationServices />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            ThemeMode === 'dark'
              ? ThemeColors.DARK_THEME_COLOR
              : ThemeColors?.WHITE,
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <MainNavigator />
        <FlashMessage position="top" />
      </SafeAreaView>
      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.LoadingContainer}>
          <View
            style={
              ThemeMode === 'dark'
                ? styles.LoadingIndicatorBox2
                : styles.LoadingIndicatorBox
            }>
            <ActivityIndicator
              color={
                ThemeMode === 'dark' ? ThemeColors.WHITE : ThemeColors.BLACK
              }
              size="large"
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingIndicatorBox: {
    width: 70,
    height: 70,
    backgroundColor: ThemeColors.WHITE,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.BLACK,
    shadowColor: ThemeColors.WHITE,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  LoadingIndicatorBox2: {
    width: 70,
    height: 70,
    backgroundColor: ThemeColors.BLACK,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.WHITE,
    shadowColor: ThemeColors.BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default LoadingScreen;
