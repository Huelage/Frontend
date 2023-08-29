import { Feather } from "@expo/vector-icons";
import { fonts, shadowStyle } from "@utils";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ItemAmountCard = () => {
  const [amount, setAmount] = useState<number>(1);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        disabled={amount <= 1}
        style={styles.cardButton}
        onPress={() => setAmount(amount - 1)}
      >
        <Feather name="minus" size={18} color="#F0FFF0" />
      </TouchableWithoutFeedback>
      <Text style={styles.cardText}>{amount}</Text>
      <TouchableWithoutFeedback
        style={styles.cardButton}
        onPress={() => setAmount(amount + 1)}
      >
        <Feather name="plus" size={18} color="#F0FFF0" />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ItemAmountCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F0FFF0",
    borderRadius: 10,
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    ...shadowStyle,
  },
  cardButton: {
    backgroundColor: "#47CA4C",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cardText: {
    fontFamily: fonts.I_600,
    fontSize: 20,
  },
});
