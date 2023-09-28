import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const MyOrders = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>MyOrders</Text>
    </View>
  );
};
export default MyOrders;
const styles = StyleSheet.create({});
