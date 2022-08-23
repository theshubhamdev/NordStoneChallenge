import React, {FC} from 'react';
import AuthContextProvider from './src/Contexts/AuthContext';
import Navigation from './src/Navigation';

const App: FC = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
