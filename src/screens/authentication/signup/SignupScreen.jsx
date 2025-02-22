import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {post} from '../../../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const SignupScreen = ({navigation}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
    setErrors({...errors, [key]: ''});
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    try {
      const response = await post('/api/auth/signup', form);
      await AsyncStorage.setItem('token', response?.data?.token);
      navigation.replace('MainTabs');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-500 to-purple-600 px-6">
      <TouchableOpacity
        className="absolute top-12 left-6"
        onPress={() => navigation.goBack()}>
        <ArrowLeftIcon size={24} color="black" />
      </TouchableOpacity>
      <View className="items-center mb-6 mt-20">
        <Image
          source={require('../../../assests/logo.png')}
          className="w-72 h-48 ml-6"
        />
        <Text className="text-dark text-lg italic mt-2">
          "Join us and explore new possibilities"
        </Text>
      </View>
      <View>
        <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </Text>
        <TextInput
          className="border border-gray-300 p-4 rounded-full mb-4 bg-white"
          placeholder="Name"
          onChangeText={text => handleChange('name', text)}
        />
        {errors.name && (
          <Text className="text-red-500 mb-4">{errors.name}</Text>
        )}
        <TextInput
          className="border border-gray-300 p-4 rounded-full mb-4 bg-white"
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => handleChange('email', text)}
        />
        {errors.email && (
          <Text className="text-red-500 mb-4">{errors.email}</Text>
        )}
        <TextInput
          className="border border-gray-300 p-4 rounded-full mb-4 bg-white"
          placeholder="Password"
          secureTextEntry
          onChangeText={text => handleChange('password', text)}
        />
        {errors.password && (
          <Text className="text-red-500 mb-4">{errors.password}</Text>
        )}
        <TextInput
          className="border border-gray-300 p-4 rounded-full mb-4 bg-white"
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={text => handleChange('confirmPassword', text)}
        />
        {errors.confirmPassword && (
          <Text className="text-red-500 mb-4">{errors.confirmPassword}</Text>
        )}
        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-full shadow-md mt-4"
          onPress={handleSignup}>
          <Text className="text-white text-center font-semibold">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text className="text-blue-600 text-center font-medium">
            Already registered? Login Here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
