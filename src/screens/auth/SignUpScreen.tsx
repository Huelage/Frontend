import { useAppSelector } from "@api/app/appHooks";
import { getVendorStatus } from "@api/slices/globalSlice";
import {
  AuthNavigate,
  CustomTextInput,
  SocialLogin,
  SubmitButton,
} from "@components/auth";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, SignUpInfoInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import { fonts } from "@utils";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignUpScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const isVendor = useAppSelector(getVendorStatus);
  const { navigate } = useNavigation<AuthNavigationProps>();
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<SignUpInfoInterface>({ mode: "onChange" });
  const onSubmit: SubmitHandler<SignUpInfoInterface> = (
    data: SignUpInfoInterface
  ) => {
    reset();
    navigate("OTP", { phoneno: data.phonenumber });
  };

  useEffect(() => {
    setTimeout(() => setFocus(isVendor ? "businessname" : "firstname"), 0);
  }, []);
  return (
    <>
      <StatusBar style="auto" />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + hp("3%"),
            paddingBottom: insets.bottom + 5,
          },
        ]}
        testID="signup screen"
      >
        <View style={styles.headerBox}>
          <Animated.Image
            sharedTransitionTag="huelageLogo"
            style={styles.logoImage}
            testID="logo image"
            source={require("@images/onboard_logo.png")}
          />
          <View>
            <Text
              style={[styles.welcomeText, { color: color.mainGreen }]}
              testID="welcome text"
            >
              Sign Up
            </Text>
            <Text style={[styles.welcomeInfoText, { color: color.mainGreen }]}>
              Please fill in your details
            </Text>
          </View>
        </View>
        <KeyboardAwareScrollView
          scrollEnabled
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          extraScrollHeight={50}
          style={styles.inputContainer}
          onTouchStart={() => Keyboard.dismiss()}
        >
          <View style={styles.inputBox}>
            {isVendor ? (
              <>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CustomTextInput
                      autoCapitalize="words"
                      autoCorrect={false}
                      error={errors.businessname}
                      label="Business name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => setFocus("businessaddr")}
                      innerRef={ref}
                      returnKeyType="next"
                      value={value}
                    />
                  )}
                  name="businessname"
                  rules={{
                    required: "Business name is required",
                    minLength: {
                      value: 3,
                      message:
                        "Business name should be a minimum of 3 charaters",
                    },
                  }}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CustomTextInput
                      autoCapitalize="words"
                      autoCorrect={false}
                      error={errors.businessaddr}
                      label="Business address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => setFocus("repname")}
                      innerRef={ref}
                      returnKeyType="next"
                      value={value}
                    />
                  )}
                  name="businessaddr"
                  rules={{
                    required: "Business address is required",
                    minLength: {
                      value: 3,
                      message:
                        "Business address should be a minimum of 3 charaters",
                    },
                  }}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CustomTextInput
                      autoCapitalize="words"
                      autoCorrect={false}
                      error={errors.repname}
                      label="Vendor's name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => setFocus("email")}
                      innerRef={ref}
                      returnKeyType="next"
                      value={value}
                    />
                  )}
                  name="repname"
                  rules={{
                    required: "Vendor's name is required",
                    minLength: {
                      value: 3,
                      message:
                        "Vendor's name should be a minimum of 3 charaters",
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CustomTextInput
                      autoCapitalize="words"
                      autoCorrect={false}
                      error={errors.firstname}
                      label="First name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => setFocus("lastname")}
                      innerRef={ref}
                      returnKeyType="next"
                      value={value}
                    />
                  )}
                  name="firstname"
                  rules={{
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "First name should be a minimum of 3 characters",
                    },
                  }}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CustomTextInput
                      autoCapitalize="words"
                      autoCorrect={false}
                      error={errors.lastname}
                      label="Last name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => setFocus("email")}
                      innerRef={ref}
                      returnKeyType="next"
                      value={value}
                    />
                  )}
                  name="lastname"
                  rules={{
                    required: "Last name is required",
                    minLength: {
                      value: 3,
                      message: "Last name should be a minimum of 3 characters",
                    },
                  }}
                />
              </>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email}
                  keyboardType="email-address"
                  label="Email address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus("phonenumber")}
                  innerRef={ref}
                  returnKeyType="next"
                  value={value}
                />
              )}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w.+-]{3,}@[\w-]+\.[\w-]{2,}$/,
                  message: "Email is invalid",
                },
              }}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.phonenumber}
                  isPhone
                  keyboardType="number-pad"
                  label="Phone number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus("password")}
                  innerRef={ref}
                  returnKeyType="next"
                />
              )}
              name="phonenumber"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\+\d{1,}[\s-\.]\d{3}[\s-\.]\d{3}[\s-\.]\d{4}/,
                  message: "Phone number is invalid",
                },
              }}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.password}
                  isPass
                  label="Create password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => !isVendor && handleSubmit(onSubmit)()}
                  innerRef={ref}
                  value={value}
                />
              )}
              name="password"
              rules={{
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,24}$/,
                  message:
                    "• 6 to 24 characters.\n• Must include uppercase and lowercase letters, a number and a special character.\n• Allowed special characters: !@#$%^&*",
                },
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
                checkedColor={color.mainGreen}
                title="I accept all terms and condition"
                testID="terms and condition"
                textStyle={[styles.termsText, { color: color.mainText }]}
                containerStyle={styles.termsContainer}
              />
            )}
            <SubmitButton
              label="CREATE ACCOUNT"
              onSubmit={handleSubmit(onSubmit)}
            />
            {!isVendor && <SocialLogin page="SU" />}
          </View>
        </KeyboardAwareScrollView>
        <AuthNavigate page="SU" />
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  headerBox: {
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
  },
  logoImage: {
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  welcomeText: {
    fontFamily: fonts.I_700,
    fontSize: 25,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  welcomeInfoText: {
    fontFamily: fonts.I_400,
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    gap: 25,
    paddingHorizontal: wp("8%") + 8,
    paddingVertical: hp("4%"),
    width: "100%",
  },
  inputBox: {
    gap: 20,
  },
  termsContainer: {
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  termsText: {
    color: "#000",
    fontFamily: fonts.I_400I,
    fontSize: 14,
  },
});
