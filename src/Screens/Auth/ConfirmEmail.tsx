import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {ConfirmEmailNavigationProp} from '../../types/navigation';
import {CustomButton, CustomInput} from '../../Components';
import auth from '@react-native-firebase/auth';
import {useAuthContext} from '../../Contexts/AuthContext';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type ConfirmEmailData = {
  email: string;
  code: string;
};

const ConfirmEmailScreen = () => {
  const {user} = useAuthContext();
  const navigation = useNavigation<ConfirmEmailNavigationProp>();

  const {control, handleSubmit, getValues} = useForm<ConfirmEmailData>({
    defaultValues: {email: user?.email ? user.email : ''},
  });
  const [loading, setLoading] = useState(false);

  const onConfirmPressed = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await auth().applyActionCode(getValues().code);
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await user?.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://nordstone-64af0.web.app/email-verification',
      });
      Alert.alert('Check your email', 'The code has been sent');
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>
      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: 'Username is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomInput
        name="code"
        control={control}
        placeholder="Enter your confirmation code"
        rules={{
          required: 'Confirmation code is required',
        }}
      />
      <CustomButton
        text={loading ? 'Loading...' : 'Confirm'}
        onPress={handleSubmit(onConfirmPressed)}
      />
      <CustomButton text="Resend code" onPress={onResendPress} />
      <CustomButton text="Back to Sign in" onPress={onSignInPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
