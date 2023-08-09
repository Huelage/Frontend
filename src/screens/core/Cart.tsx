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
  Button,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
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

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={styles.cartItemContainer}>
        <View
          style={{
            width: "100%",
            height: "50%",
            padding: 14,
            justifyContent: "space-around",
            alignItems: "flex-end",
            backgroundColor: "green",
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Image
              source={{ uri: item.imgUrl }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>

          <View>
            <Text style={styles.TextStyle}>{item.name}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text>Quantity: </Text>
            <Button
              title="-"
              onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
            />
            <Text>{item.quantity}</Text>
            <Button
              title="+"
              onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
            />
          </View>
          <Text>Price: ${item.price * item.quantity}</Text>
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
        <Text style={styles.totalText}>Total: ${total}</Text>
      </View>
    </View>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartText: {
    fontSize: 24,
    fontFamily: fonts.I_500,
    letterSpacing: 1,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10,
  },
  TextStyle: {
    fontSize: 14,
    maxWidth: "100%",
    color: "#000000",
    fontWeight: "600",
    letterSpacing: 1,
  },
  cartItemContainer: {
    marginBottom: 16,
    width: "100%",
    height: "100%",
    marginVertical: 6,
    alignItems: "center",
    flexDirection: "row",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalContainer: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 20,
    fontFamily: fonts.I_600,
  },
});
