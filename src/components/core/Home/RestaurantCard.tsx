import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { RestaurantInterface } from '@interfaces';
import { Box, BoxShadow, Canvas, rect, rrect } from '@shopify/react-native-skia';
import { fonts } from '@utils';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface RestaurantProps extends RestaurantInterface {
  addToCart: () => void;
}
type IconName = keyof typeof Ionicons.glyphMap;
type IconProps = {
  1: IconName;
  0.5: IconName;
  0: IconName;
};

const RestaurantCard = ({ name, imgUrl, rating, location, addToCart }: RestaurantProps) => {
  const { color } = useAppTheme();
  const rate = Math.floor(rating);
  const ratemantissa = rating - rate;
  const ratingArray = Array(rate).fill(1);
  if (ratemantissa >= 0.5) ratingArray.push(0.5);
  for (let i = ratingArray.length; i < 5; i++) ratingArray.push(0);
  const iconName: IconProps = {
    1: "ios-star",
    0.5: "ios-star-half",
    0: "ios-star-outline"
  };
  const containerRect = rrect(rect(6, 6, (wp('60%') - 20), 210), 15, 15);
  return (
    <View style={styles.container}>
      <Canvas style={styles.resBox}>
        <Box box={containerRect} color={color.cardBg}>
          <BoxShadow dx={2} dy={4} blur={4} color="rgba(76, 175, 80, 0.61)" />
        </Box>
      </Canvas>
      <Image style={styles.resImage} source={{ uri: imgUrl }} />
      <View style={styles.detailsBox}>
        <Text style={[styles.resName, { color: color.mainText }]}>{name}</Text>
        <FlatList
          data={ratingArray}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }: { item: keyof IconProps; }) => (
            <Ionicons name={iconName[item]} size={16} color="#F2DB06" />
          )}
          horizontal
          style={styles.resRatingBox}
        />
        <Text style={[styles.resLocation, { color: color.mainGreen }]}>{location}</Text>
      </View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    height: 230,
    marginLeft: 10,
    width: wp("60%")
  },
  resBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 230,
    width: wp("60%")
  },
  resImage: {
    borderRadius: 15,
    height: 100,
    left: 6,
    width: wp('60%') - 20
  },
  detailsBox: {
    gap: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 22
  },
  resName: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    textAlign: 'center'
  },
  resRatingBox: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center'
  },
  resLocation: {
    color: '#38742A',
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: 'center'
  }
});