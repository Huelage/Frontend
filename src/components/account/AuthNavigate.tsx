import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts } from '../../utils/fontEnum';
import { NavigationProps } from '../../utils/interfaces';

const AuthNavigate = ({ page }: { page: 'SU' | 'SI'; }) => {
  const { navigate } = useNavigation<NavigationProps>();
  const navTo = page == 'SU' ? 'Login' : 'SignUp';
  return (
    <Text style={styles.accountRedirect}>
      {page == 'SU' ? "Already a member" : "Don't have an account"}?&nbsp;
      <TouchableOpacity onPress={() => navigate(navTo)}>
        <Text style={styles.accountAccent}>{page == 'SU' ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>
    </Text>
  );
};

export default AuthNavigate;

const styles = StyleSheet.create({
  accountRedirect: {
    fontFamily: fonts.I_400,
    fontSize: 16,
    textAlign: 'center'
  },
  accountAccent: {
    color: "#4CAF50",
    fontFamily: fonts.I_600
  }
});