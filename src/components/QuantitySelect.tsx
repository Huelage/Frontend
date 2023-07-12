import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontEnum";
import React, { useState } from "react";

const QuantitySelect = () => {
  const [count, setCount] = useState(1);

  return (
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
  );
};

export default QuantitySelect;
const styles = StyleSheet.create({
  button: {
    flex: 0.11,
    height: 40,
    width: 85,
    margin: 14,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 11,
    left: "330%",
    top: "19%",
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
    top: "21%",
    left: "158%",
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
});
