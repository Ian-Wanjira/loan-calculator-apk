import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Login, Results} from '../screens';

const AuthStack = createNativeStackNavigator({
  screens: {
    Login,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home,
    Results,
  },
});

export {AuthStack, RootStack};
