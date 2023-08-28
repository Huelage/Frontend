import { useAppDispatch } from '@api/app/appHooks';
import { setAuthStatus, setVendorStatus } from '@api/slices/globalSlice';
import { AuthNavigate, CustomTextInput, Hero, SubmitButton, UserVendor } from '@components/auth';
import { LoginInfoInterface } from '@interfaces';
import { fonts, shadowStyle } from '@utils';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
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
    <View style={styles.container}>
      <Hero lead="Welcome Back!" accent="Login to continue" page='SI' />
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={{ gap: 15 }} style={styles.heroTwoInputBox}>
        <Text style={styles.heroTwoIntro}>
          Sign in to <Text style={styles.heroTwoIntroAccent}>Huelage</Text>
        </Text>
        <UserVendor isVendor={isVendor} onPress={setIsVendor} />
        <View style={styles.heroTwoInputs}>
          {isVendor ? (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  error={errors.vendorId}
                  isPass={false}
                  innerRef={ref}
                  label='Vendor ID'
                  keyboardType='number-pad'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus('password')}
                  returnKeyType='next'
                  value={value}
                />
              )}
              name="vendorId"
              rules={{
                required: "Vendor ID is required",
              }}
            />
          ) : (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  error={errors.email}
                  isPass={false}
                  innerRef={ref}
                  keyboardType='email-address'
                  label='Email address'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus('password')}
                  returnKeyType='next'
                  value={value}
                />
              )}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w.+-]{3,}@[\w-]+\.[\w-]{2,}$/,
                  message: "Email is invalid"
                }
              }}
            />
          )}
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
        </View>
        <Text style={styles.heroTwoTextForgot}>Forgot Password?</Text>
        <SubmitButton label='LOG IN' onSubmit={handleSubmit(onSubmit)} />
        <AuthNavigate page='SI' isVendor={isVendor} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroTwoInputBox: {
    backgroundColor: '#fff',
    paddingHorizontal: wp("8%") + 8,
    paddingVertical: hp("4%")
  },
  heroTwoInputs: {
    gap: 20
  },
  heroTwoIntro: {
    fontFamily: fonts.I_700,
    fontSize: 24,
    textAlign: 'center'
  },
  heroTwoIntroAccent: {
    color: "#47CA4C"
  },
  heroTwoLoginButton: {
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 35,
    height: 60,
    justifyContent: 'center',
    ...shadowStyle
  },
  heroTwoLoginText: {
    color: "#fff",
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  heroTwoTextForgot: {
    alignSelf: 'flex-end',
    fontFamily: fonts.I_500,
    fontSize: 16
  }
});