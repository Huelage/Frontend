import { mockRestaurants } from '@api/mock';
import { CustomButton, RestaurantCard } from '@components/core/Home';
import { fonts } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const PopularRestaurant = () => {
  const addToCart = () => console.log("hello");
  return (
    <View style={styles.container}>
      <View style={styles.resNav}>
        <Text style={styles.resText}><Text style={styles.resTextAccent}>Favorite</Text> Restaurants</Text>
        <CustomButton inactive label='View All' height={32} fontSize={13} onPress={() => { }} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        data={mockRestaurants}
        renderItem={({ item }) => (
          <RestaurantCard {...item} addToCart={() => addToCart()} />
        )}
      />
    </View>
  );
};

export default PopularRestaurant;

const styles = StyleSheet.create({
  container: {
    gap: 15
  },
  resNav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  resText: {
    fontFamily: fonts.I_500,
    fontSize: 16
  },
  resTextAccent: {
    color: '#29A40A',
    fontFamily: fonts.I_500,
    fontSize: 16
  }
});