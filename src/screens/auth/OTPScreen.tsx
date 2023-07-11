import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { shadowStyle } from '../../utils';
import { fonts } from '../../utils/fontEnum';

const CELL_COUNT = 4;

const OTPScreen = () => {
  const [value, setValue] = useState<string>("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>OTP Code Verification</Text>
      <View style={styles.mainBox}>
        <Text style={styles.infoText}>Code has been sent to +234 81*******67</Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.inputRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.inputCell, isFocused && styles.activeInputCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Text style={styles.resendText}>
          Resend code in&nbsp;
          <Text style={styles.resendTimer}>00:59</Text>s
        </Text>
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp("8%")
  },
  introText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    textAlign: 'center',
    marginTop: hp("10%"),
  },
  mainBox: {
    alignItems: 'center',
    flex: 1,
    gap: 10,
    justifyContent: 'center'
  },
  infoText: {
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  resendText: {
    fontFamily: fonts.I_500,
    fontSize: 16
  },
  resendTimer: {
    color: "#47CA4C"
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
    borderColor: '#93b1a4',
    borderRadius: 11,
    borderWidth: 2,
    fontSize: 28,
    height: 60,
    width: 60,
    padding: 10,
    textAlign: 'center'
  },
  activeInputCell: {
    borderColor: '#47CA4C',
    ...shadowStyle
  },
});
