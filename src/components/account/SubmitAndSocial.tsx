import { useNavigation } from '@react-navigation/native';
import React, { BaseSyntheticEvent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shadowStyle } from '../../utils';
import { fonts } from '../../utils/fontEnum';
import { NavigationProps } from '../../utils/interfaces';

interface SubmitProp {
  page: "SU" | "SI";
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}
const SubmitAndSocial = ({ page, onSubmit }: SubmitProp) => {
  const { navigate } = useNavigation<NavigationProps>();
  const navTo = page == 'SU' ? 'Login' : 'SignUp';
  return (
    <>
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>{page == 'SU' ? "CREATE ACCOUNT" : "LOGIN"}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.decoBox}>
        <Text style={styles.decoText}>or</Text>
      </View>
      <View style={styles.socialLogin}>
        <Image style={styles.socialIcon} source={require('../../../assets/icons/googleIcon.png')} />
        <Text style={styles.socialText}>SIGN {page == 'SU' ? "UP" : "IN"} WITH GOOGLE</Text>
      </View>
      <Text style={styles.accountRedirect}>
        {page == 'SU' ? "Already a member" : "Don't have an account"}?&nbsp;
        <TouchableOpacity onPress={() => navigate(navTo)}>
          <Text style={styles.accountAccent}>{page == 'SU' ? "Login" : "Sign Up"}</Text>
        </TouchableOpacity>
      </Text>
    </>
  );
};

export default SubmitAndSocial;

const styles = StyleSheet.create({
  loginButton: {
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 35,
    height: 60,
    justifyContent: 'center',
    ...shadowStyle
  },
  loginText: {
    color: "#fff",
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  textForgot: {
    alignSelf: 'flex-end',
    fontFamily: fonts.I_300,
    fontSize: 18
  },
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
  },
  accountRedirect: {
    fontFamily: fonts.I_400,
    fontSize: 16,
    textAlign: 'center'
  },
  accountAccent: {
    color: "#4CAF50",
    fontFamily: fonts.I_600
  },
});