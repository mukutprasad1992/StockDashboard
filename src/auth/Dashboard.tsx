import Background from '../components/Background';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  return (
    
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <View style={styles.buttonContainer}>
        <Button title="Stocks" onPress={() => navigation.navigate('Stocks')} />
        <Button title="Bull" onPress={() => navigation.navigate('Bull')} />
        <Button title="Bear" onPress={() => navigation.navigate('Bear')} />
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />


      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default DashboardScreen;
