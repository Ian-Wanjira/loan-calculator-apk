import React, {useState} from 'react';
import {Alert, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Icon from '@react-native-vector-icons/feather';

import {loginSchema} from '../../utils/validations';

import {styles} from './styles';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    Alert.alert('Login', `Email: ${data.email}, Password: ${data.password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Calculator</Text>

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.input,
              focusedInput === 'email' && styles.inputFocused,
              errors.email && styles.inputError,
            ]}
            onBlur={() => {
              onBlur();
              setFocusedInput(null);
            }}
            onFocus={() => setFocusedInput('email')}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused,
                errors.password && styles.inputError,
              ]}
              onBlur={() => {
                onBlur();
                setFocusedInput(null);
              }}
              onFocus={() => setFocusedInput('password')}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.toggleButton}
              hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon name={secureTextEntry ? 'eye' : 'eye-off'} size={20} />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export {Login};
