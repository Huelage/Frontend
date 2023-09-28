import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppTheme } from "@hooks";

const ProfileDetails = () => {
  const { color } = useAppTheme();
  return (
    <View>
      <Text>ProfileDetails</Text>
    </View>
  );
};
export default ProfileDetails;
const styles = StyleSheet.create({});
