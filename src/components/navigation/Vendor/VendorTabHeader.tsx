import { fonts } from "@utils";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrderBar from "./OrderBar";

const VendorTabHeader = () => {
  const inset = useSafeAreaInsets();
  return (
    <ImageBackground style={[styles.container, { paddingTop: inset.top + 20 }]} source={require("@images/salado.png")} testID="vendor tab header">
      <View style={styles.headerBox}>
        <Text testID="vendor name" style={styles.resName}>Salado Cafeteria</Text>
      </View>
      <OrderBar />
    </ImageBackground>
  );
};

export default VendorTabHeader;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  navButton: {
    alignItems: "center",
    backgroundColor: "#F0FFF0",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  notificationBubble: {
    alignItems: "center",
    backgroundColor: "#E93223",
    borderRadius: 9,
    height: 18,
    justifyContent: "center",
    position: "absolute",
    top: -4,
    right: -4,
    width: 18,
  },
  notificationNo: {
    color: "#fff",
    fontFamily: fonts.I_600,
    fontSize: 12
  },
  resName: {
    color: "#F0FFF0",
    fontFamily: fonts.I_700,
    fontSize: 30
  }
});