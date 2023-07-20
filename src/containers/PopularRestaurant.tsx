import Restaurants from '@api/mockRestaurants';
import { CustomButton, RestaurantCard } from '@components/core/Home';
import { fonts } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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
            <RestaurantCard {...item} addToCart={() => addToCart()} />
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