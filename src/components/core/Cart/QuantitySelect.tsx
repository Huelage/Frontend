import { fonts } from "@utils";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
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
        <Text style={styles.price}>N {getPrice()}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
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
    gap: 30,
    marginTop: wp("45%"),
  },
  button: {
    height: 40,
    width: 85,
    margin: 10,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 11,
    justifyContent: "center",
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
    fontSize: 28,
    padding: 2,
    marginRight: "2%",
    marginTop: 10,
  },
  Value: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "700",
    paddingBottom: 5,
    textAlign: "center",
  },
  Arrange: {
    flexDirection: "row",
    padding: 10,
    margin: 0,
    marginLeft: wp("50%"),
    justifyContent: "space-between",
  },
  butt: {
    flex: 0.3,
    height: 50,
    width: "30%",
    marginTop: 10,
    marginHorizontal: 25,
    paddingHorizontal: 20,
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
    height: 40,
    padding: 5,
  },
  mediumButton: {
    backgroundColor: "#616161",
    borderRadius: 20,
    height: 40,
    padding: 5,
  },
  largeButton: {
    backgroundColor: "#616161",
    borderRadius: 20,
    height: 40,
    padding: 5,
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
    width: "100%",
    height: 69,
    justifyContent: "space-between",
    gap: 60,
    paddingHorizontal: wp("20%"),
    marginBottom: "2%",
    alignItems: "center",
    flexDirection: "row",
  },
  foodText: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 60,
    fontWeight: "700",
    width: "100%",
    textAlign: "right",
  },
  price: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 28,
    fontWeight: "700",
  },
});
