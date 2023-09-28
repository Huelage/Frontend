import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const AboutUs = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>About Us</Text>
    </View>
  );
};
export default AboutUs;
const styles = StyleSheet.create({});
