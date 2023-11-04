import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import React, { LegacyRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

const LocationInput = React.forwardRef((inputProps: TextInputProps, ref: LegacyRef<TextInput>) => {
  const { color } = useAppTheme();
  return (
    <View style={[styles.searchBox, { backgroundColor: color.searchBg }]} testID="location input">
      <MaterialCommunityIcons testID="location icon" name="map-marker-outline" size={30} color={color.mainGreen} />
      <TextInput
        ref={ref}
        {...inputProps}
        style={[styles.searchInput, { color: color.searchText }]}
      />
    </View>
  );
});

export default LocationInput;

const styles = StyleSheet.create({
  searchBox: {
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    gap: 6,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.I_400,
    fontSize: 16,
    height: 50,
    letterSpacing: 1.3
  }
});
