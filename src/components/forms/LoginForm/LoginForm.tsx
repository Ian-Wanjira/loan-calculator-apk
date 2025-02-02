// components/forms/LoginForm.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {useForm, UseFormSetError} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormControl} from '../../FormControl';
import {loginSchema} from '../../../utils/validations';
import {styles} from './styles';
import {Button} from '../../Button';

export interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (
    data: LoginFormInputs,
    setError: UseFormSetError<LoginFormInputs>,
  ) => void;
  isLoading: boolean;
  onSignUpPress: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  onSignUpPress,
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onLocalSubmit = (data: LoginFormInputs) => {
    onSubmit(data, setError);
  };

  return (
    <View style={styles.form}>
      <FormControl
        type="textInput"
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        error={errors.email}
        icon="mail"
      />

      <FormControl
        type="textInput"
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        error={errors.password}
      />

      <Button
        title="Login"
        isLoading={isLoading}
        onPress={handleSubmit(onLocalSubmit)}
      />
      <Text style={styles.signUpContainer}>
        Don't have an account?{' '}
        <Text style={styles.signUpText} onPress={onSignUpPress}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export {LoginForm};
