import { useAppSelector } from "@api/app/appHooks";
import { mockFoods } from "@api/mock";
import { getCart } from "@api/slices/globalSlice";
import { QuantityController } from "@components/core/Cart";
import { CustomButton } from "@components/core/Home";
import { CustomImage } from "@components/misc";
import { AddToCart, ItemSideElement } from "@containers/User";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserTabProps, UserVendorsTabItemDetailRouteProps, extraInterface } from "@interfaces";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fonts, numberToCurrency, priceMethod } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ItemDetailScreen = () => {
  const { params: { itemId, vendorId } } = useRoute<UserVendorsTabItemDetailRouteProps>();
  const item = mockFoods.find(food => food.id === itemId);
  if (!item) return null;
  const { color } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation<UserTabProps>();
  const cartItems = useAppSelector(getCart);
  const [packSize, setPackSize] = useState<string | undefined>(item.pricingMethod === "PACKAGE" ? item.packageSizes[0].name : undefined);
  const [extras, setExtras] = useState<extraInterface[]>([]);
  const price = item.pricingMethod === "PACKAGE" ? item.packageSizes.find(pack => pack.name === packSize)?.price as number : item.price;
  const [amount, setAmount] = useState<number>(item.pricingMethod === "PRICE" ? price : 1);
  const [quantity, setQuantity] = useState<number>(1);
  const itemInCart = useMemo(() => cartItems.filter(item => (item.item_id === itemId) && (item.vendorId === vendorId))[0], [cartItems]);

  const increaseAmount = () => setAmount(amount + 1);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseAmount = () => (amount > 1) && setAmount(amount - 1);
  const decreaseQuantity = () => (quantity > 1) && setQuantity(quantity - 1);

  useEffect(() => {
    if (!!itemInCart) {
      setQuantity(itemInCart.quantity);
      if (itemInCart.price) setAmount(itemInCart.price);
      if (itemInCart.portion) setAmount(itemInCart.portion);
      if (itemInCart.size) setPackSize(itemInCart.size);
      if (itemInCart.extras) setExtras(itemInCart.extras as extraInterface[]);
    }
  }, []);
  return (
    <>
      <TouchableOpacity style={[styles.backButton, { backgroundColor: color.mainGreen, top }]} onPress={goBack} testID="go back">
        <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} style={{ left: -1 }} />
      </TouchableOpacity>
      <ScrollView style={[styles.container, { backgroundColor: color.mainBg }]} testID="item detail screen">
        <View style={[styles.itemHeader, { backgroundColor: color.mainGreen, paddingTop: top }]} testID="item image">
          <CustomImage imgUrl={item.imgUrl} imgSize={wp("60%")} imgPad={0} style={[styles.itemImage, { top: top + 10 }]} shadowBlur={8} shadowHeight={10} shadowColor="rgba(76, 175, 80, 0.4)" />
        </View>
        <View style={styles.itemBody}>
          <View style={styles.itemInfo} testID="item info">
            <Text style={[styles.itemName, { color: color.mainText }]}>{item.name}</Text>
            <Text style={[styles.itemPrice, { color: color.mainText }]}>{numberToCurrency(price)} <Text style={{ color: color.mainGreen }}>{priceMethod(item.pricingMethod, packSize)}</Text></Text>
            <Text style={[styles.itemDesc, { color: color.mainTextDim }]}>{item.description}</Text>
            {item.pricingMethod === "PACKAGE" ? (
              <FlatList
                data={item.packageSizes}
                horizontal
                keyExtractor={pack => pack.name}
                renderItem={({ item }) => (
                  <CustomButton fontSize={14} label={item.name} height={30} inactive={item.name !== packSize} onPress={() => setPackSize(item.name)} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.packageSizeList}
                testID="package size list"
              />
            ) : null}
          </View>
          {["PRICE", "PORTION"].includes(item.pricingMethod) ? (
            <View style={styles.amountBox} testID="amount box">
              <Text style={[styles.itemAmount, { color: color.mainText }]}>{item.pricingMethod}:</Text>
              {item.pricingMethod === "PRICE" ? (
                <TextInput
                  style={[styles.amountInput, { color: color.searchText }]}
                  placeholder={amount.toString()}
                  onChangeText={val => setAmount(parseInt(val))}
                  placeholderTextColor={color.searchText}
                  selectionColor={color.mainGreen}
                />
              ) : (
                <QuantityController quantity={amount} increase={increaseAmount} decrease={decreaseAmount} />
              )}
            </View>
          ) : null}
          {!!item.sides ? (
            <FlatList
              contentContainerStyle={styles.sidesList}
              data={item.sides}
              scrollEnabled={false}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => <ItemSideElement {...item} extras={extras} setExtras={setExtras} />}
              testID="item side list"
            />
          ) : null}
          <View style={styles.quantityBox} testID="quantity box">
            <TouchableOpacity disabled={quantity <= 1} onPress={decreaseQuantity} style={[styles.quantityButton, { borderColor: quantity <= 1 ? color.mainGreenOpaque : color.mainGreen }]} testID="decrease quantity button">
              <AntDesign name="minus" size={20} color={quantity <= 1 ? color.mainGreenOpaque : color.mainGreen} />
            </TouchableOpacity>
            <Text style={[styles.quantityText, { color: color.mainText }]} testID="quantity value text">{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={[styles.quantityButton, { borderColor: color.mainGreen }]} testID="increase quantity button">
              <AntDesign name="plus" size={20} color={color.mainGreen} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AddToCart amount={amount} itemId={itemId} quantity={quantity} vendorId={vendorId} price={price} extras={extras} size={packSize} />
    </>
  );
};

export default ItemDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemHeader: {
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: hp("22%"),
    justifyContent: "center",
  },
  backButton: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    width: 40,
    zIndex: 9999
  },
  itemImage: {
    flex: 1,
    height: wp("60%"),
    position: "absolute",
    width: wp("60%"),
    borderRadius: wp("30%")
  },
  itemBody: {
    gap: 30,
    paddingBottom: 90
  },
  itemInfo: {
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: wp("30%")
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 28
  },
  itemDesc: {
    fontFamily: fonts.I_600I,
    fontSize: 14,
    textAlign: "center"
  },
  itemPrice: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    textTransform: "capitalize"
  },
  packageSizeList: {
    gap: 20,
    paddingTop: 10
  },
  sidesList: {
    gap: 30
  },
  amountBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  itemAmount: {
    fontFamily: fonts.I_600,
    fontSize: 18,
    textTransform: "capitalize"
  },
  amountInput: {
    alignItems: "center",
    borderBottomWidth: 2,
    fontFamily: fonts.I_600,
    justifyContent: "center",
    paddingBottom: 3,
    paddingHorizontal: 10
  },
  quantityBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center"
  },
  quantityButton: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  quantityText: {
    fontFamily: fonts.I_600,
    fontSize: 18
  }
});
