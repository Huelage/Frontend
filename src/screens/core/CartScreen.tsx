import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { CREATE_ORDER, GET_MANY_VENDORS } from "@api/graphql";
import { clearCart, getCart } from "@api/slices/globalSlice";
import { useMutation, useQuery } from "@apollo/client";
import { FastImage, ScreenHeader } from "@components/misc";
import { CartItem } from "@containers/User";
import { useAppTheme } from "@hooks";
import { OrderItemInterface, UserTabProps, VendorInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, numberToCurrency, shadowStyle } from "@utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CartScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { goBack, navigate } = useNavigation<UserTabProps>();
  const cartItems = useAppSelector(getCart);
  const vendorIds = [... new Set(cartItems.map(item => item.vendorId))];
  const { data } = useQuery(GET_MANY_VENDORS, { variables: { vendorIds } });
  const [create_order, { data: order, loading }] = useMutation(CREATE_ORDER);
  const [currVendor, setCurrVendor] = useState<string>(vendorIds[0]);
  const [vendors, setVendors] = useState<VendorInterface[]>([]);
  const [vendorCartItem, setVendorCartItem] = useState<OrderItemInterface[]>([]);
  const subtotal = useMemo(() => vendorCartItem.reduce((acc, curr) => acc + curr.totalPrice * curr.quantity, 0), [vendorCartItem]);

  const renderVendorCartItems = useCallback(({ item }: { item: VendorInterface; }) => (
    <TouchableOpacity onPress={() => setCurrVendor(item.id)} style={[styles.vendorCartItem, { borderColor: item.id === currVendor ? color.mainGreen : "transparent" }]} testID="vendor cart item">
      <FastImage src={item.imgUrl} style={styles.vendorCartImage} />
      <Text style={[styles.vendorCartText, { color: color.mainText }]}>{item.businessName}</Text>
    </TouchableOpacity>
  ), [vendors, currVendor]);
  const clearCartItems = () => {
    dispatch(clearCart(currVendor));
    const idx = vendorIds.findIndex(id => id === currVendor);
    setCurrVendor(vendorIds[idx + 1] ?? vendorIds[idx - 1] ?? "");
  };
  const checkout = async () => {
    const orderItems = vendorCartItem.map(item => ({
      itemId: item.id, productId: item.item_id, totalPrice: item.totalPrice,
      quantity: item.quantity, extras: item.extras, portion: item.portion,
      price: item.price, size: item.size
    }));
    const input = {
      vendorId: currVendor, orderItems, paymentMethod: "CASH",
      subtotal, discount: 0, deliveryAddress: "123 main st"
    };
    try {
      await create_order({ variables: { input } });
    } catch {}
  };
  const continueShopping = () => {
    navigate("Vendors", { screen: "VendorHome", params: { vendorId: currVendor }, initial: false });
  };

  useEffect(() => {
    setVendorCartItem([...cartItems].filter(item => item.vendorId === currVendor));
  }, [currVendor, cartItems]);
  useEffect(() => {
    if (data) {
      const res = data.getVendorsById;
      const vendors = res.map((item: any) => ({
        id: item.vendorId, businessName: item.businessName, imgUrl: item.entity.imgUrl
      }));
      setVendors(vendors);
    }
  }, [data]);
  useEffect(() => {
    if (order) {
      console.log({ order });
    }
  }, [order]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="cart screen">
      <ScreenHeader title="Cart" goBack={goBack} />
      <View style={styles.cartBody}>
        {cartItems.length ? (
          <FlatList
            data={vendors}
            horizontal
            contentContainerStyle={styles.vendorCartList}
            keyExtractor={item => item.id}
            renderItem={renderVendorCartItems}
            showsHorizontalScrollIndicator={false}
            style={styles.vendorCartBox}
            testID="vendor cart list"
          />
        ) : null}
        <View style={styles.cartBox}>
          <View style={styles.cartInfo} testID="cart info box">
            <Text style={[styles.infoText, { color: color.mainText }]}>Total Items: {vendorCartItem.length}</Text>
            <TouchableOpacity onPress={clearCartItems} testID="clear cart button">
              <Text style={[styles.infoText, { color: color.dangerDim }]}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
          <Animated.FlatList
            data={vendorCartItem}
            showsVerticalScrollIndicator={false}
            itemLayoutAnimation={Layout.springify().damping(15).delay(350)}
            keyExtractor={item => item.id}
            testID="cart items list"
            renderItem={({ item }) => <CartItem {...item} />}
            contentContainerStyle={styles.listContainerStyle}
          />
          {cartItems.length ? (
            <TouchableOpacity onPress={continueShopping} testID="continue shopping">
              <Text style={[styles.backToVendor, { color: color.mainGreen }]}>Continue ordering</Text>
            </TouchableOpacity>
          ) : null}
          <View style={[styles.overviewBox, { backgroundColor: color.cardBg2, borderColor: color.mainGreen, marginBottom: insets.bottom }]} testID="overview box">
            <View style={styles.subtotalBox}>
              <Text style={[styles.subtotal, { color: color.mainText }]}>Subtotal - {numberToCurrency(subtotal)}</Text>
            </View>
            <TouchableOpacity onPress={checkout} style={[styles.checkoutButton, { backgroundColor: color.mainGreen }]} testID="checkout button">
              <Text style={[styles.checkoutText, { color: "white" }]}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cartBody: {
    flex: 1
  },
  vendorCartBox: {
    borderColor: "#BCB5B5",
    borderBottomWidth: 1,
    flexGrow: 0,
    paddingTop: 20,
  },
  vendorCartList: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20
  },
  vendorCartItem: {
    alignItems: "center",
    borderBottomWidth: 3,
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
  },
  vendorCartImage: {
    borderRadius: 10,
    height: 40,
    width: 40
  },
  vendorCartText: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "capitalize"
  },
  cartBox: {
    flex: 1,
    gap: 20,
    paddingTop: 20
  },
  cartInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  infoText: {
    fontFamily: fonts.I_700,
    fontSize: 16
  },
  listContainerStyle: {
    gap: 20,
    paddingBottom: 5
  },
  backToVendor: {
    alignSelf: "center",
    fontFamily: fonts.I_600,
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "capitalize"
  },
  overviewBox: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 30,
    ...shadowStyle
  },
  subtotalBox: {
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  subtotal: {
    fontFamily: fonts.I_500,
    fontSize: 16
  },
  checkoutButton: {
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20
  },
  checkoutText: {
    fontFamily: fonts.I_700,
    fontSize: 18,
    letterSpacing: 1
  }
});
