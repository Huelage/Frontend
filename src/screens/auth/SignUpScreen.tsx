import { useAppSelector } from "@api/app/appHooks";
import { SIGNUP_USER, SIGNUP_VENDOR } from "@api/graphql";
import { getVendorStatus } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { AuthNavigate, SignupInputs, SocialLogin, SubmitButton } from "@components/auth";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, SignUpInfoInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import { fonts, setItem } from "@utils";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignUpScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const isVendor = useAppSelector(getVendorStatus);
  const [sigup_user, { data: uData, loading: uLoading }] = useMutation(SIGNUP_USER);
  const [signup_vendor, { data: vData, loading: vLoading }] = useMutation(SIGNUP_VENDOR);
  const { navigate } = useNavigation<AuthNavigationProps>();
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const { handleSubmit, control, setFocus, reset, formState: { errors } } = useForm<SignUpInfoInterface>({ mode: "onChange" });
  const onSubmit: SubmitHandler<SignUpInfoInterface> = async (data: SignUpInfoInterface) => {
    let input = { ...data, confirmPassword: data.password, phone: data.phone.replace(/[\s-.]/g, "") };
    isVendor ? await signup_vendor({ variables: { input } }) : await sigup_user({ variables: { input } });
    reset();
    navigate("OTP", { phoneno: data.phone });
  };
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    setTimeout(() => setFocus(isVendor ? "businessName" : "firstName"), 0);
  }, []);
  useEffect(() => {
    if (vData || uData) {
      const res = isVendor ? vData.signUpVendor : uData.signUpUser;
      const entityId = isVendor ? res.vendorId : res.userId;
      const name = isVendor ? res.businessName : `${res.firstName} ${res.lastName}`;
      (async () => {
        await setItem("huelageEntityId", entityId);
        await setItem("huelageEntityName", name);
        await setItem("huelageEntityType", isVendor ? "VENDOR" : "USER");
      })();
    }
  }, [uData, vData]);
  return (
    <View style={[styles.container, { paddingTop: insets.top + hp("3%"), paddingBottom: insets.bottom + 5 }]} onTouchStart={dismissKeyboard} testID='signup screen'>
      <View style={styles.headerBox}>
        <Animated.Image sharedTransitionTag="huelageLogo" style={styles.logoImage} testID="logo image" source={require("@images/onboard_logo.png")} />
        <View>
          <Text style={[styles.welcomeText, { color: color.mainGreen }]} testID="welcome text">Sign Up</Text>
          <Text style={[styles.welcomeInfoText, { color: color.mainGreen }]}>Please fill in your details</Text>
        </View>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} extraScrollHeight={50} style={styles.inputContainer} contentContainerStyle={styles.inputBox}>
        <SignupInputs control={control} errors={errors} setFocus={setFocus} submit={handleSubmit(onSubmit)} />
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
        <SubmitButton label="CREATE ACCOUNT" onSubmit={handleSubmit(onSubmit)} />
        {!isVendor && <SocialLogin page="SU" />}
      </KeyboardAwareScrollView>
      <AuthNavigate page="SU" />
    </View>
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
