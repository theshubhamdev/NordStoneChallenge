import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification, {
  PushNotificationOptions,
} from 'react-native-push-notification';

import {NotificationData, NotificationDecoded} from './notification.types';

const onRegister: PushNotificationOptions['onRegister'] = async ({token}) => {
  // Update this in backend
  await AsyncStorage.setItem('FCM_TOKEN', token);
};

export const handleNotification = async (notification: NotificationDecoded) => {
  const data: NotificationData = {
    ...notification.data,
    channelId: notification.data.channelId || 'test',
  };
  PushNotification.localNotification(data);
};

const onNotification: PushNotificationOptions['onNotification'] =
  async notification => {
    try {
      // Process notification
      const {data} = notification;
      if (!data) {
        throw Error('NotificationWithoutData');
      }
      let notificationData: NotificationData;
      if (data.stringified) {
        notificationData = JSON.parse(data.stringified) as NotificationData;
      } else {
        notificationData = data as NotificationData;
      }

      const notificationDecoded: NotificationDecoded = {
        ...notification,
        data: notificationData,
      };
      handleNotification(notificationDecoded);
    } catch (err) {
      console.error(err);
    }
  };

export {onRegister, onNotification};
