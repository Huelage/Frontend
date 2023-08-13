import { fonts, shadowStyle } from "@utils";
import React, { useState } from "react";
import { mockFoods } from "@api/mock";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const QuantitySelect = () => {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("small");

  const getPrice = () => {
    let price = count * 2400.0;

    if (size === "medium") {
      price += count * 500;
    } else if (size === "large") {
      price += count * 1000;
    }

    return price;
  };

  return (
    <View style={styles.quantityWrap}>
      <View style={styles.Arrange}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={() => setCount(count > 1 ? count - 1 : count)}
        >
          <Text style={styles.Value}>-</Text>
        </TouchableOpacity>
        <Text style={styles.Count}>{count}</Text>
        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.Value}>+</Text>
        </TouchableOpacity>

        <Text>{count > 1}</Text>
        <Text>{count > 0}</Text>
      </View>
      <View style={styles.foodTextWrap}>
        <Text style={styles.foodText}>Shrimp Soup</Text>
        <Text style={styles.price}>
          {" "}
          <MaterialCommunityIcons
            name="currency-ngn"
            size={20}
            color="black"
          />{" "}
          {getPrice()}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: widthPercentageToDP("100%"),
          paddingHorizontal: 50,
        }}
      >
        <TouchableOpacity
          style={[
            styles.butt,
            styles.smallButton,
            size === "small" && styles.smallButtonSelected,
          ]}
          onPress={() => setSize("small")}
        >
          <Text style={styles.SizeText}>Small</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.butt,
            styles.mediumButton,
            size === "medium" && styles.mediumButtonSelected,
          ]}
          onPress={() => setSize("medium")}
        >
          <Text style={styles.SizeText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.butt,
            styles.largeButton,
            size === "large" && styles.largeButtonSelected,
          ]}
          onPress={() => setSize("large")}
        >
          <Text style={styles.SizeText}>Large</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuantitySelect;
const styles = StyleSheet.create({
  quantityWrap: {
    flex: 1,
    gap: wp("8%"),
    marginTop: hp("34%"),
    marginBottom: wp("5%"),
    paddingHorizontal: wp("7%"),
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#47CA4C",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  incrementButton: {
    backgroundColor: "#47c94c",
  },
  decrementButton: {
    backgroundColor: "#47c94c",
  },
  Count: {
    color: "#000000",
    fontWeight: "600",
    fontFamily: fonts.I_400,
    fontSize: hp("2%"),
  },
  Value: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  Arrange: {
    marginLeft: wp("70%"),
    height: hp("4.5%"),

    paddingLeft: 18,
    alignItems: "center",
    backgroundColor: "#F0FFF0",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginHorizontal: 55,
    ...shadowStyle,
  },
  butt: {
    height: 30,
    width: wp("20%"),
    marginTop: 10,

    alignItems: "center",
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },
  smallButton: {
    backgroundColor: "#616161",
    borderRadius: 20,
    height: 30,
    padding: 3,
  },
  mediumButton: {
    backgroundColor: "#616161",
    borderRadius: 20,
    height: 30,
    padding: 3,
  },
  largeButton: {
    backgroundColor: "#616161",
    borderRadius: 20,
    height: 30,
    padding: 3,
  },
  smallButtonSelected: {
    backgroundColor: "#4CAF50",
  },
  mediumButtonSelected: { backgroundColor: "#4CAF50" },
  largeButtonSelected: {
    backgroundColor: "#4CAF50",
  },
  SizeText: {
    color: "#ffffff",
    fontFamily: fonts.I_700,
    fontSize: 20,
    fontWeight: "700",
  },

  foodTextWrap: {
    width: "80%",
    height: 59,
    justifyContent: "space-between",
    gap: 50,
    paddingHorizontal: wp("7%"),
    marginBottom: "2%",
    alignItems: "center",
    flexDirection: "row",
  },
  foodText: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 35,
    fontWeight: "700",
    width: "100%",
    marginRight: wp("10%"),
    padding: 10,
    paddingBottom: 15,
  },
  price: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 18,
    fontWeight: "700",
  },
});
