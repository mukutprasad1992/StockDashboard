import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Platform } from 'react-native';
import { theme } from './src/core/theme';

import {
  StartScreen,
  LoginScreen,
  ResetPasswordScreen,
  RegisterScreen,
  Funds,
  Analytic,
} from './src/auth/Index';
import Bull from './src/auth/Bull';
import Bear from './src/auth/Bear';
import Stocks from './src/auth/Stocks';
import Profile from './src/auth/Profile';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  
  return (

    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DashboardStack} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Funds" component={Funds} />
          <Stack.Screen name="Analytic" component={Analytic} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}
StatusBar.setBarStyle('light-content')
StatusBar.setBackgroundColor('#000000');


const DashboardStack = () => {
  const [isBullTouched, setBullTouched] = useState(false);
 
  // const handleBullTouch = () => {
  //   setBullTouched(!isBullTouched);
  // };
  return (
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white'},
      
      }}
    
      >
         <Tab.Screen
          name="All Stocks"
          component={Stocks}
          options={{
            headerTitle: 'All Stocks',
            headerTitleStyle: {
              color: '#10608c',fontWeight:'bold',


            },
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/Stocks.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black', 
                }}/>
            ),
            tabBarLabel: '',

          }}
        />
         <Tab.Screen
          name="Bullish Stocks"
          component={Bull}
          options={{
            headerTitle: 'Bullish Stocks',
            headerTitleStyle: {
              color: '#10610c', fontWeight:'bold',
            },
          
            tabBarIcon: ({focused}) => (
              
              <Image
                source={require('./src/assets/Bull.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black', 
                  
                }}/>
            ),
            tabBarLabel: '',

          }}
        />
         <Tab.Screen
          name="Bearish Stocks"
          component={Bear}
          options={{
            headerTitle: 'Bearish Stocks',
            headerTitleStyle: {
              color: '#ab1313',fontWeight:'bold',
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/Bear.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black', 
                }}/>
            ),
            tabBarLabel: '',

          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: 'Profile',
            headerTitleStyle: {
              color: 'black',fontWeight:'bold'
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/user.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black', 
                }}/>
            ),
            tabBarLabel: '',

          }}
        />
      </Tab.Navigator>

  );
}


