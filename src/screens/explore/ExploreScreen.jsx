import React from 'react';
import {View, Text, ScrollView} from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-800">
          Explore Content
        </Text>
      </View>
    </ScrollView>
  );
}
