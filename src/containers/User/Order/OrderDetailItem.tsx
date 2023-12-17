import { CustomBox } from "@components/misc";
import { useAppTheme } from "@hooks";
import { OrderItemInterface } from "@interfaces";
import { fonts, numberToCurrency } from "@utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const OrderDetailItem = ({ quantity, extras, totalPrice, item_name }: OrderItemInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container} testID="order detail item">
      <CustomBox width={wp("100%") - 30} height={100} r={20} pad={6} left={-4} />
      <Text style={[styles.itemQuantity, { color: color.mainText }]} testID="order item quantity">x{quantity}</Text>
      <View style={styles.detailBox}>
        <Text style={[styles.itemName, { color: color.mainText }]} numberOfLines={1} testID="order item name">{item_name}</Text>
        <Text style={[styles.itemExtras, { color: color.mainTextDim }]} numberOfLines={1} testID="order item extras">{extras?.map(item => item.name).join(", ")}</Text>
      </View>
      <Text style={[styles.totalPrice, { color: color.mainText }]} testID="order item total">{numberToCurrency(totalPrice * quantity)}</Text>
    </View>
  );
};

export default OrderDetailItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    padding: 20
  },
  itemQuantity: {
    fontFamily: fonts.I_700,
    fontSize: 20,
  },
  detailBox: {
    flex: 1,
    gap: 8,
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 20,
  },
  itemExtras: {
    fontFamily: fonts.I_400I,
    fontSize: 14,
    letterSpacing: .7
  },
  itemPrice: {
    fontFamily: fonts.I_600,
    fontSize: 15,
  },
  quatityBox: {
    alignItems: "center",
    gap: 10,
  },
  totalPrice: {
    color: "#626262",
    fontFamily: fonts.I_700,
    fontSize: 16,
    paddingTop: 5
  }
});