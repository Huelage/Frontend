import { mockCartItems } from "@api/mock";
import { CartItem, CartOverview } from "@containers/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "@utils";
import React from "react";
import { FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CartScreen = () => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<UserNavigationProps>();
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} onTouchStart={() => Keyboard.dismiss()} testID="cart screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Cart</Text>
      </View>
      <View style={styles.cartBody}>
        <FlatList
          data={mockCartItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          testID="cart items list"
          renderItem={({ item }) => (
            <CartItem {...item} />
          )}
          contentContainerStyle={{ gap: 20 }}
          style={{ flex: 1 }}
        />
        <CartOverview />
      </View>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 25
  },
  cartBody: {
    flex: 1,
    gap: 20
  }
});
