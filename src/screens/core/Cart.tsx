import { fonts, shadowStyle } from "@utils";
import { mockCartItem } from "@api/mock";
import React, { useState } from "react";
import { CartItem } from "@interfaces";
import { CustomImage } from "@components/misc";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Confirm } from "@components/core/Cart";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItem);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = 200;
  const newTotal = total + deliveryFee;

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={styles.cartItemContainer}>
        <View
          style={{
            width: "30%",
            height: "100%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.imgUrl }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.TextStyle}>{item.name}</Text>
            <Text style={styles.price}>N {item.price}</Text>
          </View>
          <View style={styles.quantityWrap}>
            <View style={styles.quantityContainer}>
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.newPrice}>
                {" "}
                ${item.price * item.quantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.cartText}> Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCartItem}
      />
      <View style={styles.totalContainer}>
        <View style={styles.totalWrap}>
          <Text style={styles.totalText}>Subtotal</Text>
          <Text style={styles.totalText}> ${total}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.totalWrap}>
          <Text style={styles.totalText}>Delivery</Text>
          <Text style={styles.totalText}> ${deliveryFee}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.totalWrap}>
          <Text style={styles.newTotalText}>Total</Text>
          <Text style={styles.newTotalText}> ${newTotal}</Text>
        </View>
        <Confirm />
      </View>
    </View>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: wp("100%"),
    height: hp("100%"),
    marginTop: 20,
  },
  cartText: {
    fontSize: 24,
    fontFamily: fonts.I_500,
    letterSpacing: 1,
    paddingTop: 20,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
    fontWeight: "700",
  },
  TextStyle: {
    marginTop: 5,
    fontSize: 25,
    maxWidth: "100%",
    color: "#000000",
    fontWeight: "700",
    letterSpacing: 1,
  },
  cartItemContainer: {
    flex: 1,
    marginBottom: 20,
    width: "100%",
    height: "100%",
    marginVertical: 26,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#effff0",
    borderRadius: 20,
    position: "relative",
    zIndex: 2,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalContainer: {
    marginTop: 10,
    paddingTop: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: hp("30%"),
    width: wp("100%"),
    backgroundColor: "#effff0",
    borderRadius: 20,
  },
  totalText: {
    fontSize: 20,
    fontFamily: fonts.I_600,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#F0FFF0",
    borderRadius: 10,
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    ...shadowStyle,
    marginTop: 15,
  },
  button: {
    backgroundColor: "#47CA4C",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: fonts.I_600,
    fontSize: 20,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  newPrice: {
    fontSize: 20,
    marginLeft: 15,
  },
  priceContainer: {
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("85%"),
  },
  newTotalText: {
    fontWeight: "700",
    fontSize: 25,
    fontFamily: fonts.I_600,
  },
  horizontalLine: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#808080",
    marginVertical: 10,
  },
  quantityWrap: {
    flexDirection: "column",
  },
});
