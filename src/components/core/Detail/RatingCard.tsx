import { Ionicons } from "@expo/vector-icons";
import { fonts } from "@utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RatingCard = ({ rating }: { rating: number; }) => {
  return (
    <View style={styles.itemRateBox} testID="rating card">
      <Ionicons name="star" size={18} color="#FFC107" />
      <Text style={styles.itemRating}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default RatingCard;

const styles = StyleSheet.create({
  itemRateBox: {
    alignItems: "center",
    backgroundColor: "#47CA4C",
    borderRadius: 20,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 15
  },
  itemRating: {
    color: "#fff",
    fontFamily: fonts.I_700,
    fontSize: 16
  },
});