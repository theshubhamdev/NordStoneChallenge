import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {CustomButton, CustomInput} from '../../Components';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {SignUpNavigationProp} from '../../types/navigation';
import auth from '@react-native-firebase/auth';
import {validateEmail} from '../../Utils/validateEmail';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type SignUpData = {
  email: string;
  password: string;
  passwordRepeat: string;
};

const SignUp = () => {
  const {control, handleSubmit, watch} = useForm<SignUpData>();
  const pwd = watch('password');
  const navigation = useNavigation<SignUpNavigationProp>();
  const [loading, setLoading] = useState(false);

  const onRegisterPressed = async ({email, password}: SignUpData) => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const validateEmailResp = await validateEmail(email);
      if (validateEmailResp) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.warn(response.user);
      } else {
        Alert.alert('Oops', 'Please enter a valid email');
      }
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should be at least 8 characters long',
          },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            message:
              'Password must contain at least 1 number, 1 small letter, 1 capital letter, and 1 special characters',
          },
        }}
      />
      <CustomInput
        name="passwordRepeat"
        control={control}
        placeholder="Repeat Password"
        secureTextEntry
        rules={{
          validate: (value: string) => value === pwd || 'Password do not match',
        }}
      />
      <CustomButton
        text={loading ? 'Loading...' : 'Register'}
        onPress={handleSubmit(onRegisterPressed)}
      />
      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={onPrivacyPressed}>
          Privacy Policy
        </Text>
      </Text>
      <CustomButton text="Have an account? Sign in" onPress={onSignInPress} />
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
    color: 'lightblue',
  },
});

export default SignUp;
