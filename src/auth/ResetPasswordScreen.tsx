import React, { useState } from 'react';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Button } from 'react-native-paper';
import { emailValidator } from '../helpers/emailValidator';
import axios from 'axios';
import {StyleSheet, View } from 'react-native';


interface UserData {
  email: string;
}

export default function ResetPasswordScreen({ navigation }:any) {
  const [email, setEmail] = useState<{ value: string; error: string }>({ value: '', error: '' });

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    const setResponseData = (data: string) => {
      console.log(data); 
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
      const userData: UserData = {
        email: email.value,
      };
      const baseUrl = 'http://192.168.0.179:3000/forgot-password/forgot-password';

    axios
    .post(baseUrl, userData)
    .then((response) => {
      setResponseData(`Response: ${JSON.stringify(response.data)}`);
      console.log('Response:', response.data);
    })
    .catch((error) => {
      setResponseData(`Error: ${error.message}`);
      console.error('Error:', error);
    });
  }
}

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style= {styles.logo}>
      <Logo />
      </View>
      <Header>Reset Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        description="" secureTextEntry={false}/>
    
      <Button mode="contained" onPress={sendResetPasswordEmail}  style={{ backgroundColor: '#41b7c4' }}>Send</Button>

    </Background>
  );
}
const styles = StyleSheet.create({
  logo:{
    marginTop:150,
  }
})
