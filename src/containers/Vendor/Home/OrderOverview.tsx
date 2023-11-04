import { StatElement } from "@components/vendor/Home";
import { TotalCustomers, TotalMenu, TotalOrders, fonts } from "@utils";
import React from "react";
import { StyleSheet, View } from "react-native";

const OrderOverview = () => {
  const statData = [
    { value: 600, title: "Total Menu", Icon: TotalMenu },
    { value: 3000, title: "Total Orders", Icon: TotalOrders },
    { value: 10000, title: "Total Customers", Icon: TotalCustomers }
  ];
  return (
    <View style={styles.container} testID="order overview">
      {statData.map((item, idx) => (
        <StatElement key={idx} {...item} />
      ))}
    </View>
  );
};

export default OrderOverview;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center"
  },
  statBoxText: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  statElement: {
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.I_300,
    fontSize: 12,
    letterSpacing: 1,
    textAlign: "center"
  }
});