import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: "http://10.0.2.2:8080/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authenticateWithProvider = async (idToken: string) => {
  try {
    const response = await api.post('/auth/login', {
      provider: "google",
      token: idToken
    });
    const { token } = response.data;
    console.log("Authenticated with provider", token);
    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error: any) {
    console.error("Failed to authenticate with provider", error);
    console.log(error.response.data);
    throw error;
  }
};

export default api;
