import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getShowOnboard, setShowOnboard } from "@api/slices/globalSlice";
import { AuthNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, shadowStyle } from "@utils";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, SlideInDown, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const OnBoardScreen = () => {
  const { navigate } = useNavigation<AuthNavigationProps>();
  const dispatch = useAppDispatch();
  const showOnboard = useAppSelector(getShowOnboard);
  const progress = useSharedValue(0);
  const degrees = useSharedValue(360);
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: progress.value
  }));
  const animatedRotate = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degrees.value}deg` }]
  }));
  useEffect(() => {
    degrees.value = withDelay(0, withTiming(0, { duration: 2200, easing: Easing.bezier(0.65, 0, 0.35, 1) }));
    progress.value = withDelay(300,
      withSequence(
        withTiming(1, { duration: 700, easing: Easing.bezier(1, 0, 0.2, 1) }),
        withTiming(0, { duration: 100, easing: Easing.bezier(1, 0, 0.2, 1) }),
        withTiming(1, { duration: 250, easing: Easing.bezier(1, 0, 0.2, 1) }),
        withTiming(0, { duration: 100, easing: Easing.bezier(1, 0, 0.2, 1) }),
        withTiming(1, { duration: 500, easing: Easing.bezier(1, 0, 0.2, 1) }),
      )
    );
  }, []);
  useEffect(() => {
    if (!showOnboard) setTimeout(() => navigate('Login'), 0);
    else dispatch(setShowOnboard(false));
  });
  return (
    <View style={styles.container} testID="onboard screen">
      <View style={styles.logoWrapper}>
        <Animated.Image
          sharedTransitionTag="huelageLogo"
          style={[styles.logoImage, animatedRotate]}
          testID="logo image"
          source={require("@images/onboard_logo.png")}
        />
        <Animated.Text style={[styles.logoText, animatedOpacity]}>HUELAGE</Animated.Text>
      </View>
      <View style={styles.authWrapper}>
        <TouchableOpacity onPress={() => navigate("Login")} testID="login button">
          <Animated.View entering={SlideInDown.delay(2200).springify().damping(20)} style={[styles.baseButton, styles.loginButton]}>
            <Text style={styles.loginText}>LOG IN</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("SignupSelect")} testID="signup button">
          <Animated.View entering={SlideInDown.delay(2500).springify().damping(20)} style={[styles.baseButton, styles.signupButton]}>
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
