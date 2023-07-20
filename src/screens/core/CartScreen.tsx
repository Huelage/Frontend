import { BuyNow, QuantitySelect, Ratings } from '@components/core/Cart';
import { fonts } from "@utils";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CartScreen = () => {
  const [isHearted, setIsHearted] = useState(false);

  const handleHeartPress = () => {
    setIsHearted(!isHearted);
  };
  return (
    <View style={styles.container}>
      <View style={styles.semiCircle}></View>

      <Image
        source={require("@images/food.png")}
        style={styles.thaiFoodTomYum}
      />
      <Ratings />
      <QuantitySelect />

      <View style={styles.logg}>
        <Text style={styles.wrapText}>About</Text>
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
      <View style={styles.licon}>
        <Icon name="shopping-cart" size={40} color="#BCB5B5" />
      </View>
      <View style={styles.love}>
        <View>
          <TouchableOpacity onPress={handleHeartPress}>
            <Icon
              name={isHearted ? "heart" : "heart-o"}
              size={40}
              color="red"
            />
          </TouchableOpacity>
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
    fontFamily: fonts.I_400,
    fontSize: 26,
    fontWeight: "700",
    left: 0,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 0,
    width: 259,
  },

  logg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    top: "18%",
  },
  wrapText: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 35,
    fontWeight: "700",
    right: "40%",
    marginBottom: 10,
  },
  wrapText2: {
    fontFamily: fonts.I_400,
    width: 500,
    fontSize: 25,
    fontWeight: "500",
    fontStyle: "italic",
    color: "#616161",
    textAlign: "justify",
    lineHeight: 35,
  },
  licon: {
    top: "16%",
    right: "30%",
    borderColor: "#000000",
    width: "10%",
    height: 50,
    borderRadius: 20,
  },
  love: {
    bottom: "68%",
    left: "40%",
    marginBottom: -50,
  },
});
