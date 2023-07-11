import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fonts } from "../utils/fontEnum";

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.semiCircle}></View>
      <View style={styles.semi}>
        <Image
          source={require("../../assets/images/food.png")}
          style={styles.thaiFoodTomYum}
        />
      </View>
    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    flex: 1,
    fontFamily: fonts.I_500,
    justifyContent: "center",
  },
  semiCircle: {
    width: "100%",
    height: 376,
    backgroundColor: "#4CAF50",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,

    transform: [{ scaleY: 1 }],
    position: "absolute",
    top: 0,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4,

    elevation: 7,
  },
  Semi: {
    width: "100%",
    alignItems: "center",
    height: 1000,
  },
  thaiFoodTomYum: {
    height: 450,
    width: "100%",
    left: -310,
    right: 500,
    objectFit: "cover",
    position: "absolute",
    top: -520,
  },
  soup: {
    height: 129,
    left: 85,
    position: "absolute",
    top: 61,
    width: 261,
  },
  overlapGroup: {
    height: 129,
    position: "relative",
    width: 259,
  },
  textWrapper: {
    color: "#ffffff",
    fontFamily: fonts.O_400,
    fontSize: 26,
    fontWeight: "700",
    left: 0,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 0,
    width: 259,
  },
});
