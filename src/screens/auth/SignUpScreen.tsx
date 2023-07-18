import { AuthNavigate, CustomTextInput, Hero, SocialLogin, SubmitButton } from '@components/account';
import { SignUpInfoInterface } from '@interfaces';
import { CheckBox } from '@rneui/themed';
import { fonts, shadowStyle } from '@utils';
import React, { useState } from 'react';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SignUpScreen = () => {
  const { setValue, handleSubmit, control, reset, formState: { errors } } = useForm<SignUpInfoInterface>();
  const [isVendor, setIsVendor] = useState<boolean>(true);
  const onSubmit = (data: SignUpInfoInterface) => console.log(data);
  const onError: SubmitErrorHandler<SignUpInfoInterface> = (errors, e) => {
    console.log(errors);
  };
  return (
    <View style={styles.container}>
      <Hero lead="Sign Up" accent="Please fill your details" page="SU" />
      <View style={styles.heroInputBox}>
        <View style={styles.heroInputs}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                autoCapitalize='words'
                autoCorrect={false}
                isPass={false}
                label={isVendor ? "Vendor's name" : "Full name"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="fullname"
            rules={{
              required: "Name is required",
              pattern: {
                value: /^[\w.+-]{3,}$/,
                message: "Name has to be atleast 3 characters"
              }
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                autoCapitalize='none'
                autoCorrect={false}
                isPass={false}
                keyboardType='email-address'
                label={isVendor ? "Vendor's email" : "Email address"}
                onBlur={onBlur}
                onChangeText={onChange}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                autoCapitalize='words'
                autoCorrect={false}
                isPass={false}
                keyboardType='number-pad'
                label={isVendor ? "Vendor's Phone number" : "Phone number"}
                onBlur={onBlur}
                onChangeText={onChange}
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
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  autoCapitalize='words'
                  autoCorrect={false}
                  isPass={false}
                  label="Business name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="businessname"
              rules={{
                required: "Business name is required",
                pattern: {
                  value: /^[\w.+-]{3,}$/,
                  message: "Business name has to be atleast 3 characters"
                }
              }}
            />
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                autoCapitalize='none'
                autoCorrect={false}
                isPass={true}
                label='Create password'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            rules={{
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/,
                message: "password not strong enough"
              }
            }}
          />
          {isVendor && (
            <CheckBox
              checked={true}
              center
              onPress={() => { }}
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
          <SubmitButton page='SU' onSubmit={handleSubmit(onSubmit, onError)} />
          {!isVendor && <SocialLogin page='SU' />}
          <AuthNavigate page='SU' />
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#fff',
    flex: 1,
  },
  heroInputBox: {
    backgroundColor: '#fff',
    flex: 1,
    gap: 25,
    paddingHorizontal: wp("8%") + 8,
    paddingVertical: hp("4%")
  },
  heroInputs: {
    gap: 20
  },
  heroSubmitBox: {
    gap: 25
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