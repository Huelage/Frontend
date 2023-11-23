import { useAppDispatch } from "@api/app/appHooks";
import { mockFoods } from "@api/mock";
import { addItemToCart } from "@api/slices/globalSlice";
import { useAppTheme } from "@hooks";
import { OrderItemInterface, UserFoodInterface, UserVendorTabProps, extraInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, numberToCurrency, showError } from "@utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";

interface AddToCartInterface {
  amount: number;
  extras: extraInterface[];
  item?: UserFoodInterface;
  price: number;
  vendorId: string;
  quantity: number;
  size?: string;
}

const AddToCart = ({ amount, price, item, extras, vendorId, quantity, size }: AddToCartInterface) => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation<UserVendorTabProps>();

  let totalPrice = 0;
  if (item?.pricingMethod === "PACKAGE")
    totalPrice += item.packageSizes.find(pack => pack.name === size)?.price ?? 0;
  else if (item?.pricingMethod === "PRICE")
    totalPrice += amount;
  else
    totalPrice += price * amount;
  totalPrice += extras.reduce((acc, curr) => acc + (curr.price * (curr.quantity ?? 1)), 0);

  const addToCart = () => {
    const cartItem: OrderItemInterface = {
      id: uuid.v4().toString(), item_id: item?.id as string,
      quantity, totalPrice, vendorId, extras
    };
    if (size) cartItem.size = size;
    if (item?.pricingMethod === "PORTION") cartItem.portion = amount;
    if (item?.pricingMethod === "PRICE") cartItem.price = amount;
    const requiredSides = item?.sides?.filter(side => side.isRequired).map(side => side.id) ?? [];
    const extraGroups = extras.map(extra => extra.groupId);
    if (!requiredSides?.every(side => extraGroups.includes(side))) {
      showError("Please select all required sides");
    } else if (item?.pricingMethod === "PRICE" && amount < item.price) {
      showError(`The minimum price for this item is ${numberToCurrency(item.price)}`);
    } else {
      dispatch(addItemToCart(cartItem));
      goBack();
    }
  };
  return (
    <TouchableOpacity onPress={addToCart} style={[styles.container, { backgroundColor: color.mainGreen }]} testID="add to cart">
      <Text style={styles.mainText}>Add {quantity} for {numberToCurrency(totalPrice * quantity)}</Text>
    </TouchableOpacity>
  );
};
export default AddToCart;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal: 20,
    padding: 15,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0
  },
  mainText: {
    color: "#FFF",
    fontFamily: fonts.I_500,
    fontSize: 20
  }
});