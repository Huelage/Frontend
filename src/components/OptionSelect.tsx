import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fonts } from "../utils/fontEnum";

const OptionSelect = () => {
  return (
    <View>
      <View style={styles.Box}>
        <Image
          style={styles.user}
          source={require("../../assets/images/Vendor.png")}
        />
        <TouchableOpacity style={styles.vendorWrap}>
          <Text style={styles.vendor}>Vendor</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Box}>
        <Image
          style={styles.user}
          source={require("../../assets/images/User.png")}
        />
        <TouchableOpacity style={styles.vendorWrap}>
          <Text style={styles.vendor}>User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionSelect;

const styles = StyleSheet.create({
  Box: {
    backgroundColor: "#ffffff",
    height: 370,
    width: 376,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 7,
  },
  vendorWrap: {
    backgroundColor: "#47c94c",
    width: "80%",
    height: 55,
    bottom: -100,
    borderRadius: 50,
    padding: 15,
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
  vendor: {
    color: "#ffffff",
    fontFamily: fonts.I_700,
    fontSize: 20,
    fontWeight: "700",
    left: 0,
  },
  user: {
    height: 142,
    width: "100%",
    resizeMode: "contain",
    top: 70,
  },
});
