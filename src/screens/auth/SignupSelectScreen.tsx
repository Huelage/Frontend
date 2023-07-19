import { NavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/core";
import { shadowStyle } from "@utils";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fonts } from "../../utils/fontEnum";

const SignupSelectScreen = () => {
  const { navigate } = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.containerBg} source={require('@images/SignupSelectBg.png')} resizeMode="cover">
        <Image style={styles.logoImage} source={require("@images/onboard_logo.png")} />
        <Text style={styles.infoText}>Select account option</Text>
        <View style={styles.authSelectWrapper}>
          <View style={styles.authSelect}>
            <View style={styles.authSelectImageWrapper}>
              <Image style={styles.authSelectImage} source={require("@images/Vendor.png")} resizeMode="contain" />
            </View>
            <TouchableOpacity onPress={() => navigate("SignUp", { isVendor: true })}>
              <View style={styles.authSelectButton}>
                <Text style={styles.authSelectText}>Vendor</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.authSelect}>
            <View style={styles.authSelectImageWrapper}>
              <Image style={styles.authSelectImage} source={require("@images/User.png")} resizeMode="contain" />
            </View>
            <TouchableOpacity onPress={() => navigate("SignUp", { isVendor: false })}>
              <View style={styles.authSelectButton}>
                <Text style={styles.authSelectText}>User</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignupSelectScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    flex: 1
  },
  containerBg: {
    alignItems: "center",
    flex: 1,
    gap: 20,
    justifyContent: "center",
  },
  logoImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  infoText: {
    fontFamily: fonts.I_700,
    fontSize: 24,
    color: "#fff",
  },
  authSelectWrapper: {
    alignItems: 'center',
    gap: 25,
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: wp("15%")
  },
  authSelect: {
    backgroundColor: '#fff',
    borderRadius: 20,
    gap: 20,
    padding: 20,
    ...shadowStyle
  },
  authSelectImageWrapper: {
    alignItems: 'center',
    width: wp('50%'),
    justifyContent: 'center'
  },
  authSelectImage: {
    height: 130,
    width: 130
  },
  authSelectButton: {
    alignItems: 'center',
    backgroundColor: '#47CA4C',
    borderRadius: 20,
    paddingVertical: 10,
    ...shadowStyle
  },
  authSelectText: {
    color: '#FFF',
    fontFamily: fonts.I_700,
    fontSize: 16
  }
});
