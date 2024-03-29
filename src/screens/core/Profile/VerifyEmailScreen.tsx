import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { REQUEST_EMAIL_VERIFICATION, VERIFY_EMAIL } from "@api/graphql";
import { getEntity, setCredentials } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { CustomPinInput, SubmitButton } from "@components/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, showSuccess } from "@utils";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountDown from "react-native-countdown-fixed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VerifyEmailScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const dispatch = useAppDispatch();
  const email = entity.email;
  const [otpcode, setOtpcode] = useState<string>("");
  const [verifyEmail, { data, loading }] = useMutation(VERIFY_EMAIL);
  const [resendOtp] = useMutation(REQUEST_EMAIL_VERIFICATION);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const { goBack } = useNavigation<UserProfileTabProps>();
  const onSubmit = async () => {
    if (/\d{4}/.test(otpcode.trim())) {
      const input = { email, otp: parseInt(otpcode) };
      await verifyEmail({ variables: { input } });
    }
  };
  const onChange = (code: string) => setOtpcode(code);
  const resendCode = async () => {
    await resendOtp({ variables: { email } });
    setIsTimerActive(true);
  };
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    if (data) {
      const updatedEntity = { ...entity, isEmailVerified: true };
      dispatch(setCredentials({ entity: updatedEntity }));
      showSuccess("Email verified successfully");
      goBack();
    }
  }, [data]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="profile verify email screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Verify Email Address</Text>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={styles.mainBox}>
        <Animated.View sharedTransitionTag="reset password icons" style={[styles.iconWrap, { backgroundColor: color.mainGreen }]} testID="screen icon">
          <MaterialCommunityIcons name="email-check" size={100} color="white" />
        </Animated.View>
        <Text style={[styles.infoText, { color: color.mainText }]}>Please enter the 4 digit code sent to your email address</Text>
        <CustomPinInput value={otpcode} onChange={onChange} onSubmit={onSubmit} />
        <SubmitButton label="Verify" isLoading={loading} onSubmit={onSubmit} />
        <View style={styles.resendBox}>
          <Text style={[styles.resendText, { color: color.mainText }]}>Didn't receive a code?</Text>
          {isTimerActive ? (
            <>
              <CountDown
                digitStyle={styles.countdownTimer}
                digitTxtStyle={{ ...styles.resendTimer, color: color.mainGreen }}
                onFinish={() => setIsTimerActive(false)}
                separatorStyle={{ ...styles.resendTimer, color: color.mainGreen }}
                showSeparator
                timeToShow={["M", "S"]}
                timeLabels={{ s: "" }}
                until={59}
              />
            </>
          ) : (
            <TouchableOpacity onPress={resendCode}>
              <Text style={[styles.resendTimer, { color: color.mainGreen }]}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    alignItems: "center",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    top: -5,
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  mainBox: {
    flex: 1,
    gap: 30,
    paddingHorizontal: 20,
    paddingTop: 70
  },
  iconWrap: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 100,
    height: 160,
    justifyContent: "center",
    marginBottom: 30,
    width: 160
  },
  infoText: {
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: "center",
  },
  resendBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    paddingTop: 20
  },
  resendText: {
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: "center"
  },
  resendTimer: {
    fontFamily: fonts.I_600,
    fontSize: 14
  },
  resendTextBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  countdownTimer: {
    height: "auto",
    width: "auto"
  }
});