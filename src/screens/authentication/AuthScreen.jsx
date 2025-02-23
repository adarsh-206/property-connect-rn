import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {API_URL, GOOGLE_WEB_CLIENT_ID} from '@env';
import {get} from '../../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const GoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const response = await fetch(`${API_URL}/api/auth/google-login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({idToken: userInfo.idToken}),
    });

    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const AuthScreen = ({navigation}) => {
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        return false;
      }

      const response = await get('/api/auth/check-auth', {
        headers: {Authorization: `Bearer ${token}`},
      });

      return response?.data?.isAuthenticated;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        navigation.replace('MainTabs');
      }
    };

    authenticate();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <Image
          source={require('../../assests/home.png')}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase text-gray-500">
            Welcome To Property Connect
          </Text>
          <Text className="text-3xl font-bold text-gray-800 text-center mt-2">
            Let's Get You Closer To {'\n'}
            <Text className="text-[#0061FF]">Your Ideal Home</Text>
          </Text>

          <TouchableOpacity
            onPress={GoogleLogin}
            className="bg-white shadow-md border border-primary-light rounded-full w-full py-4 mt-5">
            <View className="flex flex-row items-center justify-center">
              <Image
                source={require('../../assests/google.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.replace('SignupScreen')}
            className="bg-white shadow-md border border-primary-light rounded-full w-full py-4 mt-5">
            <View className="flex flex-row items-center justify-center">
              <Image
                source={require('../../assests/gmail.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                Continue with Email
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
