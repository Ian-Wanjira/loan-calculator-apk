import React from 'react';
import {createStaticNavigation} from '@react-navigation/native';

import {AuthStack, RootStack} from './navigatiors';

const Navigation = createStaticNavigation(AuthStack);

const App = () => <Navigation />;

export {App};
