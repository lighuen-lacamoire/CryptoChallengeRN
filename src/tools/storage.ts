import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = (key: string, value: any): Promise<void> => {
  if (value && typeof value === 'string') {
    return AsyncStorage.setItem(key, value);
  }
  return AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string): Promise<string | null> => {
  return AsyncStorage.getItem(key);
};

export const deleteItem = (key: string): Promise<void> => {
  return AsyncStorage.removeItem(key);
};

export const clearAll = (): Promise<void> => {
  return AsyncStorage.clear();
};
