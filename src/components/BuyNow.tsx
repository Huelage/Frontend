import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fonts } from "../utils/fontEnum";

const BuyNow = () => {
  return (
    <TouchableOpacity style={styles.loginWrap}>
      <Text style={styles.login}>Buy Now</Text>
    </TouchableOpacity>
  );
};
export default BuyNow;

const styles = StyleSheet.create({
  loginWrap: {
    backgroundColor: "#4CAF50",
    width: "70%",
    height: 75,
    bottom: -280,
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
    color: "#ffffff",
    fontFamily: fonts.I_600,
    fontSize: 25,
    fontWeight: "600",
    left: 0,
  },
});
