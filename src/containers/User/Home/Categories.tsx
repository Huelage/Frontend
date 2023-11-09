import { mockFoods } from "@api/mock";
import { CustomButton, CustomCarousel } from "@components/core/Home";
import { useAppTheme } from "@hooks";
import { fonts, foodCategories } from "@utils";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Categories = () => {
  const { color } = useAppTheme();
  const handleCategory = (category: string) => console.log(category);
  return (
    <View style={styles.categories} testID="categories">
      <Text style={[styles.categoriesText, { color: color.mainText }]}>Categories</Text>
      <FlatList
        data={foodCategories}
        horizontal
        keyExtractor={category => category}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <CustomButton icon="md-close-outline" fontSize={14} label={item} height={36} inactive onPress={() => handleCategory(item)} />
          </View>
        )}
        testID="category icon list"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      />
      <CustomCarousel items={mockFoods} />
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
  categoryItem: {
    paddingLeft: 20
  },
  categoryContainer: {
    paddingBottom: 20
  }
});