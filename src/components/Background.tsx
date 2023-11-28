import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/Background10.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: "80%",
    marginBottom: 110
  },
});

export default Background;
