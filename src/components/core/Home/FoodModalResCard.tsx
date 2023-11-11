import restuarants from "@api/mock/mockRestaurants";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FoodModalResCard = ({ resId }: { resId: string; }) => {
  const { color } = useAppTheme();
  const restaurant = restuarants.find(res => res.id === resId);
  return (
    <View style={[styles.container, { backgroundColor: color.cardBg2 }]} testID="food modal res card">
      <Image testID="restaurant image" style={styles.image} source={{ uri: restaurant?.imgUrl }} />
      <Text style={[styles.name, { color: color.mainText }]}>{restaurant?.name}</Text>
      <TouchableOpacity style={[styles.buttonBox, { backgroundColor: color.mainGreen }]}>
        <Text style={styles.button}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(FoodModalResCard);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    padding: 10
  },
  image: {
    borderRadius: 10,
    height: 50,
    width: 50
  },
  name: {
    flex: 1,
    fontFamily: fonts.I_500,
    fontSize: 14
  },
  buttonBox: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  button: {
    color: "#fff",
    fontFamily: fonts.I_500,
  }
});