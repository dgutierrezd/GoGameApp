import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_KEY} from './constants';

export const saveLocalStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getLocalStorage = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const logOut = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};
