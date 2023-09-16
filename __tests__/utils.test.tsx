import { CustomSecureStore, getBiometrics, replacer } from "@utils";
import * as SecureStore from 'expo-secure-store';

describe("keysandstores.ts: ", () => {
  describe("When Testing the CustomSecureStore", () => {
    const key = "testKey";
    const replacedkey = replacer(key, "_");

    test("that getItem calls SecureStore.getItemAsync with key", async () => {
      await CustomSecureStore.getItem(replacedkey);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(replacedkey);
    });
    test("that setItem calls SecureStore.setItemAsync with key and value", async () => {
      const value = "testValue";
      await CustomSecureStore.setItem(replacedkey, value);
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(replacedkey, JSON.stringify(value));
    });
    test("that removeItem calls SecureStore.deleteItemAsync with key", async () => {
      await CustomSecureStore.removeItem(replacedkey);
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(replacedkey);
    });
  });

  describe("When Testing the replacer function", () => {
    test("that it replaces the all non-alphanum characters with _", () => {
      const key = "Test key!";
      const replacedkey = replacer(key, "_");
      expect(replacedkey).toEqual("Test_key_");
    });
  });
});

describe("biometrics.ts: ", () => {
  describe("When Testing getBiometrics", () => {
    test("that the return value contains hasBiometrics", async () => {
      const biometrics = await getBiometrics();
      expect(biometrics).toHaveProperty("hasBiometrics");
    });
    test("that the return value contains biometricType", async () => {
      const biometrics = await getBiometrics();
      expect(biometrics).toHaveProperty("biometricType");
    });
    test("that the return value contains isEnrolled", async () => {
      const biometrics = await getBiometrics();
      expect(biometrics).toHaveProperty("isEnrolled");
    });
  });
});