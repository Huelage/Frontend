import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { REQUEST_PHONE_VERIFICATION, VERIFY_PHONE } from "@api/graphql";
import { getEntity, setCredentials } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { CustomPinInput, SubmitButton } from "@components/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, setItem, showSuccess } from "@utils";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountDown from "react-native-countdown-fixed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VerifyPhoneScreen = () => {
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const phoneno = entity.phone;
  const [verifyCode, { data, loading }] = useMutation(VERIFY_PHONE);
  const [refreshOTP] = useMutation(REQUEST_PHONE_VERIFICATION);
  const [phoneOtp, setPhoneOtp] = useState<string>("");
  const { goBack, navigate } = useNavigation<UserProfileTabProps>();
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const formattedNumber = `${phoneno?.slice(0, 4)} ${phoneno?.slice(4, 6)}******${phoneno?.slice(-2)}`;

  const resendCode = async () => {
    const input = { entityId: entity.id, phone: phoneno };
    try {
      await refreshOTP({ variables: { input } });
      setIsTimerActive(true);
    } catch {}
  };
  const verifyOTP = async () => {
    if (/\d{4}/.test(phoneOtp.trim())) {
      const input = { phone: phoneno, otp: parseInt(phoneOtp) };
      try {
        await verifyCode({ variables: { input } });
      } catch {}
    }
  };
  const onChange = (otp: string) => setPhoneOtp(otp);
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    if (data) {
      const res = data.verifyPhoneOtp;
      const updatedEntity = { ...entity, isPhoneVerified: true };
      (async () => await setItem("huelageRefreshToken", res.refreshToken))();
      dispatch(setCredentials({ entity: updatedEntity, accessToken: res.accessToken }));
      showSuccess("Phone number verified successfully");
      navigate("Setting");
    }
  }, [data, loading]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={dismissKeyboard} testID="verify phone screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Verify Phone Number</Text>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={styles.mainBox}>
        <Animated.Image
          sharedTransitionTag="huelageLogo"
          style={styles.logoImage}
          testID="logo image"
          source={require("@images/onboard_logo.png")}
        />
        <Text style={[styles.infoText, { color: color.mainText }]}>Code has been sent to {formattedNumber}</Text>
        <CustomPinInput value={phoneOtp} onChange={onChange} onSubmit={verifyOTP} />
        {isTimerActive ? (
          <View style={styles.resendTextBox}>
            <Text style={[styles.resendText, { color: color.mainText }]}>
              Resend code in&nbsp;
            </Text>
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
            <Text style={[styles.resendText, { color: color.mainText }]}>s</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={resendCode} style={styles.resendTextBox}>
            <Text style={[styles.resendTimer, { color: color.mainGreen }]}>Resend Code</Text>
          </TouchableOpacity>
        )}
        <SubmitButton label="Verify" isLoading={loading} onSubmit={verifyOTP} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default VerifyPhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 70
  },
  logoImage: {
    alignSelf: "center",
    borderRadius: 40,
    height: 80,
    marginBottom: 40,
    width: 80,
  },
  infoText: {
    fontFamily: fonts.I_600,
    fontSize: 16,
    textAlign: "center"
  },
  resendTextBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  resendText: {
    fontFamily: fonts.I_500,
    fontSize: 16,
    textAlign: "center"
  },
  resendTimer: {
    fontFamily: fonts.I_500,
    fontSize: 16,
    textAlign: "center"
  },
  countdownTimer: {
    height: "auto",
    width: "auto"
  }
});
