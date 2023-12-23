import { useAppTheme } from "@hooks";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const loaderArray = [1, 2, 3, 4, 5, 6, 7, 8];

const OrderLoader = () => {
  const progress = useSharedValue(0.4);
  const { color } = useAppTheme();

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: progress.value
  }));

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), 0, true);
  }, []);
  return (
    <Animated.View style={[styles.container, animatedOpacity]}>
      <View style={styles.leadBox}>
        <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "60%" }]} />
        <View style={[styles.largeFrame, { backgroundColor: color.loaderGray, width: "20%" }]} />
      </View>
      <View style={[styles.loaderItem, { backgroundColor: color.loaderBase }]}>
        <View style={[styles.smallFrame, { backgroundColor: color.loaderGray, width: "50%" }]} />
        <View style={styles.nameBox}>
          <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "40%" }]} />
          <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "25%" }]} />
        </View>
        <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "65%" }]} />
        <View style={[styles.largeFrame, { backgroundColor: color.loaderGray }]} />
        <View style={[styles.smallFrame, { backgroundColor: color.loaderGray, width: "70%" }]} />
      </View>
      {loaderArray.map((_, idx) => (
        <View key={idx} style={[styles.loaderItem, { backgroundColor: color.loaderBase }]}>
          <View style={styles.nameBox}>
            <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "40%" }]} />
            <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "25%" }]} />
          </View>
          <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "65%" }]} />
        </View>
      ))}
    </Animated.View>
  );
};

export default OrderLoader;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loaderItem: {
    borderRadius: 20,
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: wp("100%") - 44,
  },
  leadBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    paddingBottom: 10
  },
  nameBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 50,
    justifyContent: "space-between"
  },
  smallFrame: {
    height: 10,
  },
  midFrame: {
    height: 15,
  },
  largeFrame: {
    height: 25,
  }
});