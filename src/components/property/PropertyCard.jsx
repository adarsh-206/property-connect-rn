import {View, Text, Image} from 'react-native';
import React from 'react';

const PropertyCard = () => {
  return (
    <View className="w-1/2 p-2">
      <View className="rounded-2xl overflow-hidden shadow-lg relative">
        <Image
          source={require('../../assests/new-york.png')}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black opacity-30"></View>
        <View className="absolute inset-0 p-4 flex justify-end">
          <Text className="text-white text-lg font-semibold">
            3 BHK Apartment
          </Text>
          <Text className="text-white text-sm">Mumbai, India</Text>
          <Text className="text-yellow-400 font-bold text-lg mt-1">
            ₹1562/sq. ft
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PropertyCard;
