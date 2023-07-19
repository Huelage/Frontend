import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@interfaces';
import { fonts } from '@utils';

interface AuthNavigateProps {
  page: 'SU' | 'SI',
  isVendor: boolean;
}

const AuthNavigate = ({ page, isVendor }: AuthNavigateProps) => {
  const { navigate } = useNavigation<NavigationProps>();
  const handleNavigate = () => {
    if (page == 'SU') {
      navigate('Login');
    } else {
      navigate('SignUp', { isVendor });
    }
  };
  return (
    <View style={styles.accountBox}>
      <Text style={styles.accountRedirect}>
        {page == 'SU' ? "Already a member" : "Don't have an account"}?
      </Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Text style={styles.accountAccent}>{page == 'SU' ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthNavigate;

const styles = StyleSheet.create({
  accountBox: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center'
  },
  accountRedirect: {
    fontFamily: fonts.I_400,
    fontSize: 16,
    textAlign: 'center'
  },
  accountAccent: {
    color: "#4CAF50",
    fontFamily: fonts.I_700,
    fontSize: 17
  }
});