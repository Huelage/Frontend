import * as BioAuth from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { FaceId, FingerPrint, Iris } from './svgs';

export const getBiometrics = async () => {
  const hasBiometrics = await BioAuth.hasHardwareAsync();
  const isEnrolled = await BioAuth.isEnrolledAsync();
  const biometricType = await BioAuth.supportedAuthenticationTypesAsync();

  return { hasBiometrics, isEnrolled, biometricType };
};

export const authenticate = async (prompt?: string, cancel?: string) => {
  const res = await BioAuth.authenticateAsync({
    promptMessage: prompt,
    cancelLabel: cancel
  });
  return res.success;
};

export const enableBiometrics = async () => {
  const isAuthenticated = await authenticate("Enable Biometric Authentication", "Cancel");
  // if (isAuthenticated) {

  // }
};

export const loginWithBiometrics = async () => {
  const isAuthenticated = await authenticate("Login with Biometrics", "Cancel");
  if (isAuthenticated) {
    const publicKey = await SecureStore.getItemAsync('publicKey');
    return publicKey;
  }
  return null;
};

export const getBiometricType = () => ({
  1: {
    type: Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint',
    icon: FingerPrint
  },
  2: {
    type: 'Face ID',
    icon: FaceId
  },
  3: {
    type: 'Iris',
    icon: Iris
  }
});
