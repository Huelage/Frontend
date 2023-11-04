import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface MainSearchBarInterface {
  searchFunc: (val: string) => void;
};

const MainSearchBar = ({ searchFunc }: MainSearchBarInterface) => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.homeSearchBox, { backgroundColor: color.searchBg }]} testID="main search bar">
      <Ionicons testID="search icon" name="search" size={24} color={color.mainGreen} />
      <TextInput
        style={[styles.homeSearchInput, { color: color.searchText }]}
        placeholder="Search dishes..."
        onChangeText={searchFunc}
        placeholderTextColor={color.searchText}
      />
      <View style={[styles.homeSearchBoxFilter, { backgroundColor: color.mainGreen }]}>
        <Image testID="filter icon" style={styles.homeSearchBoxFilterIcon} source={require("@icons/home-group.png")} />
      </View>
    </View>
  );
};

export default MainSearchBar;

const styles = StyleSheet.create({
  homeSearchBox: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    height: 44,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  homeSearchBoxFilter: {
    alignItems: "center",
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  homeSearchBoxFilterIcon: {
    height: 18,
    width: 18
  },
  homeSearchInput: {
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 14,
    height: 30
  }
});