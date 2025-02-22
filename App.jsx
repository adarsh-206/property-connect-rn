import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/components/splash/SplashScreen';
import AuthScreen from './src/screens/authentication/AuthScreen';
import 'react-native-gesture-handler';
import './global.css';
import TabsNavigator from './src/navigation/TabsNavigator';
import SignupScreen from './src/screens/authentication/signup/SignupScreen';
import LoginScreen from './src/screens/authentication/login/LoginScreen';
import MyListings from './src/screens/profile/my-listings/MyListings';
import ForgotPassword from './src/screens/authentication/forgot-password/ForgotPassword';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={TabsNavigator} />
        <Stack.Screen name="MyListings" component={MyListings} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
