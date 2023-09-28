import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const Location = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>Locations</Text>
    </View>
  );
};
export default Location;
const styles = StyleSheet.create({});
