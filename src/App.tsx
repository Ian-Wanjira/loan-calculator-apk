import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './navigators/root-navigator';
import {AuthProvider} from './context/AuthContext';
import {LoanProvider} from './context/LoanContext';

const App = () => (
  <AuthProvider>
    <LoanProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </LoanProvider>
  </AuthProvider>
);

export {App};
