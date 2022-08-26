import {View, StyleSheet, Pressable, Text} from 'react-native';
import React, {FC} from 'react';
import {CustomButton} from '../Components';
import auth from '@react-native-firebase/auth';
import {handleNotification} from '../Utils/notification';

const Notification: FC = () => {
  const signOut = async () => {
    await auth().signOut();
  };

  const onNotifyHandler = async () => {
    handleNotification({
      data: {
        bigText: 'Example',
        subText: 'This a subTest',
        message: 'This is a message',
      },
      foreground: false,
      userInteraction: false,
      message: '',
      badge: 0,
      alert: undefined,
      sound: '',
      id: '',
      finish: function (fetchResult: string): void {
        throw new Error('Function not implemented.', fetchResult);
      },
    });
  };

  return (
    <View style={styles.root}>
      <Pressable style={styles.notify} onPress={onNotifyHandler}>
        <Text style={styles.text}>Notify Me</Text>
      </Pressable>
      <CustomButton text="Sign out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notify: {
    backgroundColor: 'red',
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

export default Notification;
