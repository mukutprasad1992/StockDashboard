import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface BackButtonProps {
  goBack: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ goBack }) => {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={[styles.image, { tintColor: 'white' }]}
        source={require('../assets/arrow_back.png') as ImageSourcePropType}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
