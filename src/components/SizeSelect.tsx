import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontEnum";
import React, { useState } from "react";

const SizeSelect = () => {
  const [size, setSize] = useState("");

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.smallButton,
          size === "small" && styles.smallButtonSelected,
        ]}
        onPress={() => setSize("small")}
      >
        <Text style={styles.SizeText}>Small</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.mediumButton,
          size === "medium" && styles.mediumButtonSelected,
        ]}
        onPress={() => setSize("medium")}
      >
        <Text style={styles.SizeText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.largeButton,
          size === "large" && styles.largeButtonSelected,
        ]}
        onPress={() => setSize("large")}
      >
        <Text style={styles.SizeText}>Large</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SizeSelect;
const styles = StyleSheet.create({
  button: {
    flex: 0.2,
    height: 50,
    width: "30%",
    marginTop: 10,
    top: "30%",
    marginHorizontal: 10,
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
});
