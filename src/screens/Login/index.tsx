import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {LoginForm} from '../../components/forms/LoginForm/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from './styles';
import {useAuth} from '../../context';
import {userLogin} from '../../apis/userApi';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const response = await userLogin(data.email, data.password);
      // Store tokens in AsyncStorage
      console.log('Access Token:', response.access);
      console.log('Refresh Token:', response.refresh);
      await AsyncStorage.setItem('accessToken', response.access);
      await AsyncStorage.setItem('refreshToken', response.refresh);
      login();
    } catch (error) {
      // Handle error within the component (e.g., set an error state)
      console.error('Login failed:', error);
      Alert.alert('Login Failed', 'An error occurred during login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Calculator</Text>
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
    </View>
  );
};

export {Login};
