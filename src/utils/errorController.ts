import {isAxiosError} from 'axios';

export const getApiError = (message: string[] | string) => {
  try {
    if (Array.isArray(message)) {
      return message[0];
    } else if (message) {
      return message;
    } else {
      return 'Something went wrong';
    }
  } catch (error) {
    return 'Something went wrong';
  }
};

export const axiosErrorHandler = (error: any) => {
  if (isAxiosError(error)) {
    const err = error.response?.data?.message;
    if (typeof err === 'string') return err;
    if (Array.isArray(err)) return;
    return typeof err === 'string' ? err : 'Something went wrong';
  } else {
    return getApiError(error);
  }
};
