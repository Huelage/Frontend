import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fonts } from '../utils/fontEnum';
import FoodDemo from '../components/core/FoodDemo';
import { FoodInterface } from '../utils/interfaces';

const PopularFood = () => {
  const addToCart = () => console.log("hello");
  const demoFood: FoodInterface = {
    id: Date.now(),
    name: "River prawn spicy soap",
    desc: "River prawn spiacy soup eunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    price: 1000,
    imgUrl: "",
    location: 'Lagos, Nigeria'
  };
  return (
    <View style={styles.container}>
      <View style={styles.foodNav}>
        <Text style={styles.foodText}>Most popular</Text>
        <TouchableOpacity>
          <Text style={styles.foodButton}>View all</Text>
        </TouchableOpacity>
      </View>
      <FoodDemo {...demoFood} addToCart={() => addToCart()} />
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
    justifyContent: 'space-between'
  },
  foodText: {
    fontFamily: fonts.O_700,
    fontSize: 20,
    letterSpacing: 1
  },
  foodButton: {
    color: '#79C37C',
    fontFamily: fonts.O_600,
    fontSize: 14
  },
  foodBox: {

  }
});