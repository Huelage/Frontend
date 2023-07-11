import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fonts } from "../utils/fontEnum";

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.semiCircle}></View>
      <Image
        source={require("../../assets/images/food.png")}
        style={styles.thaiFoodTomYum}
      />
      <View style={styles.soup}>
        <View style={styles.overlapGroup}>
          <Text style={styles.textWrapper}>River prawn spicy soup</Text>
          <View style={styles.element}>
            <View style={styles.overlapGroup2}>
              <Image
                source={require("../../assets/images/naira.png")}
                style={styles.mdiNaira}
              />
              <Text style={styles.h1}>1000</Text>
            </View>
          </View>
        </View>
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
    height: 426,
    backgroundColor: "#4CAF50",
    borderBottomLeftRadius: 800,
    borderBottomRightRadius: 800,
    borderRadius: 50,
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
    height: 329,
    left: 0,
    objectFit: "cover",
    position: "absolute",
    top: 191,
    width: 430,
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
  element: {
    height: 41,
    left: 77,
    position: "absolute",
    top: 88,
    width: 100,
  },
  overlapGroup2: {
    height: 41,
    position: "relative",
    width: 98,
  },
  mdiNaira: {
    height: 32,
    left: 0,
    position: "absolute",
    top: 5,
    width: 32,
  },
  h1: {
    color: "#ffffff",
    fontFamily: fonts.O_400,
    fontSize: 30,
    fontWeight: "700",
    left: 29,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 0,
  },
}); /*
  img: {
    height: 24,
    left: 30,
    position: "absolute",
    top: 82,
    width: 20,
  },
  removeAndAdd: {
    height: 33,
    left: 169,
    position: "absolute",
    top: 503,
    width: 94,
  },
  textWrapper2: {
    color: "#4caf50",
    fontFamily: fonts.O_400,
    fontSize: 24,
    fontWeight: "700",
    left: 39,
    letterSpacing: 0,
    lineHeight: "normal",
    position: "absolute",
    top: 0,
  },
  ggRemove: {
    height: 31,
    left: 0,
    position: "absolute",
    top: 1,
    width: 31,
  },
  ggAdd: {
    height: 31,
    left: 61,
    position: "absolute",
    top: 1,
    width: 31,
  },
  addToCart: {
    height: 62,
    left: 111,
    position: "absolute",
    top: 700,
    width: 200,
  },
  divWrapper: {
    backgroundColor: "#4caf50",
    borderRadius: 20,
    height: 62,
    position: "relative",
    width: 198,
  },
  textWrapper3: {
    color: "#ffffff",
    fontFamily: fonts.O_400,
    fontSize: 24,
    fontWeight: "700",
    left: 31,
    letterSpacing: 0,
    lineHeight: "normal",
    position: "absolute",
    top: 14,
  },
  riverPrawnSpiacy: {
    color: "#000000",
    fontFamily: fonts.O_400,
    fontSize: 20,
    fontWeight: "400",
    left: 30,
    letterSpacing: 0,
    lineHeight: "normal",
    position: "absolute",
    top: 550,
    width: 372,
  },
  span: {
    fontWeight: "700",
  },
  textWrapper4: {
    fontFamily: "Open Sans-SemiBold",
    fontWeight: "600",
  },
  textWrapper5: {
    color: "#000000",
    fontFamily: fonts.O_400,
    fontSize: 20,
    fontWeight: "700",
    left: 33,
    letterSpacing: 0,
    lineHeight: "normal",
    position: "absolute",
    top: 776,
  },
  backedChicken: {
    height: 53,
    left: 127,
    position: "absolute",
    top: 830,
    width: 198,
  },
  overlap2: {
    height: 53,
    position: "relative",
    width: 196,
  },
  removeAndAdd2: {
    height: 33,
    left: 0,
    position: "absolute",
    top: 20,
    width: 78,
  },
  textWrapper6: {
    color: "#4caf50",
    fontFamily: fonts.O_400,
    fontSize: 24,
    fontWeight: "700",
    left: 32,
    letterSpacing: 0,
    lineHeight: "normal",
    position: "absolute",
    top: 0,
    whiteSpace: "nowrap",
    width: 12,
  },
  ggRemove2: {
    height: 26,
    left: 0,
    position: "absolute",
    top: 7,
    width: 26,
  },
  ggAdd2: {
    height: 26,
    left: 50,
    position: "absolute",
    top: 7,
    width: 26,
  },
  textWrapper7: {
    color: "#000000",
    fontFamily: fonts.O_400,
    fontSize: 18,
    fontWeight: "700",
    left: 0,
    letterSpacing: 0,
    lineHeight: "normal",
    position: "absolute",
    top: 0,
    width: 196,
  },
  spagSauce: {
    height: 53,
    left: 134,
    position: "absolute",
    top: 933,
    width: 198,
  },
  removeAndAdd3: {
    height: 31,
    left: 0,
    position: "absolute",
    top: 22,
    width: 78,
  },
  ggRemove3: {
    height: 26,
    left: 0,
    position: "absolute",
    top: 5,
    width: 26,
  },
  ggAdd3: {
    height: 26,
    left: 50,
    position: "absolute",
    top: 5,
    width: 26,
  },
  elementK: {
    height: 25,
    left: 342,
    position: "absolute",
    top: 831,
    width: 64,
  },
  overlap3: {
    height: 25,
    position: "relative",
    width: 62,
  },
  mdiNaira2: {
    height: 22,
    left: 0,
    position: "absolute",
    top: 2,
    width: 22,
  },
  textWrapper8: {
    color: "#000000",
    fontFamily: fonts.O_400,
    fontSize: 18,
    fontWeight: "700",
    left: 20,
    letterSpacing: 0,
    lineHeight: "normal",
    position: "absolute",
    textAlign: "center",
    top: 0,
  },
  element2: {
    height: 25,
    left: 343,
    position: "absolute",
    top: 933,
    width: 57,
  },
  textWrapper9: {
    color: "#000000",
    fontFamily: fonts.O_400,
    fontSize: 18,
    fontWeight: "700",
    left: 24,
    letterSpacing: 0,
    lineHeight: "normal",
    opacity: 0.8,
    position: "absolute",
    textAlign: "center",
    top: 0,
  },
  bakedChickenWings: {
    height: 86,
    left: 30,
    objectFit: "cover",
    position: "absolute",
    top: 813,
    width: 84,
  },
  lifestyleFood: {
    height: 80,
    left: 11,
    objectFit: "cover",
    position: "absolute",
    top: 918,
    width: 120,
  },
  proceed: {
    height: 113,
    left: 43,
    position: "absolute",
    top: 1010,
    width: 358,
  },
  rectangle: {
    height: 6,
    left: 131,
    position: "absolute",
    top: 1129,
    width: 168,
  },
  statusBar: {
    height: 30,
    left: 30,
    position: "absolute",
    top: 16,
    width: 370,
  },
});*/
