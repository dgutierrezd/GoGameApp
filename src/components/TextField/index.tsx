import React from 'react';
import {TextInput, ViewProps} from 'react-native';
import Colors from '../../utils/Colors';
import {styles} from './style';

interface TextFieldProps extends ViewProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const TextField = ({
  placeholder,
  onChangeText,
  value,
  style,
}: TextFieldProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.container, style]}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default TextField;
