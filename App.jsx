import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/components/splash/SplashScreen';
import AuthScreen from './src/screens/authentication/AuthScreen';
import 'react-native-gesture-handler';
import './global.css';
import TabsNavigator from './src/navigation/TabsNavigator';

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
        <Stack.Screen name="MainTabs" component={TabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
