import { StatusProgressBar } from "@components/core/Order";
import { CustomBox } from "@components/misc";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { OrderInterface } from "@interfaces";
import { fonts, numberToCurrency, orderStatInfo } from "@utils";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp, SlideOutLeft } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const OrderSummaryElement = ({ vendorName, orderedAt, updatedAt, status, totalAmount }: OrderInterface) => {
  const { color } = useAppTheme();
  const [height, setHeight] = useState<number>(105);
  const [isBarVisible, setIsBarVisible] = useState<boolean>(true);

  useEffect(() => {
    if (status === "COMPLETED") setIsBarVisible(false);
  }, []);
  useEffect(() => {
    if (status === "CANCELLED") setIsBarVisible(false);
  }, [status]);
  useEffect(() => {
    setHeight(isBarVisible ? 230 : 105);
  }, [isBarVisible]);
  return (
    <Animated.View
      entering={FadeInUp.delay(200)}
      exiting={SlideOutLeft.duration(300)}
      style={styles.container}
      testID="order summary element"
    >
      <CustomBox bgColor={status === "CANCELLED" ? color.redBg : color.cardBg2} shadowColor={status === "CANCELLED" ? color.redShadow : undefined} height={height} r={10} pad={6} width={wp("100%") - 30} left={-4} />
      {isBarVisible ? <Text style={[styles.estimateText, { color: color.accentText }]}>The estimated time for this order is 1 hour</Text> : null}
      <View style={styles.detailBox}>
        <View style={styles.detailHeader}>
          <Text style={[styles.resName, { color: status === "CANCELLED" ? color.danger : color.mainText }]}>{vendorName}</Text>
          <Text style={[styles.subTotal, { color: status === "CANCELLED" ? color.danger : color.mainText }]}>{numberToCurrency(totalAmount)}</Text>
        </View>
        <View style={styles.detailHeader}>
          <Text style={[styles.orderedAt, { color: isBarVisible ? color.accentText : status === "CANCELLED" ? color.danger : color.mainGreen }]} testID="formatted date">{dayjs(orderedAt).format("D MMM, YYYY | hh:mma")}</Text>
          {!isBarVisible ? (
            <View style={styles.orderResolved}>
              <Text style={[styles.orderStatInfo, { color: status === "CANCELLED" ? color.danger : color.mainGreen }]}>Order {status.toLowerCase()}</Text>
              <MaterialIcons name="navigate-next" size={24} color={status === "CANCELLED" ? color.danger : color.mainGreen} />
            </View>
          ) : null}
        </View>
      </View>
      {isBarVisible ? (
        <>
          <View style={styles.barBox}>
            <StatusProgressBar status={status} />
            <Text style={[styles.barBoxText, { color: color.mainGreen }]}>{status}</Text>
          </View>
          <View style={styles.detailHeader}>
            <Text style={[styles.orderStatTime, { color: color.mainText }]} testID="order info text">
              {dayjs(updatedAt).format("hh:mma")} -
              <Text style={[styles.orderStatInfo, { color: color.accentText }]}> {orderStatInfo[status]}</Text>
            </Text>
            <MaterialIcons name="navigate-next" size={24} color={color.mainGreen} />
          </View>
        </>
      ) : null}
    </Animated.View>
  );
};

export default OrderSummaryElement;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20
  },
  estimateText: {
    fontFamily: fonts.I_400,
    fontSize: 12
  },
  detailBox: {
    gap: 10
  },
  detailHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between"
  },
  resName: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  subTotal: {
    fontFamily: fonts.I_600,
    fontSize: 18
  },
  orderedAt: {
    fontFamily: fonts.I_500,
    fontSize: 15,
  },
  barBox: {
    gap: 8
  },
  barBoxText: {
    fontFamily: fonts.I_600,
    fontSize: 12,
    textAlign: "right"
  },
  orderStatTime: {
    fontFamily: fonts.I_500,
    fontSize: 12
  },
  orderStatInfo: {
    fontFamily: fonts.I_500I
  },
  orderResolved: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  }
});
