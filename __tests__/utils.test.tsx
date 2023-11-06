import { store } from "@api/app/store";
import { render } from "@testing-library/react-native";
import dayjs from "dayjs";
import * as BioAuth from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Platform } from "react-native";
import * as toasts from "react-native-flash-message";
import { initialState } from "./testhelpers";

const utils = jest.requireActual("@utils");

describe("miscs.ts: ", () => {
  it("should return the correct value when getItem is called", async () => {
    const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
    mockedGetItem.mockReturnValueOnce(Promise.resolve(JSON.stringify("test")));
    const res = await utils.getItem("test");
    expect(res).toEqual("test");
  });
  it("should return null when getItem is called and SecureStore.getItemAsync throws an error", async () => {
    const mockedGetItem = jest.spyOn(SecureStore, "getItemAsync");
    mockedGetItem.mockReturnValueOnce(Promise.resolve(""));
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
  it("should return a currency formatted number when the numberToCurrency function is called", () => {
    const res = utils.numberToCurrency(1000);
    expect(res).toEqual("₦1,000.00");
  });
  describe("When Testing the getDateDiff Function: ", () => {
    let res;
    it("should check if the date is inBetween now and the today", () => {
      res = utils.getDateDiff("Today", dayjs().subtract(3, "h"));
      expect(res).toBeTruthy;
      res = utils.getDateDiff("Today", dayjs().subtract(2, "d"));
      expect(res).toBeFalsy;
    });
    it("should check if the date is inBetween now and yesterday", () => {
      res = utils.getDateDiff("Yesterday", dayjs().subtract(1, "d"));
      expect(res).toBeTruthy;
      res = utils.getDateDiff("Yesterday", dayjs().subtract(2, "d"));
      expect(res).toBeFalsy;
    });
    it("should check if the date is inBetween now and the previous week", () => {
      res = utils.getDateDiff("Last Week", dayjs().subtract(1, "w"));
      expect(res).toBeTruthy;
      res = utils.getDateDiff("Last Week", dayjs().subtract(2, "w"));
      expect(res).toBeFalsy;
    });
    it("should check if the date is inBetween now and the previous month", () => {
      res = utils.getDateDiff("Last Month", dayjs().subtract(1, "M"));
      expect(res).toBeTruthy;
      res = utils.getDateDiff("Last Month", dayjs().subtract(2, "M"));
      expect(res).toBeFalsy;
    });
  });
  it("should return the correct status state whne the getStatus function is called", () => {
    let res;
    res = utils.getStatus("COMPLETED");
    expect(res).toEqual("Completed");
    res = utils.getStatus("CANCELLED");
    expect(res).toEqual("Cancelled");
    res = utils.getStatus("PENDING");
    expect(res).toEqual("Pending");
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
    spy.mockReturnValueOnce(Promise.resolve({ success: false, error: "no bio details" }));
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
  it("should call showMessage with teh correct parameters when showSuccess is called", () => {
    const mockedShowMessage = jest.spyOn(toasts, "showMessage");
    utils.showSuccess("test");
    expect(mockedShowMessage).toBeCalledWith(expect.objectContaining({ message: "test", type: "success" }));
    const Icon = mockedShowMessage.mock.calls[1][0].icon as React.FC;
    render(<Icon />);
  });
  it("should not call the showMessage or showError toasts if allowToast is disabled", () => {
    const mockedGetState = jest.spyOn(store, "getState");
    mockedGetState.mockReturnValue({ global: { ...initialState, allowToast: false } });
    const mockedShowMessage = jest.spyOn(toasts, "showMessage");
    utils.showError("test fail");
    utils.showSuccess("test fail");
    expect(mockedShowMessage).not.toBeCalledWith(expect.objectContaining({ message: "test fail" }));
  });
});