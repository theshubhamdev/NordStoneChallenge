import {
  PushNotificationObject,
  ReceivedNotification,
} from 'react-native-push-notification';

export type NotificationChannel = 'test';

export type NotificationData = PushNotificationObject &
  ReceivedNotification['data'] & {
    channelId?: NotificationChannel;
    subFeature?: string; // To identify sub types of feature to perform respective notification action.
  };

export type NotificationDecoded = Omit<
  ReceivedNotification,
  'userInfo' | 'data'
> & {
  data: NotificationData;
};
