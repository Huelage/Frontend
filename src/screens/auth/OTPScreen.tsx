import { useAppDispatch } from '@api/app/appHooks';
import { setAuthStatus } from '@api/slices/globalSlice';
import { CustomPinInput, SubmitButton } from '@components/auth';
import { AntDesign } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { AuthNavigationProps, OTPRouteProps } from '@interfaces';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fonts } from '@utils';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const OTPScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { params: { phoneno } } = useRoute<OTPRouteProps>();
  const [value, setValue] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(59);
  const { goBack } = useNavigation<AuthNavigationProps>();
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const timerRef = useRef<number>(seconds);
  const numbers = phoneno.replace(/-\./g, " ").split(" ");
  const countrycode = numbers[0];
  const number = numbers.slice(1).join("");
  const formattedNumber = `${countrycode} ${number.slice(0, 2)}******${number.slice(-2)}`;

  const resendCode = () => {
    setIsTimerActive(true);
    timerRef.current = 59;
  };
  const verifyOTP = () => {
    if (/\d{4}/.test(value.trim())) {
      dispatch(setAuthStatus(true));
    }
  };
  const onChange = (val: string) => setValue(val);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timerRef.current <= 0) {
        clearInterval(timerId);
        setIsTimerActive(false);
      } else {
        timerRef.current--;
        setSeconds(timerRef.current);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [isTimerActive]);
  return (
    <>
      <StatusBar style='auto' />
      <View style={[styles.container, { paddingTop: insets.top + 10 }]} onTouchStart={() => Keyboard.dismiss()} testID="otp screen">
        <View style={styles.headerBox}>
          <TouchableOpacity style={styles.backButton} onPress={goBack} testID="back button">
            <AntDesign name="arrowleft" size={26} color={color.mainText} />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: color.mainText }]}>OTP Code Verification</Text>
        </View>
        <View style={styles.mainBox}>
          <Animated.Image
            sharedTransitionTag="huelageLogo"
            style={styles.logoImage}
            testID="logo image"
            source={require("@images/onboard_logo.png")}
          />
          <Text style={[styles.infoText, { color: color.mainText }]}>Code has been sent to {formattedNumber}</Text>
          <CustomPinInput value={value} onChange={onChange} onSubmit={verifyOTP} />
          {seconds ? (
            <Text style={[styles.resendText, { color: color.mainText }]}>
              Resend code in&nbsp;
              <Text style={[styles.resendTimer, { color: color.mainGreen }]}>00:{seconds.toString().padStart(2, '0')}</Text>s
            </Text>
          ) : (
            <TouchableOpacity onPress={resendCode}>
              <Text style={[styles.resendText, styles.resendTimer, { color: color.mainGreen }]}>Resend Code</Text>
            </TouchableOpacity>
          )}
          <SubmitButton label='Verify' onSubmit={verifyOTP} />
        </View>
      </View>
    </>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    left: 20
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
    alignSelf: 'center',
    borderRadius: 40,
    height: 80,
    marginBottom: 40,
    width: 80,
  },
  infoText: {
    fontFamily: fonts.I_600,
    fontSize: 16,
    textAlign: 'center'
  },
  resendText: {
    fontFamily: fonts.I_500,
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center'
  },
  resendTimer: {
    fontFamily: fonts.I_600
  }
});
