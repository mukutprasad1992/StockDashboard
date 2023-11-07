import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import { Text } from 'react-native-paper';

interface ParagraphProps extends TextProps {
  children: React.ReactNode;
}

export default function Paragraph(props: ParagraphProps) {
  return <Text style={styles.text} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
});
