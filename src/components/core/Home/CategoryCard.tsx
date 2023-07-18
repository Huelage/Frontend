import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { fonts, outline, withAnchorPoint } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RatingCard } from '../Detail';

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
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.itemBox, cardStyle]}>
        <View style={styles.itemBoxImgPlaceholder} />
        <Text style={styles.itemName}>{name}</Text>
        <RatingCard rating={rating} />
        <View style={styles.itemGetBox}>
          <Text style={styles.itemPrice}>
            <MaterialCommunityIcons name="currency-ngn" size={16} color="black" />
            {price?.toFixed(2)}
          </Text>
          <TouchableOpacity style={styles.itemBuyIcon} onPress={addToCart}>
            <Feather name="plus" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.Image
        source={{ uri: imgUrl }}
        style={[styles.itemImage, blockStyle]}
        resizeMode={"contain"}
      />
    </Animated.View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('8%'),
    marginBottom: 20
  },
  itemBox: {
    backgroundColor: "#F0FFF0",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    gap: 15,
    width: wp('67%'),
    height: hp('35%'),
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 15.32,
    elevation: 16,
  },
  itemBoxImgPlaceholder: {
    flex: 1
  },
  itemImage: {
    width: hp('25%'),
    borderRadius: hp('12.5%'),
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    height: hp('25%'),
    position: "absolute",
    zIndex: 9999,
    shadowColor: 'rgba(71, 202, 76, .5)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: .5,
    shadowRadius: 8
  },
  itemName: {
    fontFamily: fonts.I_700,
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 15
  },
  itemGetBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 5,
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
    height: 50,
    justifyContent: 'center',
    width: 50
  }
});
