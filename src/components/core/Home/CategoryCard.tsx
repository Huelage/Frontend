import { RatingCard } from '@components/core/Detail';
import { CustomImage } from '@components/misc';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import { fonts, withAnchorPoint } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CategoryCardInterface {
  idx: number;
  name: string;
  rating: number;
  price: number;
  imgUrl: string;
  addToCart: () => void;
  animationValue: Animated.SharedValue<number>;
}
const CategoryCard = ({ idx, name, rating, price, imgUrl, addToCart, animationValue }: CategoryCardInterface) => {
  const { color } = useAppTheme();
  const WIDTH = wp('67%');
  const HEIGHT = hp('35%');

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
        <Canvas style={styles.resBox}>
          <RoundedRect x={6} y={6} width={wp('67%') - 20} height={(hp('40%') - 20)} r={15} color={color.cardBg}>
            <Shadow dx={2} dy={4} blur={4} color="rgba(76, 175, 80, 0.61)" />
          </RoundedRect>
        </Canvas>
        <View style={styles.itemBoxImgPlaceholder} />
        <View style={styles.itemDetails}>
          <Text style={[styles.itemName, { color: color.mainText }]}>{name}</Text>
          <RatingCard rating={rating} />
          <Text style={[styles.itemPrice, { color: color.mainText }]}>₦ {price?.toFixed(2)}</Text>
          <View style={styles.itemGetBox}>
            <Text style={[styles.itemVendorName, { color: color.mainText }]}>Korede's joint</Text>
            <TouchableOpacity testID='addToCart' style={styles.itemBuyIcon} onPress={addToCart}>
              <Feather name="plus" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      <Animated.View testID="categoryImage" style={[styles.itemImageContainer, blockStyle]}>
        <CustomImage imgUrl={imgUrl} imgSize={hp('25%') - 10} imgPad={5} imgFit='contain' style={styles.itemImage} shadowBlur={8} shadowColor='rgba(71, 202, 76, .5)' shadowHeight={10} />
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
