import * as SecureStore from 'expo-secure-store';

export const CustomSecureStore = {
  getItem: async (key: string) => {
    let result = await SecureStore.getItemAsync(replacer(key, "_"));
    return result ? JSON.parse(result) : null;
  },
  setItem: async (key: string, value: any) => {
    return await SecureStore.setItemAsync(replacer(key, "_"), JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    return await SecureStore.deleteItemAsync(replacer(key, "_"));
  },
};

const replacer = (key: string, replaceCharacter: string) => {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
};
