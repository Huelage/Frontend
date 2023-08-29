import React from 'react';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';


export const useGetBiometricType = async () => {
  const BioAuth = new ReactNativeBiometrics();
  console.log('biometric', BioAuth);
  const { error, available, biometryType } = await BioAuth.isSensorAvailable();
  console.log('biometric results', error, available, biometryType);
};