import {isAxiosError} from 'axios';

export const getApiError = (message: string[] | string | undefined): string => {
  if (Array.isArray(message) && message.length > 0) {
    return message[0];
  }
  if (typeof message === 'string' && message) {
    return message;
  }
  return 'Something went wrong';
};

export const axiosErrorHandler = (error: any): string => {
  if (isAxiosError(error)) {
    // Note: This is for global error messages.
    const errMessage = error.response?.data?.message;
    return getApiError(errMessage);
  }
  // For non-Axios errors, try to extract an error message
  return getApiError(error?.message);
};
