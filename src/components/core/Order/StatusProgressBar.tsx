import { useAppTheme } from "@hooks";
import { OrderStatus } from "@interfaces";
import { orderStatRank } from "@utils";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface StatusProgressBarInterface {
  status: OrderStatus;
}
const BREAKPOINTS = Array(6).fill(0).map((_, i) => i);

const StatusProgressBar = ({ status }: StatusProgressBarInterface) => {
  const { color } = useAppTheme();
  const progress = useSharedValue(0);
  const animatedWidth = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  useEffect(() => {
    progress.value = withTiming(orderStatRank[status] * 20, { duration: 1000 });
  }, [status]);
  return (
    <View style={[styles.bar, { backgroundColor: color.mainGreenOpaque }]} testID="status progress bar">
      {BREAKPOINTS.map(point => (
        <View key={point} style={[styles.breakPoint, { borderColor: color.mainGreen }]} testID="status point">
          {(point <= orderStatRank[status]) ? <View style={[styles.breakPointFill, { backgroundColor: color.mainGreen }]} /> : null}
        </View>
      ))}
      <Animated.View style={[styles.progressTracker, animatedWidth, { backgroundColor: color.mainGreen }]} testID="status bar" />
    </View>
  );
};

export default React.memo(StatusProgressBar);

const styles = StyleSheet.create({
  bar: {
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 10,
    width: "100%"
  },
  breakPoint: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 2,
    height: 16,
    justifyContent: "center",
    top: -3,
    width: 16,
    zIndex: 2
  },
  breakPointFill: {
    borderRadius: 4,
    height: 8,
    width: 8
  },
  progressTracker: {
    borderRadius: 6,
    position: "absolute",
    top: 0,
    left: 0,
    height: 10,
    zIndex: 1,
  }
});