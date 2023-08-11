import { fonts } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const Confirm = () => {
  return (
    <TouchableOpacity style={styles.ConfirmWrap}>
      <Text style={styles.Confirm}>Confirm</Text>
    </TouchableOpacity>
  );
};
export default Confirm;

const styles = StyleSheet.create({
  ConfirmWrap: {
    backgroundColor: "#4CAF50",
    width: widthPercentageToDP("80%"),
    height: 75,
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 7,
  },
  Confirm: {
    color: "#ffffff",
    fontFamily: fonts.I_600,
    fontSize: 25,
    fontWeight: "600",
  },
});
