import { fonts, shadowStyle } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const SocialLogin = ({ page }: { page: 'SU' | 'SI'; }) => {
  return (
    <>
      <View style={styles.decoBox}>
        <Text style={styles.decoText}>or</Text>
      </View>
      <View style={styles.socialLogin}>
        <Image testID='googleIcon' style={styles.socialIcon} source={require('@icons/googleIcon.png')} />
        <Text style={styles.socialText}>SIGN {page == 'SU' ? "UP" : "IN"} WITH GOOGLE</Text>
      </View>
    </>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  decoBox: {
    borderBottomWidth: 2,
    marginHorizontal: 40,
    borderColor: 'rgba(0, 0, 0, 0.50)'
  },
  decoText: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily: fonts.I_300I,
    left: '44%',
    top: -13,
    position: 'absolute'
  },
  socialLogin: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: "#4CAF50",
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
    color: "#4CAF50",
    fontFamily: fonts.I_600,
    fontSize: 18,
  }
});