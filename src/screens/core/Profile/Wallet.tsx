import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const Wallet = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>Wallet</Text>
    </View>
  );
};
export default Wallet;
const styles = StyleSheet.create({});
