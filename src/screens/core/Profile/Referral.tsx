import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const Referral = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>Referral</Text>
    </View>
  );
};
export default Referral;
const styles = StyleSheet.create({});
