import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Login, Results, Register} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const RootStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Results" component={Results} />
  </Stack.Navigator>
);

export {AuthStack, RootStack};
