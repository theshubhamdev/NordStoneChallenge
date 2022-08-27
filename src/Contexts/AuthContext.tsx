import React from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
// import firebase from '@react-native-firebase/app';
// import RNfirebaseConfig from '../../android/app/google-services.json';

type UserType = FirebaseAuthTypes.User | null | undefined;

type AuthContextType = {
  user: UserType;
  fetchUser: (() => void) | undefined;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  fetchUser: undefined,
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  // let app;
  // if (firebase.apps.length === 0) {
  //   app = firebase.initializeApp(RNfirebaseConfig);
  // } else {
  //   app = firebase.app();
  // }

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<UserType>();

  // Handle user state changes
  function onAuthStateChanged(authUser: UserType) {
    setUser(authUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  const fetchUser = async () => {
    setUser(auth().currentUser);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{user, fetchUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
