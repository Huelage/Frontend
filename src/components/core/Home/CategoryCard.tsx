import { CustomBox, CustomImage } from '@components/misc';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { UserFoodInterface } from '@interfaces';
import { fonts, withAnchorPoint } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CategoryCardInterface {
  category: UserFoodInterface;
  idx: number;
  animationValue: Animated.SharedValue<number>;
  addToCart: (id: string) => void;
}
const CategoryCard = ({ category, idx, animationValue, addToCart }: CategoryCardInterface) => {
  const { color } = useAppTheme();
  const WIDTH = wp('67%');
  const HEIGHT = hp('35%');
  const p_method = category.pricingMethod === 'PRICE' ? 'Min Price' : 'Price';
  const price = category.pricingMethod === 'PACKAGE' ? category.packageSizes[0].price : category.price;
  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-0.1, 0, 1],
      [0.95, 1, 1],
      Extrapolate.CLAMP,
    );
    const translateX = interpolate(
      animationValue.value,
      [-1, -0.2, 0, 1],
      [0, WIDTH * 0.3, 0, 0],
    );
    const transform = {
      transform: [
        { scale },
        { translateX },
        { perspective: 200 },
        {
          rotateY: `${interpolate(
            animationValue.value,
            [-1, 0, 0.4, 1],
            [30, 0, -25, -25],
            Extrapolate.CLAMP,
          )}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(
        transform,
        { x: 0.5, y: 0.5 },
        { width: WIDTH, height: HEIGHT },
      ),
    };
  }, [idx]);

  const blockStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, 0, 30],
    );
    const translateY = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, -130, -40],
    );
    const rotateZ = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, 0, -25],
    );
    return {
      transform: [
        { translateX },
        { translateY },
        { rotateZ: `${rotateZ}deg` },
      ],
    };
  }, [idx]);

  return (
    <Animated.View style={styles.container} testID='category card'>
      <Animated.View style={[styles.itemBox, cardStyle]}>
        <CustomBox height={hp('40%')} width={wp('67%')} pad={6} r={15} />
        <View style={styles.itemBoxImgPlaceholder} />
        <View style={styles.itemDetails}>
          <Text style={[styles.itemName, { color: color.mainText }]}>{category.name}</Text>
          <Text style={[styles.itemVendorName, { color: color.mainGreen }]}>Pricing Details</Text>
          <View style={styles.priceBox}>
            <Text style={[styles.itemPrice, { color: color.mainGreen }]}>Method: </Text>
            <Text style={[styles.itemPrice, { color: color.mainText }]}>{category.pricingMethod}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={[styles.itemPrice, { color: color.mainGreen }]}>{p_method}: </Text>
            <Text style={[styles.itemPrice, { color: color.mainText }]} testID='item price'>₦ {price?.toFixed(2)}</Text>
          </View>
          <View style={styles.itemGetBox}>
            <Text style={[styles.itemVendorName, { color: color.mainText }]}>Korede's joint</Text>
            <TouchableOpacity testID={'addToCart'} style={styles.itemBuyIcon} onPress={() => addToCart(category.id)}>
              <Feather name="plus" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      <Animated.View testID="categoryImage" style={[styles.itemImageContainer, blockStyle]}>
        <CustomImage imgUrl={category.imgUrl} imgSize={hp('25%') - 10} imgPad={5} imgFit='contain' style={styles.itemImage} shadowBlur={8} shadowColor={color.cardShadow} shadowHeight={10} />
      </Animated.View>
    </Animated.View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('10%'),
    marginBottom: 20
  },
  itemBox: {
    width: wp('67%'),
    height: hp('40%'),
  },
  resBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wp('67%'),
    height: hp('40%')
  },
  itemBoxImgPlaceholder: {
    flex: 1
  },
  itemImageContainer: {
    alignItems: 'center',
    borderRadius: 60,
    justifyContent: 'center',
    position: 'absolute',
    width: hp('25%'),
    zIndex: 9999
  },
  itemImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: hp('25%'),
    borderRadius: hp('12.5%'),
    height: hp('25%'),
  },
  itemDetails: {
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 8,
    width: '100%'
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 22,
    textAlign: 'center',
    paddingHorizontal: 15
  },
  priceBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: "100%"
  },
  itemVendorName: {
    fontFamily: fonts.I_600,
    fontSize: 18
  },
  itemGetBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 0,
    width: '100%',
  },
  itemPrice: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    letterSpacing: .5
  },
  itemBuyIcon: {
    alignItems: 'center',
    backgroundColor: '#47CA4C',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    width: 40
  }
});
