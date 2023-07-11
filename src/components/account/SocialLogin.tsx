import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../utils/fontEnum';

const SocialLogin = ({ page }: { page: 'SU' | 'SI'; }) => {
  return (
    <>
      <View style={styles.decoBox}>
        <Text style={styles.decoText}>or</Text>
      </View>
      <View style={styles.socialLogin}>
        <Image style={styles.socialIcon} source={require('../../../assets/icons/googleIcon.png')} />
        <Text style={styles.socialText}>SIGN {page == 'SU' ? "UP" : "IN"} WITH GOOGLE</Text>
      </View>
    </>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  decoBox: {
    borderBottomWidth: 2,
    marginHorizontal: 30,
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
    borderColor: "#4CAF50",
    borderWidth: 2,
    borderRadius: 35,
    flexDirection: "row",
    gap: 15,
    height: 60,
    justifyContent: 'center'
  },
  socialIcon: {
    width: 40,
    height: 40
  },
  socialText: {
    color: "#4CAF50",
    fontFamily: fonts.I_600,
    fontSize: 18,
  }
});