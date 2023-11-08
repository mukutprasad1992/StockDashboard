import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Keyboard  } from 'react-native';
import BackButton from '../components/BackButton1';
import { SafeAreaView } from 'react-navigation';

const Analytic = ({ navigation }: any) => {
 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1}>Analytics</Text>
      <View style={styles.line}/>
      <Text style={styles.text}>Coming Soon</Text>
      <BackButton goBack={navigation.goBack} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  
  text: {
    fontSize: 27,
    color:'black',
    marginTop: 350,
    fontWeight:"bold",


  },
 
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '150%',
    justifyContent: 'flex-start',
    marginTop:3
  },
  text1: {
    fontWeight: "bold",
    width: 120,
    marginTop: 25,
    fontSize: 24,
  },
  back:{
    marginTop:10
  }
});   
export default Analytic;
