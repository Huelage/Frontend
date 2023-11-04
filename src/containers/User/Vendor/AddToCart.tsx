import { useAppTheme } from "@hooks";
import { itemExtraInterface } from "@interfaces";
import { fonts, numberToCurrency } from "@utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AddToCartInterface {
  price: number;
  extras: itemExtraInterface[];
  quantity: number;
}

const AddToCart = ({ price, extras, quantity }: AddToCartInterface) => {
  const { color } = useAppTheme();
  const totalPrice = price + extras.reduce((acc, curr) => acc + (curr.price * (curr.quantity ?? 1)), 0);
  return (
    <View style={[styles.container, { backgroundColor: color.mainGreen }]} testID="add to cart">
      <Text style={styles.mainText}>Add {quantity} for {numberToCurrency(totalPrice)}</Text>
    </View>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal: 20,
    padding: 15,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0
  },
  mainText: {
    color: "#FFF",
    fontFamily: fonts.I_500,
    fontSize: 20
  }
});