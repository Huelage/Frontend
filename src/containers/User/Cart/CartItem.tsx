import food from '@api/mock/mockFoodData';
import { QuantityController } from '@components/core/Cart';
import { useAppTheme } from '@hooks';
import { CartInterface } from '@interfaces';
import { fonts } from '@utils';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CartItem = ({ item_id, quantity, extras }: CartInterface) => {
  const { color } = useAppTheme();
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  const item = food.find((item) => item.id === item_id);
  if (!item) return null;
  return (
    <View style={[styles.container, { backgroundColor: color.cardBg }]}>
      <Image source={{ uri: item?.imgUrl }} style={styles.itemImage} />
      <View style={styles.detailBox}>
        <Text style={[styles.itemName, { color: color.mainText }]} numberOfLines={1}>{item?.name}</Text>
        <Text style={styles.itemExtras} numberOfLines={1}>{extras?.map(item => item.name).join(", ")}</Text>
        <Text style={[styles.itemPrice, { color: color.mainText }]}>₦{item?.price}</Text>
      </View>
      <View style={styles.quatityBox}>
        <QuantityController quantity={itemQuantity} setQuantity={setItemQuantity} />
        <Text style={styles.totalPrice}>₦{item.price * quantity}</Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  itemImage: {
    borderRadius: 40,
    height: 80,
    width: 80
  },
  detailBox: {
    flex: 1,
    gap: 1
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 16
  },
  itemExtras: {
    color: "#626262",
    fontFamily: fonts.I_400,
    fontSize: 14
  },
  itemPrice: {
    fontFamily: fonts.I_600,
    fontSize: 15
  },
  quatityBox: {
    alignItems: 'center',
    gap: 10
  },
  totalPrice: {
    color: "#626262",
    fontFamily: fonts.I_600,
    fontSize: 14
  }
});