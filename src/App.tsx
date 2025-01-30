import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './navigators/root-navigator';
import {AuthProvider} from './context';

const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </AuthProvider>
);

export {App};
