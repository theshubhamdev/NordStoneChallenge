import {View, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {CustomButton} from '../Components';
import auth from '@react-native-firebase/auth';

const Notification: FC = () => {
  const signOut = async () => {
    await auth().signOut();
  };
  return (
    <View style={styles.root}>
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
});

export default Notification;
