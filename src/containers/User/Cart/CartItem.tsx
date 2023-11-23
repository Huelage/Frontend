import { useAppDispatch } from "@api/app/appHooks";
import { GET_PRODUCT } from "@api/graphql";
import { removeFromCart, updateCart } from "@api/slices/globalSlice";
import { useQuery } from "@apollo/client";
import { QuantityController } from "@components/core/Cart";
import { CustomBox, FastImage } from "@components/misc";
import { useAppTheme } from "@hooks";
import { OrderItemInterface, UserFoodInterface } from "@interfaces";
import { fonts, numberToCurrency } from "@utils";
import React, { memo, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp, SlideOutLeft } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CartItem = ({ id, item_id, quantity, totalPrice, size, extras }: OrderItemInterface) => {
  const { data, loading } = useQuery(GET_PRODUCT, { variables: { productId: item_id } })
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<UserFoodInterface>()
  const fullPrice = totalPrice * quantity;
  const price = useMemo(() => {
    return item?.pricingMethod === "PACKAGE" ? item.packageSizes.find(pack => pack.name === size)?.price as number : item?.price
  }, [item, size])

  const increase = () => dispatch(updateCart({ id, quantity: quantity + 1 }));
  const decrease = () => {
    if (quantity > 1) dispatch(updateCart({ id, quantity: quantity - 1 }));
    else dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (data) {
      const item = data.getProduct;
      setItem({
        id: item.productId, name: item.name, description: item.description,
        imgUrl: item.imgUrl, category: item.food.category, isFavourite: false,
        availability: item.food.availability, pricingMethod: item.food.pricingMethod,
        preparationTime: item.food.preparationTime, packageSizes: item.food.packageSizes,
        price: item.food.price, sides: item.food.sides
      });
    }
  }, [data])
  return (
    <Animated.View
      entering={FadeInUp.delay(200)}
      exiting={SlideOutLeft.duration(300)}
      style={styles.container}
      testID="cart item"
    >
      <CustomBox width={wp("100%") - 30} height={110} r={20} pad={6} left={-4} />
      <FastImage src={item?.imgUrl!} style={styles.itemImage} testId="cart item image" />
      <View style={styles.detailBox}>
        <Text style={[styles.itemName, { color: color.mainText }]} numberOfLines={1} testID="cart item name">{item?.name}</Text>
        <Text style={[styles.itemExtras, { color: color.mainTextDim }]} numberOfLines={1} testID="cart item extras">{extras?.map(item => item.name).join(", ")}</Text>
        <Text style={[styles.itemPrice, { color: color.mainText }]} testID="cart item price">{numberToCurrency(price ?? 0)}</Text>
      </View>
      <View style={styles.quatityBox}>
        <QuantityController quantity={quantity} increase={increase} decrease={decrease} />
        <Text style={[styles.totalPrice, { color: color.mainTextDim }]} testID="cart item total">{numberToCurrency(fullPrice)}</Text>
      </View>
    </Animated.View>
  );
};

export default memo(CartItem);

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
