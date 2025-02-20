import {View, Text} from 'react-native';
import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  return (
    <View className="px-4">
      <Text className="pl-3 my-2 font-bold">Featured</Text>
      <View className="flex-row flex-wrap">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </View>
    </View>
  );
};

export default PropertyList;
