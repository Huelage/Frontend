import restuarants from '@api/mock/mockRestaurants';
import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FoodModalResCard = ({ resId }: { resId: number; }) => {
  const restaurant = restuarants.find(res => res.id === resId);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: restaurant?.imgUrl }} />
      <Text style={styles.name}>{restaurant?.name}</Text>
      <TouchableOpacity style={styles.buttonBox}>
        <Text style={styles.button}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodModalResCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "#F0FFF0",
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    padding: 5
  },
  image: {
    borderRadius: 5,
    height: 50,
    width: 50
  },
  name: {
    flex: 1,
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  buttonBox: {
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  button: {
    color: '#fff',
    fontFamily: fonts.I_500,
  }
});