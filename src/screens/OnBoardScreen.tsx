import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../utils/fontEnum";

const OnBoardScreen = () => {
  const navigation = useNavigation();
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
      <View style={styles.label}>
        <View style={styles.welcomeToHUELAGEWrapper}>
          <Text style={styles.textWrapper2}>HUELAGE</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.loginWrap}>
        <Text style={styles.login}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signWrap}
        onPress={() => navigation.navigate("WelcomePage")}
      >
        <Text style={styles.signUp}>SIGN UP</Text>
      </TouchableOpacity>
      <Button title="Cart" onPress={() => navigation.navigate("Cart")} />
    </View>
  );
};

export default OnBoardScreen;

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
    height: 230,
    width: 330,
    alignItems: "center",
    top: -80,
  },
  logo: {
    height: 180,
    left: 0,
    position: "relative",
    top: 0,
    width: 180,
    borderRadius: 200,
    marginBottom: 100,
  },
  label: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  welcomeToHUELAGEWrapper: {
    border: "0px none",
    height: 50,
    width: 200,
    top: -100,
    marginBottom: 100,
    alignItems: "center",
  },

  textWrapper2: {
    fontFamily: fonts.C_400,
    fontSize: 50,
    fontWeight: "700",
    color: "#ffffff",
  },
  loginWrap: {
    backgroundColor: "white",
    width: "80%",
    height: 75,
    bottom: -220,
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 7,
  },
  login: {
    color: "#4caf50",
    fontFamily: fonts.I_600,
    fontSize: 25,
    fontWeight: "600",
    left: 0,
  },
  signWrap: {
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "transparent",
    width: "80%",
    height: 75,
    bottom: -220,
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
  },
  signUp: {
    color: "#ffffff",
    fontFamily: fonts.I_600,
    fontSize: 25,
    fontWeight: "600",
    left: 0,
  },
});
