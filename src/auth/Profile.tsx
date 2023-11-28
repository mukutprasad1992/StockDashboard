
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, GestureResponderEvent, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import * as   ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation, userId }: any) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [username, setUserName] = useState<string>(""); // State to store user name
  const [userDetails, setUserDetails] = useState<any | null>(null);

  // const user = {
  //   name: "",
  //   profileImage: require('../assets/logo.png'),
  // };

  const BASE_URL = 'http://192.168.0.179:3000/profile/upload';

  useEffect(() => {

    console.log("fetchig the userinfo")

    fetchUserInfo(userId);


    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);
  AsyncStorage.getAllKeys().then((keys) => {
    console.log('AsyncStorage Keys:', keys);
  });
  const fetchUserInfo = async (userId: any) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (!userToken) {
        console.error('User token is undefined or null.');
        return;
      }

      // Continue with the rest of your code
      const response = await fetch(`http://192.168.0.179:3000/user/getUser/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userData = await response.json();
      setUserDetails(userData);
      console.log("response", userData);
      setUserName(userData.name);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };




  const pickImage = async () => {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })) as ImagePicker.ImagePickerResult;

    if (result.canceled) {
      console.log('Image picker cancelled');
    } else {
      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);

        await uploadImage(result.assets[0].uri);
      }
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const fileUri = FileSystem.documentDirectory + 'profilePic.jpg';
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      const formData = new FormData();
      formData.append('profilePic', {
        uri: fileUri,
        name: 'profilePic.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('userId', userId);
      console.log('Sending request to:', BASE_URL);

      const response = await axios.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);

      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };





  const handleAddFunds = () => {
    navigation.navigate('Funds');
  };

  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting = '';

  if (hours >= 0 && hours < 12) {
    greeting = 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.profileImage} />}
          </TouchableOpacity>

          <Text style={styles.text}>{`${greeting}`}</Text>
          <Text style={styles.text1}>{username}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleAddFunds}
            style={[styles.button, styles.addFundsButton]}
          >
            Funds
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('StartScreen')}
            style={[styles.button, styles.logoutButton]}
            labelStyle={styles.logoutButtonText}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 40,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    margin: 10,
  },
  addFundsButton: {
    backgroundColor: '#10610c',
  },
  logoutButton: {
    backgroundColor: '#ab1313',
    width: 40,
  },
  logoutButtonText: {
    color: 'white',
  },
  profileImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,  // Add border width
    borderColor: '#10610c',  // Add border color
    marginTop: 100,
  },
  profileImage: {
    width: '110%',  // Use '100%' to ensure the image takes up the entire container
    height: '110%',  // Use '100%' to ensure the image takes up the entire container
    borderRadius: 100,
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile