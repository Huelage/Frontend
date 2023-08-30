import * as BioAuth from 'expo-local-authentication';
import { Platform } from 'react-native';
import { FaceId, FingerPrint, Iris } from './svgs';

export const getBiometrics = async () => {
  const hasBiometrics = await BioAuth.hasHardwareAsync();
  const isEnrolled = await BioAuth.isEnrolledAsync();
  const biometricType = await BioAuth.supportedAuthenticationTypesAsync();

  return { hasBiometrics, isEnrolled, biometricType };
};

export const BiometricType = {
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
};