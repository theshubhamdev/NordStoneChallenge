import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {ForgotPasswordNavigationProp} from '../../types/navigation';
import {CustomButton, CustomInput} from '../../Components';
import auth from '@react-native-firebase/auth';

type ForgotPasswordData = {
  email: string;
};

const ForgotPassword = () => {
  const {control, handleSubmit, getValues} = useForm<ForgotPasswordData>();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [loading, setLoading] = useState(false);

  const onSendPressed = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(getValues().email);
      Alert.alert(
        'Check your email',
        `We have sent instructions to reset your password on ${
          getValues().email
        }. If you don't find any email, check your spam as well`,
      );
      navigation.navigate('Sign in');
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: 'Email is required',
        }}
      />
      <CustomButton
        text={loading ? 'Loading...' : 'Confirm'}
        onPress={handleSubmit(onSendPressed)}
      />
      <CustomButton text="Back to Sign in" onPress={onSignInPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
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

export default ForgotPassword;
