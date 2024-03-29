import { OverviewBox, PromoBox } from "@components/core/Cart";
import React from "react";
import { StyleSheet, View } from "react-native";

const CartOverview = () => {
  const totals = [
    { name: "Subtotal", amount: 7800 },
    { name: "Delivery", amount: 1000 },
    { name: "Total", amount: 8800 }
  ];
  const handleApply = (code: string) => {
    console.log(code);
  };
  const checkout = () => {
    console.log("Checkout");
  };
  return (
    <View style={styles.container} testID="cart overview">
      <PromoBox handleApply={handleApply} />
      <OverviewBox totals={totals} checkout={checkout} />
    </View>
  );
};

export default CartOverview;

const styles = StyleSheet.create({
  container: {
    gap: 20
  }
});
