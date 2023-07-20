import Food from '@api/mockFoodData';
import { ItemAmountCard } from '@components/core/Detail';
import { CustomButton, FoodCard } from '@components/core/Home/';
import { CustomModal } from '@components/misc';
import { fonts } from '@utils';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const PopularFood = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
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
            <FoodCard {...item} onClick={setShowModal} addToCart={() => addToCart()} />
          </View>
        )}
      />
      <CustomModal isVisible={showModal} close={setShowModal}>
        <View style={{ width: 300, height: 400, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <Text>Indomie</Text>
          <ItemAmountCard />
        </View>
      </CustomModal>
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