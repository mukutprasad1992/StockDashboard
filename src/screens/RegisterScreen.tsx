import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Text, Button } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState<{ value: string; error: string }>({ value: '', error: '' });
  const [email, setEmail] = useState<{ value: string; error: string }>({ value: '', error: '' });
  const [password, setPassword] = useState<{ value: string; error: string }>({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState<{ value: string; error: string }>({ value: '', error: '' });
  
  

  const setResponseData = (data: string) => {
    console.log(data); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  }
  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = passwordValidator(confirmPassword.value);

    if (emailError || passwordError || nameError || confirmPasswordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      return;
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({ ...confirmPassword, error: "Confirm Password do not match" });
      return;
    }

    const userData: UserData = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    const baseUrl = 'http://192.168.0.179:3000/user/register';
   
console.log(userData)
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
console.log('wait');
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack}/>
      <View style= {styles.logo}>
      <Logo />
      </View>
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: string) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        description=""
        secureTextEntry={false}
        style={styles.input}
      />
      <TextInput
  label="Email"
  returnKeyType="next"
  value={email.value}
  onChangeText={(text: string) => setEmail({ value: text, error: '' })}
  error={!!email.error}
  errorText={email.error}
  description=""
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
        description=""
        style={styles.input}

      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text: string) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
  secureTextEntry={false}
        description=""
        style={styles.input}

      />

      <Button mode="contained" onPress={onSignUpPressed} style={{ backgroundColor: '#41b7c4' }}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={{ color: 'white' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom:100
    
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,

  },
  logo:{
    marginTop:250,

  },
  input: {
    height: 50,
    marginBottom: 10, 
    width:250
  },
  
});

