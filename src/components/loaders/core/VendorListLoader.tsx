import { useAppTheme } from "@hooks";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const loaderArray = [1, 2, 3, 4, 5, 6, 7, 8];

const VendorListLoader = () => {
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
      {loaderArray.map((_, idx) => (
        <View key={idx} style={[styles.loaderItem, { backgroundColor: color.loaderBase }]}>
          <View style={[styles.loaderImage, { backgroundColor: color.loaderGray }]} />
          <View style={styles.loaderFrames}>
            <View style={[styles.loaderFrame, { backgroundColor: color.loaderGray, width: "70%" }]} />
            <View style={[styles.loaderFrame, { backgroundColor: color.loaderGray }]} />
          </View>
          <View style={[styles.loaderButton, { backgroundColor: color.loaderGray }]} />
        </View>
      ))}
    </Animated.View>
  );
};

export default VendorListLoader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loaderItem: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: wp("100%") - 44,
  },
  loaderImage: {
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  loaderFrames: {
    flex: 1,
    gap: 10,
  },
  loaderFrame: {
    height: 10,
  },
  loaderButton: {
    borderRadius: 10,
    height: 30,
    width: 80,
  }
});