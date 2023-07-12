import { Ionicons } from '@expo/vector-icons';
import { RestaurantInterface } from '@interfaces';
import { fonts, shadowStyle } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface RestaurantProps extends RestaurantInterface {
  addToCart: () => void;
}

const RestaurantDemo = ({ name, imgUrl, rating, location, addToCart }: RestaurantProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.resImage} source={{ uri: imgUrl }} />
      <View style={styles.detailsBox}>
        <Text style={styles.resName}>{name}</Text>
        <View style={styles.resRatingBox}>
          <Ionicons name="star" size={16} color="#F2DB06" />
          <Ionicons name="star" size={16} color="#F2DB06" />
          <Ionicons name="star" size={16} color="#F2DB06" />
          <Ionicons name="star" size={16} color="#F2DB06" />
          <Ionicons name="star" size={16} color="#F2DB06" />
        </View>
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