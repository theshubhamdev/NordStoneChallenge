import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigatorParamList} from '../types/navigation';
import {SignIn, SignUp, ConfirmEmail, ForgotPassword} from '../Screens/Auth';

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Sign up" component={SignUp} />
      <Stack.Screen
        name="Sign in"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Forgot password" component={ForgotPassword} />
      <Stack.Screen name="Confirm email" component={ConfirmEmail} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
