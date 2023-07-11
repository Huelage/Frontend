import { CheckBox } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';
import AuthNavigate from '../../components/account/AuthNavigate';
import CustomTextInput from '../../components/account/CustomTextInput';
import Hero from '../../components/account/Hero';
import SocialLogin from '../../components/account/SocialLogin';
import SubmitButton from '../../components/account/SubmitButton';
import { shadowStyle } from '../../utils';
import { fonts } from '../../utils/fontEnum';
import { SignUpInfoInterface } from '../../utils/interfaces';

const SignUpScreen = () => {
  const { setValue, handleSubmit, control, reset, formState: { errors } } = useForm<SignUpInfoInterface>();
  const [isVendor, setIsVendor] = useState<boolean>(true);
  const onSubmit = (data: SignUpInfoInterface) => console.log(data);
  const onError: SubmitErrorHandler<SignUpInfoInterface> = (errors, e) => {
    console.log(errors);
  };
  return (
    <LinearGradient
      colors={["#4CAF50", "#91D56C"]}
      start={{ x: 0.23, y: 0.82 }}
      end={{ x: 0.99, y: 0.1 }}
      locations={[0.82, 1]}
      style={styles.container}
    >
      <Hero lead="Sign Up" accent="Please fill your details" page="SU" />
      <View style={styles.hero}>
        <Svg
          height={89}
          width={wp("102%")}
          viewBox='0 0 1440 320'
        >
          <Path
            fill="#4CAF50"
            d="M0,64L80,90.7C160,117,320,171,480,208C640,245,800,267,960,245.3C1120,224,1280,160,1360,128L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
        <View style={styles.heroInputBox}>
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
            />
          )}
          <SubmitButton page='SU' onSubmit={handleSubmit(onSubmit, onError)} />
          {!isVendor && <SocialLogin page='SU' />}
          <AuthNavigate page='SU' />
        </View>
      </View>
    </LinearGradient>
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
    flex: 1,
    gap: 25,
    marginHorizontal: wp("8%") + 8,
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
  termsText: {
    color: '#000',
    fontFamily: fonts.I_400I,
    fontSize: 14
  }
});