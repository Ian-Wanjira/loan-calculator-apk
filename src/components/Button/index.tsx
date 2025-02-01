import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';

interface ButtonProps {
  title: string;
  isLoading: boolean;
  onPress: (event: GestureResponderEvent) => void;
}
const Button: React.FC<ButtonProps> = ({title, isLoading, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.disabledButton]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export {Button};
