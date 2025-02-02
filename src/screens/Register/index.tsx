import React, {useState} from 'react';
import {View, Text, Alert, ToastAndroid, Platform} from 'react-native';
import {styles} from './styles';
import {RegisterForm} from '../../components/forms/RegisterForm/RegisterForm';
import {getApiError} from '../../utils/errorController';

import {registerUser} from '../../apis/userApi';
import {useNavigation} from '@react-navigation/native';
import {RegisterFormInputs} from '../../components/forms/RegisterForm/RegisterForm';
import axios from 'axios';

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Access navigation object from React Navigation
  const navigation = useNavigation();

  const onSubmit = async (data: RegisterFormInputs, setError: any) => {
    setIsLoading(true);
    try {
      const response = await registerUser({data});

      if (response) {
        navigation.navigate('Login');
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object'
      ) {
        const errorData = error.response.data; // This should be an object with field keys.
        Object.keys(errorData).forEach(field => {
          // Here we let the DRF error structure come through;
          // if errorData[field] is an array, get the first message.
          const message = getApiError(errorData[field]);
          setError(field as keyof RegisterFormInputs, {
            type: 'server',
            message,
          });
        });
      } else {
        // For non-object error responses, fallback to a global error message.
        const message = getApiError((error as any)?.message);
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.LONG);
        } else {
          Alert.alert('Registration Failed', message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <RegisterForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        onRegisterPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export {Register};
