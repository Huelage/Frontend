import { CustomBox } from "@components/misc";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { OrderInterface } from "@interfaces";
import { fonts } from "@utils";
import dayjs from "dayjs";
import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp, SlideOutLeft } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface OrderElementInterface {
  order: OrderInterface;
}

const OrderElement = ({ order: { status, updatedAt } }: OrderElementInterface) => {
  const { color } = useAppTheme();
  const [height, setHeight] = useState<number>(0);

  const handleOnLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  };
  return (
    <Animated.View
      entering={FadeInUp.delay(200)}
      exiting={SlideOutLeft.duration(300)}
      style={styles.container}
      onLayout={handleOnLayout}
      testID="order element"
    >
      <CustomBox bgColor={status === "CANCELLED" ? color.redBg : color.cardBg2} shadowColor={status === "CANCELLED" ? color.redShadow : undefined} width={wp("100%") - 40} height={height + 8} r={20} pad={6} />
      <View style={[styles.headerBox]} testID="header box">
        <Text style={[styles.statusBox, { color: status === "CANCELLED" ? color.danger : color.mainGreen, borderColor: status === "CANCELLED" ? color.danger : color.mainGreen }]}>{status}</Text>
        <Text style={[styles.headerDateText, { color: color.mainText }]}>{dayjs(updatedAt).format("D MMM, YYYY | hh:mma")}</Text>
      </View>
      <View style={[styles.orderItems]} testID="order items">
        <Ionicons name="md-arrow-redo-outline" size={24} color={status === "CANCELLED" ? color.danger : color.mainGreen} style={{ alignSelf: "flex-start" }} />
        <Text style={[styles.orderItemsText, { color: color.mainText }]}>Yamarita, Indomie, White Rice, Chicken and Chips, Egusi soup, Oha soup</Text>
      </View>
    </Animated.View>
  );
};

export default OrderElement;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 20,
    paddingRight: 25
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between"
  },
  statusBox: {
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: fonts.I_400,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  headerDateText: {
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  orderItems: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  orderItemsText: {
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 12
  },
  callToAction: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between"
  },
  buttonBox: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    padding: 5
  },
  buttonText: {
    fontFamily: fonts.I_600,
    fontSize: 14
  }
});