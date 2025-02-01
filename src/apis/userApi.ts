import {API_URL} from '@env';
import axios from 'axios';
import {LoginResponse} from '../types/api';
import {axiosErrorHandler} from '../utils/errorController';

export const userLogin = async (email: string, password: string) => {
  console.log('userLogin called with:', email, password);
  console.log('API_URL', API_URL);
  try {
    const payload = {
      email: email,
      password: password,
    };
    console.log('payload', payload);
    const response = await axios.post<LoginResponse>(
      `${API_URL}/api/accounts/token/`,
      payload,
    );

    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
