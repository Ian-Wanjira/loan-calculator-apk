import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';

// Define the props interface for the Header component
interface HeaderProps {
  title: string; // Title of the header
  onBackPress?: () => void; // Optional callback for back button
  onLogoutPress?: () => void; // Optional callback for logout button
}

const Header = ({title, onBackPress, onLogoutPress}: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Button (either Logout or nothing) */}
      {(onLogoutPress || onBackPress) && (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={onLogoutPress || onBackPress}>
          <Text style={styles.buttonText}>
            {onLogoutPress ? 'Logout' : 'Back'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {Header};
