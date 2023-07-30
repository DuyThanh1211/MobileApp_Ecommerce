import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key,value) => {
      await AsyncStorage.setItem(key, value);
  };

export const getData = async (key) => {
      return await AsyncStorage.getItem(key);
  };