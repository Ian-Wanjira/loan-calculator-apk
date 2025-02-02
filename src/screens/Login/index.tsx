import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {LoginForm} from '../../components/forms/LoginForm/LoginForm';

import {styles} from './styles';
import {useAuth} from '../../context';
import {userLogin} from '../../apis/userApi';
import {useNavigation} from '@react-navigation/native';
import {LoginFormInputs} from '../../components/forms/LoginForm/LoginForm';
import {getApiError} from '../../utils/errorController';
import axios from 'axios';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  // Global error state for login failures
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Access navigation object from React Navigation
  const navigation = useNavigation();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setGlobalError(null); // Reset any previous error
    try {
      const response = await userLogin({data});
      login(response.access, response.refresh);
    } catch (error) {
      // If the error has a global "detail" message, use that.
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        error.response.data.detail
      ) {
        const message = getApiError(error.response.data.detail);
        setGlobalError(message);
      } else {
        const message = getApiError((error as any)?.message);
        setGlobalError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      {/* Display global error message if one exists */}
      {globalError && <Text style={styles.globalErrorText}>{globalError}</Text>}
      <LoginForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        onSignUpPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export {Login};
