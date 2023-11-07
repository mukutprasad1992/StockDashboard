import React from 'react';
import { View, StyleSheet } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import Paragraph from '../components/Paragraph';

export default function StartScreen({ navigation }: any) {
  return (
    <Background>
      <View style={styles.input}>
      <Logo />
      </View>
      <Header>Welcome</Header>
  
      <Paragraph style={styles.text}>
        The easiest way to start with your amazing application.
      </Paragraph>
      <View style={styles.buttonContainer}>
      <Button
       mode="contained"
       onPress={() => navigation.navigate('LoginScreen')}
       style={{ backgroundColor: '#41b7c4' }}
      //  #999bf0, #3c848c
       >
        Login
        </Button>
        <View style={{ width: 16 }} /> 

<Button
 mode="contained"
 onPress={() => navigation.navigate('RegisterScreen')}
 style={{ backgroundColor: '#41b7c4' }}

 >
  Sign Up
  </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 60,
    height: 44,
    marginTop:30,
  },
  text:{
    color:'#cdf6fa',
    marginTop:10
  },
  input:{
    marginTop:150,
  },
 
});
