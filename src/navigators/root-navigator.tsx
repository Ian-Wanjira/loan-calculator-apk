import React from 'react';

import {useAuth} from '../context';
import {AuthStack, RootStack} from './stack-navigator';

const RootNavigator = () => {
  const {isAuthenticated} = useAuth();

  return isAuthenticated ? <RootStack /> : <AuthStack />;
};

export {RootNavigator};
