import { CustomPinInput, SubmitButton } from '@components/auth';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { AuthNavigationProps } from '@interfaces';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '@utils';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VerifyEmailScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [otpcode, setOtpcode] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(59);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const { navigate, goBack } = useNavigation<AuthNavigationProps>();
  const timerRef = useRef<number>(seconds);
  const onSubmit = () => {
    if (/\d{4}/.test(otpcode.trim())) {
      navigate("SetPassword");
    }
  };
  const onChange = (code: string) => setOtpcode(code);
  const resendCode = () => {
    setIsTimerActive(true);
    timerRef.current = 59;
  };

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
      <StatusBar style="auto" />
      <View style={[styles.container, { paddingTop: insets.top + 10 }]} onTouchStart={() => Keyboard.dismiss()} testID="verify email screen">
        <View style={styles.headerBox}>
          <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
            <AntDesign name="arrowleft" size={26} color={color.mainText} />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: color.mainText }]}>Email Verification</Text>
        </View>
        <View style={styles.mainBox}>
          <Animated.View sharedTransitionTag="reset password icons" style={[styles.iconWrap, { backgroundColor: color.mainGreen }]} testID="screen icon">
            <MaterialCommunityIcons name="email-check" size={100} color="white" />
          </Animated.View>
          <Text style={[styles.infoText, { color: color.mainText }]}>Please enter the 4 digit code sent to your email address</Text>
          <CustomPinInput value={otpcode} onChange={onChange} onSubmit={onSubmit} />
          <SubmitButton label="Verify" onSubmit={onSubmit} />
          <View style={styles.resendBox}>
            <Text style={[styles.resendText, { color: color.mainText }]}>Didn't receive a code?</Text>
            {seconds ? (
              <Text style={[styles.resendTimer, { color: color.mainGreen }]}>00:{seconds.toString().padStart(2, '0')}</Text>
            ) : (
              <TouchableOpacity onPress={resendCode}>
                <Text style={[styles.resendTimer, { color: color.mainGreen }]}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    paddingTop: 20
  },
  resendText: {
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: 'center'
  },
  resendTimer: {
    fontFamily: fonts.I_600,
    fontSize: 14
  }
});