import { CustomBox } from "@components/misc";
import { FontAwesome } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface FAQElementInterface {
  isActive: boolean;
  question: string;
  answer: string;
}

const FAQElement = ({ isActive, question, answer }: FAQElementInterface) => {
  const { color } = useAppTheme();
  const progress = useSharedValue(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [bodyHeight, setBodyHeight] = useState<number>(0);

  const animatedIcon = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }]
  }));
  const animatedHeight = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [headerHeight + 8, headerHeight + bodyHeight + 8])
  }));
  const handleHeaderLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);
  const handleBodyLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setBodyHeight(height);
  }, []);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 500 });
  }, [isActive]);
  return (
    <Animated.View style={[styles.container, animatedHeight]}>
      <View style={styles.header} onLayout={handleHeaderLayout}>
        <CustomBox bgColor={isActive ? color.cardBg : color.cardBg2} width={wp("100%") - 28} height={headerHeight + 10} r={10} pad={6} left={-4} />
        <Text style={[styles.headerText, { color: color.mainText }]}>{question}</Text>
        <Animated.View style={animatedIcon}>
          <FontAwesome name="angle-up" size={22} color={color.mainText} />
        </Animated.View>
      </View>
      <View style={[styles.body, { backgroundColor: color.cardBg2 }]} onLayout={handleBodyLayout}>
        <Text style={[styles.bodyText, { color: color.mainText }]}>{answer}</Text>
      </View>
    </Animated.View>
  );
};

export default FAQElement;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    overflow: "hidden"
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 20
  },
  headerText: {
    fontFamily: fonts.I_600,
    fontSize: 16
  },
  body: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  bodyText: {
    fontFamily: fonts.I_300,
  }
});