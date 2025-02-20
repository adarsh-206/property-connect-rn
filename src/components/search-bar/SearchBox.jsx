import {View, SafeAreaView, TextInput, Image} from 'react-native';
import React from 'react';

const SearchBox = () => {
  return (
    <SafeAreaView>
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1 mx-4">
        <Image
          source={require('../../assests/search.png')}
          className="w-5 h-5 mr-2"
        />
        <TextInput
          placeholder="Search something"
          className="flex-1 text-gray-700 text-base px-2"
          placeholderTextColor="#6b7280"
        />
        <Image
          source={require('../../assests/filter.png')}
          className="w-5 h-5 ml-2"
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchBox;
