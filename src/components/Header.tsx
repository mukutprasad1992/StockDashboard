import React, { ReactNode } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';

interface HeaderProps extends TextProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: '#999bf0',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});

export default Header;
