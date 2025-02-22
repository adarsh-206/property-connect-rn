import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const api = axios.create({
  baseURL: API_URL,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export const get = (url, params = {}) => api.get(url, {params});
export const post = (url, data) => api.post(url, data);
export const put = (url, data) => api.put(url, data);
export const patch = (url, data) => api.patch(url, data);
export const delet = url => api.delete(url);

export default api;
