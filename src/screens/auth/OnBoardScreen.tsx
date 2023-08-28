import { AuthNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, shadowStyle } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { SlideInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const OnBoardScreen = () => {
  const { navigate } = useNavigation<AuthNavigationProps>();
  const logoText = "HUELAGE".split('');

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Animated.Image
          entering={SlideInDown.duration(300).springify()}
          sharedTransitionTag="huelageLogo"
          style={styles.logoImage}
          source={require("@images/onboard_logo.png")}
        />
        <View style={{ flexDirection: 'row', gap: 3 }}>
          {logoText.map((item, index) => (
            <Animated.Text
              key={index.toString()}
              entering={SlideInDown.delay(600 + 300 * index).springify()}
              style={styles.logoText}>
              {item}
            </Animated.Text>
          ))}
        </View>
      </View>
      <View style={styles.authWrapper}>
        <TouchableOpacity onPress={() => navigate("Login")}>
          <Animated.View entering={SlideInDown.delay(2900).springify().damping(20)} style={[styles.baseButton, styles.loginButton]}>
            <Text style={styles.loginText}>LOG IN</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("SignupSelect")}>
          <Animated.View entering={SlideInDown.delay(3200).springify().damping(20)} style={[styles.baseButton, styles.signupButton]}>
            <Text style={styles.signupText}>SIGN UP</Text>
          </Animated.View>
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
    justifyContent: "center",
    width: '100%',
    height: 200
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
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, .3)',
    textShadowOffset: { width: 2, height: 5 },
    textShadowRadius: 5
  },
  authWrapper: {
    gap: 15,
    justifyContent: "center",
    marginTop: hp("30%"),
    width: "100%",
  },
  baseButton: {
    alignItems: "center",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    width: "100%",
    ...shadowStyle,
  },
  loginButton: {
    backgroundColor: "#fff",
  },
  loginText: {
    color: "#4CAF50",
    fontFamily: fonts.I_600,
    fontSize: 18,
  },
  signupButton: {
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#fff",
  },
  signupText: {
    color: "#fff",
    fontFamily: fonts.I_600,
    fontSize: 18,
  },
});
