import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";

interface ChartProps {
  value: number;
  iconColor: string;
  label: string;
  total: number;
  idx: number;
}

const OrderChartElement = ({ iconColor, idx, label, total, value }: ChartProps) => {
  const { color } = useAppTheme();
  const widthVal = useSharedValue(0);
  const percentage = Math.floor((value / total) * 100);
  const animatedWidth = useAnimatedStyle(() => ({
    width: `${widthVal.value}%`
  }));
  useEffect(() => {
    widthVal.value = withDelay(500 * (idx + 1), withSpring(percentage, {
      mass: 1.7,
      damping: 11,
      stiffness: 83,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    }));
  }, [value]);
  return (
    <View style={styles.container} testID="order chart element">
      <View testID="chart bar" style={styles.barChartContainer}>
        <View style={[styles.barChartBg, { backgroundColor: color.chartBg }]} />
        <Animated.View testID="bar progress" style={[styles.barChart, animatedWidth, { backgroundColor: iconColor }]} />
      </View>
      <View style={styles.barChartLabel}>
        <Text style={[styles.barChartValue, { color: color.mainText }]}>{percentage}%</Text>
        <Text style={[styles.barChartLabelText, { color: color.mainText }]}>{label}</Text>
      </View>
    </View>
  );
};

export default OrderChartElement;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    justifyContent: "center"
  },
  barChartContainer: {
    flex: 7
  },
  barChartBg: {
    backgroundColor: "#fff",
    borderRadius: 4,
    width: "100%",
    height: 5
  },
  barChart: {
    borderRadius: 4,
    height: 5,
    position: "absolute"
  },
  barChartLabel: {
    alignItems: "center",
    flex: 3,
    flexDirection: "row",
    gap: 8
  },
  barChartLabelText: {
    fontFamily: fonts.I_300,
    fontSize: 12
  },
  barChartValue: {
    fontFamily: fonts.I_600,
    fontSize: 14
  },
});