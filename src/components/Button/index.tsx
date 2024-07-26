import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import Colors from '../../utils/Colors';
import {styles} from './style';

interface ButtonProps extends ViewProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  text,
  onPress,
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
