import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const Notification = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
};
export default Notification;
const styles = StyleSheet.create({});
