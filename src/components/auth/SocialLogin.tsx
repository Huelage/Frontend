import { useAppTheme } from '@hooks';
import { fonts, shadowStyle } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const SocialLogin = ({ page }: { page: 'SU' | 'SI'; }) => {
  const { color } = useAppTheme();
  return (
    <View testID='social login'>
      <View style={[styles.decoBox, { borderColor: color.mainText }]}>
        <Text style={[styles.decoText, { backgroundColor: color.defaultBg, color: color.mainText }]}>or</Text>
      </View>
      <View style={[styles.socialLogin, { backgroundColor: color.defaultBg, borderColor: color.mainGreen }]}>
        <Image testID='googleIcon' style={styles.socialIcon} source={require('@icons/googleIcon.png')} />
        <Text style={[styles.socialText, { color: color.mainGreen }]}>SIGN {page == 'SU' ? "UP" : "IN"} WITH GOOGLE</Text>
      </View>
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  decoBox: {
    borderBottomWidth: 1,
    marginHorizontal: 40,
    marginVertical: 8,
    marginBottom: 25,
  },
  decoBoxBorder: {
    height: 1,
  },
  decoText: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily: fonts.I_300I,
    left: '44%',
    top: -13,
    position: 'absolute'
  },
  socialLogin: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    gap: 15,
    height: 50,
    justifyContent: 'center',
    ...shadowStyle
  },
  socialIcon: {
    width: 30,
    height: 30
  },
  socialText: {
    fontFamily: fonts.I_600,
    fontSize: 18,
  }
});