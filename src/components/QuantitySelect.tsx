import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontEnum";
import React, { useState } from "react";

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
    <View>
      <View style={styles.Arrange}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={() => setCount(count > 1 ? count - 1 : count)}
        >
          <Text style={styles.Value}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.Value}>+</Text>
        </TouchableOpacity>

        <Text style={styles.Count}>{count}</Text>
        <Text>{count > 1}</Text>
        <Text>{count > 0}</Text>
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
      <View style={styles.log}>
        <Text style={styles.ppe}>Shrimp Soup</Text>
        <Text style={styles.pre}> N {getPrice()}</Text>
      </View>
    </View>
  );
};

export default QuantitySelect;
const styles = StyleSheet.create({
  button: {
    flex: 0.1,
    height: 40,
    width: 85,
    margin: 10,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 11,
    left: "500%",
    top: "27%",
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
    top: "30%",
    left: "175%",
    padding: 1,
    marginRight: "2%",
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
    position: "relative",
    justifyContent: "space-between",
    top: "5%",
    right: "2%",
  },
  butt: {
    flex: 0.3,
    height: 50,
    width: "30%",
    marginTop: 10,
    top: "60%",
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
    left: 0,
  },

  log: {
    width: "100%",
    height: 69,
    paddingHorizontal: 100,
    marginBottom: "2%",
    top: "55%",
    position: "relative",
    display: "flex",
    flex: 0,
    alignItems: "stretch",
    right: "15%",
  },
  ppe: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 60,
    fontWeight: "700",
    width: "100%",
    top: 0,
    right: "5%",
  },
  pre: {
    color: "#000000",
    fontFamily: fonts.I_700,
    fontSize: 28,
    fontWeight: "700",
    bottom: "60%",
    left: "85%",
    top: -50,
  },
});
