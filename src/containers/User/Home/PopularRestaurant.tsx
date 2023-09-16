import { mockRestaurants } from "@api/mock";
import { CustomButton, RestaurantCard } from "@components/core/Home";
import { useAppTheme } from "@hooks";
import { SkRRect } from "@shopify/react-native-skia";
import { fonts } from "@utils";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface PopularRestaurantInterface {
  testRect?: SkRRect; /* This is for unit testing purposes */
}

const PopularRestaurant = ({ testRect }: PopularRestaurantInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={styles.container} testID="popular restaurant">
      <View style={styles.resNav}>
        <Text style={[styles.resText, { color: color.mainText }]}>
          <Text style={{ color: color.mainGreen }}>Favorite</Text> Restaurants
        </Text>
        <CustomButton inactive label="View All" height={32} fontSize={13} onPress={() => { }} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={mockRestaurants}
        testID="popular restaurant list"
        renderItem={({ item }) => (
          <RestaurantCard {...item} testRect={testRect} />
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
