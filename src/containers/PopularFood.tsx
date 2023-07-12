import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Food from '../api/mockFoodData';
import CustomButton from '../components/core/CustomButton';
import FoodDemo from '../components/core/FoodDemo';
import { fonts } from '../utils/fontEnum';

const PopularFood = () => {
  const addToCart = () => console.log("hello");
  return (
    <View style={styles.container}>
      <View style={styles.foodNav}>
        <Text style={styles.foodText}><Text style={styles.foodTextAccent}>Popular</Text> this week</Text>
        <CustomButton label='View All' height={32} fontSize={13} onPress={() => { }} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        data={Food}
        renderItem={({ item }) => (
          <View style={{ paddingBottom: 16, paddingLeft: 20 }}>
            <FoodDemo {...item} addToCart={() => addToCart()} />
          </View>
        )}
      />
    </View>
  );
};

export default PopularFood;

const styles = StyleSheet.create({
  container: {
    gap: 10
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