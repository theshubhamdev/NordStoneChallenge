import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {SignInNavigationProp} from '../../types/navigation';
import {useState} from 'react';
import {CustomInput, CustomButton} from '../../Components';
import auth from '@react-native-firebase/auth';

type SignInData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigation = useNavigation<SignInNavigationProp>();
  const [loading, setLoading] = useState(false);

  const {control, handleSubmit, reset} = useForm<SignInData>();

  const onSignInPressed = async ({email, password}: SignInData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      // if ((e as Error).name === 'UserNotConfirmedException') {
      //   navigation.navigate('Confirm email', {email});
      // } else {
      Alert.alert('Oopps', (e as Error).message);
      // }
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <View style={styles.root}>
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{required: 'Email is required'}}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        secureTextEntry
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password should be minimum 3 characters long',
          },
        }}
      />
      <CustomButton
        text={loading ? 'Loading...' : 'Sign In'}
        onPress={handleSubmit(onSignInPressed)}
      />
      <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} />
      <CustomButton
        text="Don't have an account? Create one"
        onPress={onSignUpPress}
      />
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
    justifyContent: 'center',
  },
});

export default SignIn;
