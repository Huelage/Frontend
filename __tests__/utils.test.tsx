import { CustomSecureStore, getBiometrics, getItem, replacer } from "@utils";
import * as SecureStore from 'expo-secure-store';
import * as BioAuth from 'expo-local-authentication';
import { Platform } from "react-native";
import * as toasts from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { render, screen } from "@testing-library/react-native";
import React, { ReactElement } from "react";

const utils = jest.requireActual("@utils");

describe("miscs.ts: ", () => {
  describe("When Testing the CustomSecureStore", () => {
    const key = "testKey";
    const replacedkey = replacer(key, "_");
    test("that getItem calls SecureStore.getItemAsync with key", async () => {
      const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
      mockedGetItem.mockReturnValueOnce(Promise.resolve('"test"'));
      const res = await utils.CustomSecureStore.getItem(replacedkey);
      expect(res).toEqual("test");
    });
    test("that getItem returns null if item doesn't exist", async () => {
      const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
      mockedGetItem.mockReturnValueOnce(Promise.resolve(''));
      const res = await utils.CustomSecureStore.getItem(replacedkey);
      expect(res).toBeNull();
    });
    test("that setItem calls SecureStore.setItemAsync with key and value", async () => {
      const mockedSetItem = jest.spyOn(SecureStore, "setItemAsync");
      mockedSetItem.mockReturnValueOnce(Promise.resolve());
      await utils.CustomSecureStore.setItem("test", "test");
      expect(mockedSetItem).toBeCalledWith("test", JSON.stringify("test"));
    });
    test("that removeItem calls SecureStore.deleteItemAsync with key", async () => {
      const mockedDeleteItem = jest.spyOn(SecureStore, "deleteItemAsync");
      mockedDeleteItem.mockReturnValueOnce(Promise.resolve());
      await utils.CustomSecureStore.removeItem("test");
      expect(mockedDeleteItem).toBeCalledWith("test");
    });
  });
  describe("When Testing the replacer function", () => {
    test("that it replaces the all non-alphanum characters with _", () => {
      const key = "Test key!";
      const replacedkey = replacer(key, "_");
      expect(replacedkey).toEqual("Test_key_");
    });
  });
  it("should return the correct value when getItem is called", async () => {
    const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
    mockedGetItem.mockReturnValueOnce(Promise.resolve('"test"'));
    const res = await utils.getItem("test");
    expect(res).toEqual("test");
  });
  it("should return null when getItem is called and SecureStore.getItemAsync throws an error", async () => {
    const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
    mockedGetItem.mockReturnValueOnce(Promise.resolve(''));
    const res = await utils.getItem("test");
    expect(res).toBeNull();
  });
  it("should call setItemAsync when setItem is called", async () => {
    const mockedSetItem = jest.spyOn(SecureStore, "setItemAsync");
    mockedSetItem.mockReturnValueOnce(Promise.resolve());
    await utils.setItem("test", "test");
    expect(mockedSetItem).toBeCalledWith("test", JSON.stringify("test"));
  });
  it("should call deleteItemAsync when removeItem is called", async () => {
    const mockedDeleteItem = jest.spyOn(SecureStore, "deleteItemAsync");
    mockedDeleteItem.mockReturnValueOnce(Promise.resolve());
    await utils.removeItem("test");
    expect(mockedDeleteItem).toBeCalledWith("test");
  });
});

describe("biometrics.ts: ", () => {
  describe("When Testing getBiometrics", () => {
    test("that the return value contains hasBiometrics", async () => {
      const biometrics = await utils.getBiometrics();
      expect(biometrics).toHaveProperty("hasBiometrics");
    });
    test("that the return value contains biometricType", async () => {
      const biometrics = await utils.getBiometrics();
      expect(biometrics).toHaveProperty("biometricType");
    });
    test("that the return value contains isEnrolled", async () => {
      const biometrics = await utils.getBiometrics();
      expect(biometrics).toHaveProperty("isEnrolled");
    });
  });
  it("should call authenticateAsync with the correct parameters when authenticate is called", async () => {
    const spy = jest.spyOn(BioAuth, "authenticateAsync");
    await utils.authenticate("test", "test");
    expect(spy).toBeCalledWith({ promptMessage: "test", cancelLabel: "test" });
  });
  it("should call authenticateAsync with the predefined parameters when enableBiometrics is called", async () => {
    const spy = jest.spyOn(BioAuth, "authenticateAsync");
    await utils.enableBiometrics();
    expect(spy).toBeCalledWith({ promptMessage: "Enable Biometric Authentication", cancelLabel: "Cancel" });
  });
  it("should call getItem and authenticateAsync with the predefined parameters when loginWithBiometrics is called", async () => {
    const spy = jest.spyOn(BioAuth, "authenticateAsync");
    const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
    mockedGetItem.mockReturnValueOnce(Promise.resolve("biometrics"));
    const res = await utils.loginWithBiometrics();
    expect(spy).toBeCalledWith({ promptMessage: "Login with Biometrics", cancelLabel: "Cancel" });
    expect(res).toEqual("biometrics");
  });
  it("should not do anything if authenticateAsync fails when loginWithBiometrics is called", async () => {
    const spy = jest.spyOn(BioAuth, "authenticateAsync");
    spy.mockReturnValueOnce(Promise.resolve({ success: false, error: 'no bio details' }));
    const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
    mockedGetItem.mockReturnValueOnce(Promise.resolve("biometrics"));
    const res = await utils.loginWithBiometrics();
    expect(spy).toBeCalledWith({ promptMessage: "Login with Biometrics", cancelLabel: "Cancel" });
    expect(res).toBeNull();
  });
  it("should return type of 'Fingerprint' if Platform is android from the BiometricType object", () => {
    (Platform.OS = "android");
    const utils = jest.requireActual("@utils");
    const BiometricType = utils.getBiometricType();
    expect(BiometricType[1].type).toEqual("Fingerprint");
    (Platform.OS = "ios");
  });
});

describe("toasts.ts: ", () => {
  it("should call showMessage with the correct parameters when showError is called", () => {
    const mockedShowMessage = jest.spyOn(toasts, "showMessage");
    utils.showError("test");
    expect(mockedShowMessage).toBeCalledWith(expect.objectContaining({ message: "test", type: "danger" }));
    const Icon = mockedShowMessage.mock.calls[0][0].icon as React.FC;
    render(<Icon />);
  });
});