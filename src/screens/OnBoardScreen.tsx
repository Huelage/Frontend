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
            source={require("../../assets/images/image.jpg")}
          />
        </View>
      </View>
      <View style={styles.label}>
        <View style={styles.welcomeToHUELAGEWrapper}>
          <Text style={styles.welcomeToHUELAGE}>
            <Text style={styles.textWrapper}>Welcome to{"\n"}</Text>
            <Text style={styles.span}>&nbsp;&nbsp; </Text>
            <Text style={styles.textWrapper2}>HUELAGE</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.loginWrap}>
        <Text style={styles.login}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signWrap}>
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
    height: 537.16,
    width: 716.4,
    alignItems: "center",
  },
  logo: {
    height: 306,
    left: 0,
    position: "relative",
    top: 0,
    width: 306,
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
    height: 120,
    width: 398,
    top: -150,
    marginBottom: 100,
  },
  welcomeToHUELAGE: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "400",
    left: 0,
    letterSpacing: 0,

    top: 0,
  },
  textWrapper: {
    color: "#ffffff",
    fontFamily: fonts.BS_400,
    fontSize: 48,
    fontWeight: "400",
    letterSpacing: 0,
  },
  span: {
    fontFamily: fonts.C_400,
    fontSize: 70,
  },
  textWrapper2: {
    fontFamily: fonts.C_400,
    fontSize: 80,
  },
  loginWrap: {
    backgroundColor: "white",
    width: "80%",
    height: 75,
    top: -100,
    borderRadius: 50,
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
    top: -100,
    borderRadius: 50,
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
