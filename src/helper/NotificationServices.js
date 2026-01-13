import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const NotificationServices = () => {
  // useEffect(() => {
  //   messaging().registerDeviceForRemoteMessages();
  // }, []);

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('BackgroundMessageHandler:', remoteMessage);
        const {notification, messageId, data} = remoteMessage;
        if (Platform.OS == 'ios') {
          PushNotificationIOS.addNotificationRequest({
            id: messageId,
            body: notification.body,
            title: notification.title,
            sound: 'default',
            foreground: true,
            data: data,
          });
        } else {
          PushNotification.localNotification({
            channelId: '500',
            vibrate: true,
            priority: 'high',
            id: 0,
            title: notification.title,
            message: notification.body,
            playSound: true,
            soundName: 'default',
            foreground: true,
            data: data,
          });
        }
      },
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('onMessage:', remoteMessage);
      const {notification, messageId, data} = remoteMessage;
      if (Platform.OS == 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: 'default',
          data: data,
        });
      } else {
        PushNotification.localNotification({
          channelId: '500',
          vibrate: true,
          priority: 'high',
          id: 0,
          title: notification.title,
          message: notification.body,
          soundName: 'default',
          foreground: true,
          data: data,
        });
      }
    });
    return unsubscribe;
  }, []);

  return null;
};

export default NotificationServices;
