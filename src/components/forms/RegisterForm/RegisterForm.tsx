import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {FormControl} from '../../FormControl';
import {Button} from '../../Button';
import {registerSchema} from '../../../utils/validations';
import {useForm, UseFormSetError} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

export interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmit: (
    data: RegisterFormInputs,
    setError: UseFormSetError<RegisterFormInputs>,
  ) => void;
  isLoading: boolean;
  onRegisterPress: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading,
  onRegisterPress,
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  // Our local submit handler passes setError along to the parent's onSubmit,
  // ensuring that any field-specific errors can be set by the container.
  const onLocalSubmit = (data: RegisterFormInputs) => {
    onSubmit(data, setError);
  };
  return (
    <View style={styles.form}>
      <FormControl
        type="textInput"
        control={control}
        name="name"
        label="Name"
        placeholder="Enter your name"
        error={errors.name}
        icon="user"
      />
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
      <FormControl
        type="textInput"
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        error={errors.confirmPassword}
      />

      <Button
        title="Register"
        isLoading={isLoading}
        onPress={handleSubmit(onLocalSubmit)}
      />
      <Text style={styles.loginContainer}>
        Already have an account?{' '}
        <Text style={styles.loginText} onPress={onRegisterPress}>
          Log In
        </Text>
      </Text>
    </View>
  );
};

export {RegisterForm};
