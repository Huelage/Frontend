import food from "@api/mock/mockFoodData";
import { QuantityController } from "@components/core/Cart";
import { CustomBox } from "@components/misc";
import { useAppTheme } from "@hooks";
import { CartInterface } from "@interfaces";
import { fonts } from "@utils";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CartItem = ({ item_id, quantity, extras }: CartInterface) => {
  const { color } = useAppTheme();
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  const item = food.find((item) => item.id === item_id);
  if (!item) return null;
  const price = item.pricingMethod === "PACKAGE" ? item.packageSizes[0].price : item.price;

  const increase = () => setItemQuantity(itemQuantity + 1);
  const decrease = () => { if (itemQuantity > 1) setItemQuantity(itemQuantity - 1); };
  return (
    <View style={styles.container} testID='cart item'>
      <CustomBox width={wp('100%') - 30} height={110} r={20} pad={6} left={-4} />
      <Image source={{ uri: item?.imgUrl }} style={styles.itemImage} testID='cart item image' />
      <View style={styles.detailBox}>
        <Text style={[styles.itemName, { color: color.mainText }]} numberOfLines={1} testID='cart item name'>{item?.name}</Text>
        <Text style={styles.itemExtras} numberOfLines={1} testID='cart item extras'>{extras?.map(item => item.name).join(", ")}</Text>
        <Text style={[styles.itemPrice, { color: color.mainText }]} testID='cart item price'>₦{price}</Text>
      </View>
      <View style={styles.quatityBox}>
        <QuantityController quantity={itemQuantity} increase={increase} decrease={decrease} />
        <Text style={styles.totalPrice} testID='cart item total'>₦{price * quantity}</Text>
      </View>
    </View>
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
    color: "#626262",
    fontFamily: fonts.I_600,
    fontSize: 14,
  },
});
