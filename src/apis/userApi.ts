import {API_URL} from '@env';
import axios from 'axios';
import {LoginResponse, RegisterResponse} from '../types/api';
import {LoginFormInputs} from '../components/forms/LoginForm/LoginForm';
import {RegisterFormInputs} from '../components/forms/RegisterForm/RegisterForm';

export const userLogin = async ({data}: {data: LoginFormInputs}) => {
  console.log('userLogin called with:', data);
  console.log('API_URL', API_URL);
  try {
    const payload = {
      email: data.email,
      password: data.password,
    };
    console.log('payload', payload);
    const response = await axios.post<LoginResponse>(
      `${API_URL}/api/accounts/token/`,
      payload,
    );

    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async ({data}: {data: RegisterFormInputs}) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/api/accounts/register/`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
