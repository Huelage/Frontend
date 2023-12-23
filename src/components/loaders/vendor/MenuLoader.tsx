import { useAppTheme } from "@hooks";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const loaderArray = [1, 2, 3, 4, 5, 6, 7, 8];

const MenuLoader = () => {
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
        <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "50%" }]} />
      </View>
      {loaderArray.map((_, idx) => (
        <View key={idx} style={[styles.loaderItem, { backgroundColor: color.loaderBase }]}>
          <View style={[styles.loaderImage, { backgroundColor: color.loaderGray }]} />
          <View style={styles.nameBox}>
            <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "60%" }]} />
            <View style={[styles.midFrame, { backgroundColor: color.loaderGray, width: "90%" }]} />
          </View>
          <View style={styles.buttonBox}>
            <View style={[styles.buttonFrame, { backgroundColor: color.loaderGray }]} />
            <View style={[styles.buttonFrame, { backgroundColor: color.loaderGray }]} />
          </View>
        </View>
      ))}
    </Animated.View>
  );
};

export default MenuLoader;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loaderItem: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    padding: 15,
    width: wp("100%") - 44,
  },
  loaderImage: {
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  leadBox: {
    paddingVertical: 20
  },
  nameBox: {
    flex: 1,
    gap: 10
  },
  buttonBox: {
    gap: 10
  },
  smallFrame: {
    height: 10,
  },
  midFrame: {
    height: 15,
  },
  buttonFrame: {
    borderRadius: 10,
    height: 30,
    width: 30
  }
});