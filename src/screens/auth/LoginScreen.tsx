import { useAppDispatch } from '@api/app/appHooks';
import { setAuthStatus } from '@api/slices/globalSlice';
import { AuthNavigate, CustomTextInput, SubmitButton } from '@components/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { BiometricsInterface, LoginInfoInterface } from '@interfaces';
import { BiometricType, fonts, getBiometrics } from '@utils';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen2 = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const inset = useSafeAreaInsets();
  const [bioSpecs, setBioSpecs] = useState<BiometricsInterface | null>(null);
  const { handleSubmit, control, setFocus, reset, formState: { errors } } = useForm<LoginInfoInterface>({ mode: 'onChange' });
  let bioDetail = null;
  if (bioSpecs?.hasBiometrics && !bioSpecs?.isEnrolled)
    bioDetail = BiometricType[bioSpecs.biometricType[0]];

  const onSubmit: SubmitHandler<LoginInfoInterface> = (data) => {
    reset();
    dispatch(setAuthStatus(true));
  };
  const setBio = async () => {
    const { hasBiometrics, isEnrolled, biometricType } = await getBiometrics();
    setBioSpecs({ hasBiometrics, isEnrolled, biometricType });
  };

  useEffect(() => {
    setTimeout(() => setFocus('password'), 0);
    setBio();
  }, []);
  return (
    <>
      <StatusBar style="auto" />
      <View style={[styles.container, { paddingTop: inset.top + hp("8%") }]}>
        <View style={styles.headerBox}>
          <Animated.Image
            sharedTransitionTag='huelageLogo'
            style={styles.logoImage}
            source={require("@images/onboard_logo.png")}
          />
          <Text style={[styles.welcomeText, { color: color.mainGreen }]}>Welcome Back!</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ gap: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  error={errors.password}
                  isPass={true}
                  innerRef={ref}
                  label='Password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: "Password is required" }}
            />
            <Text style={[styles.forgotText, { color: color.mainText }]}>Forgot Password?</Text>
            <SubmitButton label='LOG IN' onSubmit={handleSubmit(onSubmit)} />
          </View>
          <View style={styles.footer}>
            <Text style={[styles.switchText, { color: color.mainGreen }]}>Switch account</Text>
            {bioDetail && (
              <View style={styles.biometricBox}>
                <Text style={[styles.biometricText, { color: color.mainText }]}>Login with {bioDetail?.type}</Text>
                <TouchableOpacity style={[styles.biometricButton, { borderColor: color.mainGreen }]}>
                  <bioDetail.icon size={45} />
                </TouchableOpacity>
              </View>
            )}
            <Text style={[styles.contactText, { color: color.mainText }]}>
              <View style={{ marginTop: -7 }}><MaterialCommunityIcons name="message-processing-outline" size={24} color={color.mainText} /></View>  Need help?
              <Text style={{ color: color.mainGreen }}> Chat with Huelage Support</Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  headerBox: {
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center'
  },
  logoImage: {
    borderRadius: 40,
    height: 80,
    width: 80
  },
  welcomeText: {
    fontFamily: fonts.I_700,
    fontSize: 25,
    letterSpacing: .5
  },
  inputContainer: {
    paddingHorizontal: wp("8%") + 8,
    paddingVertical: hp("4%")
  },
  forgotText: {
    alignSelf: 'flex-end',
    fontFamily: fonts.I_500,
    fontSize: 16
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
    marginVertical: 30
  },
  switchText: {
    fontFamily: fonts.I_400,
    fontSize: 14,
    letterSpacing: .7
  },
  biometricBox: {
    alignItems: 'center',
    gap: 40,
    marginBottom: 60
  },
  biometricText: {
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  biometricButton: {
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    height: 80,
    justifyContent: 'center',
    width: 80
  },
  biometricIcon: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  contactText: {
    fontFamily: fonts.I_400,
    fontSize: 14
  }
});