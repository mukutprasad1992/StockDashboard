import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { TextInput as Input } from 'react-native-paper'; // Make sure this import is still required
import { ReturnKeyTypeOptions } from 'react-native'; // Add this import
import { theme } from '../core/theme';

interface TextInputProps {
  errorText: string | undefined;
  description: string | undefined;
  label: string;
  returnKeyType?: ReturnKeyTypeOptions; // Make returnKeyType optional
  style?: ViewStyle;
  value?: string;
  onChangeText: (text: string) => void;
  error: boolean; // Add the error prop
  secureTextEntry: boolean;
   
  
  // Add other props as needed
}

export default function TextInput({
  errorText,
  description,
  label,
  returnKeyType,

  ...props
}: TextInputProps) {
  return (
    <View style={[styles.container, props.style]}>
      <Input
        style={styles.input}
        label={label}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="flat"
        returnKeyType={returnKeyType}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})