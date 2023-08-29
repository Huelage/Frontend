import { useAppDispatch } from '@api/app/appHooks';
import { setAuthStatus, setVendorStatus } from '@api/slices/globalSlice';
import { AuthNavigate, CustomTextInput, Hero, SubmitButton, UserVendor } from '@components/auth';
import { useAppTheme, useGetBiometricType } from '@hooks';
import { LoginInfoInterface } from '@interfaces';
import { fonts, shadowStyle } from '@utils';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReactNativeBiometrics from 'react-native-biometrics';

const LoginScreen2 = () => {
  const biometryType = useGetBiometricType();
  const dispatch = useAppDispatch();
  const inset = useSafeAreaInsets();
  const { color } = useAppTheme();
  const { handleSubmit, control, setFocus, reset, formState: { errors } } = useForm<LoginInfoInterface>({ mode: 'onChange' });
  const [isVendor, setIsVendor] = useState<boolean>(true);
  const onSubmit: SubmitHandler<LoginInfoInterface> = (data) => {
    reset();
    dispatch(setVendorStatus(isVendor));
    dispatch(setAuthStatus(true));
  };
  useEffect(() => { reset(); }, [isVendor]);
  useEffect(() => { setTimeout(() => isVendor ? setFocus('vendorId') : setFocus('email'), 0); }, []);
  return (
    <View style={[styles.container, { paddingTop: inset.top + hp("8%") }]}>
      <View style={styles.headerBox}>
        <Image style={styles.logoImage} source={require("@images/onboard_logo.png")} />
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
          <Text style={styles.forgotText}>Forgot Password?</Text>
          <SubmitButton label='LOG IN' onSubmit={handleSubmit(onSubmit)} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.switchText}>Switch account</Text>
          {biometryType && (
            <View style={styles.biometricBox}>
              <Text style={styles.biometricText}>Login with </Text>
            </View>
          )}
        </View>
      </View>
      {/* <Hero lead="Welcome Back!" accent="Login to continue" page='SI' /> */}
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={{ gap: 15 }} style={styles.heroTwoInputBox}>
        <AuthNavigate page='SI' isVendor={isVendor} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 25
  },
  inputContainer: {
    paddingHorizontal: wp("8%") + 8,
    paddingVertical: hp("4%")
  },
  // heroTwoIntro: {
  //   fontFamily: fonts.I_700,
  //   fontSize: 24,
  //   textAlign: 'center'
  // },
  // heroTwoIntroAccent: {
  //   color: "#47CA4C"
  // },
  // heroTwoLoginButton: {
  //   alignItems: 'center',
  //   backgroundColor: "#4CAF50",
  //   borderRadius: 35,
  //   height: 60,
  //   justifyContent: 'center',
  //   ...shadowStyle
  // },
  // heroTwoLoginText: {
  //   color: "#fff",
  //   fontFamily: fonts.I_600,
  //   fontSize: 20
  // },
  forgotText: {
    alignSelf: 'flex-end',
    fontFamily: fonts.I_500,
    fontSize: 16
  },
  footer: {

  },
  switchText: {

  },
  biometricBox: {

  },
  biometricText: {

  },
  biometricButton: {

  },
  biometricIcon: {

  }
});