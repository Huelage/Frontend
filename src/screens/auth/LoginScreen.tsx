import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';
import AuthNavigate from '../../components/account/AuthNavigate';
import CustomTextInput from '../../components/account/CustomTextInput';
import Hero from '../../components/account/Hero';
import SocialLogin from '../../components/account/SocialLogin';
import SubmitButton from '../../components/account/SubmitButton';
import { shadowStyle } from '../../utils';
import { fonts } from '../../utils/fontEnum';
import { LoginInfoInterface } from '../../utils/interfaces';
import UserVendor from '../../components/account/UserVendor';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<LoginInfoInterface>();
  const [isVendor, setIsVendor] = useState<boolean>(true);
  const onSubmit: SubmitHandler<LoginInfoInterface> = (data) => {
    console.log(data);
  };
  const onError: SubmitErrorHandler<LoginInfoInterface> = (errors, e) => {
    console.log(errors);
  };
  return (
    <LinearGradient
      colors={["#4CAF50", "#91D56C"]}
      start={{ x: 0.09, y: 0.73 }}
      end={{ x: 1, y: 0.12 }}
      locations={[0.74, 1]}
      style={styles.container}
    >
      <Hero lead="Welcome Back!" accent="Login to continue" page='SI' />
      <View style={styles.heroTwo}>
        <Svg
          height={89}
          width={wp("102%")}
          viewBox='0 0 1440 320'
        >
          <Path
            fill="#4CAF50"
            d="M0,160L80,133.3C160,107,320,53,480,32C640,11,800,21,960,74.7C1120,128,1280,224,1360,272L1440,320L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
        <View style={styles.heroTwoInputBox}>
          <Text style={styles.heroTwoIntro}>
            Sign in to <Text style={styles.heroTwoIntroAccent}>Huelage</Text>
          </Text>
          <UserVendor isVendor={isVendor} onPress={setIsVendor} />
          {isVendor ? (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  isPass={false}
                  label='Vendor ID'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
              rules={{
                required: "Vendor ID is required",
              }}
            />
          ) : (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  isPass={false}
                  keyboardType='email-address'
                  label='Email address'
                  onBlur={onBlur}
                  onChangeText={onChange}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                autoCapitalize='none'
                autoCorrect={false}
                isPass={true}
                label='Password'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            rules={{ required: "Password is required" }}
          />
          <Text style={styles.heroTwoTextForgot}>Forgot Password?</Text>
          <SubmitButton page='SI' onSubmit={handleSubmit(onSubmit, onError)} />
          {/* <SocialLogin page='SI' /> */}
          <AuthNavigate page='SI' />
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroTwo: {
    backgroundColor: '#fff',
    flex: 1,
  },
  heroTwoInputBox: {
    flex: 1,
    gap: 25,
    marginHorizontal: wp("8%") + 8,
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