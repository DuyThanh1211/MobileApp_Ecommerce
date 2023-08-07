import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const getData = async (key) => {
  return await AsyncStorage.getItem(key);
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(
      `Error removing data for key "${key}" from AsyncStorage:`,
      error
    );
  }
};
