import { mockRestaurants } from "@api/mock";
import { CustomButton, RestaurantCard } from "@components/core/Home";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const PopularRestaurant = () => {
  const { color } = useAppTheme();
  const handleViewAll = () => console.log('View All');
  return (
    <View style={styles.container} testID="popular restaurant">
      <View style={styles.resNav}>
        <Text style={[styles.resText, { color: color.mainText }]}>
          <Text style={{ color: color.mainGreen }}>Favorite</Text> Restaurants
        </Text>
        <CustomButton inactive label="View All" height={32} fontSize={13} onPress={handleViewAll} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={mockRestaurants}
        testID="popular restaurant list"
        renderItem={({ item }) => (
          <RestaurantCard {...item} />
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  resText: {
    fontFamily: fonts.I_500,
    fontSize: 16
  },
});
