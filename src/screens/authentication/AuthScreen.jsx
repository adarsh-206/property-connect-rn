import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

const AuthScreen = ({navigation}) => {
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
            onPress={() => navigation.replace('MainTabs')}
            className="bg-white shadow-md shadow-gray-300 border border-primary-light rounded-full w-full py-4 mt-5">
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
            onPress={() => navigation.replace('MainTabs')}
            className="bg-white shadow-md shadow-gray-300 border border-primary-light rounded-full w-full py-4 mt-5">
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
