import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import axios from 'axios';



interface UserData {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const setResponseData = (data: string) => {
    console.log(data); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  
  }

  const onLoginPressed =async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const userData: UserData = {
      email: email.value,
      password: password.value,
    };

    const baseUrl = 'http://192.168.0.179:3000/auth/login';
    console.log(userData);
    console.log('Making request to:', baseUrl);


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
  console.log('complete');
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack}/>
      <View style= {styles.logo}>
      <Logo />
      </View>
      <Header>Welcome back.</Header>
      <TextInput
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        description={''}
        label={'Email'}
        secureTextEntry={false}
        style={styles.input}

      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        description={''}
        style={styles.input}

      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} style={{ backgroundColor: '#41b7c4'}}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.text}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>

      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 60,
    },
  forgot: {
    fontSize: 13,
    color: 'white',
    marginRight:10
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
  text:{
    color:'white',
  },
  logo:{
    marginTop:150,
  },
  input: {
    height: 50,
    marginBottom: 10, 
    width:250
  },
 
});
