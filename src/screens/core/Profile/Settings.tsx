import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const Settings = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};
export default Settings;
const styles = StyleSheet.create({});
