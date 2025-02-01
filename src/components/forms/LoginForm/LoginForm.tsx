// components/forms/LoginForm.tsx
import React from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormControl} from '../../FormControl';
import {loginSchema} from '../../../utils/validations';

import {Button} from '../../Button';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit, isLoading}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <View>
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
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export {LoginForm};
