import { useAppDispatch } from "@api/app/appHooks";
import { setVendorStatus } from "@api/slices/globalSlice";
import { AuthNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/core";
import { fonts, shadowStyle } from "@utils";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const SignupSelectScreen = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<AuthNavigationProps>();
  const handleSelect = (isVendor: boolean) => {
    dispatch(setVendorStatus(isVendor));
    navigate("SignUp");
  };
  return (
    <View style={styles.container} testID="signup select screen">
      <ImageBackground style={styles.containerBg} source={require('@images/SignupSelectBg.png')} resizeMode="cover">
        <Animated.Image sharedTransitionTag="huelageLogo" style={styles.logoImage} source={require("@images/onboard_logo.png")} testID="logo image" />
        <Text style={styles.infoText}>Select account option</Text>
        <View style={styles.authSelectWrapper}>
          <Animated.View entering={SlideInDown.delay(100).springify().damping(15)} style={styles.authSelect} testID="vendor select box">
            <Animated.View entering={FadeIn.delay(500)} style={styles.authSelectImageWrapper}>
              <Image testID="select box image" style={styles.authSelectImage} source={require("@images/Vendor.png")} resizeMode="contain" />
            </Animated.View>
            <TouchableOpacity onPress={() => handleSelect(true)}>
              <Animated.View entering={FadeIn.delay(600)} style={styles.authSelectButton}>
                <Text style={styles.authSelectText}>Vendor</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={SlideInDown.delay(300).springify().damping(15)} style={styles.authSelect} testID="user select box">
            <Animated.View entering={FadeIn.delay(600)} style={styles.authSelectImageWrapper}>
              <Image testID="select box image" style={styles.authSelectImage} source={require("@images/User.png")} resizeMode="contain" />
            </Animated.View>
            <TouchableOpacity onPress={() => handleSelect(false)}>
              <Animated.View entering={FadeIn.delay(700)} style={styles.authSelectButton}>
                <Text style={styles.authSelectText}>User</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
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
    fontSize: 22,
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
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    ...shadowStyle
  },
  authSelectText: {
    color: '#FFF',
    fontFamily: fonts.I_700,
    fontSize: 16
  }
});
