import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthStack, RootStack} from './navigatiors';

const App = () => (
  <NavigationContainer>
    {false ? <RootStack /> : <AuthStack />}
  </NavigationContainer>
);

export {App};
