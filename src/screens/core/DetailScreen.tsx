import { BuyNow, QuantitySelect, Ratings } from "@components/core/Cart";
import { fonts, shadowStyle } from "@utils";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CartScreen = () => {
  const [isHearted, setIsHearted] = useState(false);

  const handleHeartPress = () => {
    setIsHearted(!isHearted);
  };
  const navigation = useNavigation();
  const goToCartScreen = () => {
    navigation.navigate("Detail");
  };
  return (
    <View style={styles.container}>
      <View style={styles.semiCircle}>
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
        <Image
          source={require("@images/food.png")}
          style={styles.thaiFoodTomYum}
        />
        <Ratings />
      </View>

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

      <View style={styles.buyWrap}>
        <TouchableOpacity style={styles.iconWrap}>
          <Icon
            name="shopping-cart"
            size={40}
            color="#BCB5B5"
            onPress={goToCartScreen}
          />
        </TouchableOpacity>
        <BuyNow />
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
    paddingTop: hp("10%"),
  },

  semiCircle: {
    width: "100%",
    height: hp("35%"),
    backgroundColor: "#4CAF50",
    borderBottomLeftRadius: wp("10%"),
    borderBottomRightRadius: wp("10%"),
    padding: wp("6%"),
    transform: [{ scaleY: 1 }],
    position: "absolute",
    top: 0,
    ...shadowStyle,
  },

  thaiFoodTomYum: {
    height: hp("30%"),
    width: "100%",
    marginTop: hp("6%"),
    alignItems: "center",
    objectFit: "cover",
  },

  textWrapper: {
    color: "#ffffff",
    fontFamily: fonts.I_400,
    fontSize: wp("2%"),
    fontWeight: "700",
    left: 0,
    letterSpacing: 0,

    textAlign: "center",
    top: 0,
    width: wp("35%"),
  },

  logg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: wp("80%"),
  },
  wrapText: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: wp("8%"),
    fontWeight: "700",
    right: "40%",
    marginBottom: wp("2%"),
  },
  wrapText2: {
    fontFamily: fonts.I_400,
    width: wp("90%"),
    fontSize: wp("5%"),
    fontWeight: "600",
    fontStyle: "italic",
    color: "#616161",
    textAlign: "justify",
    lineHeight: wp("5%"),
    marginBottom: wp("7%"),
  },
  iconWrap: {
    borderColor: "#000000",
    width: wp("10%"),
    marginBottom: 0,
    borderRadius: wp("5%"),
    marginTop: wp("10%"),
  },
  buyWrap: {
    width: wp("90%"),
    justifyContent: "space-between",

    flexDirection: "row",
  },
  love: {
    alignItems: "flex-end",
  },
});
