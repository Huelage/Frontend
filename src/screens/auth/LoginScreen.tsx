import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getVendorStatus, setAuthStatus } from "@api/slices/globalSlice";
import { AuthNavigate, CustomTextInput, SubmitButton, UserVendor, } from "@components/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, BiometricsInterface, LoginInfoInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { BiometricType, enableBiometrics, fonts, getBiometrics, loginWithBiometrics, } from "@utils";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import Animated from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { navigate } = useNavigation<AuthNavigationProps>();
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const inset = useSafeAreaInsets();
  const isVendor = useAppSelector(getVendorStatus);
  const [bioSpecs, setBioSpecs] = useState<BiometricsInterface | null>(null);
  const {
    handleSubmit,
    control,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<LoginInfoInterface>({ mode: "onChange" });
  let bioDetail: (typeof BiometricType)[keyof typeof BiometricType] | null =
    null;
  if (bioSpecs?.hasBiometrics && !bioSpecs?.isEnrolled)
    bioDetail = BiometricType[bioSpecs.biometricType[0]];

  const onSubmit: SubmitHandler<LoginInfoInterface> = (data) => {
    if (!bioDetail) {
      Alert.alert(
        "Enable Biometric Login?",
        "Enjoy quicker, secure access with biometric authentication. Enable it now?",
        [
          {
            text: "Enable",
            onPress: enableBiometrics,
          },
          {
            text: "Not now",
            onPress: () => console.log("Cancel Pressed"),
          },
        ]
      );
      return;
    }
    reset();
    dispatch(setAuthStatus(true));
  };
  const setBio = async () => {
    const { hasBiometrics, isEnrolled, biometricType } = await getBiometrics();
    setBioSpecs({ hasBiometrics, isEnrolled, biometricType });
  };

  useEffect(() => {
    setTimeout(
      () =>
        setFocus(!bioDetail ? (isVendor ? "vendorId" : "email") : "password"),
      0
    );
    setBio();
  }, [isVendor]);
  return (
    <>
      <StatusBar style="auto" />
      <View style={[styles.container, { paddingTop: inset.top + hp("8%"), paddingBottom: inset.bottom + 5 }]} testID='login screen'>
        <View style={styles.headerBox}>
          <Animated.Image
            sharedTransitionTag="huelageLogo"
            style={styles.logoImage}
            testID="logo image"
            source={require("@images/onboard_logo.png")}
          />
          <Text style={[styles.welcomeText, { color: color.mainGreen }]}>
            Welcome Back!
          </Text>
        </View>
        <View
          style={styles.inputContainer}
          onTouchStart={() => Keyboard.dismiss()}
        >
          <UserVendor />
          <View style={{ gap: 20 }}>
            {!bioDetail &&
              (isVendor ? (
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CustomTextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={errors.vendorId}
                      isPass={false}
                      innerRef={ref}
                      label="Vendor ID"
                      keyboardType="number-pad"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => setFocus("password")}
                      returnKeyType="next"
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
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={errors.email}
                      isPass={false}
                      innerRef={ref}
                      keyboardType="email-address"
                      label="Email address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => setFocus("password")}
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
              ))}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.password}
                  isPass={true}
                  innerRef={ref}
                  label="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: "Password is required" }}
            />
            <TouchableOpacity onPress={() => navigate("ForgotPassword")}>
              <Text style={[styles.forgotText, { color: color.mainText }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <SubmitButton label="LOG IN" onSubmit={handleSubmit(onSubmit)} />
          </View>
          {bioDetail ? (
            <View style={styles.footer}>
              <Text style={[styles.switchText, { color: color.mainGreen }]}>
                Switch account
              </Text>
              <View style={styles.biometricBox}>
                <Text style={[styles.biometricText, { color: color.mainText }]}>
                  Login with {bioDetail?.type}
                </Text>
                <TouchableOpacity
                  onPress={loginWithBiometrics}
                  testID='biometric button'
                  style={[styles.biometricButton, { borderColor: color.mainGreen }]}
                >
                  <bioDetail.icon size={45} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <AuthNavigate page="SI" />
          )}
        </View>
        <Text style={[styles.contactText, { color: color.mainText }]}>
          <View style={{ marginTop: -7 }}>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
              color={color.mainText}
            />
          </View>{" "}
          Need help?
          <Text style={{ color: color.mainGreen }}>
            {" "}
            Chat with Huelage Support
          </Text>
        </Text>
      </View>
    </>
  );
};

export default LoginScreen;

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
  },
  inputContainer: {
    flex: 1,
    gap: 25,
    paddingHorizontal: wp("8%") + 8,
    paddingVertical: hp("4%"),
    width: "100%",
  },
  forgotText: {
    alignSelf: "flex-end",
    fontFamily: fonts.I_500,
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 25,
    marginBottom: 30,
  },
  switchText: {
    fontFamily: fonts.I_400,
    fontSize: 14,
    letterSpacing: 0.7,
  },
  biometricBox: {
    alignItems: "center",
    gap: 40,
    marginBottom: 60,
  },
  biometricText: {
    fontFamily: fonts.I_500,
    fontSize: 14,
  },
  biometricButton: {
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 1,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  biometricIcon: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  contactText: {
    fontFamily: fonts.I_400,
    fontSize: 14,
  },
});
