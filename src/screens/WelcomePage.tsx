import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fonts } from "../utils/fontEnum";
import OptionSelect from "../components/OptionSelect";

const WelcomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/onboard_logo.png")}
          />
        </View>
      </View>
      <View style={styles.welcomeToHUELAGEWrapper}>
        <Text style={styles.textWrapper2}>Select account option</Text>
      </View>
      <OptionSelect />
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#4CAF50",
    flex: 1,
    fontFamily: fonts.I_500,
    justifyContent: "center",
  },
  image: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  logoWrapper: {
    border: "0px none",
    height: 135,
    width: 180,
    alignItems: "center",
    top: 0,
  },
  logo: {
    height: 85,
    left: 0,
    position: "relative",
    top: 0,
    width: 85,
    borderRadius: 200,
    marginBottom: 100,
  },
  welcomeToHUELAGEWrapper: {
    border: "0px none",
    height: 50,
    width: "100%",
    top: 0,
    marginBottom: 30,
    alignItems: "center",
  },

  textWrapper2: {
    fontFamily: fonts.I_400,
    fontSize: 33,
    fontWeight: "700",
    color: "#ffffff",
  },
});
