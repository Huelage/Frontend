import { useAppDispatch, useAppSelector } from '@api/app/appHooks';
import { getVendorStatus, setAuthStatus, setVendorStatus } from '@api/slices/globalSlice';
import { CustomPinInput, SubmitButton } from '@components/auth';
import { Ionicons } from '@expo/vector-icons';
import { AuthNavigationProps, OTPRouteProps } from '@interfaces';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fonts, shadowStyle } from '@utils';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const OTPScreen = () => {
  const dispatch = useAppDispatch();
  const { params: { phoneno } } = useRoute<OTPRouteProps>();
  const [value, setValue] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(59);
  const { goBack } = useNavigation<AuthNavigationProps>();
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const timerRef = useRef<number>(seconds);
  const formattedNumber = `+234 ${phoneno.slice(1, 3)}******${phoneno.slice(-2)}`;

  const resendCode = () => {
    setIsTimerActive(true);
    timerRef.current = 59;
  };
  const verifyOTP = () => {
    dispatch(setAuthStatus(true));
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
      <StatusBar style='dark' />
      <View style={styles.container} testID='otp screen'>
        <View style={styles.introContainer}>
          <TouchableOpacity onPress={goBack} testID='back button'>
            <Ionicons name="ios-arrow-back" size={34} color="black" />
          </TouchableOpacity>
          <Text style={styles.introText}>OTP Code Verification</Text>
        </View>
        <View style={styles.mainBox}>
          <Text style={styles.infoText}>Code has been sent to {formattedNumber}</Text>
          <CustomPinInput value={value} onChange={onChange} onSubmit={verifyOTP} />
          {seconds ? (
            <Text style={styles.resendText}>
              Resend code in&nbsp;
              <Text style={styles.resendTimer}>00:{seconds.toString().padStart(2, '0')}</Text>s
            </Text>
          ) : (
            <TouchableOpacity onPress={resendCode}>
              <Text style={[styles.resendText, styles.resendTimer]}>Resend Code</Text>
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
    flex: 1,
    marginHorizontal: wp("8%"),
    marginTop: hp("8%")
  },
  introContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  introText: {
    flex: 1,
    fontFamily: fonts.I_700,
    fontSize: 20,
    textAlign: 'center'
  },
  mainBox: {
    flex: 1,
    gap: 10,
    marginTop: hp("20%"),
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
    color: "#47CA4C",
    fontFamily: fonts.I_600
  },
  inputRoot: {
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    width: '100%'
  },
  inputCell: {
    alignItems: 'center',
    borderColor: '#93b1a4',
    borderRadius: 11,
    borderWidth: 2,
    fontSize: 28,
    height: 65,
    justifyContent: 'center',
    paddingVertical: 14,
    textAlign: 'center',
    width: 65
  },
  activeInputCell: {
    borderColor: '#47CA4C',
    ...shadowStyle
  },
});
