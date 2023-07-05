import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fonts } from '../utils/fontEnum';
import CustomButton from '../components/core/CustomButton';

const Categories = () => {
  const categories = ["Swallow", "Pastries", "Rice", "Snacks", "Pasta", "Shawarma", "Pizza"];
  return (
    <View style={styles.categories}>
      <Text style={styles.categoriesText}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        keyExtractor={category => category}
        renderItem={({ item }) => (
          <CustomButton fontSize={18} label={item} height={50} onPress={() => console.log(item)} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categories: {
    gap: 10
  },
  categoriesText: {
    fontFamily: fonts.O_700,
    fontSize: 20,
    letterSpacing: 1
  },
});