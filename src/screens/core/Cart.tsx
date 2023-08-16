import { fonts, shadowStyle } from "@utils";
import { Promo } from "@components/core/Cart";
import { mockCartItem } from "@api/mock";
import React, { useState } from "react";
import { CartItem } from "@interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItem);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    newQuantity = Math.max(0, newQuantity);

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const navigation = useNavigation();
  const prev = () => {
    navigation.navigate("Cart");
  };
  const exit = () => {
    navigation.navigate("mainTabs");
  };
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = total > 0 ? 200 : 0;
  const newTotal = total + deliveryFee;

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={styles.cartItemContainer}>
        <View
          style={{
            width: "30%",
            height: "100%",
            padding: 16,
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
            height: hp("100%"),
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.TextStyle}>{item.name}</Text>
            <Text style={styles.price}>
              <MaterialCommunityIcons
                name="currency-ngn"
                size={20}
                color="black"
              />{" "}
              {item.price}
            </Text>
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
                <MaterialCommunityIcons
                  name="currency-ngn"
                  size={20}
                  color="black"
                />
                {item.price * item.quantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.cartIcon}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color="#000000"
            onPress={prev}
          />
        </TouchableOpacity>

        <Text style={styles.cartText}> Cart</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color="#000000"
            onPress={exit}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCartItem}
        style={styles.cartList}
      />
      <Promo />
      <View style={styles.totalContainer}>
        <View style={styles.totalWrap}>
          <Text style={styles.totalText}>Subtotal</Text>
          <Text style={styles.totalText}>
            {" "}
            <MaterialCommunityIcons
              name="currency-ngn"
              size={20}
              color="black"
            />
            {total}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.totalWrap}>
          <Text style={styles.totalText}>Delivery</Text>
          <Text style={styles.totalText}>
            {" "}
            <MaterialCommunityIcons
              name="currency-ngn"
              size={20}
              color="black"
            />
            {deliveryFee}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.totalWrap}>
          <Text style={styles.newTotalText}>Total</Text>
          <Text style={styles.newTotalText}>
            {" "}
            <MaterialCommunityIcons
              name="currency-ngn"
              size={22}
              color="black"
            />
            {newTotal}
          </Text>
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

    width: wp("100%"),
    height: hp("100%"),
    marginTop: 2,
  },
  cartText: {
    fontSize: wp("7%"),
    fontFamily: fonts.I_500,
    letterSpacing: 1,
    paddingTop: 10,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "700",
  },
  TextStyle: {
    marginTop: 5,
    fontSize: wp("5%"),
    maxWidth: "100%",
    color: "#000000",
    fontWeight: "700",
    letterSpacing: 1,
  },
  cartItemContainer: {
    marginBottom: 10,
    width: wp("100%"),
    height: hp("10%"),
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#effff0",
    borderRadius: 20,
    position: "relative",
    justifyContent: "space-between",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  totalContainer: {
    paddingTop: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: hp("35%"),
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
    paddingVertical: 5,
    paddingHorizontal: 7,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: fonts.I_600,
    fontSize: 15,
  },
  price: {
    fontSize: wp("4%"),
    marginBottom: 1,
    marginTop: 10,
  },
  newPrice: {
    fontSize: wp("4%"),
    marginLeft: 8,
  },
  priceContainer: {
    justifyContent: "flex-end",
    marginTop: 7,
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
  cartIcon: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartList: {
    flexGrow: 0,
    height: hp("100%"),
    width: wp("100%"),
  },
});
