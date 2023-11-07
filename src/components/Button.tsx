import React from 'react';
import { StyleSheet, ViewStyle, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  mode: 'contained' | 'outlined';
}

const Button: React.FC<ButtonProps> = ({ label, style, mode, ...props }) => {
  const containerStyle = mode === 'contained' ? styles.buttonContained : styles.buttonOutlined;
  const labelStyle = mode === 'contained' ? styles.labelContained : styles.labelOutlined;

  return (
    <TouchableOpacity style={[containerStyle, style]} {...props}>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContained: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    color:"white"

  },
  labelContained: {
    color: 'white',
    fontSize: 16,
  },
  buttonOutlined: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    color:"white"
  },
  labelOutlined: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
