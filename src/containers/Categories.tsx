import { CustomButton, CustomCarousel } from '@components/core/Home';
import { fonts } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Categories = () => {
  const categories = ["Swallow", "Pastries", "Rice", "Snacks", "Pasta", "Shawarma", "Pizza"];
  return (
    <View style={styles.categories}>
      <Text style={styles.categoriesText}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={category => category}
        renderItem={({ item }) => (
          <View style={{ paddingLeft: 20 }}>
            <CustomButton icon='md-close-outline' fontSize={14} label={item} height={36} inactive onPress={() => console.log(item)} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <CustomCarousel />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categories: {
    gap: 5
  },
  categoriesText: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    paddingBottom: 5,
    paddingHorizontal: 20
  },
});