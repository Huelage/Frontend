import { mockFoods } from "@api/mock";
import { CustomButton, FoodCard } from "@components/core/Home/";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const PopularFood = () => {
  const { color } = useAppTheme();
  const handleViewAll = () => console.log("View All");
  return (
    <View style={styles.container} testID="popular food">
      <View style={styles.foodNav}>
        <Text style={[styles.foodText, { color: color.mainText }]}>
          <Text style={[styles.foodTextAccent, { color: color.mainGreen }]}>Popular</Text> this week
        </Text>
        <CustomButton inactive label="View All" height={32} fontSize={13} onPress={handleViewAll} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={mockFoods}
        testID="popular food list"
        renderItem={({ item }) => (
          <FoodCard {...item} />
        )}
      />
    </View>
  );
};

export default PopularFood;

const styles = StyleSheet.create({
  container: {
    gap: 5
  },
  foodNav: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  foodText: {
    fontFamily: fonts.I_500,
    fontSize: 16
  },
  foodTextAccent: {
    color: "#29A40A",
    fontFamily: fonts.I_500,
    fontSize: 16
  }
});