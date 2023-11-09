import { CustomBox } from "@components/misc";
import { useAppTheme } from "@hooks";
import { UserFoodInterface, UserVendorTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, numberToCurrency } from "@utils";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, SlideOutLeft } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface VendorProductInterface {
  item: UserFoodInterface;
  vendorId: string;
}

const VendorProduct = ({ item, vendorId }: VendorProductInterface) => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<UserVendorTabProps>();
  const price = item.pricingMethod === "PACKAGE" ? item.packageSizes[0]?.price : item.price;
  return (
    <TouchableOpacity onPress={() => navigate("ItemDetail", { itemId: item.id, vendorId })} testID="vendor product">
      <Animated.View
        entering={FadeInUp.delay(200)}
        exiting={SlideOutLeft.duration(300)}
        style={styles.container}
      >
        <CustomBox bgColor={color.cardBg2} width={wp("100%") - 30} height={110} r={20} pad={6} left={-4} />
        <Image source={{ uri: item.imgUrl }} style={styles.itemImage} testID="vendor product image" />
        <View style={styles.itemInfo} testID="vendor product info">
          <Text style={[styles.itemName, { color: color.mainText }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.itemDescription, { color: color.mainTextDim }]} numberOfLines={2}>{item.description}</Text>
        </View>
        <View testID="vendor product price">
          <Text style={[styles.itemPrice, { color: color.mainGreen }]} numberOfLines={1}>{numberToCurrency(price)} / </Text>
          <Text style={[styles.itemPrice, { color: color.mainGreen }]} numberOfLines={1}>{item.pricingMethod}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default VendorProduct;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  itemImage: {
    borderRadius: 40,
    height: 80,
    width: 80
  },
  itemInfo: {
    flex: 1,
    gap: 5
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 16
  },
  itemDescription: {
    fontFamily: fonts.I_600I,
    fontSize: 12
  },
  itemPrice: {
    fontFamily: fonts.I_600,
    fontSize: 14
  }
});