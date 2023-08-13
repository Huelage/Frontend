import { fonts } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Promo = () => {
  return (
    <View style={styles.promoCodeContainer}>
      <Text style={styles.promoCodeText}>Promo Code</Text>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Promo;
const styles = StyleSheet.create({
  promoCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: "#effff0",
    height: hp("7%"),
    borderRadius: 20,
    marginBottom: wp("50%"),
  },
  promoCodeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: "#47CA4C",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  applyButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
