import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import SearchBox from '../../components/search-bar/SearchBox';
import PropertyList from '../../components/property/PropertyList';

export default function HomeScreen() {
  const username = 'John';

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4 bg-white">
        <View className="flex-row items-center space-x-3">
          <Image
            source={require('../../assests/avatar.png')}
            className="w-10 h-10 rounded-full"
          />
          <View className="ml-3">
            <Text className="text-sm text-gray-500">Good Morning</Text>
            <Text className="text-sm">{username}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../assests/bell.png')}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-5">
        <SearchBox />
      </View>
      <View className="mt-5">
        <PropertyList />
      </View>
    </ScrollView>
  );
}
