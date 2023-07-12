import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fonts } from "../utils/fontEnum";
import BuyNow from "../components/BuyNow";

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.semiCircle}></View>

      <Image
        source={require("../../assets/images/food.png")}
        style={styles.thaiFoodTomYum}
      />
      <View style={styles.Frame}>
        <Text style={styles.rating}>4.3</Text>
      </View>
      <View style={styles.log}>
        <Text style={styles.ppe}>Shrimp Soup</Text>
        <Text style={styles.pre}>N 2,400.00</Text>
      </View>
      <Text style={styles.wrapText}>About</Text>
      <View style={styles.logg}>
        <Text style={styles.wrapText2}>
          {" "}
          Lorem ipsum dolor sit amet, consectetur {"\n"}
          adipiscing elit, sed do eiusmod tempor incididunt {"\n"}
          ut labore et dolore magna aliqua. Ut enim ad {"\n"}
          minim veniam, quis nostrud exercitation ullamco {"\n"}
          laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>
      <BuyNow />
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

  thaiFoodTomYum: {
    height: 450,
    width: "100%",

    alignItems: "center",
    objectFit: "cover",
    position: "absolute",
    top: 150,
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
  Frame: {
    backgroundColor: "#47c94c",
    display: "flex",
    height: 40,
    width: 85,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 11,
    right: "33%",
  },
  rating: {
    color: "#ffffff",
    fontFamily: fonts.I_700,
    fontSize: 16,
    fontWeight: "700",
  },
  log: {
    width: "100%",
    height: 69,
    paddingHorizontal: 100,
  },
  ppe: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 50,
    fontWeight: "700",
    top: 0,
  },
  pre: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 25,
    fontWeight: "700",
    bottom: "60%",
    left: "85%",
  },
  logg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  wrapText: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 35,
    fontWeight: "700",
    right: "30%",
    marginBottom: 10,
    top: 0,
  },
  wrapText2: {
    fontFamily: fonts.I_400,
    width: 500,
    fontSize: 25,
    fontWeight: "500",
    fontStyle: "italic",
    color: "#616161",
  },
});
