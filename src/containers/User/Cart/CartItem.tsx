import { useAppDispatch } from "@api/app/appHooks";
import { mockFoods } from "@api/mock";
import { removeFromCart, updateCart } from "@api/slices/globalSlice";
import { QuantityController } from "@components/core/Cart";
import { CustomBox } from "@components/misc";
import { useAppTheme } from "@hooks";
import { OrderItemInterface } from "@interfaces";
import { fonts, numberToCurrency } from "@utils";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp, SlideOutLeft } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CartItem = ({ id, item_id, quantity, totalPrice, size, extras }: OrderItemInterface) => {
  const item = mockFoods.find((item) => item.id === item_id);
  if (!item) return null;
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const price = item.pricingMethod === "PACKAGE" ? item.packageSizes.find(sizes => sizes.name === size)?.price as number : item.price;
  const fullPrice = totalPrice * quantity;

  const increase = () => {
    dispatch(updateCart({ id, quantity: quantity + 1 }));
  };
  const decrease = () => {
    if (quantity > 1)
      dispatch(updateCart({ id, quantity: quantity - 1 }));
    else
      dispatch(removeFromCart(id));
  };
  return (
    <Animated.View
      entering={FadeInUp.delay(200)}
      exiting={SlideOutLeft.duration(300)}
      style={styles.container}
      testID="cart item"
    >
      <CustomBox width={wp("100%") - 30} height={110} r={20} pad={6} left={-4} />
      <Image source={{ uri: item?.imgUrl }} style={styles.itemImage} testID="cart item image" />
      <View style={styles.detailBox}>
        <Text style={[styles.itemName, { color: color.mainText }]} numberOfLines={1} testID="cart item name">{item.name}</Text>
        <Text style={[styles.itemExtras, { color: color.mainTextDim }]} numberOfLines={1} testID="cart item extras">{extras?.map(item => item.name).join(", ")}</Text>
        <Text style={[styles.itemPrice, { color: color.mainText }]} testID="cart item price">{numberToCurrency(price)}</Text>
      </View>
      <View style={styles.quatityBox}>
        <QuantityController quantity={quantity} increase={increase} decrease={decrease} />
        <Text style={[styles.totalPrice, { color: color.mainTextDim }]} testID="cart item total">{numberToCurrency(fullPrice)}</Text>
      </View>
    </Animated.View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemImage: {
    borderRadius: 40,
    height: 80,
    width: 80
  },
  detailBox: {
    flex: 1,
    gap: 1,
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 16,
  },
  itemExtras: {
    color: "#626262",
    fontFamily: fonts.I_400,
    fontSize: 14,
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
    fontFamily: fonts.I_600,
    fontSize: 14,
  },
});
