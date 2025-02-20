import React, {useEffect, useState} from 'react';
import {View, Image, Animated, SafeAreaView} from 'react-native';

const SplashScreen = ({onFinish}) => {
  const scale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    const timer = setTimeout(() => {
      pulseAnimation.stop();
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Animated.View
          style={{
            transform: [{scale}],
            shadowColor: 'violet',
            shadowRadius: 20,
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.5,
            elevation: 10,
          }}>
          <Image
            source={require('../../assests/logo.png')}
            className="w-64 h-64 ml-12"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
