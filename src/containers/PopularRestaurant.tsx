import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Restaurants from '../api/mockRestaurants';
import CustomButton from '../components/core/CustomButton';
import RestaurantDemo from '../components/core/RestaurantDemo';
import { fonts } from '../utils/fontEnum';

const PopularRestaurant = () => {
  const addToCart = () => console.log("hello");
  return (
    <View style={styles.container}>
      <View style={styles.foodNav}>
        <Text style={styles.foodText}><Text style={styles.foodTextAccent}>Favorite</Text> Restaurants</Text>
        <CustomButton label='View All' height={32} fontSize={13} onPress={() => { }} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        data={Restaurants}
        renderItem={({ item }) => (
          <View style={{ paddingBottom: 16, paddingLeft: 20 }}>
            <RestaurantDemo {...item} addToCart={() => addToCart()} />
          </View>
        )}
      />
    </View>
  );
};

export default PopularRestaurant;

const styles = StyleSheet.create({
  container: {
    gap: 20
  },
  foodNav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  foodText: {
    fontFamily: fonts.I_500,
    fontSize: 16
  },
  foodTextAccent: {
    color: '#29A40A',
    fontFamily: fonts.I_500,
    fontSize: 16
  }
});