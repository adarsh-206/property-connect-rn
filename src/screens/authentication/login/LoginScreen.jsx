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
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';

const LoginScreen = ({navigation}) => {
  const [form, setForm] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
    setErrors({...errors, [key]: ''});
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await post('/api/auth/login', form);
      await AsyncStorage.setItem('token', response?.data?.token);
      navigation.replace('MainTabs');
    } catch (error) {
      setErrors({general: 'Invalid email or password'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-500 to-purple-600 px-6">
      <TouchableOpacity
        className="absolute top-12 left-6"
        onPress={() => navigation.goBack()}>
        <ArrowLeftIcon size={24} color="black" />
      </TouchableOpacity>

      <View className="items-center mb-6 mt-16 ml-8">
        <Image
          source={require('../../../assests/logo.png')}
          className="w-64 h-36"
        />
        <Text className="text-dark text-lg italic mt-2">
          "Welcome back! Log in to continue"
        </Text>
      </View>

      <View>
        <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </Text>

        {errors.general && (
          <Text className="text-red-500 text-center mb-2">
            {errors.general}
          </Text>
        )}

        <TextInput
          className="border border-gray-300 p-4 rounded-full bg-white mb-6 text-gray-800"
          placeholder="Email"
          placeholderTextColor="#757575"
          keyboardType="email-address"
          onChangeText={text => handleChange('email', text)}
        />
        {errors.email && (
          <Text className="text-red-500 mb-2">{errors.email}</Text>
        )}

        <View className="relative border border-gray-300 bg-white rounded-full mb-6 flex-row items-center">
          <TextInput
            className="flex-1 p-4 text-gray-800"
            placeholder="Password"
            placeholderTextColor="#757575"
            secureTextEntry={!showPassword}
            onChangeText={text => handleChange('password', text)}
          />
          <TouchableOpacity
            className="absolute right-4"
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeIcon size={24} color="gray" />
            ) : (
              <EyeSlashIcon size={24} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-red-500 mb-2">{errors.password}</Text>
        )}

        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-full shadow-md flex-row justify-center items-center"
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text className="text-blue-600 text-center font-medium">
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
