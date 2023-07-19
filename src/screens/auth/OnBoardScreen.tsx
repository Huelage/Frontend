import { NavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { shadowStyle } from "@utils";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fonts } from "../../utils/fontEnum";

const OnBoardScreen = () => {
  const { navigate } = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image style={styles.logoImage} source={require("@images/onboard_logo.png")} />
        <Text style={styles.logoText}>HUELAGE</Text>
      </View>
      <View style={styles.authWrapper}>
        <TouchableOpacity onPress={() => navigate("Login")}>
          <View style={[styles.baseButton, styles.loginButton]}>
            <Text style={styles.loginText}>LOG IN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("WelcomePage")}>
          <View style={[styles.baseButton, styles.signupButton]}>
            <Text style={styles.signupText}>SIGN UP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#4CAF50",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp("10%"),
    paddingTop: hp("15%")
  },
  logoWrapper: {
    alignItems: "center",
    gap: 15,
    justifyContent: 'center',
  },
  logoImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  logoText: {
    fontFamily: fonts.I_700,
    fontSize: 30,
    fontWeight: "700",
    color: "#fff"
  },
  authWrapper: {
    gap: 15,
    justifyContent: 'center',
    marginTop: hp("30%"),
    width: '100%'
  },
  baseButton: {
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    width: '100%',
    ...shadowStyle
  },
  loginButton: {
    backgroundColor: "#fff",
  },
  loginText: {
    color: "#4CAF50",
    fontFamily: fonts.I_600,
    fontSize: 18
  },
  signupButton: {
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff'
  },
  signupText: {
    color: "#fff",
    fontFamily: fonts.I_600,
    fontSize: 18
  }
});
