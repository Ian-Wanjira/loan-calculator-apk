import React, {useState} from 'react';
import {Control, Controller, FieldError} from 'react-hook-form';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from '@react-native-vector-icons/feather';

import {styles} from './styles';

export interface FormControlProps {
  type: 'textInput' | 'select';
  control: Control<any>;
  name: string;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  icon?: string;
  options?: {label: string; value: string | number}[];
  textInputProps?: TextInputProps;
}

const FormControl: React.FC<FormControlProps> = props => {
  const {
    type,
    control,
    name,
    label,
    error,
    placeholder,
    icon,
    options,
    textInputProps,
  } = props;

  // Instead of just checking for 'password', check whether the field name includes 'password'
  const isSecureField = name.toLowerCase().includes('password');

  const [secureTextEntry, setSecureTextEntry] = useState(isSecureField);

  return (
    <View>
      {label && <Text style={styles.text}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) =>
          type === 'textInput' ? (
            <View>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                {...textInputProps} // Spread any additional TextInput props
                secureTextEntry={isSecureField ? secureTextEntry : false}
              />
              {/* Display the password toggle icon only for password fields  */}
              {isSecureField && (
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={styles.iconButton}
                  accessibilityLabel={
                    secureTextEntry ? 'Show password' : 'Hide password'
                  }>
                  <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={20} />
                </TouchableOpacity>
              )}
              {/* Display a custom icon if provided and not a password field */}
              {icon && !isSecureField && (
                <Icon name={icon as any} size={20} style={styles.iconButton} />
              )}
            </View>
          ) : (
            <Picker selectedValue={value} onValueChange={onChange}>
              {options?.map(option => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          )
        }
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

export {FormControl};
