import { useAppTheme } from '@hooks';
import { AuthNavigationProps } from '@interfaces';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AuthNavigateProps {
  page: 'SU' | 'SI',
}

const AuthNavigate = ({ page }: AuthNavigateProps) => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<AuthNavigationProps>();
  const handleNavigate = () => {
    if (page == 'SU') {
      navigate('Login');
    } else {
      navigate('SignUp');
    }
  };
  return (
    <View style={styles.accountBox} testID='auth navigate'>
      <Text style={[styles.accountRedirect, { color: color.mainText }]}>
        {page == 'SU' ? "Already a member" : "Don't have an account"}?
      </Text>
      <TouchableOpacity accessibilityRole="button" onPress={handleNavigate}>
        <Text style={[styles.accountAccent, { color: color.mainGreen }]}>{page == 'SU' ? "Login" : "Sign Up"}</Text>
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
    fontSize: 15,
    textAlign: 'center'
  },
  accountAccent: {
    fontFamily: fonts.I_700,
    fontSize: 17
  }
});