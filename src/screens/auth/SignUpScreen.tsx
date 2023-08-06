import { AuthNavigate, CustomTextInput, Hero, SocialLogin, SubmitButton } from '@components/auth';
import { AuthNavigationProps, SignUpInfoInterface, SignupRouteProps } from '@interfaces';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';
import { fonts, shadowStyle } from '@utils';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SignUpScreen = () => {
  const { params: { isVendor } } = useRoute<SignupRouteProps>();
  const { navigate } = useNavigation<AuthNavigationProps>();
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true);
  const { handleSubmit, control, setFocus, reset, formState: { errors } } = useForm<SignUpInfoInterface>({ mode: 'onChange' });
  const onSubmit = (data: SignUpInfoInterface) => {
    navigate('OTP', { phoneno: data.phonenumber });
  };

  useEffect(() => { setTimeout(() => setFocus('fullname'), 0); }, []);

  return (
    <View style={styles.container}>
      <Hero lead="Sign Up" accent="Please fill your details" page="SU" />
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} extraScrollHeight={50} style={styles.heroInputBox}>
        <View style={styles.heroInputs}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize='words'
                autoCorrect={false}
                error={errors.fullname}
                isPass={false}
                label={isVendor ? "Vendor's name" : "Full name"}
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus('email')}
                innerRef={ref}
                returnKeyType='next'
                value={value}
              />
            )}
            name="fullname"
            rules={{
              required: "Name is required",
              minLength: { value: 3, message: "Name should be a minimum of 3 characters" }
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize='none'
                autoCorrect={false}
                error={errors.email}
                isPass={false}
                keyboardType='email-address'
                label={isVendor ? "Vendor's email" : "Email address"}
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus('phonenumber')}
                innerRef={ref}
                returnKeyType='next'
                value={value}
              />
            )}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[\w.+-]{3,}@[\w-]+\.[\w-]{2,}$/,
                message: "Email is invalid"
              }
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomTextInput
                autoCapitalize='words'
                autoCorrect={false}
                error={errors.phonenumber}
                isPass={false}
                keyboardType='number-pad'
                label={isVendor ? "Vendor's Phone number" : "Phone number"}
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={() => setFocus(isVendor ? 'businessname' : 'password')}
                innerRef={ref}
                returnKeyType='next'
                value={value}
              />
            )}
            name="phonenumber"
            rules={{
              required: "Phone number is required"
            }}
          />
          {isVendor && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize='words'
                  autoCorrect={false}
                  error={errors.businessname}
                  isPass={false}
                  label="Business name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus('password')}
                  returnKeyType='next'
                  innerRef={ref}
                  value={value}
                />
              )}
              name="businessname"
              rules={{
                required: "Business name is required",
                minLength: { value: 3, message: "Business name should be a minimum of 3 charaters" }
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
                label='Create password'
                onBlur={onBlur}
                onChangeText={onChange}
                innerRef={ref}
                value={value}
              />
            )}
            name="password"
            rules={{
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,24}$/,
                message: "• 6 to 24 characters.\n• Must include uppercase and lowercase letters, a number and a special character.\n• Allowed special characters: !@#$%^&*"
              }
            }}
          />
          {isVendor && (
            <CheckBox
              checked={acceptTerms}
              center
              onPress={() => setAcceptTerms(!acceptTerms)}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#084506"
              title="I accept all terms and condition"
              textStyle={styles.termsText}
              containerStyle={styles.termsContainer}
            />
          )}
        </View>
        <View style={styles.heroSubmitBox}>
          <SubmitButton label='CREATE ACCOUNT' onSubmit={handleSubmit(onSubmit)} />
          {!isVendor && <SocialLogin page='SU' />}
          <AuthNavigate page='SU' isVendor={isVendor} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroInputBox: {
    backgroundColor: '#fff',
    flex: 1,
    gap: 25,
    paddingHorizontal: wp("8%"),
    paddingVertical: hp("4%")
  },
  heroInputs: {
    gap: 20
  },
  heroSubmitBox: {
    gap: 25,
    marginTop: 15
  },
  heroLoginButton: {
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 35,
    height: 60,
    justifyContent: 'center',
    ...shadowStyle
  },
  heroLoginText: {
    color: "#fff",
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  heroTextForgot: {
    alignSelf: 'flex-end',
    fontFamily: fonts.I_300,
    fontSize: 18
  },
  termsContainer: {
    padding: 0,
    margin: 0
  },
  termsText: {
    color: '#000',
    fontFamily: fonts.I_400I,
    fontSize: 14
  }
});