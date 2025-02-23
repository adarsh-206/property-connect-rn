import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {post} from '../../../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';

const SignupScreen = ({navigation}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setLoading(true);
    try {
      const response = await post('/api/auth/signup', form);
      await AsyncStorage.setItem('token', response?.data?.token);
      navigation.replace('MainTabs');
    } catch (error) {
      setErrors({general: 'Signup failed. Try again.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-500 to-purple-600 px-6">
      <TouchableOpacity
        className="absolute top-12 left-6"
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('AuthScreen');
          }
        }}>
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
        {errors.general && (
          <Text className="text-red-500 text-center mb-2">
            {errors.general}
          </Text>
        )}
        <TextInput
          className="border border-gray-300 p-4 rounded-full mb-4 bg-white text-gray-800"
          placeholder="Name"
          placeholderTextColor="#757575"
          onChangeText={text => handleChange('name', text)}
        />
        {errors.name && (
          <Text className="text-red-500 mb-4">{errors.name}</Text>
        )}
        <TextInput
          className="border border-gray-300 p-4 rounded-full mb-4 bg-white text-gray-800"
          placeholder="Email"
          placeholderTextColor="#757575"
          keyboardType="email-address"
          onChangeText={text => handleChange('email', text)}
        />
        {errors.email && (
          <Text className="text-red-500 mb-4">{errors.email}</Text>
        )}
        <View className="relative">
          <TextInput
            className="border border-gray-300 p-4 rounded-full mb-4 bg-white text-gray-800 pr-12"
            placeholder="Password"
            placeholderTextColor="#757575"
            secureTextEntry={!showPassword}
            onChangeText={text => handleChange('password', text)}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeSlashIcon size={20} color="gray" />
            ) : (
              <EyeIcon size={20} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-red-500 mb-4">{errors.password}</Text>
        )}
        <View className="relative">
          <TextInput
            className="border border-gray-300 p-4 rounded-full mb-4 bg-white text-gray-800 pr-12"
            placeholder="Confirm Password"
            placeholderTextColor="#757575"
            secureTextEntry={!showConfirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <EyeSlashIcon size={20} color="gray" />
            ) : (
              <EyeIcon size={20} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text className="text-red-500 mb-4">{errors.confirmPassword}</Text>
        )}
        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-full shadow-md flex-row justify-center items-center"
          onPress={handleSignup}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Sign Up</Text>
          )}
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
