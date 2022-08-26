import React, {FC, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthContextProvider from './src/Contexts/AuthContext';
import Navigation from './src/Navigation';

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
