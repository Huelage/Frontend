import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const Help = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>Help</Text>
    </View>
  );
};
export default Help;
const styles = StyleSheet.create({});
