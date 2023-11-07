import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import Parse from 'parse/react-native';
import { ScrollView } from 'react-native-gesture-handler';


const Profile = ({ navigation }: any) => {
  const user = {
    name: 'himanshu',
    profileImage: require('../assets/logo.png'),
  };

  useEffect(() => {
    async function getCurrentUser() {
      if (typeof user === 'string' && user === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
        }
      }
    }
    getCurrentUser();
  }, [user]);

  const handleLogout = () => {
    navigation.navigate('StartScreen');
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
          <View style={styles.profileImageContainer}>
            <Image source={user.profileImage} style={styles.profileImage} />
          </View>
          <Text style={styles.text}>{`${greeting}`}</Text>
          <Text style={styles.text1}> {user.name}</Text>
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
            onPress={handleLogout}
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
  scrollView: {
    flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 300,
  padding: 20,
  paddingBottom: 60,
  ...Platform.select({
    ios: {
      paddingTop: 20,
    },
    android: {
      paddingTop: 0,
    },
  }),
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
    marginVertical:10
    
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
    width:40


  },
  logoutButtonText: {
    color: 'white',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 100,
  },
  profileImage: {
    width: '75%',
    height: '75%',
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

export default Profile;
function setUsername(arg0: string | undefined) {
  throw new Error('Function not implemented.');
}
