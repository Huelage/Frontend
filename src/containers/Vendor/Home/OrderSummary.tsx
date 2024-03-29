import { OrderChartElement, SummaryElement } from "@components/vendor/Home";
import { FontAwesome } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts, shadowStyle } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OrderSummary = () => {
  const { color } = useAppTheme();
  const summary = [
    { value: 20, label: "In Delivery", iconColor: "#43A97F" },
    { value: 80, label: "Delivered", iconColor: "#5BCF5F" },
    { value: 5, label: "Canceled", iconColor: "#EB493A" }
  ];
  const total = summary.reduce((acc, cur) => acc + cur.value, 0);
  return (
    <View style={styles.container} testID="order summary">
      <View style={styles.header}>
        <Text style={[styles.title, { color: color.mainText }]}>Order Summary</Text>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: color.filterBg }]}>
          <Text style={[styles.filterButtonText, { color: color.mainText }]}>Today</Text>
          <FontAwesome name="angle-down" size={18} color={color.mainText} />
        </TouchableOpacity>
      </View>
      <View style={styles.overviewBox} testID="summary elements">
        {summary.map((item, idx) => (
          <SummaryElement key={idx} value={item.value} label={item.label} iconColor={item.iconColor} />
        ))}
      </View>
      <View style={{ gap: 10 }} testID="chart elements">
        {summary.map((item, idx) => (
          <OrderChartElement key={idx} idx={idx} iconColor={item.iconColor} value={item.value} label={item.label} total={total} />
        ))}
      </View>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    gap: 30
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
    justifyContent: "space-between"
  },
  title: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  filterButton: {
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    ...shadowStyle,
    shadowColor: "rgb(76, 175, 80)"
  },
  filterButtonText: {
    fontFamily: fonts.I_600,
    fontSize: 12
  },
  overviewBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
    justifyContent: "space-between"
  }
});