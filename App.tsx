import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ChatScreen from './src/screens/app/ChatScreen';
import { auth } from './src/services/firebaseConfig';
import HomeScreen from './src/screens/app/HomeScreen';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './src/navigation/AuthNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import Auth from './src/components/Auth';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='white'
        barStyle='dark-content' />
      <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name='AuthStack' component={AuthNavigation} />
        <Stack.Screen name='AppStack' component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;