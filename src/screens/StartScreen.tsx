import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function StartScreen({ navigation }: any) {
  const [logo, setLogo] = useState(true)
  useEffect(() => {
    const setTimeOut = setTimeout(() => {
      setLogo(false);
      navigation.navigate('RegisterScreen');
    }, 5000);
    return () => clearTimeout(setTimeOut);
  }, [navigation]);


  return (
    <View style={styles.container}>
      {logo && (
        <Animatable.View
          animation="fadeIn"
          iterationCount="infinite"
          direction="normal"
          duration={5000}
          style={styles.logoContainer}
        >
          <Animatable.Image
            animation="bounceIn"
            iterationCount="infinite"
            direction="normal"
            duration={5000}
            source={require('../assets/logo3.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>MasterDashboard</Text>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold"
  },
});