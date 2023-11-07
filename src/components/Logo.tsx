import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

export default function Logo() {
  return <Image source={require('../assets/logo3.png') as ImageSourcePropType} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 70,
    marginBottom: 8,
  },
});
