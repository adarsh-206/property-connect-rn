import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {post} from '../../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

export default function ProfileScreen({navigation}) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await post('/api/auth/logout');
      await AsyncStorage.removeItem('token');
      setToken(null);
      navigation.replace('LoginScreen');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center py-8 px-4">
        <Image
          source={require('../../assests/avatar.png')}
          className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg"
        />
        <Text className="text-2xl font-bold text-gray-900 mt-4">John Doe</Text>
        <Text className="text-md text-gray-600">johndoe@example.com</Text>

        <Text className="text-dark text-lg">{API_URL}</Text>

        <View className="w-full mt-8 pt-4">
          <TouchableOpacity
            className="w-full p-5 border-y border-gray-300 rounded-lg bg-white shadow-md active:bg-gray-100"
            onPress={() => navigation.navigate('MyListings')}>
            <Text className="text-gray-800 text-lg font-semibold tracking-wide">
              My Listings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full p-5 border-b border-gray-300 rounded-lg mt-2 bg-white shadow-md active:bg-gray-100"
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text className="text-gray-800 text-lg font-medium tracking-wide">
              Change Password
            </Text>
          </TouchableOpacity>

          {token ? (
            <TouchableOpacity
              className="w-full p-5 border-b border-gray-300 rounded-lg mt-2 bg-white shadow-md active:bg-gray-100"
              onPress={logout}>
              <Text className="text-gray-800 text-lg font-medium tracking-wide">
                Logout
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="w-full p-5 border-b border-gray-300 rounded-lg mt-2 bg-white shadow-md active:bg-gray-100"
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text className="text-gray-800 text-lg font-medium tracking-wide">
                Login
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
