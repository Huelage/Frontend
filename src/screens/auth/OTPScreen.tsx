import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { REQUEST_PHONE_VERIFICATION, VERIFY_OTP } from "@api/graphql";
import { getVendorStatus, setCredentials } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { CustomPinInput, SubmitButton } from "@components/auth";
import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { AuthNavigationProps, OTPRouteProps, entityInterface } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, getItem, setItem } from "@utils";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountDown from "react-native-countdown-fixed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OTPScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const isVendor = useAppSelector(getVendorStatus);
  const { params: { phoneno } } = useRoute<OTPRouteProps>();
  const [verifyCode, { data, loading }] = useMutation(VERIFY_OTP);
  const [refreshOTP] = useMutation(REQUEST_PHONE_VERIFICATION);
  const [phoneOtp, setPhoneOtp] = useState<string>("");
  const { goBack } = useNavigation<AuthNavigationProps>();
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const numbers = phoneno.replace(/-\./g, " ").split(" ");
  const countrycode = numbers[0];
  const number = numbers.slice(1).join("");
  const formattedNumber = `${countrycode} ${number.slice(0, 2)}******${number.slice(-2)}`;

  const resendCode = async () => {
    try {
      const entityId = await getItem("huelageEntityId");
      const input = { entityId, phone: phoneno.replace(/[\s\.-]/g, "") };
      await refreshOTP({ variables: { input } });
      setIsTimerActive(true);
    } catch {}
  };
  const verifyOTP = async () => {
    if (/\d{4}/.test(phoneOtp.trim())) {
      const input = { phone: phoneno.replace(/[\s\.-]/g, ""), otp: parseInt(phoneOtp) };
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
      let entity: entityInterface = {
        id: res.entityId,
        walletId: res.wallet.walletId,
        email: res.email,
        phone: res.phone,
        imgUrl: res.imgUrl,
        isEmailVerified: res.isEmailVerified,
        isPhoneVerified: res.isPhoneVerified
      };
      if (isVendor) {
        const { __typename, ...vendor } = res.vendor;
        entity = { ...entity, ...vendor };
      } else {
        const { __typename, knownLocation: { locations }, ...user } = res.user;
        entity = { ...entity, ...user };
        entity.knownLocation = locations;
      }
      (async () => await setItem("huelageRefreshToken", res.refreshToken))();
      dispatch(setCredentials({ entity, accessToken: res.accessToken }));
    }
  }, [data, loading]);
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]} onTouchStart={dismissKeyboard} testID="otp screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="back button" >
          <AntDesign name="arrowleft" size={26} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>OTP Code Verification</Text>
      </View>
      <KeyboardAwareScrollView scrollEnabled keyboardOpeningTime={Number.MAX_SAFE_INTEGER} contentContainerStyle={styles.mainBox}>
        <Animated.Image sharedTransitionTag="huelageLogo" style={styles.logoImage} testID="logo image" source={require("@images/onboard_logo.png")} />
        <Text style={[styles.infoText, { color: color.mainText }]}>Code has been sent to {formattedNumber}</Text>
        <CustomPinInput value={phoneOtp} onChange={onChange} onSubmit={verifyOTP} />
        {isTimerActive ? (
          <View style={styles.resendTextBox}>
            <Text style={[styles.resendText, { color: color.mainText }]}>Resend code in&nbsp;</Text>
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

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerText: {
    fontFamily: fonts.I_600,
    fontSize: 20,
  },
  mainBox: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 70,
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
    textAlign: "center",
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
