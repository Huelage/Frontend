import { CustomBox } from '@components/misc';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { UserFoodInterface } from '@interfaces';
import { fonts, numberToCurrency, priceMethod } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, SlideOutLeft } from 'react-native-reanimated';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const MenuItem = ({ item }: { item: UserFoodInterface; }) => {
  const { color } = useAppTheme();
  const price = item.pricingMethod === "PACKAGE" ? item.packageSizes[0]?.price : item.price;
  const size = item.pricingMethod === "PACKAGE" ? item.packageSizes[0]?.name : undefined;
  return (
    <Animated.View
      entering={FadeInUp.delay(200)}
      exiting={SlideOutLeft.duration(300)}
      style={styles.container}
      testID="menu item"
    >
      <CustomBox bgColor={color.cardBg2} width={wp('100%') - 30} height={110} r={20} pad={6} left={-4} />
      <Image source={{ uri: item.imgUrl }} style={styles.itemImage} testID='menu item image' />
      <View style={styles.itemInfo} testID="menu item info">
        <Text style={[styles.itemName, { color: color.mainText }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.itemPrice, { color: color.mainGreen }]} numberOfLines={1}>{numberToCurrency(price)} {priceMethod(item.pricingMethod, size)}</Text>
      </View>
      <View style={styles.itemAction} testID="menu item action">
        <TouchableOpacity>
          <FontAwesome name="edit" size={24} color={color.mainGreen} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="trash-2" size={24} color={color.danger} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default MenuItem;

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
    gap: 10
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 16
  },
  itemPrice: {
    fontFamily: fonts.I_600,
    fontSize: 14
  },
  itemAction: {
    alignItems: "center",
    gap: 10
  }
});