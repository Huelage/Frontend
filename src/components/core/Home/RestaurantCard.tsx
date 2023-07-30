import { Ionicons } from '@expo/vector-icons';
import { RestaurantInterface } from '@interfaces';
import { fonts, shadowStyle } from '@utils';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface RestaurantProps extends RestaurantInterface {
  addToCart: () => void;
}
type IconName = keyof typeof Ionicons.glyphMap;
type IconProps = {
  1: IconName;
  0.5: IconName;
  0: IconName;
};

const RestaurantDemo = ({ name, imgUrl, rating, location, addToCart }: RestaurantProps) => {
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
  return (
    <View style={styles.container}>
      <Image style={styles.resImage} source={{ uri: imgUrl }} />
      <View style={styles.detailsBox}>
        <Text style={styles.resName}>{name}</Text>
        <FlatList
          data={ratingArray}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }: { item: keyof IconProps; }) => (
            <Ionicons name={iconName[item]} size={16} color="#F2DB06" />
          )}
          horizontal
          style={styles.resRatingBox}
        />
        <Text style={styles.resLocation}>{location}</Text>
      </View>
    </View>
  );
};

export default RestaurantDemo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
    borderRadius: 15,
    gap: 5,
    marginLeft: 20,
    minHeight: hp("30%"),
    width: wp("60%"),
    ...shadowStyle
  },
  resImage: {
    borderRadius: 15,
    height: 130,
    width: "100%"
  },
  detailsBox: {
    gap: 5,
    padding: 10
  },
  resName: {
    fontFamily: fonts.I_700,
    fontSize: 14,
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
    fontSize: 16,
    textAlign: 'center'
  }
});